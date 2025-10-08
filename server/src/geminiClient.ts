import axios from "axios";
import { GoogleAuth } from 'google-auth-library';
import sharp from 'sharp';

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
 */
export async function generatePanels(
  inputImage: Buffer | null,
  genre: string,
  storyPrompt: string,
  count = 4
): Promise<string[]> {
  const prompt = buildStylePrompt(genre, storyPrompt);

  // Read environment variables.
  const apiKey = process.env.GEMINI_API_KEY ?? '';
  // *** CHANGE: You need your Google Cloud Project ID for the Vertex AI endpoint. ***
  const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
  if (!projectId) {
    console.error('GOOGLE_CLOUD_PROJECT_ID environment variable not set.');
    return [];
  }

  // *** CHANGE: This is the correct endpoint for the Imagen model on Vertex AI. ***
  let url = `https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/publishers/google/models/imagegeneration:predict`;

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  // Authentication logic remains the same, but Vertex AI typically requires OAuth2 (ADC/Bearer Token).
  // An API key might not work depending on your project's configuration.
  if (apiKey) {
    // Note: Vertex AI endpoints usually prefer OAuth2 access tokens over API keys.
    // This part is kept for compatibility, but the token method is recommended.
    try {
        const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
        const client = await auth.getClient();
        const tokenResponse = await client.getAccessToken();
        const token = typeof tokenResponse === 'string' ? tokenResponse : tokenResponse?.token;
        if (token) {
          headers.Authorization = `Bearer ${token}`;
          console.log('Obtained access token via GoogleAuth.');
        }
      } catch (e) {
        console.warn('GoogleAuth token acquisition failed:', e);
        // Fallback for API key usage if needed, although less common for Vertex
        if (!headers.Authorization) {
            url += `?key=${encodeURIComponent(apiKey)}`;
            console.log('Using API key from environment as query parameter.');
        }
      }
  } else {
    console.error('Authentication failed: No API key or Application Default Credentials found.');
    return [];
  }

  try {
    const results: string[] = [];

    // Pre-process the image with Sharp to reduce size (this is correct).
    let inputBase64: string | null = null;
    if (inputImage) {
      try {
        const target = parseInt(process.env.GENERATION_INIT_IMAGE_SIZE || '512', 10);
        const jpegBuffer = await sharp(inputImage)
          .resize({ width: target, height: target, fit: 'inside' })
          .jpeg({ quality: 78 })
          .toBuffer();
        inputBase64 = jpegBuffer.toString('base64');
      } catch (e) {
        console.warn('sharp preprocessing failed, using original image buffer:', e);
        inputBase64 = inputImage.toString('base64');
      }
    }

    // Loop to generate panels.
    for (let i = 0; i < count; i++) {
      const panelPrompt = `${prompt}\nPanel index: ${i + 1} / ${count}\nRender the character in a clear manga panel, high contrast.`;
      
      // *** CHANGE: Use the `init_image` only for the first panel. ***
      const useInitImage = i === 0 && inputBase64;

      // *** CHANGE: This payload structure matches the Vertex AI Imagen API. ***
      const payload = {
        instances: [
          {
            prompt: panelPrompt,
            ...(useInitImage ? { image: { bytesBase64Encoded: inputBase64 } } : {})
          }
        ],
        parameters: {
          sampleCount: 1,
          // Conditionally set the mode for the API call
          ...(useInitImage ? { mode: 'image-to-image', strength: 0.8 } : { mode: 'text-to-image' })
        }
      };

      // Retry logic remains the same (this is correct).
      const maxRetries = 3;
      let res: any = null;
      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          res = await axios.post(url, payload, { headers, timeout: 90_000 }); // Increased timeout to 90s
          break; // Success
        } catch (err: any) {
          const isNetworkErr = err?.code && ['ECONNRESET', 'ETIMEDOUT'].includes(err.code);
          const status = err?.response?.status;
          const is5xx = status && status >= 500 && status < 600;

          if (attempt < maxRetries - 1 && (isNetworkErr || is5xx)) {
            const backoff = 1000 * Math.pow(2, attempt); // 1s, 2s, 4s
            console.warn(`API request failed (attempt ${attempt + 1}/${maxRetries}) - retrying in ${backoff}ms`, err.code || status);
            await new Promise((r) => setTimeout(r, backoff));
            continue;
          }
          throw err;
        }
      }

      // *** CHANGE: Parse the response according to the Vertex AI structure. ***
      const base64Image = res?.data?.predictions?.[0]?.bytesBase64Encoded || null;

      if (base64Image) {
        results.push(base64Image);
      } else {
        console.warn(`Panel ${i + 1} generation failed or returned unexpected data.`);
        results.push(""); // Push empty string for fallback
      }
    }
    return results;
  } catch (err) {
    console.error("Gemini generation error:", err);
    const e: any = err;
    if (e?.response) {
      console.error('API response error:', e.response.status, JSON.stringify(e.response.data, null, 2));
    }
    return []; // Return empty array on failure
  }
}