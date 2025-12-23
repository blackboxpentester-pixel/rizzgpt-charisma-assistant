
import { GoogleGenAI, Type } from "@google/genai";
import { RizzResponse, RizzType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateRizzLines = async (message: string, intensity: number = 50): Promise<RizzResponse> => {
  const model = "gemini-3-flash-preview";
  
  const intensityMap = (val: number) => {
    if (val < 30) return "subtle and polite";
    if (val < 70) return "charming and clever";
    return "bold, direct, and highly flirtatious";
  };

  const response = await ai.models.generateContent({
    model: model,
    contents: `The user received this message: "${message}". Generate 4 distinct "rizz" (smooth/flirty) replies.
    The desired vibe is ${intensityMap(intensity)}.
    
    Categorize them as:
    1. ${RizzType.SMOOTH}: Effortlessly cool.
    2. ${RizzType.WITTY}: Intelligent and playful banter.
    3. ${RizzType.BOLD}: Direct and confident.
    4. ${RizzType.WHOLESOME}: Sweet but still shows interest.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          rizzLines: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                line: { type: Type.STRING },
                explanation: { type: Type.STRING, description: "Why this works for the given message" }
              },
              required: ["type", "line", "explanation"]
            }
          }
        },
        required: ["rizzLines"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Could not interpret the rizz. Please try again.");
  }
};
