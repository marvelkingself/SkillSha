export interface JsonFaq {
  question: string;
  answer: string;
}

export const JSON_FAQS: JsonFaq[] = [
  {
    question: 'Is my JSON data sent to any external server or saved in a database?',
    answer:
      'No. The Skillsha JSON Formatter & Validator operates 100% locally in your browser. Sensitive payloads, API responses, user tokens, and proprietary schemas are parsed entirely in memory and never leave your device.',
  },
  {
    question: 'How does the Auto-Repair JSON feature work?',
    answer:
      'The Auto-Repair utility inspects your input for common syntax mistakes that break standard RFC 8259 JSON parsers. It automatically strips trailing commas before closing brackets or braces, removes JavaScript-style single-line (//) and multi-line (/* */) comments, converts single quotes to double quotes, and wraps unquoted keys.',
  },
  {
    question: 'What is the difference between Beautify and Minify?',
    answer:
      'Beautify formats compressed JSON into a clean, human-readable structure with standardized indentation (2 spaces, 4 spaces, or Tabs). Minify strips all unnecessary whitespaces and line breaks, producing the smallest possible byte payload for high-performance API transmissions and web storage.',
  },
  {
    question: 'Can I format large JSON files?',
    answer:
      'Yes! Because processing executes directly in your browser using high-performance native V8 JavaScript parsing engines, it can handle multi-megabyte JSON payloads and API responses instantly without hitting cloud timeout restrictions.',
  },
  {
    question: 'Why does JSON strictly forbid trailing commas and single quotes?',
    answer:
      'Standard JSON (RFC 8259) is a strict data-interchange specification designed for cross-language compatibility (Python, Go, Java, C++, Rust). Unlike JavaScript object literals, JSON requires double quotes around keys and strings and rejects trailing commas to maintain absolute cross-platform consistency.',
  },
  {
    question: 'Can I download the formatted or minified JSON file?',
    answer:
      'Yes. You can copy the result directly to your clipboard with one click, or click "Download JSON" to save the file locally as formatted.json.',
  },
  {
    question: 'What is the Interactive Tree View?',
    answer:
      'The Tree View visualizes complex nested JSON structures hierarchically. You can expand and collapse individual objects or arrays, inspect data types (string, number, boolean, null), and navigate massive datasets effortlessly.',
  },
];
