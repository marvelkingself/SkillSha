import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Authoritative server-side price table
const PROGRAM_PRICES: Record<string, { full: number; emi: number }> = {
  "AI Engineering Masterclass":           { full: 49999, emi: 5000 },
  "Advanced UI/UX & Design Systems":      { full: 39999, emi: 4000 },
  "Data Science & Machine Learning":      { full: 44999, emi: 4500 },
  "Product Leadership & Growth":          { full: 34999, emi: 3500 },
  "Algorithmic Trading & Quantitative Finance": { full: 54999, emi: 5500 },
  "Graphic Designing":                    { full: 29999, emi: 3000 },
  "Mental Health & Habit Design":         { full: 24999, emi: 2500 },
};

const GST_RATE = 0.18;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, program, amountType, paymentMethod } = body;

    if (!name || !email || !program || !amountType || !paymentMethod) {
      return NextResponse.json(
        { error: "Missing required billing details" },
        { status: 400 }
      );
    }

    const prices = PROGRAM_PRICES[program];
    if (!prices) {
      return NextResponse.json({ error: "Invalid program selected" }, { status: 400 });
    }

    if (!["full", "emi"].includes(amountType)) {
      return NextResponse.json({ error: "Invalid amount type" }, { status: 400 });
    }

    const baseAmount = amountType === "full" ? prices.full : prices.emi;
    const gst = Math.round(baseAmount * GST_RATE);
    const total = baseAmount + gst;

    const { data: newPayment, error } = await supabase
      .from("payments")
      .insert({
        name,
        email,
        program,
        amount_type: amountType,
        amount: baseAmount,
        gst,
        total,
        payment_method: paymentMethod,
        status: "Success",
      })
      .select()
      .single();

    if (error || !newPayment) {
      console.error("Supabase payment creation error:", error);
      return NextResponse.json({ error: "Could not record payment" }, { status: 500 });
    }

    const formattedPayment = {
      id: newPayment.id,
      name: newPayment.name,
      email: newPayment.email,
      program: newPayment.program,
      amountType: newPayment.amount_type,
      amount: newPayment.amount,
      gst: newPayment.gst,
      total: newPayment.total,
      paymentMethod: newPayment.payment_method,
      status: newPayment.status,
      createdAt: newPayment.created_at
    };

    return NextResponse.json({ success: true, payment: formattedPayment }, { status: 201 });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json({ error: "An internal error occurred" }, { status: 500 });
  }
}
