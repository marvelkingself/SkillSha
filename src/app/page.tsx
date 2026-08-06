import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Mentors from "@/components/Mentors";
import Programs from "@/components/Programs";
import ApplicationCTA from "@/components/ApplicationCTA";
import Alumni, { AlumniCompanies } from "@/components/Alumni";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CitiesWeServe from "@/components/CitiesWeServe";
import Comparison from "@/components/Comparison";
import BlogPreview from "@/components/BlogPreview";
import WhyChooseUs from "@/components/WhyChooseUs";
import PlacementProcess from "@/components/PlacementProcess";
import HiringPartnersTeaser from "@/components/HiringPartnersTeaser";
import CounselingModal from "@/components/CounselingModal";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-28 md:pt-32 pb-10 px-4 md:px-8 max-w-[1400px] mx-auto overflow-hidden">
        <Hero />
        <WhyChooseUs />
        <Mentors />
        <Programs />
        <PlacementProcess />
        <ApplicationCTA />
        <Alumni />
        <Testimonials />
        <AlumniCompanies />
        <HiringPartnersTeaser />
        <CitiesWeServe />
        <Comparison />
        <BlogPreview />
        <FAQ />
      </main>
      <Footer />
      <CounselingModal />
    </>
  );
}
