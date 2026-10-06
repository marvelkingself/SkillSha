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
  ArrowRight,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Award,
  Layers,
  Printer,
  Zap,
  Target,
  UserCheck,
  Code,
  Calendar,
  BookOpen,
} from 'lucide-react';

interface InterviewReportProps {
  report: InterviewEvaluationReport;
  onRestart: () => void;
  onNewSetup: () => void;
  onPracticeWeakAreas?: () => void;
  onHarderInterview?: () => void;
  onPracticeRound?: (roundType: string) => void;
}

export default function InterviewReport({
  report,
  onRestart,
  onNewSetup,
  onPracticeWeakAreas,
  onHarderInterview,
  onPracticeRound,
}: InterviewReportProps) {
  const [showDetailedReport, setShowDetailedReport] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'questions' | 'skills' | 'plan'>('overview');
  const [openQuestionIdx, setOpenQuestionIdx] = useState<number | null>(null);

  const toggleQuestion = (idx: number) => {
    setOpenQuestionIdx(openQuestionIdx === idx ? null : idx);
  };

  const { overallScore, readinessStatus, scores, setup, questionsFeedback } = report;

  // Primary highlights
  const topStrength =
    report.strongestAreas?.[0] || 'Clear baseline fundamentals and professional delivery.';
  const topWeakness =
    report.weakestAreas?.[0] || 'Could include more concrete metrics and real-world examples.';
  const topFocus =
    report.preparationPlan?.[0]?.focusArea || 'Practice structured STAR behavioral responses.';

  const METRIC_LABELS: { key: keyof typeof scores; label: string }[] = [
    { key: 'technicalKnowledge', label: 'Technical Fundamentals' },
    { key: 'communication', label: 'Communication & Delivery' },
    { key: 'problemSolving', label: 'Problem Solving & Logic' },
    { key: 'answerRelevance', label: 'Answer Relevance & Depth' },
    { key: 'answerStructure', label: 'Answer Structure (STAR)' },
    { key: 'domainKnowledge', label: 'Domain & Role Fluency' },
  ];

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* 1. COMPLETION HERO CARD */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-indigo-500/20 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> 🎉 Interview Complete
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            You completed your mock interview
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto">
            {setup.roleName} • {setup.experience} • {setup.type}
          </p>
        </div>

        {/* Primary Score */}
        <div className="py-2">
          <div className="inline-block p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
              {overallScore}
            </span>
            <span className="text-2xl font-bold text-slate-400"> / 100</span>

            <div className="mt-2 text-xs sm:text-sm font-semibold text-emerald-400 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>{readinessStatus}</span>
            </div>
          </div>
        </div>

        {/* 3 Simple Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-left">
          {/* Strength */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wide">
              <span>💪 Your Strength</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {topStrength}
            </p>
          </div>

          {/* Improve */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wide">
              <span>⚠️ What to Improve</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {topWeakness}
            </p>
          </div>

          {/* Focus Next */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300 uppercase tracking-wide">
              <span>🎯 Focus Next</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {topFocus}
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => setShowDetailedReport(!showDetailedReport)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            {showDetailedReport ? 'Hide Detailed Feedback' : 'View Detailed Feedback →'}
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors cursor-pointer"
          >
            Practice Again
          </button>
        </div>
      </div>

      {/* 2. ONE-CLICK PRACTICE SHORTCUTS */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          One-Click Practice Next
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            type="button"
            onClick={onPracticeWeakAreas || onRestart}
            className="p-3 rounded-xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/50 text-left transition-all cursor-pointer group"
          >
            <Target className="w-4 h-4 text-indigo-600 mb-1 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xs text-slate-900 block">Practice Weak Areas</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Targeted drilling</span>
          </button>

          <button
            type="button"
            onClick={onHarderInterview || onRestart}
            className="p-3 rounded-xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/50 text-left transition-all cursor-pointer group"
          >
            <Zap className="w-4 h-4 text-amber-500 mb-1 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xs text-slate-900 block">Harder Level</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Senior scrutiny</span>
          </button>

          <button
            type="button"
            onClick={() => onPracticeRound ? onPracticeRound('Technical Interview') : onRestart()}
            className="p-3 rounded-xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/50 text-left transition-all cursor-pointer group"
          >
            <Code className="w-4 h-4 text-blue-600 mb-1 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xs text-slate-900 block">Technical Round</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Deep concepts</span>
          </button>

          <button
            type="button"
            onClick={() => onPracticeRound ? onPracticeRound('HR Interview') : onRestart()}
            className="p-3 rounded-xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/50 text-left transition-all cursor-pointer group"
          >
            <UserCheck className="w-4 h-4 text-emerald-600 mb-1 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xs text-slate-900 block">HR Round</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Culture & behavioral</span>
          </button>
        </div>
      </div>

      {/* 3. PROGRESSIVE DETAILED TABS (When user clicks "View Detailed Feedback") */}
      {showDetailedReport && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 overflow-x-auto">
            {[
              { id: 'overview', label: '📊 Overview' },
              { id: 'questions', label: '💬 Question Breakdown' },
              { id: 'skills', label: '🛠️ Skills Audit' },
              { id: 'plan', label: '📅 7-Day Roadmap' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}

            <button
              type="button"
              onClick={handlePrint}
              className="ml-auto inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Print / PDF
            </button>
          </div>

          {/* TAB 1: OVERVIEW (Visual Scorecard) */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  6-Dimension Performance Breakdown
                </h3>
                <p className="text-xs text-slate-500">
                  Scores calculated based on answer completeness, structure, and domain depth.
                </p>
              </div>

              <div className="space-y-4">
                {METRIC_LABELS.map(({ key, label }) => {
                  const val = scores[key] || 75;
                  const barColor =
                    val >= 80 ? 'bg-emerald-500' : val >= 70 ? 'bg-indigo-600' : 'bg-amber-500';

                  return (
                    <div key={key} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700">{label}</span>
                        <span className="text-slate-900 font-bold">{val}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${barColor}`}
                          style={{ width: `${val}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Identified Strong & Weak Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Key Strengths Demonstrated
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {(report.strongestAreas || []).map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Areas to Sharpen
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {(report.weakestAreas || []).map((w, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: QUESTIONS (Candidate Answer & Collapsed Feedback) */}
          {activeTab === 'questions' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  Question-by-Question Diagnostic
                </h3>
                <p className="text-xs text-slate-500">
                  Click &ldquo;View Feedback&rdquo; on any question to view model answers and the STAR breakdown.
                </p>
              </div>

              <div className="space-y-3">
                {questionsFeedback.map((q, idx) => {
                  const isOpen = openQuestionIdx === idx;
                  const fb = q.feedback;

                  return (
                    <div
                      key={q.id || idx}
                      className="border border-slate-200 rounded-2xl overflow-hidden bg-white"
                    >
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span className="font-bold uppercase tracking-wider text-slate-500">
                            Question {idx + 1} • {q.category || 'Core Question'}
                          </span>
                          {fb?.score && (
                            <span className="font-bold text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded-md">
                              {fb.score}% Match
                            </span>
                          )}
                        </div>

                        <p className="font-bold text-slate-900 text-sm">{q.questionText}</p>

                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                          <span className="font-semibold block text-slate-400 mb-1">
                            Your Response:
                          </span>
                          <p className="italic leading-relaxed">
                            &ldquo;{q.candidateAnswer || 'No verbal answer recorded.'}&rdquo;
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleQuestion(idx)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors pt-1 cursor-pointer"
                        >
                          <span>{isOpen ? 'Hide AI Feedback' : 'View AI Feedback →'}</span>
                          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Collapsible Feedback Block */}
                      {isOpen && fb && (
                        <div className="p-4 pt-2 border-t border-slate-100 bg-indigo-50/30 text-xs space-y-3 animate-fadeIn">
                          {/* What went well */}
                          {fb.whatWentWell?.length > 0 && (
                            <div className="space-y-1">
                              <span className="font-bold text-emerald-700 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> What Went Well:
                              </span>
                              <ul className="list-disc pl-5 text-slate-700 space-y-0.5">
                                {fb.whatWentWell.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* What could be better */}
                          {fb.whatWasMissing?.length > 0 && (
                            <div className="space-y-1">
                              <span className="font-bold text-amber-700 flex items-center gap-1">
                                <AlertTriangle className="w-3.5 h-3.5" /> Could Be Improved:
                              </span>
                              <ul className="list-disc pl-5 text-slate-700 space-y-0.5">
                                {fb.whatWasMissing.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Model Suggested Answer */}
                          {fb.suggestedAnswer && (
                            <div className="p-3 rounded-xl bg-white border border-indigo-100 space-y-1">
                              <span className="font-bold text-indigo-700 flex items-center gap-1">
                                <Lightbulb className="w-3.5 h-3.5" /> Recommended Model Answer:
                              </span>
                              <p className="text-slate-700 leading-relaxed font-sans">
                                {fb.suggestedAnswer}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS AUDIT */}
          {activeTab === 'skills' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  Skills Competency Verification
                </h3>
                <p className="text-xs text-slate-500">
                  Skills evaluated during your responses for {setup.roleName}.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                  <h4 className="font-bold text-emerald-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Skills Demonstrated</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(report.strongestAreas || ['Core Domain Knowledge', 'Professional Tone']).map((s, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-800 text-xs font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-2">
                  <h4 className="font-bold text-amber-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Skill Gaps to Cover</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(report.technicalGaps || ['Advanced Scenario Nuance', 'Quantifiable Metrics']).map((g, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-800 text-xs font-medium">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 7-DAY IMPROVEMENT PLAN */}
          {activeTab === 'plan' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  Your Personalized 7-Day Roadmap
                </h3>
                <p className="text-xs text-slate-500">
                  Targeted daily revision topics to turn your weak spots into strengths.
                </p>
              </div>

              <div className="space-y-3">
                {(report.preparationPlan || []).map((day) => (
                  <div
                    key={day.day}
                    className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-indigo-600 px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100">
                        Day {day.day}
                      </span>
                      <span className="font-semibold text-slate-500">{day.focusArea}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm">{day.title}</h4>

                    <div className="space-y-1 text-xs text-slate-600">
                      {(day.actionItems || []).map((act, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Start New Setup button */}
      <div className="text-center pt-4">
        <button
          type="button"
          onClick={onNewSetup}
          className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          ← Choose another role or start fresh
        </button>
      </div>
    </div>
  );
}
