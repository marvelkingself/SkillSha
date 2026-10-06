'use client';

import { useState, useMemo } from 'react';
import {
  InterviewDomain,
  ExperienceLevel,
  InterviewType,
  DifficultyLevel,
  InterviewMode,
  InterviewSetupConfig,
} from '@/types/interview';
import {
  detectRoleFromQuery,
  POPULAR_ROLES,
  DetectedRoleResult,
} from '@/lib/tools/interview/role-detector';
import {
  Search,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Briefcase,
  FileText,
  Clock,
  Mic,
  Sliders,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Zap,
} from 'lucide-react';

interface InterviewSetupProps {
  onStart: (config: InterviewSetupConfig) => void;
  onBackToWelcome?: () => void;
  initialFlow?: 'role' | 'resume' | 'jd' | null;
  disabled?: boolean;
}

export default function InterviewSetup({
  onStart,
  onBackToWelcome,
  initialFlow = 'role',
  disabled = false,
}: InterviewSetupProps) {
  // Setup Step state (1: Role, 2: Experience, 3: Type, 4: Personalization & Start)
  const [currentStep, setCurrentStep] = useState<number>(
    initialFlow === 'resume' || initialFlow === 'jd' ? 1 : 1
  );

  // Search Query & Role Detection
  const [roleSearch, setRoleSearch] = useState<string>(
    initialFlow === 'resume' ? 'Software Developer' : ''
  );
  const [detectedRole, setDetectedRole] = useState<DetectedRoleResult>(() =>
    detectRoleFromQuery(initialFlow === 'resume' ? 'Software Developer' : 'Software Developer')
  );
  const [hasConfirmedRole, setHasConfirmedRole] = useState(false);

  // Step 2: Experience
  const [experience, setExperience] = useState<ExperienceLevel>('1–2 Years');
  const [customExp, setCustomExp] = useState('');
  const [isCustomExp, setIsCustomExp] = useState(false);

  // Step 3: Interview Type
  const [interviewType, setInterviewType] = useState<InterviewType>('Full Mock Interview');
  const [showTypeCustomizer, setShowTypeCustomizer] = useState(false);

  // Step 4: Personalization (Resume / JD)
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [personalizationTab, setPersonalizationTab] = useState<'none' | 'resume' | 'jd'>(
    initialFlow === 'resume' ? 'resume' : initialFlow === 'jd' ? 'jd' : 'none'
  );

  // Advanced Options (Collapsed by default)
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Medium');
  const [mode, setMode] = useState<InterviewMode>('text');
  const [questionCount, setQuestionCount] = useState<number>(6);

  // Handle Search Input Change
  const handleRoleInputChange = (val: string) => {
    setRoleSearch(val);
    if (val.trim().length >= 2) {
      const detected = detectRoleFromQuery(val);
      setDetectedRole(detected);
    }
  };

  const handleSelectPopularRole = (roleName: string) => {
    setRoleSearch(roleName);
    const detected = detectRoleFromQuery(roleName);
    setDetectedRole(detected);
    setHasConfirmedRole(true);
  };

  // Step Navigation
  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(4, prev + 1));
  };

  const goToPrevStep = () => {
    if (currentStep === 1 && onBackToWelcome) {
      onBackToWelcome();
    } else {
      setCurrentStep((prev) => Math.max(1, prev - 1));
    }
  };

  // Final Submit
  const handleFinalStart = () => {
    const config: InterviewSetupConfig = {
      domain: detectedRole.domain,
      roleId: detectedRole.roleId,
      roleName: detectedRole.roleName,
      experience: isCustomExp && customExp ? (`${customExp} Years` as ExperienceLevel) : experience,
      type: interviewType,
      difficulty,
      mode,
      resumeText: resumeText.trim() || undefined,
      jobDescription: jobDescription.trim() || undefined,
      totalQuestionsTarget: questionCount,
    };
    onStart(config);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
      {/* Minimal Header & Progress Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <button
            type="button"
            onClick={goToPrevStep}
            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-900">Step {currentStep}</span>
            <span>of 4</span>
          </div>
        </div>

        {/* 4-Step Pill Progress Track */}
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((stepNum) => (
            <div
              key={stepNum}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentStep >= stepNum ? 'bg-indigo-600' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP 1: WHAT ROLE ARE YOU PREPARING FOR? */}
      {/* ========================================================================= */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              What role are you preparing for?
            </h2>
            <p className="text-slate-600 text-sm">
              Choose your role and we&apos;ll customize the interview questions and evaluation for you.
            </p>
          </div>

          {/* Large Search Box */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5 text-indigo-600" />
            </div>
            <input
              type="text"
              value={roleSearch}
              onChange={(e) => {
                handleRoleInputChange(e.target.value);
                setHasConfirmedRole(false);
              }}
              placeholder="e.g. Next.js Developer, HR Executive, BPO QA, Digital Marketing..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-slate-300 focus:border-indigo-600 focus:outline-none text-slate-900 placeholder-slate-400 text-base font-medium shadow-sm transition-all"
              autoFocus
            />
          </div>

          {/* Popular Roles Chips */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Popular Roles
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_ROLES.map((role) => {
                const isSelected =
                  detectedRole.roleName.toLowerCase() === role.name.toLowerCase() &&
                  roleSearch.toLowerCase() === role.name.toLowerCase();
                return (
                  <button
                    key={role.roleId}
                    type="button"
                    onClick={() => handleSelectPopularRole(role.name)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {role.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Smart Role Detection Confirmation Box */}
          {detectedRole && (
            <div className="p-5 rounded-2xl bg-indigo-50/80 border border-indigo-100 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Got it! You&apos;re preparing for a {detectedRole.roleName} interview.</span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                <span className="font-semibold text-slate-700">Domain:</span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-indigo-200 text-indigo-700 font-medium">
                  {detectedRole.domain}
                </span>

                <span className="font-semibold text-slate-700 ml-2">Key Skills:</span>
                <span className="text-slate-600">
                  {detectedRole.keySkills.slice(0, 4).join(', ')}...
                </span>
              </div>
            </div>
          )}

          {/* Continue Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={goToNextStep}
              className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: EXPERIENCE SELECTION */}
      {/* ========================================================================= */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How much experience do you have?
            </h2>
            <p className="text-slate-600 text-sm">
              Questions will automatically adjust in complexity and seniority based on your level.
            </p>
          </div>

          {/* 4 Simple Experience Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              {
                level: 'Fresher' as ExperienceLevel,
                title: '🌱 Fresher',
                desc: 'Just starting my career / campus graduate',
              },
              {
                level: '1–2 Years' as ExperienceLevel,
                title: '🚀 1–2 Years',
                desc: 'Early career / junior professional',
              },
              {
                level: '3–5 Years' as ExperienceLevel,
                title: '💼 3–5 Years',
                desc: 'Mid-level experienced professional',
              },
              {
                level: '5–8 Years' as ExperienceLevel,
                title: '🏆 5+ Years',
                desc: 'Senior / team lead / specialist',
              },
            ].map((item) => {
              const isSelected = !isCustomExp && experience === item.level;
              return (
                <button
                  key={item.level}
                  type="button"
                  onClick={() => {
                    setIsCustomExp(false);
                    setExperience(item.level);
                  }}
                  className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/60 border-indigo-600 shadow-md shadow-indigo-500/10'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-base text-slate-900">{item.title}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </div>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Other / Custom Experience Toggle */}
          <div className="pt-1">
            {!isCustomExp ? (
              <button
                type="button"
                onClick={() => setIsCustomExp(true)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                + Custom or 8+ years experience
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={customExp}
                  onChange={(e) => setCustomExp(e.target.value)}
                  placeholder="e.g. 10"
                  className="w-24 px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <span className="text-xs text-slate-600 font-medium">Years of experience</span>
                <button
                  type="button"
                  onClick={() => setIsCustomExp(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 ml-auto"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Continue Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={goToNextStep}
              className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: WHAT KIND OF INTERVIEW? */}
      {/* ========================================================================= */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              What kind of interview?
            </h2>
            <p className="text-slate-600 text-sm">
              We recommend the complete mock, or you can practice a specific round.
            </p>
          </div>

          {/* Smart Recommendation Banner Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Recommended by Hiring Managers
              </span>
              <span className="text-xs font-bold text-emerald-400">Best Realistic Practice</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">Full {detectedRole.roleName} Mock Interview</h3>
              <p className="text-slate-300 text-xs sm:text-sm">
                A 360-degree evaluation covering technical fundamentals, situational problem solving, and behavioral STAR questions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>HR & background fit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Role technical depth</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Scenario problem solving</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Real-time follow-up probing</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setInterviewType('Full Mock Interview');
                  goToNextStep();
                }}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Start Recommended Interview →</span>
              </button>

              <button
                type="button"
                onClick={() => setShowTypeCustomizer(!showTypeCustomizer)}
                className="text-xs font-semibold text-indigo-300 hover:text-white underline underline-offset-4 py-2"
              >
                {showTypeCustomizer ? 'Hide Other Rounds' : 'Choose Specific Round'}
              </button>
            </div>
          </div>

          {/* Role-Aware Specific Interview Rounds (Expandable or visible when chosen) */}
          {showTypeCustomizer && (
            <div className="space-y-3 pt-2 animate-fadeIn">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Or Select a Target Round
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {detectedRole.interviewTypeOptions.map((opt) => {
                  const isSelected = interviewType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setInterviewType(opt.id as InterviewType)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50/70 border-indigo-600 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-slate-900">{opt.title}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2">{opt.description}</p>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={goToNextStep}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Continue with {interviewType} →</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 4: OPTIONAL PERSONALIZATION & FINAL CONFIRMATION */}
      {/* ========================================================================= */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Want a more personalized interview?
            </h2>
            <p className="text-slate-600 text-sm">
              Optional: Attach your resume or job description so AI asks about your real projects.
            </p>
          </div>

          {/* 3 Option Tabs: Resume | JD | Skip */}
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => setPersonalizationTab(personalizationTab === 'resume' ? 'none' : 'resume')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                personalizationTab === 'resume'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>📄 Resume</span>
            </button>

            <button
              type="button"
              onClick={() => setPersonalizationTab(personalizationTab === 'jd' ? 'none' : 'jd')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                personalizationTab === 'jd'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>📋 Job Description</span>
            </button>

            <button
              type="button"
              onClick={() => setPersonalizationTab('none')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                personalizationTab === 'none'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>⚡ Skip</span>
            </button>
          </div>

          {/* Resume Tab Content */}
          {personalizationTab === 'resume' && (
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 animate-fadeIn">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Paste Your Resume Summary or Project Highlights</span>
                <span className="text-[11px] text-slate-400 font-normal">Optional</span>
              </label>
              <textarea
                rows={4}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste key experience, tech stack, past companies, and project achievements..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          )}

          {/* JD Tab Content */}
          {personalizationTab === 'jd' && (
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 animate-fadeIn">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Paste Target Job Description (JD)</span>
                <span className="text-[11px] text-slate-400 font-normal">Optional</span>
              </label>
              <textarea
                rows={4}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste role requirements, responsibilities, or company profile..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          )}

          {/* Collapsible Advanced Options */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
            >
              <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-slate-400" />
                <span>⚙️ Advanced Options</span>
              </span>
              {showAdvanced ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {showAdvanced && (
              <div className="p-4 pt-0 border-t border-slate-100 space-y-4 text-xs bg-slate-50/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Difficulty</label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs"
                    >
                      <option value="Easy">Easy (Foundation / Entry)</option>
                      <option value="Medium">Medium (Adaptive / Standard)</option>
                      <option value="Hard">Hard (In-depth scrutiny)</option>
                      <option value="Expert">Expert (FAANG / Senior Level)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Interview Mode</label>
                    <select
                      value={mode}
                      onChange={(e) => setMode(e.target.value as InterviewMode)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs"
                    >
                      <option value="text">Text (Type answers)</option>
                      <option value="voice">Voice (Speak via microphone)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Final Summary Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Your Interview Summary
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Role</span>
                <span className="font-bold text-slate-900 truncate block">{detectedRole.roleName}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Experience</span>
                <span className="font-bold text-slate-900 truncate block">
                  {isCustomExp && customExp ? `${customExp} Yrs` : experience}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Type</span>
                <span className="font-bold text-slate-900 truncate block">{interviewType}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Mode</span>
                <span className="font-bold text-slate-900 truncate block capitalize">{mode}</span>
              </div>
            </div>
          </div>

          {/* Start CTA */}
          <div className="text-center space-y-2 pt-2">
            <button
              type="button"
              disabled={disabled}
              onClick={handleFinalStart}
              className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 text-white font-extrabold text-base shadow-xl shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>🚀 Start Interview</span>
            </button>
            <p className="text-xs text-slate-500">
              Your AI interviewer will ask one question at a time.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
