import fs from "fs";
import path from "path";
import { GeneratedArticle } from "./generator";
import { supabase } from "@/lib/supabase";

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * File System & Supabase Content Manager for Blogs.
 * Handles slugification, unique path verification, writing files, Base64 image encoding,
 * and saving records to Supabase PostgreSQL database.
 */
export class BlogFileManager {
  private contentDir: string;
  private publicImageDir: string;

  constructor() {
    this.contentDir = path.join(process.cwd(), "content", "blogs");
    this.publicImageDir = path.join(process.cwd(), "public", "content", "blogs");
  }

  /**
   * Generates a guaranteed unique slug by checking Supabase and local filesystem.
   */
  async getUniqueSlug(title: string): Promise<string> {
    let baseSlug = slugify(title);

    // Truncate slug if it's too long
    if (baseSlug.length > 50) {
      baseSlug = baseSlug.substring(0, 50).replace(/-+$/, "");
    }

    let slug = baseSlug;
    let count = 1;

    while (true) {
      // 1. Check local filesystem
      const fileExists = fs.existsSync(path.join(this.contentDir, slug));

      // 2. Check Supabase DB
      let dbExists = false;
      try {
        const { data } = await supabase.from("blogs").select("slug").eq("slug", slug).single();
        if (data) dbExists = true;
      } catch (e) {
        // Ignore
      }

      if (!fileExists && !dbExists) {
        break; // Unique!
      }

      slug = `${baseSlug}-${count}`;
      count++;
    }

    return slug;
  }

  /**
   * Saves/upserts full post record (including Base64 image) exclusively into Supabase DB.
   */
  async writeBlogFiles(
    slug: string,
    article: GeneratedArticle,
    category: string,
    seoScore: number,
    status: "draft" | "review" | "published" = "draft",
    base64Image?: string
  ): Promise<{ contentPath: string; imagePath: string }> {
    const imageBase64 = base64Image || (article as any).featuredImageBase64 || "";

    const finalContent = {
      ...article,
      slug,
      category,
      seoScore,
      status,
      featuredImage: `/content/blogs/${slug}/featured-image.png`,
      featuredImageBase64: imageBase64,
      createdAt: (article as any).createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: status === "published" ? (article as any).publishedAt || new Date().toISOString() : undefined,
    };

    // Save/Upsert exclusively into Supabase DB
    try {
      const dbRow = {
        slug,
        title: article.title,
        category,
        keyword: article.primaryKeyword || "",
        seo_score: seoScore,
        status,
        excerpt: article.excerpt || "",
        content: finalContent,
        featured_image: `/content/blogs/${slug}/featured-image.png`,
        featured_image_base64: imageBase64,
        updated_at: new Date().toISOString(),
        published_at: status === "published" ? new Date().toISOString() : null,
      };

      const { error } = await supabase.from("blogs").upsert(dbRow, { onConflict: "slug" });
      if (error) {
        console.error("Supabase blog upsert error:", error.message);
      } else {
        console.log(`Successfully saved blog post "${slug}" to Supabase DB.`);
      }
    } catch (dbErr: any) {
      console.error("Supabase blog sync exception:", dbErr.message || dbErr);
    }

    return { contentPath: `/blog/${slug}`, imagePath: imageBase64 };
  }

  /**
   * Fetches all blogs strictly from Supabase backend DB.
   */
  async getBlogsAsync(includeDrafts = false): Promise<any[]> {
    try {
      let query = supabase.from("blogs").select("*");
      if (!includeDrafts) {
        query = query.eq("status", "published");
      }
      const { data, error } = await query.order("created_at", { ascending: false });

      if (data && !error) {
        return data.map((row) => ({
          ...row.content,
          slug: row.slug,
          title: row.title,
          category: row.category,
          keyword: row.keyword,
          seoScore: row.seo_score,
          status: row.status,
          excerpt: row.excerpt,
          featuredImage: row.featured_image || row.content?.featuredImage,
          featuredImageBase64: row.featured_image_base64 || row.content?.featuredImageBase64,
          createdAt: row.created_at,
          publishedAt: row.published_at,
        }));
      }
    } catch (e) {
      console.error("Error fetching blogs from Supabase backend DB:", e);
    }

    return [];
  }

  /**
   * Retrieves content JSON for a specific blog by its slug strictly from Supabase backend DB.
   */
  async getBlogBySlugAsync(slug: string): Promise<any | null> {
    try {
      const { data, error } = await supabase.from("blogs").select("*").eq("slug", slug).single();
      if (data && !error) {
        return {
          ...data.content,
          slug: data.slug,
          title: data.title,
          category: data.category,
          keyword: data.keyword,
          seoScore: data.seo_score,
          status: data.status,
          excerpt: data.excerpt,
          featuredImage: data.featured_image || data.content?.featuredImage,
          featuredImageBase64: data.featured_image_base64 || data.content?.featuredImageBase64,
          createdAt: data.created_at,
          publishedAt: data.published_at,
        };
      }
    } catch (e) {
      console.error(`Error fetching blog "${slug}" from Supabase backend DB:`, e);
    }

    return null;
  }

  /**
   * Retrieves content JSON locally by slug.
   */
  getBlogBySlug(slug: string): any | null {
    const file = path.join(this.contentDir, slug, "content.json");
    if (fs.existsSync(file)) {
      try {
        return JSON.parse(fs.readFileSync(file, "utf8"));
      } catch (err) {
        console.error(`Failed to parse local blog JSON by slug: ${slug}`, err);
      }
    }
    return null;
  }

  /**
   * Deletes local files and row in Supabase DB.
   */
  async deleteBlog(slug: string): Promise<boolean> {
    const blogFolder = path.join(this.contentDir, slug);
    const imageFolder = path.join(this.publicImageDir, slug);

    let success = false;

    if (fs.existsSync(blogFolder)) {
      fs.rmSync(blogFolder, { recursive: true, force: true });
      success = true;
    }

    if (fs.existsSync(imageFolder)) {
      fs.rmSync(imageFolder, { recursive: true, force: true });
      success = true;
    }

    try {
      await supabase.from("blogs").delete().eq("slug", slug);
      success = true;
    } catch (e) {
      // Ignore
    }

    return success;
  }
}

export const blogFileManager = new BlogFileManager();
