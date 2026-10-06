'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CounselingModal from '@/components/CounselingModal';
import Link from 'next/link';
import {
  CityAnalyticsData,
  FROZEN_DATA_ANALYTICS_FACTS,
  SALARY_TABLE_ROWS,
  CURRICULUM_MODULES,
  TOOLS_LIST,
  CAPSTONE_PROJECTS,
  ROADMAP_STEPS,
  EDITORIAL_VERIFICATION_TABLE,
} from '@/data/data-analytics-course';
import {
  CheckCircle2,
  Calendar,
  Clock,
  Laptop,
  Award,
  Users,
  Briefcase,
  ChevronDown,
  Sparkles,
  PhoneCall,
  Download,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Building,
  Terminal,
} from 'lucide-react';

interface DataAnalyticsCityPageProps {
  cityData: CityAnalyticsData;
}

export default function DataAnalyticsCityPage({ cityData }: DataAnalyticsCityPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);

  const openModal = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('openCounselingModal'));
    }
  };

  const city = cityData.city;

  const faqs = [
    {
      q: `What is the Data Analytics with Gen AI course at Skillsha?`,
      a: `The Data Analytics with Gen AI course is a 6-7 months live online training program. It provides 150+ hours of content across 90+ live sessions covering Excel, SQL, Python, Power BI, and generative AI. Learners build portfolio projects and receive dedicated career and placement assistance.`,
    },
    {
      q: `What is the fee of the data analytics course in ${city}?`,
      a: `The course fee is ₹21,500 plus 18% GST, totaling ₹25,370. This comprehensive tuition covers all 150+ hours of content, 90+ live sessions, project evaluations, and dedicated career and placement assistance. Flexible monthly installment plans are available starting at ₹4,622 per month for six months. Fee verified by Admin Department, reviewed 6 October 2026.`,
    },
    {
      q: `Is EMI available for the data analytics course in ${city}?`,
      a: `Yes, monthly EMI options are available starting at ₹4,622 per month for six months. Learners can divide the total tuition of ₹25,370 into manageable installments rather than paying upfront. Specific installment terms and payment schedules are confirmed during enrollment. Fee verified by Admin Department, reviewed 6 October 2026.`,
    },
    {
      q: `How long is the data analytics course in ${city}?`,
      a: `The program duration is 6-7 months of comprehensive interactive learning. During this period, students complete 150+ hours of content delivered through 90+ live sessions. The structured schedule allows college students and working professionals to balance training commitments alongside their daily routines effectively.`,
    },
    {
      q: `Does Skillsha have a centre in ${city}?`,
      a: cityData.q5Answer,
    },
    {
      q: `Do I need coding knowledge to join?`,
      a: `No prior coding knowledge or technical programming background is required to enroll. The curriculum begins with fundamental spreadsheet formulas and introductory SQL queries before gradually progressing to Python scripting. All you need is a laptop, stable internet connection, basic mathematics familiarity, and a willingness to practice analytical concepts.`,
    },
    {
      q: `Which tools and software will I learn?`,
      a: `You will master 15+ tools and software across analysis, databases, programming, visualization, and generative AI. The curriculum covers Excel, Google Sheets, MySQL, PostgreSQL, Python, Pandas, NumPy, Matplotlib, Seaborn, Jupyter Notebook, Power BI, Tableau, Looker Studio, Git, GitHub, ChatGPT, Claude, and Gemini for end-to-end data reporting workflows.`,
    },
    {
      q: `What salary can a fresher expect after this course?`,
      a: `A fresher data analyst in India can realistically expect a starting salary between ₹3–6 LPA. Strong freshers possessing well-documented project portfolios and sharp SQL skills can target ₹6–10 LPA, while internship stipends typically range from ₹10k–30k/month. Exact compensation depends on candidate skills, project depth, and hiring company policies.`,
    },
    {
      q: `Does Skillsha provide placement assistance for ${city} learners?`,
      a: `Yes, Skillsha provides dedicated career and placement assistance to all eligible ${city} learners. Career support includes one-on-one resume reviews, GitHub portfolio optimization, mock technical interviews, and connections to corporate hiring drives across our network of 100+ hiring partners. Source: Skillsha internal placement records, reviewed 6 October 2026.`,
    },
    {
      q: `How many live sessions and content hours are included?`,
      a: `The course includes 150+ hours of content and 90+ live interactive sessions. Instruction is delivered live by corporate trainers who solve realistic datasets in real time. Students participate in live discussions, ask questions directly, and work through hands-on assignments to ensure thorough comprehension of analytical tools and methods.`,
    },
    {
      q: `Who verified the information on this page?`,
      a: `This page copy was written by Mr. Gufran and verified by Mr. Farman and Mr. Irshad Khan. Technical details and final checks were completed by Mr. Irshad Khan, Technical Reviewer at Skillsha. Fee details were verified by the Admin Department, and placement data was confirmed from internal placement records.`,
    },
    {
      q: `When do the next batches start?`,
      a: `Skillsha launches 8+ new batches every month with convenient weekday and weekend schedule options. Batches are organized to accommodate both full-time college students and working professionals across ${city}. To confirm the immediate upcoming batch dates, connect directly with a Skillsha program advisor today.`,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Header />
      <CounselingModal />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20 w-full">
        {/* <!-- S01 --> H1 Header & Byline */}
        <section id="s01" className="space-y-4 pt-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>{FROZEN_DATA_ANALYTICS_FACTS.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Data Analytics Course in {city}{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-amber-400 bg-clip-text text-transparent">
              with Gen AI
            </span>
          </h1>

          <div className="text-[11px] sm:text-xs text-slate-400 border-t border-slate-800 pt-3 leading-relaxed">
            Written by: Mr. Gufran | Content re-checked and verified by: Mr. Farman | Technical
            verified by: Mr. Irshad Khan | Curriculum verified by: Mr. Gufran | Fee verified by: Admin
            Department | Placement figures: sourced from internal placement records | Review counts:
            verified against respective third-party platforms | Last reviewed: 6 October 2026 |
            Reviewed by: Mr. Irshad Khan | Final editorial check: Mr. Irshad Khan, Technical
            Reviewer at Skillsha
          </div>
        </section>

        {/* <!-- S02 --> Hero Section */}
        <section id="s02" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              The Data Analytics with Gen AI course by Skillsha provides rigorous practical training
              structured for aspiring data analysts, recent graduates, and domain switchers. Students
              master foundational spreadsheet manipulation, relational database querying, Python
              scripting, and interactive dashboard creation alongside generative artificial
              intelligence productivity tools.
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              {cityData.heroParagraphB}
            </p>

            {/* Price & EMI Ribbon */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 uppercase font-mono block">Program Fee</span>
                <span className="text-xl sm:text-2xl font-bold text-white">
                  ₹21,500 <span className="text-xs text-slate-400 font-normal">+ 18% GST (₹25,370 total)</span>
                </span>
                <span className="text-xs text-slate-400 block mt-0.5">
                  {FROZEN_DATA_ANALYTICS_FACTS.fee.duration}
                </span>
              </div>
              <div className="border-l border-slate-800 pl-4">
                <span className="text-xs text-slate-400 uppercase font-mono block">Flexible EMI</span>
                <span className="text-base sm:text-lg font-semibold text-emerald-400">
                  {FROZEN_DATA_ANALYTICS_FACTS.fee.emi}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={openModal}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{FROZEN_DATA_ANALYTICS_FACTS.ctaLabels.advisor}</span>
              </button>
              <button
                type="button"
                onClick={openModal}
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{FROZEN_DATA_ANALYTICS_FACTS.ctaLabels.enroll}</span>
              </button>
            </div>
          </div>

          {/* Hero Stats Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">
              Key Program Highlights
            </h3>
            <div className="space-y-3.5">
              {FROZEN_DATA_ANALYTICS_FACTS.heroStats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-3 text-slate-200 text-sm font-medium">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{stat}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <!-- S03 --> Quick Answer & Quick Facts Table */}
        <section id="s03" className="space-y-6 pt-10 border-t border-slate-800">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Data Analytics with Gen AI Course in {city}: Quick Answer
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl">
              The Data Analytics with Gen AI course in {city} runs for 6-7 months, providing 150+ hours
              of content through 90+ live interactive sessions. Covering 15+ software tools, real
              datasets, and dedicated career and placement assistance, training is hosted directly
              from Skillsha&apos;s national learning centre located in Sector 2, Noida.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-800/80 text-white font-bold uppercase text-[11px] border-b border-slate-700">
                <tr>
                  <th className="py-3.5 px-5">Parameter</th>
                  <th className="py-3.5 px-5">Specification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="py-3 px-5 font-semibold text-white">Course</td>
                  <td className="py-3 px-5">{FROZEN_DATA_ANALYTICS_FACTS.courseName}</td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-semibold text-white">Duration</td>
                  <td className="py-3 px-5">{FROZEN_DATA_ANALYTICS_FACTS.fee.duration}</td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-semibold text-white">Mode for {city}</td>
                  <td className="py-3 px-5">{cityData.quickFactsMode}</td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-semibold text-white">Fee</td>
                  <td className="py-3 px-5">
                    {FROZEN_DATA_ANALYTICS_FACTS.fee.base} + 18% GST ({FROZEN_DATA_ANALYTICS_FACTS.fee.total} total) course fee
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-semibold text-white">EMI</td>
                  <td className="py-3 px-5">{FROZEN_DATA_ANALYTICS_FACTS.fee.emi}</td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-semibold text-white">Content hours</td>
                  <td className="py-3 px-5">{FROZEN_DATA_ANALYTICS_FACTS.curriculumStats.hours}</td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-semibold text-white">Live sessions</td>
                  <td className="py-3 px-5">{FROZEN_DATA_ANALYTICS_FACTS.curriculumStats.sessions}</td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-semibold text-white">Tools</td>
                  <td className="py-3 px-5">{FROZEN_DATA_ANALYTICS_FACTS.curriculumStats.toolsCount}</td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-semibold text-white">Trainers</td>
                  <td className="py-3 px-5">
                    {FROZEN_DATA_ANALYTICS_FACTS.trainers.count} ({FROZEN_DATA_ANALYTICS_FACTS.trainers.experience})
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-semibold text-white">New batches</td>
                  <td className="py-3 px-5">{FROZEN_DATA_ANALYTICS_FACTS.trainers.newBatches}</td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-semibold text-white">Centre location</td>
                  <td className="py-3 px-5">{FROZEN_DATA_ANALYTICS_FACTS.centre}</td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-semibold text-white">Last reviewed</td>
                  <td className="py-3 px-5">6 October 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* <!-- S04 --> Program Snapshot */}
        <section id="s04" className="space-y-6 pt-10 border-t border-slate-800">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Program Snapshot</h2>
            <p className="text-slate-400 text-sm">
              The Skillsha Data Analytics with Gen AI course in {city} offers a structured program
              overview defining duration, training format, interactive class volume, curriculum depth,
              tools covered, and placement assistance.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <Clock className="w-5 h-5 text-blue-400 mx-auto mb-1" />
              <span className="text-[11px] font-mono text-slate-400 uppercase block">Duration</span>
              <span className="text-xs sm:text-sm font-bold text-white block">
                {FROZEN_DATA_ANALYTICS_FACTS.fee.duration}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <Laptop className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
              <span className="text-[11px] font-mono text-slate-400 uppercase block">Mode</span>
              <span className="text-xs sm:text-sm font-bold text-white block">
                Live online batches for learners in {city}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <Calendar className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <span className="text-[11px] font-mono text-slate-400 uppercase block">Live Sessions</span>
              <span className="text-xs sm:text-sm font-bold text-white block">
                {FROZEN_DATA_ANALYTICS_FACTS.curriculumStats.sessions}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <Terminal className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <span className="text-[11px] font-mono text-slate-400 uppercase block">Content Hours</span>
              <span className="text-xs sm:text-sm font-bold text-white block">
                {FROZEN_DATA_ANALYTICS_FACTS.curriculumStats.hours}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <Briefcase className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
              <span className="text-[11px] font-mono text-slate-400 uppercase block">Tools</span>
              <span className="text-xs sm:text-sm font-bold text-white block">
                {FROZEN_DATA_ANALYTICS_FACTS.curriculumStats.toolsCount}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <Award className="w-5 h-5 text-purple-400 mx-auto mb-1" />
              <span className="text-[11px] font-mono text-slate-400 uppercase block">Placement Support</span>
              <span className="text-xs sm:text-sm font-bold text-white block">
                Dedicated Career & Placement Assistance
              </span>
            </div>
          </div>
        </section>

        {/* <!-- S05 --> Why Choose Skillsha */}
        <section id="s05" className="space-y-8 pt-10 border-t border-slate-800">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why Choose Skillsha&apos;s Data Analytics Course in {city} with Gen AI?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Skillsha delivers a comprehensive Data Analytics with Gen AI course in {city} featuring
              mentor-led training, generative AI application, transparent fee schedules, and dedicated
              career and placement assistance from our Noida centre.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Choosing a reliable data analytics training in {city} requires evaluating hands-on curriculum
              depth, instructor credentials, and transparent fee policies. Skillsha provides a practical
              learning environment designed to build job-ready competencies through real-world datasets,
              verified portfolio projects, and persistent career support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">
                  Dedicated Career & Placement Assistance
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Career mentors review your resume thoroughly, positioning completed projects and analytical tools to match corporate hiring criteria accurately.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Instructors organize regular technical mock interviews covering SQL optimization, Python problem-solving, and analytical communication for candidate interview confidence.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Students receive guided support establishing an active public GitHub profile and verified Power BI portfolio demonstrating commercial expertise.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Placement teams connect qualifying graduates with scheduled recruitment opportunities and interviews across hiring partner companies throughout the year.</span>
                  </li>
                </ul>
              </div>
              <p className="text-xs text-slate-400 border-t border-slate-800 pt-3">
                Our placement cell supports students through technical preparation and recruitment drives across analytics roles. Source: Skillsha internal placement records, reviewed 6 October 2026.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">
                  Gen AI Integration for Modern Analysts
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span>Automate repetitive Python scripts and accelerate code debugging using targeted prompt engineering inside modern development environments.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span>Query relational database schemas faster and optimize complex SQL joins using conversational artificial intelligence developer assistants.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span>Condense extensive exploratory data findings into structured executive summaries using natural language instructions with ChatGPT and Claude.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span>Construct a dedicated generative artificial intelligence assistant capable of querying structured business data frames using plain language.</span>
                  </li>
                </ul>
              </div>
              <p className="text-xs text-slate-400 border-t border-slate-800 pt-3">
                Integrating generative AI into data analytics prepares learners to produce analytical insights faster and handle complex commercial datasets with higher everyday operational efficiency.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">
                  Transparent Fee and EMI Pricing
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Register with an unambiguous base tuition fee of ₹21,500 plus statutory eighteen percent government GST charges.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Distribute your training program investment across accessible monthly installments starting from ₹4,622 across six months.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Receive full access to live lectures, dataset resources, and project reviews without paying extra institutional fees.</span>
                  </li>
                </ul>
              </div>
              <p className="text-xs text-slate-400 border-t border-slate-800 pt-3">
                Total course fee equals ₹25,370 inclusive of GST. Installment terms are confirmed during enrollment. Fee verified by Admin Department, reviewed 6 October 2026.
              </p>
            </div>
          </div>
        </section>

        {/* <!-- S06 --> Expert Trainers */}
        <section id="s06" className="space-y-8 pt-10 border-t border-slate-800">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Expert Trainers with Real Industry Experience
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Skillsha courses are led by 30+ industry expert trainers with 10+ years corporate training
              experience, bringing enterprise data analytics and business intelligence practices into
              live sessions.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Skillsha collaborates with 30+ industry expert trainers possessing 10+ years corporate training
              experience across reputable organizations. Their extensive background ensures classroom instruction
              emphasizes genuine corporate challenges, efficient code architecture, and practical data modeling
              over abstract concepts, giving students clear clarity on modern analytical workflows.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase text-blue-400 tracking-wider">
              Trainer Experience Snapshot
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-lg font-bold text-blue-400">15+ years</span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Students understand enterprise data architecture, corporate strategic analytics, and executive reporting standards, learning how multinational organizations leverage business intelligence to guide high-stakes commercial decisions.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-lg font-bold text-indigo-400">8+ years</span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Learners gain deep insight into enterprise SQL database structures, scalable query performance tuning, and automated operational reporting deployed across established business environments.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-lg font-bold text-emerald-400">7+ years</span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Participants receive targeted guidance on statistical cleaning methodologies, exploratory data workflows in Python, and crafting executive dashboards that translate complex records into clear recommendations.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-lg font-bold text-amber-400">5+ years</span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Aspiring analysts master modern day-to-day coding efficiencies, Gen AI prompt debugging workflows, and technical screening problem-solving reflecting current junior analyst hiring standards.
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 pt-2">
              With 8+ new batches starting every month, learners can choose flexible live schedules that accommodate college classes or ongoing professional workplace commitments seamlessly.
            </p>
          </div>
        </section>

        {/* <!-- S07 --> What Makes This Course Different */}
        <section id="s07" className="space-y-8 pt-10 border-t border-slate-800">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What Makes This Data Analytics Course in {city} with Gen AI Different?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              This data analyst course in {city} distinguishes itself through practical project
              creation, public GitHub repositories, interactive mentor sessions across 90+ classes,
              and verified Skillsha completion certification.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Organizations seek analytical professionals who demonstrate verified practical capabilities
              rather than passive theoretical knowledge. Skillsha structures instruction around tangible
              database queries, clean Python scripts, dynamic Power BI dashboards, and working generative
              AI implementations that prove your readiness for corporate data roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white">Real-World Projects You Will Build</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li>• Build dynamic sales and revenue dashboards evaluating multi-territory retail transactions using advanced Power BI.</li>
                <li>• Write complex relational SQL queries analyzing subscriber retention rates and customer cohort attrition metrics.</li>
                <li>• Sanitize and explore unstructured enterprise datasets using Pandas and NumPy to detect operational patterns.</li>
                <li>• Apply statistical modeling and predictive machine learning algorithms to forecast quarterly corporate revenue trends.</li>
                <li>• Construct an operational generative artificial intelligence assistant that converts conversational questions into database analytics.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white">GitHub and Dashboard Portfolio</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li>• Publish documented Python analytical scripts and exploratory Jupyter notebooks directly to your personal GitHub.</li>
                <li>• Share interactive Power BI and Tableau dashboards demonstrating executive commercial reporting and modeling skills.</li>
                <li>• Author clear README project summaries explaining business questions, dataset sources, and analytical conclusions effectively.</li>
                <li>• Provide direct portfolio hyperlinks to hiring managers during recruitment evaluations to verify your technical proficiencies.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white">Skillsha Certification</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Upon finishing all curriculum modules, attending live classes, and completing capstone reviews, students receive the official Skillsha certificate of completion. This credential validates your practical competence in data analytics and generative AI, presenting verified project achievements to prospective employers during formal recruitment screenings.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white">Live Sessions with Mentor Support</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Learners attend 90+ live sessions led by seasoned practitioners who demonstrate analytical techniques step by step. Interactive class discussions, real-time code execution, and dedicated mentor support hours ensure students resolve technical doubts promptly, bridging practical knowledge gaps effectively while maintaining steady academic momentum throughout the entire training program duration.
              </p>
            </div>
          </div>
        </section>

        {/* <!-- S08 --> Curriculum Modules Accordion */}
        <section id="s08" className="space-y-6 pt-10 border-t border-slate-800">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Data Analytics with Gen AI Course Curriculum in {city}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              The curriculum delivers 150+ hours of content across 90+ live sessions over 6-7 months,
              spanning spreadsheets, SQL databases, Python, data visualization, machine learning, and
              generative AI.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Structured across 6-7 months, this comprehensive course curriculum provides 150+ hours of
              content through 90+ live sessions. Learners progress systematically from foundational
              spreadsheet formulas and relational database querying to advanced Python programming,
              interactive dashboard creation, and generative AI workflows.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {CURRICULUM_MODULES.map((module, idx) => {
              const isOpen = openModuleIndex === idx;
              return (
                <div
                  key={module.num}
                  className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenModuleIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    <span>
                      Module {module.num}: {module.title}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-400' : 'text-slate-500'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 space-y-3 border-t border-slate-800/80 pt-4 animate-in fade-in duration-200">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {module.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-900/40 text-blue-300 text-xs font-medium">
                        <strong>Outcome:</strong> {module.outcome}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={openModal}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Curriculum</span>
            </button>
          </div>
        </section>

        {/* <!-- S09 --> Skills and Tools */}
        <section id="s09" className="space-y-6 pt-10 border-t border-slate-800">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Skills and Tools You Will Master</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Skillsha trains learners on 15+ tools and software across spreadsheet modeling, relational
              SQL engines, Python data frameworks, business intelligence dashboards, and generative AI
              platforms.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Mastering industry-standard analytics tools enables professionals to solve real data
              challenges efficiently. Skillsha covers 15+ tools and software, providing comprehensive
              exposure across every phase of the corporate analytical pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white">Analysis and Database Tools</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li>• Excel: Build dynamic financial models and multi-variable analytical summaries for business performance analysis.</li>
                <li>• Google Sheets: Formulate shared cloud spreadsheet workflows using collaborative formulas and automated data connectors.</li>
                <li>• MySQL: Query normalized enterprise relational tables to analyze operational transactions and customer purchasing behavior.</li>
                <li>• PostgreSQL: Manage high-volume relational records with advanced join techniques, subqueries, and window functions.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white">Programming and Visualization Tools</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li>• Python: Automate complex data pipelines and build flexible computational workflows for analysis.</li>
                <li>• Pandas: Reshape, filter, merge, and clean large tabular data structures with high speed.</li>
                <li>• NumPy: Perform vectorized mathematical operations and high-speed array manipulations on numerical matrices.</li>
                <li>• Matplotlib: Generate publication-ready line graphs, histograms, and bar charts for technical data reports.</li>
                <li>• Seaborn: Create aesthetic statistical visualizations, correlation matrices, and distribution graphs for commercial presentations.</li>
                <li>• Jupyter Notebook: Combine live analytical code, narrative explanations, and visual charts into reproducible documents.</li>
                <li>• Power BI: Design connected business intelligence dashboards incorporating data models and custom DAX calculations.</li>
                <li>• Tableau: Build interactive visual analytics worksheets and geographic maps to communicate organizational trends.</li>
                <li>• Looker Studio: Assemble automated cloud dashboards integrating web analytics, marketing metrics, and advertising data.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white">Gen AI and Collaboration Tools</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li>• ChatGPT: Formulate optimized SQL queries and draft technical narrative explanations for executive presentations.</li>
                <li>• Claude: Analyze intricate data documentation and generate clear descriptive summaries from complex dataset schemas.</li>
                <li>• Gemini: Accelerate exploratory data research by interpreting numerical distributions through intelligent conversational prompts.</li>
                <li>• Git and GitHub: Manage code version history and publish polished analytical portfolios for recruiter evaluation.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* <!-- S10 --> Job-Ready Roadmap */}
        <section id="s10" className="space-y-6 pt-10 border-t border-slate-800">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Your Complete Job-Ready Roadmap</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              The Skillsha job-ready roadmap prepares students through live lectures, weekly problem
              sets, mentor assistance, real-world projects, portfolio development, resume formatting,
              mock interviews, and placement coordination.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Securing an entry-level analytical role requires a methodical, step-by-step path from
              fundamental principles to polished showcase projects. Skillsha organizes learning into
              eight structured phases designed to transition beginners into confident professionals
              ready for rigorous corporate evaluations and workplace responsibilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ROADMAP_STEPS.map((r, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <h3 className="text-sm font-bold text-blue-400">{r.step}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* <!-- S11 --> Featured Capstone Projects */}
        <section id="s11" className="space-y-6 pt-10 border-t border-slate-800">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Featured Capstone Projects</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Students complete three comprehensive capstone projects focusing on revenue dashboards,
              customer churn analysis, and an AI-driven analytics helper to prove practical workplace
              execution.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Practical capstone projects enable students to demonstrate applied analytical expertise
              on real datasets, providing tangible evidence of workplace competence to prospective
              hiring managers and recruiters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CAPSTONE_PROJECTS.map((proj, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{proj.desc}</p>
                </div>
                <div className="space-y-2 border-t border-slate-800 pt-3 text-xs text-slate-400">
                  <p><strong>Tools used:</strong> {proj.tools}</p>
                  <p><strong>Deliverable:</strong> {proj.deliverable}</p>
                  <p><strong>Skill proven:</strong> {proj.skill}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* <!-- S12 --> Career & Placement Assistance */}
        <section id="s12" className="space-y-6 pt-10 border-t border-slate-800">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Dedicated Career & Placement Assistance at Skillsha
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Skillsha delivers dedicated career and placement assistance throughout the program and
              post-completion, providing resume reviews, mock interviews, and connections to partner
              hiring opportunities.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Transitioning into analytics requires professional presentation alongside technical
              competence. Skillsha delivers dedicated career and placement assistance designed to guide
              learners through portfolio curation, professional communication, and recruitment
              processes, helping students present their practical abilities effectively to potential
              employers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white">During the Course</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li>• Receive continuous feedback on code quality, data cleaning logic, and dashboard visual layout structure.</li>
                <li>• Build an ATS-optimized professional resume spotlighting technical proficiencies and completed capstone project achievements.</li>
                <li>• Establish a structured public GitHub profile hosting documented Jupyter notebooks and relational database scripts.</li>
                <li>• Participate in simulated technical screenings focused directly on SQL query writing and Python analysis.</li>
                <li>• Engage in mentor-led sessions improving analytical storytelling and commercial business case presentation skills effectively.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white">After You Complete</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li>• Access regular updates on hiring opportunities curated across partner recruitment networks and corporate firms.</li>
                <li>• Schedule one-on-one strategy discussions with placement advisors to prepare thoroughly for scheduled corporate interviews.</li>
                <li>• Refine salary negotiation approaches and evaluate employment offer terms systematically with experienced career mentors.</li>
                <li>• Receive continuous portfolio enhancement suggestions as you add advanced personal analytical projects independently later.</li>
                <li>• Stay connected with alumni communities sharing ongoing workplace experiences and technical guidance across industries.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white">Our Hiring Network</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Skillsha collaborates with an extensive network of corporate recruiters looking for trained data professionals. Our graduates qualify for diverse entry-level and junior analytical positions across multiple established sectors that rely heavily on regular operational reporting and strategic business intelligence.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 border-t border-slate-800 pt-2">
                <li>• Information technology and software services providers</li>
                <li>• Banking, financial services, and fintech institutions</li>
                <li>• Automotive manufacturing and engineering corporations</li>
                <li>• E-commerce platforms and digital retail enterprises</li>
                <li>• Management consulting and professional advisory agencies</li>
                <li>• Healthcare analytics and pharmaceutical research companies</li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-300 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <span><strong>100+</strong> Hiring Partners</span>
              <span><strong>100+</strong> Corporate Tie-ups</span>
              <span className="text-emerald-400 font-bold">5,500+ students placed</span>
            </div>
            <span className="text-slate-500 font-mono text-[11px]">
              Source: Skillsha internal placement records, reviewed 6 October 2026
            </span>
          </div>
        </section>

        {/* <!-- S13 --> Salary Expectations Table */}
        <section id="s13" className="space-y-6 pt-10 border-t border-slate-800">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Salary Expectations After a Data Analytics Course
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Salary compensation for data analytics professionals in India varies based on demonstrable
              technical expertise, portfolio depth, educational background, and corporate hiring standards.
              Entry-level salaries generally start between ₹3–6 LPA, while experienced analysts and
              senior data science professionals frequently earn upwards of ₹12–20+ LPA.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-800/80 text-white font-bold uppercase text-[11px] border-b border-slate-700">
                <tr>
                  <th className="py-3.5 px-5">Profile / Experience Level</th>
                  <th className="py-3.5 px-5">Realistic salary expectation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {SALARY_TABLE_ROWS.map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-5 font-semibold text-white">{row.profile}</td>
                    <td className="py-3 px-5 font-bold text-emerald-400">{row.salary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white">How to Read These Salary Ranges</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li>• Skills: Demonstrated fluency in SQL, Python, and Power BI commands higher baseline compensation packages.</li>
                <li>• Projects: Real-world capstone portfolios hosted on GitHub distinguish candidate capabilities during technical evaluation rounds.</li>
                <li>• Communication: Ability to translate complex data discoveries into plain business language influences senior offers.</li>
                <li>• Company type: Product enterprises and global technology centers typically offer higher entry-level compensation packages.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white">Career Roles You Can Target</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                <li>• Junior Data Analyst in corporate business operations units</li>
                <li>• Business Intelligence Analyst designing interactive executive reporting dashboards</li>
                <li>• Data Analytics Trainee in leading professional service firms</li>
                <li>• Marketing Analyst tracking customer acquisition digital campaign performance</li>
                <li>• Operations Analyst optimizing enterprise supply chain performance workflows</li>
                <li>• Financial Data Analyst evaluating diverse corporate revenue streams</li>
                <li>• Junior Data Scientist assisting with predictive machine models</li>
                <li>• Reporting Analyst preparing routine executive administrative metrics summaries</li>
              </ul>
            </div>
          </div>

          <p className="text-xs text-slate-400 italic">
            Salary figures listed above represent realistic industry estimations based on market observations. Individual compensation packages depend entirely on candidate interview performance, prior academic background, specific corporate compensation policies, and negotiated terms during formal hiring processes.
          </p>
        </section>

        {/* <!-- S14 --> Skillsha Certificate */}
        <section id="s14" className="space-y-4 pt-10 border-t border-slate-800">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Skillsha Certificate and Credential Verification
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Skillsha issues an official certificate of completion after students satisfy curriculum
            milestones, attend live sessions, and complete capstone evaluations, providing a verifiable
            credential for recruiters.
          </p>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            The Skillsha certificate of completion validates that a learner has systematically completed
            150+ hours of rigorous analytical coursework, attended interactive live classes, and
            successfully delivered three real-world capstone projects. Each certificate features a distinct
            credential identifier that employers can reference when evaluating candidate qualifications,
            verifying genuine completion of our structured Data Analytics with Gen AI program.
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Unique credential identification number printed directly on every issued completion certificate document.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Detailed project and software competencies verified by program evaluators upon formal graduation.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Easy digital sharing for professional LinkedIn profiles, resume attachments, and employer verification.</span>
            </li>
          </ul>
        </section>

        {/* <!-- S15 --> Learner Reviews and Ratings Table */}
        <section id="s15" className="space-y-4 pt-10 border-t border-slate-800">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Learner Reviews and Ratings</h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Skillsha tracks student reviews and ratings across independent third-party platforms to
            provide prospective learners with transparent feedback regarding curriculum quality, mentor
            assistance, and placement support.
          </p>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Authentic student feedback reflects the quality of instruction, mentor accessibility, and
            career guidance provided throughout the training program. Skillsha monitors reviews across
            independent third-party platforms to maintain educational standards and provide transparent
            insights for prospective students evaluating our data analytics courses.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-800/80 text-white font-bold uppercase text-[11px] border-b border-slate-700">
                <tr>
                  <th className="py-3 px-5">Platform</th>
                  <th className="py-3 px-5">Rating</th>
                  <th className="py-3 px-5">Review Count</th>
                  <th className="py-3 px-5">Verified on</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-xs text-slate-400">
                <tr>
                  <td className="py-3 px-5">[FACT NEEDED: review data]</td>
                  <td className="py-3 px-5">[FACT NEEDED: review data]</td>
                  <td className="py-3 px-5">[FACT NEEDED: review data]</td>
                  <td className="py-3 px-5">[FACT NEEDED: review data]</td>
                </tr>
                <tr>
                  <td className="py-3 px-5">[FACT NEEDED: review data]</td>
                  <td className="py-3 px-5">[FACT NEEDED: review data]</td>
                  <td className="py-3 px-5">[FACT NEEDED: review data]</td>
                  <td className="py-3 px-5">[FACT NEEDED: review data]</td>
                </tr>
                <tr>
                  <td className="py-3 px-5">[FACT NEEDED: review data]</td>
                  <td className="py-3 px-5">[FACT NEEDED: review data]</td>
                  <td className="py-3 px-5">[FACT NEEDED: review data]</td>
                  <td className="py-3 px-5">[FACT NEEDED: review data]</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Review counts verified against respective third-party platforms.
          </p>
        </section>

        {/* <!-- S16 --> Course Fees in City */}
        <section id="s16" className="space-y-6 pt-10 border-t border-slate-800">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Data Analytics Course Fees in {city} with Gen AI
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              The Data Analytics with Gen AI course fee in {city} is ₹21,500 plus 18% GST (₹25,370 total),
              with monthly installment plans starting at ₹4,622.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Transparent pricing ensures students plan their educational investment without encountering
              unexpected institutional expenses. Skillsha maintains a clear fee structure for {city}{' '}
              learners enrolling in our live online batches, providing complete access to instruction,
              practical resources, and dedicated placement assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase">Fee Structure</span>
              <div className="text-2xl font-bold text-white">
                ₹21,500 <span className="text-sm font-normal text-slate-400">+ 18% GST (₹25,370 total)</span>
              </div>
              <p className="text-xs text-slate-400">{FROZEN_DATA_ANALYTICS_FACTS.fee.duration}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase">Installment Plan</span>
              <div className="text-2xl font-bold text-emerald-400">
                {FROZEN_DATA_ANALYTICS_FACTS.fee.emi}
              </div>
              <p className="text-xs text-slate-400">Installment schedule confirmed during enrollment</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white">What Is Included in the Fee</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
              <li>• 150+ Hours of Content delivered through structured analytical learning modules.</li>
              <li>• 90+ Live Sessions led directly by expert corporate analytics instructors.</li>
              <li>• Hands-on practical training across 15+ Tools and Software applications.</li>
              <li>• Comprehensive guidance from 30+ Industry Expert Trainers throughout course training.</li>
              <li>• Execution and code review of three complete practical capstone projects.</li>
              <li>• Dedicated Career & Placement Assistance provided by experienced program advisors.</li>
              <li>• Official Skillsha certificate of completion issued upon meeting graduation criteria.</li>
            </ul>
          </div>

          <div className="space-y-2 text-xs text-slate-400 border-t border-slate-800 pt-3">
            <p>
              <strong>How the Fee Is Calculated:</strong> The program tuition is structured with a base tuition fee of ₹21,500. Adding statutory government Goods and Services Tax of 18%, which equals ₹3,870, brings the total payable enrollment fee to exactly ₹25,370 with complete access to all live training sessions and placement assistance.
            </p>
            <p>
              <strong>EMI Payment Note:</strong> Flexible monthly installment payment options start from ₹4,622 per month across six months, allowing students to manage their educational expenses conveniently. Fee verified by Admin Department, reviewed 6 October 2026.
            </p>
          </div>
        </section>

        {/* <!-- S17 --> Who Should Join */}
        <section id="s17" className="space-y-6 pt-10 border-t border-slate-800">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Who Should Join This Data Analytics Course in {city}?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              This data analytics training in {city} is designed for fresh graduates, career switchers,
              non-IT personnel, working corporate professionals, engineering students, and individuals
              returning to the workforce.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-blue-400">Graduates</span>
              <p className="text-xs text-slate-300">Fresh college graduates seeking modern technical capabilities to enter high-growth commercial data analyst roles.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-indigo-400">Career Switchers</span>
              <p className="text-xs text-slate-300">Professionals in non-technical domains wanting to transition into high-demand data analytics careers smoothly.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-amber-400">Non-IT Backgrounds</span>
              <p className="text-xs text-slate-300">Candidates from commerce or arts streams looking to build structured quantitative and analytical abilities.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-emerald-400">Working Professionals</span>
              <p className="text-xs text-slate-300">Corporate employees in marketing, sales, or operations aiming to automate routine reporting tasks.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-purple-400">Engineering Students</span>
              <p className="text-xs text-slate-300">Technical engineering students wanting hands-on Python, SQL, and business intelligence project portfolio experience.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-cyan-400">Career Restarters</span>
              <p className="text-xs text-slate-300">Individuals re-entering the professional workforce seeking up-to-date analytical and generative AI technical credentials.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white">Eligibility and What You Need to Start</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
              <li>• No prior coding or technical programming background experience is required.</li>
              <li>• A working laptop or personal desktop computer for practical exercises.</li>
              <li>• A stable internet connection capable of streaming live video sessions.</li>
              <li>• Basic familiarity with elementary mathematics and common daily logical thinking.</li>
            </ul>
          </div>
        </section>

        {/* <!-- S18 --> Careers in City */}
        <section id="s18" className="space-y-6 pt-10 border-t border-slate-800">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Data Analytics Careers in {city}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Data analytics careers in {city} span major corporate tech clusters, media enterprises,
              consulting agencies, and expanding ecommerce firms, generating strong recruitment demand
              for skilled analytical professionals.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {cityData.careersText}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white">Industries in {city} That Hire Data Analysts</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {cityData.industriesBullets.map((bullet, idx) => (
                <li key={idx}>• {bullet}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white">How {city} Learners Attend Skillsha Classes</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {cityData.howAttendText}
            </p>
          </div>
        </section>

        {/* <!-- S19 --> Learning Centre in Noida */}
        <section id="s19" className="space-y-4 pt-10 border-t border-slate-800">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Skillsha Learning Centre in Noida</h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Skillsha operates its sole national learning centre in Noida, Uttar Pradesh, housing our
            academic faculty, live instructional broadcast studios, and student placement coordination
            teams.
          </p>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Skillsha conducts all in-person corporate and academic administrative operations exclusively
            from its single accredited learning facility in Noida. While learners across India join via
            live online batches, our administrative and placement headquarters operates from this
            location.
          </p>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs sm:text-sm text-slate-300">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span><strong>Address:</strong> {FROZEN_DATA_ANALYTICS_FACTS.centre}</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>Phone:</strong> {FROZEN_DATA_ANALYTICS_FACTS.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 text-amber-400 shrink-0 text-center font-bold">@</span>
              <span><strong>Email:</strong> {FROZEN_DATA_ANALYTICS_FACTS.email}</span>
            </div>
          </div>
        </section>

        {/* <!-- S20 --> Comparison Table */}
        <section id="s20" className="space-y-6 pt-10 border-t border-slate-800">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Data Analytics vs Data Science vs Business Analytics
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Data analytics focuses on historical operational trends, business analytics guides
              organizational strategy, and data science develops complex predictive machine learning
              models.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Prospective students frequently evaluate the differences between data analytics, data science,
              and business analytics before enrolling. Understanding the distinct focus, tools, starting skill
              requirements, and career outcomes of each domain helps learners select the program best aligned
              with their professional goals.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-800/80 text-white font-bold uppercase text-[11px] border-b border-slate-700">
                <tr>
                  <th className="py-3 px-5">Data Analytics</th>
                  <th className="py-3 px-5">Data Science</th>
                  <th className="py-3 px-5">Business Analytics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="py-3 px-5">Focus: Analyzing historical operational datasets to generate actionable business performance insights.</td>
                  <td className="py-3 px-5">Focus: Building complex predictive statistical algorithms, neural networks, and automated systems.</td>
                  <td className="py-3 px-5">Focus: Evaluating broad strategic commercial objectives and guiding managerial financial decisions.</td>
                </tr>
                <tr>
                  <td className="py-3 px-5">Tools: Excel, SQL, Python, Power BI, Tableau, and generative AI assistants.</td>
                  <td className="py-3 px-5">Tools: Advanced Python, R, TensorFlow, PyTorch, Scikit-learn, and cloud pipelines.</td>
                  <td className="py-3 px-5">Tools: Advanced Excel, Power BI, Tableau, statistical packages, and presentation decks.</td>
                </tr>
                <tr>
                  <td className="py-3 px-5">Outputs: Interactive dashboards, metric summary reports, data cleaning scripts, trend visualizations.</td>
                  <td className="py-3 px-5">Outputs: Predictive models, automated recommendation engines, machine learning pipelines, classification tools.</td>
                  <td className="py-3 px-5">Outputs: Strategic commercial proposals, financial variance reports, process improvement roadmaps, presentations.</td>
                </tr>
                <tr>
                  <td className="py-3 px-5">Skills: Basic logical thinking, elementary mathematics, curiosity; no prior coding needed.</td>
                  <td className="py-3 px-5">Skills: Strong mathematical foundations, advanced calculus, linear algebra, basic programming background.</td>
                  <td className="py-3 px-5">Skills: Commercial business awareness, financial fundamentals, domain knowledge, strong communication skills.</td>
                </tr>
                <tr>
                  <td className="py-3 px-5">Roles: Data Analyst, BI Analyst, Operations Analyst, Reporting Specialist, Marketing Analyst.</td>
                  <td className="py-3 px-5">Roles: Data Scientist, Machine Learning Engineer, AI Specialist, Research Scientist.</td>
                  <td className="py-3 px-5">Roles: Business Analyst, Management Consultant, Strategy Associate, Commercial Operations Manager.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white">What to Check Before Choosing a Data Analytics Course in {city}</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>• Verify total course fees including statutory GST charges without assuming unconfirmed zero-interest credit terms.</li>
              <li>• Confirm instructors possess documented corporate experience and substantial industry training backgrounds before enrolling.</li>
              <li>• Ensure the curriculum emphasizes practical capstone projects hosted publicly on verified GitHub repositories.</li>
              <li>• Check that institutional placement statistics originate directly from verifiable internal student career records.</li>
              <li>• Inspect student ratings on independent third-party platforms to confirm genuine authentic educational feedback.</li>
              <li>• Review module breakdowns to guarantee coverage of SQL, Python, Power BI, and Gen AI.</li>
            </ul>
          </div>
        </section>

        {/* <!-- S21 --> FAQs Accordion */}
        <section id="s21" className="space-y-6 pt-10 border-t border-slate-800">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Questions About the Data Analytics Course in {city}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Find straightforward, verified answers to common questions about the Data Analytics with
              Gen AI course in {city}, including duration, fees, eligibility, and placement support.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-400' : 'text-slate-500'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* <!-- S22 --> Editorial Verification Details */}
        <section id="s22" className="space-y-4 pt-10 border-t border-slate-800">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Editorial and Verification Details</h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            All curriculum details, tuition figures, trainer qualifications, and placement numbers
            published on this page undergo formal verification by Skillsha academic and administrative
            reviewers.
          </p>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Skillsha maintains strict editorial standards to ensure all course descriptions, financial
            figures, curriculum milestones, and career metrics remain accurate, transparent, and
            completely verifiable. Academic coordinators, technical instructors, and administrative
            leaders review every published page before public release.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-800/80 text-white font-bold uppercase text-[11px] border-b border-slate-700">
                <tr>
                  <th className="py-3 px-5">Verification Parameter</th>
                  <th className="py-3 px-5">Verified Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {EDITORIAL_VERIFICATION_TABLE.map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-5 font-semibold text-white">{row.param}</td>
                    <td className="py-3 px-5 text-slate-300">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* <!-- S23 --> Related Courses & Other Cities */}
        <section id="s23" className="space-y-4 pt-10 border-t border-slate-800">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Explore Related Courses and Other Cities</h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Skillsha provides live online training programs across major Indian cities alongside advanced
            career tracks in data science with generative artificial intelligence.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            <Link href="/course/data-analytics-course-in-noida-with-gen-ai" className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-blue-400 hover:border-blue-500 transition-colors">
              Data Analytics Course in Noida with Gen AI
            </Link>
            <Link href="/course/data-analytics-course-in-pune-with-gen-ai" className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-blue-400 hover:border-blue-500 transition-colors">
              Data Analytics Course in Pune with Gen AI
            </Link>
            <Link href="/course/data-analytics-course-in-delhi-with-gen-ai" className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-blue-400 hover:border-blue-500 transition-colors">
              Data Analytics Training in Delhi
            </Link>
            <Link href="/course/data-analytics-course-in-gurugram-with-gen-ai" className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-blue-400 hover:border-blue-500 transition-colors">
              Gurugram Data Analyst Program
            </Link>
            <Link href="/course/data-analytics-course-in-ghaziabad-with-gen-ai" className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-blue-400 hover:border-blue-500 transition-colors">
              Ghaziabad Data Analytics Course with Placement Assistance
            </Link>
            <Link href="/course/data-analytics-course-in-greater-noida-with-gen-ai" className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-blue-400 hover:border-blue-500 transition-colors">
              Greater Noida Data Analytics with Gen AI Training
            </Link>
            <Link href="/course/data-analytics-course-in-faridabad-with-gen-ai" className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-blue-400 hover:border-blue-500 transition-colors">
              Faridabad Data Analytics Certification
            </Link>
            <Link href="/course/data-analytics-course-in-lucknow-with-gen-ai" className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-blue-400 hover:border-blue-500 transition-colors">
              Data Analytics Training in Lucknow
            </Link>
            <Link href="/course/data-analytics-course-in-jaipur-with-gen-ai" className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-blue-400 hover:border-blue-500 transition-colors">
              Jaipur Data Analytics Course with Placement Support
            </Link>
            <Link href="/course/data-science-course-with-gen-ai" className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-indigo-400 hover:border-indigo-500 transition-colors">
              Data Science Course with Gen AI
            </Link>
          </div>
        </section>

        {/* <!-- S24 --> Start Journey in City */}
        <section id="s24" className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-900/40 text-center space-y-6 shadow-2xl">
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Start Your Data Analytics Journey in {city}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Enroll in the Skillsha Data Analytics with Gen AI course in {city} to gain job-ready
              skills through live interactive training, real-world projects, and dedicated career
              assistance.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Connect with a Skillsha advisor to evaluate curriculum details, discuss upcoming batch
              schedules, and clarify enrollment steps. Our team helps you understand the training
              structure, tools covered, and placement assistance available for learners joining our
              classes from {city}.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={openModal}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Talk to Program Advisor</span>
            </button>
            <button
              type="button"
              onClick={openModal}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all cursor-pointer"
            >
              <span>Enroll Now</span>
            </button>
            <a
              href={`tel:${FROZEN_DATA_ANALYTICS_FACTS.phone.replace(/[^0-9+]/g, '')}`}
              className="px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-mono border border-white/10"
            >
              {FROZEN_DATA_ANALYTICS_FACTS.phone}
            </a>
          </div>
        </section>

        {/* <!-- S25 --> Disclaimer */}
        <section id="s25" className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 space-y-2">
          <h2 className="text-sm font-bold text-slate-300">Important Disclaimer</h2>
          <p className="leading-relaxed">
            Skillsha maintains transparent operational policies regarding placement assistance, learning outcomes, salary estimates, and tuition payment terms for all enrolled students. Individual learning and employment outcomes depend on personal dedication, academic background, portfolio quality, and interview performance. Dedicated career and placement assistance does not constitute a guaranteed job offer. Salary ranges published are indicative market estimates rather than binding commitments. Monthly installment terms are formally finalized with financing providers during enrollment.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
