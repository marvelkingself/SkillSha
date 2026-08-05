import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyToken } from "@/lib/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

export async function POST(request: NextRequest) {
  try {
    // 1. Auth check
    const session = await verifyToken(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId, message, chatHistory } = await request.json();

    if (!courseId || !message) {
      return NextResponse.json({ error: "Missing courseId or message" }, { status: 400 });
    }

    if (!API_KEY) {
      return NextResponse.json({ error: "Gemini API key is not configured" }, { status: 500 });
    }

    // 2. Fetch course curriculum
    const { data: curriculum } = await supabase
      .from("courses_registry")
      .select("id, module_title, lesson_title, order_index")
      .eq("course_id", courseId)
      .order("order_index", { ascending: true });

    // 3. Fetch student's progress
    const { data: progress } = await supabase
      .from("student_progress")
      .select("completed_lessons, progress_percentage")
      .eq("user_id", session.id)
      .eq("course_id", courseId)
      .single();

    // 4. Fetch student's submissions and grades
    const { data: submissions } = await supabase
      .from("submissions")
      .select(`
        id,
        grade,
        feedback,
        assignment:assignment_id ( title, description )
      `)
      .eq("student_id", session.id);

    // 5. Construct course context for the LLM
    const totalLessons = curriculum ? curriculum.length : 0;
    const completedList = progress?.completed_lessons || [];
    const progressPercent = progress?.progress_percentage || 0;

    let syllabusSummary = "";
    if (curriculum && curriculum.length > 0) {
      syllabusSummary = curriculum
        .map(
          (c) =>
            `- Lesson [ID: ${c.id}]: "${c.lesson_title}" in Module "${c.module_title}" (Order: ${c.order_index})${
              completedList.includes(c.id) ? " [COMPLETED]" : " [NOT COMPLETED]"
            }`
        )
        .join("\n");
    } else {
      syllabusSummary = "No curriculum has been planned/published for this course yet.";
    }

    let performanceSummary = "";
    if (submissions && submissions.length > 0) {
      performanceSummary = submissions
        .map((s: any) => {
          const title = s.assignment?.title || "Unknown Assignment";
          const gradeStr = s.grade ? `Grade: ${s.grade}` : "Ungraded";
          const fbStr = s.feedback ? `Feedback: "${s.feedback}"` : "No feedback yet";
          return `- ${title}: ${gradeStr}. ${fbStr}`;
        })
        .join("\n");
    } else {
      performanceSummary = "No assignment submissions found yet.";
    }

    const systemPrompt = `
You are "SkillSha AI", an advanced, friendly, and supportive institutional AI Tutor at SkillSha.
Your role is to help the student succeed by answering curriculum-related questions, summarizing lessons they have completed, and giving them progress/study advice based on their current academic profile.

STUDENT PROFILE:
- Name: ${session.name}
- Email: ${session.email}
- Current Course: ${courseId}
- Current Course Progress: ${progressPercent}% completed (${completedList.length} of ${totalLessons} lessons)

SYLLABUS STATUS:
${syllabusSummary}

ASSIGNMENTS & GRADING FEEDBACK:
${performanceSummary}

INSTRUCTIONS:
1. Always be encouraging, professional, and clear.
2. Use markdown formatting to make your responses highly readable (bullet points, bold text, code snippets if appropriate).
3. If they ask "What is my next lesson?", find the first lesson in the syllabus list above (by order_index) that is NOT COMPLETED, and tell them about it.
4. If they ask about summarizing a module/lesson or ask concepts from it, utilize your general knowledge, but align with the syllabus context.
5. If they ask about their grades or what they should improve, refer directly to the ASSIGNMENTS & GRADING FEEDBACK section. Mention specific feedback points their teacher left them.
6. Keep the tone premium, educational, and engaging.
`;

    // 6. Initialize Gemini
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Format chat history for Gemini's API
    // Gemini chat expects: { role: 'user' | 'model', parts: [{ text: string }] }
    const formattedHistory = (chatHistory || []).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    // Start chat with system instruction context embedded in the first turn or as a systemInstruction parameter.
    // In @google/generative-ai, we can pass systemInstruction option to getGenerativeModel or startChat.
    const chat = model.startChat({
      history: formattedHistory,
      systemInstruction: systemPrompt,
    });

    const result = await chat.sendMessage(message);
    const replyText = result.response.text();

    return NextResponse.json({
      success: true,
      reply: replyText,
    }, { status: 200 });

  } catch (error) {
    console.error("Student AI Assistant error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
