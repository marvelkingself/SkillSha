import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { signToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, programInterest } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists in Supabase
    const { data: existing, error: findError } = await supabase
      .from("users")
      .select("id")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (findError) {
      console.error("Error checking existing user in Supabase:", findError);
      return NextResponse.json({ error: "An internal error occurred" }, { status: 500 });
    }

    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert new user into Supabase
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert({
        name,
        email: normalizedEmail,
        password: hashedPassword,
        program_interest: programInterest || "AI Engineering Masterclass",
      })
      .select()
      .single();

    if (insertError || !newUser) {
      console.error("Error creating user in Supabase:", insertError);
      return NextResponse.json({ error: "Could not register user" }, { status: 500 });
    }

    const token = await signToken({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    });

    const response = NextResponse.json({
      success: true,
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        programInterest: newUser.program_interest,
      },
    }, { status: 201 });

    response.cookies.set("skillsha_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "An internal error occurred" }, { status: 500 });
  }
}
