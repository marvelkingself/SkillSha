'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import {
  validateJson,
  beautifyJson,
  minifyJson,
  sortJsonKeys,
  repairJsonString,
  calculateJsonStats,
  JsonStats,
} from '@/lib/tools/json/json-engine';
import {
  Code,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Download,
  Upload,
  Sparkles,
  Wrench,
  ArrowDownAZ,
  Minimize2,
  Maximize2,
  Trash2,
  FolderTree,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';

const SAMPLE_JSON = `{
  "institute": "Skillsha",
  "tagline": "Empowering Next-Gen Tech Talent",
  "established": 2024,
  "isAccredited": true,
  "popularCourses": [
    {
      "id": "da-01",
      "title": "Data Analytics with Gen AI",
      "durationWeeks": 16,
      "technologies": ["Python", "SQL", "Power BI", "Generative AI"],
      "liveBatches": true
    },
    {
      "id": "fs-02",
      "title": "Full Stack Web Development",
      "durationWeeks": 24,
      "technologies": ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
      "liveBatches": true
    }
  ],
  "contact": {
    "email": "contact@skillsha.com",
    "website": "https://skillsha.com",
    "locations": ["Pune", "Bengaluru", "Hyderabad", "Noida"]
  }
}`;

// Recursive Tree Node Component
function TreeNode({ label, value, isLast }: { label?: string; value: any; isLast?: boolean }) {
  const [isOpen, setIsOpen] = useState(true);

  const isObject = value !== null && typeof value === 'object' && !Array.isArray(value);
  const isArray = Array.isArray(value);
  const isExpandable = isObject || isArray;

  const type = isArray
    ? 'array'
    : value === null
    ? 'null'
    : typeof value;

  const count = isArray ? value.length : isObject ? Object.keys(value).length : 0;

  return (
    <div className="font-mono text-xs leading-relaxed pl-4 border-l border-slate-200 dark:border-white/10 select-text">
      <div className="flex items-center gap-1.5 py-0.5 hover:bg-slate-50 dark:hover:bg-zinc-800/60 rounded px-1 group">
        {isExpandable ? (
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-0.5 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
          >
            {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        ) : (
          <span className="w-3.5" />
        )}

        {label !== undefined && (
          <span className="text-purple-600 dark:text-purple-400 font-bold">&quot;{label}&quot;: </span>
        )}

        {isExpandable ? (
          <span
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer text-slate-500 font-semibold"
          >
            {isArray ? `Array[${count}]` : `Object{${count}}`}
          </span>
        ) : (
          <span>
            {type === 'string' && <span className="text-emerald-600 dark:text-emerald-400">&quot;{String(value)}&quot;</span>}
            {type === 'number' && <span className="text-blue-600 dark:text-blue-400 font-bold">{String(value)}</span>}
            {type === 'boolean' && (
              <span className="text-amber-600 dark:text-amber-400 font-bold">{String(value)}</span>
            )}
            {type === 'null' && <span className="text-slate-400 italic">null</span>}
          </span>
        )}
      </div>

      {isExpandable && isOpen && (
        <div className="space-y-0.5">
          {isArray
            ? value.map((item: any, idx: number) => (
                <TreeNode key={idx} label={String(idx)} value={item} isLast={idx === value.length - 1} />
              ))
            : Object.entries(value).map(([k, v], idx, arr) => (
                <TreeNode key={k} label={k} value={v} isLast={idx === arr.length - 1} />
              ))}
        </div>
      )}
    </div>
  );
}

export default function JsonClient() {
  const [input, setInput] = useState<string>(SAMPLE_JSON);
  const [indent, setIndent] = useState<2 | 4 | 'tab'>(2);
  const [viewMode, setViewMode] = useState<'editor' | 'tree'>('editor');
  const [copied, setCopied] = useState(false);
  const [repairMsg, setRepairMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Real-time validation
  const validation = useMemo(() => validateJson(input), [input]);

  // Real-time stats
  const stats: JsonStats = useMemo(() => {
    return calculateJsonStats(input, validation.parsed);
  }, [input, validation.parsed]);

  // Actions
  const handleBeautify = () => {
    try {
      const formatted = beautifyJson(input, indent);
      setInput(formatted);
      setRepairMsg(null);
    } catch {
      // try to repair first then beautify
      try {
        const repaired = repairJsonString(input);
        const formatted = beautifyJson(repaired, indent);
        setInput(formatted);
        setRepairMsg('Auto-repaired syntax and formatted!');
        setTimeout(() => setRepairMsg(null), 3000);
      } catch {
        // error
      }
    }
  };

  const handleMinify = () => {
    try {
      const minified = minifyJson(input);
      setInput(minified);
      setRepairMsg(null);
    } catch {
      // ignore
    }
  };

  const handleSortKeys = () => {
    try {
      if (validation.isValid && validation.parsed) {
        const sorted = sortJsonKeys(validation.parsed);
        const space = indent === 'tab' ? '\t' : indent;
        setInput(JSON.stringify(sorted, null, space));
      }
    } catch {
      // ignore
    }
  };

  const handleRepair = () => {
    const repaired = repairJsonString(input);
    const testVal = validateJson(repaired);
    if (testVal.isValid) {
      const space = indent === 'tab' ? '\t' : indent;
      setInput(JSON.stringify(testVal.parsed, null, space));
      setRepairMsg('Syntax errors successfully repaired!');
    } else {
      setInput(repaired);
      setRepairMsg('Cleaned common mistakes. Review remaining syntax error.');
    }
    setTimeout(() => setRepairMsg(null), 3000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    const blob = new Blob([input], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'skillsha-formatted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const content = ev.target?.result as string;
        setInput(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Toolbar */}
      <div className="p-3 sm:p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-sm flex flex-wrap items-center justify-between gap-3">
        {/* Left: Main Formatting Operations */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Beautify Button */}
          <button
            type="button"
            onClick={handleBeautify}
            className="py-2 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Beautify</span>
          </button>

          {/* Indent Selector */}
          <select
            value={indent}
            onChange={(e) => setIndent((e.target.value === 'tab' ? 'tab' : parseInt(e.target.value, 10)) as any)}
            className="py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-800 text-xs text-slate-800 dark:text-zinc-200"
          >
            <option value={2}>2 Spaces</option>
            <option value={4}>4 Spaces</option>
            <option value="tab">Tab</option>
          </select>

          {/* Minify */}
          <button
            type="button"
            onClick={handleMinify}
            className="py-2 px-3.5 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Minify</span>
          </button>

          {/* Auto-Repair */}
          <button
            type="button"
            onClick={handleRepair}
            className="py-2 px-3.5 rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50/50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 hover:bg-amber-100 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Auto-Repair</span>
          </button>

          {/* Sort Keys */}
          <button
            type="button"
            onClick={handleSortKeys}
            className="py-2 px-3 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
          >
            <ArrowDownAZ className="w-3.5 h-3.5" />
            <span>Sort Keys</span>
          </button>
        </div>

        {/* Right: View & Export Operations */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Toggle */}
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-zinc-800 flex gap-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setViewMode('editor')}
              className={`py-1.5 px-3 rounded-lg cursor-pointer ${
                viewMode === 'editor'
                  ? 'bg-white dark:bg-zinc-900 text-blue-600 shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400'
              }`}
            >
              Raw Editor
            </button>
            <button
              type="button"
              disabled={!validation.isValid}
              onClick={() => setViewMode('tree')}
              className={`py-1.5 px-3 rounded-lg cursor-pointer flex items-center gap-1 disabled:opacity-40 ${
                viewMode === 'tree'
                  ? 'bg-white dark:bg-zinc-900 text-blue-600 shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400'
              }`}
            >
              <FolderTree className="w-3 h-3" />
              <span>Tree View</span>
            </button>
          </div>

          {/* Copy */}
          <button
            type="button"
            onClick={handleCopy}
            className="py-2 px-3 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Download */}
          <button
            type="button"
            onClick={handleDownload}
            className="py-2 px-3 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download</span>
          </button>

          {/* Upload file hidden input */}
          <label className="py-2 px-3 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span>Upload</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json,text/plain"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Clear */}
          <button
            type="button"
            onClick={() => setInput('')}
            className="p-2 rounded-xl text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Repair Notice Alert */}
      {repairMsg && (
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <Sparkles className="w-4 h-4" />
          <span>{repairMsg}</span>
        </div>
      )}

      {/* Validation Status Indicator Banner */}
      <div
        className={`p-4 rounded-2xl border flex items-center justify-between text-xs sm:text-sm font-semibold transition-colors ${
          validation.isValid
            ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300'
            : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/40 text-red-800 dark:text-red-300'
        }`}
      >
        <div className="flex items-center gap-2">
          {validation.isValid ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Valid JSON (RFC 8259 Standard)</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span>
                {validation.error?.message}{' '}
                {validation.error?.line && (
                  <span className="font-mono text-xs underline">
                    (Line {validation.error.line}, Col {validation.error.column})
                  </span>
                )}
              </span>
            </>
          )}
        </div>

        {/* Quick Sample Button if empty */}
        {!input.trim() && (
          <button
            type="button"
            onClick={() => setInput(SAMPLE_JSON)}
            className="text-xs text-blue-600 dark:text-blue-400 underline font-bold cursor-pointer"
          >
            Load Sample JSON
          </button>
        )}
      </div>

      {/* Main Workspace (Editor / Tree View) */}
      <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
        {viewMode === 'editor' ? (
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste or type raw JSON here..."
              rows={18}
              spellCheck={false}
              className="w-full p-6 font-mono text-xs sm:text-sm leading-relaxed bg-slate-950 text-slate-200 border-none outline-none resize-y selection:bg-blue-600"
            />
          </div>
        ) : (
          <div className="p-6 max-h-[500px] overflow-y-auto bg-slate-50 dark:bg-zinc-950">
            {validation.isValid && validation.parsed !== undefined ? (
              <TreeNode value={validation.parsed} isLast={true} />
            ) : (
              <p className="text-xs text-slate-400">Tree view requires valid JSON.</p>
            )}
          </div>
        )}

        {/* Bottom Statistics Bar */}
        <div className="p-4 bg-slate-100 dark:bg-zinc-950 border-t border-slate-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-600 dark:text-zinc-400">
          <div className="flex items-center gap-4">
            <span>
              Size: <strong className="text-slate-900 dark:text-white font-bold">{stats.sizeBytes} B</strong>
            </span>
            <span>
              Lines: <strong className="text-slate-900 dark:text-white font-bold">{stats.lines}</strong>
            </span>
            <span>
              Characters: <strong className="text-slate-900 dark:text-white font-bold">{stats.characters}</strong>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span>
              Keys: <strong className="text-purple-600 dark:text-purple-400 font-bold">{stats.keyCount}</strong>
            </span>
            <span>
              Max Depth: <strong className="text-blue-600 dark:text-blue-400 font-bold">{stats.maxDepth}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
