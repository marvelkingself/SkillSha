'use client';

import { useState } from 'react';
import {
  InterviewDomain,
  ExperienceLevel,
  InterviewType,
  DifficultyLevel,
  InterviewMode,
  InterviewSetupConfig,
  RoleConfig,
} from '@/types/interview';
import {
  INTERVIEW_DOMAINS_CONFIG,
  getDomainConfig,
} from '@/config/interview/domains';
import {
  Sparkles,
  ArrowRight,
  Briefcase,
  Clock,
  Layers,
  Gauge,
  Mic,
  FileText,
  Building,
  CheckCircle2,
  Code,
  Headphones,
  TrendingUp,
  Users,
  Target,
  DollarSign,
} from 'lucide-react';

interface InterviewSetupProps {
  onStart: (config: InterviewSetupConfig) => void;
  disabled?: boolean;
}

const DOMAIN_ICONS: Record<string, React.ElementType> = {
  'IT & Software': Code,
  BPO: Headphones,
  'Digital Marketing': TrendingUp,
  HR: Users,
  Sales: Target,
  Finance: DollarSign,
  Management: Briefcase,
};

export default function InterviewSetup({ onStart, disabled = false }: InterviewSetupProps) {
  const [domain, setDomain] = useState<InterviewDomain>('IT & Software');
  const [selectedRole, setSelectedRole] = useState<RoleConfig>(
    INTERVIEW_DOMAINS_CONFIG[0].roles[0]
  );
  const [experience, setExperience] = useState<ExperienceLevel>('1–2 Years');
  const [type, setType] = useState<InterviewType>('Technical Interview');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Medium');
  const [mode, setMode] = useState<InterviewMode>('voice');
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [activeTab, setActiveTab] = useState<'resume' | 'jd'>('resume');

  const currentDomainConfig = getDomainConfig(domain);

  const handleDomainChange = (newDomain: InterviewDomain) => {
    setDomain(newDomain);
    const cfg = getDomainConfig(newDomain);
    if (cfg && cfg.roles.length > 0) {
      setSelectedRole(cfg.roles[0]);
    }
  };

  const handleStart = () => {
    onStart({
      domain,
      roleId: selectedRole.id,
      roleName: selectedRole.name,
      experience,
      type,
      difficulty,
      mode,
      resumeText: resumeText.trim() || undefined,
      jobDescription: jobDescription.trim() || undefined,
      totalQuestionsTarget: 5,
    });
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Step 1: Select Domain & Designation */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
            1
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Select Your Domain & Job Role
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              The AI interviewer customizes all questions to your exact professional field.
            </p>
          </div>
        </div>

        {/* Domain Pills */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Professional Domain
          </label>
          <div className="flex flex-wrap gap-2">
            {INTERVIEW_DOMAINS_CONFIG.map((d) => {
              const Icon = DOMAIN_ICONS[d.name] || Briefcase;
              const isSelected = domain === d.name;
              return (
                <button
                  key={d.name}
                  type="button"
                  onClick={() => handleDomainChange(d.name)}
                  className={`py-2 px-3.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{d.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Roles Selector Grid */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Target Designation / Role ({currentDomainConfig?.roles.length || 0} roles)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
            {currentDomainConfig?.roles.map((r) => {
              const isSelected = selectedRole.id === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRole(r)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100'
                      : 'border-slate-200 dark:border-white/10 hover:border-slate-300 bg-slate-50/30 dark:bg-zinc-800/30 text-slate-800 dark:text-zinc-200'
                  }`}
                >
                  <div className="font-bold text-xs leading-snug">{r.name}</div>
                  <div className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                    {r.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step 2: Experience & Difficulty */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
            2
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Experience Level & Difficulty
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Questions adapt from fundamentals for freshers to architecture and leadership for seniors.
            </p>
          </div>
        </div>

        {/* Experience Pills */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Years of Experience</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              'Fresher',
              '0–1 Year',
              '1–2 Years',
              '2–3 Years',
              '3–5 Years',
              '5–8 Years',
              '8+ Years',
            ].map((exp) => (
              <button
                key={exp}
                type="button"
                onClick={() => setExperience(exp as ExperienceLevel)}
                className={`py-2 px-3.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  experience === exp
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10 hover:border-slate-300'
                }`}
              >
                {exp}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5" />
            <span>Initial Difficulty Level</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'Easy', desc: 'Core fundamentals & direct questions' },
              { id: 'Medium', desc: 'Standard interview scenarios & implementation' },
              { id: 'Hard', desc: 'Edge cases, system design & debugging' },
              { id: 'Expert', desc: 'Deep architectural tradeoffs & leadership' },
            ].map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDifficulty(d.id as DifficultyLevel)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  difficulty === d.id
                    ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40'
                    : 'border-slate-200 dark:border-white/10 hover:border-slate-300 bg-slate-50/30 dark:bg-zinc-800/30'
                }`}
              >
                <div className="font-bold text-xs text-slate-900 dark:text-white">{d.id}</div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5 leading-tight">
                  {d.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Step 3: Interview Type & Mode */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
            3
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Interview Type & Interaction Mode
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Select specific interview focus and whether you want to speak aloud or type answers.
            </p>
          </div>
        </div>

        {/* Types */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              id: 'Technical Interview',
              label: 'Technical Interview',
              desc: 'Role-specific coding, tools, architecture, and technical workflows.',
            },
            {
              id: 'HR Interview',
              label: 'HR Interview',
              desc: 'Culture fit, career milestones, strengths, conflict resolution & compensation.',
            },
            {
              id: 'Behavioral Interview',
              label: 'Behavioral (STAR)',
              desc: 'Situation, Task, Action, and Result structured scenario questions.',
            },
            {
              id: 'Managerial Interview',
              label: 'Managerial Interview',
              desc: 'Leadership, cross-functional collaboration, ownership and decision making.',
            },
            {
              id: 'Domain Interview',
              label: 'Domain Specific',
              desc: 'Industry frameworks, compliance, KPIs, and operational standards.',
            },
            {
              id: 'Full Mock Interview',
              label: 'Full Mock Interview',
              desc: 'Comprehensive blend of HR, Technical, Behavioral, and Situational questions.',
            },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setType(t.id as InterviewType)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                type === t.id
                  ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40'
                  : 'border-slate-200 dark:border-white/10 hover:border-slate-300 bg-slate-50/30 dark:bg-zinc-800/30'
              }`}
            >
              <div className="font-bold text-xs text-slate-900 dark:text-white">{t.label}</div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1 leading-snug">
                {t.desc}
              </div>
            </button>
          ))}
        </div>

        {/* Mode: Voice vs Text */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Interaction Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMode('voice')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                mode === 'voice'
                  ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40'
                  : 'border-slate-200 dark:border-white/10 hover:border-slate-300 bg-slate-50/30 dark:bg-zinc-800/30'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Mic className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs text-slate-900 dark:text-white">
                  Voice Mode (Recommended)
                </div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                  Answer via microphone with live transcription, speaking pace timer, and filler-word detection.
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMode('text')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                mode === 'text'
                  ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40'
                  : 'border-slate-200 dark:border-white/10 hover:border-slate-300 bg-slate-50/30 dark:bg-zinc-800/30'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-zinc-200 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs text-slate-900 dark:text-white">
                  Text Mode
                </div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                  Type answers in a distraction-free text editor. Perfect for noisy environments.
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Step 4: Optional Resume & Job Description Customization */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
              4
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Resume & Target Job Alignment <span className="text-xs text-slate-400 font-normal">(Optional)</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Paste your resume or target JD so the AI probes your exact projects and required skills.
              </p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-zinc-800 flex gap-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('resume')}
              className={`py-1 px-3 rounded-lg cursor-pointer ${
                activeTab === 'resume'
                  ? 'bg-white dark:bg-zinc-900 text-blue-600 shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Resume
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('jd')}
              className={`py-1 px-3 rounded-lg cursor-pointer ${
                activeTab === 'jd'
                  ? 'bg-white dark:bg-zinc-900 text-blue-600 shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Job Description
            </button>
          </div>
        </div>

        {activeTab === 'resume' ? (
          <div className="space-y-1.5">
            <textarea
              rows={4}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume summary, key projects, and technologies here (e.g. 'Built an e-commerce platform using Next.js 14 and Stripe...')"
              className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
            />
            <p className="text-[11px] text-slate-400">
              The AI will cross-examine the projects and tools listed in your resume.
            </p>
          </div>
        ) : (
          <div className="space-y-1.5">
            <textarea
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the target job description here (e.g. 'Looking for a Senior Next.js developer with expertise in AWS, caching, and GraphQL...')"
              className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
            />
            <p className="text-[11px] text-slate-400">
              The AI will align questions directly with this job specification.
            </p>
          </div>
        )}
      </div>

      {/* Start Interview CTA */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 font-extrabold text-sm uppercase tracking-wider text-blue-200">
            <Sparkles className="w-4 h-4" />
            <span>Ready to Begin</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black">
            {selectedRole.name} • {type}
          </h3>
          <p className="text-xs text-blue-100">
            {experience} • {difficulty} Difficulty • {mode === 'voice' ? 'Voice Interview' : 'Text Interview'}
          </p>
        </div>

        <button
          type="button"
          disabled={disabled}
          onClick={handleStart}
          className="py-4 px-8 rounded-2xl bg-white text-blue-600 font-black text-sm sm:text-base hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer shrink-0 disabled:opacity-60"
        >
          <span>Start Interview</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
