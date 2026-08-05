import { COURSES_DATA } from "@/data/courses";
import { CITIES_LIST } from "@/data/cities";
import { notFound } from "next/navigation";
import CourseDetailClient from "@/components/CourseDetailClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const paths: Array<{ id: string; city: string }> = [];
  
  Object.keys(COURSES_DATA).forEach((id) => {
    CITIES_LIST.forEach((city) => {
      paths.push({ id, city: city.slug });
    });
  });
  
  return paths;
}

interface PageProps {
  params: Promise<{ id: string; city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, city } = await params;
  const data = COURSES_DATA[id];
  const cityInfo = CITIES_LIST.find((c) => c.slug === city);
  
  if (!data || !cityInfo) {
    return {
      title: "Course Not Found | SkillSha",
    };
  }
  return {
    title: `Best ${data.title} Certification Course in ${cityInfo.name} | SkillSha`,
    description: `Enroll in the top professional ${data.title} certification program in ${cityInfo.name}. ${data.description}`,
  };
}

export default async function CityCoursePage({ params }: PageProps) {
  const { id, city } = await params;
  const data = COURSES_DATA[id];
  const cityInfo = CITIES_LIST.find((c) => c.slug === city);

  if (!data || !cityInfo) {
    notFound();
  }

  return <CourseDetailClient id={id} data={data} city={cityInfo.name} />;
}
