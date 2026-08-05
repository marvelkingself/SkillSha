"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function PlacementReportPage() {
  const [selectedYear, setSelectedYear] = useState("2026 (Current)");

  const stats = [
    { label: "Highest Package Offered", value: "₹48.2 LPA", change: "+12% YoY" },
    { label: "Average Package", value: "₹9.8 LPA", change: "+8% YoY" },
    { label: "Placement Success Rate", value: "96.8%", change: "Industry Leading" },
    { label: "Average Time to Placement", value: "22 Days", change: "Fast-Track" }
  ];

  const salaries = [
    { range: "₹24 LPA+", percentage: 18, label: "Top 18%" },
    { range: "₹15 - ₹24 LPA", percentage: 26, label: "Next 26%" },
    { range: "₹9 - ₹15 LPA", percentage: 38, label: "Next 38%" },
    { range: "₹6 - ₹9 LPA", percentage: 18, label: "Next 18%" }
  ];

  const sectors = [
    { name: "AI & Neural Systems", share: 44, color: "bg-brand-orange" },
    { name: "Full-Stack Development", share: 26, color: "bg-brand-red" },
    { name: "Quantitative Trading Systems", share: 18, color: "bg-indigo-500" },
    { name: "UI/UX & Spatial Product", share: 12, color: "bg-amber-500" }
  ];

  const partners = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "Razorpay", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Razorpay_logo.svg" },
    { name: "Cred", logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/CRED_Logo.jpg" },
    { name: "Groww", logo: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Groww_logo.svg" },
    { name: "Zerodha", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Zerodha_logo.svg" }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#050505] text-zinc-900 dark:text-white transition-colors duration-300">
      <Header />
      
      <main className="max-w-[1200px] mx-auto px-6 pt-32 pb-24">
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-reveal active">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/10 dark:bg-brand-orange/20 px-3 py-1 rounded-full">
            Placement & Career Report
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-4 mb-4">
            Placement Report 📈
          </h1>
          <p className="text-[14px] text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">
            A comprehensive look at compensation packages, sector distribution, and recruiter insights for SkillSha cohorts.
          </p>

          {/* Year selector tabs */}
          <div className="mt-8 flex justify-center gap-2">
            {["2026 (Current)", "2025 (Archive)"].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border cursor-pointer ${
                  selectedYear === year
                    ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white"
                    : "bg-white/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-white/5 text-zinc-500"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Highlight Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-reveal active">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-brand-orange/30 transition-colors">
              <div className="text-zinc-400 dark:text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-2">
                {stat.label}
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-2">
                {stat.value}
              </div>
              <div className="inline-flex items-center gap-1 text-[9px] font-bold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-md">
                {stat.change}
              </div>
            </div>
          ))}
        </section>

        {/* Visual Charts & Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 animate-reveal active">
          {/* Salary Package Distribution */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">
            <h3 className="text-[16px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-6">
              Salary Compensation Split
            </h3>
            <div className="space-y-5">
              {salaries.map((sal, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">{sal.range}</span>
                    <span className="text-[10px] font-bold text-brand-orange uppercase">{sal.label}</span>
                  </div>
                  <div className="w-full h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-orange to-brand-red rounded-full transition-all duration-1000"
                      style={{ width: `${sal.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sector Share Distribution */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">
            <h3 className="text-[16px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-6">
              Placement by Specialization Sector
            </h3>
            <div className="space-y-4">
              {sectors.map((sec, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${sec.color}`}></div>
                  <div className="flex-1 flex justify-between items-center text-xs">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-300">{sec.name}</span>
                    <span className="font-bold text-zinc-900 dark:text-white">{sec.share}%</span>
                  </div>
                </div>
              ))}
              
              {/* Stacked visualization bar */}
              <div className="w-full h-4 rounded-xl overflow-hidden flex mt-8">
                {sectors.map((sec, idx) => (
                  <div
                    key={idx}
                    className={`h-full ${sec.color}`}
                    style={{ width: `${sec.share}%` }}
                    title={`${sec.name}: ${sec.share}%`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recruiter Showcase */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 md:p-10 shadow-xl text-center mb-12 animate-reveal active">
          <h3 className="text-[16px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-8">
            Top Recruiting Hubs
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center">
            {partners.map((partner, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/5 rounded-xl hover:border-brand-orange/30 transition-colors">
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300 mt-2">{partner.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Action Callouts */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => window.print()}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-md shadow-brand-orange/20 cursor-pointer"
          >
            Export Complete PDF Report 🖨️
          </button>
          <a
            href="/contact"
            className="px-6 py-3.5 rounded-xl bg-white dark:bg-white/5 text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/10 text-xs font-bold uppercase tracking-wider hover:bg-zinc-50 dark:hover:bg-white/10 transition-colors"
          >
            Hire From Network
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
