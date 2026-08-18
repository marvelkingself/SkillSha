import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import AgentRun from "@/lib/models/AgentRun";
import BlogMetadata from "@/lib/models/BlogMetadata";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    // Check authorization key
    const adminKey = req.headers.get("x-admin-secret");
    if (adminKey !== "skillsha-admin-secret-2026") {
      return NextResponse.json({ success: false, error: "Unauthorized access key" }, { status: 401 });
    }

    await dbConnect();
    
    // 1. Fetch recent runs (limit to 15)
    const runs = await AgentRun.find().sort({ startedAt: -1 }).limit(15).lean();

    // 2. Fetch blog stats
    const totalBlogs = await BlogMetadata.countDocuments({ status: "published" });
    const draftBlogs = await BlogMetadata.countDocuments({ status: "draft" });
    const reviewBlogs = await BlogMetadata.countDocuments({ status: "review" });
    
    const allBlogs = await BlogMetadata.find({}, "seoScore");
    const avgSeoScore = allBlogs.length > 0
      ? Math.round(allBlogs.reduce((sum, b) => sum + (b.seoScore || 0), 0) / allBlogs.length)
      : 0;

    // Calculate agent success rate
    const completedRuns = await AgentRun.countDocuments({ status: "completed" });
    const failedRuns = await AgentRun.countDocuments({ status: "failed" });
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
