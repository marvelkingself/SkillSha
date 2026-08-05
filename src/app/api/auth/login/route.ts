import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { signToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Query user in Supabase
    const { data: user, error: findError } = await supabase
      .from("users")
      .select("*")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (findError) {
      console.error("Error finding user in Supabase:", findError);
      return NextResponse.json({ error: "An internal error occurred" }, { status: 500 });
    }

    if (!user) {
      // Deliberate vague message to prevent email enumeration
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await signToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    const response = NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        programInterest: user.program_interest,
      },
    }, { status: 200 });

    // Also set as HttpOnly cookie for server-side auth checks
    response.cookies.set("skillsha_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "An internal error occurred" }, { status: 500 });
  }
}
