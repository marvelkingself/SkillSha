import { AIProvider } from "./provider";
import { GeminiProvider } from "./gemini";

let activeProvider: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (!activeProvider) {
    // In the future, we can add checking for other environment variables (e.g., OPENAI_API_KEY)
    // to instantiate an OpenAI provider. Currently, Gemini is our default.
    activeProvider = new GeminiProvider();
  }
  return activeProvider;
}

export type { AIProvider };
