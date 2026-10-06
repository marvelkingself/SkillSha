'use client';

import { useState, useEffect } from 'react';
import { SavedInterviewSummary } from '@/types/interview';
import {
  getSavedInterviewSummaries,
  getInterviewStreak,
  deleteSavedInterview,
} from '@/lib/tools/interview/storage';
import {
  Trophy,
  Flame,
  Award,
  Clock,
  ArrowRight,
  Trash2,
  PlusCircle,
  Briefcase,
  Layers,
  Sparkles,
} from 'lucide-react';

interface InterviewDashboardProps {
  onStartNew: () => void;
  onViewReport: (sessionId: string) => void;
}

export default function InterviewDashboard({
  onStartNew,
  onViewReport,
}: InterviewDashboardProps) {
  const [summaries, setSummaries] = useState<SavedInterviewSummary[]>([]);
  const [streak, setStreak] = useState<number>(1);
  const [isClient, setIsClient] = useState(false);

  const loadData = () => {
    const list = getSavedInterviewSummaries();
    setSummaries(list);
    setStreak(getInterviewStreak());
  };

  useEffect(() => {
    setIsClient(true);
    loadData();
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this interview session record?')) {
      deleteSavedInterview(id);
      loadData();
    }
  };

  if (!isClient) {
    return null;
  }

  // Calculate metrics
  const totalSessions = summaries.length;
  const avgScore =
    totalSessions > 0
      ? Math.round(
          summaries.reduce((acc, curr) => acc + curr.overallScore, 0) / totalSessions
        )
      : 0;
  const highestScore =
    totalSessions > 0
      ? Math.max(...summaries.map((s) => s.overallScore))
      : 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Hero stats */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-indigo-800/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" /> Candidate Performance Hub
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              My Mock Interview Track Record
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Track your diagnostic evaluations, monitor category score improvements, and review AI feedback across different job roles and experience levels.
            </p>
          </div>

          <button
            onClick={onStartNew}
            className="self-start md:self-auto inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <PlusCircle className="w-4 h-4" />
            Start New Interview
          </button>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Total Sessions</p>
                <p className="text-2xl font-bold text-white">{totalSessions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Average Score</p>
                <p className="text-2xl font-bold text-white">
                  {avgScore > 0 ? `${avgScore}%` : '—'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Highest Score</p>
                <p className="text-2xl font-bold text-white">
                  {highestScore > 0 ? `${highestScore}%` : '—'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Practice Streak</p>
                <p className="text-2xl font-bold text-white">
                  {streak} {streak === 1 ? 'Day' : 'Days'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recent Interview Sessions</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Select any past session to review your full diagnostic scorecard, STAR answers, and 7-day preparation roadmap.
            </p>
          </div>
        </div>

        {summaries.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
              <Layers className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-slate-900">No mock interviews taken yet</h4>
            <p className="text-slate-500 text-sm max-w-sm mx-auto mt-1 mb-6">
              Select your target role, experience level, and preferred interview type to take your first AI mock interview and unlock your readiness score.
            </p>
            <button
              onClick={onStartNew}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors shadow-md"
            >
              <Sparkles className="w-4 h-4" /> Start First Interview
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 pl-2">Role & Domain</th>
                  <th className="pb-3 px-3">Type & Level</th>
                  <th className="pb-3 px-3">Date</th>
                  <th className="pb-3 px-3">Score & Status</th>
                  <th className="pb-3 pr-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {summaries.map((item) => {
                  const scoreBadgeColor =
                    item.overallScore >= 80
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : item.overallScore >= 70
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200';

                  const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });

                  return (
                    <tr
                      key={item.id}
                      onClick={() => onViewReport(item.id)}
                      className="group hover:bg-slate-50/80 cursor-pointer transition-colors"
                    >
                      <td className="py-4 pl-2">
                        <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {item.roleName}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-400" />
                          {item.domain}
                        </div>
                      </td>

                      <td className="py-4 px-3">
                        <div className="font-medium text-slate-700">{item.type}</div>
                        <div className="text-xs text-slate-400">{item.experience}</div>
                      </td>

                      <td className="py-4 px-3 text-slate-500 whitespace-nowrap text-xs">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {formattedDate}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {item.durationMinutes} min • {item.totalQuestions} questions
                        </div>
                      </td>

                      <td className="py-4 px-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${scoreBadgeColor}`}
                          >
                            {item.overallScore}%
                          </span>
                          <span className="hidden sm:inline text-xs text-slate-600 font-medium truncate max-w-[140px]">
                            {item.readinessStatus.split('—')[1]?.trim() || item.readinessStatus}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 pr-2 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => onViewReport(item.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-colors"
                          >
                            Report <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(item.id, e)}
                            title="Delete session"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
