import { COURSES_DATA, COURSE_SLUG_MAP, getCourseIdBySlug } from "@/data/courses";
import { CITIES_LIST } from "@/data/cities";
import { notFound } from "next/navigation";
import CourseDetailClient from "@/components/CourseDetailClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const paths: Array<{ slug: string; city: string }> = [];
  
  Object.values(COURSE_SLUG_MAP).forEach((slug) => {
    CITIES_LIST.forEach((city) => {
      paths.push({ slug, city: city.slug });
    });
  });
  
  return paths;
}

interface PageProps {
  params: Promise<{ slug: string; city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, city } = await params;
  const id = getCourseIdBySlug(slug);
  const data = id ? COURSES_DATA[id] : null;
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
  const { slug, city } = await params;
  const id = getCourseIdBySlug(slug);
  const data = id ? COURSES_DATA[id] : null;
  const cityInfo = CITIES_LIST.find((c) => c.slug === city);

  if (!id || !data || !cityInfo) {
    notFound();
  }

  return <CourseDetailClient id={id} data={data} city={cityInfo.name} />;
}
