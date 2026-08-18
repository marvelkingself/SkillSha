import fs from "fs";
import path from "path";
import BlogMetadata from "../models/BlogMetadata";
import { GeneratedArticle } from "./generator";
import { dbConnect } from "../db";

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
 * File System & Content Manager for Blogs.
 * Handles slugification, unique path verification, writing files, and reading local posts.
 */
export class BlogFileManager {
  private contentDir: string;
  private publicImageDir: string;

  constructor() {
    this.contentDir = path.join(process.cwd(), "content", "blogs");
    this.publicImageDir = path.join(process.cwd(), "public", "content", "blogs");
  }

  /**
   * Generates a guaranteed unique slug by checking both MongoDB and the local filesystem.
   */
  async getUniqueSlug(title: string): Promise<string> {
    await dbConnect();
    let baseSlug = slugify(title);
    
    // Truncate slug if it's too long
    if (baseSlug.length > 50) {
      baseSlug = baseSlug.substring(0, 50).replace(/-+$/, "");
    }

    let slug = baseSlug;
    let count = 1;

    while (true) {
      // 1. Check database
      const dbExists = await BlogMetadata.findOne({ slug });
      
      // 2. Check filesystem
      const fileExists = fs.existsSync(path.join(this.contentDir, slug));

      if (!dbExists && !fileExists) {
        break; // Unique!
      }

      slug = `${baseSlug}-${count}`;
      count++;
    }

    return slug;
  }

  /**
   * Writes the generated blog JSON and saves the metadata state.
   */
  async writeBlogFiles(
    slug: string,
    article: GeneratedArticle,
    category: string,
    seoScore: number,
    status: "draft" | "review" | "published" = "draft"
  ): Promise<{ contentPath: string; imagePath: string }> {
    const blogFolder = path.join(this.contentDir, slug);
    const imageFolder = path.join(this.publicImageDir, slug);

    // Create folders
    if (!fs.existsSync(blogFolder)) {
      fs.mkdirSync(blogFolder, { recursive: true });
    }
    if (!fs.existsSync(imageFolder)) {
      fs.mkdirSync(imageFolder, { recursive: true });
    }

    const contentPath = path.join(blogFolder, "content.json");
    const imagePath = path.join(imageFolder, "featured-image.png");

    // Add post relative URL parameters inside the JSON body
    const finalContent = {
      ...article,
      slug,
      category,
      seoScore,
      status,
      featuredImage: `/content/blogs/${slug}/featured-image.png`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: status === "published" ? new Date().toISOString() : undefined,
    };

    // 1. Save local JSON file content
    fs.writeFileSync(contentPath, JSON.stringify(finalContent, null, 2), "utf8");

    // 2. Upsert into MongoDB BlogMetadata
    await dbConnect();
    await BlogMetadata.findOneAndUpdate(
      { slug },
      {
        title: article.title,
        slug,
        keyword: article.primaryKeyword,
        seoScore,
        status,
        excerpt: article.excerpt,
        publishedAt: status === "published" ? new Date() : undefined,
      },
      { upsert: true, new: true }
    );

    return { contentPath, imagePath };
  }

  /**
   * Scans filesystem directory to fetch all local JSON blogs.
   */
  getLocalBlogs(includeDrafts = false): any[] {
    if (!fs.existsSync(this.contentDir)) return [];
    
    const folders = fs.readdirSync(this.contentDir);
    const posts: any[] = [];

    for (const folder of folders) {
      const file = path.join(this.contentDir, folder, "content.json");
      if (fs.existsSync(file)) {
        try {
          const json = JSON.parse(fs.readFileSync(file, "utf8"));
          if (includeDrafts || json.status === "published") {
            posts.push(json);
          }
        } catch (err) {
          console.error(`Failed to read/parse local blog JSON in folder: ${folder}`, err);
        }
      }
    }

    // Sort descending by date
    return posts.sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.createdAt || 0).getTime();
      const dateB = new Date(b.publishedAt || b.createdAt || 0).getTime();
      return dateB - dateA;
    });
  }

  /**
   * Retrieves content JSON for a specific blog by its slug.
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
   * Deletes local files and MongoDB metadata entry.
   */
  async deleteBlog(slug: string): Promise<boolean> {
    const blogFolder = path.join(this.contentDir, slug);
    const imageFolder = path.join(this.publicImageDir, slug);

    let success = false;

    // Delete local content
    if (fs.existsSync(blogFolder)) {
      fs.rmSync(blogFolder, { recursive: true, force: true });
      success = true;
    }

    // Delete image asset
    if (fs.existsSync(imageFolder)) {
      fs.rmSync(imageFolder, { recursive: true, force: true });
      success = true;
    }

    // Remove from MongoDB
    await dbConnect();
    await BlogMetadata.deleteOne({ slug });

    return success;
  }
}

export const blogFileManager = new BlogFileManager();
