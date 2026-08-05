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

    // Fetch assignments for the course
    const { data: assignments } = await supabase
      .from("assignments")
      .select("*")
      .eq("course_id", courseId);

    const assignmentIds = (assignments || []).map((a) => a.id);

    // Fetch student's submissions for those assignments
    const { data: submissions, error } = await supabase
      .from("submissions")
      .select(`
        id,
        file_url,
        grade,
        feedback,
        submitted_at,
        assignment:assignment_id ( id, title, description )
      `)
      .eq("student_id", session.id)
      .in("assignment_id", assignmentIds);

    if (error) {
      console.error("Submissions GET error:", error);
      return NextResponse.json({ error: "Could not fetch submissions" }, { status: 500 });
    }

    // Return assignments and submissions so the student dashboard can list homeworks and submission states
    return NextResponse.json({
      success: true,
      assignments: assignments || [],
      submissions: (submissions || []).map((s: any) => ({
        id: s.id,
        fileUrl: s.file_url,
        grade: s.grade,
        feedback: s.feedback,
        submittedAt: s.submitted_at,
        assignment: s.assignment
      }))
    }, { status: 200 });

  } catch (error) {
    console.error("Submissions GET error:", error);
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
    const { assignmentId, submissionContent } = body;

    if (!assignmentId || !submissionContent) {
      return NextResponse.json({ error: "Missing assignmentId or submissionContent" }, { status: 400 });
    }

    // Check if submission already exists
    const { data: existing } = await supabase
      .from("submissions")
      .select("id")
      .eq("student_id", session.id)
      .eq("assignment_id", assignmentId)
      .maybeSingle();

    let result;
    if (existing) {
      // Update existing submission
      const { data, error } = await supabase
        .from("submissions")
        .update({
          file_url: submissionContent,
          grade: null, // Reset grade and feedback upon re-submission
          feedback: null,
          submitted_at: new Date().toISOString()
        })
        .eq("id", existing.id)
        .select()
        .single();
      
      if (error) throw error;
      result = data;
    } else {
      // Insert new submission
      const { data, error } = await supabase
        .from("submissions")
        .insert({
          student_id: session.id,
          assignment_id: assignmentId,
          file_url: submissionContent,
          submitted_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json({
      success: true,
      submission: result
    }, { status: 200 });

  } catch (error) {
    console.error("Submissions POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
