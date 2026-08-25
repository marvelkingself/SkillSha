import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | SkillSha",
  description: "Join the SkillSha team. Build the future of developer and creator education in an environment focused on high agency and product building.",
};

export default function CareersPage() {
  const openRoles = [
    {
      title: "We're Always Looking for Great Talent",
      team: "Office & Content Roles",
      location: "Ghaziabad Office",
      type: "Full-Time",
      description: "We regularly have openings across content creation, curriculum design, and operations at our office. If you're passionate about education and building, we'd love to hear from you.",
      ctaLink: "mailto:info@skillsha.com"
    },
    {
      title: "Remote Opportunities for Skilled Professionals",
      team: "Work From Home",
      location: "Remote (India)",
      type: "Full-Time / Part-Time",
      description: "We hire remote team members across teaching, content, and support functions. Send us your resume and portfolio, and we'll reach out when a matching role opens.",
      ctaLink: "mailto:info@skillsha.com"
    },
    {
      title: "Freelance & Project-Based Collaborations",
      team: "Project-Based & Global",
      location: "Remote (Global)",
      type: "Contract / Freelance",
      description: "We collaborate with skilled professionals worldwide on specific projects, contract work, and specialized assignments. Reach out with your expertise and availability.",
      ctaLink: "mailto:info@skillsha.com"
    }
  ];

  const benefits = [
    {
      title: "Flexible Work Options",
      desc: "We offer both office-based and remote roles, so you can work in a way that fits you best."
    },
    {
      title: "Hands-On Learning Environment",
      desc: "Work closely with mentors and real students, gaining practical experience in ed-tech and skill development."
    },
    {
      title: "Growth-Focused Culture",
      desc: "We support continuous learning and skill-building for our own team, not just our students."
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
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">We are hiring</span>
          </div>
          <h1 className="text-[36px] md:text-[56px] font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]">
            Build the Future <br className="hidden md:inline" /> of <span className="text-brand-orange">Education</span>.
          </h1>
          <p className="text-[16px] md:text-[19px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed font-medium max-w-[700px] mx-auto">
            We&apos;re a growing team of educators and builders reimagining how technical professionals learn new skills, ship real projects, and switch careers.
          </p>
        </section>

        {/* Benefits Section */}
        <section className="py-12 border-t border-zinc-200 dark:border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-6 md:p-8">
                <h3 className="text-[17px] font-bold text-zinc-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-[13px] md:text-[14px] text-zinc-500 dark:text-[#9CA3AF] leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Job Listings Section */}
        <section className="py-16 md:py-24 border-t border-zinc-200 dark:border-white/5 mb-12">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-[28px] md:text-[34px] font-bold text-zinc-900 dark:text-white mb-8 tracking-tight text-center">
              Open Positions
            </h2>
            <div className="space-y-4">
              {openRoles.map((role, i) => (
                <div 
                  key={i} 
                  className="bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[20px] p-6 flex flex-col md:flex-row md:items-center justify-between hover:border-brand-orange/40 transition-colors group cursor-pointer"
                >
                  <div className="flex-1 md:pr-6 mb-4 md:mb-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-brand-orange bg-brand-orange/10 px-2.5 py-0.5 rounded-full">{role.team}</span>
                      <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">{role.location} • {role.type}</span>
                    </div>
                    <h3 className="text-[18px] font-semibold text-zinc-900 dark:text-white group-hover:text-brand-orange transition-colors">{role.title}</h3>
                    <p className="text-[13px] text-zinc-500 dark:text-[#9CA3AF] mt-1.5 leading-relaxed">{role.description}</p>
                  </div>
                  <div className="shrink-0 flex items-center">
                    <a 
                      href={role.ctaLink} 
                      className="w-full md:w-auto text-center px-5 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold tracking-wide hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      Apply Now →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
