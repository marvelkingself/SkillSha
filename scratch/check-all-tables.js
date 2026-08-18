const { createClient } = require("@supabase/supabase-js");

const url = "https://gycwabymaxxwndijfdit.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5Y3dhYnltYXh4d25kaWpmZGl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDM3OTcsImV4cCI6MjEwMTUxOTc5N30.Ju_owGa1KB7lB7F8PDjM55Oo5RlC8nDDOiRFOJBvG3U";

const supabase = createClient(url, key);

async function checkCandidateTables() {
  const candidates = [
    "users", "bookings", "payments", "certificates",
    "blog", "posts", "articles", "blog_posts", "blogs",
    "agent_settings", "agent_runs", "settings", "runs", "assignments", "submissions", "progress", "lessons"
  ];

  for (const table of candidates) {
    const { data, error } = await supabase.from(table).select("*").limit(1);
    if (!error) {
      console.log(`✅ Table exists: "${table}" (Rows: ${data ? data.length : 0})`);
    } else {
      console.log(`❌ Table "${table}": ${error.message}`);
    }
  }
}

checkCandidateTables();
