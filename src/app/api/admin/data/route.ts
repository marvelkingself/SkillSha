import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // 1. Access control check
    let isAdmin = false;

    // Check custom administrative secret header
    const adminSecret = request.headers.get("x-admin-secret");
    if (adminSecret === "skillsha-admin-secret-2026") {
      isAdmin = true;
    } else {
      // Check standard session token (e.g. admin@skillsha.com)
      const session = await verifyToken(request);
      if (session && session.email === "admin@skillsha.com") {
        isAdmin = true;
      }
    }

    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Fetch all tables from Supabase
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, name, email, program_interest, created_at")
      .order("created_at", { ascending: false });

    if (usersError) console.error("Admin users fetch error:", usersError);

    const { data: bookings, error: bookingsError } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (bookingsError) console.error("Admin bookings fetch error:", bookingsError);

    const { data: payments, error: paymentsError } = await supabase
      .from("payments")
      .select("*")
      .order("created_at", { ascending: false });

    if (paymentsError) console.error("Admin payments fetch error:", paymentsError);

    const { data: certificates, error: certsError } = await supabase
      .from("certificates")
      .select("*")
      .order("created_at", { ascending: false });

    if (certsError) console.error("Admin certificates fetch error:", certsError);

    // 3. Format database columns to camelCase expected by client
    const formattedUsers = (users || []).map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      programInterest: u.program_interest,
      createdAt: u.created_at
    }));

    const formattedBookings = (bookings || []).map(b => ({
      id: b.id,
      name: b.name,
      mobile: b.mobile,
      dateTime: b.date_time,
      createdAt: b.created_at
    }));

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
      users: formattedUsers,
      bookings: formattedBookings,
      payments: formattedPayments,
      certificates: formattedCertificates
    }, { status: 200 });

  } catch (error) {
    console.error("Admin data fetch error:", error);
    return NextResponse.json({ error: "An internal error occurred" }, { status: 500 });
  }
}
