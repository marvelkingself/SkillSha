import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogClient from "@/components/BlogClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | SkillSha",
  description: "Read technical tutorials, deep-dives into LLM architectures, UI/UX systems, and success stories from SkillSha operators.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <BlogClient />
      <Footer />
    </>
  );
}
