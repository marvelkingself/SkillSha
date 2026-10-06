'use client';

import { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  Sparkles,
  Award,
  CheckCircle2,
  User,
  Sliders,
  TrendingUp,
} from 'lucide-react';

export default function LinkedinOptimizerClient() {
  const [role, setRole] = useState('Frontend Engineer (Next.js & React)');
  const [skills, setSkills] = useState('Next.js 15, React, TypeScript, Core Web Vitals, Tailwind CSS');
  const [achievement, setAchievement] = useState(
    'Reduced website load times by 45% and built multi-tenant SaaS dashboards for 50k+ active users.'
  );
  const [targetAudience, setTargetAudience] = useState('High-Growth Startups & Product MNCs');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Generate 5 High-CTR Headlines
  const headlines = [
    `${role} | Next.js 15 • React • TypeScript | Architecting sub-second web applications | Open to Full-Time / Remote Opportunities`,
    `Frontend Engineer @ Stealth | Building high-performance SaaS with React & Next.js | Reduced LCP by 45% | TypeScript Enthusiast`,
    `${role} helping product companies turn complex user flows into accessible, high-converting digital experiences | React • Next.js • Tailwind`,
    `Frontend Specialist | Next.js App Router • React 19 • State Architecture | Scaled products to 50k+ MAU | Open to high-impact engineering roles`,
    `Frontend Engineer | Crafting pixel-perfect, accessible & scalable web products | Next.js • TypeScript • Cloud Deployments`,
  ];

  // Generate Storytelling "About" Section
  const aboutBio = `Most users bounce if a web application takes longer than 2.5 seconds to render. I build frontend architectures designed to never let that happen.

As a ${role} with hands-on experience in ${skills}, I partner with design and engineering teams to transform complex product specifications into intuitive, blazing-fast web software.

What I bring to the table:
• High-Impact Architecture: ${achievement}
• Modern Engineering Stack: Specializing in Next.js App Router, React 19, TypeScript, and accessible Tailwind CSS design tokens.
• Product-First Mindset: I bridge the gap between engineering velocity and pixel-perfect design, ensuring every feature directly moves the needle on user retention and conversion.

Outside of daily sprint delivery, I am deeply passionate about open-source tooling, modern CSS animations, and mentoring early-career developers.

🚀 Currently open to high-impact Frontend & Full Stack engineering roles across ${targetAudience}.

📫 Let's connect or drop me an email: yourname@email.com
🔗 Portfolio & Projects: github.com/yourhandle`;

  const topSkillsToPin = [
    'Next.js',
    'React.js',
    'TypeScript',
    'Frontend Architecture',
    'Performance Optimization',
  ];

  const recruiterKeywords = [
    'Next.js 15', 'React.js', 'TypeScript', 'App Router', 'Server Components',
    'Tailwind CSS', 'Redux', 'REST APIs', 'Core Web Vitals', 'Software Engineering',
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Inputs Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Target Designation / Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Primary Tech Stack / Skills</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Proudest Metric / Achievement</label>
            <input
              type="text"
              value={achievement}
              onChange={(e) => setAchievement(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Target Company Culture</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Generated Outputs */}
      <div className="space-y-6">
        {/* 1. 5 High-CTR Headlines */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
                LinkedIn Recruiter Search Rankers
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                5 High-CTR Profile Headlines (Under 220 Characters)
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {headlines.map((hl, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-colors flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Option {idx + 1}</span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">{hl}</p>
                  <span className="text-[10px] text-slate-400 block pt-0.5">{hl.length} / 220 characters</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(hl, `hl-${idx}`)}
                  className="shrink-0 p-2 rounded-xl bg-white border border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 transition-colors cursor-pointer"
                  title="Copy Headline"
                >
                  {copiedKey === `hl-${idx}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Storytelling About Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
                High-Conversion Storytelling
              </span>
              <h3 className="text-lg font-bold text-slate-900">Optimized &ldquo;About&rdquo; Bio</h3>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(aboutBio, 'about')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              {copiedKey === 'about' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'about' ? 'Copied Bio!' : 'Copy About Section'}</span>
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
            {aboutBio}
          </div>
        </div>

        {/* 3. Top Skills to Pin & Recruiter SEO Keywords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              <span>Top 5 Skills to Pin for Endorsements</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {topSkillsToPin.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"
                >
                  ⭐ {s}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              LinkedIn Recruiter algorithms weigh your top 5 pinned skills heavily when generating search results.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Recruiter Search SEO Keywords</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {recruiterKeywords.map((k) => (
                <span
                  key={k}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium"
                >
                  {k}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Sprinkle these keywords naturally in your Experience bullet points to appear in recruiter searches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
