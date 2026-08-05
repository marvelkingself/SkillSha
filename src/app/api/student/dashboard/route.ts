import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Verify the caller is authenticated
    const session = await verifyToken(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.email;
    const userName = session.name;

    // Fetch payments from Supabase
    const { data: payments, error: paymentsError } = await supabase
      .from("payments")
      .select("*")
      .eq("email", userEmail)
      .order("created_at", { ascending: false });

    if (paymentsError) {
      console.error("Supabase payments fetch error:", paymentsError);
    }

    // Fetch bookings matching user name (case-insensitive)
    const { data: bookings, error: bookingsError } = await supabase
      .from("bookings")
      .select("*")
      .ilike("name", `%${userName}%`)
      .order("created_at", { ascending: false });

    if (bookingsError) {
      console.error("Supabase bookings fetch error:", bookingsError);
    }

    // Fetch certificates matching student name (case-insensitive)
    const { data: certificates, error: certsError } = await supabase
      .from("certificates")
      .select("*")
      .ilike("student_name", `%${userName}%`)
      .order("created_at", { ascending: false });

    if (certsError) {
      console.error("Supabase certificates fetch error:", certsError);
    }

    // Map database columns to camelCase expected by frontend
    const formattedPayments = (payments || []).map(p => ({
      id: p.id,
      name: p.name,
      email: p.email,
      program: p.program,
      amountType: p.amount_type,
      amount: p.amount,
      gst: p.gst,
      total: p.total,
      paymentMethod: p.payment_method,
      status: p.status,
      createdAt: p.created_at
    }));

    const formattedBookings = (bookings || []).map(b => ({
      id: b.id,
      name: b.name,
      mobile: b.mobile,
      dateTime: b.date_time,
      createdAt: b.created_at
    }));

    const formattedCertificates = (certificates || []).map(c => ({
      id: c.id,
      credentialId: c.credential_id,
      studentName: c.student_name,
      courseName: c.course_name,
      dateIssued: c.date_issued,
      grade: c.grade,
      instructor: c.instructor,
      createdAt: c.created_at
    }));

    return NextResponse.json({
      success: true,
      payments: formattedPayments,
      bookings: formattedBookings,
      certificates: formattedCertificates,
    }, { status: 200 });
  } catch (error) {
    console.error("Dashboard data fetch error:", error);
    return NextResponse.json({ error: "An internal error occurred" }, { status: 500 });
  }
}
