"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { track } from "@vercel/analytics";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("skillsha_user");
      setIsLoggedIn(!!stored);
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    track("Form Submitted", { form_name: "Footer Newsletter Subscription" }, { flags: ["show-new-hero-banner"] });
    setSubscribed(true);
  };

  return (
    <>
          <footer className="hidden md:block border-t border-zinc-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a] mt-0">
        <div className="max-w-[1400px] mx-auto px-8 py-14">

            {/* Top Grid: Brand + Links */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6 mb-10">
                {/* Brand */}
                <div className="col-span-2">
                    <div className="flex items-center gap-1 mb-4">
                        <Image src="/files/logo-icon.png" alt="SkillSha" width={42} height={40} className="h-11 w-auto object-contain" />
                        <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">Skill<span className="text-brand-orange">Sha</span></span>
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400 text-[13px] leading-relaxed mb-5 max-w-sm">India&apos;s leading AI-native academy for creators, founders, and engineers. We train the next generation of digital builders through project-based, mentor-led programs.</p>
                    {!subscribed ? (
                        <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                            <input type="email" placeholder="Join 5,000+ builders" className="flex-1 px-4 py-2.5 rounded-xl text-sm border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#161616] text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-brand-orange/40 transition-all" required />
                            <button type="submit" className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white text-sm font-semibold hover:scale-[1.02] transition-transform shadow-md shadow-brand-orange/20">Subscribe</button>
                        </form>
                    ) : (
                        <div className="flex gap-2 max-w-sm">
                            <p className="text-brand-orange text-sm font-semibold">✓ You&apos;re on the list!</p>
                        </div>
                    )}
                    {/* Social Icons Row */}
                    <div className="flex items-center gap-4 mt-5">
                        <a href="#" className="text-zinc-400 hover:text-brand-orange transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                        <a href="#" className="text-zinc-400 hover:text-brand-orange transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
                        <a href="#" className="text-zinc-400 hover:text-brand-orange transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
                        <a href="#" className="text-zinc-400 hover:text-brand-orange transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
                        <a href="#" className="text-zinc-400 hover:text-brand-orange transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg></a>
                    </div>
                </div>

                {/* Programs Column */}
                <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">Programs</h4>
                    <ul className="space-y-2.5">
                        <li><Link href="/course/digital-marketing-course-with-gen-ai" className="text-[13px] text-amber-500 font-bold hover:text-amber-600 transition-colors flex items-center gap-1.5">Digital Marketing <span className="text-[8px] bg-gradient-to-r from-amber-500 to-orange-500 text-white px-1 py-0.5 rounded font-extrabold tracking-wider leading-normal">FLAGSHIP</span></Link></li>
                        <li><Link href="/course/ai-engineering-course" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Engineering</Link></li>
                        <li><Link href="/course/ai-ml-course" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI/ML with Gen AI</Link></li>
                        <li><Link href="/course/ui-ux-design-course" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">UI/UX Design</Link></li>
                        <li><Link href="/course/data-science-course" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Science & AI</Link></li>
                        <li><Link href="/course/data-analyst-course" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Analyst</Link></li>
                        <li><Link href="/course/business-analyst-course" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Business Analyst</Link></li>
                        <li><Link href="/course/software-testing-course" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Software Testing</Link></li>
                        <li><Link href="/course/playwright-automation-course" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Playwright Automation</Link></li>
                        <li><Link href="/course/product-management-course" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Product Management</Link></li>
                        <li><Link href="/course/algorithmic-trading-course" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Algorithmic Trading</Link></li>
                        <li><Link href="/course/graphic-design-course" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Graphic Designing</Link></li>
                        <li><Link href="/course/mental-health-wellness-course" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Mental Health & Wellness</Link></li>
                    </ul>
                </div>

                {/* Resources Column */}
                <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">Resources</h4>
                    <ul className="space-y-2.5">
                        <li><Link href="/blog" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Blog</Link></li>
                        <li><Link href="/case-studies" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Case Studies</Link></li>
                        <li><Link href="/ai-tools-guide" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Free AI Tools Guide</Link></li>
                        <li><Link href="/roadmaps" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Career Roadmaps</Link></li>
                        <li><Link href="/success-stories" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Student Success Stories</Link></li>
                        <li><Link href="/events" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Webinars & Events</Link></li>
                        <li><Link href="/community" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Community Forum</Link></li>
                    </ul>
                </div>

                {/* Company Column */}
                <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">Company</h4>
                    <ul className="space-y-2.5">
                        <li><Link href="/about" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">About Us</Link></li>
                        <li><Link href="/mentors" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Our Mentors</Link></li>
                        <li><Link href="/alumni" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Alumni Network</Link></li>
                        <li><Link href="/hiring-partners" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Hiring Partners</Link></li>
                        <li><Link href="/placement-report" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Placement Report</Link></li>
                        <li><Link href="/careers" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Careers at SkillSha</Link></li>
                        <li><Link href="/contact" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Contact Us</Link></li>
                        <li><Link href="/press" className="text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-brand-orange transition-colors">Press & Media</Link></li>
                    </ul>
                </div>
            </div>

            {/* SEO: Students Zone */}
            <div className="border-t border-zinc-100 dark:border-white/5 pt-7 pb-5">
                <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 mb-3 tracking-tight">Students Zone</h3>
                <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Blogs</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Summer Training 2025</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Winter Training 2025</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Industrial Training</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Corporate Training</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Placement Assistance</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Video Reviews</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Student Projects</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Internship Programs</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Scholarship Programs</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Campus Ambassador</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Refer & Earn</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Free Workshops</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Certification Exams</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Alumni Portal</a><span className="text-brand-orange text-[10px]">|</span>
                </div>
            </div>

            {/* SEO: Popular Courses */}
            <div className="border-t border-zinc-100 dark:border-white/5 pt-7 pb-5">
                <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 mb-3 tracking-tight">Popular Courses</h3>
                <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Artificial Intelligence Course</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Machine Learning Course</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Deep Learning Course</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">ChatGPT & Prompt Engineering</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Generative AI Course</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">LLM Fine-Tuning Course</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Agent Development</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Python for AI</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Full Stack Web Development</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">MERN Stack Course</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">React.js Course</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Next.js Course</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Node.js Backend Development</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Cloud Computing with AWS</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">DevOps Training</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Course</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Google Ads Certification</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Meta Ads Masterclass</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">SEO Training Course</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Content Marketing Course</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Social Media Marketing</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">UI/UX Design Course</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Figma Masterclass</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Product Design Course</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Analytics with Python</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Power BI & Tableau Training</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">SQL for Data Science</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Cybersecurity Fundamentals</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Blockchain & Web3 Development</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">SaaS Product Building</a><span className="text-brand-orange text-[10px]">|</span>
                </div>
            </div>

            {/* SEO: Trending Topics */}
            <div className="border-t border-zinc-100 dark:border-white/5 pt-7 pb-5">
                <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 mb-3 tracking-tight">Trending Topics</h3>
                <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">What is Artificial Intelligence?</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">How to Become an AI Engineer in 2025</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Best Programming Languages to Learn</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI vs Machine Learning vs Deep Learning</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">How to Build AI Agents</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">ChatGPT for Business</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Future of Full Stack Development</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">How to Get a Job in Data Science</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Top AI Tools for Startups</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">How to Start a Career in Digital Marketing</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">React vs Angular vs Vue</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Best AI Certifications 2025</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">What is Prompt Engineering?</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">How to Build a SaaS Product</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Top Freelancing Skills in India</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Is Data Science a Good Career?</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">How to Learn Python Fast</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">UI/UX Design Salary in India</a><span className="text-brand-orange text-[10px]">|</span>
                </div>
            </div>

            {/* SEO: Cities Course Pages */}
            <div className="border-t border-zinc-100 dark:border-white/5 pt-7 pb-5">
                <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 mb-5 tracking-tight">Cities Course Pages</h3>
                
                <div className="mb-4">
                    <h4 className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-200 mb-1.5">Best Courses in Noida</h4>
                    <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5">
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Engineering Training Course in Noida</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Science Training Course in Noida</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Analytics Training Course in Noida</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Full Stack Developer Training Course in Noida</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Training Course in Noida</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">UI/UX Design Training Course in Noida</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Python Programming Course in Noida</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Machine Learning Course in Noida</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Course in Noida</a><span className="text-brand-orange text-[10px]">|</span>
                    </div>
                </div>
                <div className="mb-4">
                    <h4 className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-200 mb-1.5">Best Courses in Delhi</h4>
                    <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5">
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Engineering Training Course in Delhi</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Science Training Course in Delhi</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Analytics Training Course in Delhi</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Full Stack Developer Training Course in Delhi</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Training Course in Delhi</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">UI/UX Design Training Course in Delhi</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Python Programming Course in Delhi</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Machine Learning Course in Delhi</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Course in Delhi</a><span className="text-brand-orange text-[10px]">|</span>
                    </div>
                </div>
                <div className="mb-4">
                    <h4 className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-200 mb-1.5">Best Courses in Pune</h4>
                    <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5">
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Engineering Training Course in Pune</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Science Training Course in Pune</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Analytics Training Course in Pune</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Full Stack Developer Training Course in Pune</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Training Course in Pune</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">UI/UX Design Training Course in Pune</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Python Programming Course in Pune</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Machine Learning Course in Pune</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Course in Pune</a><span className="text-brand-orange text-[10px]">|</span>
                    </div>
                </div>
                <div className="mb-4">
                    <h4 className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-200 mb-1.5">Best Courses in Bangalore</h4>
                    <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5">
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Engineering Training Course in Bangalore</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Science Training Course in Bangalore</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Analytics Training Course in Bangalore</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Full Stack Developer Training Course in Bangalore</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Training Course in Bangalore</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">UI/UX Design Training Course in Bangalore</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Python Programming Course in Bangalore</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Machine Learning Course in Bangalore</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Course in Bangalore</a><span className="text-brand-orange text-[10px]">|</span>
                    </div>
                </div>
                <div className="mb-4">
                    <h4 className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-200 mb-1.5">Best Courses in Mumbai</h4>
                    <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5">
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Engineering Training Course in Mumbai</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Science Training Course in Mumbai</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Analytics Training Course in Mumbai</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Full Stack Developer Training Course in Mumbai</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Training Course in Mumbai</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">UI/UX Design Training Course in Mumbai</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Python Programming Course in Mumbai</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Machine Learning Course in Mumbai</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Course in Mumbai</a><span className="text-brand-orange text-[10px]">|</span>
                    </div>
                </div>
                <div className="mb-4">
                    <h4 className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-200 mb-1.5">Best Courses in Hyderabad</h4>
                    <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5">
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Engineering Training Course in Hyderabad</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Science Training Course in Hyderabad</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Analytics Training Course in Hyderabad</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Full Stack Developer Training Course in Hyderabad</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Training Course in Hyderabad</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">UI/UX Design Training Course in Hyderabad</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Python Programming Course in Hyderabad</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Machine Learning Course in Hyderabad</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Course in Hyderabad</a><span className="text-brand-orange text-[10px]">|</span>
                    </div>
                </div>
                <div className="mb-4">
                    <h4 className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-200 mb-1.5">Best Courses in Chennai</h4>
                    <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5">
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Engineering Training Course in Chennai</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Science Training Course in Chennai</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Analytics Training Course in Chennai</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Full Stack Developer Training Course in Chennai</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Training Course in Chennai</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">UI/UX Design Training Course in Chennai</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Python Programming Course in Chennai</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Machine Learning Course in Chennai</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Course in Chennai</a><span className="text-brand-orange text-[10px]">|</span>
                    </div>
                </div>
                <div className="mb-4">
                    <h4 className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-200 mb-1.5">Best Courses in Kolkata</h4>
                    <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5">
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Engineering Training Course in Kolkata</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Science Training Course in Kolkata</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Analytics Training Course in Kolkata</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Full Stack Developer Training Course in Kolkata</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Training Course in Kolkata</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">UI/UX Design Training Course in Kolkata</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Python Programming Course in Kolkata</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Machine Learning Course in Kolkata</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Course in Kolkata</a><span className="text-brand-orange text-[10px]">|</span>
                    </div>
                </div>
                <div className="mb-4">
                    <h4 className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-200 mb-1.5">Best Courses in Jaipur</h4>
                    <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5">
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Engineering Training Course in Jaipur</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Science Training Course in Jaipur</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Analytics Training Course in Jaipur</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Full Stack Developer Training Course in Jaipur</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Training Course in Jaipur</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">UI/UX Design Training Course in Jaipur</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Python Programming Course in Jaipur</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Machine Learning Course in Jaipur</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Course in Jaipur</a><span className="text-brand-orange text-[10px]">|</span>
                    </div>
                </div>
                <div className="mb-4">
                    <h4 className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-200 mb-1.5">Best Courses in Lucknow</h4>
                    <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5">
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Engineering Training Course in Lucknow</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Science Training Course in Lucknow</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Analytics Training Course in Lucknow</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Full Stack Developer Training Course in Lucknow</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Training Course in Lucknow</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">UI/UX Design Training Course in Lucknow</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Python Programming Course in Lucknow</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Machine Learning Course in Lucknow</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Course in Lucknow</a><span className="text-brand-orange text-[10px]">|</span>
                    </div>
                </div>
                <div className="mb-4">
                    <h4 className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-200 mb-1.5">Best Courses in Chandigarh</h4>
                    <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5">
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Engineering Training Course in Chandigarh</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Science Training Course in Chandigarh</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Analytics Training Course in Chandigarh</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Full Stack Developer Training Course in Chandigarh</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Training Course in Chandigarh</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">UI/UX Design Training Course in Chandigarh</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Python Programming Course in Chandigarh</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Machine Learning Course in Chandigarh</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Course in Chandigarh</a><span className="text-brand-orange text-[10px]">|</span>
                    </div>
                </div>
                <div className="mb-4">
                    <h4 className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-200 mb-1.5">Best Courses in Ahmedabad</h4>
                    <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5">
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Engineering Training Course in Ahmedabad</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Science Training Course in Ahmedabad</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Analytics Training Course in Ahmedabad</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Full Stack Developer Training Course in Ahmedabad</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Training Course in Ahmedabad</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">UI/UX Design Training Course in Ahmedabad</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Python Programming Course in Ahmedabad</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Machine Learning Course in Ahmedabad</a><span className="text-brand-orange text-[10px]">|</span>
                        <a href="#" className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Course in Ahmedabad</a><span className="text-brand-orange text-[10px]">|</span>
                    </div>
                </div>
            </div>

            {/* SEO: Interview Preparation */}
            <div className="border-t border-zinc-100 dark:border-white/5 pt-7 pb-5">
                <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 mb-3 tracking-tight">Interview Preparation</h3>
                <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Python Interview Questions</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">JavaScript Interview Questions</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">React Interview Questions</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Node.js Interview Questions</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">SQL Interview Questions</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Science Interview Questions</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Machine Learning Interview Questions</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">System Design Interview Questions</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">DSA Interview Questions</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI & Deep Learning Interview Questions</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Interview Questions</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">HR Interview Questions</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Product Manager Interview Questions</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">UI/UX Design Interview Questions</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AWS Cloud Interview Questions</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">DevOps Interview Questions</a><span className="text-brand-orange text-[10px]">|</span>
                </div>
            </div>

            {/* SEO: Career Guides */}
            <div className="border-t border-zinc-100 dark:border-white/5 pt-7 pb-5">
                <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 mb-3 tracking-tight">Career Guides</h3>
                <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Engineer Salary in India</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Data Scientist Salary in India</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Full Stack Developer Salary in India</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Digital Marketing Manager Salary</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">UI/UX Designer Salary in India</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Product Manager Salary in India</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">DevOps Engineer Career Path</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Machine Learning Engineer Roadmap</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">How to Switch to Tech Career</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Top Companies Hiring AI Engineers</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Remote Jobs in AI & Data Science</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Freelance Developer Guide</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Resume Templates for Freshers</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">Portfolio Building Guide</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">LinkedIn Profile Optimization</a><span className="text-brand-orange text-[10px]">|</span>
                </div>
            </div>

            {/* SEO: AI Courses by Profession */}
            <div className="border-t border-zinc-100 dark:border-white/5 pt-7 pb-5">
                <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 mb-3 tracking-tight">AI Courses by Profession</h3>
                <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Course for Doctors</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Course for Nurses</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Course for Chartered Accountants</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Course for Lawyers</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Course for Teachers</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Course for Financial Analysts</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Course for Marketing Professionals</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Course for Product Managers</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Course for HR Professionals</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Course for Architects</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Course for Designers</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Course for Content Creators</a><span className="text-brand-orange text-[10px]">|</span>
                    <a href="#" className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-orange transition-colors">AI Course for Business Leaders</a><span className="text-brand-orange text-[10px]">|</span>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-zinc-100 dark:border-white/5 pt-6 mt-2 flex flex-col md:flex-row gap-3 justify-between items-center">
                <p className="text-xs text-zinc-400">&copy; 2026 SkillSha. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link href="/privacy-policy" className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">Privacy Policy</Link>
                    <Link href="/terms-and-conditions" className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">Terms of Service</Link>
                    <Link href="/refund-policy" className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">Refund Policy</Link>
                    <Link href="/disclaimer" className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">Disclaimer</Link>
                    <Link href="/team" className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">Team</Link>
                    <a href="#" className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">Sitemap</a>
                </div>
            </div>
        </div>
    </footer>


      {/* Mobile Footer */}
      <nav className="md:hidden fixed bottom-6 left-4 right-4 z-50 bg-[#FAF9F6] dark:bg-[#050505] border border-zinc-200/80 dark:border-white/10 rounded-2xl shadow-xl dark:shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="flex justify-around items-center h-16 px-2">
          {isLoggedIn ? (
            <>
              {/* Courses Tab */}
              <Link href="/profile?tab=courses" className="flex flex-col items-center justify-center w-16 h-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                <span className="text-[10px] font-medium">Curriculum</span>
              </Link>
              {/* Billing Tab */}
              <Link href="/profile?tab=billing" className="flex flex-col items-center justify-center w-16 h-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                <span className="text-[10px] font-medium">Purchases</span>
              </Link>
              {/* Center Home Button */}
              <div className="relative -top-5">
                <Link href="/" className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-orange to-brand-red flex items-center justify-center text-white shadow-lg shadow-brand-orange/40 hover:scale-105 active:scale-95 transition-transform">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3l8 6v12h-5v-7H9v7H4V9l8-6z"/></svg>
                </Link>
              </div>
              {/* Accomplishments Tab */}
              <Link href="/profile?tab=accomplishments" className="flex flex-col items-center justify-center w-16 h-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
                <span className="text-[10px] font-medium">Awards</span>
              </Link>
              {/* Settings Tab */}
              <Link href="/profile?tab=settings" className="flex flex-col items-center justify-center w-16 h-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span className="text-[10px] font-medium">Settings</span>
              </Link>
            </>
          ) : (
            <>
              <Link href="tel:+917303082191" className="flex flex-col items-center justify-center w-16 h-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <span className="text-[10px] font-medium">Call Us</span>
              </Link>
              <Link href="/courses" className="flex flex-col items-center justify-center w-16 h-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                <span className="text-[10px] font-medium">Courses</span>
              </Link>
              <div className="relative -top-5">
                <Link href="/" className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-orange to-brand-red flex items-center justify-center text-white shadow-lg shadow-brand-orange/40 hover:scale-105 active:scale-95 transition-transform">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3l8 6v12h-5v-7H9v7H4V9l8-6z"/></svg>
                </Link>
              </div>
              <Link href="#" className="flex flex-col items-center justify-center w-16 h-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="text-[10px] font-medium">Resources</span>
              </Link>
              <Link href="/profile" className="flex flex-col items-center justify-center w-16 h-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <span className="text-[10px] font-medium">Profile</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
