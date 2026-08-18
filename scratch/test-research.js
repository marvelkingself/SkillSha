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
const { getAgentSettings } = require("../src/lib/blog-agent/storage");

async function testResearch() {
  console.log("=== Testing Perform Topic Research ===");
  const settings = await getAgentSettings();
  console.log("Settings loaded:", settings);

  try {
    const topics = await performTopicResearch(settings, 3, (msg) => console.log("[LOG]", msg));
    console.log("\n✅ Research Success! Generated", topics.length, "topics:");
    console.log(JSON.stringify(topics, null, 2));
  } catch (err) {
    console.error("\n❌ Research Error:", err);
  }
}

testResearch();
