import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Mentors from "@/components/Mentors";
import Programs from "@/components/Programs";
import WhyChooseSkillsha from "@/components/WhyChooseSkillsha";
import ApplicationCTA from "@/components/ApplicationCTA";
import CareerSuccessSection from "@/components/CareerSuccessSection";
import Alumni, { AlumniCompanies } from "@/components/Alumni";
import Testimonials from "@/components/Testimonials";
import CounselingModal from "@/components/CounselingModal";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-28 md:pt-32 pb-10 px-4 md:px-8 max-w-[1400px] mx-auto overflow-hidden">
        <Hero />
        <Mentors />
        <Programs />
        <WhyChooseSkillsha />
        <ApplicationCTA />
        <CareerSuccessSection />
        <Alumni />
        <Testimonials />
        <AlumniCompanies />
      </main>
      <Footer />
      <CounselingModal />
    </>
  );
}
