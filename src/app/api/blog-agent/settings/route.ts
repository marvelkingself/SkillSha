import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import AgentSettings from "@/lib/models/AgentSettings";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    let settings = await AgentSettings.findOne();
    if (!settings) {
      // Create default settings if empty
      settings = await AgentSettings.create({});
    }
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
    await dbConnect();
    const body = await req.json();

    // Check authorization header or session cookie
    const adminKey = req.headers.get("x-admin-secret");
    if (adminKey !== "skillsha-admin-secret-2026") {
      return NextResponse.json({ success: false, error: "Unauthorized access key" }, { status: 401 });
    }

    let settings = await AgentSettings.findOne();
    if (!settings) {
      settings = new AgentSettings(body);
    } else {
      // Update values
      Object.keys(body).forEach((key) => {
        (settings as any)[key] = body[key];
      });
    }

    await settings.save();
    return NextResponse.json({ success: true, settings });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update settings" },
      { status: 500 }
    );
  }
}
