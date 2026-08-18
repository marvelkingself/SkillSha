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

const { createClient } = require("@supabase/supabase-js");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(url, key);

async function testAgentTables() {
  console.log("=== Testing Supabase agent_settings & agent_runs tables ===");

  const sRes = await supabase.from("agent_settings").select("*");
  console.log("agent_settings query:", sRes.error ? sRes.error.message : sRes.data);

  const rRes = await supabase.from("agent_runs").select("*");
  console.log("agent_runs query:", rRes.error ? rRes.error.message : rRes.data);
}

testAgentTables();
