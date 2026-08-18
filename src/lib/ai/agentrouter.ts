import { AIProvider } from "./provider";
import { safeParseJSON } from "./json-repair";

async function fetchWithRetry(url: string, options: any, retries = 5): Promise<Response> {
  const timeoutMs = parseInt(process.env.AGENTROUTER_TIMEOUT_MS || "300000", 10); // 5 minutes default timeout

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);

      const requestOptions = {
        ...options,
        signal: controller.signal,
      };

      const res = await fetch(url, requestOptions);
      clearTimeout(timer);

      if (res.status === 504 || res.status === 502 || res.status === 503) {
        if (attempt < retries) {
          const delay = Math.min(12000, 3000 * attempt);
          console.warn(`[AgentRouter] Received HTTP ${res.status} (Gateway Timeout). Retrying attempt ${attempt}/${retries} in ${delay}ms...`);
          await new Promise((r) => setTimeout(r, delay));
          continue;
        }
      }
      return res;
    } catch (err: any) {
      const isAbort = err.name === "AbortError" || err.message?.includes("aborted");
      const errMsg = isAbort ? `Request timed out after ${timeoutMs / 1000}s` : err.message;

      if (attempt < retries) {
        const delay = Math.min(12000, 3000 * attempt);
        console.warn(`[AgentRouter] ${errMsg}. Retrying attempt ${attempt}/${retries} in ${delay}ms...`);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      throw new Error(`AgentRouter request failed after ${retries} attempts (${errMsg})`);
    }
  }
  throw new Error("AgentRouter request timed out after max retries.");
}

/**
 * AI Provider for AgentRouter (https://agentrouter.org).
 * AgentRouter offers an OpenAI-compatible API endpoint supporting multiple models
 * such as Claude, GPT, Gemini, and DeepSeek.
 */
export class AgentRouterProvider implements AIProvider {
  private apiKey: string;
  private baseUrl: string;
  private modelName: string;

  constructor() {
    this.apiKey =
      process.env.AGENTROUTER_API_KEY ||
      process.env.OPENAI_API_KEY ||
      "";
    this.baseUrl = (
      process.env.AGENTROUTER_BASE_URL || "https://agentrouter.org/v1"
    ).replace(/\/$/, "");
    this.modelName =
      process.env.AGENTROUTER_MODEL || "claude-opus-5";
  }

  private checkApiKey(): string {
    if (!this.apiKey) {
      throw new Error(
        "AgentRouter API key is missing. Please define AGENTROUTER_API_KEY in environment variables."
      );
    }
    return this.apiKey;
  }

  async generateText(prompt: string, systemInstruction?: string): Promise<string> {
    const apiKey = this.checkApiKey();
    const endpoint = `${this.baseUrl}/chat/completions`;

    const messages: Array<{ role: string; content: string }> = [];
    if (systemInstruction) {
      messages.push({ role: "system", content: systemInstruction });
    }
    messages.push({ role: "user", content: prompt });

    try {
      const response = await fetchWithRetry(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "User-Agent": "Cline/3.1.0",
          "X-Client-Name": "Claude-Code",
        },
        body: JSON.stringify({
          model: this.modelName,
          messages,
          temperature: 0.7,
          max_tokens: 8192,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`AgentRouter HTTP error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error("AgentRouter returned an empty response content.");
      }

      return content;
    } catch (error: any) {
      console.error("AgentRouter text generation failed:", error);
      throw new Error(`AgentRouter text generation failed: ${error.message || error}`);
    }
  }

  async generateStructuredData<T>(
    prompt: string,
    schema?: any,
    systemInstruction?: string
  ): Promise<T> {
    const apiKey = this.checkApiKey();
    const endpoint = `${this.baseUrl}/chat/completions`;

    const messages: Array<{ role: string; content: string }> = [];
    let sysPrompt = systemInstruction || "";
    sysPrompt += "\nIMPORTANT: You must respond ONLY with a valid, raw JSON object. Do not include markdown formatting or commentary.";

    messages.push({ role: "system", content: sysPrompt.trim() });
    messages.push({ role: "user", content: prompt });

    try {
      const response = await fetchWithRetry(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "User-Agent": "Cline/3.1.0",
          "X-Client-Name": "Claude-Code",
        },
        body: JSON.stringify({
          model: this.modelName,
          messages,
          temperature: 0.3,
          max_tokens: 8192,
          response_format: { type: "json_object" },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`AgentRouter HTTP error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const rawContent = data?.choices?.[0]?.message?.content;

      if (!rawContent) {
        throw new Error("AgentRouter returned empty structured content.");
      }

      return safeParseJSON<T>(rawContent);
    } catch (error: any) {
      console.error("AgentRouter structured data generation failed:", error);
      throw new Error(
        `AgentRouter structured data generation failed: ${error.message || error}`
      );
    }
  }
}
