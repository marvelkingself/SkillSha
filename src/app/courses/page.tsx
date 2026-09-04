import Header from "@/components/Header";
import Programs from "@/components/Programs";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Certification Programs & Courses | SkillSha",
  description: "Browse SkillSha's industry-led certification programs in Data Science, AI, and Digital Marketing with placement support.",
  alternates: {
    canonical: "https://skillsha.com/courses",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function CoursesPage() {
  return (
    <>
      <Header />
      <main className="pt-28 md:pt-36 min-h-screen">
        <Programs className="mt-0 md:mt-10" />
      </main>
      <Footer />
    </>
  );
}
