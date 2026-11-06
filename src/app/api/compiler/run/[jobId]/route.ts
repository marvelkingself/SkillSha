import { NextResponse } from "next/server";

const BACKEND = process.env.COMPILER_BACKEND_URL;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ jobId: string }> },
) {
  if (!BACKEND) {
    console.error("COMPILER_BACKEND_URL is not set");
    return NextResponse.json(
      { status: "error", message: "Compiler service is not configured." },
      { status: 503 },
    );
  }

  const { jobId } = await params;

  try {
    const backendRes = await fetch(`${BACKEND}/api/run/${encodeURIComponent(jobId)}`);
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
