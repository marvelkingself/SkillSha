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

/**
 * Fetch current Agent Settings strictly from Supabase DB (table 'agent_settings')
 */
export async function getAgentSettings(): Promise<AgentSettingsData> {
  try {
    const { data, error } = await supabase.from("agent_settings").select("*").eq("id", 1).maybeSingle();
    if (data && !error) {
      return {
        blogsPerDay: data.blogs_per_day ?? DEFAULT_SETTINGS.blogsPerDay,
        minWords: data.min_words ?? DEFAULT_SETTINGS.minWords,
        maxWords: data.max_words ?? DEFAULT_SETTINGS.maxWords,
        publishingTime: data.publishing_time ?? DEFAULT_SETTINGS.publishingTime,
        autoPublish: data.auto_publish ?? DEFAULT_SETTINGS.autoPublish,
        targetCountry: data.target_country ?? DEFAULT_SETTINGS.targetCountry,
        targetLanguage: data.target_language ?? DEFAULT_SETTINGS.targetLanguage,
        targetAudience: data.target_audience ?? DEFAULT_SETTINGS.targetAudience,
        websiteNiche: data.website_niche ?? DEFAULT_SETTINGS.websiteNiche,
      };
    }
  } catch (e) {
    console.error("Error fetching agent_settings from Supabase:", e);
  }

  return DEFAULT_SETTINGS;
}

/**
 * Save updated Agent Settings strictly into Supabase DB (table 'agent_settings')
 */
export async function saveAgentSettings(
  settings: Partial<AgentSettingsData>
): Promise<AgentSettingsData> {
  const current = await getAgentSettings();
  const updated = { ...current, ...settings };

  try {
    const dbRow = {
      id: 1,
      blogs_per_day: updated.blogsPerDay,
      min_words: updated.minWords,
      max_words: updated.maxWords,
      publishing_time: updated.publishingTime,
      auto_publish: updated.autoPublish,
      target_country: updated.targetCountry,
      target_language: updated.targetLanguage,
      target_audience: updated.targetAudience,
      website_niche: updated.websiteNiche,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("agent_settings").upsert(dbRow, { onConflict: "id" });
    if (error) {
      console.error("Error saving agent_settings to Supabase:", error.message);
    } else {
      console.log("Successfully saved agent_settings to Supabase DB.");
    }
  } catch (e: any) {
    console.error("Supabase agent_settings error:", e.message || e);
  }

  return updated;
}

/**
 * Helper to map Supabase agent_runs row to AgentRunData
 */
function mapRunRow(row: any): AgentRunData {
  return {
    _id: row.id,
    date: row.date,
    startedAt: row.started_at,
    completedAt: row.completed_at || undefined,
    topicsSelected: Array.isArray(row.topics_selected) ? row.topics_selected : [],
    blogsGenerated: row.blogs_generated || 0,
    blogsPublished: row.blogs_published || 0,
    blogsFailed: row.blogs_failed || 0,
    status: row.status || "failed",
    logs: Array.isArray(row.logs) ? row.logs : [],
    errors: Array.isArray(row.errors) ? row.errors : [],
  };
}

/**
 * Get recent Agent Runs strictly from Supabase DB (table 'agent_runs')
 */
export async function getAgentRuns(): Promise<AgentRunData[]> {
  try {
    const { data, error } = await supabase
      .from("agent_runs")
      .select("*")
      .order("started_at", { ascending: false })
      .limit(30);

    if (data && !error) {
      return data.map(mapRunRow);
    }
  } catch (e) {
    console.error("Error fetching agent_runs from Supabase DB:", e);
  }

  return [];
}

/**
 * Get single Agent Run by ID strictly from Supabase DB
 */
export async function getAgentRunById(runId: string): Promise<AgentRunData | null> {
  try {
    const { data, error } = await supabase.from("agent_runs").select("*").eq("id", runId).single();
    if (data && !error) {
      return mapRunRow(data);
    }
  } catch (e) {
    // Ignore if not found
  }
  return null;
}

/**
 * Create a new Agent Run record strictly in Supabase DB
 */
export async function createAgentRun(initial?: Partial<AgentRunData>): Promise<AgentRunData> {
  const timeStr = new Date().toLocaleTimeString();
  const runId = `run_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  const nowIso = new Date().toISOString();

  const newRun: AgentRunData = {
    _id: runId,
    date: nowIso.split("T")[0],
    startedAt: nowIso,
    topicsSelected: [],
    blogsGenerated: 0,
    blogsPublished: 0,
    blogsFailed: 0,
    status: "running",
    logs: [`[${timeStr}] AI Blog Agent initialized.`],
    errors: [],
    ...initial,
  };

  try {
    const dbRow = {
      id: newRun._id,
      date: newRun.date,
      started_at: newRun.startedAt,
      completed_at: newRun.completedAt || null,
      topics_selected: newRun.topicsSelected,
      blogs_generated: newRun.blogsGenerated,
      blogs_published: newRun.blogsPublished,
      blogs_failed: newRun.blogsFailed,
      status: newRun.status,
      logs: newRun.logs,
      errors: newRun.errors,
    };

    const { error } = await supabase.from("agent_runs").insert(dbRow);
    if (error) {
      console.error("Error inserting agent_run to Supabase DB:", error.message);
    } else {
      console.log(`Successfully created agent_run "${runId}" in Supabase DB.`);
    }
  } catch (e: any) {
    console.error("Supabase agent_run creation error:", e.message || e);
  }

  return newRun;
}

/**
 * Update an existing Agent Run strictly in Supabase DB
 */
export async function updateAgentRun(
  runId: string,
  updates: Partial<AgentRunData>
): Promise<AgentRunData | null> {
  try {
    const current = await getAgentRunById(runId);
    const updatedRun = current ? { ...current, ...updates } : null;

    const dbRow: any = {};
    if (updates.date !== undefined) dbRow.date = updates.date;
    if (updates.startedAt !== undefined) dbRow.started_at = updates.startedAt;
    if (updates.completedAt !== undefined) dbRow.completed_at = updates.completedAt;
    if (updates.topicsSelected !== undefined) dbRow.topics_selected = updates.topicsSelected;
    if (updates.blogsGenerated !== undefined) dbRow.blogs_generated = updates.blogsGenerated;
    if (updates.blogsPublished !== undefined) dbRow.blogs_published = updates.blogsPublished;
    if (updates.blogsFailed !== undefined) dbRow.blogs_failed = updates.blogsFailed;
    if (updates.status !== undefined) dbRow.status = updates.status;
    if (updates.logs !== undefined) dbRow.logs = updates.logs;
    if (updates.errors !== undefined) dbRow.errors = updates.errors;

    const { error } = await supabase.from("agent_runs").update(dbRow).eq("id", runId);
    if (error) {
      console.error(`Error updating agent_run "${runId}" in Supabase:`, error.message);
    }

    return updatedRun;
  } catch (e: any) {
    console.error("Supabase agent_run update error:", e.message || e);
    return null;
  }
}

/**
 * Append a log line to a specific run strictly in Supabase DB
 */
export async function appendRunLog(
  runId: string,
  logMsg: string,
  isError = false
): Promise<void> {
  const timeStr = new Date().toLocaleTimeString();
  const formatted = `[${timeStr}] ${logMsg}`;
  console.log(formatted);

  try {
    const run = await getAgentRunById(runId);
    if (run) {
      const logs = [...run.logs, formatted];
      const errors = isError ? [...run.errors, logMsg] : run.errors;
      await updateAgentRun(runId, { logs, errors });
    }
  } catch (e) {
    console.error("Error appending run log to Supabase:", e);
  }
}
