"use client";
import React, { useState } from 'react';
import Link from 'next/link';

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
    id: 'ai-engineering',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange">
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
        <path d="M9 13a4.5 4.5 0 0 0 3-4" />
        <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
        <path d="M3.477 10.896a4 4 0 0 1 .556 6.588" />
        <path d="M12 5a3 3 0 0 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
        <path d="M15 13a4.5 4.5 0 0 1-3-4" />
      </svg>
    ),
    title: 'AI Engineering',
    subtitle: 'Build AI Systems For The Modern Economy',
    description: 'Learn prompt engineering, AI automation, LLM workflows, AI agents, and enterprise AI systems through practical implementation and real-world projects.',
    duration: '20 Weeks',
    salary: '₹ 8.9 LPA',
    svgBg: (
      <svg className="w-20 h-20 text-brand-orange/[0.08] dark:text-brand-orange/[0.05] mr-[-10px] mt-[-5px] animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="50" cy="50" r="30" strokeDasharray="4 4"/>
        <circle cx="50" cy="50" r="20"/>
        <circle cx="50" cy="50" r="10" fill="currentColor"/>
        <line x1="50" y1="20" x2="50" y2="0" strokeDasharray="2 2"/>
        <line x1="50" y1="80" x2="50" y2="100" strokeDasharray="2 2"/>
        <line x1="20" y1="50" x2="0" y2="50" strokeDasharray="2 2"/>
        <line x1="80" y1="50" x2="100" y2="50" strokeDasharray="2 2"/>
      </svg>
    ),
    mobileIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange">
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
        <path d="M9 13a4.5 4.5 0 0 0 3-4" />
        <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
        <path d="M3.477 10.896a4 4 0 0 1 .556 6.588" />
        <path d="M12 5a3 3 0 0 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
        <path d="M15 13a4.5 4.5 0 0 1-3-4" />
      </svg>
    ),
    includes: [
      { name: 'Prompt Engineering', domain: 'openai.com' },
      { name: 'AI Agents', domain: 'openai.com' },
      { name: 'Workflow Automation', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg> },
      { name: 'Chatbot Systems', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400 flex-shrink-0"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
      { name: 'LLM Applications', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg> },
      { name: 'AI Product Building', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 flex-shrink-0"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg> },
    ],
    professions: ['developer', 'marketer', 'ca', 'doctor', 'nurse', 'lawyer', 'corporate']
  },
  {
    id: 'full-stack-development',
    icon: 'code',
    title: 'Full-Stack Development',
    subtitle: 'Build Modern Web Applications',
    description: 'Master frontend, backend, databases, APIs, cloud infrastructure, and deployment systems used by modern startups and SaaS companies.',
    duration: '20 Weeks',
    salary: '₹ 8.9 LPA',
    svgBg: (
      <svg className="w-20 h-20 text-brand-orange/[0.08] dark:text-brand-orange/[0.05] mr-[-10px] mt-[-5px] animate-pulse-soft" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="10" y="15" width="80" height="20" rx="4"/>
        <rect x="10" y="45" width="80" height="20" rx="4"/>
        <circle cx="20" cy="25" r="2" fill="currentColor"/>
        <circle cx="20" cy="55" r="2" fill="currentColor"/>
      </svg>
    ),
    mobileIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    ),
    includes: [
      { name: 'React & Next.js', domain: 'react.dev' },
      { name: 'Node.js', domain: 'nodejs.org' },
      { name: 'APIs & Databases', domain: 'postgresql.org' },
      { name: 'Cloud Deployment', domain: 'aws.amazon.com' },
      { name: 'Authentication', domain: 'auth0.com' },
      { name: 'SaaS Architecture', domain: 'stripe.com' },
    ],
    professions: ['developer']
  },
  {
    id: 'digital-marketing',
    icon: 'ads_click',
    title: 'Digital Marketing',
    subtitle: 'Learn Growth & Digital Marketing Systems',
    description: 'Build high-converting campaigns across Meta, Google, YouTube, and modern digital channels using data-driven marketing strategies.',
    duration: '20 Weeks',
    salary: '₹ 8.9 LPA',
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
      { name: 'Funnel Building', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400 flex-shrink-0"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg> },
      { name: 'Conversion Optimization', domain: 'hotjar.com' },
      { name: 'Analytics', domain: 'mixpanel.com' },
      { name: 'Growth Strategy', domain: 'ycombinator.com' },
    ],
    professions: ['marketer']
  },
  {
    id: 'ui-ux-design',
    icon: 'polyline',
    title: 'UI/UX Design',
    subtitle: 'Design Premium Digital Experiences',
    description: 'Learn interface design, UX systems, motion design, and modern product thinking for apps, SaaS products, and digital brands.',
    duration: '20 Weeks',
    salary: '₹ 8.9 LPA',
    svgBg: (
      <svg className="w-20 h-20 text-brand-orange/[0.08] dark:text-brand-orange/[0.05] mr-[-10px] mt-[-5px] animate-float" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M10 50 C 30 20, 70 80, 90 50" strokeWidth="1.5"/>
        <circle cx="34" cy="33" r="3" fill="currentColor"/>
        <circle cx="66" cy="67" r="3" fill="currentColor"/>
        <line x1="34" y1="33" x2="66" y2="67" strokeDasharray="2 2"/>
      </svg>
    ),
    mobileIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
    ),
    includes: [
      { name: 'UI Design', domain: 'figma.com' },
      { name: 'UX Systems', domain: 'nngroup.com' },
      { name: 'Figma', domain: 'figma.com' },
      { name: 'Framer', domain: 'framer.com' },
      { name: 'Design Systems', domain: 'storybook.js.org' },
      { name: 'Motion Design', domain: 'lottiefiles.com' },
    ],
    professions: ['designer']
  },
  {
    id: 'data-science-ai',
    icon: 'database',
    title: 'Data Science & AI',
    subtitle: 'Turn Data Into Intelligent Decisions',
    description: 'Master Python, analytics, machine learning, predictive systems, and AI-powered data workflows.',
    duration: '20 Weeks',
    salary: '₹ 8.9 LPA',
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
  {
    id: 'product-management',
    icon: 'route',
    title: 'Product Management',
    subtitle: 'Build Products People Actually Use',
    description: 'Learn product strategy, user research, growth systems, and execution frameworks used by successful technology companies.',
    duration: '20 Weeks',
    salary: '₹ 8.9 LPA',
    svgBg: (
      <svg className="w-20 h-20 text-brand-orange/[0.08] dark:text-brand-orange/[0.05] mr-[-10px] mt-[-5px] animate-float" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        <line x1="10" y1="20" x2="90" y2="20" strokeDasharray="2 2"/>
        <line x1="10" y1="50" x2="90" y2="50" strokeDasharray="2 2"/>
        <rect x="20" y="15" width="40" height="10" rx="3" fill="currentColor" fillOpacity="0.3"/>
        <rect x="45" y="45" width="35" height="10" rx="3" fill="currentColor" fillOpacity="0.3"/>
      </svg>
    ),
    mobileIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-500"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
    ),
    includes: [
      { name: 'Product Strategy', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400 flex-shrink-0"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg> },
      { name: 'User Research', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg> },
      { name: 'Product Analytics', domain: 'analytics.google.com' },
      { name: 'Roadmapping', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400 flex-shrink-0"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg> },
      { name: 'Growth Systems', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400 flex-shrink-0"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg> },
      { name: 'Agile Workflows', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400 flex-shrink-0"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg> },
    ],
    professions: ['corporate', 'developer']
  },
  {
    id: 'algorithmic-trading',
    icon: 'candlestick_chart',
    title: 'Algorithmic Trading',
    subtitle: 'Build Automated Trading Systems',
    description: 'Learn quantitative trading, automated execution systems, market analysis, and financial data modeling.',
    duration: '20 Weeks',
    salary: '₹ 8.9 LPA',
    svgBg: (
      <svg className="w-20 h-20 text-brand-orange/[0.08] dark:text-brand-orange/[0.05] mr-[-10px] mt-[-5px] animate-pulse-soft" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="20" y="30" width="10" height="40" rx="1"/>
        <line x1="25" y1="10" x2="25" y2="90"/>
        <rect x="50" y="20" width="10" height="30" rx="1"/>
        <line x1="55" y1="5" x2="55" y2="85"/>
      </svg>
    ),
    mobileIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-500"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
    ),
    includes: [
      { name: 'Quantitative Strategies', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400 flex-shrink-0"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
      { name: 'Trading Bots', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400 flex-shrink-0"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
      { name: 'Financial Data', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400 flex-shrink-0"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg> },
      { name: 'Risk Management', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400 flex-shrink-0"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
      { name: 'Python For Trading', domain: 'python.org' },
      { name: 'Automation Systems', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 flex-shrink-0"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg> },
    ],
    professions: ['ca', 'corporate']
  },
  {
    id: 'graphic-designing',
    icon: 'brush',
    title: 'Graphic Designing',
    subtitle: 'Master Visual Design & Brand Identity',
    description: 'Learn professional graphic design. Master color theory, vector illustrations, editorial layout, and logo design using Figma, Photoshop & Illustrator.',
    duration: '20 Weeks',
    salary: '₹ 8.9 LPA',
    svgBg: (
      <svg className="w-20 h-20 text-brand-orange/[0.08] dark:text-brand-orange/[0.05] mr-[-10px] mt-[-5px] animate-float" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="20" y="20" width="60" height="60" rx="4"/>
        <circle cx="50" cy="50" r="20"/>
        <polygon points="50,20 80,80 20,80" strokeDasharray="2 2"/>
      </svg>
    ),
    mobileIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-500"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.63-.77 1.63-1.7 0-.43-.16-.83-.41-1.16a.81.81 0 0 1-.16-.48c0-.44.35-.79.79-.79H15c4.97 0 9-4.03 9-9 0-4.97-4.03-9-9-9Z"/></svg>
    ),
    includes: [
      { name: 'Adobe Illustrator', domain: 'adobe.com' },
      { name: 'Adobe Photoshop', domain: 'adobe.com' },
      { name: 'Figma', domain: 'figma.com' },
      { name: 'Brand Identity', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-400 flex-shrink-0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
      { name: 'Typography Systems', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400 flex-shrink-0"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg> },
      { name: 'Visual Hierarchy', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400 flex-shrink-0"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="9" y2="18"/></svg> },
    ],
    professions: ['designer', 'marketer']
  },
  {
    id: 'mental-health-wellness',
    icon: 'self_care',
    title: 'Mental Health & Wellness',
    subtitle: 'Build Modern Wellness Businesses',
    description: 'Learn coaching systems, wellness branding, community building, and digital wellness business models.',
    duration: '20 Weeks',
    salary: '₹ 8.9 LPA',
    svgBg: (
      <svg className="w-20 h-20 text-brand-orange/[0.08] dark:text-brand-orange/[0.05] mr-[-10px] mt-[-5px] animate-pulse-soft" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="50" cy="50" r="40" strokeDasharray="4 4"/>
        <circle cx="50" cy="50" r="25"/>
      </svg>
    ),
    mobileIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
    ),
    includes: [
      { name: 'Wellness Coaching', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal-400 flex-shrink-0"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> },
      { name: 'Community Building', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400 flex-shrink-0"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg> },
      { name: 'Digital Wellness', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal-400 flex-shrink-0"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> },
      { name: 'Personal Branding', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg> },
      { name: 'Program Creation', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg> },
      { name: 'Biohacking Fundamentals', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal-400 flex-shrink-0"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> },
    ],
    professions: ['doctor', 'nurse']
  }
];

const getProgramColors = (id: string) => {
  switch (id) {
    case 'ai-engineering':
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
      return {
        bg: 'bg-cyan-500/10 dark:bg-cyan-500/15',
        border: 'border-cyan-500/25',
        text: 'text-cyan-500',
        shadow: 'shadow-[0_0_15px_rgba(6,182,212,0.15)]'
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
    case 'mental-health-wellness':
      return {
        bg: 'bg-teal-500/10 dark:bg-teal-500/15',
        border: 'border-teal-500/25',
        text: 'text-teal-500',
        shadow: 'shadow-[0_0_15px_rgba(20,184,166,0.15)]'
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
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    if (expandedCardId === id) {
      setExpandedCardId(null);
    } else {
      setExpandedCardId(id);
    }
  };

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
        <h2 className="text-[32px] md:text-[42px] font-bold tracking-tight text-zinc-900 dark:text-white mb-4 leading-[1.1]"><span className="text-brand-orange">Build</span> Real Skills.<br className="md:hidden" /> Ship Real Products.</h2>
        <p className="text-[14px] md:text-[16px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed max-w-[600px] font-medium">Skip the theory. Learn directly from operators who have built products at OpenAI, Meta, Stripe, and Framer.</p>
      </div>

      <div className="max-w-7xl mx-auto px-1.5 md:px-0">
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
          {programs.map((program) => (
            <Link key={program.id} href={`/${program.id}`} className="block relative bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 lg:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.08)] hover:border-brand-orange/40 group flex flex-col h-full cursor-pointer overflow-hidden z-10">
              
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
              <p className="text-[14px] text-zinc-500 dark:text-[#9CA3AF] mb-6 leading-relaxed flex-grow">{program.description}</p>
              
              <div className="flex items-center justify-between border border-zinc-200/80 dark:border-white/10 rounded-[14px] p-3 mb-5 bg-white dark:bg-white/[0.02]">
                <div className="flex items-center gap-3 w-1/2 pr-2 border-r border-zinc-200 dark:border-white/10">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                  <div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium leading-none mb-1.5">Duration</p>
                    <p className="text-[13px] font-bold text-zinc-900 dark:text-white leading-none">{program.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-1/2 pl-4">
                  <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                  </div>
                  <div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium leading-none mb-1.5">Average salary</p>
                    <p className="text-[13px] font-bold text-zinc-900 dark:text-white leading-none">{program.salary}</p>
                  </div>
                </div>
              </div>
 
              <div className="mt-auto pt-5 border-t border-zinc-200/60 dark:border-white/5">
                <p className="text-[10px] text-zinc-400 dark:text-[#6b7280] uppercase tracking-[0.15em] mb-3 font-semibold">Includes</p>
                <div className="flex flex-wrap gap-2">
                  {program.includes.map((inc, i) => (
                    <span key={i} className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 bg-zinc-50 dark:bg-white/[0.03] text-zinc-700 dark:text-zinc-300 rounded-lg border border-zinc-200/60 dark:border-white/5 font-medium group-hover:border-zinc-300 dark:group-hover:border-white/10 transition-colors">
                      {inc.domain ? (
                        <img src={`https://www.google.com/s2/favicons?domain=${inc.domain}&sz=128`} alt="icon" className="w-3.5 h-3.5 object-contain flex-shrink-0" />
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
          ))}
        </div>
 
        {/* Mobile Accordion */}
        <div className="flex flex-col gap-2.5 md:hidden px-0">
          {programs.map((program) => (
            <div 
              key={program.id} 
              className={`bg-zinc-50/80 dark:bg-[#161616] border border-zinc-200 dark:border-white/5 rounded-[20px] p-4 shadow-md overflow-hidden transition-all duration-300 course-card cursor-pointer ${
                expandedCardId === program.id ? 'course-card-expanded' : ''
              }`} 
              onClick={() => toggleCard(program.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-800 dark:to-[#1a1a1a] border border-zinc-200/80 dark:border-white/10 flex items-center justify-center flex-shrink-0 shadow-sm dark:shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                  {program.mobileIcon}
                </div>
                <div className="flex-grow min-w-0">
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
                    <p className="text-[13px] text-zinc-600 dark:text-[#9CA3AF] leading-relaxed mb-4">{program.description}</p>
                    
                    <div className="flex items-center justify-between border border-zinc-200/80 dark:border-white/10 rounded-[12px] p-2.5 mb-4 bg-white dark:bg-white/[0.02]">
                      <div className="flex items-center gap-2.5 w-1/2 pr-2 border-r border-zinc-200 dark:border-white/10">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        </div>
                        <div>
                          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium leading-none mb-1">Duration</p>
                          <p className="text-[12px] font-bold text-zinc-900 dark:text-white leading-none">{program.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 w-1/2 pl-2">
                        <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                        </div>
                        <div>
                          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium leading-none mb-1">Avg. Salary</p>
                          <p className="text-[12px] font-bold text-zinc-900 dark:text-white leading-none">{program.salary}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-zinc-200/60 dark:bg-white/5 mb-3"></div>
                    <p className="text-[10px] text-zinc-400 dark:text-[#6b7280] uppercase tracking-[0.15em] mb-2.5 font-semibold">Includes</p>
                    
                    <div className="relative w-full overflow-hidden flex" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
                      <div className="flex gap-2 w-max animate-marquee pb-1">
                        {[...program.includes, ...program.includes].map((inc, i) => (
                          <span key={i} className="flex items-center gap-1.5 text-[11px] whitespace-nowrap px-2.5 py-1.5 bg-zinc-100/80 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 rounded-[8px] border border-zinc-200/80 dark:border-white/5 shadow-sm font-medium">
                            {inc.domain ? (
                              <img src={`https://www.google.com/s2/favicons?domain=${inc.domain}&sz=128`} alt="icon" className="w-3 h-3 md:w-3.5 md:h-3.5 object-contain flex-shrink-0" />
                            ) : (
                              inc.icon || <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-brand-orange shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                            )}
                            {inc.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Link href={`/${program.id}`} className="mt-5 w-full block text-center py-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white text-[13px] font-bold tracking-wide shadow-md shadow-brand-orange/20 hover:scale-[1.02] active:scale-95 transition-all">
                      Explore Curriculum
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
