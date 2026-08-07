import Link from "next/link";
import { CITIES_LIST } from "@/data/cities";

export default function CitiesWeServe() {
  return (
    <section id="cities" className="mb-28 animate-reveal max-w-[1200px] mx-auto px-4 md:px-0">
      <div className="mb-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-3 justify-center md:justify-start">
          <h2 className="text-[24px] md:text-4xl lg:text-[40px] font-semibold text-zinc-900 dark:text-white leading-[1.1] tracking-tight">
            SkillSha IT Training Available Across India
          </h2>
          <span className="bg-brand-orange text-white text-[11px] md:text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded shadow-sm w-max mx-auto md:mx-0">Locations</span>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-[13px] md:text-[15px]">Live, mentor-led SkillSha batches run in 12+ Indian cities. Choose your city for local course timings.</p>
      </div>

      <div className="flex flex-wrap justify-center md:justify-start gap-2.5">
        {CITIES_LIST.map((city) => (
          <Link
            key={city.slug}
            href={`/ai-engineering/${city.slug}`}
            className="group flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-all duration-300"
          >
            <svg className="w-3.5 h-3.5 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-brand-orange transition-colors">{city.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
