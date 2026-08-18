"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Eye, 
  Clock, 
  Check, 
  Mail, 
  ChevronRight, 
  FileText,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Lock,
  ExternalLink,
  ShieldAlert
} from "lucide-react";

interface Section {
  id: string;
  title: string;
}

const SECTIONS: Section[] = [
  { id: "what-cookies", title: "What Are Cookies?" },
  { id: "why-cookies", title: "Why Do We Use Cookies?" },
  { id: "types-cookies", title: "Types of Cookies We Use" },
  { id: "no-use-cookies", title: "Cookies We Do NOT Use" },
  { id: "third-party", title: "Third-Party Cookies" },
  { id: "control-cookies", title: "How to Control Cookies" },
  { id: "stay-device", title: "How Long Do Cookies Stay?" },
  { id: "consent-cookies", title: "Consent for Cookies" },
  { id: "updates-policy", title: "Updates to This Cookie Policy" },
  { id: "contact-us", title: "Contact Us" },
  { id: "seo-notes", title: "SEO & Privacy Compliance" }
];

export default function DisclaimerPage() {
  const [activeSection, setActiveSection] = useState("what-cookies");

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
              <Eye className="w-3.5 h-3.5 text-brand-orange" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-orange dark:text-zinc-300">
                Transparency & Compliance
              </span>
            </div>
            
            <h1 className="text-[28px] md:text-[44px] font-extrabold tracking-tight text-zinc-955 dark:text-white mb-4 font-heading leading-tight">
              Skillsha Cookie Policy
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs text-zinc-550 dark:text-zinc-400 font-semibold mb-6">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-orange" />
                Last Updated: [Insert Date]
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 hidden sm:inline" />
              <span>General Transparency Standard</span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 hidden sm:inline" />
              <span>Safe Browsing Audited</span>
            </div>

            <p className="text-[13px] md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold max-w-4xl mb-4">
              At Skillsha – IT Training & Placement Institute, we are committed to protecting your privacy and ensuring transparency in how your information is used. This Cookie Policy explains how we use cookies and similar technologies on our website skillsha.com, what types of cookies we use, and how you can control your preferences. This page is provided for informational and compliance purposes and is part of our effort to maintain full transparency with our users. The information shared here is not legally binding and should not be considered legal advice. Our intention is to inform users in a way that respects their rights while ensuring an uninterrupted experience with our website and services.
            </p>
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
              
              {/* 🔹 What Are Cookies? */}
              <article 
                id="what-cookies"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  🔹 What Are Cookies?
                </h2>
                <div className="text-xs md:text-sm text-zinc-600 dark:text-zinc-405 leading-relaxed font-semibold space-y-3">
                  <p>
                    Cookies are small text files that websites store on your device (computer, mobile phone, tablet, etc.) when you visit them. Cookies are widely used to make websites work more efficiently, as well as to provide useful information to website owners about user interaction, preferences, and behavior.
                  </p>
                  <p>
                    Cookies allow a website to remember actions and preferences (such as login, language, font size, and other display preferences) over a period of time, so you don’t have to keep re-entering them whenever you return to the site.
                  </p>
                </div>
              </article>

              {/* 🔹 Why Do We Use Cookies? */}
              <article 
                id="why-cookies"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  🔹 Why Do We Use Cookies?
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p className="mb-4">
                    Skillsha uses cookies to:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Improve your browsing experience on our website",
                      "Understand how visitors use our website",
                      "Customize and optimize user interactions",
                      "Track the effectiveness of our marketing campaigns",
                      "Remember your preferences (like language and location)",
                      "Enable core website functionalities (e.g., forms, login sessions)"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              {/* 🔹 Types of Cookies We Use */}
              <article 
                id="types-cookies"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  1🔹 Types of Cookies We Use
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold space-y-4">
                  
                  {/* 1. Strictly Necessary */}
                  <div className="p-4 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-2">
                      1. Strictly Necessary Cookies
                    </h4>
                    <p className="mb-2">
                      These cookies are essential for the website to function properly. They enable core functionalities such as security, network management, and accessibility. You cannot opt out of these cookies if you want to use our website.
                    </p>
                    <div className="text-xs text-zinc-500">
                      <strong>Examples:</strong> Session cookies, CSRF protection cookies, Login authentication cookies
                    </div>
                  </div>

                  {/* 2. Performance & Analytics */}
                  <div className="p-4 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-2">
                      2. Performance & Analytics Cookies
                    </h4>
                    <p className="mb-2">
                      These cookies help us understand how users interact with our website by collecting information like page visits, time spent on pages, and error messages. We use tools like Google Analytics to analyze trends.
                    </p>
                    <div className="text-xs text-zinc-500">
                      <strong>Examples:</strong> Google Analytics cookies (_ga, _gid, etc.), Hotjar, Microsoft Clarity (if implemented)
                    </div>
                  </div>

                  {/* 3. Functionality */}
                  <div className="p-4 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-2">
                      3. Functionality Cookies
                    </h4>
                    <p className="mb-2">
                      These cookies allow our website to remember choices you make (such as your username, language, or region) and provide enhanced, personalized features.
                    </p>
                    <div className="text-xs text-zinc-500">
                      <strong>Examples:</strong> Language preference cookies, Chat support cookies (e.g., Tawk.to or Crisp)
                    </div>
                  </div>

                  {/* 4. Targeting/Advertising */}
                  <div className="p-4 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-2">
                      4. Targeting/Advertising Cookies
                    </h4>
                    <p className="mb-2">
                      We may use these cookies to deliver ads more relevant to you and your interests. These cookies may also be used to track the effectiveness of ad campaigns.
                    </p>
                    <div className="text-xs text-zinc-500">
                      <strong>Examples:</strong> Facebook Pixel, Google Ads, LinkedIn Insight Tag
                    </div>
                  </div>

                </div>
              </article>

              {/* 🔹 Cookies We Do NOT Use */}
              <article 
                id="no-use-cookies"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  🔹 Cookies We Do NOT Use
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p className="mb-3">
                    At present, we do not store any personally identifiable information (PII) through cookies directly. Any data we collect via cookies is aggregated and anonymized to the best of our knowledge and in compliance with privacy regulations.
                  </p>
                  <p className="mb-3 font-extrabold text-zinc-900 dark:text-white">
                    We do not:
                  </p>
                  <ul className="space-y-1">
                    {["Sell or trade cookie data to third parties", "Use cookies to collect sensitive personal information", "Use cookies for malicious or hidden tracking"].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              {/* 🔹 Third-Party Cookies */}
              <article 
                id="third-party"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  2🔹 Third-Party Cookies
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p className="mb-4">
                    Skillsha may use third-party service providers that set their own cookies for various services such as analytics, ads, social sharing, and embedded content. These third parties include but are not limited to:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {[
                      "Google (Analytics, Ads)",
                      "Meta (Facebook Pixel)",
                      "LinkedIn",
                      "YouTube (video embeds)",
                      "Instagram, Pinterest (embed behavior, tracking)"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 p-3 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <p>
                    Each of these providers may have their own privacy and cookie policies. We advise users to read their terms for further understanding.
                  </p>
                </div>
              </article>

              {/* 🔹 How to Control Cookies */}
              <article 
                id="control-cookies"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  🔹 How to Control Cookies
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold">
                  <p className="mb-4">
                    You can manage or delete cookies from your browser settings. Most browsers allow you to:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                    {["Accept all cookies", "Notify you when a cookie is being set", "Block all cookies", "Delete stored cookies"].map((c, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl justify-center text-center">
                        <span className="text-[11px] font-bold leading-tight">{c}</span>
                      </div>
                    ))}
                  </div>

                  <p className="mb-3 font-extrabold text-zinc-900 dark:text-white">
                    Here are links to instructions for popular browsers:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                    {[
                      { name: "Google Chrome", url: "https://support.google.com/chrome/answer/95647" },
                      { name: "Mozilla Firefox", url: "https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop" },
                      { name: "Safari", url: "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" },
                      { name: "Microsoft Edge", url: "https://support.microsoft.com/microsoft-edge/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" }
                    ].map((item, idx) => (
                      <a 
                        key={idx} 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-1 p-2 bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 rounded-xl justify-center text-brand-orange hover:underline font-bold text-center text-xs"
                      >
                        <span>{item.name}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ))}
                  </div>

                  <p className="border-t border-zinc-100 dark:border-white/5 pt-3 mt-3 text-zinc-500">
                    Please note that blocking some types of cookies may impact your experience on our website and the services we are able to offer.
                  </p>
                </div>
              </article>

              {/* 🔹 How Long Do Cookies Stay on My Device? */}
              <article 
                id="stay-device"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  🔹 How Long Do Cookies Stay on My Device?
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold space-y-3">
                  <p>
                    Cookies may be stored for different periods:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Session Cookies: Automatically deleted when you close your browser.",
                      "Persistent Cookies: Remain on your device until they expire or are manually deleted."
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="border-t border-zinc-100 dark:border-white/5 pt-3 mt-3 text-zinc-500">
                    The expiration time of each cookie depends on its purpose and provider. You can review this through your browser’s developer tools or cookie manager.
                  </p>
                </div>
              </article>

              {/* 🔹 Consent for Cookies */}
              <article 
                id="consent-cookies"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  3🔹 Consent for Cookies
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold space-y-3">
                  <p>
                    By using our website, you acknowledge that we may use cookies as described in this policy.
                  </p>
                  <p>
                    When you visit our website for the first time, you will be shown a cookie banner. You can choose to accept or customize cookie settings from there. We store your consent preferences for a specific period and respect your decision.
                  </p>
                </div>
              </article>

              {/* 🔹 Updates to This Cookie Policy */}
              <article 
                id="updates-policy"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-brand-orange rounded-full" />
                  🔹 Updates to This Cookie Policy
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold space-y-3">
                  <p>
                    We may update this Cookie Policy from time to time in order to reflect changes in technologies, legal requirements, or our practices. When we do, we will update the “Last Updated” date at the top of the page.
                  </p>
                  <p>
                    If any material changes are made, we may also notify you by placing a notice on our website or sending you an email.
                  </p>
                </div>
              </article>

              {/* 🔹 Contact Us */}
              <article 
                id="contact-us"
                className="bg-white dark:bg-[#0c0c0c] border-l-4 border-l-brand-orange border-y border-r border-zinc-200 dark:border-white/5 rounded-[24px] p-6 md:p-8 shadow-[0_4px_25px_rgba(249,115,22,0.02)] transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-brand-orange" />
                  🔹 Contact Us
                </h2>
                <div className="text-xs md:text-sm text-zinc-755 dark:text-zinc-200 font-extrabold space-y-4">
                  <p className="leading-relaxed">
                    If you have any questions or concerns about our Cookie Policy or your cookie preferences, please contact:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-xs mt-2">
                    <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 font-semibold">
                      <Mail className="w-4 h-4 text-brand-orange" />
                      Email: <a href="mailto:info@skillsha.com" className="text-brand-orange hover:underline font-extrabold">info@skillsha.com</a>
                    </span>
                    <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 font-semibold">
                      <Mail className="w-4 h-4 text-brand-orange" />
                      Support: <a href="mailto:support@skillsha.com" className="text-brand-orange hover:underline font-extrabold">support@skillsha.com</a>
                    </span>
                  </div>
                </div>
              </article>

              {/* 🔒 SEO and Privacy Compliance Notes */}
              <article 
                id="seo-notes"
                className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/30 transition-all duration-300"
              >
                <h2 className="text-base font-extrabold text-zinc-955 dark:text-white font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-brand-orange" />
                  🔒 SEO and Privacy Compliance Notes
                </h2>
                <div className="text-xs md:text-sm text-zinc-655 dark:text-zinc-405 leading-relaxed font-semibold space-y-3">
                  <p className="mb-2">
                    This Cookie Policy is:
                  </p>
                  <ul className="space-y-1">
                    {[
                      "✅ Compliant with major SEO guidelines for transparency",
                      "✅ Optimized with LSI keywords (e.g., \"how Skillsha uses cookies\", \"cookie preferences\", \"manage cookie settings\")",
                      "✅ Written in simple English and student- and user-friendly tone",
                      "✅ Aligned with GDPR and Indian Data Privacy expectations"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 p-2 bg-zinc-50/50 dark:bg-white/[0.015] border border-zinc-100 dark:border-white/5 rounded-xl">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <p className="border-t border-zinc-100 dark:border-white/5 pt-3 mt-3">
                    We recommend reading our Privacy Policy and Disclaimer for full transparency.
                  </p>
                  
                  <div className="p-4 bg-zinc-50 dark:bg-white/[0.015] border border-zinc-200 dark:border-white/5 rounded-xl text-xs space-y-2 mt-4">
                    <p>
                      <strong>Note:</strong> This document is for backup & legal safeguarding purposes. It is not intended for promotional use.
                    </p>
                    <p>
                      Skillsha does not use cookies to compromise user privacy. Any cookie implemented is solely for improving the user experience or technical requirements.
                    </p>
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
