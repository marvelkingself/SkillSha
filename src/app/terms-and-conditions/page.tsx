"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Scale, 
  Clock, 
  Check, 
  MapPin, 
  Mail, 
  ChevronRight, 
  FileText,
  AlertCircle
} from "lucide-react";

interface Section {
  id: string;
  title: string;
}

const SECTIONS: Section[] = [
  { id: "use-website", title: "1. Use of the Website and Services" },
  { id: "course-enrolment", title: "2. Online Course Enrolment" },
  { id: "payments-billing", title: "3. Payments and Billing" },
  { id: "refund-policy", title: "4. Refund Policy" },
  { id: "course-access", title: "5. Course Access and Restrictions" },
  { id: "intellectual-property", title: "6. Intellectual Property" },
  { id: "third-party", title: "7. Third-Party Tools & Links" },
  { id: "service-modifications", title: "8. Service Modifications" },
  { id: "user-comments", title: "9. User Comments and Feedback" },
  { id: "accuracy-info", title: "10. Accuracy of Information" },
  { id: "limitation-liability", title: "11. Limitation of Liability" },
  { id: "indemnification", title: "12. Indemnification" },
  { id: "termination", title: "13. Termination" },
  { id: "governing-law", title: "14. Governing Law & Jurisdiction" },
  { id: "contact-info", title: "15. Contact Information" }
];

export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState("use-website");

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
              <Scale className="w-3.5 h-3.5 text-brand-orange" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-orange dark:text-zinc-300">
                User Agreements & Policies
              </span>
            </div>
            
            <h1 className="text-[28px] md:text-[44px] font-extrabold tracking-tight text-zinc-955 dark:text-white mb-4 font-heading leading-tight">
              Terms & Conditions – Skillsha IT Training & Placement Institute
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs text-zinc-550 dark:text-zinc-400 font-semibold mb-6">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-orange" />
                Effective Date: 2026
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 hidden sm:inline" />
              <span>Published PAN India</span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 hidden sm:inline" />
              <span>Legal Authority: Ghaziabad Jurisdiction</span>
            </div>

            <p className="text-[13px] md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold max-w-4xl">
              Welcome to Skillsha. This website is operated by Skillsha – IT Training & Placement Institute. Throughout the site, the terms “we,” “us,” and “our” refer to Skillsha. By accessing or using any part of this website or our services, you agree to comply with and be bound by the following Terms & Conditions. If you do not agree to all the terms, then you may not access the website or use any services. We reserve the right to update, modify, or replace any part of these Terms & Conditions at any time by posting changes to this page. It is your responsibility to review this page periodically.
            </p>
          </header>

          {/* Section 2: Core Grid (TOC Sidebar + Content Area) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Sidebar Table of Contents - Hidden on mobile, sticky on desktop */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-28 bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 p-6 rounded-[24px] max-h-[calc(100vh-140px)] overflow-y-auto hover:border-brand-orange/20 transition-all duration-300">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-950 dark:text-white mb-4 pb-3 border-b border-zinc-100 dark:border-white/5 flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-orange" />
                Agreement Sections
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
              
              {/* 1. Use of the Website and Services */}
              <article 
                id="use-website"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-950 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  1. Use of the Website and Services
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p className="mb-4">
                    By using our website <a href="https://skillsha.com" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline font-bold">https://skillsha.com</a> or enrolling in any of our training programs, you:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Confirm you are at least 18 years of age or have parental consent.",
                      "Agree not to use our site or services for any illegal or unauthorized purpose.",
                      "Must not transmit malware, spam, or any harmful code."
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 border-t border-zinc-100 dark:border-white/5 pt-3 text-zinc-800 dark:text-zinc-200 font-bold">
                    Violation of any term may result in termination of your access to Skillsha’s services.
                  </p>
                </div>
              </article>

              {/* 2. Online Course Enrolment */}
              <article 
                id="course-enrolment"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  2. Online Course Enrolment
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold space-y-3">
                  <p>
                    All our courses are delivered via online live sessions or recorded video modules. Access to our Learning Management System (LMS), discussion forums, and trainer support is provided during your course duration.
                  </p>
                  <p>
                    You are responsible for ensuring that the information provided during enrolment (name, contact, email, etc.) is accurate and up to date.
                  </p>
                </div>
              </article>

              {/* 3. Payments and Billing */}
              <article 
                id="payments-billing"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  3. Payments and Billing
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p className="mb-4">
                    Payments for Skillsha courses are processed through secure third-party gateways such as Razorpay. By making a payment, you agree to:
                  </p>
                  <ul className="space-y-2 mb-4">
                    {[
                      "Provide current and complete billing information.",
                      "Allow Skillsha to contact you for payment confirmations, invoices, and support."
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="border-t border-zinc-100 dark:border-white/5 pt-3 text-zinc-805 dark:text-zinc-200 font-bold">
                    We reserve the right to refuse or cancel orders if fraud or unauthorized activity is suspected.
                  </p>
                </div>
              </article>

              {/* 4. Refund Policy */}
              <article 
                id="refund-policy"
                className="bg-brand-orange/[0.02] dark:bg-brand-orange/[0.01] border border-brand-orange/20 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-brand-orange font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full animate-pulse" />
                  4. Refund Policy
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold space-y-3">
                  <p className="font-extrabold text-zinc-800 dark:text-zinc-200">
                    Our refund policy is designed to be fair to both learners and the institute. Please read carefully:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "If a student withdraws from a course before completing 50%, a 50% refund of the course fee will be processed.",
                      "If more than 50% of the course is completed, no refund will be issued.",
                      "Refund requests must be made in writing to support@skillsha.com.",
                      "Refunds are processed within 7–10 business days from the date of approval.",
                      "Any third-party payment gateway charges and applicable taxes are non-refundable."
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 p-2 bg-white/40 dark:bg-white/[0.015] border border-brand-orange/10 dark:border-white/5 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-brand-orange/20 pt-3 mt-3 text-xs flex gap-2 items-start text-zinc-600 dark:text-zinc-400">
                    <AlertCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                    <p>
                      Skillsha will determine course completion based on attendance, session tracking, and LMS data.
                    </p>
                  </div>
                </div>
              </article>

              {/* 5. Course Access and Restrictions */}
              <article 
                id="course-access"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  5. Course Access and Restrictions
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <ul className="space-y-2">
                    {[
                      "Course access is granted only to the enrolled user.",
                      "Sharing login credentials, downloading, or redistributing course content is strictly prohibited.",
                      "We may suspend or revoke access without notice if misuse is detected."
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              {/* 6. Intellectual Property */}
              <article 
                id="intellectual-property"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  6. Intellectual Property
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold space-y-2">
                  <p>
                    All content on the Skillsha website, including text, graphics, videos, logos, and course material, is the intellectual property of Skillsha or its licensors.
                  </p>
                  <p className="text-zinc-800 dark:text-zinc-200 font-bold">
                    Reproduction, copying, or unauthorized use is strictly prohibited.
                  </p>
                </div>
              </article>

              {/* 7. Third-Party Tools & Links */}
              <article 
                id="third-party"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  7. Third-Party Tools & Links
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold space-y-3">
                  <p>
                    We may use or provide access to third-party tools (e.g., Razorpay, Google Analytics). Your use of these tools is subject to the terms and policies of the respective third parties.
                  </p>
                  <p>
                    Skillsha is not responsible for any third-party websites linked to or from our site. We advise you to review their terms and policies before engaging.
                  </p>
                </div>
              </article>

              {/* 8. Service Modifications */}
              <article 
                id="service-modifications"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  8. Service Modifications
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p className="mb-3">
                    We reserve the right to:
                  </p>
                  <ul className="space-y-2 mb-3">
                    {[
                      "Change course pricing or structure without prior notice.",
                      "Discontinue or modify any part of our services.",
                      "Update course content as needed."
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-zinc-450 dark:text-zinc-500">
                    We shall not be liable for any damages arising from such modifications.
                  </p>
                </div>
              </article>

              {/* 9. User Comments and Feedback */}
              <article 
                id="user-comments"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  9. User Comments and Feedback
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p className="mb-3">
                    If you submit suggestions, feedback, reviews, or any content to Skillsha:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "You grant us the right to use, edit, and publish your submissions.",
                      "You agree not to post anything illegal, defamatory, or harmful.",
                      "You are solely responsible for the content you submit."
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              {/* 10. Accuracy of Information */}
              <article 
                id="accuracy-info"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  10. Accuracy of Information
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold space-y-2">
                  <p>
                    We strive to keep all course, pricing, and service information up to date. However, occasional errors or omissions may occur.
                  </p>
                  <p>
                    Skillsha reserves the right to correct such errors and make changes without prior notice.
                  </p>
                </div>
              </article>

              {/* 11. Limitation of Liability */}
              <article 
                id="limitation-liability"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  11. Limitation of Liability
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p className="mb-3">
                    Skillsha does not guarantee uninterrupted or error-free access to its services. We are not liable for:
                  </p>
                  <ul className="space-y-2 mb-3">
                    {[
                      "Any direct, indirect, or consequential loss from using our website or services.",
                      "Technical failures or internet issues beyond our control.",
                      "The inability to meet expectations related to career outcomes."
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-zinc-450 dark:text-zinc-500 font-bold border-t border-zinc-100 dark:border-white/5 pt-3 mt-3">
                    All services are provided “as-is” without warranties or guarantees unless stated in writing.
                  </p>
                </div>
              </article>

              {/* 12. Indemnification */}
              <article 
                id="indemnification"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  12. Indemnification
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p>
                    You agree to indemnify and hold Skillsha and its team harmless against any claims, liabilities, or expenses arising from your breach of these Terms & Conditions or misuse of the website.
                  </p>
                </div>
              </article>

              {/* 13. Termination */}
              <article 
                id="termination"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  13. Termination
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold space-y-2">
                  <p>
                    We reserve the right to terminate your access to our website or services for violating any of the terms stated herein.
                  </p>
                  <p className="text-zinc-800 dark:text-zinc-200 font-bold">
                    Termination does not release you from obligations incurred prior to termination.
                  </p>
                </div>
              </article>

              {/* 14. Governing Law & Jurisdiction */}
              <article 
                id="governing-law"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  14. Governing Law & Jurisdiction
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of India. All disputes are subject to the jurisdiction of courts in Ghaziabad, Uttar Pradesh.
                  </p>
                </div>
              </article>

              {/* 15. Contact Information */}
              <article 
                id="contact-info"
                className="bg-white dark:bg-[#0c0c0c] border-l-4 border-l-brand-orange border-y border-r border-zinc-200 dark:border-white/5 rounded-[24px] p-6 md:p-8 shadow-[0_4px_25px_rgba(249,115,22,0.02)] transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-orange" />
                  15. Contact Information
                </h2>
                <div className="text-xs md:text-sm text-zinc-755 dark:text-zinc-200 font-extrabold space-y-4">
                  <p className="leading-relaxed">
                    If you have questions regarding these Terms & Conditions, contact us at:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-xs mt-2">
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

            </section>

          </div>

        </main>
      </div>
      <Footer />
    </>
  );
}
