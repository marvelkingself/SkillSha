const USPS = [
  {
    q: "Do you build real, live projects?",
    a: "Every track is project-based. You ship deployed, portfolio-ready builds each milestone, not toy assignments.",
    icon: (
      <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    q: "Is there real placement assistance?",
    a: "Resume reviews, mock interviews, and direct referrals into our 500+ hiring partner network for every graduating batch.",
    icon: (
      <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
  },
  {
    q: "Who are the trainers?",
    a: "Certified operators who've shipped production systems at OpenAI, Meta, Stripe, and other top companies, not just career instructors.",
    icon: (
      <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443" />
      </svg>
    ),
  },
  {
    q: "Are batch timings flexible?",
    a: "Weekday and weekend cohorts run across every city we serve, with recordings for every live session if you miss one.",
    icon: (
      <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-skillsha" className="mt-10 mb-28 animate-reveal max-w-[1200px] mx-auto px-4 md:px-0">
      <div className="mb-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-3 justify-center md:justify-start">
          <h2 className="text-[24px] md:text-4xl lg:text-[40px] font-semibold text-zinc-900 dark:text-white leading-[1.1] tracking-tight">
            Why Choose SkillSha?
          </h2>
          <span className="bg-brand-orange text-white text-[11px] md:text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded shadow-sm w-max mx-auto md:mx-0">USP</span>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-[13px] md:text-[15px]">What sets our training apart from everyone else.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {USPS.map((item, i) => (
          <div
            key={i}
            className="flex gap-4 p-5 md:p-6 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-brand-orange/40 transition-colors"
          >
            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand-orange/10 flex items-center justify-center">
              {item.icon}
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white mb-1.5">{item.q}</h3>
              <p className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
