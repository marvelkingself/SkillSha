'use client';

import { useState } from 'react';
import {
  Compass,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Clock,
  Sparkles,
  CheckCircle2,
  Briefcase,
  Layers,
} from 'lucide-react';
import {
  findCareerPathsForRole,
  CareerTrajectoryOption,
} from '@/lib/tools/career/career-paths-data';

export default function CareerPathFinderClient() {
  const [currentRole, setCurrentRole] = useState('Frontend Developer');
  const [experience, setExperience] = useState('1–3 Years');
  const [goal, setGoal] = useState('Higher Compensation');
  const [paths, setPaths] = useState<CareerTrajectoryOption[]>(() =>
    findCareerPathsForRole('Frontend Developer')
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentRole.trim()) return;
    const found = findCareerPathsForRole(currentRole);
    setPaths(found);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Search & Configuration Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Your Current Job Role or College Major
              </label>
              <input
                type="text"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                placeholder="e.g. Frontend Developer, Data Analyst, BPO QA, HR Executive..."
                className="w-full p-3 rounded-xl border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Experience Level</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <option value="Fresher (0–1 yr)">Fresher (0–1 yr)</option>
                <option value="1–3 Years">1–3 Years</option>
                <option value="3–5 Years">3–5 Years</option>
                <option value="5+ Years">5+ Years</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Popular:</span>
              {['Frontend Developer', 'Data Analyst', 'Digital Marketing', 'HR Executive', 'BPO QA'].map(
                (r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setCurrentRole(r);
                      setPaths(findCareerPathsForRole(r));
                    }}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                      currentRole.toLowerCase() === r.toLowerCase()
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {r}
                  </button>
                )
              )}
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Map Career Paths</span>
            </button>
          </div>
        </form>
      </div>

      {/* Trajectories Display */}
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Top 3 Career Trajectories for &ldquo;{currentRole}&rdquo;
            </h3>
            <p className="text-xs text-slate-500">
              Ranked by skill overlap, market salary growth, and ease of transition.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paths.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-indigo-600 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                    Option {idx + 1} • {p.domain}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {p.salaryGrowthPotential}
                  </span>
                </div>

                <h4 className="text-lg font-extrabold text-slate-900 leading-snug">{p.targetRole}</h4>

                <p className="text-xs text-slate-600 leading-relaxed">{p.whyGoodFit}</p>

                {/* Transition Ease Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-500">Ease of Transition</span>
                    <span className="text-indigo-600">{p.easePercentage}% Match</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${p.easePercentage}%` }}
                    />
                  </div>
                </div>

                {/* Bridge Skills Needed */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Bridge Skills to Learn:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {p.bridgeSkills.map((bs, bIdx) => (
                      <span
                        key={bIdx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold"
                      >
                        + {bs}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{p.estimatedTimeToTransition}</span>
                </span>
                <span className="font-bold text-indigo-600">High Growth</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
