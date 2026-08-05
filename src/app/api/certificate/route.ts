import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const SEED_CERTIFICATES = [
  {
    credentialId: "SKILLSHA-2026-AI",
    studentName: "Lavish",
    courseName: "AI Engineering Masterclass",
    dateIssued: "May 18, 2026",
    grade: "Distinction (A+)",
    instructor: "Dr. Aris Thorne"
  },
  {
    credentialId: "SKILLSHA-2026-UX",
    studentName: "Jane Doe",
    courseName: "Advanced UI/UX & Design Systems",
    dateIssued: "May 12, 2026",
    grade: "Excellent (A)",
    instructor: "Sarah Vance"
  },
  {
    credentialId: "SKILLSHA-2026-QUANT",
    studentName: "Alex Rivera",
    courseName: "Algorithmic Trading & Quantitative Finance",
    dateIssued: "May 15, 2026",
    grade: "Distinction (A+)",
    instructor: "Marcus Kael"
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id")?.trim().toUpperCase();

    if (!id) {
      return NextResponse.json({ error: "Missing credential ID parameter" }, { status: 400 });
    }

    // Retrieve certificate from Supabase
    let { data: cert, error: findError } = await supabase
      .from("certificates")
      .select("*")
      .eq("credential_id", id)
      .maybeSingle();

    if (findError) {
      console.error("Supabase certificate query error:", findError);
      return NextResponse.json({ error: "An internal error occurred" }, { status: 500 });
    }

    // Seed database if it's a known demo key but doesn't exist yet
    if (!cert) {
      const seedData = SEED_CERTIFICATES.find(c => c.credentialId === id);
      if (seedData) {
        const { data: insertedCert, error: insertError } = await supabase
          .from("certificates")
          .insert({
            credential_id: seedData.credentialId,
            student_name: seedData.studentName,
            course_name: seedData.courseName,
            date_issued: seedData.dateIssued,
            grade: seedData.grade,
            instructor: seedData.instructor
          })
          .select()
          .single();

        if (insertError) {
          console.error("Supabase certificate seed error:", insertError);
        } else {
          cert = insertedCert;
        }
      }
    }

    if (!cert) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    // Map database columns to camelCase expected by frontend
    const formattedCert = {
      id: cert.id,
      credentialId: cert.credential_id,
      studentName: cert.student_name,
      courseName: cert.course_name,
      dateIssued: cert.date_issued,
      grade: cert.grade,
      instructor: cert.instructor,
      createdAt: cert.created_at
    };

    return NextResponse.json({ success: true, certificate: formattedCert }, { status: 200 });
  } catch (error) {
    console.error("Certificate fetch error:", error);
    return NextResponse.json({ error: "An internal error occurred" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { credentialId, studentName, courseName, dateIssued, grade, instructor } = body;

    if (!credentialId || !studentName || !courseName || !dateIssued || !grade || !instructor) {
      return NextResponse.json({ error: "Missing certificate fields" }, { status: 400 });
    }

    const { data: existing, error: existError } = await supabase
      .from("certificates")
      .select("id")
      .eq("credential_id", credentialId.toUpperCase())
      .maybeSingle();

    if (existError) {
      console.error("Error checking duplicate certificate:", existError);
      return NextResponse.json({ error: "An internal error occurred" }, { status: 500 });
    }

    if (existing) {
      return NextResponse.json({ error: "Credential ID already exists" }, { status: 400 });
    }

    const { data: newCert, error: insertError } = await supabase
      .from("certificates")
      .insert({
        credential_id: credentialId.toUpperCase(),
        student_name: studentName,
        course_name: courseName,
        date_issued: dateIssued,
        grade,
        instructor
      })
      .select()
      .single();

    if (insertError || !newCert) {
      console.error("Supabase certificate creation error:", insertError);
      return NextResponse.json({ error: "Could not create certificate" }, { status: 500 });
    }

    const formattedCert = {
      id: newCert.id,
      credentialId: newCert.credential_id,
      studentName: newCert.student_name,
      courseName: newCert.course_name,
      dateIssued: newCert.date_issued,
      grade: newCert.grade,
      instructor: newCert.instructor,
      createdAt: newCert.created_at
    };

    return NextResponse.json({ success: true, certificate: formattedCert }, { status: 201 });
  } catch (error) {
    console.error("Certificate creation error:", error);
    return NextResponse.json({ error: "An internal error occurred" }, { status: 500 });
  }
}
