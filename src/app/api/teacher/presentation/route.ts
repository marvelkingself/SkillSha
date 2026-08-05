import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    const { data: presentations, error } = await supabase
      .from("presentations")
      .select("*")
      .eq("course_id", courseId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching presentations:", error);
      return NextResponse.json({ error: "Could not fetch presentations" }, { status: 500 });
    }

    return NextResponse.json({ success: true, presentations }, { status: 200 });
  } catch (error) {
    console.error("Presentation GET error:", error);
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
    const { action, courseId, title, slidesData, presentationId } = body;

    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    if (action === "create") {
      if (!title || !slidesData) {
        return NextResponse.json({ error: "Missing title or slides data" }, { status: 400 });
      }

      const { data: newPresentation, error } = await supabase
        .from("presentations")
        .insert({
          course_id: courseId,
          title,
          slides_data: slidesData
        })
        .select()
        .single();

      if (error || !newPresentation) {
        console.error("Error creating presentation:", error);
        return NextResponse.json({ error: "Could not create presentation" }, { status: 500 });
      }

      return NextResponse.json({ success: true, presentation: newPresentation }, { status: 201 });
    }

    if (action === "delete") {
      if (!presentationId) {
        return NextResponse.json({ error: "Missing presentationId" }, { status: 400 });
      }

      const { error } = await supabase
        .from("presentations")
        .delete()
        .eq("id", presentationId);

      if (error) {
        console.error("Error deleting presentation:", error);
        return NextResponse.json({ error: "Could not delete presentation" }, { status: 500 });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Presentation POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
