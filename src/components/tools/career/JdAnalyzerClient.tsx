'use client';

import { useState } from 'react';
import {
  Target,
  Search,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Sparkles,
  Award,
  DollarSign,
  Briefcase,
  Layers,
  Flag,
} from 'lucide-react';
import { SKILL_LEXICON, testSkillMatch } from '@/lib/tools/career/ats-engine';

const SAMPLE_JD = `Role: Senior Frontend Developer (React / Next.js)
Company: NexaTech Labs
Location: Bangalore / Hybrid (3 days remote)
Experience: 3 to 6 years
Salary: 18 - 25 LPA (based on skills & interview performance)

About the Role:
We are looking for a passionate Senior Frontend Engineer to build high-scale web products. You will architect resilient user interfaces, optimize web performance, and collaborate with backend engineers.

Must-Have Requirements:
• 3+ years of production experience in React.js, Next.js (App Router), and TypeScript.
• Solid mastery of JavaScript (ES6+), HTML5, CSS3, and Tailwind CSS.
• Experience with State Management (Redux Toolkit or Zustand) and RESTful API / GraphQL consumption.
• Proven track record optimizing Core Web Vitals (LCP, FID/INP, CLS) and debugging complex frontend memory leaks.
• Hands-on with Docker, Git version control, and CI/CD deployment pipelines.

Good to Have:
• Experience with unit testing using Jest, Cypress, or React Testing Library.
• Understanding of AWS cloud hosting, CDN edge caching, and serverless functions.
• Strong communication skills, team collaboration, and ability to mentor junior engineers.`;

interface JdAnalysis {
  roleTitle: string;
  seniority: string;
  experienceYears: string;
  salaryMentioned: string;
  hardSkills: string[];
  softSkills: string[];
  resumeKeywords: string[];
  greenFlags: string[];
  redFlags: string[];
  responsibilitiesSummary: string[];
}

export default function JdAnalyzerClient() {
  const [jdText, setJdText] = useState(SAMPLE_JD);
  const [analysis, setAnalysis] = useState<JdAnalysis | null>(() => analyzeJd(SAMPLE_JD));
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);

  function analyzeJd(text: string): JdAnalysis {
    const lower = text.toLowerCase();

    // 1. Detect Hard Skills
    const hardSkills: string[] = [];
    SKILL_LEXICON.forEach((skill) => {
      if (testSkillMatch(lower, skill) && !hardSkills.includes(skill)) {
        hardSkills.push(skill);
      }
    });

    // 2. Detect Soft Skills
    const softCandidates = [
      'communication', 'teamwork', 'collaboration', 'problem solving', 'leadership',
      'mentorship', 'critical thinking', 'adaptability', 'agile', 'attention to detail',
      'ownership', 'cross-functional',
    ];
    const softSkills: string[] = [];
    softCandidates.forEach((s) => {
      if (lower.includes(s) && !softSkills.includes(s)) {
        softSkills.push(s);
      }
    });

    // 3. Experience & Seniority
    const expMatch = text.match(/(\d+)\s*(?:to|-)\s*(\d+)\s*(?:years?|yrs?)/i) ||
      text.match(/(\d+)\+?\s*(?:years?|yrs?)/i);
    const experienceYears = expMatch ? expMatch[0] : 'Not explicitly specified';

    let seniority = 'Mid-Level';
    if (lower.includes('senior') || lower.includes('sr.') || lower.includes('lead')) seniority = 'Senior / Lead';
    else if (lower.includes('fresher') || lower.includes('junior') || lower.includes('intern') || lower.includes('entry')) seniority = 'Entry / Junior';
    else if (lower.includes('architect') || lower.includes('principal') || lower.includes('director')) seniority = 'Staff / Principal / Director';

    // 4. Salary clues
    const salaryMatch = text.match(/(\d+[\d,.]*)\s*(?:-|to)\s*(\d+[\d,.]*)\s*(?:lpa|lakhs?|inr|k|\$)/i) ||
      text.match(/(?:salary|ctc|package|compensation)[:\s]*([^\n]+)/i);
    const salaryMentioned = salaryMatch ? salaryMatch[0] : 'Competitive / Disclosed during interview';

    // 5. High-Impact Resume Keywords
    const resumeKeywords = hardSkills.slice(0, 10).map((s) => s.toUpperCase());

    // 6. Flags
    const greenFlags: string[] = [];
    const redFlags: string[] = [];

    if (lower.includes('remote') || lower.includes('hybrid')) greenFlags.push('Hybrid / Remote flexibility mentioned');
    if (lower.includes('mentor') || lower.includes('learning')) greenFlags.push('Culture of mentorship and engineering growth');
    if (salaryMatch) greenFlags.push('Transparent compensation range provided upfront');

    if (lower.includes('wear many hats') || lower.includes('fast-paced')) redFlags.push('"Fast-paced" or "wear many hats" may indicate high ambiguity or startup overtime');
    if (lower.includes('urgent requirement') || lower.includes('immediate joiner')) redFlags.push('Immediate joiner requirement; hiring team may be under timeline crunch');

    return {
      roleTitle: text.split('\n')[0]?.replace(/role:|job title:/i, '').trim() || 'Software Engineer',
      seniority,
      experienceYears,
      salaryMentioned,
      hardSkills,
      softSkills,
      resumeKeywords,
      greenFlags: greenFlags.length > 0 ? greenFlags : ['Standard professional job specification'],
      redFlags: redFlags.length > 0 ? redFlags : ['No overt red flags detected in job description copy'],
      responsibilitiesSummary: [
        'Architect, build and maintain core features with high performance and accessibility.',
        'Optimize application speed, state management, and continuous deployment workflows.',
        'Partner cross-functionally with product, UI/UX designers, and backend teams.',
      ],
    };
  }

  const handleRunAnalysis = () => {
    if (!jdText.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysis(analyzeJd(jdText));
      setIsAnalyzing(false);
    }, 350);
  };

  const handleCopyKeywords = () => {
    if (!analysis) return;
    navigator.clipboard.writeText(analysis.resumeKeywords.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Input Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600" />
              <span>Paste Any Job Description (JD)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Extract technical stack, soft skills, seniority requirements, and top ATS keywords.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setJdText(SAMPLE_JD);
              setAnalysis(analyzeJd(SAMPLE_JD));
            }}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors self-start sm:self-auto"
          >
            Load Sample JD
          </button>
        </div>

        <textarea
          rows={8}
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          placeholder="Paste raw job posting from LinkedIn, Naukri, Indeed, or company careers page..."
          className="w-full p-4 rounded-2xl border border-slate-200 focus:border-indigo-600 focus:outline-none text-xs sm:text-sm text-slate-900 leading-relaxed"
        />

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-slate-400">
            {jdText.trim() ? `${jdText.trim().split(/\s+/).length} words` : 'Empty'}
          </span>

          <button
            type="button"
            onClick={handleRunAnalysis}
            disabled={!jdText.trim() || isAnalyzing}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isAnalyzing ? 'Extracting Requirements...' : 'Analyze Job Description'}</span>
          </button>
        </div>
      </div>

      {/* Analysis Output */}
      {analysis && (
        <div className="space-y-6 animate-fadeIn">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] font-bold uppercase text-slate-400 block">Seniority Level</span>
              <p className="text-base font-extrabold text-slate-900">{analysis.seniority}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] font-bold uppercase text-slate-400 block">Experience Required</span>
              <p className="text-base font-extrabold text-indigo-600">{analysis.experienceYears}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] font-bold uppercase text-slate-400 block">Salary / CTC Clues</span>
              <p className="text-sm font-extrabold text-emerald-600 truncate">{analysis.salaryMentioned}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] font-bold uppercase text-slate-400 block">Technical Skills</span>
              <p className="text-base font-extrabold text-slate-900">{analysis.hardSkills.length} Identified</p>
            </div>
          </div>

          {/* High-Impact Resume Keywords Box */}
          <div className="p-6 rounded-3xl bg-indigo-900 text-white shadow-lg space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  ATS Rank Maximizer
                </span>
                <h3 className="text-lg font-bold">Top Keywords to Include in Your Resume</h3>
              </div>
              <button
                type="button"
                onClick={handleCopyKeywords}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Keywords!' : 'Copy All Keywords'}</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {analysis.resumeKeywords.map((kw) => (
                <span
                  key={kw}
                  className="px-3 py-1 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-semibold"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Hard vs Soft Skills Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hard Skills */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                <span>Must-Have Hard Skills & Tools ({analysis.hardSkills.length})</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {analysis.hardSkills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold capitalize"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Culture & Soft Competencies</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {analysis.softSkills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold capitalize"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Green Flags vs Watchouts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
              <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Green Flags in Job Posting
              </span>
              <ul className="space-y-1.5 text-emerald-900 list-disc pl-4">
                {analysis.greenFlags.map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-2">
              <span className="font-bold text-amber-800 flex items-center gap-1.5">
                <Flag className="w-4 h-4 text-amber-600" /> What to Clarify with the Recruiter
              </span>
              <ul className="space-y-1.5 text-amber-900 list-disc pl-4">
                {analysis.redFlags.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
