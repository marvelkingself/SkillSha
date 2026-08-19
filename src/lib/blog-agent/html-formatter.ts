/**
 * Utility to parse and format blog HTML & Markdown.
 * Converts Pipe tables, Tab/Space tables, bold tags, links, and lists into responsive styled HTML elements.
 */

function renderHTMLTable(headers: string[], rows: string[][]): string {
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

export function formatBlogContent(content: string): string {
  if (!content) return "";

  let formatted = content;

  // 1. Convert Pipe Markdown tables (| Col 1 | Col 2 |) to HTML tables
  const pipeTableRegex = /((?:^[ \t]*\|[^\n]+\|[ \t]*(?:\r?\n|$))+)/gm;
  formatted = formatted.replace(pipeTableRegex, (tableBlock) => {
    const lines = tableBlock
      .trim()
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    if (lines.length < 2) return tableBlock;

    let headers: string[] = [];
    const rows: string[][] = [];

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

  // 2. Convert Space/Tab-delimited plain text tables (where lines have 2-5 columns separated by 2+ spaces or \t)
  const lines = formatted.split(/\r?\n/);
  const outputLines: string[] = [];
  let tableBuffer: string[][] = [];

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

    // Split line by tab or 2+ consecutive spaces
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

  // 3. Convert Markdown bold **text** to <strong>text</strong>
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // 4. Convert Markdown links [text](url) to HTML <a>
  formatted = formatted.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-blue-500 hover:text-blue-400 font-semibold underline underline-offset-4 decoration-blue-500/30 hover:decoration-blue-500 transition-colors">$1</a>'
  );

  // 5. Enhance any existing raw <table> elements with proper Tailwind classes
  formatted = formatted.replace(/<table(?![^>]*class=)/g, '<table class="w-full border-collapse my-6 text-left rounded-2xl overflow-hidden border border-zinc-200/30 dark:border-white/10"');
  formatted = formatted.replace(/<th(?![^>]*class=)/g, '<th class="p-3.5 bg-blue-500/10 text-blue-400 font-bold border border-zinc-200/20 dark:border-white/10 text-xs uppercase tracking-wider"');
  formatted = formatted.replace(/<td(?![^>]*class=)/g, '<td class="p-3.5 border border-zinc-200/20 dark:border-white/10 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium"');

  return formatted;
}
