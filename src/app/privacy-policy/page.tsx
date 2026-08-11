"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Shield, 
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
  { id: "who-we-are", title: "1. Who We Are" },
  { id: "info-collect", title: "2. What Information We Collect" },
  { id: "info-use", title: "3. How We Use Your Information" },
  { id: "payment-security", title: "4. Payment & Data Security" },
  { id: "consent", title: "5. Consent" },
  { id: "communication", title: "6. Communication" },
  { id: "refund-policy", title: "7. Refund Policy" },
  { id: "third-party", title: "8. Third-Party Services" },
  { id: "data-retention", title: "9. Data Retention" },
  { id: "cookies", title: "10. Cookies" },
  { id: "age-consent", title: "11. Age of Consent" },
  { id: "disclosure", title: "12. Disclosure" },
  { id: "external-links", title: "13. External Links" },
  { id: "data-security-detail", title: "14. Data Security" },
  { id: "changes", title: "15. Changes to This Policy" },
  { id: "contact-us", title: "16. Contact Us" }
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("who-we-are");

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
              <Shield className="w-3.5 h-3.5 text-brand-orange" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-orange dark:text-zinc-300">
                Security & Data Safeguards
              </span>
            </div>
            
            <h1 className="text-[28px] md:text-[44px] font-extrabold tracking-tight text-zinc-950 dark:text-white mb-4 font-heading leading-tight">
              Privacy Policy – Skillsha IT Training & Placement Institute
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs text-zinc-500 dark:text-zinc-400 font-semibold mb-6">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-orange" />
                Last Updated: 2026
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 hidden sm:inline" />
              <span>Effective across PAN India</span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 hidden sm:inline" />
              <span>Secure SSL Encrypted</span>
            </div>

            <p className="text-[13px] md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold max-w-4xl">
              Skillsha (“we”, “our”, or “us”) is committed to protecting the privacy and security of your personal information. This Privacy Policy outlines how we collect, use, store, and protect the information you provide when you interact with our website and services. By using our website or enrolling in our training programs, you agree to the terms outlined in this policy.
            </p>
          </header>

          {/* Section 2: Core Grid (TOC Sidebar + Content Area) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Sidebar Table of Contents - Hidden on mobile, sticky on desktop */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-28 bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 p-6 rounded-[24px] max-h-[calc(100vh-140px)] overflow-y-auto hover:border-brand-orange/20 transition-all duration-300">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-950 dark:text-white mb-4 pb-3 border-b border-zinc-100 dark:border-white/5 flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-orange" />
                Document Sections
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
              
              {/* 1. Who We Are */}
              <article 
                id="who-we-are"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-950 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  1. Who We Are
                </h2>
                <div className="text-xs md:text-sm text-zinc-600 dark:text-zinc-405 leading-relaxed font-semibold space-y-2">
                  <p>
                    Our website address is: <a href="https://skillsha.in" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline font-bold">https://skillsha.in</a>
                  </p>
                  <p>
                    Skillsha is an online IT training institute based in Ghaziabad, India, offering training and placement assistance to learners across India.
                  </p>
                </div>
              </article>

              {/* 2. What Information We Collect */}
              <article 
                id="info-collect"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  2. What Information We Collect
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p className="mb-4">
                    When you engage with our website, enroll in a course, or fill out a form, we may collect the following information:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm">
                    {[
                      "Full name",
                      "Email address",
                      "Contact number",
                      "City and state",
                      "Course selection",
                      "Payment details (processed via a secure payment gateway)",
                      "IP address and browser data (for analytics and security)"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              {/* 3. How We Use Your Information */}
              <article 
                id="info-use"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  3. How We Use Your Information
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p className="mb-4">
                    Your personal data is used for the following purposes:
                  </p>
                  <ul className="space-y-2 mb-4">
                    {[
                      "To register you in our courses",
                      "To process payments securely",
                      "To offer customer and technical support",
                      "To send course updates, class reminders, and promotional offers (only with your consent)",
                      "To enhance user experience via analytics tools (e.g., Google Analytics)"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="border-t border-zinc-100 dark:border-white/5 pt-3 mt-3 text-zinc-800 dark:text-zinc-200 font-bold">
                    We do not sell or rent your personal data to any third party.
                  </p>
                </div>
              </article>

              {/* 4. Payment & Data Security */}
              <article 
                id="payment-security"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  4. Payment & Data Security
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p>
                    All online payments made on Skillsha are securely processed through third-party gateways like Razorpay, which comply with PCI-DSS standards. Skillsha does not store any sensitive card or payment data on our servers. Please refer to Razorpay’s privacy terms at <a href="https://razorpay.com" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline font-bold">https://razorpay.com</a>.
                  </p>
                </div>
              </article>

              {/* 5. Consent */}
              <article 
                id="consent"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  5. Consent
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold space-y-3">
                  <p>
                    By providing us with your personal information for completing a course registration or payment, you consent to our collecting and using it for that purpose.
                  </p>
                  <p>
                    If we request your information for secondary purposes (e.g., email marketing), we will explicitly ask for your permission. You may withdraw your consent at any time by writing to us at <a href="mailto:support@skillsha.com" className="text-brand-orange hover:underline font-bold">support@skillsha.com</a>.
                  </p>
                </div>
              </article>

              {/* 6. Communication */}
              <article 
                id="communication"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  6. Communication
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p className="mb-4">
                    We may contact you via:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {["Email", "SMS", "WhatsApp", "Phone call"].map((c, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                        <span className="text-xs font-bold">{c}</span>
                      </div>
                    ))}
                  </div>
                  <p>
                    This communication may include course updates, payment reminders, feedback forms, or promotional offers. You can opt out at any time.
                  </p>
                </div>
              </article>

              {/* 7. Refund Policy */}
              <article 
                id="refund-policy"
                className="bg-brand-orange/[0.02] dark:bg-brand-orange/[0.01] border border-brand-orange/20 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-brand-orange font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full animate-pulse" />
                  7. Refund Policy
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold space-y-3">
                  <p className="font-extrabold text-zinc-800 dark:text-zinc-200">
                    We understand that learning needs flexibility. Our refund policy is clearly outlined below:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "If a student discontinues training before completing 50% of the course, they are eligible for a 50% refund of the course fee.",
                      "If more than 50% of the course is completed, no refund will be processed.",
                      "Refunds will be processed within 7–10 working days after approval.",
                      "All refund requests must be made in writing via email to: support@skillsha.com",
                      "Payment gateway charges and applicable taxes are non-refundable."
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
                      <strong>Note:</strong> Refund eligibility is determined based on class attendance records, session logs, and LMS access data.
                    </p>
                  </div>
                </div>
              </article>

              {/* 8. Third-Party Services */}
              <article 
                id="third-party"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  8. Third-Party Services
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p className="mb-3">
                    We may use third-party services for:
                  </p>
                  <ul className="space-y-2 mb-3">
                    {[
                      "Payment processing (e.g., Razorpay)",
                      "Email delivery (e.g., Mailchimp)",
                      "Analytics and traffic tracking (e.g., Google Analytics)"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    These third parties have their own privacy policies. We recommend you review them separately.
                  </p>
                </div>
              </article>

              {/* 9. Data Retention */}
              <article 
                id="data-retention"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  9. Data Retention
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p className="mb-3">
                    We retain your personal information as long as:
                  </p>
                  <ul className="space-y-2 mb-3">
                    {[
                      "You are an active user/student",
                      "Required by law",
                      "Needed to resolve disputes, support audit requirements, or enforce agreements"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    Once no longer required, your data is securely deleted or anonymized.
                  </p>
                </div>
              </article>

              {/* 10. Cookies */}
              <article 
                id="cookies"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  10. Cookies
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p className="mb-3">
                    Our website uses cookies to enhance your browsing experience. You can manage or block cookies through your browser settings. Cookies help us:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Remember user preferences",
                      "Improve performance and functionality",
                      "Track website performance for internal insights"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              {/* 11. Age of Consent */}
              <article 
                id="age-consent"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  11. Age of Consent
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p className="mb-2">
                    By using this website, you confirm that:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "You are at least 18 years of age, or",
                      "You have parental or guardian consent if under 18"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              {/* 12. Disclosure */}
              <article 
                id="disclosure"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  12. Disclosure
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p className="mb-2">
                    We may disclose your personal data:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "If required by law or legal authorities",
                      "If you violate our Terms of Service",
                      "To protect our legal rights or respond to legal processes"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              {/* 13. External Links */}
              <article 
                id="external-links"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  13. External Links
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p>
                    Our website may contain links to third-party sites. We are not responsible for the privacy practices of those websites. Please review their policies before sharing personal data.
                  </p>
                </div>
              </article>

              {/* 14. Data Security */}
              <article 
                id="data-security-detail"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  14. Data Security
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p className="mb-3">
                    Skillsha implements industry-standard security practices to safeguard your data. These include:
                  </p>
                  <ul className="space-y-2 mb-3">
                    {[
                      "Secure SSL encryption",
                      "Access controls on servers",
                      "Regular backups and audits"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                    However, no digital platform is 100% secure. Use of our site is at your own risk.
                  </p>
                </div>
              </article>

              {/* 15. Changes to This Policy */}
              <article 
                id="changes"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  15. Changes to This Policy
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p>
                    We reserve the right to modify this policy at any time. Updates will be posted on this page, and significant changes will be notified via email or our platform. Please review this page regularly to stay informed.
                  </p>
                </div>
              </article>

              {/* 16. Contact Us */}
              <article 
                id="contact-us"
                className="bg-white dark:bg-[#0c0c0c] border-l-4 border-l-brand-orange border-y border-r border-zinc-200 dark:border-white/5 rounded-[24px] p-6 md:p-8 shadow-[0_4px_25px_rgba(249,115,22,0.02)] transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-orange" />
                  16. Contact Us
                </h2>
                <div className="text-xs md:text-sm text-zinc-755 dark:text-zinc-200 font-extrabold space-y-4">
                  <p className="leading-relaxed">
                    If you have any questions about this policy or your personal information:
                  </p>
                  <div className="p-4 bg-zinc-50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl max-w-md">
                    <p className="text-zinc-900 dark:text-white">
                      Skillsha – IT Training & Placement Institute
                    </p>
                    <p className="text-zinc-500 dark:text-zinc-400 font-semibold mt-1">
                      Prem Nagar, Ram Rahim Market, Loni, Ghaziabad, Uttar Pradesh – 201102
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-xs mt-2 border-t border-zinc-100 dark:border-white/5 pt-4">
                    <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 font-semibold">
                      <Mail className="w-4 h-4 text-brand-orange" />
                      Email 1: <a href="mailto:support@skillsha.com" className="text-brand-orange hover:underline font-extrabold">support@skillsha.com</a>
                    </span>
                    <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 font-semibold">
                      <Mail className="w-4 h-4 text-brand-orange" />
                      Email 2: <a href="mailto:info@skillsha.com" className="text-brand-orange hover:underline font-extrabold">info@skillsha.com</a>
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
