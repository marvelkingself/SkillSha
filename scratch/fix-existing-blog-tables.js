const path = require("path");
const fs = require("fs");

const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [key, ...vals] = trimmed.split("=");
      process.env[key.trim()] = vals.join("=").trim();
    }
  });
}

const { createClient } = require("@supabase/supabase-js");

function renderHTMLTable(headers, rows) {
  const ths = headers
    .map(
      (h) =>
        `<th class="p-3.5 bg-blue-500/10 dark:bg-blue-600/15 text-blue-500 dark:text-blue-400 font-bold border border-zinc-200/40 dark:border-white/10 text-left text-xs uppercase tracking-wider">${h}</th>`
    )
    .join("");

  const trs = rows
    .map(
      (row) =>
        `<tr class="hover:bg-zinc-50/70 dark:hover:bg-white/[0.03] transition-colors">${row
          .map(
            (c) =>
              `<td class="p-3.5 border border-zinc-200/40 dark:border-white/10 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">${c}</td>`
          )
          .join("")}</tr>`
    )
    .join("");

  return `<div class="my-6 overflow-x-auto rounded-2xl border border-zinc-200/50 dark:border-white/10 bg-white dark:bg-zinc-900/60 shadow-md"><table class="w-full border-collapse text-left"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
}

function formatBlogContent(content) {
  if (!content) return "";

  let formatted = content;

  // 1. Pipe tables
  const pipeTableRegex = /((?:^[ \t]*\|[^\n]+\|[ \t]*(?:\r?\n|$))+)/gm;
  formatted = formatted.replace(pipeTableRegex, (tableBlock) => {
    const lines = tableBlock
      .trim()
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    if (lines.length < 2) return tableBlock;

    let headers = [];
    const rows = [];

    lines.forEach((line, idx) => {
      if (/^\|[-:\s|]+\|$/.test(line)) return;
      const cells = line
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((c) => c.trim());

      if (idx === 0) {
        headers = cells;
      } else {
        rows.push(cells);
      }
    });

    if (headers.length === 0) return tableBlock;
    return renderHTMLTable(headers, rows);
  });

  // 2. Space/Tab tables
  const lines = formatted.split(/\r?\n/);
  const outputLines = [];
  let tableBuffer = [];

  const flushTable = () => {
    if (tableBuffer.length >= 2) {
      const headers = tableBuffer[0];
      const rows = tableBuffer.slice(1);
      outputLines.push(renderHTMLTable(headers, rows));
    } else if (tableBuffer.length === 1) {
      outputLines.push(tableBuffer[0].join(" &nbsp; "));
    }
    tableBuffer = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith("<div") || trimmed.startsWith("<table") || trimmed.startsWith("<p") || trimmed.startsWith("<h")) {
      flushTable();
      outputLines.push(line);
      continue;
    }

    const parts = trimmed.split(/\t+|\s{2,}/).map((p) => p.trim()).filter(Boolean);

    if (parts.length >= 2 && parts.length <= 6 && (!trimmed.endsWith(".") || parts.length >= 3)) {
      tableBuffer.push(parts);
    } else {
      flushTable();
      outputLines.push(line);
    }
  }
  flushTable();
  formatted = outputLines.join("\n");

  return formatted;
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(url, key);

async function fixExistingBlogs() {
  console.log("=== Checking Supabase blogs for space/tab tables ===");
  const { data: blogs, error } = await supabase.from("blogs").select("*");

  if (error || !blogs) {
    console.error("Fetch error:", error);
    return;
  }

  for (const blog of blogs) {
    let content = blog.content || {};
    let changed = false;

    if (content.introduction) {
      const formattedIntro = formatBlogContent(content.introduction);
      if (formattedIntro !== content.introduction) {
        content.introduction = formattedIntro;
        changed = true;
      }
    }

    if (Array.isArray(content.sections)) {
      content.sections = content.sections.map((sec) => {
        const formattedSec = formatBlogContent(sec.content);
        if (formattedSec !== sec.content) {
          changed = true;
          return { ...sec, content: formattedSec };
        }
        return sec;
      });
    }

    if (content.conclusion) {
      const formattedConclusion = formatBlogContent(content.conclusion);
      if (formattedConclusion !== content.conclusion) {
        content.conclusion = formattedConclusion;
        changed = true;
      }
    }

    if (changed) {
      const { error: updateErr } = await supabase
        .from("blogs")
        .update({ content })
        .eq("slug", blog.slug);

      if (updateErr) {
        console.error(`Update error for ${blog.slug}:`, updateErr.message);
      } else {
        console.log(`✅ Formatted and converted space-tables for: "${blog.title}" (${blog.slug})`);
      }
    } else {
      console.log(`ℹ️ "${blog.title}" already clean.`);
    }
  }

  console.log("Done updating blogs.");
}

fixExistingBlogs();
