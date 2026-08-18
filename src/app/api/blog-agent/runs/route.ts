import { NextRequest, NextResponse } from "next/server";
import { getAgentRuns } from "@/lib/blog-agent/storage";
import { blogFileManager } from "@/lib/blog-agent/file-manager";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    // Check authorization key
    const adminKey = req.headers.get("x-admin-secret");
    if (adminKey !== "skillsha-admin-secret-2026") {
      return NextResponse.json({ success: false, error: "Unauthorized access key" }, { status: 401 });
    }

    // 1. Fetch recent runs (limit to 15)
    const allRuns = await getAgentRuns();
    const runs = allRuns.slice(0, 15);

    // 2. Fetch blog stats from Supabase DB (with local fallback)
    const allBlogs = await blogFileManager.getBlogsAsync(true);
    const totalBlogs = allBlogs.filter((b) => b.status === "published").length;
    const draftBlogs = allBlogs.filter((b) => b.status === "draft").length;
    const reviewBlogs = allBlogs.filter((b) => b.status === "review").length;

    const avgSeoScore = allBlogs.length > 0
      ? Math.round(allBlogs.reduce((sum, b) => sum + (b.seoScore || 0), 0) / allBlogs.length)
      : 0;

    // Calculate agent success rate
    const completedRuns = allRuns.filter((r) => r.status === "completed").length;
    const failedRuns = allRuns.filter((r) => r.status === "failed").length;
    const totalRuns = completedRuns + failedRuns;
    const successRate = totalRuns > 0 ? Math.round((completedRuns / totalRuns) * 100) : 100;

    return NextResponse.json({
      success: true,
      runs,
      stats: {
        totalPublished: totalBlogs,
        totalDraft: draftBlogs,
        totalReview: reviewBlogs,
        avgSeoScore,
        successRate,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to load run metrics" },
      { status: 500 }
    );
  }
}
