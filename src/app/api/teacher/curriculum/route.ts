import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    const { data: curriculum, error } = await supabase
      .from("courses_registry")
      .select("*")
      .eq("course_id", courseId)
      .order("order_index", { ascending: true });

    if (error) {
      console.error("Error fetching curriculum:", error);
      return NextResponse.json({ error: "Could not fetch curriculum" }, { status: 500 });
    }

    return NextResponse.json({ success: true, curriculum }, { status: 200 });
  } catch (error) {
    console.error("Curriculum GET error:", error);
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
    const { action, courseId, topic, lessonData, lessonId } = body;

    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    // AI Generation Case
    if (action === "generate") {
      if (!topic) {
        return NextResponse.json({ error: "Missing topic for AI generation" }, { status: 400 });
      }

      if (!API_KEY) {
        return NextResponse.json({ error: "Gemini API key is not configured in environment" }, { status: 500 });
      }

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
        You are an expert curriculum designer. Generate a structured course syllabus for the topic: "${topic}".
        Format the output as a JSON array of lessons. Each object in the array MUST contain the following properties:
        - "module_title": string (e.g. "Introduction to RAG", "Vector Search Indices")
        - "lesson_title": string (e.g. "Understanding Embeddings", "Symmetric vs Asymmetric search")
        - "lesson_content": string (detailed educational content in markdown, at least 150 words per lesson, explaining concepts and code examples)
        - "order_index": integer (1-indexed sequence order)

        Respond with ONLY the raw JSON array. Do not wrap the JSON in \`\`\`json or \`\`\` block formatting.
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      
      // Clean up markdown block wraps if model included them
      const cleanText = text.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
      const lessons = JSON.parse(cleanText);

      if (!Array.isArray(lessons)) {
        throw new Error("Gemini response is not a valid JSON array");
      }

      // Prepare database inserts
      const rows = lessons.map(lesson => ({
        course_id: courseId,
        module_title: lesson.module_title,
        lesson_title: lesson.lesson_title,
        lesson_content: lesson.lesson_content,
        order_index: lesson.order_index
      }));

      // Delete existing lessons for this course first to overwrite it
      await supabase.from("courses_registry").delete().eq("course_id", courseId);

      const { data: newCurriculum, error: insertError } = await supabase
        .from("courses_registry")
        .insert(rows)
        .select();

      if (insertError) {
        console.error("Supabase insert generated curriculum error:", insertError);
        return NextResponse.json({ error: "Failed to save generated curriculum" }, { status: 500 });
      }

      return NextResponse.json({ success: true, curriculum: newCurriculum }, { status: 201 });
    }

    // Manual Creation Case
    if (action === "create") {
      const { moduleTitle, lessonTitle, lessonContent, orderIndex } = lessonData;
      const { data: newLesson, error } = await supabase
        .from("courses_registry")
        .insert({
          course_id: courseId,
          module_title: moduleTitle,
          lesson_title: lessonTitle,
          lesson_content: lessonContent,
          order_index: orderIndex
        })
        .select()
        .single();

      if (error) {
        console.error("Create lesson error:", error);
        return NextResponse.json({ error: "Failed to create lesson" }, { status: 500 });
      }

      return NextResponse.json({ success: true, lesson: newLesson }, { status: 201 });
    }

    // Manual Update Case
    if (action === "update") {
      if (!lessonId) {
        return NextResponse.json({ error: "Missing lessonId" }, { status: 400 });
      }
      const { moduleTitle, lessonTitle, lessonContent, orderIndex } = lessonData;
      const { data: updatedLesson, error } = await supabase
        .from("courses_registry")
        .update({
          module_title: moduleTitle,
          lesson_title: lessonTitle,
          lesson_content: lessonContent,
          order_index: orderIndex
        })
        .eq("id", lessonId)
        .select()
        .single();

      if (error) {
        console.error("Update lesson error:", error);
        return NextResponse.json({ error: "Failed to update lesson" }, { status: 500 });
      }

      return NextResponse.json({ success: true, lesson: updatedLesson }, { status: 200 });
    }

    // Manual Delete Case
    if (action === "delete") {
      if (!lessonId) {
        return NextResponse.json({ error: "Missing lessonId" }, { status: 400 });
      }
      const { error } = await supabase
        .from("courses_registry")
        .delete()
        .eq("id", lessonId);

      if (error) {
        console.error("Delete lesson error:", error);
        return NextResponse.json({ error: "Failed to delete lesson" }, { status: 500 });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });

  } catch (error) {
    console.error("Curriculum POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
