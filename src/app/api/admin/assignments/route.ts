import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyToken } from "@/lib/auth";

// Auth helper
async function checkAdmin(request: NextRequest) {
  const adminSecret = request.headers.get("x-admin-secret");
  if (adminSecret === "skillsha-admin-secret-2026") {
    return true;
  }
  const session = await verifyToken(request);
  if (session && session.email === "admin@skillsha.com") {
    return true;
  }
  return false;
}

export async function GET(request: NextRequest) {
  try {
    const isAuthorized = await checkAdmin(request);
    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: assignments, error } = await supabase
      .from("assignments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch assignments error:", error);
      return NextResponse.json({ error: "Could not fetch assignments" }, { status: 500 });
    }

    return NextResponse.json({ success: true, assignments }, { status: 200 });
  } catch (error) {
    console.error("Assignments GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthorized = await checkAdmin(request);
    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { courseId, title, description } = body;

    if (!courseId || !title || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data: newAssignment, error } = await supabase
      .from("assignments")
      .insert({
        course_id: courseId,
        title,
        description
      })
      .select()
      .single();

    if (error || !newAssignment) {
      console.error("Create assignment error:", error);
      return NextResponse.json({ error: "Failed to create assignment" }, { status: 500 });
    }

    return NextResponse.json({ success: true, assignment: newAssignment }, { status: 201 });
  } catch (error) {
    console.error("Assignments POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const isAuthorized = await checkAdmin(request);
    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const assignmentId = searchParams.get("id");

    if (!assignmentId) {
      return NextResponse.json({ error: "Missing assignment ID" }, { status: 400 });
    }

    const { error } = await supabase
      .from("assignments")
      .delete()
      .eq("id", assignmentId);

    if (error) {
      console.error("Delete assignment error:", error);
      return NextResponse.json({ error: "Failed to delete assignment" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Assignments DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
