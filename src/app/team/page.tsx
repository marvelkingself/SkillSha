import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FOUNDERS_DATA, FOUNDERS_MESSAGE, TEAMS_DATA } from "@/data/team";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet the Team | SkillSha - Empowering AI-Native Talents",
  description: "Get to know the founders, expert instructors, career mentors, developers, and operators behind SkillSha. Discover our mission to bridge technical education with AI-native workflows.",
  keywords: "SkillSha team, SkillSha founders, digital marketing trainers, AI engineering mentors, Noida tech instructors, builder pedagogy, NCR tech mentors",
  alternates: {
    canonical: "https://skillsha.com/team",
    languages: {
      "en": "https://skillsha.com/team",
      "x-default": "https://skillsha.com/team",
    }
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: "website",
    siteName: "SkillSha",
    title: "Meet the Team | SkillSha - Empowering AI-Native Talents",
    description: "Get to know the founders, expert instructors, career mentors, developers, and operators behind SkillSha.",
    url: "https://skillsha.com/team",
    images: [
      {
        url: "https://www.skillsha.com/files/logo-icon.png",
        width: 512,
        height: 512,
        alt: "SkillSha Team",
      }
    ],
    locale: "en_IN",
    alternateLocale: ["en_US"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet the Team | SkillSha",
    description: "Get to know the experts, trainers, and career mentors behind SkillSha's AI-native education.",
    images: ["https://www.skillsha.com/files/logo-icon.png"],
  }
};

export default function TeamPage() {
  return (
    <>
      {/* Dynamic JSON-LD structured data for local business and entity details */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "SkillSha",
            "url": "https://skillsha.com",
            "logo": "https://www.skillsha.com/files/logo-icon.png",
            "description": "SkillSha is an AI-native academy offering project-based, mentor-led training programs in digital marketing, AI engineering, UI/UX design, and technology disciplines.",
            "sameAs": [
              "https://skillsha.com/about",
              "https://skillsha.com/team"
            ],
            "employee": FOUNDERS_DATA.map((f) => ({
              "@type": "Person",
              "name": f.name,
              "jobTitle": f.role,
              "description": f.bio
            }))
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://skillsha.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Team",
                "item": "https://skillsha.com/team"
              }
            ]
          })
        }}
      />

      <Header />

      <main className="pt-28 md:pt-36 bg-zinc-50 dark:bg-black min-h-screen text-zinc-900 dark:text-white">
        
        {/* Hero Section */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-20 text-center animate-reveal">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
            </span>
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">SkillSha Operations</span>
          </div>
          <h1 className="text-[36px] md:text-[64px] font-bold tracking-tight mb-6 leading-[1.1]">
            Meet the <span className="text-brand-orange">Builders</span> Behind SkillSha.
          </h1>
          <p className="text-[15px] md:text-[18px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed max-w-[700px] mx-auto">
            We are a team of creators, active industry operators, and placement experts dedicated to helping the next generation master AI-integrated digital workflows.
          </p>
        </section>

        {/* Founders Section */}
        <section id="founders" className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-16 border-t border-zinc-200/80 dark:border-white/5">
          <div className="text-center md:text-left mb-12">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Leadership</span>
            <h2 className="text-[28px] md:text-[40px] font-bold mt-1 text-zinc-900 dark:text-white tracking-tight">Our Founders</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {FOUNDERS_DATA.map((founder, i) => (
              <div 
                key={i} 
                className="bg-white dark:bg-[#0c0c0c]/80 border border-zinc-200/80 dark:border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 hover:border-brand-orange/30 transition-all duration-300 shadow-sm"
              >
                <div className="w-full md:w-44 h-48 md:h-52 relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/5 flex-shrink-0 flex items-center justify-center">
                  {founder.image ? (
                    <img 
                      src={founder.image} 
                      alt={founder.name}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                    />
                  ) : (
                    <svg className="w-16 h-16 text-zinc-400 dark:text-zinc-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  )}
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider">{founder.role}</span>
                    <h3 className="text-xl md:text-2xl font-bold mt-1 mb-2 text-zinc-900 dark:text-white">{founder.name}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans mb-4">{founder.bio}</p>
                  </div>
                  
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {founder.expertise?.map((exp, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      {founder.socials?.linkedin && (
                        <a href={founder.socials.linkedin} className="text-zinc-400 hover:text-white transition-colors">
                          <span className="text-xs font-bold font-sans">LinkedIn</span>
                        </a>
                      )}
                      {founder.socials?.twitter && (
                        <a href={founder.socials.twitter} className="text-zinc-400 hover:text-white transition-colors">
                          <span className="text-xs font-bold font-sans">Twitter</span>
                        </a>
                      )}
                      {founder.socials?.github && (
                        <a href={founder.socials.github} className="text-zinc-400 hover:text-white transition-colors">
                          <span className="text-xs font-bold font-sans">GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Founder Message Section */}
        <section className="bg-zinc-100/50 dark:bg-zinc-900/30 border-y border-zinc-200/60 dark:border-white/5 py-16 md:py-24">
          <div className="max-w-[900px] mx-auto px-4 md:px-8 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-4 block">A Message from our founders</span>
            <blockquote className="text-xl md:text-2xl font-semibold italic text-zinc-800 dark:text-zinc-100 leading-relaxed mb-8 max-w-4xl mx-auto font-sans">
              &ldquo;{FOUNDERS_MESSAGE.quote}&rdquo;
            </blockquote>
            <div className="h-px w-16 bg-brand-orange/40 mx-auto mb-8"></div>
            <div className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto space-y-4 font-sans whitespace-pre-line text-left md:text-center">
              {FOUNDERS_MESSAGE.body}
            </div>
          </div>
        </section>

        {/* Teams Directory Section */}
        <section id="teams" className="max-w-[1200px] mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Teams Directory</span>
            <h2 className="text-[28px] md:text-[36px] font-bold mt-1 tracking-tight">Our Specialized Departments</h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-md mx-auto">
              Connecting industry knowledge, engineering execution, and strategic compliance.
            </p>
          </div>

          <div className="space-y-16">
            {TEAMS_DATA.map((group) => (
              <div key={group.id} className="border-t border-zinc-200/80 dark:border-white/5 pt-10">
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-8">
                  <div className="w-full md:w-64 flex-shrink-0">
                    <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                      {group.title}
                    </h3>
                  </div>

                  <div className="flex-grow">
                    {/* Grid of Team Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {group.members.map((member, i) => (
                        <div 
                          key={i} 
                          className="bg-white dark:bg-[#0c0c0c]/80 border border-zinc-200/80 dark:border-white/5 rounded-2xl p-5 hover:border-brand-orange/30 hover:scale-[1.01] transition-all duration-200 flex flex-col justify-between"
                        >
                          <div>
                            <h4 className="font-bold text-base text-zinc-900 dark:text-white">{member.name}</h4>
                            <span className="text-[11px] font-semibold text-brand-orange uppercase block tracking-wider mt-0.5 mb-3">{member.role}</span>
                            {member.bio && (
                              <p className="text-[12px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans mb-4">{member.bio}</p>
                            )}
                          </div>

                          <div>
                            {member.expertise && member.expertise.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-3">
                                {member.expertise.map((exp, idx) => (
                                  <span 
                                    key={idx} 
                                    className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400"
                                  >
                                    {exp}
                                  </span>
                                ))}
                              </div>
                            )}

                            {member.socials && (
                              <div className="flex gap-2.5">
                                {member.socials.linkedin && (
                                  <a href={member.socials.linkedin} className="text-[10px] text-zinc-400 hover:text-white font-bold">LinkedIn</a>
                                )}
                                {member.socials.github && (
                                  <a href={member.socials.github} className="text-[10px] text-zinc-400 hover:text-white font-bold">GitHub</a>
                                )}
                                {member.socials.twitter && (
                                  <a href={member.socials.twitter} className="text-[10px] text-zinc-400 hover:text-white font-bold">Twitter</a>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Join Skillsha CTA banner */}
        <section className="py-16 md:py-24 border-t border-zinc-200 dark:border-white/5 max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="w-full py-12 md:py-16 px-6 md:px-12 rounded-3xl border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-[#0c0c0c] text-center shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/10 to-brand-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10">
              <h2 className="text-[28px] md:text-[40px] font-bold tracking-tight mb-4">Join the SkillSha Movement</h2>
              <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto mb-8 font-sans">
                We are always seeking active operators, software engineers, performance marketers, and student coaches who believe technical and business education should be built, not memorized.
              </p>
              <div className="flex justify-center gap-4">
                <a 
                  href="/careers" 
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white text-sm font-semibold hover:scale-[1.02] active:scale-95 transition-all duration-200"
                >
                  View Open Roles
                </a>
                <a 
                  href="/contact" 
                  className="px-6 py-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
