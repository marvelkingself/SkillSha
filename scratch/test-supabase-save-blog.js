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

async function testSupabaseBlogSync() {
  console.log("=== Testing Supabase Blog Sync & Base64 Image ===");

  const testSlug = "test-blue-theme-blog-2025";
  const mockBase64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

  const blogData = {
    slug: testSlug,
    title: "Test Full Stack Blue Theme Blog 2025",
    category: "Full-Stack Dev",
    keyword: "test full stack developer roadmap",
    seo_score: 95,
    status: "published",
    excerpt: "Testing Supabase DB sync with Base64 blue theme image.",
    content: {
      title: "Test Full Stack Blue Theme Blog 2025",
      excerpt: "Testing Supabase DB sync with Base64 blue theme image.",
      primaryKeyword: "test full stack developer roadmap",
      introduction: "This is a test introduction for Supabase DB sync verification.",
      sections: [{ heading: "Section 1", level: 2, content: "Test section content." }],
      faqs: [{ question: "Test Q?", answer: "Test A." }],
      conclusion: "Test conclusion.",
      ctaText: "Join SkillSha Bootcamps",
      featuredImageBase64: mockBase64Image
    },
    featured_image: `/content/blogs/${testSlug}/featured-image.png`,
    featured_image_base64: mockBase64Image,
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString()
  };

  console.log("Upserting blog to Supabase table 'blogs'...");
  const { data: upsertData, error: upsertErr } = await supabase.from("blogs").upsert(blogData, { onConflict: "slug" }).select();

  if (upsertErr) {
    console.error("❌ Supabase Upsert Error:", upsertErr.message);
    return;
  }

  console.log("✅ Successfully Upserted to Supabase DB!");
  console.log("Returned row ID:", upsertData?.[0]?.id);

  console.log("\nReading blog back from Supabase DB...");
  const { data: readData, error: readErr } = await supabase.from("blogs").select("*").eq("slug", testSlug).single();

  if (readErr) {
    console.error("❌ Supabase Read Error:", readErr.message);
    return;
  }

  console.log("✅ Successfully Read Blog from Supabase DB:");
  console.log("Title:", readData.title);
  console.log("Slug:", readData.slug);
  console.log("Base64 Image Prefix:", readData.featured_image_base64.substring(0, 40) + "...");
  console.log("Status:", readData.status);
  console.log("SEO Score:", readData.seo_score);
}

testSupabaseBlogSync();
