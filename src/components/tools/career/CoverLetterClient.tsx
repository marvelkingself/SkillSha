'use client';

import { useState } from 'react';
import {
  Mail,
  Copy,
  Check,
  Printer,
  Sparkles,
  RotateCcw,
  Building,
  Briefcase,
  User,
  Sliders,
  FileText,
} from 'lucide-react';

type LetterTone = 'professional' | 'impact' | 'short';

export default function CoverLetterClient() {
  const [candidateName, setCandidateName] = useState('Rahul Sharma');
  const [targetRole, setTargetRole] = useState('Senior Frontend Engineer');
  const [companyName, setCompanyName] = useState('Stripe');
  const [hiringManager, setHiringManager] = useState('Engineering Hiring Team');
  const [experienceYears, setExperienceYears] = useState('3');
  const [keySkills, setKeySkills] = useState('React, Next.js 15, TypeScript, Web Vitals, Tailwind CSS');
  const [topAchievement, setTopAchievement] = useState(
    'Reduced checkout page load times by 45% and scaled a customer dashboard to 50k+ active users.'
  );
  const [tone, setTone] = useState<LetterTone>('impact');
  const [copied, setCopied] = useState(false);

  // Generate Letter based on inputs & tone
  const generateLetterText = (): string => {
    const dateStr = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    if (tone === 'short') {
      return `Dear ${hiringManager || 'Hiring Team'} at ${companyName},

I am writing to express my strong interest in the ${targetRole} opening at ${companyName}. With over ${experienceYears} years of hands-on experience specializing in ${keySkills}, I have consistently built high-performance, resilient user interfaces.

Most notably, I ${topAchievement}

${companyName}'s commitment to engineering craft and user experience deeply resonates with me. I would welcome the opportunity to discuss how my technical expertise and problem-solving mindset can contribute to your team's upcoming milestones.

Thank you for your time and consideration.

Warm regards,

${candidateName}
Email: ${candidateName.toLowerCase().replace(/\s+/g, '.')}@email.com
LinkedIn: linkedin.com/in/${candidateName.toLowerCase().replace(/\s+/g, '-')}`;
    }

    if (tone === 'impact') {
      return `${dateStr}

To the ${hiringManager || 'Hiring Committee'}
${companyName}

Subject: Application for ${targetRole} — ${candidateName}

Dear ${hiringManager || 'Hiring Manager'},

When I discovered the ${targetRole} opportunity at ${companyName}, I knew my technical background aligned directly with your engineering vision. Having followed ${companyName}'s product trajectory, I have been inspired by how your engineering organization balances developer velocity with rock-solid reliability.

Across my ${experienceYears}+ years in the industry, my core focus has been engineering scalable front-end architectures with ${keySkills}. I thrive at the intersection of technical performance and clean product design:

• High-Impact Execution: In my previous role, I ${topAchievement}
• Modern Standards: I take pride in architecting modular components that prioritize accessibility (WCAG), rigorous unit testing, and sub-second rendering.
• Cross-Functional Collaboration: I work closely with product managers and designers to transform complex user requirements into elegant production software.

What excites me most about joining ${companyName} is the chance to tackle challenging technical bottlenecks at scale and collaborate with an ambitious engineering team.

I have attached my resume for your review and look forward to the possibility of discussing how my skills match your goals for this quarter.

Sincerely,

${candidateName}
Frontend Engineer
Phone: +91 98765 43210 | Email: ${candidateName.toLowerCase().replace(/\s+/g, '.')}@email.com
Portfolio: github.com/${candidateName.toLowerCase().replace(/\s+/g, '')}`;
    }

    // Standard Professional
    return `${dateStr}

${hiringManager || 'Hiring Manager'}
${companyName}

Dear ${hiringManager || 'Hiring Manager'},

I am writing to formally submit my application for the position of ${targetRole} at ${companyName}. With a proven track record spanning ${experienceYears} years in software engineering and extensive experience with ${keySkills}, I am eager to bring my capabilities to your esteemed organization.

Throughout my professional career, I have dedicated myself to delivering reliable, maintainable code and solving complex technical problems. A notable highlight of my work includes:

"${topAchievement}"

My technical proficiencies, combined with strong communication skills and an agile mindset, make me confident in my ability to make an immediate, positive impact on ${companyName}'s engineering deliverables.

Thank you for reviewing my application. I welcome the opportunity for an interview to discuss how my background and qualifications will benefit ${companyName}.

Yours sincerely,

${candidateName}
Contact: ${candidateName.toLowerCase().replace(/\s+/g, '.')}@email.com`;
  };

  const letterText = generateLetterText();

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
      {/* LEFT: FORM INPUTS */}
      <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-600" />
            <span>Customize Details</span>
          </h3>
          <span className="text-[11px] text-slate-400 font-semibold uppercase">3 Formats Ready</span>
        </div>

        {/* Tone Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">Cover Letter Style / Tone</label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setTone('impact')}
              className={`py-2 px-2 text-center rounded-lg text-xs font-bold transition-all ${
                tone === 'impact' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Results-Driven
            </button>
            <button
              type="button"
              onClick={() => setTone('professional')}
              className={`py-2 px-2 text-center rounded-lg text-xs font-bold transition-all ${
                tone === 'professional' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Corporate
            </button>
            <button
              type="button"
              onClick={() => setTone('short')}
              className={`py-2 px-2 text-center rounded-lg text-xs font-bold transition-all ${
                tone === 'short' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Short / Direct
            </button>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Your Full Name</label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Target Role</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Target Company</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Experience (Years)</label>
              <input
                type="text"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Hiring Person / Team</label>
              <input
                type="text"
                value={hiringManager}
                onChange={(e) => setHiringManager(e.target.value)}
                placeholder="e.g. Engineering Manager"
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Key Skills & Tech Stack</label>
            <input
              type="text"
              value={keySkills}
              onChange={(e) => setKeySkills(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Top Quantifiable Achievement / Project
            </label>
            <textarea
              rows={3}
              value={topAchievement}
              onChange={(e) => setTopAchievement(e.target.value)}
              placeholder="e.g. Grew organic traffic by 120% in 6 months..."
              className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* RIGHT: LIVE LETTER PREVIEW & ACTIONS */}
      <div className="lg:col-span-7 space-y-4">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-indigo-600" />
            <span>Generated Cover Letter</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Paper Document Preview */}
        <div
          id="cover-letter-printable-area"
          className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-300 shadow-md print:p-0 print:border-none print:shadow-none min-h-[500px]"
        >
          <pre className="font-sans text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap selection:bg-indigo-100">
            {letterText}
          </pre>
        </div>
      </div>
    </div>
  );
}
