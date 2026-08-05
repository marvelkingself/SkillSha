import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

export async function GET(request: NextRequest) {
  try {
    // 1. Auth check
    const teacherSecret = request.headers.get("x-teacher-secret");
    if (teacherSecret !== "skillsha-teacher-secret-2026") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Fetch submissions with student and assignment details using Supabase joins
    const { data: submissions, error } = await supabase
      .from("submissions")
      .select(`
        id,
        file_url,
        grade,
        feedback,
        submitted_at,
        student:student_id ( id, name, email ),
        assignment:assignment_id ( id, title, description, course_id )
      `)
      .order("submitted_at", { ascending: false });

    if (error) {
      console.error("Error fetching submissions:", error);
      return NextResponse.json({ error: "Could not fetch submissions" }, { status: 500 });
    }

    const formattedSubmissions = (submissions || []).map((s: any) => ({
      id: s.id,
      fileUrl: s.file_url,
      grade: s.grade,
      feedback: s.feedback,
      submittedAt: s.submitted_at,
      student: s.student,
      assignment: s.assignment
    }));

    return NextResponse.json({ success: true, submissions: formattedSubmissions }, { status: 200 });
  } catch (error) {
    console.error("Grades GET error:", error);
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
    const { action, submissionId, grade, feedback, studentWork, assignmentTitle, assignmentDescription } = body;

    // AI Assisted Grading Case
    if (action === "ai-grade") {
      if (!assignmentTitle || !studentWork) {
        return NextResponse.json({ error: "Missing required details for AI grading" }, { status: 400 });
      }

      if (!API_KEY) {
        return NextResponse.json({ error: "Gemini API key is not configured in environment" }, { status: 500 });
      }

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

      const prompt = `
        You are an expert academic evaluator and grading assistant. Grade the following student submission:
        
        Assignment Title: "${assignmentTitle}"
        Assignment Description: "${assignmentDescription || "N/A"}"
        
        Student Submission:
        "${studentWork}"
        
        Please critique the submission. Output a JSON object containing:
        - "grade": string (e.g. "Distinction (A+)", "Excellent (A)", "Pass (B)", "Needs Improvement (C)")
        - "feedback": string (constructive critique, detailing strengths and specific areas of improvement, at least 100 words)

        Respond with ONLY the raw JSON object. Do not include markdown code block wraps.
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      const cleanText = text.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
      const aiEvaluation = JSON.parse(cleanText);

      return NextResponse.json({
        success: true,
        aiGrade: aiEvaluation.grade,
        aiFeedback: aiEvaluation.feedback
      }, { status: 200 });
    }

    // Manual Save Grade Case
    if (!submissionId) {
      return NextResponse.json({ error: "Missing submissionId" }, { status: 400 });
    }

    const { data: updated, error } = await supabase
      .from("submissions")
      .update({
        grade,
        feedback
      })
      .eq("id", submissionId)
      .select()
      .single();

    if (error || !updated) {
      console.error("Error updating grade in Supabase:", error);
      return NextResponse.json({ error: "Could not save grade" }, { status: 500 });
    }

    return NextResponse.json({ success: true, submission: updated }, { status: 200 });
  } catch (error) {
    console.error("Grades POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
