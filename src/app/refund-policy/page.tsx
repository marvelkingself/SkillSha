"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  RefreshCw, 
  Clock, 
  Check, 
  MapPin, 
  Mail, 
  ChevronRight, 
  FileText,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  Lock,
  Eye,
  Gift,
  Phone
} from "lucide-react";

interface Section {
  id: string;
  title: string;
}

const SECTIONS: Section[] = [
  { id: "overview", title: "🎯 Overview" },
  { id: "eligibility", title: "✅ Refund Eligibility Criteria" },
  { id: "why-no-full", title: "💡 Why No Full Refunds After 50%" },
  { id: "request-refund", title: "📥 How to Request a Refund" },
  { id: "exceptional", title: "⚖️ Exceptional Circumstances" },
  { id: "credits-bonus", title: "🎁 Skillsha Credits (Bonus Option)" },
  { id: "processing", title: "📊 Mode & Processing Time" },
  { id: "data-security", title: "🔐 Data and Record Security" },
  { id: "transparency", title: "📘 Transparency Policy" },
  { id: "promise", title: "🙌 Our Promise to Students" },
  { id: "contact-escalation", title: "📩 Contact & Escalation" },
  { id: "legal-disclaimer", title: "📝 Legal Disclaimer" }
];

export default function RefundPolicyPage() {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 120;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 dark:bg-[#030303] text-zinc-900 dark:text-zinc-100 overflow-hidden relative transition-colors duration-500 selection:bg-brand-orange selection:text-black">
        
        {/* Subtle Background Elements to match brand identity */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-20 opacity-60 dark:opacity-40" />
        <div className="absolute top-0 left-0 w-full h-[400px] bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.04),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.08),transparent_60%)] pointer-events-none -z-10 animate-pulse" />

        <main className="pt-28 md:pt-36 max-w-[1300px] mx-auto px-4 md:px-8 pb-20">
          
          {/* Section 1: Header */}
          <header className="text-left border-b border-zinc-200 dark:border-white/5 pb-10 mb-12 max-w-[1000px] mx-auto">
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 dark:bg-white/5 border border-brand-orange/20 dark:border-white/10 mb-4">
              <RefreshCw className="w-3.5 h-3.5 text-brand-orange" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-orange dark:text-zinc-300">
                Refunds & Cancellations
              </span>
            </div>
            
            <h1 className="text-[28px] md:text-[44px] font-extrabold tracking-tight text-zinc-955 dark:text-white mb-4 font-heading leading-tight">
              📄 Return and Refund Policy (Skillsha)
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs text-zinc-550 dark:text-zinc-400 font-semibold mb-6">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-orange" />
                Last Updated: July 2025
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 hidden sm:inline" />
              <span>Internal Legal Standard</span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 hidden sm:inline" />
              <span>PAN India Student Support</span>
            </div>

            <p className="text-[13px] md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold max-w-4xl mb-4">
              At Skillsha – IT Training & Placement Institute, we are committed to delivering the highest quality training experience for all our students. However, we understand that sometimes expectations may vary, and you may wish to cancel or request a refund. This Return and Refund Policy outlines the circumstances under which refunds may be considered, our procedures, and our student-first philosophy to ensure a fair and transparent process.
            </p>

            <div className="inline-flex gap-2.5 p-3 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl text-xs font-semibold leading-relaxed max-w-2xl">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>
                ⚠️ This content is presented for backup and legal transparency. It remains a part of Skillsha’s internal documentation and is subject to revision for public viewing.
              </p>
            </div>
          </header>

          {/* Section 2: Core Grid (TOC Sidebar + Content Area) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Sidebar Table of Contents - Hidden on mobile, sticky on desktop */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-28 bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 p-6 rounded-[24px] max-h-[calc(100vh-140px)] overflow-y-auto hover:border-brand-orange/20 transition-all duration-300">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-955 dark:text-white mb-4 pb-3 border-b border-zinc-100 dark:border-white/5 flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-orange" />
                Policy Sections
              </h3>
              <nav className="space-y-1">
                {SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all duration-200 group cursor-pointer ${
                      activeSection === sec.id
                        ? "bg-brand-orange/10 dark:bg-brand-orange/15 text-brand-orange font-bold border-l-2 border-brand-orange"
                        : "text-zinc-550 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/[0.02] hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    <span>{sec.title}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeSection === sec.id ? "translate-x-0.5 text-brand-orange" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                    }`} />
                  </button>
                ))}
              </nav>
            </aside>

            {/* Mobile Scroll Indicator index - visible only on mobile/tablet */}
            <div className="lg:hidden col-span-1 bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 p-4 rounded-2xl overflow-x-auto flex gap-2 no-scrollbar scroll-smooth">
              {SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-lg text-[10px] font-bold tracking-tight transition-all uppercase ${
                    activeSection === sec.id
                      ? "bg-brand-orange text-white"
                      : "bg-zinc-100 dark:bg-[#161616] text-zinc-650 dark:text-zinc-400"
                  }`}
                >
                  {sec.title.split(" ")[0]} {sec.title.split(" ").slice(1).join(" ")}
                </button>
              ))}
            </div>

            {/* Document Content Pane */}
            <section className="lg:col-span-8 space-y-6">
              
              {/* 🎯 Overview */}
              <article 
                id="overview"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-950 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  🎯 Overview
                </h2>
                <div className="text-xs md:text-sm text-zinc-600 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p>
                    We strive to provide an exceptional learning journey through our expert-led IT courses, live projects, and placement assistance. Our refund policy has been crafted to balance transparency, operational feasibility, and student satisfaction.
                  </p>
                </div>
              </article>

              {/* ✅ Refund Eligibility Criteria */}
              <article 
                id="eligibility"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  ✅ Refund Eligibility Criteria
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p className="mb-4">
                    We encourage students to make informed choices, but in the event of cancellation, the following rules apply:
                  </p>
                  
                  <div className="space-y-4">
                    {/* 1. Full Refund Eligibility */}
                    <div className="p-4 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-2">
                        1. Full Refund Eligibility (Before 1st Class)
                      </h4>
                      <ul className="space-y-1 text-xs">
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                          <span>A full refund is allowed if the student cancels their enrollment before attending the first live or recorded session.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                          <span>Request must be submitted in writing via email within 3 working days of enrollment.</span>
                        </li>
                      </ul>
                    </div>

                    {/* 2. Partial Refund */}
                    <div className="p-4 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-2">
                        2. Partial Refund (Up to 25% Course Completion)
                      </h4>
                      <ul className="space-y-1 text-xs">
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                          <span>If the student has completed less than 25% of the course (by class count or LMS access), a partial refund (up to 60%) may be issued.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                          <span>Platform charges, trainer time, and material access fees will be deducted.</span>
                        </li>
                      </ul>
                    </div>

                    {/* 3. No Refund */}
                    <div className="p-4 bg-amber-500/[0.03] dark:bg-[#161616]/40 border border-brand-orange/15 rounded-xl">
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-2">
                        3. No Refund (After 50% Completion)
                      </h4>
                      <ul className="space-y-1 text-xs">
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                          <span>Once 50% or more of the course is accessed or completed (either by video hours, assessments, or assignments), no refund will be granted under any circumstances.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                          <span>This policy helps us honor the time and expertise our trainers invest, and ensures sustainability of our placement support model.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </article>

              {/* 💡 Why We Don’t Offer Full Refunds After 50% */}
              <article 
                id="why-no-full"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  💡 Why We Don’t Offer Full Refunds After 50%
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p className="mb-4">
                    We provide:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {[
                      "✅ 100% practical training and live projects",
                      "✅ Placement assistance even post-training",
                      "✅ LMS access and downloadable resources",
                      "✅ Career counseling and one-on-one mentorship"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        <span className="text-xs">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="leading-relaxed">
                    These benefits are not consumed at a linear rate. For instance, the first few weeks often provide maximum value, including access to mentorship, project structure, and core concepts. Hence, even if you discontinue mid-way, a substantial portion of the educational service is already rendered. This is why we do not support full refunds after 50% progress.
                  </p>
                </div>
              </article>

              {/* 📥 How to Request a Refund */}
              <article 
                id="request-refund"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  📥 How to Request a Refund
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold space-y-4">
                  <p>
                    To initiate a refund request:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex gap-3 items-start bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/5 p-3.5 rounded-xl">
                      <div className="w-6 h-6 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        1
                      </div>
                      <p>
                        Email us at <a href="mailto:support@skillsha.com" className="text-brand-orange hover:underline font-bold">support@skillsha.com</a> with the subject line: <strong>Refund Request [Your Course Name]</strong>
                      </p>
                    </div>

                    <div className="flex gap-3 items-start bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/5 p-3.5 rounded-xl">
                      <div className="w-6 h-6 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        2
                      </div>
                      <div className="space-y-1">
                        <p>Include your:</p>
                        <ul className="list-disc list-inside pl-2 space-y-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                          <li>Full Name</li>
                          <li>Contact Number</li>
                          <li>Date of Enrollment</li>
                          <li>Reason for Refund Request</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/5 p-3.5 rounded-xl">
                      <div className="w-6 h-6 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        3
                      </div>
                      <p>
                        Our support team will contact you within 3–5 working days.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-zinc-100 dark:border-white/5 pt-3 mt-3 text-xs flex gap-2 items-start text-zinc-550 dark:text-zinc-450 font-bold">
                    <AlertTriangle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                    <p>
                      <strong>Note:</strong> All refund decisions are final and at the sole discretion of Skillsha’s management, based on our records of attendance and course access.
                    </p>
                  </div>
                </div>
              </article>

              {/* ⚖️ Exceptional Circumstances */}
              <article 
                id="exceptional"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  ⚖️ Exceptional Circumstances
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold space-y-3">
                  <p>
                    In rare cases such as:
                  </p>
                  <ul className="space-y-1 mb-3">
                    {["Medical emergencies (with valid proof)", "Family emergency or relocation", "Mistaken multiple payments"].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    We may issue pro-rated refunds or credit vouchers for future courses. Students must apply with official documentation.
                  </p>
                </div>
              </article>

              {/* 🎁 Skillsha Credits (Bonus Option) */}
              <article 
                id="credits-bonus"
                className="bg-brand-orange/[0.02] dark:bg-brand-orange/[0.01] border border-brand-orange/20 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-brand-orange font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-brand-orange" />
                  🎁 Refunds via Skillsha Credits (Bonus Option)
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p className="mb-3">
                    Instead of bank refunds, students can also opt for Skillsha Training Credits, which:
                  </p>
                  <ul className="space-y-2 mb-4">
                    {[
                      "Never expire",
                      "Can be used by a friend/family member",
                      "Give 10% additional value (e.g., ₹9,000 refund = ₹9,900 credit)"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 p-2 bg-white/40 dark:bg-white/[0.015] border border-brand-orange/10 dark:border-white/5 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="border-t border-brand-orange/10 pt-3 mt-3 text-xs text-zinc-500">
                    This encourages learners to continue upgrading without the burden of starting over.
                  </p>
                </div>
              </article>

              {/* 📊 Mode & Processing Time */}
              <article 
                id="processing"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  📊 Refund Mode & Processing Time
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <ul className="space-y-2">
                    {[
                      "Refunds are processed via bank transfer or UPI",
                      "Refunds take 7–15 working days to reflect post-approval"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              {/* 🔐 Data and Record Security */}
              <article 
                id="data-security"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-brand-orange" />
                  🔐 Data and Record Security
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold space-y-2">
                  <p>
                    Your refund-related communication is handled securely and is not disclosed to any third party.
                  </p>
                  <p>
                    Course access may be revoked after refund approval.
                  </p>
                </div>
              </article>

              {/* 📘 Transparency Policy */}
              <article 
                id="transparency"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  📘 Transparency Policy
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold space-y-2">
                  <p>
                    We maintain full transparency and have integrated real-time progress tracking in our LMS.
                  </p>
                  <p>
                    Students can always view their course completion status, so they remain aware of their eligibility for any refunds.
                  </p>
                </div>
              </article>

              {/* 🙌 Our Promise to Students */}
              <article 
                id="promise"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  🙌 Our Promise to Students
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p className="mb-3">
                    We do not want any student to feel unsatisfied. That’s why we offer:
                  </p>
                  <ul className="space-y-2 mb-4">
                    {[
                      "Free course transfers (if you want to switch tracks)",
                      "Extended course access if you miss sessions",
                      "1:1 trainer calls to help you catch up"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="border-t border-zinc-100 dark:border-white/5 pt-3 mt-3 text-zinc-800 dark:text-zinc-200 font-bold">
                    We believe in lifelong learning — refunds are a last resort. But if necessary, we are here to support you.
                  </p>
                </div>
              </article>

              {/* 📩 Contact & Escalation */}
              <article 
                id="contact-escalation"
                className="bg-white dark:bg-[#0c0c0c] border-l-4 border-l-brand-orange border-y border-r border-zinc-200 dark:border-white/5 rounded-[24px] p-6 md:p-8 shadow-[0_4px_25px_rgba(249,115,22,0.02)] transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-brand-orange" />
                  📩 Contact & Escalation
                </h2>
                <div className="text-xs md:text-sm text-zinc-755 dark:text-zinc-200 font-extrabold space-y-4">
                  <p className="leading-relaxed">
                    For escalation or further assistance:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-bold tracking-wider block mb-1">
                        🏢 Office Address
                      </span>
                      <p className="text-zinc-900 dark:text-white font-bold leading-relaxed">
                        Prem Nagar, Ram Rahim Market, Loni, Ghaziabad – 201102
                      </p>
                    </div>

                    <div className="p-4 bg-zinc-50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl space-y-2">
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-bold tracking-wider block mb-1">
                        📞 Phone & WhatsApp
                      </span>
                      <p className="text-zinc-900 dark:text-white font-bold flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-brand-orange" />
                        <a href="tel:+917303082191" className="text-brand-orange hover:underline font-extrabold">+91 7303082191</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-xs mt-2 border-t border-zinc-100 dark:border-white/5 pt-4">
                    <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 font-semibold">
                      <Mail className="w-4 h-4 text-brand-orange" />
                      Email 1: <a href="mailto:info@skillsha.com" className="text-brand-orange hover:underline font-extrabold">info@skillsha.com</a>
                    </span>
                    <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 font-semibold">
                      <Mail className="w-4 h-4 text-brand-orange" />
                      Email 2: <a href="mailto:support@skillsha.com" className="text-brand-orange hover:underline font-extrabold">support@skillsha.com</a>
                    </span>
                  </div>
                </div>
              </article>

              {/* 📝 Legal Disclaimer */}
              <article 
                id="legal-disclaimer"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  📝 Legal Disclaimer
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p>
                    This Refund Policy is subject to change at any time without prior notice. All disputes shall be governed under the jurisdiction of Ghaziabad, Uttar Pradesh, India.
                  </p>
                  <p className="mt-4 text-center font-heading text-brand-orange text-sm font-bold animate-pulse">
                    Thank You for Trusting Skillsha ❤️ We are honored to be a part of your IT learning journey. Let’s grow together!
                  </p>
                </div>
              </article>

            </section>

          </div>

        </main>
      </div>
      <Footer />
    </>
  );
}
