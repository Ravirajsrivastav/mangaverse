import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from 'dotenv';
import { saveBase64AsImage } from "./utils";

dotenv.config();

export async function generatePanels(
  buffer: Buffer | null,
  genre: string,
  prompt: string,
  count: number
): Promise<string[]> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

   // jesa chahiye isme change kr dio 
      const textPrompt = `
    You are a proffesional manga artist, you will be given a prompt of the storyline , the genre and the real life person's image which you have to replicate. Keep the persons image similar and exact in the artistic version. You will also be given a "count" which will be no. of panels.
    Given these information generate a single Image of manga story with the no. of panels provided, in one image only depicting the whole story line, keep the dialouges in english, a black and white high contrast manga.
    Here is the genre : ${genre} 
    Here is the storyline prompt : ${prompt}
    Here is the count of panels : ${count}
    `;;

    
    const contentParts: any[] = [{ text: textPrompt }];

    if (buffer) {
      const base64Image = buffer.toString("base64");
      contentParts.push({
        inlineData: {
          mimeType: "image/png",
          data: base64Image,
        },
      });
    }

  //power ful model available nahi hai bro toh jo india mein available hai vaahi use kra hai 
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: contentParts,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    console.log(response);

    if (!response || !response.candidates || response.candidates.length === 0) {
      console.error("No response from Gemini API");
      return [];
    }

    const base64Images: string[] = [];
    
    for (const candidate of response.candidates) {
      if (candidate.content?.parts) {
        for (const part of candidate.content.parts) {
          console.log(part)
          if (part.inlineData?.data) {
            base64Images.push(part.inlineData.data);
            saveBase64AsImage(base64Images[0], './output/panel-1.png');
          }
        }
      }
    }

    if (base64Images.length === 0) {
      console.warn("No images generated from Gemini");
      return [];
    }

    // Return single image (this model generates one image at a time)
    return [base64Images[0]];
  } catch (error: any) {
    if (error?.status === 429) {
      console.error("Rate limit exceeded. Wait before making another request.");
    } else if (error?.message?.includes("paid tier")) {
      console.error("Image generation requires paid tier API access.");
    } else {
      console.error("Error generating panels with Gemini:", error);
    }
    return [];
  }
}