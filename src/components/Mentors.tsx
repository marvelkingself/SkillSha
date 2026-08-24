"use client";

import Image from "next/image";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

export default function Mentors() {
  return (
    <section id="mentors" className="mt-10 mb-14 animate-reveal delay-200 max-w-full active">
      <div className="border border-zinc-200 dark:border-white/10 rounded-[24px] p-4 md:p-8 bg-white dark:bg-white/[0.02] dark:backdrop-blur-xl shadow-sm relative overflow-hidden">
        <h2 className="text-[20px] md:text-[24px] font-medium mb-4 md:mb-6 tracking-tight text-zinc-900 dark:text-white px-1 md:px-0">Industry Mentors & Operators</h2>

        <div className="flex flex-col xl:flex-row gap-6 xl:gap-4 w-full">
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-3 md:gap-4 pt-4 pb-2 xl:pb-4 px-1 xl:px-0 xl:flex-1 items-center">
            <div className="hidden md:block flex-grow flex-shrink-0 min-w-0"></div>
            
            {/* Mentor 1 */}
            <CardContainer className="snap-center flex-shrink-0">
              <CardBody className="w-[150px] md:w-[160px] lg:w-[160px] bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[16px] md:rounded-[24px] p-4 md:p-5 flex flex-col items-center text-center shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.08)] hover:border-brand-orange/40 transition-all duration-500 group relative overflow-hidden z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-orange/0 to-brand-orange/0 group-hover:to-brand-orange/[0.04] transition-colors duration-500 -z-10 pointer-events-none"></div>
                <CardItem translateZ={30} className="w-[54px] h-[54px] md:w-[60px] md:h-[60px] rounded-full overflow-hidden mb-2 md:mb-4 p-[2px] bg-gradient-to-b from-[#7A4B3A] to-[#2E1A14]">
                  <Image src="/files/Mentors/mentor-photo-1.webp" alt="Aarav Sharma" width={60} height={60} className="w-full h-full object-cover rounded-full bg-zinc-800 group-hover:scale-110 transition-transform duration-500" />
                </CardItem>
                <CardItem translateZ={20} as="h4" className="text-[14px] md:text-[15px] font-semibold text-zinc-900 dark:text-white tracking-tight mb-0 md:mb-1 leading-tight group-hover:text-brand-orange transition-colors duration-300">Aarav Sharma</CardItem>
                <CardItem translateZ={15} as="p" className="text-[10px] md:text-[12px] text-zinc-500 dark:text-[#9CA3AF] mb-3 md:mb-5 leading-snug">AI Systems Engineer</CardItem>
                
                <CardItem translateZ={10} className="mt-auto w-full">
                  <div className="w-full h-[1px] bg-zinc-200 dark:bg-white/10 mb-1.5 md:mb-3"></div>
                  <p className="text-[8px] md:text-[10px] text-zinc-400 dark:text-[#6b7280] uppercase tracking-[0.15em] mb-1.5 md:mb-2 font-semibold">Previously at</p>
                  <div className="flex items-center justify-center gap-1.5 md:gap-2 text-zinc-900 dark:text-white h-[14px] md:h-[20px]">
                    <img loading="lazy" src="https://www.google.com/s2/favicons?domain=zoho.com&sz=128" alt="Zoho" className="w-auto h-full object-contain max-w-[60px] md:max-w-[80px]" />
                    <span className="text-[12px] md:text-[13px] font-bold tracking-tight">Zoho</span>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>

            {/* Mentor 2 */}
            <CardContainer className="snap-center flex-shrink-0">
              <CardBody className="w-[150px] md:w-[160px] lg:w-[160px] bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[16px] md:rounded-[24px] p-4 md:p-5 flex flex-col items-center text-center shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.08)] hover:border-brand-orange/40 transition-all duration-500 group relative overflow-hidden z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-orange/0 to-brand-orange/0 group-hover:to-brand-orange/[0.04] transition-colors duration-500 -z-10 pointer-events-none"></div>
                <CardItem translateZ={30} className="w-[54px] h-[54px] md:w-[60px] md:h-[60px] rounded-full overflow-hidden mb-2 md:mb-4 p-[2px] bg-gradient-to-b from-[#7A4B3A] to-[#2E1A14]">
                  <Image src="/files/Mentors/mentor-photo-2.webp" alt="Rohan Mehta" width={60} height={60} className="w-full h-full object-cover rounded-full bg-zinc-800 group-hover:scale-110 transition-transform duration-500" />
                </CardItem>
                <CardItem translateZ={20} as="h4" className="text-[14px] md:text-[15px] font-semibold text-zinc-900 dark:text-white tracking-tight mb-0 md:mb-1 leading-tight group-hover:text-brand-orange transition-colors duration-300">Rohan Mehta</CardItem>
                <CardItem translateZ={15} as="p" className="text-[10px] md:text-[12px] text-zinc-500 dark:text-[#9CA3AF] mb-3 md:mb-5 leading-snug">Growth Strategist</CardItem>
                
                <CardItem translateZ={10} className="mt-auto w-full">
                  <div className="w-full h-[1px] bg-zinc-200 dark:bg-white/10 mb-1.5 md:mb-3"></div>
                  <p className="text-[8px] md:text-[10px] text-zinc-400 dark:text-[#6b7280] uppercase tracking-[0.15em] mb-1.5 md:mb-2 font-semibold">Previously at</p>
                  <div className="flex items-center justify-center gap-1.5 md:gap-2 text-zinc-900 dark:text-white h-[14px] md:h-[20px]">
                    <img loading="lazy" src="https://www.google.com/s2/favicons?domain=zomato.com&sz=128" alt="Zomato" className="w-auto h-full object-contain max-w-[60px] md:max-w-[80px]" />
                    <span className="text-[12px] md:text-[13px] font-bold tracking-tight">Zomato</span>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>

            {/* Mentor 3 */}
            <CardContainer className="snap-center flex-shrink-0">
              <CardBody className="w-[150px] md:w-[160px] lg:w-[160px] bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[16px] md:rounded-[24px] p-4 md:p-5 flex flex-col items-center text-center shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.08)] hover:border-brand-orange/40 transition-all duration-500 group relative overflow-hidden z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-orange/0 to-brand-orange/0 group-hover:to-brand-orange/[0.04] transition-colors duration-500 -z-10 pointer-events-none"></div>
                <CardItem translateZ={30} className="w-[54px] h-[54px] md:w-[60px] md:h-[60px] rounded-full overflow-hidden mb-2 md:mb-4 p-[2px] bg-gradient-to-b from-[#7A4B3A] to-[#2E1A14]">
                  <Image src="/files/Mentors/mentor-photo-3.webp" alt="Aditi Rao" width={60} height={60} className="w-full h-full object-cover rounded-full bg-zinc-800 group-hover:scale-110 transition-transform duration-500" />
                </CardItem>
                <CardItem translateZ={20} as="h4" className="text-[14px] md:text-[15px] font-semibold text-zinc-900 dark:text-white tracking-tight mb-0 md:mb-1 leading-tight group-hover:text-brand-orange transition-colors duration-300">Aditi Rao</CardItem>
                <CardItem translateZ={15} as="p" className="text-[10px] md:text-[12px] text-zinc-500 dark:text-[#9CA3AF] mb-3 md:mb-5 leading-snug">Full-Stack Architect</CardItem>
                
                <CardItem translateZ={10} className="mt-auto w-full">
                  <div className="w-full h-[1px] bg-zinc-200 dark:bg-white/10 mb-1.5 md:mb-3"></div>
                  <p className="text-[8px] md:text-[10px] text-zinc-400 dark:text-[#6b7280] uppercase tracking-[0.15em] mb-1.5 md:mb-2 font-semibold">Previously at</p>
                  <div className="flex items-center justify-center gap-1.5 md:gap-2 text-zinc-900 dark:text-white h-[14px] md:h-[20px]">
                    <img loading="lazy" src="https://www.google.com/s2/favicons?domain=razorpay.com&sz=128" alt="Razorpay" className="w-auto h-full object-contain max-w-[60px] md:max-w-[80px]" />
                    <span className="text-[12px] md:text-[13px] font-bold tracking-tight">Razorpay</span>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>

            {/* Mentor 4 */}
            <CardContainer className="snap-center flex-shrink-0">
              <CardBody className="w-[150px] md:w-[160px] lg:w-[160px] bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[16px] md:rounded-[24px] p-4 md:p-5 flex flex-col items-center text-center shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.08)] hover:border-brand-orange/40 transition-all duration-500 group relative overflow-hidden z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-orange/0 to-brand-orange/0 group-hover:to-brand-orange/[0.04] transition-colors duration-500 -z-10 pointer-events-none"></div>
                <CardItem translateZ={30} className="w-[54px] h-[54px] md:w-[60px] md:h-[60px] rounded-full overflow-hidden mb-2 md:mb-4 p-[2px] bg-gradient-to-b from-[#7A4B3A] to-[#2E1A14]">
                  <Image src="/files/Mentors/mentor-photo-4.webp" alt="Ishan Verma" width={60} height={60} className="w-full h-full object-cover rounded-full bg-zinc-800 group-hover:scale-110 transition-transform duration-500" />
                </CardItem>
                <CardItem translateZ={20} as="h4" className="text-[14px] md:text-[15px] font-semibold text-zinc-900 dark:text-white tracking-tight mb-0 md:mb-1 leading-tight group-hover:text-brand-orange transition-colors duration-300">Ishan Verma</CardItem>
                <CardItem translateZ={15} as="p" className="text-[10px] md:text-[12px] text-zinc-500 dark:text-[#9CA3AF] mb-3 md:mb-5 leading-snug">Product Designer</CardItem>
                
                <CardItem translateZ={10} className="mt-auto w-full">
                  <div className="w-full h-[1px] bg-zinc-200 dark:bg-white/10 mb-1.5 md:mb-3"></div>
                  <p className="text-[8px] md:text-[10px] text-zinc-400 dark:text-[#6b7280] uppercase tracking-[0.15em] mb-1.5 md:mb-2 font-semibold">Previously at</p>
                  <div className="flex items-center justify-center gap-1.5 md:gap-2 text-zinc-900 dark:text-white h-[14px] md:h-[20px]">
                    <img loading="lazy" src="https://www.google.com/s2/favicons?domain=flipkart.com&sz=128" alt="Flipkart" className="w-auto h-full object-contain max-w-[60px] md:max-w-[80px]" />
                    <span className="text-[12px] md:text-[13px] font-bold tracking-tight">Flipkart</span>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>

            {/* Mentor 5 */}
            <CardContainer className="snap-center flex-shrink-0">
              <CardBody className="w-[150px] md:w-[160px] lg:w-[160px] bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[16px] md:rounded-[24px] p-4 md:p-5 flex flex-col items-center text-center shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.08)] hover:border-brand-orange/40 transition-all duration-500 group relative overflow-hidden z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-orange/0 to-brand-orange/0 group-hover:to-brand-orange/[0.04] transition-colors duration-500 -z-10 pointer-events-none"></div>
                <CardItem translateZ={30} className="w-[54px] h-[54px] md:w-[60px] md:h-[60px] rounded-full overflow-hidden mb-2 md:mb-4 p-[2px] bg-gradient-to-b from-[#7A4B3A] to-[#2E1A14]">
                  <Image src="/files/Mentors/mentor-photo-5.webp" alt="Devendra Singh" width={60} height={60} className="w-full h-full object-cover rounded-full bg-zinc-800 group-hover:scale-110 transition-transform duration-500" />
                </CardItem>
                <CardItem translateZ={20} as="h4" className="text-[14px] md:text-[15px] font-semibold text-zinc-900 dark:text-white tracking-tight mb-0 md:mb-1 leading-tight group-hover:text-brand-orange transition-colors duration-300">Devendra Singh</CardItem>
                <CardItem translateZ={15} as="p" className="text-[10px] md:text-[12px] text-zinc-500 dark:text-[#9CA3AF] mb-3 md:mb-5 leading-snug">Cybersecurity Lead</CardItem>
                
                <CardItem translateZ={10} className="mt-auto w-full">
                  <div className="w-full h-[1px] bg-zinc-200 dark:bg-white/10 mb-1.5 md:mb-3"></div>
                  <p className="text-[8px] md:text-[10px] text-zinc-400 dark:text-[#6b7280] uppercase tracking-[0.15em] mb-1.5 md:mb-2 font-semibold">Previously at</p>
                  <div className="flex items-center justify-center gap-1.5 md:gap-2 text-zinc-900 dark:text-white h-[14px] md:h-[20px]">
                    <img loading="lazy" src="https://www.google.com/s2/favicons?domain=freshworks.com&sz=128" alt="Freshworks" className="w-auto h-full object-contain max-w-[60px] md:max-w-[80px]" />
                    <span className="text-[12px] md:text-[13px] font-bold tracking-tight">Freshworks</span>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>

            <div className="hidden md:block flex-grow flex-shrink-0 min-w-0"></div>
          </div>

          <div className="w-full xl:w-[320px] flex-shrink-0 relative rounded-[20px] p-5 md:p-6 overflow-hidden bg-zinc-50 dark:bg-[#161616] border border-zinc-200 dark:border-white/5 flex flex-col items-center xl:items-start justify-start min-h-[200px] xl:min-h-[100%] shadow-sm text-center xl:text-left">
            <div className="z-20 relative w-full mt-1 xl:mt-2">
              <p className="text-[13px] md:text-[14px] text-zinc-500 dark:text-[#9CA3AF] leading-tight mb-1">...and a global network of</p>
              <p className="text-[16px] md:text-[18px] font-semibold text-zinc-900 dark:text-white">ambitious builders</p>
            </div>

            <div className="absolute inset-0 mt-20 xl:mt-24 opacity-30 dark:opacity-40 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                <pattern id="dot-pattern-card" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="currentColor" className="text-zinc-900 dark:text-white" />
                </pattern>
                <mask id="world-map-mask-card">
                  <path d="M40,50 Q70,20 120,40 T200,60 T250,40 T320,80 T380,60 Q390,100 350,140 T260,180 T160,170 T80,190 T20,120 Z" fill="white" opacity="0.9" />
                  <path d="M60,30 Q90,10 140,20 T210,40 T280,20 T360,60" fill="white" opacity="0.4" stroke="white" strokeWidth="20" strokeLinecap="round" />
                  <path d="M70,120 Q120,200 180,160 T300,190 T350,130" fill="white" opacity="0.5" stroke="white" strokeWidth="30" strokeLinecap="round" />
                </mask>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#dot-pattern-card)" mask="url(#world-map-mask-card)" />
              </svg>
            </div>

            <div className="absolute inset-0 mt-20 xl:mt-24 z-20 pointer-events-none">
              <Image src="/files/Mentors/mentor-photo-1.webp" alt="" width={20} height={20} className="absolute top-[25%] left-[10%] w-[18px] h-[18px] md:w-[20px] md:h-[20px] rounded-full border border-zinc-200 dark:border-white/20 object-cover shadow-md" />
              <Image src="/files/Mentors/mentor-photo-2.webp" alt="" width={16} height={16} className="absolute top-[35%] left-[25%] w-[14px] h-[14px] md:w-[16px] md:h-[16px] rounded-full border border-zinc-200 dark:border-white/20 object-cover shadow-md opacity-80" />
              <Image src="/files/Mentors/mentor-photo-3.webp" alt="" width={18} height={18} className="absolute top-[65%] left-[30%] w-[16px] h-[16px] md:w-[18px] md:h-[18px] rounded-full border border-zinc-200 dark:border-white/20 object-cover shadow-md" />
              <Image src="/files/Mentors/mentor-photo-4.webp" alt="" width={26} height={26} className="absolute top-[50%] left-[55%] w-[22px] h-[22px] md:w-[26px] md:h-[26px] rounded-full border border-zinc-200 dark:border-white/20 object-cover shadow-lg" />
              <Image src="/files/Mentors/mentor-photo-5.webp" alt="" width={16} height={16} className="absolute top-[75%] left-[65%] w-[14px] h-[14px] md:w-[16px] md:h-[16px] rounded-full border border-zinc-200 dark:border-white/20 object-cover shadow-sm opacity-90" />
              <Image src="/files/Alumni/alumni-photo-1.webp" alt="" width={18} height={18} className="absolute top-[60%] left-[80%] w-[16px] h-[16px] md:w-[18px] md:h-[18px] rounded-full border border-zinc-200 dark:border-white/20 object-cover shadow-md opacity-80" />
              <Image src="/files/Alumni/alumni-photo-2.webp" alt="" width={20} height={20} className="absolute top-[80%] left-[90%] w-[18px] h-[18px] md:w-[20px] md:h-[20px] rounded-full border border-zinc-200 dark:border-white/20 object-cover shadow-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
