'use client';

import { useState } from 'react';
import {
  Printer,
  Copy,
  Check,
  Sparkles,
  Download,
  Plus,
  Trash2,
  Eye,
  Edit3,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
} from 'lucide-react';

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  bullets: string[];
}

interface EducationItem {
  id: string;
  degree: string;
  school: string;
  year: string;
  grade: string;
}

interface ProjectItem {
  id: string;
  name: string;
  tech: string;
  description: string;
  link: string;
}

export default function ResumeBuilderClient() {
  // Pre-filled with realistic sample profile so user gets immediate value
  const [fullName, setFullName] = useState('Rahul Sharma');
  const [title, setTitle] = useState('Frontend Engineer / Next.js Developer');
  const [email, setEmail] = useState('rahul.sharma@email.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [location, setLocation] = useState('Bangalore, India');
  const [linkedIn, setLinkedIn] = useState('linkedin.com/in/rahul-sharma-dev');
  const [portfolio, setPortfolio] = useState('github.com/rahulsharma');

  const [summary, setSummary] = useState(
    'Performance-driven Frontend Engineer with 2+ years of experience building fast, scalable web applications using React, Next.js, and TypeScript. Reduced web vitals LCP by 45% and collaborated in agile cross-functional teams to deliver accessible, conversion-focused enterprise UI.'
  );

  const [skills, setSkills] = useState(
    'Next.js 15, React 19, TypeScript, JavaScript (ES6+), Tailwind CSS, Redux Toolkit, RESTful APIs, Git & GitHub, Jest, Web Performance Optimization, Core Web Vitals, Responsive Design'
  );

  const [experiences, setExperiences] = useState<ExperienceItem[]>([
    {
      id: '1',
      company: 'TechCorp Solutions',
      role: 'Frontend Engineer',
      duration: '06/2023 – Present',
      location: 'Bangalore, India',
      bullets: [
        'Architected and deployed customer-facing SaaS dashboards using Next.js App Router and TypeScript, serving 50,000+ monthly active users.',
        'Optimized Largest Contentful Paint (LCP) from 3.8s to 1.6s, directly increasing checkout conversion rates by 18%.',
        'Implemented reusable component design system with Tailwind CSS and Radix UI primitives, accelerating team sprint velocity by 25%.',
      ],
    },
    {
      id: '2',
      company: 'DigitalWave Agency',
      role: 'Junior Web Developer',
      duration: '08/2022 – 05/2023',
      location: 'Pune, India',
      bullets: [
        'Developed 12+ responsive e-commerce web applications with React, Redux, and RESTful API integrations.',
        'Collaborated with UI/UX designers to implement pixel-perfect Figma designs with 100% WCAG accessibility compliance.',
      ],
    },
  ]);

  const [educations, setEducations] = useState<EducationItem[]>([
    {
      id: '1',
      degree: 'B.Tech in Computer Science & Engineering',
      school: 'Pune University (SPPU)',
      year: '2018 – 2022',
      grade: '8.4 CGPA',
    },
  ]);

  const [projects, setProjects] = useState<ProjectItem[]>([
    {
      id: '1',
      name: 'E-Commerce Analytics Platform',
      tech: 'Next.js 15, TypeScript, Tailwind, Chart.js',
      description:
        'Built full-featured multi-tenant analytics dashboard with automated PDF export, real-time filtering, and Stripe payments.',
      link: 'github.com/rahulsharma/ecommerce-analytics',
    },
  ]);

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: String(Date.now()),
        company: 'New Company Inc.',
        role: 'Job Title',
        duration: 'Month/Year – Present',
        location: 'City, Country',
        bullets: ['Accomplished X as measured by Y by doing Z.'],
      },
    ]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((e) => e.id !== id));
  };

  const updateExpBullet = (expId: string, bulletIdx: number, val: string) => {
    setExperiences(
      experiences.map((exp) => {
        if (exp.id === expId) {
          const nextBullets = [...exp.bullets];
          nextBullets[bulletIdx] = val;
          return { ...exp, bullets: nextBullets };
        }
        return exp;
      })
    );
  };

  const addExpBullet = (expId: string) => {
    setExperiences(
      experiences.map((exp) => {
        if (exp.id === expId) {
          return { ...exp, bullets: [...exp.bullets, 'Spearheaded new initiative resulting in quantifiable improvement.'] };
        }
        return exp;
      })
    );
  };

  const removeExpBullet = (expId: string, bulletIdx: number) => {
    setExperiences(
      experiences.map((exp) => {
        if (exp.id === expId) {
          return { ...exp, bullets: exp.bullets.filter((_, idx) => idx !== bulletIdx) };
        }
        return exp;
      })
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const textOutput = `
${fullName.toUpperCase()}
${title}
Email: ${email} | Phone: ${phone} | Location: ${location}
LinkedIn: ${linkedIn} | Portfolio: ${portfolio}

PROFESSIONAL SUMMARY
${summary}

CORE SKILLS
${skills}

PROFESSIONAL EXPERIENCE
${experiences
  .map(
    (e) => `
${e.role.toUpperCase()} - ${e.company} (${e.duration}) | ${e.location}
${e.bullets.map((b) => `• ${b}`).join('\n')}
`
  )
  .join('\n')}

EDUCATION
${educations
  .map(
    (ed) => `
${ed.degree}
${ed.school} (${ed.year}) - Grade: ${ed.grade}
`
  )
  .join('\n')}

PROJECTS
${projects
  .map(
    (p) => `
${p.name} | ${p.tech} | ${p.link}
• ${p.description}
`
  )
  .join('\n')}
`.trim();

    navigator.clipboard.writeText(textOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Action Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'editor'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5" /> Edit Resume
              </span>
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'preview'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> ATS Preview
              </span>
            </button>
          </div>
          <span className="text-xs text-emerald-600 font-semibold hidden md:inline flex items-center gap-1">
            ✓ 100% ATS Compliant Layout
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleCopyText}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Plain Text!' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download PDF / Print</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* FORM EDITOR COLUMN */}
        <div
          className={`space-y-6 lg:col-span-6 ${
            activeTab === 'preview' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* 1. Contact Information */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-600" /> Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Target Designation
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  City, Country
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  LinkedIn Profile
                </label>
                <input
                  type="text"
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>
          </div>

          {/* 2. Professional Summary */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" /> Professional Summary
            </h3>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* 3. Core Skills */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Wrench className="w-4 h-4 text-indigo-600" /> Core Skills & Technologies
            </h3>
            <p className="text-[11px] text-slate-500">Comma-separated skills recognized by ATS algorithms</p>
            <textarea
              rows={2}
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* 4. Work Experience */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-600" /> Work Experience
              </h3>
              <button
                type="button"
                onClick={addExperience}
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                <Plus className="w-3.5 h-3.5" /> Add Experience
              </button>
            </div>

            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Company & Role</span>
                    {experiences.length > 1 && (
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="text-rose-500 hover:text-rose-700 p-1"
                        title="Delete this role"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) =>
                        setExperiences(
                          experiences.map((x) => (x.id === exp.id ? { ...x, role: e.target.value } : x))
                        )
                      }
                      placeholder="Role (e.g. Senior Frontend Dev)"
                      className="p-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 font-semibold"
                    />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) =>
                        setExperiences(
                          experiences.map((x) => (x.id === exp.id ? { ...x, company: e.target.value } : x))
                        )
                      }
                      placeholder="Company Name"
                      className="p-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 font-semibold"
                    />
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) =>
                        setExperiences(
                          experiences.map((x) => (x.id === exp.id ? { ...x, duration: e.target.value } : x))
                        )
                      }
                      placeholder="Duration (MM/YYYY – Present)"
                      className="p-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-700"
                    />
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) =>
                        setExperiences(
                          experiences.map((x) => (x.id === exp.id ? { ...x, location: e.target.value } : x))
                        )
                      }
                      placeholder="Location (e.g. Bangalore, India)"
                      className="p-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-700"
                    />
                  </div>

                  {/* Bullets */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">
                      Achievement Bullet Points
                    </span>
                    {exp.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-1.5">
                        <textarea
                          rows={2}
                          value={b}
                          onChange={(e) => updateExpBullet(exp.id, bIdx, e.target.value)}
                          className="flex-1 p-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-800"
                        />
                        {exp.bullets.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeExpBullet(exp.id, bIdx)}
                            className="text-slate-400 hover:text-rose-500 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addExpBullet(exp.id)}
                      className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 pt-1"
                    >
                      + Add Bullet Point
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Education */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600" /> Education
            </h3>
            {educations.map((ed) => (
              <div key={ed.id} className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <input
                  type="text"
                  value={ed.degree}
                  onChange={(e) =>
                    setEducations(
                      educations.map((x) => (x.id === ed.id ? { ...x, degree: e.target.value } : x))
                    )
                  }
                  placeholder="Degree"
                  className="p-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold"
                />
                <input
                  type="text"
                  value={ed.school}
                  onChange={(e) =>
                    setEducations(
                      educations.map((x) => (x.id === ed.id ? { ...x, school: e.target.value } : x))
                    )
                  }
                  placeholder="University / College"
                  className="p-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold"
                />
                <input
                  type="text"
                  value={ed.year}
                  onChange={(e) =>
                    setEducations(
                      educations.map((x) => (x.id === ed.id ? { ...x, year: e.target.value } : x))
                    )
                  }
                  placeholder="Year (e.g. 2018 – 2022)"
                  className="p-2 rounded-lg border border-slate-200 bg-white text-xs"
                />
                <input
                  type="text"
                  value={ed.grade}
                  onChange={(e) =>
                    setEducations(
                      educations.map((x) => (x.id === ed.id ? { ...x, grade: e.target.value } : x))
                    )
                  }
                  placeholder="Grade / CGPA"
                  className="p-2 rounded-lg border border-slate-200 bg-white text-xs"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ATS LIVE PREVIEW COLUMN (PRINT READY) */}
        <div
          id="resume-printable-area"
          className={`lg:col-span-6 bg-white border border-slate-300 rounded-3xl p-8 sm:p-12 shadow-md space-y-6 print:p-0 print:border-none print:shadow-none text-slate-900 font-sans text-xs ${
            activeTab === 'editor' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-950">
              {fullName}
            </h1>
            <p className="text-xs sm:text-sm font-bold text-slate-700">{title}</p>
            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-[11px] text-slate-600 pt-1">
              <span>{email}</span>
              <span>•</span>
              <span>{phone}</span>
              <span>•</span>
              <span>{location}</span>
              {linkedIn && (
                <>
                  <span>•</span>
                  <span>{linkedIn}</span>
                </>
              )}
              {portfolio && (
                <>
                  <span>•</span>
                  <span>{portfolio}</span>
                </>
              )}
            </div>
          </div>

          {/* Summary */}
          {summary && (
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1">
                Professional Summary
              </h2>
              <p className="text-[11px] text-slate-800 leading-relaxed text-justify">{summary}</p>
            </div>
          )}

          {/* Skills */}
          {skills && (
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1">
                Technical Skills & Competencies
              </h2>
              <p className="text-[11px] text-slate-800 leading-relaxed">{skills}</p>
            </div>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1">
                Professional Experience
              </h2>
              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-baseline font-bold text-slate-950 text-xs">
                      <span>{exp.role}</span>
                      <span className="font-semibold text-slate-600 text-[11px]">{exp.duration}</span>
                    </div>
                    <div className="flex justify-between items-baseline text-slate-700 text-[11px] italic">
                      <span>{exp.company}</span>
                      <span>{exp.location}</span>
                    </div>
                    <ul className="list-disc pl-4 text-[11px] text-slate-800 space-y-1 pt-0.5 leading-relaxed">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {educations.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1">
                Education
              </h2>
              <div className="space-y-1.5">
                {educations.map((ed) => (
                  <div key={ed.id} className="flex justify-between items-baseline text-[11px]">
                    <div>
                      <span className="font-bold text-slate-950">{ed.degree}</span> —{' '}
                      <span className="text-slate-700">{ed.school}</span>
                    </div>
                    <span className="text-slate-600 font-semibold">{ed.year}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1">
                Key Projects
              </h2>
              <div className="space-y-2">
                {projects.map((p) => (
                  <div key={p.id} className="text-[11px] space-y-0.5">
                    <div className="font-bold text-slate-950 flex justify-between">
                      <span>{p.name}</span>
                      <span className="text-slate-500 font-normal">{p.tech}</span>
                    </div>
                    <p className="text-slate-800 leading-relaxed">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
