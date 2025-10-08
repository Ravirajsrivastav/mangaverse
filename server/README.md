# Manga Server

This small server accepts an uploaded image + prompt + genre and returns generated manga-style panels using the Gemini model (example).

Setup

1. cd server
2. npm install
3. copy .env.example to .env and add your GEMINI_API_KEY
4. npm run dev

The dev server uses port 4000 by default.

API

POST /api/generate-panels
- multipart/form-data
- file: image file
- genre: string
- prompt: string
- count: number

Response: { images: string[] } where each string is either a data URL or remote image URL.
