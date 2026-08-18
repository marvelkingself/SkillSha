import { getAIProvider } from "../ai";
import BlogMetadata from "../models/BlogMetadata";
import { IAgentSettings } from "../models/AgentSettings";
import { dbConnect } from "../db";

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
  settings: IAgentSettings,
  count: number,
  logCallback: (msg: string) => void
): Promise<ResearchTopic[]> {
  logCallback("Connecting to database for deduplication checks...");
  await dbConnect();

  // Retrieve existing blog titles/topics to avoid duplicate generation
  const existingBlogs = await BlogMetadata.find({}, "title slug").lean();
  const existingTitles = existingBlogs.map((b) => b.title);
  logCallback(`Retrieved ${existingTitles.length} existing blog titles to prevent duplicates.`);

  logCallback("Initializing AI provider for topic research...");
  const ai = getAIProvider();

  const systemInstruction = `You are an expert Content Research & SEO Specialist Agent. Your goal is to find highly engaging, search-intent optimized, and trending topics that will rank well on search engines. Avoid duplication at all costs.`;

  const prompt = `
Generate a list of exactly ${count} unique, high-value, long-tail keyword-focused blog topics for the following niche/website:
- **Niche**: ${settings.websiteNiche}
- **Target Audience**: ${settings.targetAudience}
- **Target Country**: ${settings.targetCountry}
- **Language**: ${settings.targetLanguage}

Here are the titles of blogs that ALREADY exist. DO NOT generate topics that are identical, highly similar, or semantically redundant with these:
${existingTitles.length > 0 ? existingTitles.map(t => `- ${t}`).join("\n") : "(No existing blogs)"}

For each topic, you must output a structured JSON object containing:
1. "title": An engaging, SEO-optimized title (max 70 chars).
2. "primaryKeyword": The main keyword targets should rank for.
3. "secondaryKeywords": An array of 3-5 related search terms.
4. "searchIntent": The intent (e.g., informational, transactional, commercial).
5. "targetAudience": Who this article speaks to.
6. "contentType": The style of the post (e.g. "Guide", "Tutorial", "Case Study").
7. "reasonForSelection": Detailed explanation of search demand, content gap, or trend reason.

Your output must be a valid JSON array of objects. Do not wrap in markdown codeblocks except JSON itself. Return ONLY the raw JSON array.
`;

  logCallback("Executing topic research generation via AI...");
  const topics = await ai.generateStructuredData<ResearchTopic[]>(prompt, null, systemInstruction);

  if (!Array.isArray(topics)) {
    throw new Error("AI provider failed to return a valid JSON array for topics.");
  }

  logCallback(`Successfully researched and selected ${topics.length} topics.`);
  return topics;
}
