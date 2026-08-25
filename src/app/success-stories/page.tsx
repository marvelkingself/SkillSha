import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Success Stories | SkillSha",
  description: "Real students, real placements — see how SkillSha graduates launched their careers across testing, marketing, and analytics roles.",
};

export default function SuccessStoriesPage() {
  const stories = [
    {
      name: "Rizwan",
      role: "Software Tester",
      package: "₹7 LPA",
      line: "Completed SkillSha's Software Testing program and secured a placement as a Software Tester with a ₹7 LPA package."
    },
    {
      name: "Gufran",
      role: "Digital Marketer",
      package: "₹2.4 LPA",
      line: "Trained in SkillSha's Digital Marketing program and placed as a Digital Marketer at ₹2.4 LPA."
    },
    {
      name: "Amaan",
      role: "Data Analyst",
      package: "₹7.2 LPA",
      line: "Completed the Data Analytics program at SkillSha and landed a Data Analyst role at ₹7.2 LPA."
    },
    {
      name: "Farman",
      role: "Digital Marketer",
      package: "₹2.4 LPA",
      line: "Graduated from SkillSha's Digital Marketing course and secured a placement at ₹2.4 LPA."
    },
    {
      name: "Raj",
      role: "Digital Marketing",
      package: "₹3.6 LPA",
      line: "Completed SkillSha's Digital Marketing training and placed with a ₹3.6 LPA package."
    },
    {
      name: "Zohib Ansari",
      role: "Digital Marketing",
      package: "₹7.2 LPA",
      line: "Trained at SkillSha and placed in a Digital Marketing role at ₹7.2 LPA."
    }
  ];

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return parts.map((p) => p[0]).join("").toUpperCase().slice(0, 2);
  };

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
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">Case Diaries</span>
          </div>
          <h1 className="text-[36px] md:text-[56px] font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]">
            Student <span className="text-brand-orange">Success</span> Stories.
          </h1>
          <p className="text-[16px] md:text-[19px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed font-medium max-w-[700px] mx-auto">
            Real students, real placements — see how SkillSha graduates launched their careers across testing, marketing, and analytics roles.
          </p>
        </section>

        {/* Stories Grid */}
        <section className="py-12 border-t border-zinc-200 dark:border-white/5 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story, i) => (
              <div key={i} className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[24px] p-6 md:p-8 hover:border-brand-orange/45 transition-colors group flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-gradient-to-br from-brand-orange to-brand-red text-white font-bold text-sm select-none shadow-sm">
                        {getInitials(story.name)}
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold text-zinc-900 dark:text-white leading-tight">{story.name}</h4>
                        <p className="text-[11px] text-zinc-400 mt-0.5">{story.role}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {story.package}
                    </span>
                  </div>
                  <p className="text-[13px] md:text-[14px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed">
                    {story.line}
                  </p>
                </div>
                
                <div className="pt-6 mt-6 border-t border-zinc-200/60 dark:border-white/5">
                  <a 
                    href="/courses" 
                    className="text-[12px] font-bold text-brand-orange hover:underline flex items-center gap-1"
                  >
                    <span>Explore courses</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
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
