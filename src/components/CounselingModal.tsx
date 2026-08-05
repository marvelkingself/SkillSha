"use client";
import React, { useState, useEffect } from 'react';

export default function CounselingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setIsOpen(true);
    // Custom event to trigger modal open from anywhere
    window.addEventListener('openCounselingModal', handleOpenModal);
    
    return () => window.removeEventListener('openCounselingModal', handleOpenModal);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, mobile, dateTime })
      });
      if (res.ok) {
        alert('Session Scheduled Successfully!');
        setName("");
        setMobile("");
        setDateTime("");
        setIsOpen(false);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to schedule session.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div 
        className="absolute inset-0" 
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="bg-white dark:bg-[#0c0c0c] border border-zinc-200 dark:border-white/10 p-6 md:p-8 rounded-3xl w-full max-w-md shadow-2xl relative z-10 animate-reveal">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors bg-zinc-100 dark:bg-white/5 p-2 rounded-full"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mb-5">
          <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
        </div>
        
        <h3 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white tracking-tight">Free Counseling</h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6 leading-relaxed">Book a free 1-on-1 video session with our career experts to discuss your journey.</p>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 ml-1">Full Name</label>
            <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#161616] text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange outline-none transition-all" required />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 ml-1">Mobile Number</label>
            <input type="tel" placeholder="+91 98765 43210" value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#161616] text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange outline-none transition-all" required />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 ml-1">Preferred Date & Time</label>
            <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#161616] text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange outline-none transition-all font-medium [color-scheme:light] dark:[color-scheme:dark]" required />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full py-3.5 mt-4 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white font-bold tracking-wide shadow-lg shadow-brand-orange/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer">
            {isSubmitting ? "Processing..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}
