"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface CertificateData {
  id: string;
  name: string;
  course: string;
  date: string;
  grade: string;
  instructor: string;
}

const MOCK_CERTIFICATES: Record<string, CertificateData> = {
  "SKILLSHA-2026-AI": {
    id: "SKILLSHA-2026-AI",
    name: "Lavish",
    course: "AI Engineering Masterclass",
    date: "May 18, 2026",
    grade: "Distinction (A+)",
    instructor: "Dr. Aris Thorne"
  },
  "SKILLSHA-2026-UX": {
    id: "SKILLSHA-2026-UX",
    name: "Jane Doe",
    course: "Advanced UI/UX & Design Systems",
    date: "May 12, 2026",
    grade: "Excellent (A)",
    instructor: "Sarah Vance"
  },
  "SKILLSHA-2026-QUANT": {
    id: "SKILLSHA-2026-QUANT",
    name: "Alex Rivera",
    course: "Algorithmic Trading & Quantitative Finance",
    date: "May 15, 2026",
    grade: "Distinction (A+)",
    instructor: "Marcus Kael"
  }
};

export default function CertificatePage() {
  const [certId, setCertId] = useState("");
  const [searchResult, setSearchResult] = useState<CertificateData | null>(null);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = certId.trim().toUpperCase();
    
    if (!cleanId) {
      setError("Please enter a valid credential ID.");
      setSearchResult(null);
      return;
    }

    setError("");
    setSearched(false);

    try {
      const res = await fetch(`/api/certificate?id=${encodeURIComponent(cleanId)}`);
      const data = await res.json();

      if (res.ok && data.success) {
        const cert = data.certificate;
        setSearchResult({
          id: cert.credentialId,
          name: cert.studentName,
          course: cert.courseName,
          date: cert.dateIssued,
          grade: cert.grade,
          instructor: cert.instructor
        });
      } else {
        setSearchResult(null);
        setError(data.error || "No certificate found with this credential ID. Try: SKILLSHA-2026-AI");
      }
    } catch (err) {
      console.error(err);
      setSearchResult(null);
      setError("Connection issue verifying certificate. Please try again.");
    } finally {
      setSearched(true);
    }
  };

  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#050505] text-zinc-900 dark:text-white transition-colors duration-300">
      <Header />
      
      <main className="max-w-[1200px] mx-auto px-6 pt-32 pb-24">
        {/* Intro Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-reveal active">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/10 dark:bg-brand-orange/20 px-3 py-1 rounded-full">
            Credential Service
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-4 mb-4">
            Verify Certificate 🎓
          </h1>
          <p className="text-[14px] text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">
            Verify the authenticity of certifications issued by SkillSha. Enter the unique credential ID printed at the bottom of your certificate.
          </p>
        </div>

        {/* Verification Form Card */}
        <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-xl mb-12">
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                Credential ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. SKILLSHA-2026-AI"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.02] text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange text-sm font-semibold uppercase placeholder:normal-case transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  Verify
                </button>
              </div>
              <p className="text-[10px] text-zinc-400 mt-2">
                Try these demo credentials: <span className="font-bold text-brand-orange">SKILLSHA-2026-AI</span> or <span className="font-bold text-brand-orange">SKILLSHA-2026-UX</span>
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-500 text-[11px] font-semibold text-center leading-relaxed">
                {error}
              </div>
            )}
          </form>
        </div>

        {/* Certificate Display Area */}
        {searched && searchResult && (
          <div className="max-w-4xl mx-auto animate-reveal active">
            <div className="border border-zinc-200 dark:border-white/10 rounded-2xl bg-white dark:bg-zinc-900 p-6 md:p-10 shadow-2xl relative overflow-hidden">
              {/* Premium Certificate Border Backdrop */}
              <div className="absolute inset-0 border-[16px] border-zinc-100 dark:border-zinc-800/40 pointer-events-none"></div>
              
              <div className="relative z-10 text-center py-8">
                {/* Logo */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  <img src="/files/logo-icon.png" alt="SkillSha Logo" className="h-10 w-auto object-contain" />
                  <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">Skill<span className="text-brand-orange">Sha</span></span>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Certificate of Completion
                </span>
                
                <h2 className="text-2xl md:text-4xl font-serif font-semibold text-zinc-900 dark:text-white mt-4 mb-2">
                  {searchResult.name}
                </h2>
                
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                  has successfully completed all academic requirements, capstone projects, and rigorous assessments for the program:
                </p>

                <h3 className="text-lg md:text-2xl font-bold tracking-tight text-brand-orange mt-6 mb-2">
                  {searchResult.course}
                </h3>
                
                <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                  Grade Earned: <span className="text-zinc-900 dark:text-white">{searchResult.grade}</span>
                </p>

                {/* Signatures & Verification Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-zinc-100 dark:border-white/5 max-w-2xl mx-auto">
                  <div className="text-left md:text-center">
                    <span className="block text-[10px] uppercase text-zinc-400">Date Issued</span>
                    <span className="block text-xs font-bold text-zinc-900 dark:text-white mt-1">{searchResult.date}</span>
                  </div>
                  <div className="text-left md:text-center">
                    <span className="block text-[10px] uppercase text-zinc-400">Instructor Signature</span>
                    <span className="block text-xs font-serif italic text-zinc-900 dark:text-white mt-1">{searchResult.instructor}</span>
                  </div>
                  <div className="text-left md:text-center">
                    <span className="block text-[10px] uppercase text-zinc-400">Credential ID</span>
                    <span className="block text-[11px] font-bold text-brand-orange mt-1">{searchResult.id}</span>
                  </div>
                </div>

                {/* Badge decoration */}
                <div className="mt-8 flex justify-center">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-500 text-[10px] font-bold tracking-wide uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Verified Authentic
                  </div>
                </div>
              </div>
            </div>

            {/* Print/Download Button */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={triggerPrint}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-md shadow-brand-orange/20 cursor-pointer flex items-center gap-2"
              >
                <span>Print Certificate / Save PDF 🖨️</span>
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
