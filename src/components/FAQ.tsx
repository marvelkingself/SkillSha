"use client";
import { useState } from "react";

const FAQS = [
  {
    q: "Which SkillSha course is best for a complete beginner?",
    a: "Full-Stack Development and UI/UX Design are our most beginner-friendly programs. No prior coding or design experience is required. Our counseling team maps your background to the right track during the free demo session.",
  },
  {
    q: "Does SkillSha offer a placement guarantee?",
    a: "We provide structured placement assistance for every graduating batch, including resume reviews, mock interviews, and direct referrals to our 500+ hiring partners. We don't promise a guaranteed job offer, since outcomes depend on individual performance, but our placement rate is published and verifiable.",
  },
  {
    q: "Are classes online, offline, or hybrid?",
    a: "All programs run live online with mentor-led sessions, so you can join from Noida, Delhi, Gurugram, or any other city we serve. Recordings are provided for every session.",
  },
  {
    q: "How long are the courses and what is the fee structure?",
    a: "Most programs run 12 to 20 weeks depending on the track. Fees vary by course, so check the individual course page for exact pricing, EMI options, and scholarship eligibility.",
  },
  {
    q: "Do I get a certificate after completing the course?",
    a: "Yes. Every graduate receives a verifiable SkillSha certificate with a unique credential ID that can be checked on our certificate verification page.",
  },
  {
    q: "What is the difference between SkillSha and free YouTube courses?",
    a: "Free content teaches concepts, while SkillSha builds job-ready skills through live mentorship, structured projects, code reviews, and placement support. That accountability and feedback loop is what self-paced free content can't replicate.",
  },
  {
    q: "Can I switch batches if I miss a live session?",
    a: "Yes, all sessions are recorded and batch transfers are supported within the same program, subject to seat availability.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="mb-28 animate-reveal max-w-[1200px] mx-auto px-4 md:px-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mb-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-3 justify-center md:justify-start">
          <h2 className="text-[24px] md:text-4xl lg:text-[40px] font-semibold text-zinc-900 dark:text-white leading-[1.1] tracking-tight">
            Frequently Asked Questions
          </h2>
          <span className="bg-brand-orange text-white text-[11px] md:text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded shadow-sm w-max mx-auto md:mx-0">FAQ</span>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-[13px] md:text-[15px]">Everything you need to know before enrolling.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col gap-3">
          {FAQS.slice(0, Math.ceil(FAQS.length / 2)).map((item, i) => (
            <FaqCard key={i} item={item} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {FAQS.slice(Math.ceil(FAQS.length / 2)).map((item, i) => {
            const realIndex = i + Math.ceil(FAQS.length / 2);
            return (
              <FaqCard key={realIndex} item={item} isOpen={openIndex === realIndex} onToggle={() => setOpenIndex(openIndex === realIndex ? null : realIndex)} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FaqCard({ item, isOpen, onToggle }: { item: { q: string; a: string }; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-zinc-200 dark:border-white/10 rounded-2xl bg-white dark:bg-white/[0.02] overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-[14px] md:text-[15px] font-semibold text-zinc-900 dark:text-white">{item.q}</span>
        <svg
          className={`w-4 h-4 flex-shrink-0 text-brand-orange transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-[13px] md:text-[14px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}
