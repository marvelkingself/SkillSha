// Talks to skill-sha's own /api/compiler/* routes, which proxy server-side
// to the standalone compiler backend (Redis/Bull queue + Docker sandbox
// workers). Same-origin, so no CORS setup needed — see
// src/app/api/compiler/run/route.ts.

const BASE = "/api/compiler";

const DEFAULT_POLL_MS = 400;
const MAX_POLL_MS = 2000;
const MAX_WAIT_MS = 30_000;

export interface RunResult {
  httpOk: boolean;
  status: "success" | "error";
  runStatus: string;
  stdout: string;
  stderr: string;
  exitCode: number | null;
  truncated: boolean;
}

function sleep(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    if (signal) {
      signal.addEventListener(
        "abort",
        () => {
          clearTimeout(t);
          reject(new DOMException("Aborted", "AbortError"));
        },
        { once: true },
      );
    }
  });
}

export async function runCode({
  language,
  code,
  stdin = "",
  signal,
}: {
  language: string;
  code: string;
  stdin?: string;
  signal?: AbortSignal;
}): Promise<RunResult> {
  const submitRes = await fetch(`${BASE}/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ language, code, stdin }),
    signal,
  });

  let submitData: any;
  try {
    submitData = await submitRes.json();
  } catch {
    throw new Error(`Server ne invalid response bheja (HTTP ${submitRes.status}).`);
  }

  if (submitRes.status === 429) {
    throw new Error(submitData.message || "Bahut zyada requests. Ek minute baad try karo.");
  }
  if (submitRes.status === 503) {
    throw new Error(submitData.message || "Server abhi busy hai. Thodi der me try karo.");
  }
  if (!submitRes.ok || submitData.status !== "queued" || !submitData.jobId) {
    throw new Error(submitData.message || `Job submit nahi hua (HTTP ${submitRes.status}).`);
  }

  const { jobId } = submitData;
  let pollAfterMs: number = submitData.pollAfterMs || DEFAULT_POLL_MS;
  const deadline = Date.now() + MAX_WAIT_MS;

  while (true) {
    await sleep(pollAfterMs, signal);

    const pollRes = await fetch(`${BASE}/run/${jobId}`, { signal });

    let data: any;
    try {
      data = await pollRes.json();
    } catch {
      throw new Error(`Server ne invalid response bheja (HTTP ${pollRes.status}).`);
    }

    if (pollRes.status === 429) {
      throw new Error(data.message || "Bahut zyada requests. Ek minute baad try karo.");
    }

    if (!pollRes.ok && data.status !== "error") {
      throw new Error(data.message || `Job lookup fail (HTTP ${pollRes.status}).`);
    }

    if (data.status === "done" || data.status === "error") {
      const isSuccess = data.status === "done" && data.runStatus === "success";
      return {
        httpOk: true,
        status: isSuccess ? "success" : "error",
        runStatus: data.runStatus,
        stdout: data.stdout ?? "",
        stderr: data.stderr ?? "",
        exitCode: data.exitCode ?? null,
        truncated: Boolean(data.truncated),
      };
    }

    pollAfterMs = Math.min(pollAfterMs * 1.4, MAX_POLL_MS);

    if (Date.now() > deadline) {
      throw new Error("Execution timeout — job bahut lamba chal raha hai.");
    }
  }
}

export default runCode;
