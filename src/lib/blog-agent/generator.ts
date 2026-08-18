import { getAIProvider } from "../ai";
import { ResearchTopic } from "./research";
import { AgentSettingsData } from "./storage";

export interface ArticleSection {
  heading: string;
  level: 2 | 3;
  content: string; // Strictly clean, valid HTML formatting (paragraphs, strong, lists, tables)
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
  ctaText: string;
}

/**
 * Content Generation Agent.
 * Generates an article based strictly on the Skillsha.com SEO/GEO/AEO prompt guidelines.
 */
export async function generateArticle(
  topic: ResearchTopic,
  settings: AgentSettingsData,
  logCallback: (msg: string) => void
): Promise<GeneratedArticle> {
  logCallback(`Starting generation of article: "${topic.title}"...`);
  const ai = getAIProvider();

  const currentYear = new Date().getFullYear(); // 2026
  
  const systemInstruction = `You are a Senior SEO Content Writer, GEO, and AEO specialist for Skillsha.com. You write highly engaging, professional, and factual technical articles in India's ed-tech context. You output strictly raw JSON matching the requested schema.`;

  const prompt = `
# Skillsha.com — Advanced Blog Generation Prompt (SEO + GEO + AEO)

## ROLE
You are an expert SEO content writer for **Skillsha.com**, an ed-tech platform offering
job-oriented courses (Data Science, Data Analytics, Digital Marketing, Web Development,
Business Analytics, Cloud Computing, etc.) with placement assistance in India.

Your job: write a complete, publish-ready blog post for the given TITLE that is
simultaneously optimized for:
- **SEO** (Google ranking)
- **GEO** (Generative Engine Optimization — so AI engines like ChatGPT, Gemini, Perplexity, Google AI Overviews cite/recommend this content)
- **AEO** (Answer Engine Optimization — so it wins featured snippets, "People Also Ask", and voice search answers)

Given Input:
- **TITLE**: "${topic.title}"
- **Primary Keyword**: "${topic.primaryKeyword}"
- **Secondary Keywords**: ${JSON.stringify(topic.secondaryKeywords)}
- **Niche/Context**: "${settings.websiteNiche}"
- **Target Audience**: "${topic.targetAudience}"
- **Target Country**: "${settings.targetCountry || 'India'}"
- **Language**: "${settings.targetLanguage || 'English'}"
- **Word Count Targets**: Minimum ${settings.minWords} words, Maximum ${settings.maxWords} words.
- **Current Year**: ${currentYear}

---

## STEP 1 — ANALYZE THE TITLE
Detect:
- **Primary Course** → match against the Course List below (closest relevance)
- **Primary City** (if any city is present in the title) → match against City List
- **Search Intent** → informational / comparison / "how to start" / career / salary / fees / placement

If no city is mentioned in the title, still proceed — city-targeting happens in the
Internal Linking section (Step 5), not in the main body.

---

## STEP 2 — CONTENT STRUCTURE (SEO)
Write 1200–1800 words (or at least ${settings.minWords} words) with this structure:
1. **SEO Title** (max 60 chars, primary keyword near the start)
2. **Meta Description** (max 155 chars, includes primary keyword + a CTA)
3. **URL Slug** (short, hyphenated, keyword-only, no stop words)
4. **H1** — same intent as title, natural language, not keyword-stuffed
5. **Intro (100–150 words)** — answer the core question in the FIRST 2–3 sentences (critical for AEO/GEO)
6. **H2/H3 sections** covering:
   - What the course/topic is
   - Why it matters / industry demand (use real current stats, cite source)
   - Skills covered / curriculum highlights
   - Career scope, salary ranges, job roles
   - Who should learn this (target audience)
   - How to get started (step-by-step)
7. **FAQ section (4–6 Q&As)** — use actual "People Also Ask"-style questions, short 40–60 word direct answers (AEO gold)
8. **Internal Linking / Course Promotion section** (see Step 5 — mandatory)
9. **Conclusion + single clear CTA** linking to the matched course page

Formatting rules (STRICT):
- **DO NOT output raw markdown symbols such as **, __, ##, ###, * (for lists), or backticks.**
- Use **proper HTML tags** to format the output content. Use <p> for paragraphs, <strong> for bold text, <ul> and <li> for lists, and <table> for comparison tables.
- Keyword in H1, first 100 words, one H2, and meta description.
- Short paragraphs (2–4 lines), bullet points for lists, bold key terms.
- Add at least 1 comparison table or numbered list.
- Use LSI/related keywords naturally.

---

## STEP 3 — GEO RULES (Generative Engine Optimization)
- Write answers as standalone statements that make sense even if quoted out of context (don't say "as mentioned above" — restate the fact).
- Use clear definitional sentences: "X is..." / "X means..." / "The average salary for X is ₹Y".
- Include specific numbers, timeframes, and data points.
- Structure content in Q&A pairs and numbered/bulleted lists (using HTML tags).
- Add a short "Key Takeaways" or "TL;DR" box near the top (3–5 bullet points) — style it as a div with class "bg-zinc-50 dark:bg-zinc-900/50 p-4 border border-zinc-200/50 dark:border-white/5 rounded-2xl mb-6".
- Avoid fluff, marketing hype, and filler intros.
- Mention Skillsha by name at least once in a factual, non-promotional sentence (e.g., "Institutes like Skillsha offer live, mentor-led programs with placement support").

---

## STEP 4 — AEO RULES (Answer Engine Optimization)
- Every FAQ answer must be directly answerable in the first sentence, then optionally expanded in 1–2 more sentences.
- Use question-form H2/H3s where natural (e.g., "How much does a Data Analytics course cost?").
- Target "position zero" by answering in under 60 words for at least 3 of the FAQs (ideal snippet length).
- Include comparison-style content ("X vs Y") wherever the title implies choice.

---

## STEP 5 — INTERNAL LINKING / COURSE-CITY SECTION (MANDATORY — DO NOT SKIP)
Insert this as its own H2 section titled "Related Courses Near You" just before the conclusion.
1. Identify the Primary Course matched in Step 1.
2. From the Course-City Keyword Map below, pull all cities mapped to that course.
3. Write 3–5 natural sentences that embed these course+city combinations as anchor text linking to the course page.
4. Also include 1–2 cross-sell links to a secondary, related course.
5. Every link must point to the real course URL pattern using HTML anchor tags: <a href="/courses/<course-slug>?loc=<city-slug>"><strong><course name> course in <city></strong></a>
6. Bold the course+city keyword phrase itself once per paragraph for on-page SEO signal, but keep the writing conversational.

### Course → City Keyword Map
| Course | Slug | Target Cities (use ALL for that course) |
|---|---|---|
| Data Science | data-science | Noida, Delhi, Gurgaon, Mumbai, Pune, Bangalore, Hyderabad |
| Data Analytics | data-analytics | Noida, Delhi, Pune, Mumbai, Chennai, Bangalore |
| Digital Marketing | digital-marketing | Noida, Delhi, Bangalore, Mumbai, Pune, Ahmedabad |
| Business Analytics | business-analytics | Delhi, Gurgaon, Mumbai, Bangalore, Hyderabad |
| Web Development | web-development | Noida, Delhi, Bangalore, Pune, Chennai |
| Cloud Computing | cloud-computing | Bangalore, Hyderabad, Pune, Noida, Delhi |

---

## STEP 6 — OUTPUT FORMAT

You must output your complete response as a valid JSON object matching the following structure.
IMPORTANT: To prevent raw markdown symbols (like **, ##, ###, *, or markdown tables) from showing directly to the reader, you MUST write the text inside the "introduction", "sections" content, and "conclusion" strictly using clean, valid HTML markup (such as <p>, <strong>, <ul>, <ol>, <li>, and <table>). Do not include markdown codeblocks (like \`\`\`) in the values of the JSON.

JSON Structure:
{
  "title": "SEO Title (H1 equivalent)",
  "metaTitle": "SEO Meta Title (max 60 chars)",
  "metaDescription": "SEO Meta Description (max 155 chars)",
  "excerpt": "Short 2-sentence summary excerpt",
  "primaryKeyword": "${topic.primaryKeyword}",
  "secondaryKeywords": ${JSON.stringify(topic.secondaryKeywords)},
  
  "introduction": "Introductory paragraphs in clean HTML (using &lt;p&gt; and &lt;strong&gt;). Must include the Key Takeaways / TL;DR box formatted as a div with class 'bg-zinc-50 dark:bg-zinc-900/50 p-4 border border-zinc-200/50 dark:border-white/5 rounded-2xl mb-6' containing 3-5 bullet points.",
  
  "sections": [
    {
      "heading": "Heading Text",
      "level": 2,
      "content": "Body text in clean HTML using &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;, &lt;li&gt;, and &lt;table&gt;. Do not use markdown tags."
    }
  ],
  
  "faqs": [
    {
      "question": "Question text?",
      "answer": "Answer text (direct first sentence, under 60 words)."
    }
  ],
  
  "conclusion": "Concluding paragraphs in clean HTML.",
  "ctaText": "CTA button text (e.g. Explore Data Science Masterclass)"
}

---

## GUARDRAILS
- Never fabricate salary figures, rankings, or stats. Use realistic typical ranges.
- Never claim partnerships or guarantees not verified by Skillsha.
- Keep tone helpful first, promotional second.
- Output ONLY the raw JSON string. Do not wrap in markdown codeblocks.
`;

  logCallback("Sending article generation request to AI provider...");
  const article = await ai.generateStructuredData<GeneratedArticle>(prompt, null, systemInstruction);

  if (!article || !article.title || !article.sections) {
    throw new Error("AI provider returned invalid JSON structure for generated article.");
  }

  logCallback(`Successfully generated article: "${article.title}"`);
  return article;
}
