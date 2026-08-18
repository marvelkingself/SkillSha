import { NextRequest, NextResponse } from "next/server";
import { getAgentSettings, saveAgentSettings } from "@/lib/blog-agent/storage";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const settings = await getAgentSettings();
    return NextResponse.json({ success: true, settings });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to load settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check authorization header
    const adminKey = req.headers.get("x-admin-secret");
    if (adminKey !== "skillsha-admin-secret-2026") {
      return NextResponse.json({ success: false, error: "Unauthorized access key" }, { status: 401 });
    }

    const updated = await saveAgentSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update settings" },
      { status: 500 }
    );
  }
}
