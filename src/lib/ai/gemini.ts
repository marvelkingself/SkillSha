import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIProvider } from "./provider";

export class GeminiProvider implements AIProvider {
  private genAI: GoogleGenerativeAI | null = null;
  private modelName: string;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GOOGLE_GENE_AI_API_KEY;
    this.modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";

    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
  }

  private getGenAI(): GoogleGenerativeAI {
    if (!this.genAI) {
      throw new Error(
        "Gemini API key is missing. Please define GEMINI_API_KEY, GOOGLE_API_KEY, or GOOGLE_GENE_AI_API_KEY in environment variables."
      );
    }
    return this.genAI;
  }

  async generateText(prompt: string, systemInstruction?: string): Promise<string> {
    try {
      const genAI = this.getGenAI();
      const model = genAI.getGenerativeModel({
        model: this.modelName,
        systemInstruction: systemInstruction,
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return text;
    } catch (error: any) {
      console.error("Gemini text generation failed:", error);
      throw new Error(`Gemini text generation failed: ${error.message || error}`);
    }
  }

  async generateStructuredData<T>(prompt: string, schema?: any, systemInstruction?: string): Promise<T> {
    try {
      const genAI = this.getGenAI();
      
      // Configure generation options for structured JSON output
      const model = genAI.getGenerativeModel({
        model: this.modelName,
        systemInstruction: systemInstruction,
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse and return the JSON
      return JSON.parse(text) as T;
    } catch (error: any) {
      console.error("Gemini structured generation failed:", error);
      throw new Error(`Gemini structured generation failed: ${error.message || error}`);
    }
  }
}
