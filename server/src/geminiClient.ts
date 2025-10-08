import axios from "axios";
import { GoogleAuth } from 'google-auth-library';

/**
 * Build a stable style prompt so results remain consistent between requests.
 */
function buildStylePrompt(genre: string, storyPrompt: string) {
  const styleToken =
    "manga style: high-contrast linework, screentones, bold inking, expressive eyes, cinematic panel composition, black and white with selective gray tones, clean line art";
  return `Genre: ${genre}\nStory: ${storyPrompt}\n\nStyle: ${styleToken}\nProduce a series of panels (square) focusing on clear character silhouette and expressive poses. Keep consistent character appearance across panels.`;
}

/**
 * generatePanels
 * - inputImage: Buffer of the uploaded image (user photo)
 * - genre, prompt: user inputs
 * - count: number of panels to return
 *
 * Returns array of base64 PNG data (without data: prefix)
 *
 * NOTE: This function uses the Google Generative Images endpoint pattern as an example.
 * You may need to adjust the endpoint or payload to match the exact Gemini images API available in your account.
 */
export async function generatePanels(
  inputImage: Buffer | null,
  genre: string,
  storyPrompt: string,
  count = 4
): Promise<string[]> {
  const prompt = buildStylePrompt(genre, storyPrompt);

  // Read API key at call time so dotenv can be loaded before this module is used.
  const apiKey = process.env.GEMINI_API_KEY ?? '';

  // We'll attempt to authenticate either via API key (query param) or via ADC (service account -> access token).
  let url = 'https://generative.googleapis.com/v1/images:generate';
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  if (apiKey) {
    // If a plain API key is provided, use it as a query param. Note: some generative endpoints require OAuth2 access tokens.
    url += `?key=${encodeURIComponent(apiKey)}`;
    console.log('Using API key from environment as query parameter for Generative API request.');
  } else {
    // Try to obtain an access token via Application Default Credentials (GOOGLE_APPLICATION_CREDENTIALS or environment ADC).
    try {
      const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
      const client = await auth.getClient();
      const tokenResponse = await client.getAccessToken();
      const token = typeof tokenResponse === 'string' ? tokenResponse : tokenResponse?.token;
      if (token) {
        headers.Authorization = `Bearer ${token}`;
        console.log('Obtained access token via GoogleAuth.');
      } else {
        console.warn('GoogleAuth: token acquisition returned empty token. Requests may fail.');
      }
    } catch (e) {
      console.warn('GoogleAuth token acquisition failed (no API key present):', e);
    }
  }

  // prepare request payload(s)
  // We'll attempt two-step pipeline:
  // 1) If inputImage present: ask Gemini to stylize the provided image to a manga likeness (image-to-image)
  // 2) Then ask for additional panels via text-to-image with consistent style, optionally seeding with stylized result.
  // Because public Gemini image endpoints differ across releases, this is implemented as a best-effort example using axios.

  try {
    const results: string[] = [];

    // Convert inputImage to base64 if present
    let inputBase64: string | null = null;
    if (inputImage) {
      inputBase64 = inputImage.toString("base64");
    }

    // Example single endpoint call per panel (could be batched)
    for (let i = 0; i < count; i++) {
      // Stable seed in prompt helps consistency across multiple runs
      const panelPrompt = `${prompt}\nPanel index: ${i + 1} / ${count}\nRender the character in a clear manga panel, high contrast.`;

      const payload: any = {
        model: "gemini-1.5-pro",
        // The exact field names below (e.g., "prompt", "image") may need to be adapted for your Gemini images endpoint.
        prompt: panelPrompt,
        // request PNG base64 in response if supported
        output_format: "png",
        quality: "high",
        // optionally pass the input image as seed
        ...(inputBase64 ? { init_image: inputBase64, image_influence: 0.8 } : {})
      };

      // Example endpoint - adjust if your account requires a different path
      const res = await axios.post(url, payload, { headers, timeout: 60_000 });

      // Expect res.data to contain base64 image(s). Try common shapes
      const base64Image =
        res?.data?.data?.[0]?.b64_json ||
        res?.data?.images?.[0]?.b64_json ||
        res?.data?.image ||
        null;

      if (base64Image) {
        results.push(base64Image);
      } else if (res?.data?.data?.[0]?.url) {
        // If API returns a hosted URL, fetch and convert to base64
        const url = res.data.data[0].url;
        const imgResp = await axios.get(url, { responseType: "arraybuffer" });
        results.push(Buffer.from(imgResp.data, "binary").toString("base64"));
      } else {
        // If unexpected shape, push fallback empty string so frontend can fallback
        results.push("");
      }
    }

    return results;
  } catch (err) {
      // Provide more actionable errors for common failure modes
      console.error("Gemini generation error:", err);
      const e: any = err;
      if (e?.response?.status === 404) {
        console.error('Generative API returned 404. Common causes:');
        console.error('- The Generative API is not enabled for your Google Cloud project');
        console.error('- The endpoint path used is not available to your account/version');
        console.error('- You used an API key where OAuth2 access token is required');
        console.error('Response body:', e?.response?.data || e?.response?.statusText);
      } else if (e?.response) {
        console.error('Generative API response:', e.response.status, e.response.data);
      }

      // Return empty so the calling route can fall back to mock images
      return [];
  }
}
