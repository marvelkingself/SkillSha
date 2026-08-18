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

const apiKey = process.env.AGENTROUTER_API_KEY;
const baseUrl = (process.env.AGENTROUTER_BASE_URL || "https://agentrouter.org/v1").replace(/\/$/, "");
const modelName = process.env.AGENTROUTER_MODEL || "claude-opus-5";

async function runTest() {
  console.log("=== Testing AgentRouter Integration with Model:", modelName, "===");

  const endpoint = `${baseUrl}/chat/completions`;

  // 1. Text completion test
  console.log("\n1. Testing Text Completion...");
  const res1 = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "User-Agent": "Cline/3.1.0",
    },
    body: JSON.stringify({
      model: modelName,
      messages: [
        { role: "system", content: "You are an assistant." },
        { role: "user", content: "Say hello in 5 words." },
      ],
      temperature: 0.7,
    }),
  });

  console.log("Status:", res1.status, res1.statusText);
  const text1 = await res1.text();
  console.log("Response Body:", text1);

  // 2. Structured data test
  console.log("\n2. Testing Structured JSON Generation...");
  const res2 = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "User-Agent": "Cline/3.1.0",
    },
    body: JSON.stringify({
      model: modelName,
      messages: [
        { role: "system", content: "Return ONLY raw JSON object: {\"status\": \"ok\", \"message\": \"AgentRouter connected!\"}" },
        { role: "user", content: "Generate topic test JSON." },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    }),
  });

  console.log("Status:", res2.status, res2.statusText);
  const text2 = await res2.text();
  console.log("Response Body:", text2);
}

runTest();
