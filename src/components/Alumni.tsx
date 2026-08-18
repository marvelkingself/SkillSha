"use client";
import React, { useEffect, useRef, useState } from 'react';

interface AlumniProfile {
  name?: string;
  role?: string;
  company?: string;
  domain?: string;
  batch?: string;
  photoUrl?: string;
  legacyUrl?: string;
  flipPhoto?: boolean;
}

const alumniProfiles: AlumniProfile[] = [
  {
    name: 'Rahul Sharma',
    role: 'Graduate Engineer Trainee',
    company: 'Infosys',
    domain: 'infosys.com',
    batch: 'Batch of 2025',
    photoUrl: '/files/Alumni/alumni-photo-1.webp',
    flipPhoto: true
  },
  {
    name: 'Priya Patel',
    role: 'Associate Software Engineer',
    company: 'Cognizant',
    domain: 'cognizant.com',
    batch: 'Batch of 2025',
    photoUrl: '/files/Alumni/alumni-photo-2.webp',
    flipPhoto: false
  },
  {
    name: 'Amit Verma',
    role: 'System Engineer Trainee',
    company: 'TCS',
    domain: 'tcs.com',
    batch: 'Batch of 2024',
    photoUrl: '/files/Alumni/alumni-photo-3.webp',
    flipPhoto: false
  },
  {
    name: 'Anjali Nair',
    role: 'Software Engineer Trainee',
    company: 'Capgemini',
    domain: 'capgemini.com',
    batch: 'Batch of 2024',
    photoUrl: '/files/Alumni/alumni-photo-4.webp',
    flipPhoto: true
  },
  {
    name: 'Rohan Das',
    role: 'Project Engineer (Trainee)',
    company: 'Wipro',
    domain: 'wipro.com',
    batch: 'Batch of 2025',
    photoUrl: '/files/Alumni/alumni-photo-5.webp',
    flipPhoto: false
  },
  {
    name: 'Sneha Gupta',
    role: 'Graduate Analyst',
    company: 'Hexaware',
    domain: 'hexaware.com',
    batch: 'Batch of 2024',
    photoUrl: '/files/Alumni/alumni-photo-6.webp',
    flipPhoto: false
  },
  {
    name: 'Vikram Singh',
    role: 'Associate Analyst',
    company: 'LTIMindtree',
    domain: 'ltimindtree.com',
    batch: 'Batch of 2024',
    photoUrl: '/files/Alumni/alumni-photo-7.webp',
    flipPhoto: false
  },
  {
    name: 'Neha Reddy',
    role: 'Business Analyst Trainee',
    company: 'Tech Mahindra',
    domain: 'techmahindra.com',
    batch: 'Batch of 2025',
    photoUrl: '/files/Alumni/alumni-photo-8.webp',
    flipPhoto: false
  },
  {
    name: 'Abhishek Mishra',
    role: 'System Engineer Trainee',
    company: 'TCS',
    domain: 'tcs.com',
    batch: 'Batch of 2025',
    photoUrl: '/files/Alumni/alumni-photo-9.webp',
    flipPhoto: false
  },
  {
    name: 'Divya Choudhary',
    role: 'Associate Software Engineer',
    company: 'Accenture',
    domain: 'accenture.com',
    batch: 'Batch of 2025',
    photoUrl: '/files/Alumni/alumni-photo-10.webp',
    flipPhoto: false
  },
  {
    name: 'Sandeep Yadav',
    role: 'Graduate Engineer Trainee',
    company: 'HCLTech',
    domain: 'hcltech.com',
    batch: 'Batch of 2024',
    photoUrl: '/files/Alumni/alumni-photo-11.webp',
    flipPhoto: false
  },
  {
    name: 'Kirti Sharma',
    role: 'Software Engineer Trainee',
    company: 'Capgemini',
    domain: 'capgemini.com',
    batch: 'Batch of 2024',
    photoUrl: '/files/Alumni/alumni-photo-12.webp',
    flipPhoto: false
  },
  {
    name: 'Manish Kumar',
    role: 'Project Engineer (Trainee)',
    company: 'Wipro',
    domain: 'wipro.com',
    batch: 'Batch of 2025',
    photoUrl: '/files/Alumni/alumni-photo-13.webp',
    flipPhoto: false
  },
  {
    name: 'Pooja Sen',
    role: 'Graduate Analyst',
    company: 'Genpact',
    domain: 'genpact.com',
    batch: 'Batch of 2024',
    photoUrl: '/files/Alumni/alumni-photo-14.webp',
    flipPhoto: false
  },
  {
    name: 'Alok Dubey',
    role: 'Associate Software Engineer',
    company: 'Mphasis',
    domain: 'mphasis.com',
    batch: 'Batch of 2024',
    photoUrl: '/files/Alumni/alumni-photo-15.webp',
    flipPhoto: false
  },
  {
    name: 'Shweta Mishra',
    role: 'Systems Analyst Trainee',
    company: 'Tech Mahindra',
    domain: 'techmahindra.com',
    batch: 'Batch of 2025',
    photoUrl: '/files/Alumni/alumni-photo-16.webp',
    flipPhoto: false
  },
  {
    name: 'Deepak Joshi',
    role: 'Associate Consultant',
    company: 'Infosys',
    domain: 'infosys.com',
    batch: 'Batch of 2025',
    photoUrl: '/files/Alumni/alumni-photo-17.webp',
    flipPhoto: false
  },
  {
    name: 'Ritu Verma',
    role: 'Software Engineer Trainee',
    company: 'Cognizant',
    domain: 'cognizant.com',
    batch: 'Batch of 2024',
    photoUrl: '/files/Alumni/alumni-photo-18.webp',
    flipPhoto: false
  },
  {
    name: 'Sunita Patel',
    role: 'Associate Software Engineer',
    company: 'Tata Elxsi',
    domain: 'tataelxsi.com',
    batch: 'Batch of 2024',
    photoUrl: '/files/Alumni/alumni-photo-19.webp',
    flipPhoto: true
  },
  {
    name: 'Rajesh Yadav',
    role: 'Software Engineer Trainee',
    company: 'Zensar Technologies',
    domain: 'zensar.com',
    batch: 'Batch of 2025',
    photoUrl: '/files/Alumni/alumni-photo-20.webp',
    flipPhoto: false
  },
  {
    name: 'Anil Kulkarni',
    role: 'Graduate Engineer Trainee',
    company: 'Birlasoft',
    domain: 'birlasoft.com',
    batch: 'Batch of 2024',
    photoUrl: '/files/Alumni/alumni-photo-21.webp',
    flipPhoto: false
  },
  {
    name: 'Kavita Joshi',
    role: 'Project Engineer (Trainee)',
    company: 'KPIT Technologies',
    domain: 'kpit.com',
    batch: 'Batch of 2025',
    photoUrl: '/files/Alumni/alumni-photo-22.webp',
    flipPhoto: true
  },
  {
    name: 'Suresh Pillai',
    role: 'Graduate Analyst',
    company: 'UST',
    domain: 'ust.com',
    batch: 'Batch of 2024',
    photoUrl: '/files/Alumni/alumni-photo-23.webp',
    flipPhoto: false
  },
  {
    name: 'Meera Iyer',
    role: 'Systems Analyst Trainee',
    company: 'Coforge',
    domain: 'coforge.com',
    batch: 'Batch of 2025',
    photoUrl: '/files/Alumni/alumni-photo-24.webp',
    flipPhoto: true
  },
  {
    name: 'Vikram Rao',
    role: 'Associate Analyst',
    company: 'Virtusa',
    domain: 'virtusa.com',
    batch: 'Batch of 2024',
    photoUrl: '/files/Alumni/alumni-photo-25.webp',
    flipPhoto: false
  },
  {
    name: 'Swati Deshmukh',
    role: 'Junior Software Engineer',
    company: 'Sonata Software',
    domain: 'sonata-software.com',
    batch: 'Batch of 2025',
    photoUrl: '/files/Alumni/alumni-photo-26.webp',
    flipPhoto: true
  },
  {
    name: 'Gaurav Pandey',
    role: 'Technical Associate Trainee',
    company: 'Happiest Minds',
    domain: 'happiestminds.com',
    batch: 'Batch of 2024',
    photoUrl: '/files/Alumni/alumni-photo-27.webp',
    flipPhoto: false
  },
  {
    name: 'Kiran Malhotra',
    role: 'Systems Engineer Trainee',
    company: 'ITC Infotech',
    domain: 'itcinfotech.com',
    batch: 'Batch of 2025',
    photoUrl: '/files/Alumni/alumni-photo-28.webp',
    flipPhoto: true
  }
];

const companies = [
  { name: 'Google', domain: 'google.com' },
  { name: 'Amazon', domain: 'amazon.com' },
  { name: 'Microsoft', domain: 'microsoft.com' },
  { name: 'Meta', domain: 'meta.com' },
  { name: 'Netflix', domain: 'netflix.com' },
  { name: 'Adobe', domain: 'adobe.com' },
  { name: 'Flipkart', domain: 'flipkart.com' },
  { name: 'Zomato', domain: 'zomato.com' },
  { name: 'Qualcomm', domain: 'qualcomm.com' },
  { name: 'Walmart', domain: 'walmart.com' },
  { name: 'IBM', domain: 'ibm.com' },
  { name: 'Infosys', domain: 'infosys.com' }
];

const companiesRow2 = [
  { name: 'Dream11', domain: 'dream11.com' },
  { name: 'Myntra', domain: 'myntra.com' },
  { name: 'Rippling', domain: 'rippling.com' },
  { name: 'YouTube', domain: 'youtube.com' },
  { name: 'Goldman Sachs', domain: 'goldmansachs.com' },
  { name: 'Sequoia', domain: 'sequoiacap.com' },
  { name: 'Swiggy', domain: 'swiggy.com' },
  { name: 'Razorpay', domain: 'razorpay.com' },
  { name: 'Notion', domain: 'notion.so' },
  { name: 'Figma', domain: 'figma.com' },
  { name: 'Paytm', domain: 'paytm.com' },
  { name: 'Meesho', domain: 'meesho.com' }
];

const AnimatedCounter = ({ target, suffix = '', prefix = '' }: { target: number, suffix?: string, prefix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const duration = 1600;
          const startTime = performance.now();
          
          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutCubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * target));
            
            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref} className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">{prefix}{count}{suffix}</div>;
};

export default function Alumni() {
  return (
    <section id="alumni" className="mb-28 animate-reveal delay-300 max-w-full">
      <div className="border border-zinc-200 dark:border-white/10 rounded-[24px] p-6 md:p-8 lg:p-12 bg-white dark:bg-white/[0.02] dark:backdrop-blur-xl shadow-sm relative overflow-hidden flex flex-col lg:flex-row gap-6 lg:gap-10 items-center">
        
        <div className="w-full lg:w-[35%] flex flex-col items-center lg:items-start text-center lg:text-left z-10 shrink-0">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-light text-zinc-900 dark:text-white leading-[1.1] tracking-tight mb-3 md:mb-4">
            Strong <span className="font-semibold text-brand-orange">Alumni Base</span> at SkillSha
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-[14px] md:text-base lg:text-lg leading-relaxed mb-0 max-w-md">
            SkillSha&apos;s alumni network includes entrepreneurs who&apos;ve raised startup capital, along with leaders now working directly with founders at fast-growing companies.
          </p>
        </div>
        
        <div className="w-full lg:w-[65%] relative z-10 mt-4 lg:mt-0">
          <div className="grid grid-rows-2 grid-flow-col gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-2 pt-2" style={{ gridAutoColumns: 'max-content' }}>
            {[...alumniProfiles, ...alumniProfiles, ...alumniProfiles].map((profile, index) => {
              if (profile.photoUrl) {
                return (
                  <div 
                    key={index}
                    className="w-[140px] sm:w-[160px] md:w-[220px] lg:w-[240px] aspect-[1.18] rounded-xl md:rounded-2xl snap-center hover:scale-[1.02] transition-transform border border-zinc-200 dark:border-white/5 bg-[#0f0a07] relative overflow-hidden flex shadow-md group select-none text-left"
                    style={{
                      background: 'radial-gradient(circle at 75% 50%, #2f1c13 0%, #0d0806 100%)'
                    }}
                  >
                    {/* Portrait Photo on the right */}
                    <div className="absolute right-0 bottom-0 top-0 w-[45%] h-full overflow-hidden pointer-events-none z-0">
                      <img loading="lazy" 
                        src={profile.photoUrl} 
                        className={`w-full h-full object-cover object-center translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ${
                          profile.flipPhoto ? 'scale-x-[-1.08] scale-y-[1.08]' : 'scale-[1.08]'
                        }`} 
                        alt={profile.name} 
                      />
                    </div>
                    {/* Subtle warm orange glow effect */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-brand-orange/5 blur-xl rounded-full z-0 pointer-events-none"></div>

                    {/* Content on the left */}
                    <div className="w-[60%] h-full p-2.5 sm:p-3.5 md:p-4.5 lg:p-5 flex flex-col justify-between z-10 relative bg-gradient-to-r from-[#0d0806] via-[#0d0806]/85 to-transparent">
                      <div className="flex flex-col gap-0.5">
                        <h4 className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-bold text-zinc-100 tracking-tight leading-tight">
                          {profile.name}
                        </h4>
                        <div className="w-full h-[1px] bg-zinc-800/80 my-1"></div>
                        <p className="text-[7.5px] sm:text-[9px] md:text-[11px] lg:text-[13px] italic font-light text-zinc-300 leading-tight">
                          {profile.role}
                        </p>
                        <p className="text-[6.5px] sm:text-[7.5px] md:text-[9px] lg:text-[10px] text-zinc-500 leading-none mb-1">
                          at
                        </p>
                        <div className="flex items-center gap-1 sm:gap-1.5 bg-white/10 dark:bg-white/[0.04] border border-zinc-700/30 dark:border-white/10 rounded-md px-1.5 py-0.5 w-fit max-w-full">
                          {profile.domain && (
                            <img loading="lazy" 
                              src={`https://www.google.com/s2/favicons?domain=${profile.domain}&sz=128`} 
                              alt={profile.company} 
                              className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 object-contain rounded shrink-0 bg-white p-[1px]" 
                            />
                          )}
                          <span className="text-[8.5px] sm:text-[9.5px] md:text-[11px] lg:text-[12.5px] font-extrabold text-zinc-100 tracking-wide truncate leading-tight capitalize">
                            {profile.company}
                          </span>
                        </div>
                      </div>

                      <div className="text-[6.5px] sm:text-[7.5px] md:text-[9.5px] lg:text-[11px] font-semibold text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-1.5 py-0.5 rounded-full w-fit">
                        {profile.batch}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <img loading="lazy" 
                  key={index}
                  src={profile.legacyUrl} 
                  className="w-[140px] sm:w-[160px] md:w-[220px] lg:w-[240px] h-auto object-contain rounded-xl md:rounded-2xl snap-center hover:scale-[1.02] transition-transform border border-zinc-200 dark:border-white/5" 
                  alt="Alumni" 
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AlumniCompanies() {
  return (
    <section id="alumni-companies" className="mb-28 animate-reveal delay-300 overflow-hidden px-4 md:px-0">
      <div className="border border-zinc-200 dark:border-white/10 md:border-none rounded-[24px] md:rounded-none py-10 md:py-0 bg-white dark:bg-white/[0.02] dark:backdrop-blur-xl md:bg-transparent shadow-sm md:shadow-none transition-colors duration-300 overflow-hidden relative">
        
        <div className="text-center mb-10 px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange mb-3">Alumni Network</p>
          <h2 className="text-2xl md:text-[36px] font-semibold text-zinc-900 dark:text-white leading-tight">
            SkillSha Alumni Work at <span className="text-gradient">the Best Companies</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2">SkillSha graduates placed across 500+ companies worldwide.</p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-28 z-10 bg-gradient-to-r from-zinc-50 dark:from-[#0a0a0a] max-md:from-white max-md:dark:from-[#0f0f0f] to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-28 z-10 bg-gradient-to-l from-zinc-50 dark:from-[#0a0a0a] max-md:from-white max-md:dark:from-[#0f0f0f] to-transparent"></div>

          <div className="overflow-hidden mb-4">
            <div className="marquee-left">
              {[...companies, ...companies].map((c, i) => (
                <div key={i} className="logo-pill">
                  <img loading="lazy" src={`https://www.google.com/s2/favicons?domain=${c.domain}&sz=128`} alt={c.name} />
                  <span>{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="marquee-right">
              {[...companiesRow2, ...companiesRow2].map((c, i) => (
                <div key={i} className="logo-pill">
                  <img loading="lazy" src={`https://www.google.com/s2/favicons?domain=${c.domain}&sz=128`} alt={c.name} />
                  <span>{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="alumni-stats" className="mt-12 flex flex-nowrap justify-center gap-2 md:gap-4 px-2 md:px-4">
          <div className="stat-hang origin-top rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.03] px-3 md:px-8 py-5 text-center min-w-[100px] md:min-w-[130px]">
            <AnimatedCounter target={500} suffix="+" />
            <div className="text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium whitespace-nowrap">Companies</div>
          </div>
          <div className="stat-hang origin-top [animation-delay:0.4s] rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.03] px-3 md:px-8 py-5 text-center min-w-[100px] md:min-w-[130px]">
            <AnimatedCounter prefix="₹" target={12} suffix="L+" />
            <div className="text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium whitespace-nowrap">Avg. Package</div>
          </div>
          <div className="stat-hang origin-top [animation-delay:0.8s] rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.03] px-3 md:px-8 py-5 text-center min-w-[100px] md:min-w-[130px]">
            <AnimatedCounter target={93} suffix="%" />
            <div className="text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium whitespace-nowrap">Placement Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
