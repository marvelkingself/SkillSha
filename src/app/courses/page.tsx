import Header from "@/components/Header";
import Programs from "@/components/Programs";
import Footer from "@/components/Footer";

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
