'use client';

import { useState, useMemo } from 'react';
import {
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Sparkles,
  ArrowRight,
  Target,
  Plus,
  X,
} from 'lucide-react';
import { SKILL_LEXICON } from '@/lib/tools/career/ats-engine';

interface TargetRoleDefinition {
  name: string;
  mustHave: string[];
  goodToHave: string[];
  quickWins: string[];
}

const TARGET_ROLES: TargetRoleDefinition[] = [
  {
    name: 'Frontend Developer (React / Next.js)',
    mustHave: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind', 'Git'],
    goodToHave: ['Redux', 'Unit Testing (Jest)', 'GraphQL', 'Docker', 'Web Performance'],
    quickWins: ['Tailwind CSS', 'Git & GitHub', 'REST API Integration'],
  },
  {
    name: 'Full Stack Engineer',
    mustHave: ['React', 'Node.js', 'TypeScript', 'SQL', 'REST API', 'Git'],
    goodToHave: ['Docker', 'PostgreSQL', 'AWS', 'Redis', 'Microservices', 'GraphQL'],
    quickWins: ['Prisma ORM', 'Docker Basics', 'JWT Authentication'],
  },
  {
    name: 'Data Analyst & BI Specialist',
    mustHave: ['SQL', 'Excel', 'Power BI', 'Data Analysis', 'Data Cleaning'],
    goodToHave: ['Python', 'Pandas', 'Tableau', 'Machine Learning', 'ETL'],
    quickWins: ['Power BI DAX basics', 'Advanced Excel XLOOKUP', 'SQL Window Functions'],
  },
  {
    name: 'Digital Marketing & Growth Specialist',
    mustHave: ['SEO', 'Google Ads', 'Meta Ads', 'Content Marketing', 'Google Analytics'],
    goodToHave: ['Conversion Rate Optimization', 'Email Marketing', 'CRM (HubSpot)', 'Copywriting'],
    quickWins: ['Google Analytics 4 Setup', 'Meta Ads Campaign Structure', 'On-page SEO Audits'],
  },
];

export default function SkillGapAnalyzerClient() {
  const [selectedRoleIdx, setSelectedRoleIdx] = useState(0);
  const [currentSkills, setCurrentSkills] = useState<string[]>([
    'HTML', 'CSS', 'JavaScript', 'React', 'Git',
  ]);
  const [newSkillInput, setNewSkillInput] = useState('');

  const targetRole = TARGET_ROLES[selectedRoleIdx];

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newSkillInput.trim();
    if (clean && !currentSkills.some((s) => s.toLowerCase() === clean.toLowerCase())) {
      setCurrentSkills([...currentSkills, clean]);
      setNewSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setCurrentSkills(currentSkills.filter((s) => s !== skill));
  };

  // Compute gaps
  const matchedMustHaves = useMemo(
    () => targetRole.mustHave.filter((s) => currentSkills.some((c) => c.toLowerCase() === s.toLowerCase())),
    [targetRole, currentSkills]
  );

  const missingMustHaves = useMemo(
    () => targetRole.mustHave.filter((s) => !currentSkills.some((c) => c.toLowerCase() === s.toLowerCase())),
    [targetRole, currentSkills]
  );

  const missingGoodToHave = useMemo(
    () => targetRole.goodToHave.filter((s) => !currentSkills.some((c) => c.toLowerCase() === s.toLowerCase())),
    [targetRole, currentSkills]
  );

  const quickWins = useMemo(
    () => targetRole.quickWins.filter((s) => !currentSkills.some((c) => c.toLowerCase() === s.toLowerCase())),
    [targetRole, currentSkills]
  );

  const readinessScore = Math.min(
    100,
    Math.round((matchedMustHaves.length / Math.max(1, targetRole.mustHave.length)) * 100)
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Role & Current Skills Workspace */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Select Target Dream Role</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {TARGET_ROLES.map((r, idx) => (
              <button
                key={r.name}
                type="button"
                onClick={() => setSelectedRoleIdx(idx)}
                className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                  selectedRoleIdx === idx
                    ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>

        {/* Current Skills Tags Input */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-700 block">
            Your Current Skills ({currentSkills.length} Added)
          </label>
          <div className="flex flex-wrap gap-2 items-center">
            {currentSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="hover:text-rose-600 p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            <form onSubmit={handleAddSkill} className="inline-flex items-center gap-1">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                placeholder="+ Add skill..."
                className="w-28 px-2.5 py-1 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </form>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      <div className="space-y-6 animate-fadeIn">
        {/* Readiness Meter */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              Readiness Score
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {readinessScore >= 80
                ? 'High Competency — Ready to Apply'
                : readinessScore >= 50
                ? 'Moderate Gap — Cover 2–3 Key Skills'
                : 'Foundational Stage — Follow Targeted Plan'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              You possess {matchedMustHaves.length} of {targetRole.mustHave.length} core mandatory requirements for {targetRole.name}.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center shrink-0">
            <span className="text-4xl sm:text-5xl font-black text-white">{readinessScore}%</span>
            <span className="text-xs font-bold text-emerald-400 block mt-1 uppercase">Fit Score</span>
          </div>
        </div>

        {/* 3 Categories: High Priority (Must-Have), Good to Have, Quick Wins */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Must Have Gaps */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-rose-700 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Must-Have Gaps ({missingMustHaves.length})</span>
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700">
                High Priority
              </span>
            </div>

            {missingMustHaves.length === 0 ? (
              <p className="text-xs text-emerald-700 font-semibold">✓ You have all mandatory skills!</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {missingMustHaves.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold"
                  >
                    + {s}
                  </span>
                ))}
              </div>
            )}
            <p className="text-[11px] text-slate-500 pt-1">
              Employers filter resumes that lack these core prerequisites.
            </p>
          </div>

          {/* Quick Wins (Under 2 weeks) */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-amber-700 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>2-Week Quick Wins</span>
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700">
                Fast Boost
              </span>
            </div>

            {quickWins.length === 0 ? (
              <p className="text-xs text-slate-500">You already possess key quick-win topics!</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {quickWins.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold"
                  >
                    ⚡ {s}
                  </span>
                ))}
              </div>
            )}
            <p className="text-[11px] text-slate-500 pt-1">
              High-value skills you can learn and add to your resume within 10–14 days.
            </p>
          </div>

          {/* Good to have */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-indigo-700 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Good to Have ({missingGoodToHave.length})</span>
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                Competitive Edge
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {missingGoodToHave.slice(0, 4).map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold"
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Differentiates you from other candidates during final candidate shortlists.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
