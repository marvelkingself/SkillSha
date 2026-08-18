/**
 * Robust JSON parser & repair utility for LLM structured outputs.
 * Handles markdown code block stripping, trailing commas, truncated strings,
 * unclosed objects/arrays, and partial JSON extraction.
 */
export function safeParseJSON<T>(raw: string): T {
  if (!raw || typeof raw !== "string") {
    throw new Error("Empty or non-string response received from AI model.");
  }

  let str = raw.trim();

  // 1. Strip markdown code fences
  if (str.startsWith("```json")) {
    str = str.substring(7);
  } else if (str.startsWith("```")) {
    str = str.substring(3);
  }
  if (str.endsWith("```")) {
    str = str.substring(0, str.length - 3);
  }
  str = str.trim();

  // 2. Try standard JSON parse first
  try {
    return JSON.parse(str) as T;
  } catch (initialErr) {
    // Continue to repair attempts
  }

  // 3. Attempt repair for truncated JSON outputs (e.g. unterminated strings or arrays)
  let repaired = repairTruncatedJSON(str);
  try {
    return JSON.parse(repaired) as T;
  } catch (repairErr) {
    // 4. Try extracting valid JSON array or object substring using regex
    const extracted = extractJSONSubstring(str);
    if (extracted) {
      try {
        return JSON.parse(extracted) as T;
      } catch (extractErr) {
        // Fallback repair on extracted substring
        try {
          return JSON.parse(repairTruncatedJSON(extracted)) as T;
        } catch (e) {
          // Ignore
        }
      }
    }

    const snippetStart = str.substring(0, 150);
    const snippetEnd = str.substring(Math.max(0, str.length - 150));
    throw new Error(
      `JSON Parse Failure (Length: ${str.length} chars).\nStart: "${snippetStart}"...\nEnd: ..."${snippetEnd}"`
    );
  }
}

/**
 * Attempts to repair truncated JSON strings by closing unclosed quotes, brackets, and braces.
 */
function repairTruncatedJSON(str: string): string {
  let s = str.trim();

  // Remove trailing commas before brackets/braces
  s = s.replace(/,\s*([\}\]])/g, "$1");

  let inString = false;
  let escapeNext = false;
  const stack: string[] = [];

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (char === "\\") {
      escapeNext = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (!inString) {
      if (char === "{" || char === "[") {
        stack.push(char);
      } else if (char === "}" && stack[stack.length - 1] === "{") {
        stack.pop();
      } else if (char === "]" && stack[stack.length - 1] === "[") {
        stack.pop();
      }
    }
  }

  // If inside a string at the end of truncation, close the quote
  if (inString) {
    s += '"';
  }

  // Remove any trailing dangling comma at the end
  s = s.replace(/,\s*$/, "");

  // Close unclosed braces/brackets in reverse order
  while (stack.length > 0) {
    const last = stack.pop();
    if (last === "{") s += "}";
    if (last === "[") s += "]";
  }

  return s;
}

/**
 * Extracts a complete or maximum valid JSON object/array substring.
 */
function extractJSONSubstring(str: string): string | null {
  const firstBracket = str.indexOf("[");
  const firstBrace = str.indexOf("{");

  if (firstBracket === -1 && firstBrace === -1) return null;

  let startIdx = 0;
  if (firstBracket !== -1 && (firstBrace === -1 || firstBracket < firstBrace)) {
    startIdx = firstBracket;
    const lastBracket = str.lastIndexOf("]");
    if (lastBracket > startIdx) {
      return str.substring(startIdx, lastBracket + 1);
    }
  } else if (firstBrace !== -1) {
    startIdx = firstBrace;
    const lastBrace = str.lastIndexOf("}");
    if (lastBrace > startIdx) {
      return str.substring(startIdx, lastBrace + 1);
    }
  }

  return null;
}
