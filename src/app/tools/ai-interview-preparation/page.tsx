import type { Metadata } from 'next';
import Link from 'next/link';
import InterviewClient from '@/components/tools/interview/InterviewClient';
import InterviewFaq from '@/components/tools/interview/InterviewFaq';
import { INTERVIEW_FAQS } from '@/config/interview/interview-faqs';
import {
  Bot,
  Sparkles,
  ChevronRight,
  Mic,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Award,
  TrendingUp,
  Brain,
  Clock,
  Target,
  FileCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Interview Preparation – Practice Mock Interviews with AI | Skillsha',
  description:
    'Practice realistic AI-powered mock interviews tailored to your role, experience level, and industry. Voice and text modes, dynamic STAR feedback, and personalized 7-day preparation plan.',
  alternates: {
    canonical: 'https://skillsha.com/tools/ai-interview-preparation',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillSha Tools',
    title: 'AI Interview Preparation – Practice Mock Interviews with AI | Skillsha',
    description:
      'Simulate high-stakes interviews with a conversational AI interviewer. 80+ roles across IT, HR, BPO, Marketing, Sales, and Finance with live speech recognition and STAR feedback.',
    url: 'https://skillsha.com/tools/ai-interview-preparation',
    images: [{ url: 'https://skillsha.com/files/logo-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Interview Preparation Platform | Skillsha Tools',
    description:
      'Practice realistic AI-powered interviews tailored to your role, experience and industry. 100% private, free, and unlimited.',
    images: ['https://skillsha.com/files/logo-icon.png'],
  },
};

export default function AiInterviewPrepPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Skillsha AI Interview Preparation Simulator',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online AI interview preparation simulator supporting 80+ job roles, live speech-to-text recognition, dynamic follow-up questioning, STAR method evaluation, and personalized 7-day preparation plans.',
        url: 'https://skillsha.com/tools/ai-interview-preparation',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Skillsha',
            item: 'https://skillsha.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Free Tools',
            item: 'https://skillsha.com/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'AI Interview Preparation',
            item: 'https://skillsha.com/tools/ai-interview-preparation',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: INTERVIEW_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="space-y-16">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <Link href="/" className="hover:text-slate-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/tools" className="hover:text-slate-600 transition-colors">
          Tools
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">AI Interview Preparation</span>
      </nav>

      {/* Tool Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" /> Next-Gen AI Career Simulator
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          AI Interview Preparation <span className="text-indigo-600">Platform</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Practice realistic AI-powered interviews tailored to your role, experience, and industry.
          Simulate real interview pressure with voice recognition, dynamic follow-up probing, STAR analysis, and actionable coaching.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            <Target className="w-3.5 h-3.5 text-indigo-600" /> 80+ Job Roles & 7 Domains
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            <Mic className="w-3.5 h-3.5 text-indigo-600" /> Voice & Text Input Mode
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            <Brain className="w-3.5 h-3.5 text-indigo-600" /> Dynamic Probing (Not Static Q&A)
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            <Award className="w-3.5 h-3.5 text-indigo-600" /> STAR Evaluation & 8-Score Matrix
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            <Clock className="w-3.5 h-3.5 text-indigo-600" /> 7-Day Personalized Roadmap
          </span>
        </div>
      </div>

      {/* Main Interactive Tool App */}
      <InterviewClient />

      {/* Educational & Platform Capabilities Section */}
      <section className="mt-20 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Engineered to Mirror Modern Enterprise Hiring Standards
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Static question dumps don't prepare you for real interview scrutiny. Skillsha's AI Interviewer adapts in real time to your responses, probing deeper into your decisions, architecture choices, and problem-solving rationale.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 hover:border-indigo-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Multi-Domain & Role Depth</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Covers 80+ specific designations across IT & Software, BPO / Customer Service, Digital Marketing, Human Resources, Sales, Finance, and Management.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 hover:border-indigo-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Adaptive Contextual Probing</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              If your answer is too brief or lacks specifics, the interviewer asks sharp follow-ups: &quot;Why did you choose that database?&quot; or &quot;What trade-offs did you consider?&quot;
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 hover:border-indigo-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Live Speech & Filler Analysis</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Answer questions hands-free using your microphone. Our audio analyzer detects filler words like &quot;um&quot;, &quot;uh&quot;, and &quot;like&quot; to help you build articulate, confident delivery.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 hover:border-indigo-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">STAR Diagnostic Scorecard</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Get evaluated on 8 performance metrics, detailed STAR framework scoring (Situation, Task, Action, Result), model answers, and a 7-day preparation roadmap.
            </p>
          </div>
        </div>

        {/* 5-Step Workflow */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-indigo-500/20 shadow-xl">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Structured Simulation Methodology
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-1">
              How the AI Interview Simulator Works
            </h3>
            <p className="text-slate-300 text-sm mt-2">
              Designed from ground up to recreate actual FAANG, Fortune 500, and MNC recruitment workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-sm shadow">
                1
              </div>
              <h4 className="font-semibold text-white text-sm">Target Selection</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Choose domain, target role, experience level, and interview type.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-sm shadow">
                2
              </div>
              <h4 className="font-semibold text-white text-sm">Resume & JD Context</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Optionally paste your resume and target JD for personalized project questions.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-sm shadow">
                3
              </div>
              <h4 className="font-semibold text-white text-sm">Interactive Room</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Speak or type answers as the AI interviewer poses questions and follow-ups.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-sm shadow">
                4
              </div>
              <h4 className="font-semibold text-white text-sm">Deep Evaluation</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Receive 8 category scores, STAR analysis, and question-by-question model answers.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-sm shadow">
                5
              </div>
              <h4 className="font-semibold text-white text-sm">7-Day Study Plan</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Follow daily topic recommendations to fix identified gaps before your real interview.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy & Guarantee Banner */}
        <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">100% Confidential & Secure Practice</p>
              <p className="text-slate-600 text-xs mt-0.5">
                Your voice, answers, and resume remain private. History is saved locally in your browser storage.
              </p>
            </div>
          </div>
          <Link
            href="/tools"
            className="shrink-0 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 font-semibold text-xs shadow-sm hover:shadow transition-all"
          >
            Explore All Free Tools →
          </Link>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <InterviewFaq />
    </div>
  );
}
