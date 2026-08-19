import { getAIProvider } from "../ai";
import { ResearchTopic } from "./research";
import { AgentSettingsData } from "./storage";

export interface ArticleSection {
  heading: string;
  level: 2 | 3;
  content: string; // Clean HTML content (<p>, <strong>, <ul>, <li>, <table>, <a>)
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
  faqSchema?: string;
  primaryCourseMatched?: string;
  primaryCityMatched?: string;
  internalLinksUsed?: string[];
}

/**
 * Content Generation Agent.
 * Generates an article based strictly on the Skillsha.com Advanced Blog Generation Prompt (SEO + GEO + AEO).
 */
export async function generateArticle(
  topic: ResearchTopic,
  settings: AgentSettingsData,
  logCallback: (msg: string) => void
): Promise<GeneratedArticle> {
  logCallback(`Starting generation of article: "${topic.title}"...`);
  const ai = getAIProvider();

  const currentYear = new Date().getFullYear(); // 2026

  const systemInstruction = `You are an expert SEO content writer for Skillsha.com, an ed-tech platform offering job-oriented courses (Data Science, Data Analytics, Digital Marketing, Web Development, Business Analytics, Cloud Computing, etc.) with placement assistance in India.

Your job: write a complete, publish-ready blog post for the given TITLE that is simultaneously optimized for:
- SEO (Google ranking)
- GEO (Generative Engine Optimization — so AI engines like ChatGPT, Gemini, Perplexity, Google AI Overviews cite/recommend this content)
- AEO (Answer Engine Optimization — so it wins featured snippets, "People Also Ask", and voice search answers)

CRITICAL YEAR CONTEXT: The current year is strictly ${currentYear}. Always use ${currentYear} for timelines, roadmaps, career guides, course fee comparisons, and tech trends. NEVER output outdated years like ${currentYear - 1}, ${currentYear - 2}, or older.`;

  const prompt = `
# Skillsha.com — Advanced Blog Generation Prompt (SEO + GEO + AEO)

## ROLE
You are an expert SEO content writer for **Skillsha.com**, an ed-tech platform offering job-oriented courses (Data Science, Data Analytics, Digital Marketing, Web Development, Business Analytics, Cloud Computing, etc.) with placement assistance in India.

Given Input:
- **TITLE**: "${topic.title}"
- **Primary Keyword**: "${topic.primaryKeyword}"
- **Secondary Keywords**: ${JSON.stringify(topic.secondaryKeywords)}
- **Niche/Context**: "${settings.websiteNiche}"
- **Target Audience**: "${topic.targetAudience}"
- **Target Country**: "${settings.targetCountry || "India"}"
- **Language**: "${settings.targetLanguage || "English"}"
- **Word Count Targets**: Minimum ${settings.minWords} words, Maximum ${settings.maxWords} words.
- **Current Year**: ${currentYear}

---

## STEP 1 — ANALYZE THE TITLE
Detect:
- **Primary Course** -> match against: Data Science, Data Analytics, Digital Marketing, Business Analytics, Web Development, Cloud Computing.
- **Primary City** -> detect if any Indian city (Noida, Delhi, Gurgaon, Mumbai, Pune, Bangalore, Hyderabad, Chennai, Ahmedabad) is present in the title.
- **Search Intent** -> informational / comparison / "how to start" / career / salary / fees / placement.

If no city is mentioned in the title, still proceed — city-targeting happens in the Internal Linking section (Step 5), not in the main body.

---

## STEP 2 — CONTENT STRUCTURE (SEO)
Write ${settings.minWords}–${settings.maxWords} words with this structure:
1. **SEO Title** (max 60 chars, primary keyword near start)
2. **Meta Description** (max 155 chars, includes primary keyword + a CTA)
3. **URL Slug** (short, hyphenated, keyword-only)
4. **H1** — same intent as title, natural language
5. **Intro (100–150 words)** — answer the core question in the FIRST 2–3 sentences (critical for AEO/GEO). Include a "Key Takeaways" / "TL;DR" box near the top (3–5 bullet points) formatted as a div.
6. **H2/H3 Sections** covering:
   - What the course/topic is
   - Why it matters / industry demand (real current stats, cite source)
   - Skills covered / curriculum highlights
   - Career scope, salary ranges (in LPA), job roles
   - Who should learn this (target audience)
   - How to get started (step-by-step)
7. **FAQ Section (4–6 Q&As)** — use "People Also Ask"-style questions, short 40–60 word direct answers (AEO gold targets for position zero).
8. **Internal Linking / Course Promotion Section** (Step 5 — mandatory H2 "Related Courses Near You").
9. **Conclusion + Single Clear CTA** linking to Skillsha courses.

Formatting rules (STRICT):
- Write all content strictly using clean, valid HTML tags (<p>, <strong>, <ul>, <ol>, <li>, <table>, <thead>, <tbody>, <tr>, <th>, <td>, <a>). Do NOT use raw markdown formatting like **, ##, ###, or raw space-separated text columns.
- Whenever presenting comparison data or salary benchmarks, write a structured HTML <table> with <thead>, <tr>, <th>, <tbody>, and <td>.
- Use LSI/related keywords naturally ("course fees", "eligibility", "certification", "syllabus", "online vs offline", "placement support").

---

## STEP 3 — GEO RULES (Generative Engine Optimization)
- Write answers as standalone statements that make sense even if quoted out of context (don't say "as mentioned above").
- Use clear definitional sentences ("X is...", "The average salary for X is ₹Y LPA").
- Include specific numbers, timeframes, and data points.
- Include a "Key Takeaways" or "TL;DR" box near top (3-5 bullet points) formatted as: <div class="bg-zinc-50 dark:bg-zinc-900/50 p-4 border border-zinc-200/50 dark:border-white/5 rounded-2xl mb-6">
- Mention Skillsha by name at least once in a factual, non-promotional sentence (e.g. "Institutes like Skillsha offer live, mentor-led programs with placement support").

---

## STEP 4 — AEO RULES (Answer Engine Optimization)
- Every FAQ answer must be directly answerable in the first sentence (under 60 words for position zero).
- Use question-form H2/H3 headings where natural (e.g. "How much does a Data Analytics course cost?").
- Generate valid FAQPage JSON-LD schema markup for the FAQ section in the "faqSchema" field.

---

## STEP 5 — INTERNAL LINKING / COURSE-CITY SECTION (MANDATORY)
Insert a dedicated H2 section titled "Related Courses Near You" just before the conclusion.
Logic:
1. Identify the Primary Course matched.
2. From the Course-City Keyword Map below, pull ALL target cities mapped to that course.
3. Write 3–5 natural sentences embedding course+city anchor text pointing to /courses/COURSE_SLUG?loc=CITY_SLUG.
4. Include 1–2 cross-sell links to a secondary, related course.
5. Format every link using HTML: <a href="/courses/COURSE_SLUG?loc=CITY_SLUG"><strong>COURSE_NAME course in CITY_NAME</strong></a>.

### Course -> City Keyword Map:
- Data Science (slug: data-science): Noida, Delhi, Gurgaon, Mumbai, Pune, Bangalore, Hyderabad
- Data Analytics (slug: data-analytics): Noida, Delhi, Pune, Mumbai, Chennai, Bangalore
- Digital Marketing (slug: digital-marketing): Noida, Delhi, Bangalore, Mumbai, Pune, Ahmedabad
- Business Analytics (slug: business-analytics): Delhi, Gurgaon, Mumbai, Bangalore, Hyderabad
- Web Development (slug: web-development): Noida, Delhi, Bangalore, Pune, Chennai
- Cloud Computing (slug: cloud-computing): Bangalore, Hyderabad, Pune, Noida, Delhi

Use both keyword patterns across paragraphs: "COURSE_NAME course in CITY_NAME" and "COURSE_NAME course in CITY_NAME with placement".

---

## STEP 6 — OUTPUT JSON FORMAT
Return strictly a raw JSON object matching this TypeScript schema:

{
  "title": "SEO Title (H1)",
  "metaTitle": "SEO Meta Title (max 60 chars)",
  "metaDescription": "SEO Meta Description (max 155 chars)",
  "excerpt": "Short 2-sentence summary excerpt",
  "primaryKeyword": "${topic.primaryKeyword}",
  "secondaryKeywords": ${JSON.stringify(topic.secondaryKeywords)},
  "introduction": "Introductory paragraphs in clean HTML including TL;DR div box.",
  "sections": [
    {
      "heading": "Heading Text",
      "level": 2,
      "content": "Body text in clean HTML using <p>, <strong>, <ul>, <li>, and <table>."
    }
  ],
  "faqs": [
    {
      "question": "Question text?",
      "answer": "Direct answer text (under 60 words)."
    }
  ],
  "conclusion": "Concluding paragraphs in clean HTML.",
  "ctaText": "CTA button text (e.g. Explore Data Science Masterclass)",
  "faqSchema": "<script type=\"application/ld+json\">...</script>",
  "primaryCourseMatched": "Matched course name",
  "primaryCityMatched": "Matched city name if any",
  "internalLinksUsed": ["/courses/data-science?loc=noida", "/courses/data-science?loc=delhi"]
}

---

## GUARDRAILS
- Never fabricate salary figures or false guarantees. Use realistic typical ranges (e.g. "typically ₹X–Y LPA depending on experience").
- Keep tone helpful and informative first, promotional second.
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
