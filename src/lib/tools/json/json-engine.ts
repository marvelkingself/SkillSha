export interface JsonValidationResult {
  isValid: boolean;
  error?: {
    message: string;
    line?: number;
    column?: number;
  };
  parsed?: any;
}

export interface JsonStats {
  sizeBytes: number;
  lines: number;
  characters: number;
  keyCount: number;
  maxDepth: number;
}

export function validateJson(raw: string): JsonValidationResult {
  if (!raw.trim()) {
    return { isValid: false, error: { message: 'Input is empty.' } };
  }

  try {
    const parsed = JSON.parse(raw);
    return { isValid: true, parsed };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Invalid JSON syntax.';

    // Extract line and column if available from message (e.g. "at position 42 (line 3 column 5)")
    let line: number | undefined;
    let column: number | undefined;

    const lineColMatch = msg.match(/line\s+(\d+)\s+column\s+(\d+)/i);
    if (lineColMatch) {
      line = parseInt(lineColMatch[1], 10);
      column = parseInt(lineColMatch[2], 10);
    } else {
      const posMatch = msg.match(/position\s+(\d+)/i);
      if (posMatch) {
        const pos = parseInt(posMatch[1], 10);
        const upToPos = raw.substring(0, pos);
        const lines = upToPos.split('\n');
        line = lines.length;
        column = lines[lines.length - 1].length + 1;
      }
    }

    return {
      isValid: false,
      error: {
        message: msg,
        line,
        column,
      },
    };
  }
}

export function beautifyJson(raw: string, indent: 2 | 4 | 'tab' = 2): string {
  const val = validateJson(raw);
  if (!val.isValid || val.parsed === undefined) {
    throw new Error(val.error?.message || 'Cannot beautify invalid JSON.');
  }

  const space = indent === 'tab' ? '\t' : indent;
  return JSON.stringify(val.parsed, null, space);
}

export function minifyJson(raw: string): string {
  const val = validateJson(raw);
  if (!val.isValid || val.parsed === undefined) {
    throw new Error(val.error?.message || 'Cannot minify invalid JSON.');
  }

  return JSON.stringify(val.parsed);
}

export function sortJsonKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(sortJsonKeys);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj)
      .sort((a, b) => a.localeCompare(b))
      .reduce((acc: any, key: string) => {
        acc[key] = sortJsonKeys(obj[key]);
        return acc;
      }, {});
  }
  return obj;
}

export function repairJsonString(raw: string): string {
  let cleaned = raw;

  // 1. Remove single-line comments // ...
  cleaned = cleaned.replace(/\/\/[^\n\r]*/g, '');

  // 2. Remove multi-line comments /* ... */
  cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');

  // 3. Remove trailing commas in objects: , } -> }
  cleaned = cleaned.replace(/,(\s*})/g, '$1');

  // 4. Remove trailing commas in arrays: , ] -> ]
  cleaned = cleaned.replace(/,(\s*\])/g, '$1');

  // 5. Replace single quotes around keys or strings with double quotes
  // Simple heuristic for unquoted or single quoted keys
  cleaned = cleaned.replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, '"$1"');

  // 6. Wrap unquoted keys: { key: "value" } -> { "key": "value" }
  cleaned = cleaned.replace(/([{,]\s*)([a-zA-Z0-9_$]+)\s*:/g, '$1"$2":');

  return cleaned;
}

export function calculateJsonStats(raw: string, parsed?: any): JsonStats {
  const lines = raw ? raw.split('\n').length : 0;
  const characters = raw.length;
  const sizeBytes = new TextEncoder().encode(raw).length;

  let keyCount = 0;
  let maxDepth = 0;

  function traverse(node: any, depth: number) {
    if (depth > maxDepth) maxDepth = depth;
    if (Array.isArray(node)) {
      for (const item of node) {
        traverse(item, depth + 1);
      }
    } else if (node !== null && typeof node === 'object') {
      const keys = Object.keys(node);
      keyCount += keys.length;
      for (const k of keys) {
        traverse(node[k], depth + 1);
      }
    }
  }

  if (parsed !== undefined) {
    traverse(parsed, 1);
  }

  return {
    sizeBytes,
    lines,
    characters,
    keyCount,
    maxDepth,
  };
}
