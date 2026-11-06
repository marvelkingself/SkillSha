import Link from "next/link";
import type { Metadata } from "next";
import CompilerTool from "@/components/compiler/CompilerTool";

export const metadata: Metadata = {
  title: "Online Compiler | SkillSha",
  description: "Write and run Python, JavaScript, Java, and C++ code online — free browser-based compiler by SkillSha.",
};

export default function CompilerPage() {
  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-[#0F1319]">
      <Link
        href="/"
        className="absolute top-2 left-[70px] z-10 text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-brand-orange transition-colors"
      >
        ← SkillSha
      </Link>
      <CompilerTool />
    </div>
  );
}
