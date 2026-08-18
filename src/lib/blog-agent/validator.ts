import { getAIProvider } from "../ai";
import { GeneratedArticle } from "./generator";
import { COURSE_SLUG_MAP } from "@/data/courses";
import { blogFileManager } from "./file-manager";

export interface SEOValidationResult {
  seoScore: number;
  isPassed: boolean;
  feedback: string[];
  updatedArticle: GeneratedArticle;
}

/**
 * SEO Quality Agent.
 * Validates generated blogs, injects internal links, and calculates an SEO score.
 */
export async function validateAndInjectLinks(
  article: GeneratedArticle,
  logCallback: (msg: string) => void
): Promise<SEOValidationResult> {
  logCallback("Starting SEO validation and internal link injection...");

  // 1. Compile list of available internal links
  const siteLinks: { anchor: string; url: string }[] = [];

  // Add course links
  Object.keys(COURSE_SLUG_MAP).forEach((key) => {
    const slug = COURSE_SLUG_MAP[key];
    siteLinks.push({
      anchor: `${key.replace("-", " ")} course`,
      url: `/course/${slug}`,
    });
  });

  // Add existing published blog links
  try {
    const existingBlogs = (await blogFileManager.getBlogsAsync(false)).slice(0, 20);
    existingBlogs.forEach((blog: any) => {
      siteLinks.push({
        anchor: blog.title,
        url: `/blog/${blog.slug}`,
      });
    });
  } catch (err) {
    console.error("Failed to load existing blogs for links:", err);
  }

  logCallback(`Compiled ${siteLinks.length} potential site targets for internal links.`);

  const ai = getAIProvider();
  const systemInstruction = `You are a Senior SEO Analyst and Content Optimizer. Your job is to audit content, insert high-quality contextually relevant hyperlinks naturally, and grade the overall SEO merit of the document.`;

  const prompt = `
You are auditing the following generated article:
- **Title**: ${article.title}
- **Primary Keyword**: ${article.primaryKeyword}
- **Secondary Keywords**: ${article.secondaryKeywords.join(", ")}

**Task 1: Inject 3 to 5 Natural Internal Links**
Below is a list of available site links and candidate URLs. Insert 3 to 5 markdown links (e.g. [Anchor Text](URL)) naturally into the "introduction", "sections" content, or "conclusion" of the article.
- Links must fit naturally in the sentences. Do not force them or change the meaning.
- Link anchors must use relevant keywords (avoid "click here" or "this course").
- You may slightly edit the sentences in the text to accommodate the link naturally.

Available Links List:
${siteLinks.map(l => `- Target Anchor Suggestion: "${l.anchor}" -> URL: "${l.url}"`).join("\n")}

**Task 2: Audit and Calculate SEO Score (0 to 100)**
Grade the post based on these parameters:
- Title is engaging and contains the primary keyword (max 70 chars) - (10pts)
- Meta Title/Description are present and within length limits - (10pts)
- Excerpt is strong and summarizes correctly - (10pts)
- Primary keyword is mentioned in the first 150 words of introduction and at least one H2 - (20pts)
- Secondary keywords are mentioned at least once - (10pts)
- Document structure uses logical headings (H2, H3) - (10pts)
- FAQs are highly relevant and informative - (10pts)
- Internal links are contextually relevant and useful - (15pts)
- Minimum word count is met without fluff - (5pts)

**Output JSON Structure Requirement**:
Provide your response strictly as a structured JSON object with the following fields:
{
  "seoScore": 92, // Integer score between 0 and 100
  "isPassed": true, // Boolean (true if seoScore >= 80, false otherwise)
  "feedback": ["Title length is good.", "Added 4 internal links.", "Primary keyword placed in intro."], // Array of audit comment strings
  "updatedArticle": {
     "title": "...",
     "metaTitle": "...",
     "metaDescription": "...",
     "excerpt": "...",
     "primaryKeyword": "...",
     "secondaryKeywords": [...],
     "introduction": "...",
     "sections": [
        { "heading": "...", "level": 2, "content": "..." }
     ],
     "faqs": [...],
     "conclusion": "...",
     "ctaText": "..."
  }
}

Ensure the output is 100% valid JSON. Return ONLY the JSON object.
`;

  logCallback("Sending link injection and SEO audit query to AI...");
  const auditResult = await ai.generateStructuredData<SEOValidationResult>(prompt, null, systemInstruction);

  if (!auditResult || typeof auditResult.seoScore !== "number") {
    throw new Error("SEO validator returned invalid audit JSON structure.");
  }

  logCallback(`SEO Validation Complete. Score: ${auditResult.seoScore}. Passed: ${auditResult.isPassed}`);
  return auditResult;
}
