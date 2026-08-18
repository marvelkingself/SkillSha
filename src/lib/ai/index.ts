import { AIProvider } from "./provider";
import { GeminiProvider } from "./gemini";
import { AgentRouterProvider } from "./agentrouter";

let activeProvider: AIProvider | null = null;

/**
 * Returns the active AI Provider instance based on environment configuration.
 *
 * Configurable via environment variable:
 *   BLOG_AGENT_PROVIDER=agentRouter  (or BlogAgent=agentRouter / AI_PROVIDER=agentRouter)
 *   BLOG_AGENT_PROVIDER=gemini       (or BlogAgent=gemini / AI_PROVIDER=gemini)
 */
export function getAIProvider(): AIProvider {
  if (!activeProvider) {
    const providerSetting = (
      process.env.BLOG_AGENT_PROVIDER ||
      process.env.BlogAgent ||
      process.env.AI_PROVIDER ||
      ""
    ).toLowerCase().trim();

    if (
      providerSetting === "agentrouter" ||
      providerSetting === "agent_router" ||
      providerSetting === "agent-router"
    ) {
      console.log("[AI Provider] Using AgentRouter Provider (agentrouter.org)");
      activeProvider = new AgentRouterProvider();
    } else if (providerSetting === "gemini") {
      console.log("[AI Provider] Using Google Gemini Provider");
      activeProvider = new GeminiProvider();
    } else {
      // Auto-detect based on available API keys if no explicit provider is set
      if (process.env.AGENTROUTER_API_KEY && !process.env.GEMINI_API_KEY) {
        console.log("[AI Provider] Auto-selected AgentRouter Provider from AGENTROUTER_API_KEY");
        activeProvider = new AgentRouterProvider();
      } else {
        console.log("[AI Provider] Defaulting to Gemini Provider");
        activeProvider = new GeminiProvider();
      }
    }
  }
  return activeProvider;
}

export type { AIProvider };

