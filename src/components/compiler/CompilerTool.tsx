"use client";

import { useState, useRef, useEffect, useLayoutEffect, useMemo, useCallback } from "react";
import {
  Play, Square, Loader2, Maximize2, Minimize2, Moon, Sun,
  Copy, Check, Trash2, CheckCircle2, XCircle, Clock,
} from "lucide-react";

import { LANGUAGES, LANG_LIST, fileNameFor, commandFor, type LanguageId } from "./languages";
import { highlight } from "./highlight";
import { runCode, type RunResult } from "./api";

type Status = "idle" | "running" | "success" | "error";

function caretFrom(value: string, pos: number) {
  const upto = value.slice(0, pos).split("\n");
  return { line: upto.length, col: upto[upto.length - 1].length + 1 };
}

export default function CompilerTool({ defaultLanguage = "python" as LanguageId, defaultDark = false }) {
  // Language switches via state only — this tool lives at a single route
  // (/tools/compiler), no per-language URLs.
  const [language, setLanguage] = useState<LanguageId>(defaultLanguage);
  const lang = LANGUAGES[language];

  const [code, setCode] = useState(lang.starter);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<Partial<RunResult> | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [dark, setDark] = useState(defaultDark);
  const [full, setFull] = useState(false);
  const [copied, setCopied] = useState(false);
  const [caret, setCaret] = useState({ line: 1, col: 1 });
  const [split, setSplit] = useState(52);

  const rootRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const outEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const abortRef = useRef<AbortController | null>(null);
  const caretJump = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (caretJump.current == null || !areaRef.current) return;
    const pos = caretJump.current;
    caretJump.current = null;
    areaRef.current.selectionStart = areaRef.current.selectionEnd = pos;
  });

  const fileName = useMemo(() => fileNameFor(language, code), [language, code]);
  const command = useMemo(() => commandFor(language, code), [language, code]);
  const marked = useMemo(() => highlight(code, language), [code, language]);
  const lines = useMemo(() => code.split("\n").length, [code]);

  useEffect(() => {
    setCode(lang.starter);
    setStatus("idle");
    setResult(null);
    setElapsed(0);
    setCaret({ line: 1, col: 1 });
  }, [lang]);

  useEffect(() => {
    if (status === "running") {
      const t0 = Date.now();
      timerRef.current = setInterval(() => setElapsed(Date.now() - t0), 90);
    } else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [status]);

  useEffect(() => {
    outEndRef.current?.scrollIntoView({ block: "nearest" });
  }, [result, status]);

  useEffect(() => {
    const onFs = () => setFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const run = useCallback(async () => {
    if (status === "running") return;
    setStatus("running");
    setResult(null);
    setElapsed(0);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const data = await runCode({ language, code, signal: controller.signal });
      const failed =
        !data.httpOk ||
        data.status === "error" ||
        (typeof data.exitCode === "number" && data.exitCode !== 0) ||
        (!data.stdout && !!data.stderr);

      setResult(data);
      setStatus(failed ? "error" : "success");
    } catch (err: any) {
      if (err.name === "AbortError") {
        setStatus("idle");
        setResult({ stderr: "Run cancel kar diya." });
        return;
      }
      setStatus("error");
      setResult({
        stderr:
          err.message === "Failed to fetch"
            ? "Compiler service tak nahi pahunche. Server chal raha hai?"
            : err.message,
      });
    } finally {
      abortRef.current = null;
    }
  }, [language, code, status]);

  const syncScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const { scrollTop, scrollLeft } = e.currentTarget;
    if (preRef.current) {
      preRef.current.scrollTop = scrollTop;
      preRef.current.scrollLeft = scrollLeft;
    }
    if (gutterRef.current) gutterRef.current.scrollTop = scrollTop;
  };

  const updateCaret = (e: React.SyntheticEvent<HTMLTextAreaElement>) =>
    setCaret(caretFrom(e.currentTarget.value, e.currentTarget.selectionStart));

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      run();
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const el = e.currentTarget;
      const { selectionStart: s, selectionEnd: en } = el;
      const pad = "    ";
      setCode(code.slice(0, s) + pad + code.slice(en));
      caretJump.current = s + pad.length;
      return;
    }
    const el = e.currentTarget;
    const p = el.selectionStart;
    const collapsed = p === el.selectionEnd;

    if (e.key === "Enter" && collapsed) {
      const lineStart = code.lastIndexOf("\n", p - 1) + 1;
      const before = code.slice(lineStart, p);
      const indent = (before.match(/^[ \t]*/) || [""])[0];
      const deeper = /[{([:]\s*$/.test(before) ? "    " : "";
      const closes = /^\s*[}\])]/.test(code.slice(p));

      e.preventDefault();
      const insert = deeper && closes
        ? `\n${indent}${deeper}\n${indent}`
        : `\n${indent}${deeper}`;
      setCode(code.slice(0, p) + insert + code.slice(p));
      caretJump.current = p + 1 + indent.length + deeper.length;
      return;
    }

    if (collapsed && ")]}\"'".includes(e.key) && code[p] === e.key) {
      e.preventDefault();
      el.selectionStart = el.selectionEnd = p + 1;
      setCaret(caretFrom(code, p + 1));
      return;
    }

    const pairs: Record<string, string> = { "(": ")", "[": "]", "{": "}", '"': '"', "'": "'" };
    if (pairs[e.key] && collapsed && !/[\w"']/.test(code[p] || "")) {
      e.preventDefault();
      setCode(code.slice(0, p) + e.key + pairs[e.key] + code.slice(p));
      caretJump.current = p + 1;
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard blocked */ }
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else rootRef.current?.requestFullscreen?.();
  };

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const move = (ev: MouseEvent | TouchEvent) => {
      const rect = splitRef.current!.getBoundingClientRect();
      const clientX = "touches" in ev ? ev.touches[0].clientX : ev.clientX;
      const x = clientX - rect.left;
      setSplit(Math.min(78, Math.max(24, (x / rect.width) * 100)));
    };
    const stop = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", stop);
      document.body.style.userSelect = "";
    };
    document.body.style.userSelect = "none";
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", stop);
  };

  const finished = status === "success" || status === "error";

  return (
    <div ref={rootRef} className={`ucx${dark ? " dark" : ""}`}>
      <style>{CSS}</style>

      {/* ── language rail — buttons that flip state, no navigation ──── */}
      <nav className="rail" aria-label="Compiler languages">
        {LANG_LIST.map((l) => {
          const on = l.id === language;
          return (
            <button
              key={l.id}
              type="button"
              className={`railbtn${on ? " on" : ""}`}
              style={on ? { background: l.color } : { color: l.color }}
              title={`${l.name} Compiler`}
              aria-label={`${l.name} Compiler`}
              aria-current={on ? "page" : undefined}
              onClick={() => setLanguage(l.id)}
            >
              {l.badge}
              <span className="tip">{l.name}</span>
            </button>
          );
        })}
      </nav>

      {/* ── stage ─────────────────────────────────────── */}
      <div className="stage">
        <div className="split" ref={splitRef}>

          {/* editor */}
          <section className="pane" style={{ flexBasis: `${split}%` }}>
            <header className="bar">
              <span className="fname" title="Naam code se automatic banta hai">
                {fileName}
              </span>

              <div className="tools">
                <button className="icon" onClick={toggleFullscreen} title="Fullscreen">
                  {full ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                </button>
                <button className="icon" onClick={() => setDark(!dark)} title={dark ? "Light theme" : "Dark theme"}>
                  {dark ? <Sun size={15} /> : <Moon size={15} />}
                </button>
                <button className="icon wide" onClick={copyCode} title="Code copy karo">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>

                {status === "running" ? (
                  <button className="run stop" onClick={() => abortRef.current?.abort()}>
                    <Square size={12} fill="currentColor" /> Stop
                  </button>
                ) : (
                  <button className="run" onClick={run} title="Ctrl / ⌘ + Enter">
                    <Play size={13} fill="currentColor" /> Run
                  </button>
                )}
              </div>
            </header>

            <div className="editor">
              <div className="gutter" ref={gutterRef} aria-hidden="true">
                {Array.from({ length: lines }, (_, i) => (
                  <div key={i} className={i + 1 === caret.line ? "cur" : ""}>{i + 1}</div>
                ))}
              </div>

              <div className="codebox">
                <pre ref={preRef} className="paint" aria-hidden="true"
                     dangerouslySetInnerHTML={{ __html: marked }} />
                <textarea
                  ref={areaRef}
                  value={code}
                  onChange={(e) => { setCode(e.target.value); updateCaret(e); }}
                  onKeyDown={onKeyDown}
                  onKeyUp={updateCaret}
                  onClick={updateCaret}
                  onSelect={updateCaret}
                  onScroll={syncScroll}
                  spellCheck={false}
                  wrap="off"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  aria-label={`${lang.name} code editor`}
                />
              </div>
            </div>
          </section>

          <div className="divider" onMouseDown={startDrag} onTouchStart={startDrag}
               role="separator" aria-orientation="vertical" />

          {/* output */}
          <section className="pane out">
            <header className="bar">
              <span className="otitle">Output</span>
              <div className="tools">
                {status === "running" && (
                  <span className="timer"><Loader2 size={12} className="spin" /> {(elapsed / 1000).toFixed(1)}s</span>
                )}
                <button className="icon wide" onClick={() => { setResult(null); setStatus("idle"); setElapsed(0); }}
                        disabled={!result && status === "idle"}>
                  <Trash2 size={14} /> <span>Clear</span>
                </button>
              </div>
            </header>

            <div className="console">
              <div className="cmd"><span className="dollar">$</span> {command}</div>

              {status === "idle" && !result && (
                <p className="ph">Run dabao — output yahan aayega.</p>
              )}
              {status === "running" && (
                <p className="ph">{lang.compiled ? "Compiling and running" : "Running"}<span className="dots" /></p>
              )}

              {result?.stdout && <pre className="std">{result.stdout}</pre>}
              {result?.stderr && <pre className="std bad">{result.stderr}</pre>}

              {finished && (
                <p className={`verdict ${status === "success" ? "ok" : "bad"}`}>
                  {status === "success"
                    ? "=== Code Execution Successful ==="
                    : "=== Code Exited With Errors ==="}
                </p>
              )}
              <div ref={outEndRef} />
            </div>
          </section>
        </div>

        {/* ── status bar ────────────────────────────────── */}
        <footer className="statusbar">
          <span className="left">
            <span className="dot" style={{ background: lang.color }} />
            {lang.version}
            <span className="sep">·</span>
            {lang.image}
          </span>
          <span className="right">
            {finished && (
              <span className={status === "success" ? "ok" : "bad"}>
                {status === "success" ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
                {status === "success" ? "Exit 0" : "Error"}
              </span>
            )}
            {finished && <span><Clock size={11} /> {(elapsed / 1000).toFixed(2)}s</span>}
            <span>Ln {caret.line}, Col {caret.col}</span>
            <span>{lines} lines</span>
          </span>
        </footer>
      </div>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

.ucx {
  --bg:#FFFFFF; --rail:#F4F5F8; --bar:#FAFBFC; --line:#E4E7EE;
  --text:#1E2430; --muted:#6B7383; --faint:#98A0B0;
  --gutter:#FAFBFC; --gnum:#B4BBC8; --gcur:#5A6172; --curline:#F5F7FA;
  --accent:#FF5417; --accentText:#FFFFFF;
  --ok:#0F9D58; --bad:#E5484D;
  --tk-kw:#0B63CE; --tk-typ:#7A3E9D; --tk-str:#1A7F37; --tk-num:#B25000;
  --tk-com:#8A93A5; --tk-fn:#6F42C1; --tk-meta:#B25000; --tk-pun:#5C6B84;
  --code:13.5px; --lh:22px;
  display:flex; height:100vh; overflow:hidden;
  background:var(--bg); color:var(--text);
  font-family:'Inter',system-ui,-apple-system,sans-serif;
}
.ucx.dark {
  --bg:#0F1319; --rail:#12161D; --bar:#151A22; --line:#242B37;
  --text:#E3E8F0; --muted:#8A93A5;
  --gutter:#12161D; --gnum:#4B5568; --gcur:#A5AEC0; --curline:#161C25;
  --ok:#3FB950; --bad:#FF6B6B;
  --tk-kw:#6FB3FF; --tk-typ:#C792EA; --tk-str:#7EE787; --tk-num:#FFAB70;
  --tk-com:#5F6B80; --tk-fn:#D2A8FF; --tk-meta:#FFAB70; --tk-pun:#8A99B5;
  --faint:#687184;
}
.ucx *, .ucx *::before, .ucx *::after { box-sizing:border-box; }
.ucx button { font:inherit; cursor:pointer; }
.ucx button:focus-visible,
.ucx textarea:focus-visible { outline:2px solid var(--accent); outline-offset:-2px; }

/* rail */
.ucx .rail {
  width:60px; flex:0 0 60px; background:var(--rail); border-right:1px solid var(--line);
  display:flex; flex-direction:column; align-items:center; gap:10px; padding:12px 0;
}
.ucx .railbtn {
  position:relative; display:flex; align-items:center; justify-content:center;
  flex:0 0 auto; width:38px; height:38px; border-radius:10px; border:1px solid var(--line);
  background:var(--bg); font-size:12.5px; font-weight:700; letter-spacing:-.02em;
  font-family:'JetBrains Mono',monospace;
  transition:transform .12s ease, box-shadow .12s ease;
}
.ucx .railbtn:hover { transform:translateY(-1px); box-shadow:0 3px 10px rgba(0,0,0,.10); }
.ucx .railbtn.on { color:#fff !important; border-color:transparent; cursor:default;
                   box-shadow:0 3px 10px rgba(0,0,0,.18); }
.ucx .railbtn.on:hover { transform:none; }
.ucx .tip {
  position:absolute; left:46px; top:50%; transform:translateY(-50%) scale(.96);
  background:#1E2430; color:#fff; font-family:'Inter',sans-serif; font-size:11.5px; font-weight:600;
  padding:4px 9px; border-radius:6px; white-space:nowrap; opacity:0; pointer-events:none;
  transition:opacity .12s ease, transform .12s ease; z-index:20;
}
.ucx .railbtn:hover .tip { opacity:1; transform:translateY(-50%) scale(1); }

/* stage */
.ucx .stage { flex:1; min-width:0; display:flex; flex-direction:column; }
.ucx .split { flex:1; display:flex; min-height:0; }
.ucx .pane { display:flex; flex-direction:column; min-width:0; min-height:0; flex:1 1 0; }
.ucx .pane.out { border-left:1px solid var(--line); background:var(--bg); }

.ucx .bar {
  height:52px; flex:0 0 52px; display:flex; align-items:center; justify-content:space-between;
  gap:12px; padding:0 10px 0 18px; background:var(--bar); border-bottom:1px solid var(--line);
}
.ucx .fname {
  font-size:14.5px; font-weight:600; color:var(--text); white-space:nowrap;
  overflow:hidden; text-overflow:ellipsis;
}
.ucx .otitle { font-size:14.5px; font-weight:600; color:var(--muted); }
.ucx .tools { display:flex; align-items:center; gap:6px; }

.ucx .icon {
  display:inline-flex; align-items:center; gap:6px; height:32px; padding:0 9px;
  border:1px solid transparent; border-radius:8px; background:transparent; color:var(--muted);
  font-size:13px; font-weight:600; transition:background .12s ease, color .12s ease;
}
.ucx .icon:hover:not(:disabled) { background:var(--line); color:var(--text); }
.ucx .icon:disabled { opacity:.4; cursor:not-allowed; }
.ucx .icon.wide { padding:0 11px; }

.ucx .run {
  display:inline-flex; align-items:center; gap:7px; height:34px; padding:0 18px; margin-left:4px;
  border:none; border-radius:8px; background:var(--accent); color:var(--accentText);
  font-size:13.5px; font-weight:700; box-shadow:0 2px 8px rgba(255,84,23,.32);
  transition:filter .12s ease;
}
.ucx .run:hover { filter:brightness(1.07); }
.ucx .run.stop { background:var(--bad); box-shadow:0 2px 8px rgba(229,72,77,.3); }

.ucx .timer {
  display:inline-flex; align-items:center; gap:5px; font-size:12px; font-weight:600;
  color:var(--muted); font-family:'JetBrains Mono',monospace;
}

/* editor */
.ucx .editor { flex:1; display:flex; min-height:0; background:var(--bg); }
.ucx .gutter {
  flex:0 0 auto; min-width:52px; padding:14px 12px 14px 0; text-align:right; overflow:hidden;
  background:var(--gutter); border-right:1px solid var(--line); user-select:none;
  font-family:'JetBrains Mono',monospace; font-size:var(--code); line-height:var(--lh); color:var(--gnum);
}
.ucx .gutter .cur { color:var(--gcur); font-weight:600; }

.ucx .codebox { position:relative; flex:1; min-width:0; }
.ucx .paint, .ucx .codebox textarea {
  position:absolute; inset:0; margin:0; padding:14px 18px; border:0;
  font-family:'JetBrains Mono',monospace; font-size:var(--code); line-height:var(--lh);
  white-space:pre; overflow-wrap:normal; word-break:normal; tab-size:4;
  letter-spacing:0;
}
.ucx .paint { overflow:auto; pointer-events:none; color:var(--text); background:var(--bg); }
.ucx .codebox textarea {
  overflow:auto; resize:none; background:transparent; color:transparent;
  caret-color:var(--accent); -webkit-text-fill-color:transparent;
}
.ucx .codebox textarea::selection { background:rgba(255,84,23,.24); -webkit-text-fill-color:transparent; }
.ucx .paint::-webkit-scrollbar { width:0; height:0; }
.ucx .paint { scrollbar-width:none; }
.ucx .codebox textarea::-webkit-scrollbar { width:10px; height:10px; }
.ucx .codebox textarea::-webkit-scrollbar-thumb,
.ucx .console::-webkit-scrollbar-thumb { background:var(--line); border-radius:8px; }
.ucx .codebox textarea::-webkit-scrollbar-thumb:hover { background:var(--faint); }

.tk-kw{color:var(--tk-kw);font-weight:600} .tk-typ{color:var(--tk-typ)}
.tk-str{color:var(--tk-str)} .tk-num{color:var(--tk-num)}
.tk-com{color:var(--tk-com);font-style:italic} .tk-fn{color:var(--tk-fn)}
.tk-meta{color:var(--tk-meta);font-weight:600} .tk-pun{color:var(--tk-pun)}

/* divider */
.ucx .divider { flex:0 0 5px; cursor:col-resize; background:transparent; position:relative; }
.ucx .divider::after {
  content:""; position:absolute; inset:0 2px; border-radius:2px; background:transparent;
  transition:background .15s ease;
}
.ucx .divider:hover::after { background:var(--accent); opacity:.55; }

/* console */
.ucx .console {
  flex:1; overflow:auto; padding:14px 18px 24px;
  font-family:'JetBrains Mono',monospace; font-size:13px; line-height:21px; color:var(--text);
}
.ucx .cmd { color:var(--faint); margin-bottom:10px; }
.ucx .cmd .dollar { color:var(--accent); font-weight:700; }
.ucx .ph { color:var(--faint); margin:0; }
.ucx .std { margin:0 0 8px; white-space:pre-wrap; word-break:break-word; font:inherit; }
.ucx .std.bad { color:var(--bad); }
.ucx .verdict { margin:14px 0 0; font-weight:600; }
.ucx .verdict.ok { color:var(--ok); }
.ucx .verdict.bad { color:var(--bad); }
.ucx .dots::after { content:"…"; animation:ucdot 1.1s steps(4,end) infinite; }
@keyframes ucdot { 0%{content:""} 25%{content:"."} 50%{content:".."} 75%{content:"..."} }
.ucx .spin { animation:ucspin .9s linear infinite; }
@keyframes ucspin { to{transform:rotate(360deg)} }

/* status bar */
.ucx .statusbar {
  flex:0 0 30px; display:flex; align-items:center; justify-content:space-between;
  padding:0 16px; background:var(--bar); border-top:1px solid var(--line);
  font-size:11.5px; color:var(--muted);
}
.ucx .statusbar .left, .ucx .statusbar .right { display:flex; align-items:center; gap:12px; }
.ucx .statusbar .right span { display:inline-flex; align-items:center; gap:4px; }
.ucx .statusbar .dot { width:7px; height:7px; border-radius:50%; }
.ucx .statusbar .sep { opacity:.5; }
.ucx .statusbar .ok { color:var(--ok); font-weight:600; }
.ucx .statusbar .bad { color:var(--bad); font-weight:600; }

/* mobile */
@media (max-width:820px) {
  .ucx { flex-direction:column; height:100dvh; }
  .ucx .rail { width:100%; flex:0 0 auto; flex-direction:row; justify-content:center;
               border-right:none; border-bottom:1px solid var(--line); padding:8px 0; }
  .ucx .tip { display:none; }
  .ucx .split { flex-direction:column; }
  .ucx .pane { flex:1 1 auto !important; flex-basis:auto !important; }
  .ucx .pane.out { border-left:none; border-top:1px solid var(--line); min-height:220px; }
  .ucx .divider { display:none; }
  .ucx .bar { padding-left:14px; }
  .ucx .statusbar .left { display:none; }
}
`;
