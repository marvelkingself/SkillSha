import { NextResponse } from "next/server";
import { blogFileManager } from "@/lib/blog-agent/file-manager";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const posts = blogFileManager.getLocalBlogs(false); // Only return published posts
    return NextResponse.json({
      success: true,
      posts,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to load posts" },
      { status: 500 }
    );
  }
}
