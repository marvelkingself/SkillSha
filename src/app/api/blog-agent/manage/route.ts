import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import BlogMetadata from "@/lib/models/BlogMetadata";
import { blogFileManager } from "@/lib/blog-agent/file-manager";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const adminKey = req.headers.get("x-admin-secret");
    if (adminKey !== "skillsha-admin-secret-2026") {
      return NextResponse.json({ success: false, error: "Unauthorized access key" }, { status: 401 });
    }

    await dbConnect();
    
    // Read all local blogs including drafts
    const fileBlogs = blogFileManager.getLocalBlogs(true);
    
    return NextResponse.json({
      success: true,
      blogs: fileBlogs,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to load blogs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminKey = req.headers.get("x-admin-secret");
    if (adminKey !== "skillsha-admin-secret-2026") {
      return NextResponse.json({ success: false, error: "Unauthorized access key" }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const { action, slug, blogData } = body;

    if (!slug) {
      return NextResponse.json({ success: false, error: "Slug is required" }, { status: 400 });
    }

    const localBlog = blogFileManager.getBlogBySlug(slug);
    if (!localBlog && action !== "delete") {
      return NextResponse.json({ success: false, error: "Blog not found in files" }, { status: 404 });
    }

    if (action === "publish") {
      localBlog.status = "published";
      localBlog.publishedAt = new Date().toISOString();
      localBlog.updatedAt = new Date().toISOString();

      await blogFileManager.writeBlogFiles(slug, localBlog, localBlog.category || "AI Engineering", localBlog.seoScore || 0, "published");
      return NextResponse.json({ success: true, blog: localBlog });
    }

    if (action === "approve") {
      localBlog.status = "published";
      localBlog.publishedAt = new Date().toISOString();
      localBlog.updatedAt = new Date().toISOString();

      await blogFileManager.writeBlogFiles(slug, localBlog, localBlog.category || "AI Engineering", localBlog.seoScore || 0, "published");
      return NextResponse.json({ success: true, blog: localBlog });
    }

    if (action === "edit") {
      if (!blogData) {
        return NextResponse.json({ success: false, error: "blogData is required for edit action" }, { status: 400 });
      }

      // Merge edits
      const updated = {
        ...localBlog,
        ...blogData,
        updatedAt: new Date().toISOString(),
      };

      await blogFileManager.writeBlogFiles(slug, updated, updated.category || "AI Engineering", updated.seoScore || 0, updated.status);
      return NextResponse.json({ success: true, blog: updated });
    }

    if (action === "delete") {
      await blogFileManager.deleteBlog(slug);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: `Invalid action: ${action}` }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to execute management command" },
      { status: 500 }
    );
  }
}
