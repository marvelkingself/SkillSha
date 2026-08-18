import { getAIProvider } from "../ai";
import { blogFileManager } from "./file-manager";
import { AgentSettingsData } from "./storage";

export interface ResearchTopic {
  title: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: string;
  targetAudience: string;
  contentType: string; // e.g. "Tutorial", "Guide", "Opinion", "Case Study"
  reasonForSelection: string;
}

/**
 * Topic Research Agent.
 * Researches and generates unique blog topics based on configured agent settings
 * and existing blog titles to avoid duplicates.
 */
export async function performTopicResearch(
  settings: AgentSettingsData,
  count: number,
  logCallback: (msg: string) => void
): Promise<ResearchTopic[]> {
  logCallback("Checking existing blog posts for deduplication...");
  const existingBlogs = await blogFileManager.getBlogsAsync(true);
  const existingTitles = existingBlogs.map((b) => b.title);
  logCallback(`Retrieved ${existingTitles.length} existing blog titles to prevent duplicates.`);

  logCallback("Initializing AI provider for topic research...");
  const ai = getAIProvider();

  const currentYear = new Date().getFullYear(); // 2026
  const systemInstruction = `You are an expert Content Research & SEO Specialist Agent. Your goal is to find highly engaging, search-intent optimized, and trending topics that will rank well on search engines. Avoid duplication at all costs.

CRITICAL YEAR INSTRUCTION: The current year is strictly ${currentYear}. All roadmaps, timelines, guides, course fees, and trend topics MUST use ${currentYear} (e.g. "Full Stack Developer Roadmap ${currentYear}", "6-Month Career Switch Guide ${currentYear}"). NEVER output outdated years like ${currentYear - 1}, ${currentYear - 2}, or older.`;

  const allTopics: ResearchTopic[] = [];
  const batchSize = 5;
  const totalBatches = Math.ceil(count / batchSize);

  for (let b = 0; b < totalBatches; b++) {
    const currentBatchCount = Math.min(batchSize, count - allTopics.length);
    logCallback(`Generating topic research batch ${b + 1}/${totalBatches} (${currentBatchCount} topics)...`);

    const knownTitles = [...existingTitles, ...allTopics.map((t) => t.title)];

    const prompt = `
Generate a list of exactly ${currentBatchCount} unique, high-value, long-tail keyword-focused blog topics for the following niche/website:
- **Niche**: ${settings.websiteNiche}
- **Target Audience**: ${settings.targetAudience}
- **Target Country**: ${settings.targetCountry}
- **Language**: ${settings.targetLanguage}

Here are the titles of blogs that ALREADY exist. DO NOT generate topics that are identical, highly similar, or semantically redundant with these:
${knownTitles.length > 0 ? knownTitles.slice(0, 30).map((t) => `- ${t}`).join("\n") : "(No existing blogs)"}

For each topic, output a structured JSON object:
1. "title": An engaging, SEO-optimized title (max 70 chars).
2. "primaryKeyword": The main keyword target.
3. "secondaryKeywords": An array of 3-5 related search terms.
4. "searchIntent": Search intent (e.g. "informational", "commercial").
5. "targetAudience": Who this article speaks to.
6. "contentType": Post style (e.g. "Guide", "Tutorial", "Case Study").
7. "reasonForSelection": Concise 1-sentence explanation of search demand.

Your output must be a valid JSON array of objects. Do not wrap in markdown codeblocks except JSON itself. Return ONLY the raw JSON array.
`;

    const batchTopics = await ai.generateStructuredData<ResearchTopic[]>(prompt, null, systemInstruction);

    if (Array.isArray(batchTopics)) {
      allTopics.push(...batchTopics);
      logCallback(`Batch ${b + 1} completed. Accumulated ${allTopics.length}/${count} topics.`);
    } else if (batchTopics && typeof batchTopics === "object") {
      // Single object fallback
      allTopics.push(batchTopics as any);
    }
  }

  logCallback(`Successfully researched and selected ${allTopics.length} total topics.`);
  return allTopics.slice(0, count);
}
