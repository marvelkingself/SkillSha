'use client';

import { useState } from 'react';
import {
  InterviewEvaluationReport,
  QuestionRecord,
} from '@/types/interview';
import {
  Trophy,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  Calendar,
  Download,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Award,
  Layers,
  ArrowRight,
  Printer,
} from 'lucide-react';

interface InterviewReportProps {
  report: InterviewEvaluationReport;
  onRestart: () => void;
  onNewSetup: () => void;
}

export default function InterviewReport({
  report,
  onRestart,
  onNewSetup,
}: InterviewReportProps) {
  const [openQuestionIdx, setOpenQuestionIdx] = useState<number | null>(0);

  const toggleQuestion = (idx: number) => {
    setOpenQuestionIdx(openQuestionIdx === idx ? null : idx);
  };

  const { overallScore, readinessStatus, scores, setup } = report;

  const scoreColor =
    overallScore >= 80 ? 'text-emerald-600' : overallScore >= 70 ? 'text-blue-600' : 'text-amber-500';

  const METRIC_LABELS: { key: keyof typeof scores; label: string }[] = [
    { key: 'technicalKnowledge', label: 'Technical Depth' },
    { key: 'communication', label: 'Communication & Pacing' },
    { key: 'problemSolving', label: 'Problem Solving & Logic' },
    { key: 'domainKnowledge', label: 'Domain & Role Fluency' },
    { key: 'answerRelevance', label: 'Answer Relevance' },
    { key: 'answerStructure', label: 'Structure & STAR Method' },
    { key: 'confidence', label: 'Confidence & Demeanor' },
    { key: 'professionalism', label: 'Professionalism & Polish' },
  ];

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Top Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-white/5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Award className="w-3.5 h-3.5" />
              <span>Executive Interview Diagnostic</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {setup.roleName} Evaluation Report
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
              {setup.domain} • {setup.experience} • {setup.type} • {report.completedAt}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-zinc-800 text-xs font-bold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              type="button"
              onClick={onRestart}
              className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Interview</span>
            </button>
          </div>
        </div>

        {/* Overall Score & Readiness Pill */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Big Score Meter */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-white/5 text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Overall Score</span>
            <div className={`text-5xl sm:text-6xl font-black tracking-tight ${scoreColor}`}>
              {overallScore}
              <span className="text-xl sm:text-2xl font-bold text-slate-400">/100</span>
            </div>
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 mt-1">
              {readinessStatus}
            </span>
          </div>

          {/* 8-Metric Breakdown Grid (2 cols span) */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Performance Breakdown Across 8 Dimensions
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
              {METRIC_LABELS.map((m) => {
                const val = scores[m.key] || 75;
                return (
                  <div key={m.key} className="space-y-1">
                    <div className="flex justify-between font-medium">
                      <span className="text-slate-700 dark:text-zinc-300">{m.label}</span>
                      <span className="font-bold font-mono text-slate-900 dark:text-white">{val}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
                      <div
                        className={`h-full ${
                          val >= 80 ? 'bg-emerald-500' : val >= 70 ? 'bg-blue-500' : 'bg-amber-400'
                        }`}
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Strongest vs Weakest Areas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Strongest */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Key Strengths Observed</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
            {report.strongestAreas.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weakest / Gaps */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>High-Priority Gaps to Address</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
            {report.weakestAreas.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">!</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Question-by-Question Deep Diagnostics */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Question-by-Question Evaluation & Model Answers</span>
          </h2>
          <span className="text-xs text-slate-400">
            {report.questionsFeedback.length} Questions Evaluated
          </span>
        </div>

        <div className="space-y-3">
          {report.questionsFeedback.map((q, idx) => {
            const isOpen = openQuestionIdx === idx;
            const fb = q.feedback;
            return (
              <div
                key={q.id || idx}
                className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900 overflow-hidden shadow-xs transition-colors"
              >
                {/* Header Button */}
                <button
                  type="button"
                  onClick={() => toggleQuestion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-zinc-800/40"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                        {q.questionText}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {q.category} • Score: <strong className="text-blue-600">{fb?.score || 75}/100</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        (fb?.score || 75) >= 80
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-amber-50 text-amber-600'
                      }`}
                    >
                      {fb?.score || 75}%
                    </span>
                    {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                  </div>
                </button>

                {/* Expanded Details */}
                {isOpen && fb && (
                  <div className="p-6 pt-2 border-t border-slate-100 dark:border-white/5 space-y-5 text-xs sm:text-sm">
                    {/* Candidate's Answer */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/60 dark:border-white/5 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Your Stated Answer
                      </span>
                      <p className="text-slate-700 dark:text-zinc-300 italic leading-relaxed">
                        &ldquo;{q.candidateAnswer || 'No answer submitted'}&rdquo;
                      </p>
                    </div>

                    {/* What went well & What was missing */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
                        <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
                          What You Did Well
                        </span>
                        <ul className="space-y-1 text-slate-700 dark:text-zinc-300 text-xs">
                          {fb.whatWentWell.map((w, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-emerald-600">✓</span>
                              <span>{w}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 space-y-2">
                        <span className="font-bold text-amber-800 dark:text-amber-300 block">
                          What Was Missing
                        </span>
                        <ul className="space-y-1 text-slate-700 dark:text-zinc-300 text-xs">
                          {fb.whatWasMissing.map((m, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-amber-600 font-bold">!</span>
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Better Approach */}
                    <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 space-y-1">
                      <span className="font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                        <span>Recommended Structure (Senior Interviewer Tip)</span>
                      </span>
                      <p className="text-slate-700 dark:text-zinc-300 leading-relaxed text-xs">
                        {fb.betterApproach}
                      </p>
                    </div>

                    {/* Suggested Model Answer */}
                    <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/40 space-y-1.5">
                      <span className="font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        <span>Top 5% Candidate Model Answer</span>
                      </span>
                      <p className="text-slate-800 dark:text-zinc-200 leading-relaxed text-xs font-sans">
                        {fb.suggestedAnswer}
                      </p>
                    </div>

                    {/* STAR Breakdown if present */}
                    {fb.starEvaluation && (
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/80 dark:border-white/5 space-y-2 text-xs">
                        <span className="font-bold text-slate-800 dark:text-zinc-200">
                          STAR Method Audit (Score: {fb.starEvaluation.starScore}/100)
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
                          <div className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5">
                            <strong className="text-blue-600 block">S (Situation)</strong>
                            <span className="text-slate-600 dark:text-zinc-400 font-sans">{fb.starEvaluation.situation}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5">
                            <strong className="text-blue-600 block">T (Task)</strong>
                            <span className="text-slate-600 dark:text-zinc-400 font-sans">{fb.starEvaluation.task}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5">
                            <strong className="text-blue-600 block">A (Action)</strong>
                            <span className="text-slate-600 dark:text-zinc-400 font-sans">{fb.starEvaluation.action}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5">
                            <strong className="text-blue-600 block">R (Result)</strong>
                            <span className="text-slate-600 dark:text-zinc-400 font-sans">{fb.starEvaluation.result}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 7-Day Personalized Preparation Roadmap */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>Targeted Study Plan</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Personalized 7-Day Action Plan for {setup.roleName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
            Engineered based on your specific knowledge gaps to maximize interview conversion rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {report.preparationPlan.map((d) => (
            <div
              key={d.day}
              className="p-4 rounded-2xl bg-slate-50/70 dark:bg-zinc-950/70 border border-slate-200/80 dark:border-white/5 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-blue-600 dark:text-blue-400">{d.title}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-slate-200 dark:bg-zinc-800 text-slate-600">
                  Day {d.day}
                </span>
              </div>
              <p className="text-slate-700 dark:text-zinc-300 font-medium leading-snug">{d.focusArea}</p>
              <div className="pt-1 space-y-1 text-slate-600 dark:text-zinc-400">
                {d.actionItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-6 rounded-3xl bg-slate-100 dark:bg-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Ready to drill another domain or designation?
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Practice across IT, HR, BPO, Digital Marketing, Sales, Finance, and Management.
          </p>
        </div>

        <button
          type="button"
          onClick={onNewSetup}
          className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
        >
          <span>Configure New Interview</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
