"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React, { useState } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", topic: "general", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="pt-28 md:pt-36 min-h-screen max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Page Hero */}
        <section className="relative py-12 md:py-16 text-center max-w-[900px] mx-auto animate-reveal">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
            </span>
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">Get in touch</span>
          </div>
          <h1 className="text-[36px] md:text-[56px] font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]">
            Let&apos;s Build <span className="text-brand-orange">Together</span>.
          </h1>
          <p className="text-[16px] md:text-[19px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed font-medium max-w-[700px] mx-auto">
            Have questions about our programs, hiring partnerships, or mentoring opportunities? Drop us a line below.
          </p>
        </section>

        {/* Form and Contact Info Grid */}
        <section className="py-12 border-t border-zinc-200 dark:border-white/5 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* Info Side */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h3 className="text-[18px] font-bold text-zinc-900 dark:text-white mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-brand-orange text-[20px] mt-0.5">mail</span>
                    <div>
                      <h4 className="text-[14px] font-semibold text-zinc-900 dark:text-white">General Enquiries</h4>
                      <p className="text-[13px] text-zinc-500 dark:text-[#9CA3AF]">support@skillsha.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-brand-orange text-[20px] mt-0.5">business</span>
                    <div>
                      <h4 className="text-[14px] font-semibold text-zinc-900 dark:text-white">Hiring & Partnerships</h4>
                      <p className="text-[13px] text-zinc-500 dark:text-[#9CA3AF]">partners@skillsha.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-200 dark:border-white/5 pt-8">
                <h3 className="text-[18px] font-bold text-zinc-900 dark:text-white mb-4">Our Hubs</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-2xl p-4">
                    <h4 className="text-[14px] font-bold text-zinc-900 dark:text-white">Delhi NCR</h4>
                    <p className="text-xs text-zinc-500 dark:text-[#9CA3AF] mt-1 leading-relaxed">
                      Sector 62, <br /> Noida, UP, 201301
                    </p>
                  </div>
                  <div className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-2xl p-4">
                    <h4 className="text-[14px] font-bold text-zinc-900 dark:text-white">Bangalore</h4>
                    <p className="text-xs text-zinc-500 dark:text-[#9CA3AF] mt-1 leading-relaxed">
                      HSR Layout, <br /> Bengaluru, KA, 560102
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-7 bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 shadow-sm">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Ayaan Malik"
                        value={formState.name} 
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="px-4 py-3 rounded-xl text-sm border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#161616] text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-orange/40 transition-all"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="ayaan@example.com"
                        value={formState.email} 
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="px-4 py-3 rounded-xl text-sm border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#161616] text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-orange/40 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">What are you interested in?</label>
                    <select 
                      value={formState.topic} 
                      onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                      className="px-4 py-3 rounded-xl text-sm border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#161616] text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-orange/40 transition-all"
                    >
                      <option value="general">General Program Enquiries</option>
                      <option value="hiring">Recruiting & Hiring Partners</option>
                      <option value="mentoring">Apply to become a Mentor</option>
                      <option value="press">Press & Media Collaborations</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">Message</label>
                    <textarea 
                      rows={5} 
                      required 
                      placeholder="Tell us about what you want to build..."
                      value={formState.message} 
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="px-4 py-3 rounded-xl text-sm border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#161616] text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-orange/40 transition-all resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white text-sm font-bold tracking-wide shadow-md shadow-brand-orange/20 hover:scale-[1.01] active:scale-95 transition-all"
                  >
                    Send Message
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <span className="material-symbols-outlined text-[64px] text-brand-orange mb-4">check_circle</span>
                  <h3 className="text-[20px] font-bold text-zinc-900 dark:text-white mb-2">Thank you, {formState.name}!</h3>
                  <p className="text-[14px] text-zinc-500 dark:text-[#9CA3AF] max-w-sm mx-auto leading-relaxed">
                    We have received your message. Our team will review and get back to you within 24 hours.
                  </p>
                </div>
              )}
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
