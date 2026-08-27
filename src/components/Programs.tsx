"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { getCourseSlugById } from '@/data/courses';
import { track } from "@vercel/analytics";

interface IncludeItem {
  name: string;
  domain?: string;
  icon?: React.ReactNode;
}

interface Program {
  id: string;
  icon: string | React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  salary: string;
  svgBg: React.ReactNode;
  mobileIcon: React.ReactNode;
  includes: IncludeItem[];
  professions: string[];
}

const programs: Program[] = [
  {
    id: 'digital-marketing-with-gen-ai',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 animate-pulse">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
        <circle cx="12" cy="12" r="4" fill="currentColor" className="text-amber-500/40" />
      </svg>
    ),
    title: 'Digital Marketing with Gen AI',
    subtitle: 'Master AI-Driven Acquisition & Growth',
    description: "Combine copywriting, Meta Ads, and SEO with advanced Generative AI content and video automation engines for modern scale.",
    duration: '12 Weeks',
    salary: '₹15L+',
    svgBg: (
      <svg className="w-20 h-20 text-amber-500/[0.08] dark:text-amber-500/[0.05] mr-[-10px] mt-[-5px] animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        <polygon points="50,15 90,85 10,85" strokeDasharray="3 3"/>
        <circle cx="50" cy="55" r="15"/>
      </svg>
    ),
    mobileIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 animate-pulse"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
    ),
    includes: [
      { name: 'AI Copywriting', domain: 'openai.com' },
      { name: 'AI Video Creatives', domain: 'runwayml.com' },
      { name: 'Meta & Google Ads', domain: 'meta.com' },
      { name: 'Growth Loops', domain: 'ycombinator.com' },
      { name: 'Funnel Automation', domain: 'stripe.com' },
      { name: 'Data Insights', domain: 'mixpanel.com' },
    ],
    professions: ['marketer', 'corporate', 'ca', 'lawyer', 'doctor']
  },
  {
    id: 'digital-marketing-noida',
    icon: 'ads_click',
    title: 'Digital Marketing India',
    subtitle: 'India Flagship Training',
    description: 'Master the future of marketing in India. Combine core growth marketing strategies with Generative AI tools to build high-converting ad engines.',
    duration: '24 Weeks',
    salary: '₹9.5L+',
    svgBg: (
      <svg className="w-20 h-20 text-brand-orange/[0.08] dark:text-brand-orange/[0.05] mr-[-10px] mt-[-5px] animate-float" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M0 80 Q 25 50, 50 60 T 100 20" strokeWidth="1.5"/>
      </svg>
    ),
    mobileIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/></svg>
    ),
    includes: [
      { name: 'Meta Ads', domain: 'meta.com' },
      { name: 'Google Ads', domain: 'google.com' },
      { name: 'SEO Training', domain: 'google.com' },
      { name: 'AI Copywriting', domain: 'openai.com' },
      { name: 'GTM Analytics', domain: 'google.com' },
      { name: 'India Projects', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 12 2 2 4-4"/></svg> }
    ],
    professions: ['marketer']
  },
  {
    id: 'digital-marketing',
    icon: 'ads_click',
    title: 'Digital Marketing',
    subtitle: 'Master Growth Marketing',
    description: "Build data-driven, high-converting campaigns across Meta Ads, Google Ads, and YouTube through SkillSha's practical digital marketing training.",
    duration: '20 Weeks',
    salary: '₹12L+',
    svgBg: (
      <svg className="w-20 h-20 text-brand-orange/[0.08] dark:text-brand-orange/[0.05] mr-[-10px] mt-[-5px] animate-float" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M0 80 Q 25 50, 50 60 T 100 20" strokeWidth="1.5"/>
        <line x1="20" y1="0" x2="20" y2="100" strokeDasharray="2 4"/>
        <line x1="50" y1="0" x2="50" y2="100" strokeDasharray="2 4"/>
        <line x1="80" y1="0" x2="80" y2="100" strokeDasharray="2 4"/>
      </svg>
    ),
    mobileIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
    ),
    includes: [
      { name: 'Meta Ads', domain: 'meta.com' },
      { name: 'Google Ads', domain: 'google.com' },
      { name: 'Funnel Building', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg> },
      { name: 'Conversion Optimization', domain: 'hotjar.com' },
      { name: 'Analytics', domain: 'mixpanel.com' },
      { name: 'Growth Strategy', domain: 'ycombinator.com' },
    ],
    professions: ['marketer']
  },
  {
    id: 'data-science-ai',
    icon: 'database',
    title: 'Data Science & AI',
    subtitle: 'Launch a Career in Data Science',
    description: "Master Python, machine learning, predictive modeling, and AI-driven data workflows with SkillSha's hands-on data science training program.",
    duration: '20 Weeks',
    salary: '₹12L+',
    svgBg: (
      <svg className="w-20 h-20 text-brand-orange/[0.08] dark:text-brand-orange/[0.05] mr-[-10px] mt-[-5px] animate-pulse-soft" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="30" cy="30" r="4" fill="currentColor"/>
        <circle cx="70" cy="40" r="4" fill="currentColor"/>
        <circle cx="50" cy="70" r="4" fill="currentColor"/>
        <line x1="30" y1="30" x2="70" y2="40"/>
        <line x1="70" y1="40" x2="50" y2="70"/>
      </svg>
    ),
    mobileIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
    ),
    includes: [
      { name: 'Python', domain: 'python.org' },
      { name: 'Data Analytics', domain: 'tableau.com' },
      { name: 'Machine Learning', domain: 'tensorflow.org' },
      { name: 'Predictive Modeling', domain: 'kaggle.com' },
      { name: 'Visualization', domain: 'd3js.org' },
      { name: 'AI Data Systems', domain: 'snowflake.com' },
    ],
    professions: ['developer', 'ca', 'doctor', 'corporate']
  },
];

const getProgramColors = (id: string) => {
  switch (id) {
    case 'digital-marketing-with-gen-ai':
    case 'digital-marketing-noida':
      return {
        bg: 'bg-amber-500/10 dark:bg-amber-500/15',
        border: 'border-amber-500/35 dark:border-amber-500/25',
        text: 'text-amber-500 dark:text-amber-400',
        shadow: 'shadow-[0_0_20px_rgba(245,158,11,0.25)]'
      };
    case 'ai-engineering':
    case 'ai-ml-with-gen-ai':
      return {
        bg: 'bg-brand-orange/10 dark:bg-brand-orange/15',
        border: 'border-brand-orange/25',
        text: 'text-brand-orange',
        shadow: 'shadow-[0_0_15px_rgba(249,115,22,0.15)]'
      };
    case 'full-stack-development':
      return {
        bg: 'bg-blue-500/10 dark:bg-blue-500/15',
        border: 'border-blue-500/25',
        text: 'text-blue-500',
        shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.15)]'
      };
    case 'digital-marketing':
      return {
        bg: 'bg-orange-500/10 dark:bg-orange-500/15',
        border: 'border-orange-500/25',
        text: 'text-orange-500',
        shadow: 'shadow-[0_0_15px_rgba(249,115,22,0.15)]'
      };
    case 'ui-ux-design':
      return {
        bg: 'bg-pink-500/10 dark:bg-pink-500/15',
        border: 'border-pink-500/25',
        text: 'text-pink-500',
        shadow: 'shadow-[0_0_15px_rgba(236,72,153,0.15)]'
      };
    case 'data-science-ai':
    case 'data-analyst':
      return {
        bg: 'bg-cyan-500/10 dark:bg-cyan-500/15',
        border: 'border-cyan-500/25',
        text: 'text-cyan-500',
        shadow: 'shadow-[0_0_15px_rgba(6,182,212,0.15)]'
      };
    case 'business-analyst':
      return {
        bg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
        border: 'border-indigo-500/25',
        text: 'text-indigo-500',
        shadow: 'shadow-[0_0_15px_rgba(99,102,241,0.15)]'
      };
    case 'software-testing':
      return {
        bg: 'bg-rose-500/10 dark:bg-rose-500/15',
        border: 'border-rose-500/25',
        text: 'text-rose-500',
        shadow: 'shadow-[0_0_15px_rgba(244,63,94,0.15)]'
      };
    case 'playwright-automation':
      return {
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
        border: 'border-emerald-500/25',
        text: 'text-emerald-500',
        shadow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]'
      };
    case 'product-management':
      return {
        bg: 'bg-violet-500/10 dark:bg-violet-500/15',
        border: 'border-violet-500/25',
        text: 'text-violet-500',
        shadow: 'shadow-[0_0_15px_rgba(139,92,246,0.15)]'
      };
    case 'algorithmic-trading':
      return {
        bg: 'bg-rose-500/10 dark:bg-rose-500/15',
        border: 'border-rose-500/25',
        text: 'text-rose-500',
        shadow: 'shadow-[0_0_15px_rgba(244,63,94,0.15)]'
      };
    case 'graphic-designing':
      return {
        bg: 'bg-fuchsia-500/10 dark:bg-fuchsia-500/15',
        border: 'border-fuchsia-500/25',
        text: 'text-fuchsia-500',
        shadow: 'shadow-[0_0_15px_rgba(217,70,239,0.15)]'
      };
    case 'ai-healthcare-doctor':
      return {
        bg: 'bg-rose-500/10 dark:bg-rose-500/15',
        border: 'border-rose-500/25',
        text: 'text-rose-500',
        shadow: 'shadow-[0_0_15px_rgba(244,63,94,0.15)]'
      };
    case 'ai-clinical-nurse':
      return {
        bg: 'bg-teal-500/10 dark:bg-teal-500/15',
        border: 'border-teal-500/25',
        text: 'text-teal-500',
        shadow: 'shadow-[0_0_15px_rgba(20,184,166,0.15)]'
      };
    case 'ai-finance-ca':
      return {
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
        border: 'border-emerald-500/25',
        text: 'text-emerald-500',
        shadow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]'
      };
    default:
      return {
        bg: 'bg-brand-orange/10 dark:bg-brand-orange/15',
        border: 'border-brand-orange/25',
        text: 'text-brand-orange',
        shadow: 'shadow-[0_0_15px_rgba(249,115,22,0.15)]'
      };
  }
};

export default function Programs({ className = "mt-24" }: { className?: string }) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    if (expandedCardId === id) {
      setExpandedCardId(null);
    } else {
      setExpandedCardId(id);
    }
  };

  const categories = [
    { id: 'all', name: 'All Programs', desc: 'Browse all professional courses.' },
    { id: 'design-marketing', name: 'Design & Marketing', desc: 'Design high-converting visual systems and automate acquisition engines powered by Gen AI.' },
    { id: 'data-analytics', name: 'Data & Analytics', desc: 'Master SQL, PowerBI, and machine learning models to extract actionable business insights.' }
  ];

  const programCategoryMap: Record<string, string> = {
    'ai-engineering': 'ai-dev',
    'full-stack-development': 'ai-dev',
    'ai-ml-with-gen-ai': 'ai-dev',
    'software-testing': 'ai-dev',
    'playwright-automation': 'ai-dev',
    
    'data-science-ai': 'data-analytics',
    'data-analyst': 'data-analytics',
    'business-analyst': 'data-analytics',
    
    'digital-marketing-with-gen-ai': 'design-marketing',
    'digital-marketing-noida': 'design-marketing',
    'digital-marketing': 'design-marketing',
    'ui-ux-design': 'design-marketing',
    'graphic-designing': 'design-marketing',
    
    'product-management': 'professional-ai',
    'algorithmic-trading': 'professional-ai',
    'ai-healthcare-doctor': 'professional-ai',
    'ai-clinical-nurse': 'professional-ai',
    'ai-finance-ca': 'professional-ai'
  };

  const categoriesToRender = activeCategory === 'all'
    ? categories.filter(c => c.id !== 'all')
    : categories.filter(c => c.id === activeCategory);

  return (
    <section id="programs" className={`scroll-mt-[100px] ${className} mb-16 animate-reveal delay-300 max-w-full`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-svg {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-4px) scale(1.02); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.8; }
        }
        .animate-float {
          animation: float-svg 4s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 22s linear infinite;
          transform-origin: 50px 50px;
        }
        .animate-pulse-soft {
          animation: pulse-soft 3s ease-in-out infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      ` }} />

      <div className="flex flex-col items-center mb-10 text-center max-w-[800px] mx-auto px-4 md:px-0">
        <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
          </span>
          <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">Industry-Led Programs</span>
        </div>
        <h2 className="text-[32px] md:text-[42px] font-bold tracking-tight text-zinc-900 dark:text-white mb-4 leading-[1.1]"><span className="text-brand-orange">Build</span> Real Skills.<br className="md:hidden" /> Launch Real Products with SkillSha.</h2>
        <p className="text-[14px] md:text-[16px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed max-w-[600px] font-medium">Learn directly from industry operators who&apos;ve built products at OpenAI, Meta, and Framer — not just theory-based trainers.</p>
      </div>

      {/* Category Tab Selector */}
      <div className="flex justify-start md:justify-center items-center gap-2 mb-12 overflow-x-auto no-scrollbar pb-3 px-4 max-w-5xl mx-auto border-b border-zinc-200/50 dark:border-white/5 select-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                track("Button Clicked", { button_name: `Filter Category: ${cat.name}`, location: "Programs Section" }, { flags: ["show-new-hero-banner"] });
                setActiveCategory(cat.id);
              }}
              className={`px-4.5 py-2.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-brand-orange to-brand-red text-white shadow-md shadow-brand-orange/20 scale-[1.02]'
                  : 'bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200/50 dark:border-white/5'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-0">
        {categoriesToRender.map((category) => {
          const categoryPrograms = programs.filter(p => programCategoryMap[p.id] === category.id);
          if (categoryPrograms.length === 0) return null;

          return (
            <div key={category.id} className="mb-14 first:mt-0 mt-8">
              {/* Category Header */}
              <div className="mb-8 border-l-4 border-brand-orange pl-4.5 text-left">
                <h3 className="text-xl md:text-2xl font-black text-zinc-955 dark:text-white tracking-tight leading-none mb-1.5">{category.name}</h3>
                <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl">{category.desc}</p>
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
                {categoryPrograms.map((program) => {
                  const isFlagship = program.id === 'digital-marketing-with-gen-ai';
                  return (
                    <Link 
                      key={program.id} 
                      href={`/course/${getCourseSlugById(program.id)}`} 
                      className={`block relative bg-white dark:bg-[#0c0c0c] rounded-[24px] p-6 lg:p-8 transition-all duration-500 hover:-translate-y-1.5 group flex flex-col h-full cursor-pointer overflow-hidden z-10 ${
                        isFlagship 
                          ? 'border-2 border-amber-500/60 dark:border-amber-500/40 shadow-[0_4px_30px_rgba(245,158,11,0.08)] dark:shadow-[0_4px_30px_rgba(245,158,11,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.2)] dark:hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.15)] hover:border-amber-500' 
                          : 'border border-zinc-200/80 dark:border-white/5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.08)] hover:border-brand-orange/40'
                      }`}
                    >
                      {isFlagship && (
                        <div className="absolute top-0 right-0 z-30">
                          <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-bl-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[9px] font-extrabold uppercase tracking-widest shadow-md animate-pulse">
                            🔥 FLAGSHIP
                          </span>
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/0 via-transparent to-brand-orange/0 group-hover:from-brand-orange/[0.03] group-hover:to-transparent transition-colors duration-500 -z-10 pointer-events-none"></div>
                      <div className="relative overflow-hidden border-b border-zinc-200/80 dark:border-white/10 -mx-6 -mt-6 lg:-mx-8 lg:-mt-8 p-5 lg:p-6 mb-5 lg:mb-6 rounded-t-[24px] h-[95px] md:h-[105px] flex items-center justify-between bg-gradient-to-r from-brand-orange/[0.03] to-transparent dark:from-brand-orange/[0.05] dark:to-transparent backdrop-blur-md select-none">
                        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-grid pointer-events-none"></div>
                        <div className="absolute -right-4 -bottom-10 w-28 h-28 rounded-full bg-brand-orange/[0.03] blur-xl pointer-events-none"></div>
                        <div className="flex items-center gap-3.5 relative z-10">
                          {(() => {
                            const colors = getProgramColors(program.id);
                            return (
                              <div className={`w-10 h-10 md:w-11 md:h-11 rounded-xl ${colors.bg} ${colors.border} flex items-center justify-center flex-shrink-0 ${colors.shadow} ${colors.text}`}>
                                {typeof program.icon === 'string' ? (
                                  <span className="material-symbols-outlined text-[20px] md:text-[22px]">{program.icon}</span>
                                ) : (
                                  program.icon
                                )}
                              </div>
                            );
                          })()}
                          <div className="flex flex-col text-left">
                            <h3 className="text-[16px] md:text-[17px] font-semibold text-zinc-800 dark:text-zinc-100 tracking-tight leading-tight mb-0.5">{program.title}</h3>
                            <p className="text-[11px] md:text-[12px] text-zinc-500 dark:text-zinc-400 font-medium m-0 leading-none">{program.subtitle}</p>
                          </div>
                        </div>
                        <div className="absolute right-0 top-0 bottom-0 h-full w-1/3 opacity-30 flex items-center justify-end overflow-hidden pointer-events-none">
                          {program.svgBg}
                        </div>
                      </div>
                      <p className="text-[14px] text-zinc-500 dark:text-[#9CA3AF] mb-6 leading-relaxed flex-grow text-left">{program.description}</p>
                      
                      <div className="flex items-center justify-between border border-zinc-200/80 dark:border-white/10 rounded-[14px] p-3 mb-5 bg-white dark:bg-white/[0.02]">
                        <div className="flex items-center gap-3 w-1/2 pr-2 border-r border-zinc-200 dark:border-white/10">
                          <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                          </div>
                          <div className="text-left">
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium leading-none mb-1.5">Duration</p>
                            <p className="text-[13px] font-bold text-zinc-900 dark:text-white leading-none">{program.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 w-1/2 pl-4">
                          <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                          </div>
                          <div className="text-left">
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium leading-none mb-1.5">Avg. Salary</p>
                            <p className="text-[13px] font-bold text-zinc-900 dark:text-white leading-none">{program.salary}</p>
                          </div>
                        </div>
                      </div>
         
                      <div className="mt-auto pt-5 border-t border-zinc-200/60 dark:border-white/5">
                        <p className="text-[10px] text-zinc-400 dark:text-[#6b7280] uppercase tracking-[0.15em] mb-3 font-semibold text-left">Includes</p>
                        <div className="flex flex-wrap gap-2">
                          {program.includes.map((inc, i) => (
                            <span key={i} className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 bg-zinc-50 dark:bg-white/[0.03] text-zinc-700 dark:text-zinc-300 rounded-lg border border-zinc-200/60 dark:border-white/5 font-medium group-hover:border-zinc-300 dark:group-hover:border-white/10 transition-colors">
                              {inc.domain ? (
                                <img loading="lazy" src={`https://www.google.com/s2/favicons?domain=${inc.domain}&sz=128`} alt="icon" className="w-3.5 h-3.5 object-contain flex-shrink-0" />
                              ) : (
                                inc.icon || <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                              )}
                              {inc.name}
                            </span>
                          ))}
                        </div>
                        <div className="mt-6 flex items-center justify-between text-[13px] font-semibold text-zinc-400 group-hover:text-brand-orange transition-colors pt-4 border-t border-dashed border-zinc-200 dark:border-white/5">
                          <span>Explore Curriculum</span>
                          <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-brand-orange/20 transition-colors">
                            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Accordion */}
              <div className="flex flex-col gap-2.5 md:hidden px-0">
                {categoryPrograms.map((program) => {
                  const isFlagship = program.id === 'digital-marketing-with-gen-ai';
                  return (
                    <div 
                      key={program.id} 
                      className={`relative overflow-hidden transition-all duration-300 course-card cursor-pointer rounded-[20px] p-4 shadow-md ${
                        isFlagship 
                          ? 'bg-amber-500/[0.04] dark:bg-amber-500/[0.02] border-2 border-amber-500/50 dark:border-amber-500/35 shadow-[0_4px_20px_rgba(245,158,11,0.08)]'
                          : 'bg-zinc-50/80 dark:bg-[#161616] border border-zinc-200 dark:border-white/5'
                      } ${
                        expandedCardId === program.id ? 'course-card-expanded' : ''
                      }`} 
                      onClick={() => toggleCard(program.id)}
                    >
                      {isFlagship && (
                        <div className="absolute top-0 right-0 z-20">
                          <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-bl-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[8px] font-extrabold uppercase tracking-widest leading-none">
                            FLAGSHIP
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-800 dark:to-[#1a1a1a] border border-zinc-200/80 dark:border-white/10 flex items-center justify-center flex-shrink-0 shadow-sm dark:shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                          {typeof program.mobileIcon === 'string' ? (
                            <span className="material-symbols-outlined text-[20px] text-zinc-500 dark:text-zinc-400">{program.mobileIcon}</span>
                          ) : (
                            program.mobileIcon
                          )}
                        </div>
                        <div className="flex-grow min-w-0 text-left">
                          <h3 className="text-[17px] font-semibold text-zinc-900 dark:text-white mb-0.5 truncate">{program.title}</h3>
                          <p className="text-[13px] text-zinc-500 dark:text-zinc-400 font-medium truncate">{program.subtitle}</p>
                        </div>
                        <div className={`w-5 h-5 flex items-center justify-center text-zinc-400 transition-transform duration-300 transform ${expandedCardId === program.id ? 'rotate-180' : ''}`}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                      </div>
                      
                      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${expandedCardId === program.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                        <div className="overflow-hidden">
                          <div className="pt-4">
                            <p className="text-[13px] text-zinc-600 dark:text-[#9CA3AF] leading-relaxed mb-4 text-left">{program.description}</p>
                            
                            <div className="flex items-center justify-between border border-zinc-200/80 dark:border-white/10 rounded-[12px] p-2.5 mb-4 bg-white dark:bg-white/[0.02]">
                              <div className="flex items-center gap-2.5 w-1/2 pr-2 border-r border-zinc-200 dark:border-white/10">
                                <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                </div>
                                <div className="text-left">
                                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium leading-none mb-1">Duration</p>
                                  <p className="text-[12px] font-bold text-zinc-900 dark:text-white leading-none">{program.duration}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2.5 w-1/2 pl-2">
                                <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                  <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                                </div>
                                <div className="text-left">
                                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium leading-none mb-1">Avg. Salary</p>
                                  <p className="text-[12px] font-bold text-zinc-900 dark:text-white leading-none">{program.salary}</p>
                                </div>
                              </div>
                            </div>
                            <div className="w-full h-[1px] bg-zinc-200/60 dark:bg-white/5 mb-3"></div>
                            <p className="text-[10px] text-zinc-400 dark:text-[#6b7280] uppercase tracking-[0.15em] mb-2.5 font-semibold text-left">Includes</p>
                            
                            <div className="relative w-full overflow-hidden flex" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
                              <div className="flex gap-2 w-max pb-1 overflow-x-auto no-scrollbar">
                                {program.includes.map((inc, i) => (
                                  <span key={i} className="flex items-center gap-1.5 text-[11px] whitespace-nowrap px-2.5 py-1.5 bg-zinc-100/80 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 rounded-[8px] border border-zinc-200/80 dark:border-white/5 shadow-sm font-medium">
                                    {inc.domain ? (
                                      <img loading="lazy" src={`https://www.google.com/s2/favicons?domain=${inc.domain}&sz=128`} alt="icon" className="w-3.5 h-3.5 object-contain flex-shrink-0" />
                                    ) : (
                                      inc.icon || <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-brand-orange shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                                    )}
                                    {inc.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <Link href={`/course/${getCourseSlugById(program.id)}`} className="mt-5 w-full block text-center py-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white text-[13px] font-bold tracking-wide shadow-md shadow-brand-orange/20 hover:scale-[1.02] active:scale-95 transition-all">
                              Explore Curriculum
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
