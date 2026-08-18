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

if (!url || !key) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);
const contentDir = path.join(__dirname, "..", "content", "blogs");

async function syncAllToSupabase() {
  console.log("=== Syncing Local Blogs to Supabase DB ===");
  if (!fs.existsSync(contentDir)) {
    console.log("No local content/blogs folder found.");
    return;
  }

  const folders = fs.readdirSync(contentDir);
  console.log(`Found ${folders.length} blog folder(s):`, folders);

  for (const folder of folders) {
    const jsonPath = path.join(contentDir, folder, "content.json");
    const imgPath = path.join(__dirname, "..", "public", "content", "blogs", folder, "featured-image.png");

    if (fs.existsSync(jsonPath)) {
      try {
        const article = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
        let base64Image = article.featuredImageBase64 || "";

        if (!base64Image && fs.existsSync(imgPath)) {
          const imgBuf = fs.readFileSync(imgPath);
          base64Image = `data:image/png;base64,${imgBuf.toString("base64")}`;
        }

        const dbRow = {
          slug: article.slug || folder,
          title: article.title,
          category: article.category || "AI Engineering",
          keyword: article.primaryKeyword || "",
          seo_score: article.seoScore || 90,
          status: article.status || "published",
          excerpt: article.excerpt || "",
          content: article,
          featured_image: `/content/blogs/${folder}/featured-image.png`,
          featured_image_base64: base64Image,
          updated_at: article.updatedAt || new Date().toISOString(),
          published_at: article.publishedAt || new Date().toISOString(),
        };

        const { error } = await supabase.from("blogs").upsert(dbRow, { onConflict: "slug" });
        if (error) {
          console.error(`❌ Failed to sync "${folder}":`, error.message);
        } else {
          console.log(`✅ Successfully synced "${article.title}" (${folder}) to Supabase DB!`);
        }
      } catch (e) {
        console.error(`Error parsing "${folder}":`, e.message);
      }
    }
  }
}

syncAllToSupabase();
