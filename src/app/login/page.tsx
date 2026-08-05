"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [programInterest, setProgramInterest] = useState("AI Engineering Masterclass");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, programInterest })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("skillsha_user", JSON.stringify(data.user));
        if (data.token) localStorage.setItem("skillsha_token", data.token);
        router.push("/profile");
      } else {
        setErrorMsg(data.error || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("skillsha_user", JSON.stringify(data.user));
        if (data.token) localStorage.setItem("skillsha_token", data.token);
        router.push("/profile");
      } else {
        setErrorMsg(data.error || "Invalid credentials.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] dark:bg-[#070708] text-zinc-950 dark:text-white flex flex-col justify-between transition-colors duration-300">
      <Header />

      <main className="flex-1 flex items-center justify-center pt-28 pb-16 px-4 md:px-6">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-3xl shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 md:p-8 space-y-6">
          
          {/* Header Banner */}
          <div className="text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange">
              SkillSha Portal
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1 text-zinc-900 dark:text-white">
              {activeTab === "login" ? "Student Login" : "Create Account"}
            </h1>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed max-w-xs mx-auto">
              {activeTab === "login" 
                ? "Sign in to access your personal academic workspace syllabus trackers." 
                : "Register below to track curriculum items and verify milestone certifications."}
            </p>
          </div>

          {/* Toggle Tab */}
          <div className="bg-zinc-100 dark:bg-white/5 p-1 rounded-2xl flex gap-1 selection:bg-transparent">
            <button
              onClick={() => { setActiveTab("login"); setErrorMsg(""); }}
              className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                activeTab === "login"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setActiveTab("register"); setErrorMsg(""); }}
              className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                activeTab === "register"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              Register
            </button>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold rounded-xl text-center">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Authentication Forms */}
          {activeTab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.02] text-zinc-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                    Password
                  </label>
                  <button type="button" className="text-[9px] font-bold text-brand-orange hover:underline cursor-pointer border-none bg-transparent">
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.02] text-zinc-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-md shadow-brand-orange/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lavish"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.02] text-zinc-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.02] text-zinc-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.02] text-zinc-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Select Track
                </label>
                <select
                  value={programInterest}
                  onChange={(e) => setProgramInterest(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.02] text-zinc-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-orange"
                >
                  <option value="AI Engineering Masterclass">AI Engineering Masterclass</option>
                  <option value="Advanced UI/UX & Design Systems">Advanced UI/UX & Design Systems</option>
                  <option value="Data Science & Machine Learning">Data Science & Machine Learning</option>
                  <option value="Product Leadership & Growth">Product Leadership & Growth</option>
                  <option value="Algorithmic Trading & Quantitative Finance">Algorithmic Trading & Quantitative Finance</option>
                  <option value="Graphic Designing">Graphic Designing</option>
                  <option value="Mental Health & Habit Design">Mental Health & Habit Design</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-md shadow-brand-orange/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          )}

          {/* Social login divider */}
          <div className="pt-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-white/10"></div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Or connect with</span>
              <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-white/10"></div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "google", label: "Google", icon: "🌐" },
                { id: "apple", label: "Apple", icon: "🍏" },
                { id: "github", label: "GitHub", icon: "🐙" }
              ].map((prov) => (
                <button
                  key={prov.id}
                  type="button"
                  onClick={() => alert(`${prov.label} connection coming soon!`)}
                  className="py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/5 transition-all text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{prov.icon}</span>
                  <span className="text-zinc-600 dark:text-zinc-300">{prov.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
