const { createClient } = require("@supabase/supabase-js");

const url = "https://gycwabymaxxwndijfdit.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5Y3dhYnltYXh4d25kaWpmZGl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDM3OTcsImV4cCI6MjEwMTUxOTc5N30.Ju_owGa1KB7lB7F8PDjM55Oo5RlC8nDDOiRFOJBvG3U";

const supabase = createClient(url, key);

async function test() {
  console.log("Checking Supabase tables...");
  const t1 = await supabase.from("blog_posts").select("*").limit(1);
  console.log("blog_posts:", t1.error ? t1.error.message : t1.data);

  const t2 = await supabase.from("blogs").select("*").limit(1);
  console.log("blogs:", t2.error ? t2.error.message : t2.data);

  const t3 = await supabase.from("agent_settings").select("*").limit(1);
  console.log("agent_settings:", t3.error ? t3.error.message : t3.data);

  const t4 = await supabase.from("agent_runs").select("*").limit(1);
  console.log("agent_runs:", t4.error ? t4.error.message : t4.data);
}

test();
