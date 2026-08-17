import { NextResponse } from "next/server";

// Thin proxy to the standalone compiler backend (Redis/Bull queue + Docker
// sandbox workers, deployed separately — see the `compiler` repo). We're on
// Vercel here, no Docker daemon, so execution can't happen in this process.
// Kept server-side so COMPILER_BACKEND_URL never reaches the browser and no
// CORS config is needed on the backend.

const BACKEND = process.env.COMPILER_BACKEND_URL;

export async function POST(request: Request) {
  if (!BACKEND) {
    console.error("COMPILER_BACKEND_URL is not set");
    return NextResponse.json(
      { status: "error", message: "Compiler service is not configured." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { status: "error", message: "Invalid JSON body." },
      { status: 400 },
    );
  }

  try {
    const backendRes = await fetch(`${BACKEND}/api/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (err) {
    console.error("compiler backend unreachable:", err);
    return NextResponse.json(
      { status: "error", message: "Compiler service unavailable." },
      { status: 503 },
    );
  }
}
