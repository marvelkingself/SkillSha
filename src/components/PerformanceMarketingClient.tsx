'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  ChevronDown,
  Layers,
  Award,
  Briefcase,
  TrendingUp,
  Target,
  BarChart3,
  Sliders,
  DollarSign,
  FileCheck,
  Building2,
  ExternalLink,
  ShieldCheck,
  GraduationCap,
  Laptop,
  ArrowRight,
  Info,
  Check,
  Copy,
  Users,
} from 'lucide-react';

export default function PerformanceMarketingClient() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'projects' | 'faqs' | 'verification'>('overview');
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);

  const openCounseling = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('openCounselingModal'));
    }
  };

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0c0c0c] text-slate-800 dark:text-slate-200 transition-colors">
      {/* ── 1. Editorial Review Status Notice ─────────────────────── */}
      <section className="bg-amber-500/10 border-b border-amber-500/20 py-2.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-amber-500/20 text-amber-800 dark:text-amber-300 text-[10px]">
              Draft for Editorial Review
            </span>
            <span className="font-semibold">
              Status: Prepared 26 November 2026. Awaiting final human department verification before public distribution.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> [CONFIRMED]
            </span>
            <span className="inline-flex items-center gap-1 font-bold text-blue-700 dark:text-blue-300">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span> [RECOMMENDED]
            </span>
            <span className="inline-flex items-center gap-1 font-bold text-amber-700 dark:text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span> [PENDING]
            </span>
          </div>
        </div>
      </section>

      {/* ── 2. Breadcrumb Navigation ──────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Link href="/" className="hover:text-slate-700 dark:hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/courses" className="hover:text-slate-700 dark:hover:text-white transition-colors">
            Courses
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 dark:text-white font-bold">Performance Marketing Course in Noida</span>
        </div>
      </nav>

      {/* ── 3. Hero Section ────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Subtitle & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Specialist Paid Media Track • Noida Sector 2 • Internship Included
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.12]">
              Performance Marketing Course in Noida <span className="text-blue-600 dark:text-blue-400">with Internship</span>
            </h1>

            <p className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
              Learn to plan, run, track and improve paid campaigns that are judged by results, not impressions.
            </p>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              SkillSha&apos;s Performance Marketing Course in Noida teaches you how businesses buy customers: leads, sales, and sign-ups, one measurable rupee at a time. You learn under Mr. Shad, SkillSha&apos;s performance marketing trainer, and the course includes an internship.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={openCounseling}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/25 transition-all cursor-pointer hover:scale-[1.02]"
              >
                <span>Book a Free Counselling Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+917303082191"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 hover:border-slate-300 text-slate-800 dark:text-white font-bold text-sm transition-all shadow-sm"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>+91 73030 82191</span>
              </a>

              <a
                href="mailto:info@skillsha.com"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 hover:border-slate-300 text-slate-800 dark:text-white font-bold text-sm transition-all shadow-sm"
              >
                <Mail className="w-4 h-4 text-slate-500" />
                <span>info@skillsha.com</span>
              </a>
            </div>

            {/* Verification disclaimer */}
            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Practitioner-led curriculum • Capstone deliverables • Authentic NCR hiring partner network</span>
            </div>
          </div>

          {/* Right Column: "At a Glance" Fact Sheet */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/5">
                <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-blue-600" />
                  <span>Course Fact Sheet</span>
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  Noida Cohort
                </span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-white/5 text-xs sm:text-sm">
                <div className="py-3.5 flex items-start justify-between gap-4">
                  <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" /> Location
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-right">
                    D-34, Sector 2, Noida <br />
                    <span className="text-xs font-normal text-slate-500">(Near Sec 16 Metro)</span>
                    <span className="ml-1 text-[9px] text-emerald-600 font-bold">[CONFIRMED]</span>
                  </span>
                </div>

                <div className="py-3.5 flex items-start justify-between gap-4">
                  <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" /> Experience Level
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-right">
                    Beginner-Friendly
                    <span className="ml-1 text-[9px] text-amber-600 font-bold">[PENDING: Academic]</span>
                  </span>
                </div>

                <div className="py-3.5 flex items-start justify-between gap-4">
                  <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-slate-400 shrink-0" /> Internship
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-right">
                    Included with Capstone
                    <span className="ml-1 text-[9px] text-emerald-600 font-bold">[CONFIRMED]</span>
                  </span>
                </div>

                <div className="py-3.5 flex items-start justify-between gap-4">
                  <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-slate-400 shrink-0" /> Lead Instructor
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-right">
                    Mr. Shad (SEM & CRO)
                    <span className="ml-1 text-[9px] text-emerald-600 font-bold">[CONFIRMED]</span>
                  </span>
                </div>

                <div className="py-3.5 flex items-start justify-between gap-4">
                  <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-slate-400 shrink-0" /> Course Fee
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-right">
                    ₹15,500 (with 50% offer)
                    <span className="ml-1 text-[9px] text-amber-600 font-bold">[PENDING: Admin]</span>
                  </span>
                </div>

                <div className="py-3.5 flex items-start justify-between gap-4">
                  <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" /> Payment Modes
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-right">
                    Cash, Card & EMI Options
                    <span className="ml-1 text-[9px] text-emerald-600 font-bold">[CONFIRMED]</span>
                  </span>
                </div>

                <div className="py-3.5 flex items-start justify-between gap-4">
                  <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" /> Schedule / Duration
                  </span>
                  <span className="font-medium text-slate-600 dark:text-slate-300 text-right">
                    Flexible Weekday & Weekend
                    <span className="ml-1 text-[9px] text-amber-600 font-bold">[PENDING]</span>
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/5">
                <button
                  type="button"
                  onClick={openCounseling}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Request Batch Schedule & Syllabus
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Quick Navigation Tabs ──────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-white/95 dark:bg-[#0c0c0c]/95 backdrop-blur-md border-y border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-3 no-scrollbar text-xs font-bold">
          {[
            { id: 'overview', label: '1. Overview & Definition' },
            { id: 'curriculum', label: '2. 10-Module Syllabus' },
            { id: 'projects', label: '3. Hands-On Projects' },
            { id: 'faqs', label: '4. Questions & Answers' },
            { id: 'verification', label: '5. Verification Report' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                const el = document.getElementById(tab.id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        {/* ── SECTION: Course Overview ──────────────────────────────── */}
        <section id="overview" className="space-y-10 scroll-mt-28">
          <div className="bg-white dark:bg-zinc-900/40 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/5 space-y-6">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Course Philosophy</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Course Overview: The Full Campaign Feedback Loop
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Most people see ads as creative work. Performance marketers see them as experiments with a budget, a target, and a result. This course covers the full loop: choosing the right channel, building campaigns, installing tracking so you can trust the numbers, reading the data, and changing what is not working.
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                The course is practical. You are expected to build campaigns, not only watch demonstrations. It is also honest about what it cannot do: it will not turn you into a senior media buyer in a few weeks, and it does not guarantee a job. It gives you structured training, mentor feedback, an internship, and placement assistance.
              </p>
            </div>

            {/* AEO Definition Callout Box */}
            <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 space-y-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  What Is Performance Marketing? (Direct Definition)
                </h3>
              </div>
              <p className="text-sm text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                Direct answer: Performance marketing is a form of digital advertising where results such as leads, sales or installs are measured, and the advertiser&apos;s spending is judged against those results.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong className="text-slate-900 dark:text-white">Explanation:</strong> A brand running a brand-awareness video cares about reach. A performance marketer cares about outcomes. They track a user from an ad click to a form submission or purchase and calculate costs such as cost per lead (CPL), cost per acquisition (CPA), and return on ad spend (ROAS).
              </p>

              {/* Concrete Math Example */}
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-blue-200 dark:border-blue-900/50 space-y-2">
                <span className="text-[11px] font-bold uppercase text-blue-600 tracking-wider block">Real-World Metric Example:</span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-mono">
                  A coaching institute spends ₹50,000 on ads and receives 200 enquiries. CPL is ₹250 (₹50,000 ÷ 200). If 20 of those enquiries enrol, CPA is ₹2,500 (₹50,000 ÷ 20). The performance marketer then tests audiences, ad copy and landing pages to lower that figure.
                </p>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                <p>
                  <strong className="text-slate-700 dark:text-slate-300">Limitation:</strong> Performance marketing depends on good tracking and a product people want. Strong ads cannot rescue a weak offer.
                </p>
                <p>
                  <strong className="text-slate-700 dark:text-slate-300">Official References:</strong>{' '}
                  <a href="https://support.google.com/google-ads" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">
                    Google Ads Help
                  </a>{' '}
                  and{' '}
                  <a href="https://www.facebook.com/business/help" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">
                    Meta Business Help
                  </a>{' '}
                  define the metrics in their own platforms.
                </p>
              </div>
            </div>
          </div>

          {/* Why Learn Performance Marketing? */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Career Demand</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Why Learn Performance Marketing?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-white/5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">1. Measurable Work</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Your impact shows in transparent numbers (CPL, CPA, ROAS), which directly strengthens your job interviews and freelance client pitches.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-white/5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">2. Wide Multi-Industry Use</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  E-commerce, education, real estate, fintech, healthcare, and SaaS businesses all buy paid traffic and need specialists to manage ad budgets.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-white/5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">3. Transferable Skills</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Tracking, analysis, funnel diagnostics, and budgeting carry directly into SEO, CRM, and product growth roles.
                </p>
              </div>
            </div>
          </div>

          {/* Who Should Join & Eligibility */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white dark:bg-zinc-900/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/5 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Who Should Join?</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                      <th className="py-2.5">Learner Background</th>
                      <th className="py-2.5">Program Fit & Guidance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    <tr>
                      <td className="py-3 font-bold text-slate-900 dark:text-white">Students & Freshers</td>
                      <td className="py-3 text-slate-600 dark:text-slate-300">
                        Good starting point if you are comfortable with spreadsheets and clear writing.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold text-slate-900 dark:text-white">Graduates Changing Careers</td>
                      <td className="py-3 text-slate-600 dark:text-slate-300">
                        Suitable; expect to learn new paid advertising terminology and math metrics.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold text-slate-900 dark:text-white">Working Digital Marketers</td>
                      <td className="py-3 text-slate-600 dark:text-slate-300">
                        Useful to move from organic content, SEO, or social media into high-budget paid media.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold text-slate-900 dark:text-white">Business Owners / Freelancers</td>
                      <td className="py-3 text-slate-600 dark:text-slate-300">
                        Useful for running your own campaigns; budget real money for live practice.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white dark:bg-zinc-900/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/5 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Laptop className="w-5 h-5 text-blue-600" />
                <span>Eligibility & Prerequisites</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                No formal degree requirement has been supplied by SkillSha <span className="text-[10px] font-bold text-amber-600">[PENDING]</span>. In practice, you should be comfortable with:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Basic English literacy and reading comprehension</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>A personal laptop with a stable broadband internet connection</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Simple arithmetic (percentages, ratios, and averages)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Spreadsheet basics (Google Sheets or Microsoft Excel)</span>
                </li>
              </ul>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-[11px] text-slate-500 leading-relaxed">
                <strong>No coding required:</strong> Tracking topics involve copying snippet tags into websites, which you will be guided through step-by-step.
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION: 10-Module Curriculum ─────────────────────────── */}
        <section id="curriculum" className="space-y-8 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
                <span>Proposed Curriculum</span>
                <span className="text-[10px] text-blue-700 font-normal">[RECOMMENDED, subject to Academic confirmation]</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Complete 10-Module Course Curriculum
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mt-1">
                Practical, milestone-driven modules covering paid acquisition from setup and tracking to scaling and executive reporting.
              </p>
            </div>

            <button
              type="button"
              onClick={openCounseling}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 underline shrink-0 cursor-pointer"
            >
              Download Detailed PDF Syllabus →
            </button>
          </div>

          {/* Curriculum Table / Bento */}
          <div className="bg-white dark:bg-zinc-900/40 rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100/70 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                    <th className="py-3 px-4 w-12 text-center">#</th>
                    <th className="py-3 px-4 w-1/4">Module Name</th>
                    <th className="py-3 px-4">Topics Covered</th>
                    <th className="py-3 px-4 w-28">Core Tools</th>
                    <th className="py-3 px-4">Practical Task</th>
                    <th className="py-3 px-4">Workplace Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {[
                    {
                      num: 1,
                      name: 'Foundations of Performance Marketing',
                      topics: 'Conversion Funnel, KPIs (CPC, CTR, CPL, CPA, ROAS), channel choices',
                      tools: 'Spreadsheet',
                      task: 'Calculate metrics from a sample raw dataset',
                      outcome: 'Read and explain core paid media metrics confidently',
                    },
                    {
                      num: 2,
                      name: 'Research and Strategy',
                      topics: 'Audience persona, competitor teardowns, offer value props',
                      tools: 'Google Keyword Planner, Meta Ad Library',
                      task: 'Build a comprehensive one-page campaign brief',
                      outcome: 'Plan strategic budgets before spending money',
                    },
                    {
                      num: 3,
                      name: 'Google Search Ads',
                      topics: 'Match types, ad copy, extensions, Quality Score, Smart Bidding',
                      tools: 'Google Ads',
                      task: 'Build a live Search campaign (test or small-budget)',
                      outcome: 'Launch structured, high-relevance search campaigns',
                    },
                    {
                      num: 4,
                      name: 'Display, YouTube & Performance Max',
                      topics: 'Placements, video assets, remarketing audiences, asset groups',
                      tools: 'Google Ads',
                      task: 'Compare formats for one specific product offer',
                      outcome: 'Choose the optimal ad format for campaign goals',
                    },
                    {
                      num: 5,
                      name: 'Meta Ads (Facebook & Instagram)',
                      topics: 'Objectives, custom audiences, creatives, placements, lookalikes',
                      tools: 'Meta Ads Manager',
                      task: 'Build a full lead-generation campaign with instant forms',
                      outcome: 'Launch paid social acquisition funnels',
                    },
                    {
                      num: 6,
                      name: 'Tracking and Attribution',
                      topics: 'Conversion events, UTM parameters, tag management, basic attribution',
                      tools: 'Google Tag Manager, GA4',
                      task: 'Set up, trigger, and verify a live conversion event',
                      outcome: 'Trust your data and eliminate tracking blindspots',
                    },
                    {
                      num: 7,
                      name: 'Landing Pages & CRO',
                      topics: 'Message match, lead forms, mobile speed, A/B testing frameworks',
                      tools: 'Landing Page Builders',
                      task: 'Audit a real live landing page for conversion leaks',
                      outcome: 'Spot conversion friction and optimize page drop-offs',
                    },
                    {
                      num: 8,
                      name: 'Optimisation and Scaling',
                      topics: 'Budget shifts, creative fatigue refresh, bid tweaks, testing cadence',
                      tools: 'Platform Dashboards',
                      task: 'Diagnose and optimize an underperforming running campaign',
                      outcome: 'Improve CPA/ROAS using data-backed decisions',
                    },
                    {
                      num: 9,
                      name: 'Reporting & Dashboards',
                      topics: 'Automated dashboards, client weekly reports, executive insights',
                      tools: 'Looker Studio, Sheets',
                      task: 'Build an automated weekly client performance report',
                      outcome: 'Communicate ROI clearly to founders and clients',
                    },
                    {
                      num: 10,
                      name: 'Internship & Career Preparation',
                      topics: 'Live campaign deliverables, portfolio assembly, resume, mock interviews',
                      tools: 'As assigned',
                      task: 'Complete internship project tasks and portfolio review',
                      outcome: 'Walk away with an interview-ready case study portfolio',
                    },
                  ].map((mod) => (
                    <tr key={mod.num} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-center text-blue-600">{mod.num}</td>
                      <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">{mod.name}</td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-300 text-xs">{mod.topics}</td>
                      <td className="py-4 px-4 font-mono text-[11px] text-slate-700 dark:text-slate-300">{mod.tools}</td>
                      <td className="py-4 px-4 text-slate-700 dark:text-slate-300 text-xs font-medium">{mod.task}</td>
                      <td className="py-4 px-4 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">{mod.outcome}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Optional Advanced Topics Note */}
            <div className="p-4 sm:p-5 bg-slate-50 dark:bg-white/[0.02] border-t border-slate-100 dark:border-white/5 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white">Optional Advanced Electives [RECOMMENDED]:</strong> Server-side tracking and Meta Conversions API (CAPI), marketing automation and CRM integration (HubSpot/Zoho), and e-commerce product feeds via Google Merchant Center.
              </div>
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="bg-white dark:bg-zinc-900/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tools & Technologies Learned [RECOMMENDED]</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-2">
              {[
                { name: 'Google Ads', purpose: 'Paid search, display, & video' },
                { name: 'Meta Ads Manager', purpose: 'Facebook & Instagram ads' },
                { name: 'Google Analytics 4', purpose: 'Event analytics & user paths' },
                { name: 'Google Tag Manager', purpose: 'Deploying tracking tags' },
                { name: 'Looker Studio', purpose: 'Automated visual dashboards' },
                { name: 'Spreadsheets', purpose: 'CPL, CPA, & ROAS calculations' },
              ].map((tool, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-center space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{tool.name}</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">{tool.purpose}</p>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 pt-2">
              Note: Third-party platform names are used for identification only. Trainers demonstrate the current live version of each tool.
            </p>
          </div>

          {/* Honest AI Policy Notice */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-100/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300">
            <strong className="text-slate-900 dark:text-white">AI and Generative AI Policy:</strong> Not applicable as confirmed course content. No AI or GenAI tools were supplied for this course, so none are claimed. If SkillSha adds AI for ad copy or creative generation, this section will be updated once confirmed by the trainer.
          </div>
        </section>

        {/* ── SECTION: Hands-On Projects ────────────────────────────── */}
        <section id="projects" className="space-y-8 scroll-mt-28">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Practical Portfolio</span>
              <span className="text-[10px] text-emerald-700 font-normal">[Proposed Deliverables]</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              4 Hands-On Real-World Projects
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mt-1">
              Build realistic client deliverables that demonstrate your competency in campaign strategy, conversion tracking, and budget efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: '1. Lead-Generation Campaign for a Local Business',
                problem: 'A Noida tutoring centre wants student enquiries at a lower cost per lead.',
                tools: 'Meta Ads Manager, Landing Page, GA4',
                approach: 'Define custom audience, write 3 ad creative variants, set up conversion event, execute small test, compare CPL.',
                output: 'Complete campaign architecture, results table, and optimization recommendations.',
                skills: 'Audience targeting, creative testing, lead form tracking',
              },
              {
                title: '2. Google Search Campaign for a Service Business',
                problem: 'A local service provider wants phone calls and quote form fills from high-intent searchers.',
                tools: 'Google Ads, Keyword Planner, Google Tag Manager',
                approach: 'Keyword intent research, negative keyword list, responsive search ads, call & form conversion tracking.',
                output: 'Live or simulated search campaign structure with performance metrics summary.',
                skills: 'Search keyword logic, ad rank, bidding strategy, conversion setup',
              },
              {
                title: '3. Tracking and Attribution Audit',
                problem: 'A business website reports lead counts that do not match its internal CRM database.',
                tools: 'Google Tag Manager, GA4, DebugView',
                approach: 'Inspect tag firing rules, test events in real-time DebugView, document discrepancies, propose fixes.',
                output: 'Formal tracking diagnostic audit report with step-by-step remediation plan.',
                skills: 'Measurement debugging, event verification, technical documentation',
              },
              {
                title: '4. Optimisation and Reporting Pack',
                problem: 'A client campaign has seen rising CPA over consecutive weeks.',
                tools: 'Platform Dashboards, Looker Studio, Sheets',
                approach: 'Diagnose fatigue vs auction competition, isolate winning ad variants, implement budget shifts, report findings.',
                output: 'Professional weekly performance deck with verified decisions and ROI delta.',
                skills: 'Data analysis, budget re-allocation, stakeholder communication',
              },
            ].map((proj, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/5 space-y-4 hover:border-blue-500/30 transition-all shadow-sm"
              >
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{proj.title}</h3>

                <div className="space-y-2 text-xs sm:text-sm">
                  <p className="text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Business Problem:</strong> {proj.problem}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Tools:</strong>{' '}
                    <span className="font-mono text-blue-600 dark:text-blue-400">{proj.tools}</span>
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Approach:</strong> {proj.approach}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Output:</strong> {proj.output}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Skills Shown</span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{proj.skills}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Real-World Industry Applications */}
          <div className="bg-white dark:bg-zinc-900/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Real-World Industry Applications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">E-Commerce</span>
                <span className="text-slate-500">Product-feed ads, cart abandoner retargeting, ROAS targets.</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">Education / Coaching</span>
                <span className="text-slate-500">Lead generation funnels, webinar bookings, admissions calls.</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">Real Estate</span>
                <span className="text-slate-500">Geo-targeted lead forms, property site-visit bookings.</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">SaaS & Services</span>
                <span className="text-slate-500">Free trial sign-ups, demo requests, cost per MQL/SQL.</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">Digital Agencies</span>
                <span className="text-slate-500">Multi-client budget management and automated weekly reporting.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION: Trainer, Career & Placement ──────────────────── */}
        <section className="space-y-12">
          {/* Trainer Card */}
          <div className="bg-white dark:bg-zinc-900/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 flex flex-col items-center text-center space-y-3">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-800 relative shadow-md">
                  <Image
                    src="/files/shad.png"
                    alt="Mr. Shad, performance marketing trainer at SkillSha"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Mr. Shad</h3>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    Lead Instructor • Performance Marketing Expert
                  </p>
                  <span className="text-[10px] text-slate-400 block pt-1">
                    Specialisation: Search Engine Marketing (SEM) & Conversion Rate Optimisation (CRO)
                  </span>
                </div>
              </div>

              <div className="md:col-span-8 space-y-4">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Lead Mentorship</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Learn Directly From an Industry Paid Media Practitioner
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  SkillSha&apos;s Noida Digital Marketing programme lists Mr. Shad as Lead Instructor specializing in conversion tracking, paid search, and conversion rate optimisation. Classes are interactive and project-centered, allowing students to ask questions directly, review live campaigns, and debug tracking tags with mentor guidance.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-xs text-slate-500 space-y-1">
                  <p>
                    <strong className="text-slate-700 dark:text-slate-300">Verification note:</strong> Experience figures and formal credentials are noted for HR verification before external citation. SkillSha does not quote unverified claims like &quot;worked with 50+ brands&quot; without documented proof.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Career Roles (No unsubstantiated salary hype) */}
          <div className="bg-white dark:bg-zinc-900/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/5 space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Career Pathways</span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Career Opportunities After Performance Marketing Training
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Roles commonly recruiting performance marketing skillsets (focused on genuine job responsibilities, not speculative salary promises):
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                {
                  role: 'Performance Marketing Executive',
                  desc: 'Run, monitor, and optimize day-to-day paid campaigns across Google and Meta.',
                  skills: 'Google Ads, Meta Ads, Weekly Reporting',
                },
                {
                  role: 'Paid Media / PPC Specialist',
                  desc: 'Own search and social budgets, keyword bids, negative keywords, and quality scores.',
                  skills: 'Smart Bidding, A/B Testing, Keyword Research',
                },
                {
                  role: 'Media Buyer',
                  desc: 'Strategically allocate and buy traffic across multiple advertising channels and networks.',
                  skills: 'Budget Control, Channel Mix, Funnel Economics',
                },
                {
                  role: 'Marketing Analyst',
                  desc: 'Analyze campaign and conversion funnel data to find leaks and drop-offs.',
                  skills: 'GA4, Looker Studio, Spreadsheets',
                },
                {
                  role: 'Freelance Ads Manager',
                  desc: 'Manage paid media accounts and client budgets independently on contract.',
                  skills: 'Direct Client Communication, Setup to Reporting',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.role}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  <div className="pt-2 border-t border-slate-200/60 dark:border-white/5">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Key Skills</span>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{item.skills}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 text-xs text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">Honest Salary Policy:</strong> Speculative or unverified starting salary figures are deliberately omitted from this page. Compensation in Delhi-NCR depends on your individual portfolio depth, internship deliverables, and interview performance.
            </div>
          </div>

          {/* Placement Assistance vs Job Guarantee */}
          <div className="bg-white dark:bg-zinc-900/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span>Placement Assistance Standard (No False Guarantees)</span>
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              SkillSha offers resume polishing, technical mock interviews, and referral submissions into its hiring network across NCR. Outcomes depend entirely on your individual diligence and market conditions. <strong>Placement assistance is not a job guarantee.</strong>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">1. Resume & LinkedIn Review</span>
                <span className="text-slate-500">Keyword-optimizing your resume for paid media specialist roles.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">2. Technical Mock Interviews</span>
                <span className="text-slate-500">Practicing campaign troubleshooting, ROAS scenarios, and CPL math.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">3. Internship Included</span>
                <span className="text-slate-500">Hands-on capstone tasks to build a verified workplace portfolio.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION: Fees & Limitations ───────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Fees & Enrollment Card */}
          <div className="lg:col-span-6 bg-white dark:bg-zinc-900/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/5 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Tuition & Pricing</span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Course Fees & Enrollment</h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                50% Offer Available
              </span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Tuition Fee</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white">₹15,500</span>
                </div>
                <span className="text-[10px] text-amber-600 font-bold px-2 py-1 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40">
                  [PENDING: Admin verification of final amount]
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 space-y-1.5">
                <p><strong>Payment Methods:</strong> Cash, card, and convenient monthly EMI options.</p>
                <p>
                  <strong>Refund Terms:</strong> Refer to the official{' '}
                  <Link href="/refund-policy" className="text-blue-600 underline font-semibold">
                    SkillSha Refund Policy
                  </Link>. Course pausing is available upon request.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 text-xs text-slate-700 dark:text-slate-300">
                <strong>How to Enrol:</strong> Call <a href="tel:+917303082191" className="font-bold underline">+91 73030 82191</a>, email <a href="mailto:info@skillsha.com" className="font-bold underline">info@skillsha.com</a>, or visit our centre at <strong>D-34, Sector 2, Noida, Uttar Pradesh 201301</strong>.
              </div>
            </div>

            <button
              type="button"
              onClick={openCounseling}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              Enquire About Current Batch & Fees
            </button>
          </div>

          {/* Honest Course Limitations */}
          <div className="lg:col-span-6 bg-white dark:bg-zinc-900/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/5 space-y-4">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">Transparent Boundaries</span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Honest Course Limitations</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              SkillSha believes in transparent educational expectations. Here are the boundaries of what this training entails:
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Practical effort required:</strong> Reading lecture slides is not enough. You must practise on real or sandbox ad accounts.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Real ad spend dynamics:</strong> Genuine performance marketing learning benefits from running real spend. The course may or may not provide ad credits <span className="text-[10px] font-bold text-amber-600">[PENDING]</span>.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Platform interfaces change:</strong> Google Ads and Meta update their UI frequently; your focus will be on durable conceptual principles rather than memorizing button clicks.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Portfolio beats certificates:</strong> A verified portfolio and internship deliverable will improve your job prospects; certificates alone do not guarantee hiring.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ── SECTION: 18 Comprehensive FAQs ────────────────────────── */}
        <section id="faqs" className="space-y-6 scroll-mt-28">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Direct Answers</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Frequently Asked Questions (18 Direct Answers)
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Clear, transparent answers about the syllabus, fees, internship, and career outcomes.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: '1. What is a performance marketing course?',
                a: 'It teaches how to run paid advertising where results (leads, sales, installs) are tracked and optimised. Topics include campaign setup, tracking, analysis and reporting.',
              },
              {
                q: '2. Is this course suitable for freshers?',
                a: 'It is designed to be beginner-friendly [PENDING: Academic confirmation]. You should be comfortable with basic maths and spreadsheets.',
              },
              {
                q: '3. What is the fee for the performance marketing course in Noida?',
                a: 'The supplied fee is ₹15,500 with a 50% offer. Admin must confirm the final payable amount, taxes and EMI terms before this answer is published.',
              },
              {
                q: '4. Is an internship included?',
                a: 'Yes, an internship is included. Ask the counselling team for the internship duration and conditions.',
              },
              {
                q: '5. Who teaches the course?',
                a: 'Mr. Shad, a Performance Marketing Expert at SkillSha with a stated specialisation in SEM and conversion rate optimisation.',
              },
              {
                q: '6. How long is the course?',
                a: 'Duration has not been confirmed for this course. Call +91 73030 82191 for the current batch schedule.',
              },
              {
                q: '7. Is the training online or offline?',
                a: 'SkillSha runs online, offline and hybrid formats across its programmes. Confirm the format for this batch with the counsellor.',
              },
              {
                q: '8. How is performance marketing different from digital marketing?',
                a: 'Digital marketing is the broad field (SEO, content, social, email, paid). Performance marketing is the paid, outcome-measured part. See SkillSha’s Digital Marketing course in Noida for the wider scope.',
              },
              {
                q: '9. What is ROAS?',
                a: 'Return on ad spend: revenue from ads divided by ad cost. If ₹10,000 of ads produces ₹40,000 in sales, ROAS is 4.',
              },
              {
                q: '10. Do I need to know coding?',
                a: 'No. Some tracking work involves pasting code snippets, which you will be shown how to do.',
              },
              {
                q: '11. Do I need my own ad budget?',
                a: 'Practice with real spend teaches the most, but small budgets work. Ask what the course provides [PENDING].',
              },
              {
                q: '12. Will I get a certificate?',
                a: 'SkillSha says a certificate is issued on completion. Confirm completion criteria with the counsellor.',
              },
              {
                q: '13. Does SkillSha guarantee a job?',
                a: 'No. SkillSha offers placement assistance (resume help, mock interviews, referrals). Outcomes depend on your effort and the job market.',
              },
              {
                q: '14. What jobs can I get after this course?',
                a: 'Roles such as performance marketing executive, PPC specialist, media buyer or marketing analyst, or freelance ads management. Entry-level hiring depends on your portfolio and interview skills.',
              },
              {
                q: '15. Can working professionals join?',
                a: 'SkillSha states that it offers weekday and weekend batches. Confirm current timings for this course.',
              },
              {
                q: '16. What payment options are available?',
                a: 'Cash, card and EMI.',
              },
              {
                q: '17. Can I switch from the Digital Marketing course to this one, or the other way?',
                a: 'Ask the counsellor. Both exist as separate programmes with different scope.',
              },
              {
                q: '18. How do I report an error on this page?',
                a: 'Email info@skillsha.com with the section and the correction.',
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900/40 rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-xs sm:text-sm hover:text-blue-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      activeFaq === idx ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {activeFaq === idx && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION: Related Courses ──────────────────────────────── */}
        <section className="bg-white dark:bg-zinc-900/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/5 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Related Courses at SkillSha</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <Link
              href="/course/digital-marketing-course-in-noida-with-gen-ai"
              className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 hover:border-blue-400 border border-slate-100 dark:border-white/5 block space-y-1 transition-all"
            >
              <span className="font-bold text-slate-900 dark:text-white block">Digital Marketing in Noida</span>
              <span className="text-slate-500">Broader scope, including SEO, content & email with Gen AI.</span>
            </Link>

            <Link
              href="/course/digital-marketing-course-standard-in-noida-with-gen-ai"
              className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 hover:border-blue-400 border border-slate-100 dark:border-white/5 block space-y-1 transition-all"
            >
              <span className="font-bold text-slate-900 dark:text-white block">Digital Marketing Standard</span>
              <span className="text-slate-500">Comprehensive foundational track for broad marketing roles.</span>
            </Link>

            <Link
              href="/course/digital-marketing-course-with-gen-ai"
              className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 hover:border-blue-400 border border-slate-100 dark:border-white/5 block space-y-1 transition-all"
            >
              <span className="font-bold text-slate-900 dark:text-white block">Digital Marketing (Flagship)</span>
              <span className="text-slate-500">Global track with 24-week depth and full portfolio defense.</span>
            </Link>

            <Link
              href="/courses"
              className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 hover:border-blue-400 border border-slate-100 dark:border-white/5 block space-y-1 transition-all"
            >
              <span className="font-bold text-slate-900 dark:text-white block">Browse All Courses</span>
              <span className="text-slate-500">View Data Science, Full Stack, DevOps & Career Programs.</span>
            </Link>
          </div>
        </section>

        {/* ── SECTION: Final CTA Banner ─────────────────────────────── */}
        <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
              Ready to Learn Performance Marketing in Noida?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Talk to a SkillSha counsellor about the upcoming batch schedule, internship requirements, and enrollment fee.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={openCounseling}
              className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              Book Free Counselling Call
            </button>
            <a
              href="tel:+917303082191"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-sm transition-all"
            >
              Call: +91 73030 82191
            </a>
          </div>

          <div className="text-xs text-slate-400 space-y-1 pt-2">
            <p>📍 Learning Centre: D-34, Sector 2, Noida, Uttar Pradesh 201301 (Near Sec 16 Metro)</p>
            <p className="text-[11px] text-slate-500">
              Results vary by individual effort and market conditions. Placement assistance is not a guarantee of employment.
            </p>
          </div>
        </section>

        {/* ── SECTION 5: Verification & Editorial Trust Architecture ── */}
        <section id="verification" className="space-y-6 scroll-mt-28">
          <div className="bg-white dark:bg-zinc-900/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/5 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Transparency & Governance
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Editorial Information & Verification Architecture
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsVerificationOpen(!isVerificationOpen)}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 cursor-pointer"
              >
                <span>{isVerificationOpen ? 'Hide Full Audit' : 'View Audit & Verification Plan'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isVerificationOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Written By</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">[To be named]</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Tech Review</span>
                <span className="font-semibold text-amber-600">[Not yet done]</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Editorial Review</span>
                <span className="font-semibold text-amber-600">[Pending]</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Fee Verified By</span>
                <span className="font-semibold text-amber-600">[Admin: Pending]</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Draft Date</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">26 Nov 2026</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Corrections</span>
                <span className="font-semibold text-blue-600">info@skillsha.com</span>
              </div>
            </div>

            {/* Expandable Deep Audit Tables */}
            {isVerificationOpen && (
              <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-white/5 text-xs">
                {/* 1. Fact Verification Report */}
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Fact Verification Audit Report</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                          <th className="py-2">Item Claim</th>
                          <th className="py-2">Source</th>
                          <th className="py-2">Verification Result</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                        <tr>
                          <td className="py-2 font-medium">Address, phone, email, logo</td>
                          <td className="py-2 text-slate-500">Skillsha homepage</td>
                          <td className="py-2 text-emerald-600 font-bold">Verified [CONFIRMED]</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Canonical domain & course URL pattern</td>
                          <td className="py-2 text-slate-500">Skillsha pages</td>
                          <td className="py-2 text-emerald-600 font-bold">Verified [CONFIRMED]</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Mr. Shad, Lead Instructor (SEM/CRO)</td>
                          <td className="py-2 text-slate-500">Noida DM page</td>
                          <td className="py-2 text-emerald-600 font-bold">Verified [CONFIRMED]</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Fee ₹15,500, offer 50%, internship</td>
                          <td className="py-2 text-slate-500">User brief</td>
                          <td className="py-2 text-amber-600 font-bold">Used as supplied; [PENDING: Admin]</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Duration, mode, language, tools, projects</td>
                          <td className="py-2 text-slate-500">Not supplied</td>
                          <td className="py-2 text-slate-500">Omitted unconfirmed figures [RECOMMENDED]</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Placement rates, partner counts, alumni salaries</td>
                          <td className="py-2 text-slate-500">Site conflicting data</td>
                          <td className="py-2 text-red-600 font-bold">Deliberately omitted for trust safety</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 2. Publishing Readiness Report & Open Items */}
                <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 space-y-2">
                  <h4 className="font-bold text-amber-900 dark:text-amber-200 text-xs uppercase tracking-wide">
                    Pre-Publication Open Items Checklist
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-xs">
                    <li>Confirm whether ₹15,500 is regular or discounted fee, and what 50% offer applies to.</li>
                    <li>Academic confirmation of syllabus modules and weekly batch hours.</li>
                    <li>Internship terms and conditions documentation.</li>
                    <li>Confirmation of trainer&apos;s years of experience (10+ vs 12+ Yrs).</li>
                    <li>Dedicated 1200 × 630 Course OpenGraph banner image.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
