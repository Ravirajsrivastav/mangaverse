# Manga Server

This server accepts an uploaded image + prompt + genre and returns generated manga-style panels using Google Generative API (Gemini).

Quick start

1. Install dependencies

```powershell
cd server
npm install
```

2. Create `.env` from the example and add your credentials

```powershell
copy .env.example .env
# then edit .env and add GEMINI_API_KEY=... or set GOOGLE_APPLICATION_CREDENTIALS to a service account JSON path
```

3. Start dev server

```powershell
npm run dev
```

API

POST /api/generate-panels
- multipart/form-data
  - file: (image file, optional)
  - genre: string
  - prompt: string
  - count: number (optional)

Response: { images: string[] } – data URLs or fallback hosted images.

Troubleshooting & improvements

1) "No GEMINI_API_KEY - returning mock images" or empty results
- Make sure you set `GEMINI_API_KEY` in `.env` or configure Application Default Credentials via `GOOGLE_APPLICATION_CREDENTIALS` (preferred for OAuth tokens).
- The gemini client will prefer an API key as `?key=...` if present, otherwise it attempts to obtain an OAuth access token using `google-auth-library`.

2) 404 / Not Found from generative.googleapis.com
- Ensure the Generative AI API is enabled in your Google Cloud project.
- Some accounts / versions expose different REST endpoints. If 404 persists, check the Generative API docs for your account and adapt the endpoint path and request body accordingly.

3) ECONNRESET or large payload errors
- We now preprocess `init_image` with `sharp` to resize and compress it to 512px JPEG (configurable via `GENERATION_INIT_IMAGE_SIZE`) before base64-encoding. This reduces request size.
- We also added a simple retry/backoff loop (3 attempts) for transient network errors (ECONNRESET/ETIMEDOUT/5xx).

4) Use service account + ADC (recommended)
- Create a service account in Google Cloud Console, grant required permissions and download the JSON key.
- Set `GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\service-account.json` in your `.env`.
- Install `google-auth-library` in the server: `npm install google-auth-library`.

5) If you still see repeated network errors
- Reduce `GENERATION_INIT_IMAGE_SIZE` in `.env` to 256 and try again.
- Check your network/firewall. Some corporate networks/antivirus block TLS handshakes or large POSTs.
- If the endpoint still fails, test with a small curl payload or try using the official Google SDK or HTTP samples for the Generative API to confirm compatibility.


Contact

If you'd like, I can adapt the request body to a specific Generative API version if you paste the API docs or an example request from your account. I can also add server-side caching, queueing, or upload-to-S3 for generated images.
