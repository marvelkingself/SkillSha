import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Roadmaps | SkillSha",
  description: "Step-by-step roadmaps for the courses and careers we train for — so you know exactly what to learn, in what order, and why.",
};

export default function RoadmapsPage() {
  const careerRoadmaps = [
    {
      tag: "Data & AI",
      title: "How to Become a Data Scientist",
      desc: "A structured path from Python and statistics basics to machine learning, model deployment, and real-world data projects."
    },
    {
      tag: "Marketing",
      title: "How to Become a Digital Marketer",
      desc: "Move from marketing fundamentals to running real campaigns — covering SEO, paid ads, analytics, and content strategy."
    }
  ];

  const courseRoadmaps = [
    {
      tag: "Data Science",
      title: "Data Science Course Roadmap",
      desc: "From Python and SQL foundations to machine learning, data visualization, and capstone projects — structured week by week."
    },
    {
      tag: "Digital Marketing",
      title: "Digital Marketing Course Roadmap",
      desc: "A step-by-step path covering SEO, social media, paid campaigns, and analytics — ending with live campaign experience."
    }
  ];

  return (
    <>
      <Header />
      <main className="pt-28 md:pt-36 min-h-screen max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Page Hero */}
        <section className="relative py-12 md:py-20 text-center max-w-[900px] mx-auto animate-reveal">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
            </span>
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">Career Roadmaps</span>
          </div>
          <h1 className="text-[36px] md:text-[56px] font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]">
            Your Path to a <span className="text-brand-orange">Tech Career</span>.
          </h1>
          <p className="text-[16px] md:text-[19px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed font-medium max-w-[700px] mx-auto">
            Step-by-step roadmaps for the courses and careers we train for — so you know exactly what to learn, in what order, and why.
          </p>
        </section>

        {/* Section 1: Career Roadmaps */}
        <section className="py-12 border-t border-zinc-200 dark:border-white/5">
          <h2 className="text-[24px] md:text-[32px] font-bold text-zinc-900 dark:text-white mb-8 tracking-tight">
            Career Roadmaps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerRoadmaps.map((roadmap, i) => (
              <div key={i} className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-6 md:p-8 hover:border-brand-orange/45 transition-all flex flex-col justify-between group">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-full">{roadmap.tag}</span>
                  <h3 className="text-[18px] font-bold text-zinc-900 dark:text-white mt-4 mb-3 group-hover:text-brand-orange transition-colors leading-tight">
                    {roadmap.title}
                  </h3>
                  <p className="text-[13px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed">
                    {roadmap.desc}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-white/5">
                  <a 
                    href="/courses" 
                    className="w-full text-center block py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    View Roadmap →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Course Roadmaps */}
        <section className="py-16 border-t border-zinc-200 dark:border-white/5 mb-16">
          <h2 className="text-[24px] md:text-[32px] font-bold text-zinc-900 dark:text-white mb-8 tracking-tight">
            Course Roadmaps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseRoadmaps.map((roadmap, i) => (
              <div key={i} className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-6 md:p-8 hover:border-brand-orange/45 transition-all flex flex-col justify-between group">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-full">{roadmap.tag}</span>
                  <h3 className="text-[18px] font-bold text-zinc-900 dark:text-white mt-4 mb-3 group-hover:text-brand-orange transition-colors leading-tight">
                    {roadmap.title}
                  </h3>
                  <p className="text-[13px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed">
                    {roadmap.desc}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-white/5">
                  <a 
                    href="/courses" 
                    className="w-full text-center block py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    View Course Details →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
