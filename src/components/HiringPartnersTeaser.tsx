import Link from "next/link";

const STATS = [
  { value: "500+", label: "Hiring Partners" },
  { value: "14 Days", label: "Avg. Time to Hire" },
  { value: "93%", label: "Placement Success" },
  { value: "₹12L+", label: "Avg. Starting Package" },
];

export default function HiringPartnersTeaser() {
  return (
    <section id="hiring-partners" className="mb-28 animate-reveal max-w-[1200px] mx-auto px-4 md:px-0">
      <div className="rounded-[24px] border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6 md:p-10 lg:p-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-[520px]">
            <span className="bg-brand-orange text-white text-[11px] md:text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded shadow-sm w-max inline-block mb-4">Hiring Partners</span>
            <h2 className="text-[24px] md:text-4xl font-semibold text-zinc-900 dark:text-white leading-[1.1] tracking-tight mb-3">
              SkillSha — Hired by Companies That Build
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-[13px] md:text-[15px] leading-relaxed mb-6">
              SkillSha graduates get referred directly into a trusted hiring partner network — zero placement fees, vetted employers, AI-first hiring workflows.
            </p>
            <Link
              href="/hiring-partners"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-orange to-brand-red text-white text-[13px] font-bold hover:scale-[1.02] active:scale-95 transition-all"
            >
              Explore Hiring Partners
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-5 flex-shrink-0">
            {STATS.map((s, i) => (
              <div key={i} className="text-center px-5 py-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.02] min-w-[130px]">
                <div className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">{s.value}</div>
                <div className="text-[10px] md:text-[11px] text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
