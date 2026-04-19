import { GoogleGenAI } from "@google/genai";

// Inicialização segura para ambiente servidor-side
let ai: GoogleGenAI | null = null;

export function getGeminiModel() {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY não configurada nos ambientes.");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  // Utilizando Gemini 1.5 Pro como modelo Sentinel para Sofia
  return ai.getGenerativeModel({ model: "gemini-1.5-pro" });
}
