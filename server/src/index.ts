import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import sharp from "sharp";
import { generatePanels } from "./geminiClient";

dotenv.config();

const PORT = process.env.PORT || 4000;
const upload = multer({ storage: multer.memoryStorage() });
const app = express();

app.use(cors());
app.use(express.json());

// POST /api/generate-panels
// Expects multipart/form-data: file (optional), genre, prompt, count (optional)
app.post(
  "/api/generate-panels",
  upload.single("file"),
  async (req: express.Request, res: express.Response) => {
    try {
      const file = req.file ?? null;
      const genre = (req.body.genre as string) || "General";
      const prompt = (req.body.prompt as string) || "";
      const count = parseInt(req.body.count as string) || 4;

      // Preprocess uploaded image: resize and normalize using sharp
      let buffer: Buffer | null = null;
      if (file && file.buffer) {
        buffer = await sharp(file.buffer)
          .resize(1024, 1024, { fit: "inside" })
          .png()
          .toBuffer();
      }

      // Call gemini client
      const generatedBase64 = await generatePanels(buffer, genre, prompt, count);

      // If Gemini failed or returned empty, fallback to mock hosted images
      let images: string[] = [];
      if (generatedBase64 && generatedBase64.length > 0 && generatedBase64.some(Boolean)) {
        images = generatedBase64.map((b64) =>
          b64.startsWith("http") ? b64 : `data:image/png;base64,${b64}`
        );
      } else {
        images = [
          "https://images.pexels.com/photos/7915309/pexels-photo-7915309.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/8111815/pexels-photo-8111815.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg?auto=compress&cs=tinysrgb&w=800"
        ].slice(0, count);
      }

      res.json({ images });
    } catch (err) {
      console.error("Server error in /api/generate-panels:", err);
      res.status(500).json({
        error: "Generation failed. Please try again later.",
        details: String(err)
      });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Manga server listening on http://localhost:${PORT}`);
});
