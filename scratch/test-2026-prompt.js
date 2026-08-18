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

const { performTopicResearch } = require("../src/lib/blog-agent/research");

async function test2026Prompt() {
  console.log("=== Testing AI Agent Year 2026 Prompts ===");
  const mockSettings = {
    blogsPerDay: 3,
    minWords: 1000,
    maxWords: 2000,
    publishingTime: "09:00",
    autoPublish: true,
    targetCountry: "India",
    targetLanguage: "English",
    targetAudience: "Students, Non-IT Graduates, Career Switchers",
    websiteNiche: "IT Training & Full-Stack Development",
  };

  try {
    const topics = await performTopicResearch(mockSettings, 3, (msg) => console.log(`[Log] ${msg}`));
    console.log("\nGenerated 2026 Topics:");
    topics.forEach((t, i) => console.log(`${i + 1}. Title: "${t.title}" | Primary Keyword: "${t.primaryKeyword}"`));
  } catch (e) {
    console.error("Test failed:", e);
  }
}

test2026Prompt();
