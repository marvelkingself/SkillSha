import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await verifyToken(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    const { data: progress, error } = await supabase
      .from("student_progress")
      .select("*")
      .eq("user_id", session.id)
      .eq("course_id", courseId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching progress:", error);
      return NextResponse.json({ error: "Could not fetch progress" }, { status: 500 });
    }

    return NextResponse.json({ success: true, progress }, { status: 200 });
  } catch (error) {
    console.error("Progress GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await verifyToken(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { courseId, lessonId, completed } = body;

    if (!courseId || !lessonId) {
      return NextResponse.json({ error: "Missing courseId or lessonId" }, { status: 400 });
    }

    // 1. Fetch total lessons count to compute progress percentage correctly
    const { data: lessons } = await supabase
      .from("courses_registry")
      .select("id")
      .eq("course_id", courseId);

    const totalLessons = lessons ? lessons.length : 0;
    if (totalLessons === 0) {
      return NextResponse.json({ error: "No lessons in course registry yet" }, { status: 400 });
    }

    // 2. Fetch existing completed list
    const { data: progressRecord } = await supabase
      .from("student_progress")
      .select("completed_lessons")
      .eq("user_id", session.id)
      .eq("course_id", courseId)
      .maybeSingle();

    let completedList: string[] = progressRecord?.completed_lessons || [];

    if (completed) {
      // Add if not present
      if (!completedList.includes(lessonId)) {
        completedList.push(lessonId);
      }
    } else {
      // Remove if present
      completedList = completedList.filter((id) => id !== lessonId);
    }

    const progressPercentage = Math.round((completedList.length / totalLessons) * 100);

    // 3. Upsert record
    const { data: updatedRecord, error: upsertError } = await supabase
      .from("student_progress")
      .upsert({
        user_id: session.id,
        course_id: courseId,
        completed_lessons: completedList,
        progress_percentage: progressPercentage,
        last_accessed_at: new Date().toISOString(),
      }, {
        onConflict: "user_id,course_id"
      })
      .select()
      .single();

    if (upsertError) {
      console.error("Upsert progress error:", upsertError);
      return NextResponse.json({ error: "Failed to update learning progress" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      progress: updatedRecord,
    }, { status: 200 });

  } catch (error) {
    console.error("Progress POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
