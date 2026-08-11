"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Sparkles, 
  Send, 
  Globe, 
  CheckCircle,
  HelpCircle,
  BookOpen,
  Award,
  ArrowUpRight,
  Zap
} from "lucide-react";

interface CityNode {
  id: string;
  name: string;
  x: number;
  y: number;
  isHub?: boolean;
  status: string;
}

const CITIES: CityNode[] = [
  // North (Noida/Delhi/Ghaziabad central Hub)
  { id: "ncr", name: "Delhi NCR (Noida, Ghaziabad, Gurgaon)", x: 215, y: 155, isHub: true, status: "Skillsha Central Training & Placement Hub" },
  { id: "jaipur", name: "Jaipur", x: 175, y: 185, status: "Active Learning Circle" },
  { id: "lucknow", name: "Lucknow", x: 265, y: 175, status: "Active Learning Circle" },
  { id: "chandigarh", name: "Chandigarh", x: 205, y: 110, status: "Active Learning Circle" },
  
  // West
  { id: "mumbai", name: "Mumbai", x: 150, y: 335, status: "Active Learning Circle" },
  { id: "pune", name: "Pune", x: 160, y: 355, status: "Active Learning Circle" },
  { id: "nagpur", name: "Nagpur", x: 235, y: 300, status: "Active Learning Circle" },
  { id: "ahmedabad", name: "Ahmedabad", x: 130, y: 260, status: "Active Learning Circle" },
  
  // South
  { id: "bengaluru", name: "Bengaluru", x: 205, y: 440, status: "Active Learning Circle" },
  { id: "hyderabad", name: "Hyderabad", x: 225, y: 350, status: "Active Learning Circle" },
  { id: "chennai", name: "Chennai", x: 245, y: 450, status: "Active Learning Circle" },
  
  // Central/East
  { id: "bhopal", name: "Bhopal", x: 215, y: 245, status: "Active Learning Circle" },
  { id: "patna", name: "Patna", x: 315, y: 200, status: "Active Learning Circle" },
  { id: "indore", name: "Indore", x: 185, y: 255, status: "Active Learning Circle" },
  { id: "kolkata", name: "Kolkata", x: 355, y: 250, status: "Active Learning Circle" }
];

const INDIA_BOUNDS: [number, number][] = [
  [215, 35], [225, 60], [220, 85], [205, 105], [215, 125],
  [285, 155], [325, 145], [345, 155], [395, 145], [415, 165],
  [405, 195], [395, 225], [370, 215], [365, 195], [345, 235],
  [355, 255], [320, 285], [280, 345], [245, 415], [235, 455],
  [215, 480], [195, 455], [175, 405], [150, 335], [140, 280],
  [105, 255], [95, 235], [120, 215], [145, 195], [165, 135],
  [195, 95]
];

function isPointInPolygon(point: [number, number], polygon: [number, number][]) {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];
    const intersect = ((yi > y) !== (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

const COURSES = [
  "Python",
  "Java Dev",
  "Data Science",
  "Full Stack MERN",
  "QA Automation",
  "Cloud Computing",
  "API Testing",
  "Digital Marketing"
];

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", query: "" });
  const [selectedCourse, setSelectedCourse] = useState("Full Stack MERN");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hoveredCity, setHoveredCity] = useState<CityNode | null>(null);

  // Switcher tab for mobile iOS view segment controls
  const [activeSegment, setActiveSegment] = useState<"form" | "info" | "map">("form");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const gridPoints = useMemo(() => {
    const points: { x: number; y: number }[] = [];
    const density = 9;
    for (let x = 80; x <= 450; x += density) {
      for (let y = 30; y <= 510; y += density) {
        if (isPointInPolygon([x, y], INDIA_BOUNDS)) {
          points.push({ x, y });
        }
      }
    }
    return points;
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 dark:bg-[#030303] text-zinc-900 dark:text-white overflow-hidden relative transition-colors duration-500 selection:bg-brand-orange selection:text-black">
        
        {/* Geometric layout grid backing */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-20 opacity-50 dark:opacity-30" />
        <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.06),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none -z-10" />

        <main className="pt-32 md:pt-40 max-w-[1300px] mx-auto px-4 md:px-8 pb-24">
          
          {/* SaaS Header block */}
          <header className="mb-12 md:mb-16 text-center md:text-left relative z-10 animate-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/50 dark:bg-white/5 border border-zinc-300 dark:border-white/10 text-[10px] font-extrabold uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
              Next-Gen Learning Portal
            </div>
            <h1 className="text-[32px] sm:text-[54px] lg:text-[72px] font-extrabold tracking-tight leading-[1.05] bg-gradient-to-b from-zinc-950 via-zinc-800 to-zinc-600 dark:from-white dark:via-zinc-100 dark:to-zinc-500 bg-clip-text text-transparent font-heading uppercase">
              Let&apos;s build<br className="hidden md:block" /> something real.
            </h1>
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mt-4 leading-relaxed font-semibold">
              Looking for the best online IT training institute in India? Whether you&apos;re in Delhi, Mumbai, Bengaluru, Hyderabad, Noida, Pune, or any other city — Skillsha is just one click away. We are here to support you with expert guidance, industry-driven training, personalized mentorship, and 100% job placement assistance. At Skillsha, your success is our priority.
            </p>
          </header>

          {/* iOS Segment Switcher (only displays on mobile viewports for clean app feel) */}
          <div className="flex lg:hidden bg-zinc-200/60 dark:bg-zinc-900/60 p-1.5 rounded-2xl border border-zinc-300/40 dark:border-white/5 mb-8 max-w-sm mx-auto relative z-10 shadow-sm">
            {[
              { id: "form", label: "Uplink Console" },
              { id: "info", label: "Database Info" },
              { id: "map", label: "Network Map" }
            ].map((seg) => (
              <button
                key={seg.id}
                onClick={() => setActiveSegment(seg.id as any)}
                className={`flex-1 text-center py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeSegment === seg.id 
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-md" 
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {seg.label}
              </button>
            ))}
          </div>

          {/* Core Interactive Layout Deck */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
            
            {/* Left Console: Conversational form console (lg:col-span-7) */}
            <div className={`lg:col-span-7 space-y-8 ${activeSegment === "form" ? "block" : "hidden lg:block"}`}>
              
              <div className="relative bg-white dark:bg-[#070707] border border-zinc-200/80 dark:border-white/5 rounded-[32px] p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden group transition-colors duration-500">
                {/* Micro ambient accent edge */}
                <span className="absolute top-0 left-0 w-8 h-[2px] bg-gradient-to-r from-transparent via-brand-orange to-transparent" />
                
                <div className="flex items-center justify-between mb-8 border-b border-zinc-100 dark:border-white/5 pb-4">
                  <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
                    Channel Secure Link
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">SYS_CONSOLE_2.0</span>
                </div>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-12">
                    
                    {/* Generational Interactive Input Sentence (Conversational / Mad-libs style) */}
                    <div className="text-lg sm:text-2xl text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed font-sans">
                      Hey Skillsha, my name is{" "}
                      <input 
                        type="text" 
                        required
                        placeholder="your full name" 
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        className="bg-transparent border-b border-zinc-300 dark:border-zinc-800 focus:border-brand-orange text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-700 outline-none px-2 py-0.5 transition-all text-lg sm:text-2xl font-extrabold max-w-[200px] inline-block uppercase text-center"
                      />.{" "}
                      You can drop an email to me at{" "}
                      <input 
                        type="email" 
                        required
                        placeholder="your email address" 
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        className="bg-transparent border-b border-zinc-300 dark:border-zinc-800 focus:border-brand-orange text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-700 outline-none px-2 py-0.5 transition-all text-lg sm:text-2xl font-extrabold min-w-[180px] max-w-sm inline-block uppercase text-center"
                      />{" "}
                      or ping my phone at{" "}
                      <input 
                        type="tel" 
                        required
                        placeholder="mobile number" 
                        value={formState.phone}
                        onChange={(e) => setFormState({...formState, phone: e.target.value})}
                        className="bg-transparent border-b border-zinc-300 dark:border-zinc-800 focus:border-brand-orange text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-700 outline-none px-2 py-0.5 transition-all text-lg sm:text-2xl font-extrabold min-w-[150px] max-w-[200px] inline-block uppercase text-center"
                      />.
                      
                      <div className="mt-6 mb-4">
                        I am interested in learning about{" "}
                        <span className="text-brand-orange font-extrabold underline decoration-dashed uppercase">{selectedCourse}</span>.
                      </div>
                      
                      {/* Course Select chips */}
                      <div className="flex flex-wrap gap-2.5 my-4">
                        {COURSES.map((course) => {
                          const isSelected = selectedCourse === course;
                          return (
                            <button
                              type="button"
                              key={course}
                              onClick={() => setSelectedCourse(course)}
                              className={`px-4 py-2 rounded-xl text-[11px] font-extrabold tracking-wider uppercase border transition-all ${
                                isSelected 
                                  ? "bg-brand-orange/10 dark:bg-brand-orange/20 border-brand-orange text-brand-orange shadow-[0_0_15px_rgba(249,115,22,0.15)] dark:shadow-[0_0_15px_rgba(249,115,22,0.3)] scale-[1.03]" 
                                  : "bg-zinc-100 dark:bg-white/[0.03] border-zinc-200 dark:border-white/5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-white/10"
                              }`}
                            >
                              {course}
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-8">
                        Here is what I want to ask:
                        <textarea 
                          required
                          placeholder="Type details of your query..." 
                          value={formState.query}
                          onChange={(e) => setFormState({...formState, query: e.target.value})}
                          rows={2}
                          className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-800 focus:border-brand-orange text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-700 outline-none py-2.5 mt-3 transition-all text-base sm:text-lg font-semibold resize-none"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="w-full relative flex items-center justify-between px-6 py-4.5 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-black font-extrabold tracking-widest text-xs uppercase hover:bg-zinc-900 dark:hover:bg-zinc-200 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer shadow-[0_15px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_15px_30px_rgba(255,255,255,0.05)] border border-white/5 dark:border-none"
                    >
                      <span>{submitting ? "Establishing Uplink..." : "Transmit Console Query"}</span>
                      <ArrowUpRight className="w-5 h-5 shrink-0" />
                    </button>

                  </form>
                ) : (
                  <div className="text-center py-16 space-y-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto animate-[scaleUp_0.4s_ease-out]">
                      <CheckCircle className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-extrabold tracking-tight text-zinc-950 dark:text-white uppercase">Console Query Received</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold leading-relaxed max-w-sm mx-auto">
                        Thank you, <strong>{formState.name}</strong>. Your query has been logged. Our learning advisor will callback within 24 hours.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct channels widget panel */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { 
                    title: "📧 Email Channel", 
                    sub: "support@skillsha.com", 
                    desc: "General queries, collaborations, placement team direct access.",
                    link: "mailto:support@skillsha.com"
                  },
                  { 
                    title: "📱 Direct Hotline", 
                    sub: "+91-XXXXXXXXXX", 
                    desc: "Call or WhatsApp (Monday to Saturday | 10:00 AM to 7:00 PM).",
                    link: "tel:+91-XXXXXXXXXX"
                  },
                  { 
                    title: "💬 Live Chat Console", 
                    sub: "Secure Counseling", 
                    desc: "Chat instantly or request a 1-to-1 advisor placement briefing.",
                    link: "#callback-form"
                  }
                ].map((channel, idx) => (
                  <a 
                    key={idx}
                    href={channel.link}
                    className="group relative bg-white dark:bg-[#070707] border border-zinc-200/80 dark:border-white/5 p-5.5 rounded-2xl flex flex-col justify-between hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-none"
                  >
                    <div className="space-y-2">
                      <h4 className="text-[11px] font-extrabold tracking-wider uppercase text-zinc-400 dark:text-zinc-500 flex items-center justify-between">
                        {channel.title}
                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors" />
                      </h4>
                      <p className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-brand-orange transition-colors">
                        {channel.sub}
                      </p>
                    </div>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold leading-relaxed mt-4">
                      {channel.desc}
                    </p>
                  </a>
                ))}
              </div>

            </div>

            {/* Right Console: Map & Database info panels (lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Point Cloud Map Projection Panel */}
              <div className={`bg-white dark:bg-[#070707] border border-zinc-200/80 dark:border-white/5 rounded-[32px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-2xl overflow-hidden group ${activeSegment === "map" ? "block" : "hidden lg:block"}`}>
                <div className="flex items-center justify-between mb-4 border-b border-zinc-100 dark:border-white/5 pb-3">
                  <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-brand-orange animate-pulse" />
                    Interactive Radar System
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 dark:text-zinc-600">LIVE SATELLITE</span>
                </div>

                <div className="relative w-full max-w-[380px] aspect-[430/500] mx-auto">
                  <svg 
                    viewBox="80 30 370 480" 
                    className="w-full h-full select-none"
                    aria-label="Interactive India Presence Map"
                  >
                    <polygon
                      points="215,35 225,60 220,85 205,105 215,125 285,155 325,145 345,155 395,145 415,165 405,195 395,225 370,215 365,195 345,235 355,255 320,285 280,345 245,415 235,455 215,480 195,455 175,405 150,335 140,280 105,255 95,235 120,215 145,195 165,135 195,95"
                      fill="none"
                      className="stroke-zinc-200 dark:stroke-white/5"
                      strokeWidth="1"
                    />

                    {gridPoints.map((pt, idx) => (
                      <circle
                        key={`pt-${idx}`}
                        cx={pt.x}
                        cy={pt.y}
                        r="1.2"
                        className="fill-zinc-300 dark:fill-white/10 opacity-75 dark:opacity-70"
                        style={{
                          animation: `pulse-dot 4s infinite ease-in-out`,
                          animationDelay: `${(pt.x + pt.y) * 8}ms`
                        }}
                      />
                    ))}

                    <line
                      x1="215"
                      y1="250"
                      x2="450"
                      y2="250"
                      className="stroke-brand-orange/15 dark:stroke-brand-orange/5 pointer-events-none"
                      strokeWidth="1.2"
                      style={{
                        transformOrigin: "215px 250px",
                        animation: "map-radar-sweep 12s linear infinite"
                      }}
                    />

                    {CITIES.filter(c => !c.isHub).map(city => (
                      <g key={`links-${city.id}`}>
                        <line
                          x1={215}
                          y1={155}
                          x2={city.x}
                          y2={city.y}
                          className="stroke-zinc-200 dark:stroke-white/10"
                          strokeWidth="1.2"
                          strokeDasharray="3 5"
                        />
                        <path
                          d={`M215,155 L${city.x},${city.y}`}
                          fill="none"
                          stroke="url(#mapFlowGrad)"
                          strokeWidth="1.5"
                          strokeDasharray="8 45"
                          style={{
                            animation: "map-dash-flow 4s linear infinite"
                          }}
                        />
                      </g>
                    ))}

                    {CITIES.map(city => {
                      const isHovered = hoveredCity?.id === city.id;
                      return (
                        <g 
                          key={city.id}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredCity(city)}
                          onMouseLeave={() => setHoveredCity(null)}
                        >
                          {(city.isHub || isHovered) && (
                            <circle
                              cx={city.x}
                              cy={city.y}
                              r={city.isHub ? "16" : "10"}
                              className="fill-none stroke-brand-orange/45 animate-ping"
                              style={{ transformOrigin: `${city.x}px ${city.y}px` }}
                            />
                          )}
                          <circle
                            cx={city.x}
                            cy={city.y}
                            r={city.isHub ? "8" : "5"}
                            className="fill-none stroke-zinc-200 dark:stroke-white/30"
                            strokeWidth="1"
                          />
                          <circle
                            cx={city.x}
                            cy={city.y}
                            r={city.isHub ? "5" : "3"}
                            className={`${
                              city.isHub 
                                ? "fill-brand-orange" 
                                : "fill-brand-orange/80 dark:fill-white"
                            } transition-transform duration-300 ${isHovered ? "scale-125" : ""}`}
                            style={{
                              transformOrigin: `${city.x}px ${city.y}px`,
                              filter: `drop-shadow(0 0 6px ${city.isHub ? "rgba(249,115,22,0.9)" : "rgba(255,255,255,0.7)"})`
                            }}
                          />
                        </g>
                      );
                    })}
                  </svg>

                  {hoveredCity && (
                    <div 
                      className="absolute bg-white dark:bg-[#080808] border border-zinc-200 dark:border-brand-orange/30 p-3.5 rounded-2xl text-left pointer-events-none z-45 max-w-[250px] shadow-[0_10px_30px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-xl animate-[scaleUp_0.15s_ease-out]"
                      style={{
                        left: `${((hoveredCity.x - 80) / 370) * 100}%`,
                        top: `${((hoveredCity.y - 30) / 480) * 100 - 15}%`,
                        transform: "translate(-50%, -100%)"
                      }}
                    >
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-brand-orange">
                        {hoveredCity.isHub ? "Central Training Hub" : "Skillsha Network"}
                      </span>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white mt-0.5">
                        {hoveredCity.name}
                      </h4>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 leading-normal font-semibold">
                        {hoveredCity.status}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Database directory panels (Why Us, Difference, Cities list) (xl:col-span-5) */}
              <div className={`space-y-6 ${activeSegment === "info" ? "block" : "hidden lg:block"}`}>
                
                {/* Why Contact details folder */}
                <article className="bg-white dark:bg-[#070707] border border-zinc-200/80 dark:border-white/5 p-6 rounded-2xl space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-none transition-colors duration-500">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Sparkles className="w-4 h-4 text-brand-orange" />
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-800 dark:text-white">Why Contact Skillsha?</h3>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold">
                    At Skillsha - IT Training & Placement Institute, we believe that every student deserves access to affordable, high-quality tech education, regardless of location. That’s why we offer online and recorded IT training programs that you can join from anywhere in India. When you reach out to us, you don’t just get information — you get a career roadmap that helps you transition from learning to earning.
                  </p>
                </article>

                {/* Help Topics */}
                <article className="bg-white dark:bg-[#070707] border border-zinc-200/80 dark:border-white/5 p-6 rounded-2xl space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-none transition-colors duration-500">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <HelpCircle className="w-4 h-4 text-brand-orange" />
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-800 dark:text-white">How Can We Help You?</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "📘 Course Details & Curriculum",
                      "💼 Job Placement Assistance",
                      "👤 Trainer Info & Certifications",
                      "🎓 Free Demo Classes",
                      "🎯 Career Guidance & Counselling",
                      "💻 Recorded Session Access",
                      "📅 Batch Timings & Weekend Options",
                      "💰 Fee Structure & Discounts"
                    ].map((item, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200/50 dark:border-white/5 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold border-t border-zinc-100 dark:border-white/5 pt-3 leading-relaxed">
                    Whether you&apos;re a college student, working professional, job seeker, or someone planning to switch careers — our team is here to guide you.
                  </p>
                </article>

                {/* What Makes Us Different */}
                <article className="bg-white dark:bg-[#070707] border border-zinc-200/80 dark:border-white/5 p-6 rounded-2xl space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-none transition-colors duration-500">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Award className="w-4 h-4 text-brand-orange" />
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-800 dark:text-white">What Makes Us Different?</h3>
                  </div>
                  <div className="space-y-2">
                    {[
                      "✅ Affordable Fees – Quality education",
                      "✅ Expert Trainers – Google-certified",
                      "✅ Recorded + Live Doubt Sessions",
                      "✅ Dual Language – English & Hindi",
                      "✅ 100% Placement Assistance",
                      "✅ Flexible Weekend Batches",
                      "✅ PAN India Presence"
                    ].map((diff, idx) => (
                      <div key={idx} className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                        <span>{diff}</span>
                      </div>
                    ))}
                  </div>
                </article>

                {/* Train across cities */}
                <article className="bg-white dark:bg-[#070707] border border-zinc-200/80 dark:border-white/5 p-6 rounded-2xl space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-none transition-colors duration-500">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Globe className="w-4 h-4 text-brand-orange" />
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-800 dark:text-white">We Train Across Cities</h3>
                  </div>
                  <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-semibold">
                    Skillsha is trusted by learners from:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Delhi NCR",
                      "Mumbai",
                      "Pune",
                      "Nagpur",
                      "Bengaluru",
                      "Hyderabad",
                      "Chennai",
                      "Jaipur",
                      "Lucknow",
                      "Chandigarh",
                      "Bhopal",
                      "Patna",
                      "Indore"
                    ].map((city) => (
                      <span key={city} className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200/50 dark:border-white/5 text-[10px] font-bold text-zinc-600 dark:text-zinc-300">
                        {city}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold border-t border-zinc-100 dark:border-white/5 pt-3 leading-relaxed">
                    No matter where you live, you’ll get live support, recorded sessions, and placement assistance just like a student from any metro city.
                  </p>
                </article>

                {/* Office Location folder block */}
                <div className="bg-white dark:bg-[#070707] border border-zinc-200/80 dark:border-white/5 p-6 rounded-2xl space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-none transition-colors duration-500">
                  <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500">🏢 Offline counseling center</h4>
                  <p className="text-xs text-zinc-800 dark:text-zinc-300 font-bold leading-relaxed">
                    Skillsha - IT Training & Placement Institute<br />
                    Prem Nagar, Ram Rahim Market, Loni, Ghaziabad, Uttar Pradesh - 201102
                  </p>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-relaxed font-semibold border-t border-zinc-100 dark:border-white/5 pt-2">
                    <strong>Note:</strong> We operate 100% online training PAN India, but you can visit our Ghaziabad center for offline support and counseling.
                  </p>
                </div>

                {/* Social grid */}
                <div className="bg-white dark:bg-[#070707] border border-zinc-200/80 dark:border-white/5 p-6 rounded-2xl space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-none transition-colors duration-500">
                  <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500">Stay Connected</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: "Instagram", link: "https://instagram.com/skillsha_" },
                      { name: "Facebook", link: "https://facebook.com/skillsha_" },
                      { name: "Pinterest", link: "https://pinterest.com/skillsha_" },
                      { name: "Twitter (X)", link: "https://twitter.com/skillsha_" }
                    ].map((item) => (
                      <a 
                        key={item.name}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 text-center rounded-lg bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200/50 dark:border-white/5 text-[11px] font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-300 dark:hover:border-white/10 transition-colors"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold mt-2">
                    We’re just a message away. Send us a DM or tag us — we always respond!
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Section 4: Closing Banner */}
          <section className="relative mt-24 bg-gradient-to-b from-white to-zinc-100 dark:from-[#070707] to-black border border-zinc-200/80 dark:border-white/5 rounded-[32px] p-8 md:p-16 text-center max-w-[1000px] mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.02)] dark:shadow-3xl overflow-hidden transition-colors duration-500">
            <span className="absolute top-0 left-0 w-8 h-[2px] bg-gradient-to-r from-transparent via-brand-orange to-transparent" />
            <h2 className="text-2xl md:text-4xl font-extrabold text-zinc-950 dark:text-white mb-4 font-heading uppercase tracking-wide">
              Let’s Build Your Future, Together.
            </h2>
            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold max-w-[700px] mx-auto mb-6">
              At Skillsha, we don’t just teach skills — we build careers. Whether you want to become a developer, data analyst, tester, cloud expert, or digital marketer, our team is committed to helping you succeed.
            </p>
            <p className="text-sm md:text-base text-zinc-900 dark:text-white font-extrabold flex items-center justify-center gap-1.5">
              <span>📩 Reach out today. Your journey to a job-ready IT career starts here.</span>
            </p>
          </section>

          {/* Global Keyframes inject for custom animations */}
          <style jsx global>{`
            @keyframes map-dash-flow {
              0% {
                stroke-dashoffset: 200;
              }
              100% {
                stroke-dashoffset: 0;
              }
            }
            @keyframes map-radar-sweep {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            @keyframes pulse-dot {
              0%, 100% {
                opacity: 0.15;
                r: 1;
              }
              50% {
                opacity: 0.7;
                r: 1.35;
              }
            }
            @keyframes scaleUp {
              0% {
                transform: translate(-50%, -100%) scale(0.9);
                opacity: 0;
              }
              100% {
                transform: translate(-50%, -100%) scale(1);
                opacity: 1;
              }
            }
          `}</style>

        </main>
      </div>
      <Footer />
    </>
  );
}
