'use client';

import { useState } from 'react';
import {
  matchResumeWithJd,
  ResumeJdMatchResult,
} from '@/lib/tools/career/ats-engine';
import {
  Puzzle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Briefcase,
  FileText,
} from 'lucide-react';

const SAMPLE_RESUME = `RAHUL SHARMA
Frontend Developer | React & Next.js
Email: rahul@email.com | Phone: +91 9876543210 | Bangalore
LinkedIn: linkedin.com/in/rahul-sharma

Summary: Frontend Engineer with 3 years of experience specializing in React, Next.js, TypeScript, and modern CSS. Experienced in building responsive dashboards, optimizing performance, and integrating RESTful APIs.

Skills: Next.js, React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Redux, REST API, Git, Docker, Jest

Experience:
Frontend Engineer - TechCorp (2022 - Present)
• Built core web application with Next.js App Router and TypeScript.
• Reduced LCP by 40% and improved checkout conversion rate.
• Created reusable component library with Tailwind CSS.`;

const SAMPLE_JD = `Senior Frontend Developer
Location: Bangalore
Experience: 3+ years required
Skills: React, Next.js, TypeScript, GraphQL, Tailwind CSS, Jest, Microservices, AWS, System Design

Responsibilities:
• Architect robust user interfaces with Next.js and TypeScript.
• Collaborate with backend engineers to integrate GraphQL and RESTful APIs.
• Deploy scalable web frontends on AWS cloud infrastructure.`;

export default function ResumeJdMatcherClient() {
  const [resumeText, setResumeText] = useState(SAMPLE_RESUME);
  const [jdText, setJdText] = useState(SAMPLE_JD);
  const [result, setResult] = useState<ResumeJdMatchResult | null>(() =>
    matchResumeWithJd(SAMPLE_RESUME, SAMPLE_JD)
  );
  const [isMatching, setIsMatching] = useState(false);

  const handleMatch = () => {
    if (!resumeText.trim() || !jdText.trim()) return;
    setIsMatching(true);
    setTimeout(() => {
      const res = matchResumeWithJd(resumeText, jdText);
      setResult(res);
      setIsMatching(false);
    }, 350);
  };

  const handleLoadSample = () => {
    setResumeText(SAMPLE_RESUME);
    setJdText(SAMPLE_JD);
    setResult(matchResumeWithJd(SAMPLE_RESUME, SAMPLE_JD));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Dual Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resume Input */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>1. Paste Your Resume</span>
            </h3>
            <span className="text-[11px] text-slate-400">
              {resumeText.trim() ? `${resumeText.trim().split(/\s+/).length} words` : 'Empty'}
            </span>
          </div>

          <textarea
            rows={8}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume summary, skills, and work history here..."
            className="w-full p-3.5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 leading-relaxed"
          />
        </div>

        {/* JD Input */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-600" />
              <span>2. Paste Target Job Description</span>
            </h3>
            <button
              type="button"
              onClick={handleLoadSample}
              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800"
            >
              Load Sample Pair
            </button>
          </div>

          <textarea
            rows={8}
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste the target job description requirements here..."
            className="w-full p-3.5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 leading-relaxed"
          />
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleMatch}
          disabled={!resumeText.trim() || !jdText.trim() || isMatching}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-extrabold text-sm shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          <Puzzle className="w-4 h-4" />
          <span>{isMatching ? 'Calculating Keyword & Experience Match...' : 'Calculate Match %'}</span>
        </button>
      </div>

      {/* Match Result Display */}
      {result && (
        <div className="space-y-6 animate-fadeIn">
          {/* Hero Match Card */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-500/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  Resume Alignment Assessment
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {result.readinessLabel}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {result.experienceMatch.explanation}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center shrink-0">
                <span className="text-4xl sm:text-5xl font-black text-white">{result.matchPercentage}%</span>
                <span className="text-xs font-bold text-emerald-400 block mt-1 uppercase tracking-wider">
                  Keyword Match
                </span>
              </div>
            </div>
          </div>

          {/* Matched vs Missing Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matched Skills */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h4 className="font-bold text-emerald-800 text-sm uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Matched Skills ({result.matchedSkills.length})</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {result.matchedSkills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase"
                  >
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h4 className="font-bold text-rose-800 text-sm uppercase tracking-wider flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Missing Skills in Your Resume ({result.missingSkills.length})</span>
              </h4>
              {result.missingSkills.length === 0 ? (
                <p className="text-xs text-slate-500">All target skills from the JD are present in your resume!</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {result.missingSkills.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold uppercase"
                    >
                      + {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Contextual Keyword Gap Action Items */}
          {result.keywordGaps.length > 0 && (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                Keyword Gap Placement Recommendations
              </h4>
              <div className="space-y-2 text-xs">
                {result.keywordGaps.map((gap, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold shrink-0">
                      {gap.keyword}
                    </span>
                    <span className="text-slate-700">{gap.contextTip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Optimization Strategy */}
          <div className="p-6 rounded-3xl bg-indigo-50/60 border border-indigo-100 space-y-2 text-xs text-indigo-950">
            <span className="font-bold uppercase tracking-wider text-indigo-800 block">
              💡 Strategic Advice Before Submitting
            </span>
            <ul className="space-y-1.5 list-disc pl-4 text-slate-700">
              {result.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
