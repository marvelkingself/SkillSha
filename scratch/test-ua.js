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

const userAgents = [
  "Roo-Code/3.8.0",
  "Cline/3.1.0",
  "Claude-Code/0.2.29",
  "Cursor/0.45.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Cursor/0.45.0 Chrome/128.0.6613.186 Electron/32.2.5 Safari/537.36",
  "Qwen-Code/1.0.0",
  "Trae/1.0.0",
  "ClaudeApp/1.0.0",
  "VSCode/1.95.0 Roo-Code/3.8.0",
  "VSCode/1.95.0 Cline/3.1.0",
];

async function testUserAgents() {
  console.log("Testing AgentRouter User-Agents against:", baseUrl);
  for (const ua of userAgents) {
    try {
      const res = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "User-Agent": ua,
          "X-Client-Name": "Roo-Code",
        },
        body: JSON.stringify({
          model: modelName,
          messages: [{ role: "user", content: "hi" }],
          temperature: 0.1,
        }),
      });

      const bodyText = await res.text();
      console.log(`\nUser-Agent: "${ua}"`);
      console.log(`Status: ${res.status} ${res.statusText}`);
      console.log(`Response: ${bodyText.substring(0, 200)}`);
    } catch (e) {
      console.error(`Failed for "${ua}":`, e.message);
    }
  }
}

testUserAgents();
