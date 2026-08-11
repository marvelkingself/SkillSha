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
  ExternalLink,
  Laptop
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

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", query: "" });
  const [submitted, setSubmitted] = useState(false);
  const [hoveredCity, setHoveredCity] = useState<CityNode | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
      <div className="min-h-screen bg-slate-50 dark:bg-[#030303] text-zinc-900 dark:text-zinc-100 overflow-hidden relative transition-colors duration-500 selection:bg-brand-orange selection:text-black">
        
        {/* Subtle Background Elements to match brand identity */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-20 opacity-60 dark:opacity-40" />
        <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.06),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none -z-10 animate-pulse" />

        <main className="pt-28 md:pt-36 max-w-[1300px] mx-auto px-4 md:px-8 pb-20">
          
          {/* Section 1: Hero Header */}
          <header className="text-center max-w-[900px] mx-auto mb-16 animate-reveal">
            <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 dark:bg-white/5 border border-brand-orange/20 dark:border-white/10 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-orange dark:text-zinc-300">
                Get In Touch
              </span>
            </div>
            
            <h1 className="text-[32px] md:text-[54px] font-extrabold tracking-tight text-zinc-950 dark:text-white mb-5 leading-[1.1] font-heading">
              Contact Skillsha – Your Gateway to Career-Driven IT Training Across India
            </h1>
            
            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold max-w-2xl mx-auto">
              Looking for the best online IT training institute in India? Whether you&apos;re in Delhi, Mumbai, Bengaluru, Hyderabad, Noida, Pune, or any other city — Skillsha is just one click away. We are here to support you with expert guidance, industry-driven training, personalized mentorship, and 100% job placement assistance. At Skillsha, your success is our priority.
            </p>
          </header>

          {/* Section 2: Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start mb-20">
            
            {/* Bento Block 1: Why Contact Skillsha? (col-span-7) */}
            <article className="lg:col-span-7 bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[32px] p-8 md:p-10 flex flex-col justify-between hover:border-brand-orange/40 dark:hover:border-brand-orange/30 hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.04)] dark:hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.05)] transition-all duration-500 group relative overflow-hidden h-full min-h-[320px]">
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/[0.03] dark:bg-brand-orange/[0.015] rounded-full blur-[80px] pointer-events-none -z-10 group-hover:scale-110 transition-transform duration-700" />
              
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 dark:bg-brand-orange/15 flex items-center justify-center mb-6 border border-brand-orange/20 text-brand-orange">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="font-heading text-2xl font-extrabold text-zinc-950 dark:text-white tracking-tight mb-4 uppercase">
                  Why Contact Skillsha?
                </h2>
                <p className="text-[13px] md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold">
                  At Skillsha - IT Training & Placement Institute, we believe that every student deserves access to affordable, high-quality tech education, regardless of location. That’s why we offer online and recorded IT training programs that you can join from anywhere in India. When you reach out to us, you don’t just get information — you get a career roadmap that helps you transition from learning to earning.
                </p>
              </div>

              <div className="mt-8 border-t border-zinc-100 dark:border-white/5 pt-4 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-brand-orange">
                <span>Skillsha Framework</span>
                <span>PAN India Support</span>
              </div>
            </article>

            {/* Bento Block 2: Request a Call Back Form (col-span-5) */}
            <article className="lg:col-span-5 bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[32px] p-8 hover:border-brand-orange/40 dark:hover:border-brand-orange/30 hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.04)] dark:hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.05)] transition-all duration-500 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-orange/[0.02] dark:bg-brand-orange/[0.01] rounded-full blur-[50px] pointer-events-none -z-10" />
              
              <h2 className="text-xl font-extrabold text-zinc-955 dark:text-white mb-2 font-heading uppercase tracking-wide">
                Request a Call Back
              </h2>
              
              <p className="text-[12px] text-zinc-500 dark:text-zinc-400 mb-6 font-semibold leading-relaxed">
                Don’t have time to talk now? No problem. Fill out our contact form or drop us an email with your query. We promise to get back within 24 hours. You can also schedule a free counseling call with our course advisor to find the best learning path for you.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 mb-1.5">
                      Name
                    </label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Your Name"
                      value={formState.name} 
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="px-4 py-2.5 rounded-xl text-xs border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-[#161616]/40 text-zinc-955 dark:text-white outline-none focus:ring-1 focus:ring-brand-orange transition-all"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 mb-1.5">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      required 
                      placeholder="email@example.com"
                      value={formState.email} 
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="px-4 py-2.5 rounded-xl text-xs border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-[#161616]/40 text-zinc-955 dark:text-white outline-none focus:ring-1 focus:ring-brand-orange transition-all"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 mb-1.5">
                      Phone/Mobile
                    </label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="+91 XXXXX XXXXX"
                      value={formState.phone} 
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="px-4 py-2.5 rounded-xl text-xs border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-[#161616]/40 text-zinc-955 dark:text-white outline-none focus:ring-1 focus:ring-brand-orange transition-all"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 mb-1.5">
                      Query / Message
                    </label>
                    <textarea 
                      rows={4} 
                      required 
                      placeholder="How can we help you?"
                      value={formState.query} 
                      onChange={(e) => setFormState({ ...formState, query: e.target.value })}
                      className="px-4 py-2.5 rounded-xl text-xs border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-[#161616]/40 text-zinc-955 dark:text-white outline-none focus:ring-1 focus:ring-brand-orange transition-all resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-extrabold tracking-widest uppercase hover:scale-[1.01] active:scale-95 transition-all shadow-md shadow-brand-orange/20 cursor-pointer"
                  >
                    <span>Request Callback</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-[scaleUp_0.3s_ease-out]" />
                  <h3 className="text-base font-bold text-zinc-955 dark:text-white mb-2">Request Received!</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed font-semibold">
                    Thank you, <strong>{formState.name}</strong>. We will review your query and call you back within 24 hours.
                  </p>
                </div>
              )}
            </article>

            {/* Bento Block 3: Reach Out to Us & Directory (col-span-6) */}
            <article className="lg:col-span-6 bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[32px] p-8 hover:border-brand-orange/40 dark:hover:border-brand-orange/30 hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.04)] dark:hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.05)] transition-all duration-500">
              <h2 className="text-xl font-extrabold text-zinc-955 dark:text-white mb-2 font-heading uppercase tracking-wide">
                Reach Out to Us
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 font-semibold">
                You can contact us through the channel that’s most convenient for you:
              </p>

              <div className="space-y-4">
                {/* Email Us */}
                <div className="flex gap-4 items-start bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/5 p-4 rounded-2xl">
                  <div className="p-2 bg-brand-orange/10 text-brand-orange rounded-xl shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 text-left">
                    <h4 className="text-[12px] font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider">📧 Email Us</h4>
                    <p className="text-[12px] text-zinc-500 dark:text-zinc-400 font-semibold">
                      General Support: <a href="mailto:support@skillsha.com" className="text-brand-orange hover:underline font-bold">support@skillsha.com</a>
                    </p>
                    <p className="text-[12px] text-zinc-500 dark:text-zinc-400 font-semibold">
                      Business or Collaboration: <a href="mailto:info@skillsha.com" className="text-brand-orange hover:underline font-bold">info@skillsha.com</a>
                    </p>
                  </div>
                </div>

                {/* Call or WhatsApp */}
                <div className="flex gap-4 items-start bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/5 p-4 rounded-2xl">
                  <div className="p-2 bg-brand-orange/10 text-brand-orange rounded-xl shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 text-left">
                    <h4 className="text-[12px] font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider">📱 Call or WhatsApp</h4>
                    <p className="text-[12px] text-zinc-700 dark:text-zinc-300 font-extrabold">
                      Mobile: <a href="tel:+917303082191" className="text-brand-orange hover:underline font-bold">+91 7303082191</a>
                    </p>
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold">
                      (Available: Monday to Saturday | 10:00 AM to 7:00 PM)
                    </p>
                  </div>
                </div>

                {/* Live Chat */}
                <div className="flex gap-4 items-start bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/5 p-4 rounded-2xl">
                  <div className="p-2 bg-brand-orange/10 text-brand-orange rounded-xl shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 text-left">
                    <h4 className="text-[12px] font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider">💬 Live Chat & 1-to-1 Sessions</h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold leading-relaxed">
                      Need an instant response? Chat with us or book a 1-to-1 counseling session with our experts.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Bento Block 4: Point Cloud India Map (col-span-6) */}
            <article className="lg:col-span-6 bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[32px] p-6 hover:border-brand-orange/40 dark:hover:border-brand-orange/30 hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.04)] dark:hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.05)] transition-all duration-500 overflow-hidden">
              <div className="flex items-center justify-between mb-4 border-b border-zinc-155/30 dark:border-white/5 pb-3">
                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-450 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                  <Globe className="w-4 h-4 text-brand-orange animate-pulse" />
                  India Presence Radar
                </span>
                <span className="text-[9px] font-mono text-zinc-500">SATELLITE ACTIVE</span>
              </div>

              {/* Point Cloud Map Viewport */}
              <div className="relative w-full max-w-[340px] aspect-[430/500] mx-auto">
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
                    className="absolute bg-white dark:bg-[#080808] border border-zinc-200 dark:border-brand-orange/30 p-3 rounded-xl text-left pointer-events-none z-45 max-w-[220px] shadow-lg backdrop-blur-xl animate-[scaleUp_0.15s_ease-out]"
                    style={{
                      left: `${((hoveredCity.x - 80) / 370) * 100}%`,
                      top: `${((hoveredCity.y - 30) / 480) * 100 - 15}%`,
                      transform: "translate(-50%, -100%)"
                    }}
                  >
                    <span className="text-[8px] font-extrabold uppercase tracking-widest text-brand-orange">
                      {hoveredCity.isHub ? "Central Training Hub" : "Skillsha Network"}
                    </span>
                    <h4 className="text-[11px] font-bold text-zinc-900 dark:text-white mt-0.5 leading-tight">
                      {hoveredCity.name}
                    </h4>
                    <p className="text-[9px] text-zinc-500 dark:text-zinc-400 mt-1 leading-normal font-semibold">
                      {hoveredCity.status}
                    </p>
                  </div>
                )}
              </div>
            </article>

            {/* Bento Block 5: How Can We Help You? (col-span-6) */}
            <article className="lg:col-span-6 bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[32px] p-8 hover:border-brand-orange/40 dark:hover:border-brand-orange/30 hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.04)] dark:hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.05)] transition-all duration-500">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-5 h-5 text-brand-orange" />
                <h2 className="font-heading text-lg font-extrabold text-zinc-950 dark:text-white tracking-tight uppercase">
                  How Can We Help You?
                </h2>
              </div>
              <p className="text-xs text-zinc-400 dark:text-zinc-555 mb-6 font-semibold">
                Here’s what you can ask us or get support for:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
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
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 p-3 bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/5 rounded-xl text-[11px] text-zinc-700 dark:text-zinc-300 font-semibold hover:border-brand-orange/20 transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-zinc-550 dark:text-zinc-500 leading-relaxed font-semibold border-t border-zinc-100 dark:border-white/5 pt-4">
                Whether you&apos;re a college student, working professional, job seeker, or someone planning to switch careers — our team is here to guide you.
              </p>
            </article>

            {/* Bento Block 6: Our Courses (col-span-6) */}
            <article className="lg:col-span-6 bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[32px] p-8 hover:border-brand-orange/40 dark:hover:border-brand-orange/30 hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.04)] dark:hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.05)] transition-all duration-500">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-brand-orange" />
                <h2 className="font-heading text-lg font-extrabold text-zinc-950 dark:text-white tracking-tight uppercase">
                  Our Courses
                </h2>
              </div>
              <p className="text-xs text-zinc-400 dark:text-zinc-555 mb-6 font-semibold">
                Contact us to know more about these in-demand IT courses:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  "Python Programming (Beginner to Advanced)",
                  "Java Development",
                  "Data Science & Machine Learning",
                  "Full Stack Web Development (MERN)",
                  "Software Testing (Manual + Automation)",
                  "Cloud Computing (AWS, Azure)",
                  "API Testing (Postman, REST API)",
                  "Digital Marketing"
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 p-3 bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/5 rounded-xl text-[11px] text-zinc-700 dark:text-zinc-300 font-semibold hover:border-brand-orange/20 transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-zinc-550 dark:text-zinc-500 leading-relaxed font-semibold border-t border-zinc-100 dark:border-white/5 pt-4">
                All programs include hands-on projects, real-world case studies, and internship opportunities.
              </p>
            </article>

            {/* Bento Block 7: What Makes Us Different? (col-span-6) */}
            <article className="lg:col-span-6 bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[32px] p-8 hover:border-brand-orange/40 dark:hover:border-brand-orange/30 hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.04)] dark:hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.05)] transition-all duration-500">
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-5 h-5 text-brand-orange" />
                <h2 className="font-heading text-lg font-extrabold text-zinc-955 dark:text-white tracking-tight uppercase">
                  What Makes Us Different?
                </h2>
              </div>
              
              <div className="space-y-2.5">
                {[
                  "✅ Affordable Fees – Quality education without burning your pocket",
                  "✅ Expert Trainers – Google-certified instructors with 10+ years of experience",
                  "✅ Recorded + Live Doubt Sessions – Learn anytime, clear doubts instantly",
                  "✅ Dual Language Support – English & Hindi",
                  "✅ 100% Placement Assistance – Resume building, mock interviews, interview calls, and more",
                  "✅ Flexible Weekend Batches – Perfect for working professionals",
                  "✅ PAN India Presence – Train with us from any city or town"
                ].map((diff, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-3 p-3 bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/5 rounded-2xl text-[11px] text-zinc-700 dark:text-zinc-300 font-semibold hover:border-brand-orange/20 transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-1.5" />
                    <span>{diff}</span>
                  </div>
                ))}
              </div>
            </article>

            {/* Bento Block 8: We Train Across All Indian Cities (col-span-6) */}
            <article className="lg:col-span-6 bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[32px] p-8 hover:border-brand-orange/40 dark:hover:border-brand-orange/30 hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.04)] dark:hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.05)] transition-all duration-500">
              <div className="flex items-center gap-2 mb-6">
                <Globe className="w-5 h-5 text-brand-orange" />
                <h2 className="font-heading text-lg font-extrabold text-zinc-950 dark:text-white tracking-tight uppercase">
                  We Train Across All Indian Cities
                </h2>
              </div>
              <p className="text-xs text-zinc-550 dark:text-zinc-500 mb-6 font-semibold">
                Skillsha is trusted by learners from:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  "Delhi, Noida, Ghaziabad, Gurgaon",
                  "Mumbai, Pune, Nagpur",
                  "Bengaluru, Hyderabad, Chennai",
                  "Jaipur, Lucknow, Chandigarh",
                  "Bhopal, Patna, Indore",
                  "And 100+ other cities in India"
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 p-3 bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/5 rounded-xl text-[11px] text-zinc-700 dark:text-zinc-300 font-semibold hover:border-brand-orange/20 transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-zinc-550 dark:text-zinc-500 leading-relaxed font-semibold border-t border-zinc-100 dark:border-white/5 pt-4">
                No matter where you live, you’ll get live support, recorded sessions, and placement assistance just like a student from any metro city.
              </p>
            </article>

            {/* Bento Block 9: Office Location & Socials (col-span-12) */}
            <article className="lg:col-span-12 bg-white dark:bg-[#0c0c0c] border border-zinc-200/80 dark:border-white/5 rounded-[32px] p-8 hover:border-brand-orange/40 dark:hover:border-brand-orange/30 hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.04)] dark:hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.05)] transition-all duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Office address */}
                <div className="space-y-4 text-left">
                  <h3 className="text-base font-extrabold uppercase tracking-wide text-zinc-955 dark:text-white flex items-center gap-2 font-heading">
                    <MapPin className="w-5 h-5 text-brand-orange" />
                    Our Office Location (Offline Support)
                  </h3>
                  <div className="bg-brand-orange/[0.04] dark:bg-brand-orange/[0.02] border-l-4 border-l-brand-orange border-y border-r border-zinc-200 dark:border-white/5 p-5.5 rounded-2xl shadow-[0_4px_20px_rgba(249,115,22,0.02)] transition-all duration-500">
                    <p className="text-[13px] text-zinc-900 dark:text-zinc-200 font-extrabold leading-relaxed">
                      Skillsha - IT Training & Placement Institute<br />
                      Prem Nagar, Ram Rahim Market, Loni, Ghaziabad, Uttar Pradesh - 201102
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold border-t border-zinc-100 dark:border-white/5 pt-3.5 mt-3">
                      <strong>Note:</strong> We operate 100% online training PAN India, but you can visit our Ghaziabad center for offline support and counseling.
                    </p>
                  </div>
                </div>

                {/* Social media stay connected */}
                <div className="space-y-4 text-left">
                  <h3 className="text-base font-extrabold uppercase tracking-wide text-zinc-955 dark:text-white flex items-center gap-2 font-heading">
                    <Globe className="w-5 h-5 text-brand-orange" />
                    We’re Social – Stay Connected
                  </h3>
                  <p className="text-xs text-zinc-550 dark:text-zinc-500 font-semibold leading-relaxed">
                    Follow us to stay updated on new courses, free workshops, success stories, and tech insights:
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { 
                        name: "Instagram: @skillsha_", 
                        url: "https://instagram.com/skillsha_", 
                        iconClass: "text-pink-500 group-hover:text-white",
                        hoverClass: "hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:border-transparent hover:text-white hover:shadow-[0_8px_20px_rgba(238,42,123,0.25)]",
                        icon: (
                          <svg className="w-4 h-4 shrink-0 transition-colors" stroke="currentColor" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        )
                      },
                      { 
                        name: "Facebook: Skillsha", 
                        url: "https://facebook.com/skillsha_", 
                        iconClass: "text-blue-500 group-hover:text-white",
                        hoverClass: "hover:bg-[#1877F2] hover:border-transparent hover:text-white hover:shadow-[0_8px_20px_rgba(24,119,242,0.25)]",
                        icon: (
                          <svg className="w-4 h-4 shrink-0 transition-colors" stroke="currentColor" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                        )
                      },
                      { 
                        name: "Pinterest: @skillsha_", 
                        url: "https://pinterest.com/skillsha_", 
                        iconClass: "text-rose-600 group-hover:text-white",
                        hoverClass: "hover:bg-[#BD081C] hover:border-transparent hover:text-white hover:shadow-[0_8px_20px_rgba(189,8,28,0.25)]",
                        icon: (
                          <svg className="w-4 h-4 shrink-0 transition-colors" stroke="currentColor" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M8 22a9 9 0 0 1-1.91-5.18c0-2.45.69-5.18 1.91-7.82C6.73 7.82 6 6.32 6 4.5 6 2 8 0 11.5 0 16 0 19.5 3 19.5 7.5c0 4.2-2.2 7-5.5 7-1.1 0-2.1-.6-2.5-1.4l-1 3.9c-.4 1.5-1.5 3.3-2.2 4.3A9 9 0 1 1 8 22z"></path>
                          </svg>
                        )
                      },
                      { 
                        name: "Twitter (X): @skillsha_", 
                        url: "https://twitter.com/skillsha_", 
                        iconClass: "text-zinc-800 dark:text-zinc-200 group-hover:text-white dark:group-hover:text-black",
                        hoverClass: "hover:bg-black dark:hover:bg-white hover:border-transparent hover:text-white dark:hover:text-black hover:shadow-[0_8px_20px_rgba(255,255,255,0.15)]",
                        icon: (
                          <svg className="w-4 h-4 shrink-0 transition-colors" stroke="currentColor" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                          </svg>
                        )
                      }
                    ].map((soc, idx) => (
                      <a 
                        key={idx} 
                        href={soc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center gap-2.5 p-3 bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 rounded-xl text-[11px] text-zinc-700 dark:text-zinc-300 font-extrabold transition-all duration-300 ${soc.hoverClass}`}
                      >
                        <span className={soc.iconClass}>{soc.icon}</span>
                        <span>{soc.name}</span>
                      </a>
                    ))}
                  </div>

                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold border-t border-zinc-100 dark:border-white/5 pt-3 leading-relaxed">
                    We’re just a message away. Send us a DM or tag us — we always respond!
                  </p>
                </div>

              </div>
            </article>

          </div>

          {/* Section 3: Closing Callout Banner */}
          <section className="relative bg-gradient-to-r from-brand-orange/[0.03] to-brand-red/[0.01] dark:from-white/[0.015] dark:to-transparent border border-brand-orange/20 dark:border-white/5 rounded-[32px] p-8 md:p-12 text-center max-w-[1000px] mx-auto shadow-sm relative overflow-hidden transition-colors duration-500">
            <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-[0.02] pointer-events-none" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-orange mb-4 font-heading">
              Let’s Build Your Future, Together.
            </h2>
            <p className="text-sm md:text-base text-zinc-655 dark:text-zinc-400 leading-relaxed font-semibold max-w-[800px] mx-auto mb-2">
              At Skillsha, we don’t just teach skills — we build careers. Whether you want to become a developer, data analyst, tester, cloud expert, or digital marketer, our team is committed to helping you succeed.
            </p>
            <p className="text-base md:text-lg text-zinc-900 dark:text-white font-extrabold flex items-center justify-center gap-1.5 mt-4">
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
