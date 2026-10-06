'use client';

import { useState } from 'react';
import {
  Target,
  FileText,
  Briefcase,
  Zap,
  ArrowRight,
  Sparkles,
  LayoutDashboard,
  CheckCircle2,
} from 'lucide-react';
import { POPULAR_ROLES } from '@/lib/tools/interview/role-detector';

interface InterviewWelcomeProps {
  onSelectFlow: (flow: 'role' | 'resume' | 'jd') => void;
  onQuickStart: (roleName: string) => void;
  onViewDashboard: () => void;
  totalSavedSessions?: number;
}

export default function InterviewWelcome({
  onSelectFlow,
  onQuickStart,
  onViewDashboard,
  totalSavedSessions = 0,
}: InterviewWelcomeProps) {
  const [quickRole, setQuickRole] = useState('');
  const [isQuickOpen, setIsQuickOpen] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickRole.trim()) {
      onQuickStart(quickRole.trim());
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fadeIn">
      {/* Top Welcome Hero */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Next-Gen AI Career Simulator
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Practice Your Next Interview with AI
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Get a realistic mock interview tailored to your role, experience and career goals.
        </p>

        {/* Saved Session Shortcut (if user has any) */}
        {totalSavedSessions > 0 && (
          <div className="pt-2">
            <button
              onClick={onViewDashboard}
              className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50/80 hover:bg-indigo-100 px-3.5 py-1.5 rounded-full transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              View my past {totalSavedSessions} interview {totalSavedSessions === 1 ? 'report' : 'reports'} & streak →
            </button>
          </div>
        )}
      </div>

      {/* 3 Main Entry Path Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Practice for a Job */}
        <button
          onClick={() => onSelectFlow('role')}
          className="group relative flex flex-col items-start p-7 rounded-3xl bg-white border-2 border-slate-200 hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 text-left cursor-pointer transform hover:-translate-y-1"
        >
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
            <Target className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
            🎯 Practice for a Job
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
            Prepare for a specific job role across IT, HR, BPO, Marketing, Sales, or Management.
          </p>

          <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-indigo-600">
            <span>Choose Role</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </div>
        </button>

        {/* Card 2: Practice from My Resume */}
        <button
          onClick={() => onSelectFlow('resume')}
          className="group relative flex flex-col items-start p-7 rounded-3xl bg-white border-2 border-slate-200 hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 text-left cursor-pointer transform hover:-translate-y-1"
        >
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
            <FileText className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
            📄 Practice from My Resume
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
            Upload or paste your resume and let AI generate probing questions based on your actual projects.
          </p>

          <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-600">
            <span>Use Resume</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </div>
        </button>

        {/* Card 3: Practice from a Job Description */}
        <button
          onClick={() => onSelectFlow('jd')}
          className="group relative flex flex-col items-start p-7 rounded-3xl bg-white border-2 border-slate-200 hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 text-left cursor-pointer transform hover:-translate-y-1"
        >
          <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
            <Briefcase className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
            💼 Practice from a Job Description
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
            Paste a specific Job Description and practice tailored questions designed for that exact vacancy.
          </p>

          <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-purple-600">
            <span>Paste JD</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </div>
        </button>
      </div>

      {/* Quick Start Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-indigo-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> ⚡ Quick Start — Zero Configuration
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">In a hurry? Start in 10 seconds</h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Enter your job role and AI will automatically infer the domain, level, adaptive questions, and evaluation criteria.
            </p>
          </div>

          {!isQuickOpen ? (
            <button
              onClick={() => setIsQuickOpen(true)}
              className="self-start md:self-auto inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer shrink-0"
            >
              <span>Quick Start →</span>
            </button>
          ) : (
            <form onSubmit={handleQuickSubmit} className="flex-1 max-w-md w-full">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={quickRole}
                  onChange={(e) => setQuickRole(e.target.value)}
                  placeholder="e.g. Next.js Developer, HR Executive..."
                  autoFocus
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  disabled={!quickRole.trim()}
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold text-sm transition-colors shrink-0"
                >
                  Start →
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {POPULAR_ROLES.slice(0, 4).map((r) => (
                  <button
                    key={r.roleId}
                    type="button"
                    onClick={() => onQuickStart(r.name)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
