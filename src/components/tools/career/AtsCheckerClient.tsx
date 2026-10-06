'use client';

import { useState } from 'react';
import {
  analyzeResumeAts,
  AtsCheckResult,
} from '@/lib/tools/career/ats-engine';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  Award,
  Zap,
  RotateCcw,
  FileText,
  TrendingUp,
} from 'lucide-react';

const SAMPLE_RESUME = `RAHUL SHARMA
Frontend Engineer | Next.js & React Developer
Email: rahul.sharma@email.com | Phone: +91 98765 43210 | Location: Bangalore, India
LinkedIn: linkedin.com/in/rahul-sharma-dev | GitHub: github.com/rahulsharma

PROFESSIONAL SUMMARY
Performance-driven Frontend Engineer with 2+ years of experience building fast, scalable web applications using React, Next.js, and TypeScript. Reduced web vitals LCP by 45% and collaborated in agile cross-functional teams to deliver accessible, conversion-focused enterprise UI.

TECHNICAL SKILLS
Languages & Frameworks: Next.js 15, React 19, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS
State & APIs: Redux Toolkit, Zustand, RESTful APIs, GraphQL
Tools & Testing: Git, GitHub, Docker, Jest, Chrome DevTools, Webpack, Vercel

PROFESSIONAL EXPERIENCE
Frontend Engineer - TechCorp Solutions | Bangalore, India (06/2023 – Present)
• Architected and deployed customer-facing SaaS dashboards using Next.js App Router and TypeScript, serving 50,000+ monthly active users.
• Optimized Largest Contentful Paint (LCP) from 3.8s to 1.6s, directly increasing checkout conversion rates by 18%.
• Implemented reusable component design system with Tailwind CSS and Radix UI primitives, accelerating team sprint velocity by 25%.
• Automated unit test suites using Jest and React Testing Library, maintaining 85%+ code coverage.

Junior Web Developer - DigitalWave Agency | Pune, India (08/2022 – 05/2023)
• Developed 12+ responsive e-commerce web applications with React, Redux, and RESTful API integrations.
• Collaborated with UI/UX designers to implement pixel-perfect Figma designs with 100% WCAG accessibility compliance.

EDUCATION
B.Tech in Computer Science & Engineering
Pune University (SPPU) (2018 – 2022) | Grade: 8.4 CGPA

KEY PROJECTS
E-Commerce Analytics Platform | Next.js 15, TypeScript, Tailwind, Chart.js
• Built full-featured multi-tenant analytics dashboard with automated PDF export, real-time filtering, and Stripe payments.`;

export default function AtsCheckerClient() {
  const [resumeText, setResumeText] = useState(SAMPLE_RESUME);
  const [result, setResult] = useState<AtsCheckResult | null>(() => analyzeResumeAts(SAMPLE_RESUME));
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    if (!resumeText.trim()) return;
    setIsScanning(true);
    setTimeout(() => {
      const res = analyzeResumeAts(resumeText);
      setResult(res);
      setIsScanning(false);
    }, 400);
  };

  const handleLoadSample = () => {
    setResumeText(SAMPLE_RESUME);
    const res = analyzeResumeAts(SAMPLE_RESUME);
    setResult(res);
  };

  const handleClear = () => {
    setResumeText('');
    setResult(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Input Workspace */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              <span>Paste Your Resume Text</span>
            </h2>
            <p className="text-xs text-slate-500">
              Paste the full text of your resume to evaluate ATS readability, action verbs, and keyword density.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadSample}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              Load Sample Resume
            </button>
            {resumeText && (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 px-2 py-1.5 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <textarea
          rows={8}
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste full resume text here (Summary, Experience, Education, Skills)..."
          className="w-full p-4 rounded-2xl border border-slate-200 focus:border-indigo-600 focus:outline-none text-xs sm:text-sm text-slate-900 leading-relaxed"
        />

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-slate-400">
            {resumeText.trim() ? `${resumeText.trim().split(/\s+/).length} words detected` : 'No text entered'}
          </span>

          <button
            type="button"
            onClick={handleScan}
            disabled={!resumeText.trim() || isScanning}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>{isScanning ? 'Analyzing ATS Factors...' : 'Analyze ATS Score'}</span>
          </button>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-8 animate-fadeIn">
          {/* Top Score Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-indigo-500/20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-indigo-800/40">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Award className="w-3.5 h-3.5" /> ATS Compatibility Audit
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  ATS Score: {result.score} / 100
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
                  {result.summary}
                </p>
              </div>

              {/* Score Circular Badge */}
              <div className="flex items-center gap-3 self-start md:self-auto">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
                  <span className="text-3xl sm:text-4xl font-black text-white">{result.score}%</span>
                  <span className="text-xs font-semibold block text-emerald-400 mt-0.5">
                    Rating: {result.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* 5 Category Progress Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-6 text-xs">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Sections</span>
                  <span className="text-white font-bold">{result.categoryScores.sections}/25</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full"
                    style={{ width: `${(result.categoryScores.sections / 25) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Impact Metrics</span>
                  <span className="text-white font-bold">{result.categoryScores.impactAndMetrics}/25</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full"
                    style={{ width: `${(result.categoryScores.impactAndMetrics / 25) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Action Verbs</span>
                  <span className="text-white font-bold">{result.categoryScores.actionVerbs}/20</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full"
                    style={{ width: `${(result.categoryScores.actionVerbs / 20) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Readability</span>
                  <span className="text-white font-bold">{result.categoryScores.formattingReadability}/15</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full"
                    style={{ width: `${(result.categoryScores.formattingReadability / 15) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Contact Details</span>
                  <span className="text-white font-bold">{result.categoryScores.contactCompleteness}/15</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full"
                    style={{ width: `${(result.categoryScores.contactCompleteness / 15) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actionable Issues Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Critical & Warnings */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Issues & Recommended Fixes</span>
              </h4>

              {result.criticalIssues.length === 0 && result.warnings.length === 0 ? (
                <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>No critical formatting or content issues detected!</span>
                </div>
              ) : (
                <div className="space-y-2.5 text-xs">
                  {result.criticalIssues.map((issue, idx) => (
                    <div key={`crit-${idx}`} className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{issue}</span>
                    </div>
                  ))}

                  {result.warnings.map((warn, idx) => (
                    <div key={`warn-${idx}`} className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{warn}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Passing Items */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Passed ATS Checkpoints</span>
              </h4>

              <div className="space-y-2 text-xs">
                {result.passedChecks.map((item, idx) => (
                  <div key={`pass-${idx}`} className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-emerald-800 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Verbs & Skills Found */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
              Keywords & Action Verbs Identified ({result.actionVerbsFound.length} Action Verbs • {result.extractedSkills.length} Technical Skills)
            </h4>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-bold text-slate-500 block mb-1.5">Action Verbs:</span>
                <div className="flex flex-wrap gap-1.5">
                  {result.actionVerbsFound.map((v) => (
                    <span key={v} className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold capitalize">
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              {result.extractedSkills.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-1.5">Technical & Industry Skills:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.extractedSkills.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium uppercase">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
