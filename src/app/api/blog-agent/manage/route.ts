import { NextRequest, NextResponse } from "next/server";
import { blogFileManager } from "@/lib/blog-agent/file-manager";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const adminKey = req.headers.get("x-admin-secret");
    if (adminKey !== "skillsha-admin-secret-2026") {
      return NextResponse.json({ success: false, error: "Unauthorized access key" }, { status: 401 });
    }

    // Read all blogs from Supabase DB (with local file fallback)
    const fileBlogs = await blogFileManager.getBlogsAsync(true);

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

    const body = await req.json();
    const { action, slug, blogData, runId } = body;

    if (action === "stop") {
      const { getAgentRuns, updateAgentRun, appendRunLog } = await import("@/lib/blog-agent/storage");
      const runs = await getAgentRuns();
      const targetRun = runId ? runs.find(r => r._id === runId) : runs.find(r => r.status === "running");

      if (targetRun) {
        await updateAgentRun(targetRun._id, {
          status: "failed",
          completedAt: new Date().toISOString(),
        });
        await appendRunLog(targetRun._id, "Run manually stopped by admin user.", true);
        return NextResponse.json({ success: true, message: "Agent run stopped successfully." });
      } else {
        return NextResponse.json({ success: true, message: "No active running agent found." });
      }
    }

    if (!slug) {
      return NextResponse.json({ success: false, error: "Slug is required" }, { status: 400 });
    }

    const localBlog = blogFileManager.getBlogBySlug(slug);
    if (!localBlog && action !== "delete") {
      return NextResponse.json({ success: false, error: "Blog not found in files" }, { status: 404 });
    }

    if (action === "publish" || action === "approve") {
      localBlog.status = "published";
      localBlog.publishedAt = new Date().toISOString();
      localBlog.updatedAt = new Date().toISOString();

      await blogFileManager.writeBlogFiles(
        slug,
        localBlog,
        localBlog.category || "AI Engineering",
        localBlog.seoScore || 0,
        "published"
      );
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

      await blogFileManager.writeBlogFiles(
        slug,
        updated,
        updated.category || "AI Engineering",
        updated.seoScore || 0,
        updated.status
      );
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
