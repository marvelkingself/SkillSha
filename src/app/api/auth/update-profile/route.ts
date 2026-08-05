import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    // Verify the requester is authenticated
    const session = await verifyToken(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, programInterest, password } = body;

    // Retrieve the user from Supabase to ensure they exist
    const { data: user, error: findError } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.id)
      .maybeSingle();

    if (findError || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updates: any = {};
    if (name) updates.name = name.trim();
    if (programInterest) updates.program_interest = programInterest;
    if (password) {
      if (password.length < 8) {
        return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
      }
      updates.password = await bcrypt.hash(password, 12);
    }

    // Perform update in Supabase
    const { data: updatedUser, error: updateError } = await supabase
      .from("users")
      .update(updates)
      .eq("id", session.id)
      .select()
      .single();

    if (updateError || !updatedUser) {
      console.error("Error updating user in Supabase:", updateError);
      return NextResponse.json({ error: "Could not update profile" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        programInterest: updatedUser.program_interest,
      },
    }, { status: 200 });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "An internal error occurred" }, { status: 500 });
  }
}
