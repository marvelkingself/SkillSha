// Tiny dependency-free syntax highlighter. Renders into a <pre> sitting
// behind the textarea; both share font/line-height so caret and tokens align.

const NUM = String.raw`\b(?:0[xX][0-9a-fA-F]+|\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?[fFlLdD]?)\b`;
const PUN = String.raw`[{}()\[\];,.<>+\-*/%=!&|?:~^]`;
const FN = String.raw`\b[A-Za-z_$][\w$]*(?=\s*\()`;

const kw = (words: string[]) => String.raw`\b(?:${words.join("|")})\b`;

type Spec = { comment: string; string: string; meta: string | null; keyword: string; type: string };

const SPECS: Record<string, Spec> = {
  python: {
    comment: String.raw`#[^\n]*`,
    string: String.raw`"""[\s\S]*?"""|'''[\s\S]*?'''|(?:[rRbBfFuU]{0,2})"(?:\\.|[^"\\\n])*"|(?:[rRbBfFuU]{0,2})'(?:\\.|[^'\\\n])*'`,
    meta: String.raw`@[A-Za-z_]\w*`,
    keyword: kw(["def", "class", "return", "if", "elif", "else", "for", "while", "in", "not", "and", "or", "is", "None", "True", "False", "import", "from", "as", "with", "try", "except", "finally", "raise", "lambda", "pass", "break", "continue", "global", "nonlocal", "yield", "assert", "del", "async", "await", "match", "case"]),
    type: kw(["print", "len", "range", "int", "str", "float", "list", "dict", "set", "tuple", "bool", "input", "enumerate", "zip", "map", "filter", "sum", "min", "max", "abs", "sorted", "reversed", "self", "open", "type", "round"]),
  },

  javascript: {
    comment: String.raw`//[^\n]*|/\*[\s\S]*?\*/`,
    string: "`(?:\\\\.|[^`\\\\])*`" + String.raw`|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'`,
    meta: null,
    keyword: kw(["const", "let", "var", "function", "return", "if", "else", "for", "while", "do", "class", "new", "extends", "super", "this", "typeof", "instanceof", "of", "in", "try", "catch", "finally", "throw", "switch", "case", "break", "continue", "default", "export", "import", "from", "async", "await", "yield", "delete", "void", "null", "undefined", "true", "false", "static", "get", "set"]),
    type: kw(["console", "Math", "JSON", "Object", "Array", "String", "Number", "Boolean", "Promise", "Map", "Set", "Date", "RegExp", "Error", "require", "module", "process"]),
  },

  java: {
    comment: String.raw`//[^\n]*|/\*[\s\S]*?\*/`,
    string: String.raw`"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'`,
    meta: String.raw`@[A-Za-z_]\w*`,
    keyword: kw(["public", "private", "protected", "static", "final", "class", "interface", "extends", "implements", "new", "return", "if", "else", "for", "while", "do", "switch", "case", "break", "continue", "default", "try", "catch", "finally", "throw", "throws", "import", "package", "this", "super", "null", "true", "false", "void", "abstract", "synchronized", "volatile", "transient", "native", "enum", "instanceof", "record", "var"]),
    type: kw(["int", "long", "double", "float", "char", "boolean", "byte", "short", "String", "System", "Math", "Integer", "Double", "Long", "Character", "Boolean", "Object", "List", "ArrayList", "Map", "HashMap", "Set", "HashSet", "Arrays", "Scanner", "StringBuilder", "Exception"]),
  },

  cpp: {
    comment: String.raw`//[^\n]*|/\*[\s\S]*?\*/`,
    string: String.raw`<[A-Za-z][\w./+]*>(?=[ \t]*(?:\n|$|//))|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'`,
    meta: String.raw`#\s*\w+`,
    keyword: kw(["int", "long", "double", "float", "char", "bool", "void", "auto", "const", "static", "struct", "class", "public", "private", "protected", "return", "if", "else", "for", "while", "do", "switch", "case", "break", "continue", "new", "delete", "using", "namespace", "template", "typename", "try", "catch", "throw", "true", "false", "nullptr", "sizeof", "inline", "virtual", "override", "friend", "enum", "union", "typedef", "constexpr", "unsigned", "signed", "short"]),
    type: kw(["std", "cout", "cin", "cerr", "endl", "string", "vector", "map", "unordered_map", "set", "pair", "queue", "stack", "size_t", "swap", "sort", "printf", "scanf"]),
  },
};

const CACHE = new Map<string, { re: RegExp; names: string[] }>();

function compile(langId: string) {
  const cached = CACHE.get(langId);
  if (cached) return cached;
  const s = SPECS[langId] || SPECS.javascript;

  const parts = (
    [
      ["com", s.comment],
      ["meta", s.meta],
      ["str", s.string],
      ["num", NUM],
      ["kw", s.keyword],
      ["typ", s.type],
      ["fn", FN],
      ["pun", PUN],
    ] as [string, string | null][]
  ).filter((p): p is [string, string] => !!p[1]);

  const re = new RegExp(parts.map(([, src]) => `(${src})`).join("|"), "g");
  const names = parts.map(([n]) => n);
  const compiled = { re, names };
  CACHE.set(langId, compiled);
  return compiled;
}

const esc = (str: string) =>
  str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function highlight(code: string, langId: string): string {
  const { re, names } = compile(langId);
  re.lastIndex = 0;

  let html = "";
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(code)) !== null) {
    if (m.index > last) html += esc(code.slice(last, m.index));

    let kind = "pun";
    for (let i = 1; i < m.length; i++) {
      if (m[i] !== undefined) { kind = names[i - 1]; break; }
    }
    html += `<span class="tk-${kind}">${esc(m[0])}</span>`;
    last = m.index + m[0].length;

    if (m[0].length === 0) re.lastIndex++;
  }

  html += esc(code.slice(last));
  return html + "\n";
}

export default highlight;
