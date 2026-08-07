"use client";

import React from "react";
import { useJourney } from "@/hooks/useJourney";
import { JourneySidebar } from "./JourneySidebar";
import { JourneyMap } from "./JourneyMap";
import { JourneyDetailsCard } from "./JourneyDetailsCard";

export function JourneySection() {
  const {
    activeStep,
    setActiveStep,
    isMoving,
    setIsMoving,
    completedSteps,
  } = useJourney(0);

  const journeySteps = [
    {
      title: "Enroll & Onboard",
      desc: "Submit your application and complete the basic diagnostic screening to map your strengths and select your high-performance track.",
      badge: "STEP 01",
      glowColor: "from-orange-500/35 to-transparent",
      duration: "1 Week",
      skills: ["Diagnostics", "Orientation", "Git Setup"],
      status: "On-Track",
    },
    {
      title: "Master Core Systems",
      desc: "Deep dive into production architecture, clean code practices, and system paradigms with senior engineers shipping code at scale daily.",
      badge: "STEP 02",
      glowColor: "from-orange-500/25 to-transparent",
      duration: "4 Weeks",
      skills: ["System Design", "App Architecture", "State"],
      status: "Active",
    },
    {
      title: "Ship Live Products",
      desc: "Build 8+ production-ready systems deployed to cloud edge nodes. Complete team pull requests and maintain a public GitHub history that speaks for itself.",
      badge: "STEP 03",
      glowColor: "from-red-500/35 to-transparent",
      duration: "5 Weeks",
      skills: ["Edge Deploy", "API Gateways", "Databases"],
      status: "Upcoming",
    },
    {
      title: "Operator Mock Loops",
      desc: "Face technical mock interviews, system design drills, and resume reviews directly from engineering leads in active product companies.",
      badge: "STEP 04",
      glowColor: "from-red-500/25 to-transparent",
      duration: "3 Weeks",
      skills: ["Tech Mocks", "Coding Drills", "Resumes"],
      status: "Upcoming",
    },
    {
      title: "Referral Matching",
      desc: "Skip blackhole job boards. Get directly routed to partner engineering teams through our referral network spanning 350+ companies.",
      badge: "STEP 05",
      glowColor: "from-emerald-500/35 to-transparent",
      duration: "2 Weeks",
      skills: ["Placement Route", "Direct Introductions"],
      status: "Locked",
    },
    {
      title: "Secure Your Offer",
      desc: "Clear your interview rounds with high confidence, negotiate your compensation, and launch your career in top-tier technology platforms.",
      badge: "STEP 06",
      glowColor: "from-emerald-500/25 to-transparent",
      duration: "1 Week",
      skills: ["Salary Negotiate", "Offer Closing"],
      status: "Locked",
    },
  ];

  const triggerCounselingModal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("openCounselingModal"));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch max-w-6xl mx-auto w-full">
      {/* Column 1: Milestone Stepper Selector (col-span-3) */}
      <nav className="lg:col-span-3 w-full flex items-center" aria-label="Journey Sidebar">
        <JourneySidebar
          steps={journeySteps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          completedSteps={completedSteps}
          isMoving={isMoving}
        />
      </nav>

      {/* Column 2: Compact Animated SVG Roadmap (col-span-5) */}
      <section className="lg:col-span-5 w-full flex items-center" aria-label="Visual Learning Path">
        <JourneyMap
          steps={journeySteps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          completedSteps={completedSteps}
          isMoving={isMoving}
          setIsMoving={setIsMoving}
        />
      </section>

      {/* Column 3: Dashboard Info Details Card (col-span-4) */}
      <section className="lg:col-span-4 w-full flex items-center" aria-label="Milestone Details">
        <JourneyDetailsCard
          step={journeySteps[activeStep]}
          onClickCTA={triggerCounselingModal}
        />
      </section>
    </div>
  );
}
