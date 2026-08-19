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
 * Topic Research Agent for Skillsha.com.
 * Researches and generates unique blog topics aligned with SEO + GEO + AEO goals
 * targeting Skillsha courses (Data Science, Data Analytics, Digital Marketing, Business Analytics, Web Development, Cloud Computing)
 * and city locations.
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
  const systemInstruction = `You are an expert SEO, GEO, and AEO Content Research Specialist for Skillsha.com, an ed-tech platform in India.
Your goal is to find highly engaging, search-intent optimized, and trending topics that will rank well on search engines and win AI answers in ChatGPT, Gemini, Perplexity, and Google AI Overviews.

CRITICAL YEAR INSTRUCTION: The current year is strictly ${currentYear}. All roadmaps, timelines, guides, course fees, and trend topics MUST use ${currentYear} (e.g. "Full Stack Developer Roadmap ${currentYear}", "6-Month Career Switch Guide ${currentYear}"). NEVER output outdated years like ${currentYear - 1}, ${currentYear - 2}, or older.`;

  const allTopics: ResearchTopic[] = [];
  const batchSize = 5;
  const totalBatches = Math.ceil(count / batchSize);

  for (let b = 0; b < totalBatches; b++) {
    const currentBatchCount = Math.min(batchSize, count - allTopics.length);
    logCallback(`Generating topic research batch ${b + 1}/${totalBatches} (${currentBatchCount} topics)...`);

    const knownTitles = [...existingTitles, ...allTopics.map((t) => t.title)];

    const prompt = `
Generate a list of exactly ${currentBatchCount} unique, high-value, long-tail keyword-focused blog topics for Skillsha.com:
- **Core Courses**: Data Science, Data Analytics, Digital Marketing, Business Analytics, Web Development, Cloud Computing.
- **Target Cities (Optional in title)**: Noida, Delhi, Gurgaon, Mumbai, Pune, Bangalore, Hyderabad, Chennai, Ahmedabad.
- **Niche/Context**: ${settings.websiteNiche}
- **Target Audience**: ${settings.targetAudience}
- **Target Country**: ${settings.targetCountry || "India"}
- **Language**: ${settings.targetLanguage || "English"}
- **Current Year**: ${currentYear}

Here are the titles of blogs that ALREADY exist. DO NOT generate topics that are identical, highly similar, or semantically redundant with these:
${knownTitles.length > 0 ? knownTitles.slice(0, 30).map((t) => `- ${t}`).join("\n") : "(No existing blogs)"}

Search Intents to target across topics:
- Informational ("What is...", "Guide to...")
- Comparison ("X vs Y", "Online vs Offline")
- "How to Start" / Career Switch Roadmaps
- Fees & Salary Insights ("Course Fees in 2026", "Salary after 30")
- Placement & Job Eligibility

For each topic, output a structured JSON object:
1. "title": An engaging, SEO-optimized title (max 70 chars). Include ${currentYear} where natural.
2. "primaryKeyword": The main keyword target.
3. "secondaryKeywords": An array of 3-5 related search terms (e.g. "course fees", "syllabus", "placement support", "eligibility").
4. "searchIntent": Search intent (e.g. "informational", "comparison", "commercial").
5. "targetAudience": Who this article speaks to.
6. "contentType": Post style (e.g. "Guide", "Tutorial", "Comparison", "Career Switch").
7. "reasonForSelection": Concise 1-sentence explanation of search demand and AEO snippet opportunity.

Your output must be a valid JSON array of objects. Return ONLY the raw JSON array.
`;

    const batchTopics = await ai.generateStructuredData<ResearchTopic[]>(prompt, null, systemInstruction);

    if (Array.isArray(batchTopics)) {
      allTopics.push(...batchTopics);
      logCallback(`Batch ${b + 1} completed. Accumulated ${allTopics.length}/${count} topics.`);
    } else if (batchTopics && typeof batchTopics === "object") {
      allTopics.push(batchTopics as any);
    }
  }

  logCallback(`Successfully researched and selected ${allTopics.length} total topics.`);
  return allTopics.slice(0, count);
}
