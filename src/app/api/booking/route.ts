import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, mobile, dateTime } = body;

    if (!name || !mobile || !dateTime) {
      return NextResponse.json(
        { error: "Missing required fields (name, mobile, dateTime)" },
        { status: 400 }
      );
    }

    const { data: newBooking, error } = await supabase
      .from("bookings")
      .insert({
        name,
        mobile,
        date_time: dateTime,
      })
      .select()
      .single();

    if (error || !newBooking) {
      console.error("Supabase booking insert error:", error);
      return NextResponse.json({ error: "Could not save booking" }, { status: 500 });
    }

    return NextResponse.json({ success: true, booking: newBooking }, { status: 201 });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: "An internal error occurred" }, { status: 500 });
  }
}
