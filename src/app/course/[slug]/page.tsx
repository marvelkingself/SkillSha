import { COURSES_DATA, COURSE_SLUG_MAP, getCourseIdBySlug } from "@/data/courses";
import { notFound } from "next/navigation";
import CourseDetailClient from "@/components/CourseDetailClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return Object.values(COURSE_SLUG_MAP).map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const id = getCourseIdBySlug(slug);
  const data = id ? COURSES_DATA[id] : null;
  if (!data) {
    return {
      title: "Course Not Found | SkillSha",
    };
  }
  return {
    title: `${data.title} Certification | SkillSha`,
    description: data.description,
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const id = getCourseIdBySlug(slug);
  const data = id ? COURSES_DATA[id] : null;

  if (!id || !data) {
    notFound();
  }

  return <CourseDetailClient id={id} data={data} />;
}
