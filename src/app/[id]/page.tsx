import { COURSES_DATA } from "@/data/courses";
import { notFound } from "next/navigation";
import CourseDetailClient from "@/components/CourseDetailClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return Object.keys(COURSES_DATA).map((id) => ({ id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const data = COURSES_DATA[id];
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
  const { id } = await params;
  const data = COURSES_DATA[id];

  if (!data) {
    notFound();
  }

  return <CourseDetailClient id={id} data={data} />;
}
