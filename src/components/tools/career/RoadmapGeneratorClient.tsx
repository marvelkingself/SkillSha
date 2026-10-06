'use client';

import { useState } from 'react';
import {
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Calendar,
  BookOpen,
  FolderGit2,
  Printer,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import {
  generateCareerRoadmap,
  CareerRoadmapResult,
} from '@/lib/tools/career/roadmap-data';

export default function RoadmapGeneratorClient() {
  const [role, setRole] = useState('Frontend Engineer (Next.js / React)');
  const [experience, setExperience] = useState('Fresher (0–1 yr)');
  const [duration, setDuration] = useState<number>(3);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(10);
  const [roadmap, setRoadmap] = useState<CareerRoadmapResult>(() =>
    generateCareerRoadmap('Frontend Engineer (Next.js / React)', 'Fresher (0–1 yr)', 3, 10)
  );

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim()) return;
    const res = generateCareerRoadmap(role, experience, duration, hoursPerWeek);
    setRoadmap(res);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Input Configuration Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Target Role */}
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Target Job Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Frontend Engineer, Data Analyst, Full Stack..."
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Roadmap Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <option value={3}>3 Months (Fast-Track)</option>
                <option value={6}>6 Months (Comprehensive)</option>
                <option value={12}>12 Months (Deep Mastery)</option>
              </select>
            </div>

            {/* Hours per week */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Study Hours / Week</label>
              <select
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <option value={6}>6 Hours / Week (Light)</option>
                <option value={10}>10 Hours / Week (Standard)</option>
                <option value={15}>15 Hours / Week (Intensive)</option>
                <option value={20}>20 Hours / Week (Full-time)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap gap-1.5 text-xs text-slate-500">
              <span className="font-bold text-slate-400">Popular:</span>
              {['Frontend React/Next.js', 'Full Stack Developer', 'Data Analyst', 'DevOps Cloud'].map(
                (r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setRole(r);
                      setRoadmap(generateCareerRoadmap(r, experience, duration, hoursPerWeek));
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
                  >
                    {r}
                  </button>
                )
              )}
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate Roadmap</span>
            </button>
          </div>
        </form>
      </div>

      {/* Roadmap Output Header */}
      {roadmap && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Overview Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-500/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  Target: {roadmap.roleName}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {roadmap.durationMonths}-Month Learning & Portfolio Plan
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">{roadmap.summary}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-4 rounded-2xl bg-white/10 border border-white/20 text-center">
                  <span className="text-2xl sm:text-3xl font-black text-white">{roadmap.totalHours}</span>
                  <span className="text-[11px] font-bold text-emerald-400 block uppercase">
                    Total Hours
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
                  title="Print Roadmap"
                >
                  <Printer className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Timeline Milestones */}
          <div className="space-y-4">
            {roadmap.milestones.map((milestone, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 hover:border-indigo-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-extrabold text-xs uppercase tracking-wider border border-indigo-100">
                      {milestone.period}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{milestone.theme}</span>
                  </div>
                  <span className="text-xs text-slate-400">
                    ~{milestone.learningHoursPerWeek * 4} hours total
                  </span>
                </div>

                <h4 className="text-lg font-bold text-slate-900">{milestone.title}</h4>

                {/* Key Topics */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Key Topics & Concepts:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {milestone.keyTopics.map((topic, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2 text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Portfolio Deliverable */}
                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs space-y-1">
                  <span className="font-bold text-indigo-900 flex items-center gap-1.5">
                    <FolderGit2 className="w-4 h-4 text-indigo-600" />
                    <span>Portfolio Deliverable for this Milestone:</span>
                  </span>
                  <p className="text-slate-700 font-medium pl-5.5">{milestone.portfolioDeliverable}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Capstone Project Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <FolderGit2 className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider block">
                  Final Portfolio Anchor
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900">
                  {roadmap.capstoneProject.title}
                </h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {roadmap.capstoneProject.description}
            </p>

            <div className="space-y-1.5 text-xs text-slate-700">
              <span className="font-bold text-slate-900 block">Deliverables to highlight on your resume:</span>
              {roadmap.capstoneProject.keyDeliverables.map((del, dIdx) => (
                <div key={dIdx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
