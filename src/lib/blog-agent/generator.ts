import { getAIProvider } from "../ai";
import { ResearchTopic } from "./research";
import { IAgentSettings } from "../models/AgentSettings";

export interface ArticleSection {
  heading: string;
  level: 2 | 3;
  content: string; // Supports markdown formatting (bold, italic, lists, bullet points, small tables)
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface GeneratedArticle {
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  introduction: string;
  sections: ArticleSection[];
  faqs: ArticleFAQ[];
  conclusion: string;
  ctaText: string; // Actionable call to action targeting SkillSha training programs
}

/**
 * Content Generation Agent.
 * Generates an in-depth, professional, and SEO-optimized article matching the target topic.
 */
export async function generateArticle(
  topic: ResearchTopic,
  settings: IAgentSettings,
  logCallback: (msg: string) => void
): Promise<GeneratedArticle> {
  logCallback(`Starting generation of article: "${topic.title}"...`);
  const ai = getAIProvider();

  const systemInstruction = `You are a Senior Technical Writer, SEO Expert, and Educator. Your style is clear, authoritative, human-like, and highly engaging. You write structured, comprehensive articles that provide real value, avoiding generic AI filler words.`;

  const prompt = `
Write a comprehensive, professional blog post in ${settings.targetLanguage} for the following topic:

- **Title**: ${topic.title}
- **Primary Keyword**: ${topic.primaryKeyword}
- **Secondary Keywords**: ${topic.secondaryKeywords.join(", ")}
- **Niche/Context**: ${settings.websiteNiche}
- **Target Audience**: ${topic.targetAudience}
- **Word Count Targets**: Minimum ${settings.minWords} words, Maximum ${settings.maxWords} words.

**Blog Post Writing Guidelines**:
1. **Introduction**: Compelling hook, introduces the topic and why it matters, mentions the primary keyword naturally.
2. **Body Sections**: Outline the article with clear H2 and H3 subsections. Provide practical examples, bullet points, step-by-step guides, or comparisons. If useful, include a markdown table. Maintain high value density.
3. **Primary Keyword**: Must appear in the introduction, at least one H2 heading, and naturally in body text 2-3 times (avoid keyword stuffing).
4. **Secondary Keywords**: Weave them naturally into subheadings or body text.
5. **FAQs**: Include a list of 3-5 real, search-intent driven questions and direct, helpful answers.
6. **Conclusion & CTA**: Summarize key lessons and conclude with a strong Call To Action (CTA) linking to SkillSha's live mentor-led IT training bootcamps (AI Engineering, Full-Stack Development, UI/UX Design).
7. **SEO Metadata**:
   - Meta Title (under 60 characters)
   - Meta Description (under 160 characters)
   - Short Excerpt (a concise 2-sentence summary)

Your output must be a valid structured JSON object matching this TypeScript interface structure:
{
  "title": "SEO title",
  "metaTitle": "meta title",
  "metaDescription": "meta description",
  "excerpt": "excerpt content",
  "primaryKeyword": "primary keyword",
  "secondaryKeywords": ["kw1", "kw2"],
  "introduction": "Introductory paragraphs...",
  "sections": [
    { "heading": "Heading Text", "level": 2, "content": "Detailed markdown formatted section content..." },
    { "heading": "Subheading Text", "level": 3, "content": "Detailed markdown sub-section content..." }
  ],
  "faqs": [
    { "question": "Question text?", "answer": "Answer text." }
  ],
  "conclusion": "Concluding paragraphs...",
  "ctaText": "Strong call to action text..."
}

Ensure the output is properly formatted JSON, with all strings properly escaped. Do not wrap in markdown except JSON format. Return ONLY the raw JSON string.
`;

  logCallback("Sending article generation request to AI provider...");
  const article = await ai.generateStructuredData<GeneratedArticle>(prompt, null, systemInstruction);

  if (!article || !article.title || !article.sections) {
    throw new Error("AI provider returned invalid JSON structure for generated article.");
  }

  logCallback(`Successfully generated article: "${article.title}"`);
  return article;
}
