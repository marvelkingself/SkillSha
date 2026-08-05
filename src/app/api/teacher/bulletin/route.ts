import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    const { data: bulletins, error } = await supabase
      .from("bulletins")
      .select("*")
      .eq("course_id", courseId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching bulletins:", error);
      return NextResponse.json({ error: "Could not fetch bulletins" }, { status: 500 });
    }

    return NextResponse.json({ success: true, bulletins }, { status: 200 });
  } catch (error) {
    console.error("Bulletin GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Auth check
    const teacherSecret = request.headers.get("x-teacher-secret");
    if (teacherSecret !== "skillsha-teacher-secret-2026") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { action, courseId, message, bulletinId } = body;

    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    if (action === "create") {
      if (!message) {
        return NextResponse.json({ error: "Missing message" }, { status: 400 });
      }

      const { data: newBulletin, error } = await supabase
        .from("bulletins")
        .insert({
          course_id: courseId,
          message
        })
        .select()
        .single();

      if (error || !newBulletin) {
        console.error("Error creating bulletin:", error);
        return NextResponse.json({ error: "Could not post bulletin" }, { status: 500 });
      }

      return NextResponse.json({ success: true, bulletin: newBulletin }, { status: 201 });
    }

    if (action === "delete") {
      if (!bulletinId) {
        return NextResponse.json({ error: "Missing bulletinId" }, { status: 400 });
      }

      const { error } = await supabase
        .from("bulletins")
        .delete()
        .eq("id", bulletinId);

      if (error) {
        console.error("Error deleting bulletin:", error);
        return NextResponse.json({ error: "Could not delete bulletin" }, { status: 500 });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Bulletin POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
