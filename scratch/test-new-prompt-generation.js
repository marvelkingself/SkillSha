const path = require("path");
const fs = require("fs");

const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [key, ...vals] = trimmed.split("=");
      process.env[key.trim()] = vals.join("=").trim();
    }
  });
}

const { generateArticle } = require("../src/lib/blog-agent/generator");

async function testPromptGeneration() {
  console.log("=== Testing Advanced Blog Generation Prompt (SEO + GEO + AEO) ===");

  const mockTopic = {
    title: "Data Science Course in Noida 2026: Fees, Syllabus & Placement Support",
    primaryKeyword: "Data Science Course in Noida",
    secondaryKeywords: ["data science course fees noida", "data science syllabus", "data science placement noida"],
    searchIntent: "informational/commercial",
    targetAudience: "Students & Non-IT Freshers in Noida/NCR",
    contentType: "Guide",
    reasonForSelection: "High search volume for local course + placement intent",
  };

  const mockSettings = {
    blogsPerDay: 1,
    minWords: 1000,
    maxWords: 1500,
    publishingTime: "09:00",
    autoPublish: true,
    targetCountry: "India",
    targetLanguage: "English",
    targetAudience: "Students, Career Switchers",
    websiteNiche: "IT Training & Data Science",
  };

  try {
    const article = await generateArticle(mockTopic, mockSettings, (msg) => console.log(`[Log] ${msg}`));
    console.log("\nArticle Generated Successfully!");
    console.log("Title:", article.title);
    console.log("Meta Title:", article.metaTitle);
    console.log("Excerpt:", article.excerpt);
    console.log("Primary Course Matched:", article.primaryCourseMatched);
    console.log("Primary City Matched:", article.primaryCityMatched);
    console.log("Internal Links Used:", article.internalLinksUsed);
    console.log("Sections Count:", article.sections ? article.sections.length : 0);
    console.log("FAQs Count:", article.faqs ? article.faqs.length : 0);
  } catch (err) {
    console.error("Test failed:", err);
  }
}

testPromptGeneration();
