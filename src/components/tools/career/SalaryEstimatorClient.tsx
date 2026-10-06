'use client';

import { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
  Building,
  MapPin,
  Sparkles,
  Award,
  Layers,
  CheckCircle2,
  Sliders,
  ShieldCheck,
} from 'lucide-react';
import {
  SALARY_BENCHMARKS,
  CITY_MULTIPLIERS,
  calculateEstimatedSalary,
} from '@/lib/tools/career/salary-data';

export default function SalaryEstimatorClient() {
  const [selectedRole, setSelectedRole] = useState(SALARY_BENCHMARKS[0].roleId);
  const [experienceLevel, setExperienceLevel] = useState('1–3 Years');
  const [selectedCity, setSelectedCity] = useState('Bangalore');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Next.js App Router & SSR']);

  const currentBenchmark = useMemo(
    () => SALARY_BENCHMARKS.find((b) => b.roleId === selectedRole) || SALARY_BENCHMARKS[0],
    [selectedRole]
  );

  const salaryEstimate = useMemo(() => {
    return calculateEstimatedSalary(selectedRole, experienceLevel, selectedCity, selectedSkills);
  }, [selectedRole, experienceLevel, selectedCity, selectedSkills]);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Configuration Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* 1. Role */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Target Designation</label>
            <select
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setSelectedSkills([]);
              }}
              className="w-full p-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              {SALARY_BENCHMARKS.map((b) => (
                <option key={b.roleId} value={b.roleId}>
                  {b.roleName}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Experience */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Experience Level</label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="Fresher">Fresher (0–1 yr)</option>
              <option value="1–3 Years">1–3 Years (Early Career)</option>
              <option value="3–5 Years">3–5 Years (Mid-level)</option>
              <option value="5–8 Years">5–8 Years (Senior)</option>
              <option value="8+ Years">8+ Years (Lead / Architect)</option>
            </select>
          </div>

          {/* 3. Location */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">City / Location</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              {Object.keys(CITY_MULTIPLIERS).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* High-Value Premium Skills Toggle */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-700 block">
            Select Your Premium Skills (Each boosts compensation)
          </label>
          <div className="flex flex-wrap gap-2">
            {currentBenchmark.highValueSkills.map((hvs) => {
              const active = selectedSkills.includes(hvs.skill);
              return (
                <button
                  key={hvs.skill}
                  type="button"
                  onClick={() => toggleSkill(hvs.skill)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    active
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>{hvs.skill}</span>
                  <span className={`ml-1.5 text-[10px] font-bold ${active ? 'text-indigo-200' : 'text-emerald-600'}`}>
                    +{hvs.boostPercentage}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Salary Estimate Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-indigo-500/20 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-indigo-800/40">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Market Compensation Benchmark
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {salaryEstimate.roleName}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              {salaryEstimate.experienceLevel} • {salaryEstimate.city} ({salaryEstimate.cityNote})
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-right">
            <span className="text-xs text-slate-300 uppercase block font-semibold">Median CTC</span>
            <span className="text-3xl sm:text-4xl font-black text-white">
              ₹{salaryEstimate.medianLpa} <span className="text-base font-normal text-slate-400">LPA</span>
            </span>
          </div>
        </div>

        {/* Range Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Min */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">25th Percentile</span>
            <p className="text-2xl font-bold text-white">₹{salaryEstimate.minLpa} LPA</p>
            <p className="text-[11px] text-slate-400">
              Approx. ₹{salaryEstimate.approxMonthlyInHandMin.toLocaleString()} / mo in-hand
            </p>
          </div>

          {/* Median */}
          <div className="p-4 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 space-y-1">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wide">50th (Target Market)</span>
            <p className="text-2xl font-black text-emerald-400">₹{salaryEstimate.medianLpa} LPA</p>
            <p className="text-[11px] text-slate-300">
              Approx. ₹{salaryEstimate.approxMonthlyInHandMedian.toLocaleString()} / mo in-hand
            </p>
          </div>

          {/* Max */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">75th Percentile (Top Tier)</span>
            <p className="text-2xl font-bold text-white">₹{salaryEstimate.maxLpa} LPA</p>
            <p className="text-[11px] text-slate-400">
              Approx. ₹{salaryEstimate.approxMonthlyInHandMax.toLocaleString()} / mo in-hand
            </p>
          </div>
        </div>

        {/* Breakdown bar */}
        <div className="space-y-2 pt-2 text-xs">
          <span className="font-bold text-slate-300 block">Typical Indian Compensation Split:</span>
          <div className="h-3 rounded-full bg-white/10 overflow-hidden flex">
            <div className="bg-indigo-500 h-full w-[70%]" title="Base Salary (70%)" />
            <div className="bg-emerald-500 h-full w-[15%]" title="Performance Bonus / Variable (15%)" />
            <div className="bg-amber-500 h-full w-[15%]" title="PF, Gratuity & Benefits (15%)" />
          </div>
          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" /> Base Pay (~70%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Annual Variable (~15%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> PF & Retirals (~15%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
