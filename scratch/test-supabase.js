const { createClient } = require("@supabase/supabase-js");

const url = "https://gycwabymaxxwndijfdit.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5Y3dhYnltYXh4d25kaWpmZGl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDM3OTcsImV4cCI6MjEwMTUxOTc5N30.Ju_owGa1KB7lB7F8PDjM55Oo5RlC8nDDOiRFOJBvG3U";

const supabase = createClient(url, key);

async function test() {
  console.log("Testing Supabase connection...");
  const { data: users, error: uErr } = await supabase.from("users").select("count");
  console.log("Users table count result:", { users, uErr });

  const { data: runs, error: rErr } = await supabase.from("agent_runs").select("*").limit(5);
  console.log("Agent runs table result:", { runs, rErr });
}

test();
