const ROWS = [
  { label: "Structured, mentor-led curriculum", skillsha: true, others: false, youtube: false },
  { label: "Live doubt-solving & code reviews", skillsha: true, others: true, youtube: false },
  { label: "Real-world capstone projects", skillsha: true, others: false, youtube: false },
  { label: "Placement assistance & hiring referrals", skillsha: true, others: false, youtube: false },
  { label: "Verifiable certificate", skillsha: true, others: true, youtube: false },
  { label: "Accountability & batch deadlines", skillsha: true, others: false, youtube: false },
  { label: "Cost", skillsha: "Affordable, EMI available", others: "Expensive", youtube: "Free" },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-[12px] font-semibold text-zinc-500 dark:text-zinc-400">{value}</span>;
  }
  return value ? (
    <svg className="w-5 h-5 text-emerald-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ) : (
    <svg className="w-5 h-5 text-zinc-300 dark:text-zinc-700 mx-auto" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function Comparison() {
  return (
    <section id="comparison" className="mb-28 animate-reveal max-w-[1200px] mx-auto px-4 md:px-0">
      <div className="mb-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-3 justify-center md:justify-start">
          <h2 className="text-[24px] md:text-4xl lg:text-[40px] font-semibold text-zinc-900 dark:text-white leading-[1.1] tracking-tight">
            Why Not Just Free YouTube Courses?
          </h2>
          <span className="bg-brand-orange text-white text-[11px] md:text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded shadow-sm w-max mx-auto md:mx-0">Comparison</span>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-[13px] md:text-[15px]">SkillSha vs. other institutes vs. self-taught free content.</p>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.02]">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-white/10">
              <th className="text-left font-semibold text-zinc-500 dark:text-zinc-400 text-[12px] uppercase tracking-wide px-5 py-4">Feature</th>
              <th className="px-5 py-4">
                <span className="bg-brand-orange text-white text-[11px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">SkillSha</span>
              </th>
              <th className="text-[12px] font-semibold text-zinc-500 dark:text-zinc-400 px-5 py-4">Other Institutes</th>
              <th className="text-[12px] font-semibold text-zinc-500 dark:text-zinc-400 px-5 py-4">Free YouTube</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={i} className="border-b border-zinc-100 dark:border-white/5 last:border-0">
                <td className="text-left px-5 py-4 text-[13px] font-medium text-zinc-800 dark:text-zinc-200">{row.label}</td>
                <td className="px-5 py-4 text-center"><Cell value={row.skillsha} /></td>
                <td className="px-5 py-4 text-center"><Cell value={row.others} /></td>
                <td className="px-5 py-4 text-center"><Cell value={row.youtube} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="md:hidden space-y-3">
        {ROWS.map((row, i) => (
          <div key={i} className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-4">
            <div className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200 mb-3">{row.label}</div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="text-[9px] font-bold uppercase tracking-wide text-brand-orange mb-1.5">SkillSha</div>
                <Cell value={row.skillsha} />
              </div>
              <div className="text-center">
                <div className="text-[9px] font-bold uppercase tracking-wide text-zinc-400 mb-1.5">Others</div>
                <Cell value={row.others} />
              </div>
              <div className="text-center">
                <div className="text-[9px] font-bold uppercase tracking-wide text-zinc-400 mb-1.5">YouTube</div>
                <Cell value={row.youtube} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
