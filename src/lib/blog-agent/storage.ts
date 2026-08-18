import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabase";

export interface AgentSettingsData {
  blogsPerDay: number;
  minWords: number;
  maxWords: number;
  publishingTime: string;
  autoPublish: boolean;
  targetCountry: string;
  targetLanguage: string;
  targetAudience: string;
  websiteNiche: string;
}

export interface AgentRunData {
  _id: string;
  date: string;
  startedAt: string;
  completedAt?: string;
  topicsSelected: string[];
  blogsGenerated: number;
  blogsPublished: number;
  blogsFailed: number;
  status: "running" | "completed" | "failed";
  logs: string[];
  errors: string[];
}

const DEFAULT_SETTINGS: AgentSettingsData = {
  blogsPerDay: 10,
  minWords: 1000,
  maxWords: 2000,
  publishingTime: "09:00",
  autoPublish: true,
  targetCountry: "India",
  targetLanguage: "English",
  targetAudience: "Students, Career Switchers",
  websiteNiche: "IT Training",
};

const CONTENT_DIR = path.join(process.cwd(), "content");
const SETTINGS_FILE = path.join(CONTENT_DIR, "agent-settings.json");
const RUNS_FILE = path.join(CONTENT_DIR, "agent-runs.json");

function ensureContentDir() {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }
}

/**
 * Fetch current Agent Settings (from local JSON file with Supabase fallback)
 */
export async function getAgentSettings(): Promise<AgentSettingsData> {
  ensureContentDir();

  // Try Supabase if table exists
  try {
    const { data, error } = await supabase.from("agent_settings").select("*").single();
    if (data && !error) {
      return { ...DEFAULT_SETTINGS, ...data };
    }
  } catch (e) {
    // Ignore and fallback to file
  }

  if (fs.existsSync(SETTINGS_FILE)) {
    try {
      const raw = fs.readFileSync(SETTINGS_FILE, "utf-8").trim();
      if (raw) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
      }
    } catch (e) {
      console.error("Error reading agent-settings.json:", e);
    }
  }

  return DEFAULT_SETTINGS;
}

/**
 * Save updated Agent Settings
 */
export async function saveAgentSettings(
  settings: Partial<AgentSettingsData>
): Promise<AgentSettingsData> {
  ensureContentDir();
  const current = await getAgentSettings();
  const updated = { ...current, ...settings };

  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2), "utf-8");

  try {
    await supabase.from("agent_settings").upsert(updated);
  } catch (e) {
    // Ignore if table does not exist
  }

  return updated;
}

/**
 * Get recent Agent Runs
 */
export async function getAgentRuns(): Promise<AgentRunData[]> {
  ensureContentDir();

  try {
    const { data, error } = await supabase
      .from("agent_runs")
      .select("*")
      .order("startedAt", { ascending: false })
      .limit(20);
    if (data && !error && data.length > 0) {
      return data;
    }
  } catch (e) {
    // Ignore
  }

  if (fs.existsSync(RUNS_FILE)) {
    try {
      const raw = fs.readFileSync(RUNS_FILE, "utf-8").trim();
      if (raw) {
        const runs = JSON.parse(raw);
        return Array.isArray(runs) ? runs : [];
      }
    } catch (e) {
      console.error("Error reading agent-runs.json:", e);
    }
  }

  return [];
}

/**
 * Get single Agent Run by ID
 */
export async function getAgentRunById(runId: string): Promise<AgentRunData | null> {
  const runs = await getAgentRuns();
  return runs.find((r) => r._id === runId) || null;
}

/**
 * Create a new Agent Run record
 */
export async function createAgentRun(initial?: Partial<AgentRunData>): Promise<AgentRunData> {
  ensureContentDir();
  const runs = await getAgentRuns();
  const timeStr = new Date().toLocaleTimeString();

  const newRun: AgentRunData = {
    _id: `run_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    date: new Date().toISOString().split("T")[0],
    startedAt: new Date().toISOString(),
    topicsSelected: [],
    blogsGenerated: 0,
    blogsPublished: 0,
    blogsFailed: 0,
    status: "running",
    logs: [`[${timeStr}] AI Blog Agent initialized.`],
    errors: [],
    ...initial,
  };

  runs.unshift(newRun);
  const trimmed = runs.slice(0, 50);
  fs.writeFileSync(RUNS_FILE, JSON.stringify(trimmed, null, 2), "utf-8");

  try {
    await supabase.from("agent_runs").insert(newRun);
  } catch (e) {
    // Ignore
  }

  return newRun;
}

/**
 * Update an existing Agent Run
 */
export async function updateAgentRun(
  runId: string,
  updates: Partial<AgentRunData>
): Promise<AgentRunData | null> {
  ensureContentDir();
  const runs = await getAgentRuns();
  const index = runs.findIndex((r) => r._id === runId);

  if (index === -1) return null;

  const updatedRun = { ...runs[index], ...updates };
  runs[index] = updatedRun;
  fs.writeFileSync(RUNS_FILE, JSON.stringify(runs, null, 2), "utf-8");

  try {
    await supabase.from("agent_runs").update(updates).eq("_id", runId);
  } catch (e) {
    // Ignore
  }

  return updatedRun;
}

/**
 * Append a log line to a specific run
 */
export async function appendRunLog(
  runId: string,
  logMsg: string,
  isError = false
): Promise<void> {
  const timeStr = new Date().toLocaleTimeString();
  const formatted = `[${timeStr}] ${logMsg}`;
  console.log(formatted);

  const runs = await getAgentRuns();
  const run = runs.find((r) => r._id === runId);
  if (!run) return;

  const logs = [...(run.logs || []), formatted];
  const errors = isError ? [...(run.errors || []), logMsg] : run.errors;

  await updateAgentRun(runId, { logs, errors });
}
