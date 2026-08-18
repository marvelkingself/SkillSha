"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Blog {
  title: string;
  slug: string;
  category: string;
  keyword: string;
  seoScore: number;
  status: "draft" | "review" | "published" | "failed";
  createdAt: string;
  publishedAt?: string;
  excerpt: string;
  introduction: string;
  conclusion: string;
  metaTitle?: string;
  metaDescription?: string;
  sections?: { heading: string; level: number; content: string }[];
  faqs?: { question: string; answer: string }[];
  featuredImage?: string;
  featuredImageBase64?: string;
}

interface RunLog {
  _id: string;
  date: string;
  status: "running" | "completed" | "failed";
  blogsGenerated: number;
  blogsPublished: number;
  blogsFailed: number;
  topicsSelected: string[];
  logs: string[];
  errors: string[];
  startedAt: string;
}

interface AgentSettings {
  blogsPerDay: number;
  minWords: number;
  maxWords: number;
  publishingTime: string;
  autoPublish: boolean;
  targetCountry: string;
  targetLanguage: string;
  targetAudience: string;
  websiteNiche: string;
}

export default function BlogAgentDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(true);

  // Core Agent telemetry states
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [runs, setRuns] = useState<RunLog[]>([]);
  const [stats, setStats] = useState({
    totalPublished: 0,
    totalDraft: 0,
    totalReview: 0,
    avgSeoScore: 0,
    successRate: 100,
  });

  const [settings, setSettings] = useState<AgentSettings>({
    blogsPerDay: 10,
    minWords: 1000,
    maxWords: 2000,
    publishingTime: "09:00",
    autoPublish: true,
    targetCountry: "India",
    targetLanguage: "English",
    targetAudience: "Students, Career Switchers",
    websiteNiche: "IT Training",
  });

  // UI state managers
  const [activeTab, setActiveTab] = useState<"logs" | "blogs" | "settings">("logs");
  const [isTriggering, setIsTriggering] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [previewingBlog, setPreviewingBlog] = useState<Blog | null>(null);
  const [saveStatus, setSaveStatus] = useState("");

  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedKey = sessionStorage.getItem("skillsha_admin_key");
    if (savedKey === "skillsha-admin-secret-2026") {
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessKey === "skillsha-admin-secret-2026") {
      sessionStorage.setItem("skillsha_admin_key", accessKey);
      setIsAuthenticated(true);
      setAuthError("");
      fetchDashboardData();
    } else {
      setAuthError("Invalid access key credentials.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("skillsha_admin_key");
    setIsAuthenticated(false);
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    const key = "skillsha-admin-secret-2026";
    try {
      // 1. Fetch runs and stats
      const runsRes = await fetch("/api/blog-agent/runs", {
        headers: { "x-admin-secret": key },
      });
      const runsData = await runsRes.json();
      if (runsData.success) {
        setRuns(runsData.runs || []);
        setStats(runsData.stats);
      }

      // 2. Fetch blogs
      const blogsRes = await fetch("/api/blog-agent/manage", {
        headers: { "x-admin-secret": key },
      });
      const blogsData = await blogsRes.json();
      if (blogsData.success) {
        setBlogs(blogsData.blogs || []);
      }

      // 3. Fetch settings
      const settingsRes = await fetch("/api/blog-agent/settings", {
        headers: { "x-admin-secret": key },
      });
      const settingsData = await settingsRes.json();
      if (settingsData.success) {
        setSettings(settingsData.settings);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Poll for active runs if agent is running
  useEffect(() => {
    if (!isAuthenticated) return;
    const hasRunning = runs.some((r) => r.status === "running");
    if (!hasRunning && !isTriggering) return;

    const interval = setInterval(() => {
      fetchDashboardData();
    }, 4000);

    return () => clearInterval(interval);
  }, [runs, isTriggering, isAuthenticated]);

  // Scroll console log to bottom
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [runs]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("Saving configurations...");
    const key = "skillsha-admin-secret-2026";
    try {
      const res = await fetch("/api/blog-agent/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": key,
        },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus("Settings saved successfully!");
        setTimeout(() => setSaveStatus(""), 3050);
      } else {
        setSaveStatus(`Error: ${data.error}`);
      }
    } catch (err: any) {
      setSaveStatus(`Failed: ${err.message}`);
    }
  };

  const triggerAgentNow = async () => {
    setIsTriggering(true);
    const key = "skillsha-admin-secret-2026";
    try {
      const res = await fetch("/api/blog-agent/run", {
        method: "POST",
        headers: {
          "x-admin-secret": key,
        },
      });
      const data = await res.json();
      if (data.success) {
        // Optimistically prepend a running run log state
        const mockRun: RunLog = {
          _id: data.runId || "pending",
          date: new Date().toISOString().split("T")[0],
          status: "running",
          blogsGenerated: 0,
          blogsPublished: 0,
          blogsFailed: 0,
          topicsSelected: [],
          logs: [`[${new Date().toLocaleTimeString()}] Trigger received. Initializing loops...`],
          errors: [],
          startedAt: new Date().toISOString(),
        };
        setRuns((prev) => [mockRun, ...prev]);
        setActiveTab("logs");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTriggering(false);
    }
  };

  const stopAgentNow = async () => {
    const key = "skillsha-admin-secret-2026";
    try {
      await fetch("/api/blog-agent/manage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": key,
        },
        body: JSON.stringify({ action: "stop" }),
      });
      fetchDashboardData();
    } catch (err) {
      console.error("Failed to stop agent:", err);
    }
  };

  const handleBlogAction = async (slug: string, action: string, blogData?: any) => {
    const key = "skillsha-admin-secret-2026";
    try {
      const res = await fetch("/api/blog-agent/manage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": key,
        },
        body: JSON.stringify({ slug, action, blogData }),
      });
      const data = await res.json();
      if (data.success) {
        fetchDashboardData();
        setEditingBlog(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#050505] flex items-center justify-center px-4 font-sans text-white">
        <div className="noise-overlay" />
        <div className="w-full max-w-[420px] bg-zinc-950/70 border border-zinc-800/80 rounded-3xl p-8 backdrop-blur-md relative z-10 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-[28px] font-black tracking-tight text-white">
              Skill<span className="text-brand-orange">Sha</span>
            </h1>
            <p className="text-[12px] text-zinc-500 uppercase tracking-widest font-bold mt-1">
              AI Blog Agent Authentication
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                Administrator Access Secret
              </label>
              <input
                type="password"
                required
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white rounded-xl text-sm focus:outline-none focus:border-brand-orange font-sans placeholder-zinc-700"
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-500 text-left font-sans">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-brand-orange text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-orange/15 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
            >
              Verify Credentials
            </button>
          </form>
        </div>
      </main>
    );
  }

  const activeRun = runs.length > 0 ? runs[0] : null;

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-16 font-sans">
      <div className="noise-overlay" />
      <div className="max-w-[1300px] mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-900 pb-6 mb-8 select-none">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 text-[8.5px] font-bold tracking-widest bg-brand-orange/20 text-brand-orange border border-brand-orange/30 rounded uppercase animate-pulse">
                AUTOMATION ACTIVE
              </span>
              <span className="text-zinc-500 text-xs">•</span>
              <span className="text-zinc-500 text-xs font-sans">Agent Operator Panel v2.6</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              AI Blog Automation Hub.
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            {activeRun?.status === "running" ? (
              <button
                onClick={stopAgentNow}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all select-none cursor-pointer flex items-center gap-2 shadow-md shadow-rose-600/20"
              >
                <span className="material-symbols-outlined text-[14px]">stop</span>
                Stop Agent
              </button>
            ) : (
              <button
                onClick={triggerAgentNow}
                disabled={isTriggering}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all select-none cursor-pointer flex items-center gap-2 ${
                  isTriggering
                    ? "bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed"
                    : "bg-brand-orange text-white hover:scale-[1.02] shadow-md shadow-brand-orange/15"
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                Run Agent Now
              </button>
            )}
            
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 bg-zinc-950 border border-zinc-850 text-zinc-400 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Telemetry KPIs Row */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-2xl">
            <span className="text-[8.5px] uppercase font-bold text-zinc-500 tracking-wider">Total Published</span>
            <p className="text-2xl font-black tracking-tight mt-1 text-white">{stats.totalPublished}</p>
          </div>
          <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-2xl">
            <span className="text-[8.5px] uppercase font-bold text-zinc-500 tracking-wider">Reviews Pending</span>
            <p className="text-2xl font-black tracking-tight mt-1 text-amber-500">{stats.totalReview}</p>
          </div>
          <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-2xl">
            <span className="text-[8.5px] uppercase font-bold text-zinc-500 tracking-wider">Failed Attempts</span>
            <p className="text-2xl font-black tracking-tight mt-1 text-rose-500">{stats.totalDraft}</p>
          </div>
          <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-2xl">
            <span className="text-[8.5px] uppercase font-bold text-zinc-500 tracking-wider">Avg SEO Score</span>
            <p className="text-2xl font-black tracking-tight mt-1 text-emerald-400">{stats.avgSeoScore}/100</p>
          </div>
          <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-2xl">
            <span className="text-[8.5px] uppercase font-bold text-zinc-500 tracking-wider">Job Success Rate</span>
            <p className="text-2xl font-black tracking-tight mt-1 text-indigo-400">{stats.successRate}%</p>
          </div>
        </section>

        {/* Tabs navigation */}
        <div className="flex border-b border-zinc-900 mb-6 gap-2">
          {["logs", "blogs", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                activeTab === tab
                  ? "border-brand-orange text-brand-orange"
                  : "border-transparent text-zinc-500 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab 1: Logs Output Console */}
        {activeTab === "logs" && (
          <section className="space-y-6">
            {activeRun ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Status Column */}
                <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-3xl flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-4">
                      Execution State
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-500">Run ID:</span>
                        <span className="font-mono text-zinc-300">{activeRun._id}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-500">Started:</span>
                        <span className="text-zinc-300">{new Date(activeRun.startedAt).toLocaleTimeString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-500">Run Date:</span>
                        <span className="text-zinc-300">{activeRun.date}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-500">Status:</span>
                        <span className={`px-2 py-0.5 rounded font-bold uppercase text-[9px] ${
                          activeRun.status === "running"
                            ? "bg-brand-orange/20 text-brand-orange"
                            : activeRun.status === "completed"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-rose-500/20 text-rose-500"
                        }`}>
                          {activeRun.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-zinc-900 space-y-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-400 font-bold">Generated:</span>
                        <span className="text-white font-mono">{activeRun.blogsGenerated} / {settings.blogsPerDay}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-emerald-400 font-bold">Published:</span>
                        <span className="text-emerald-400 font-mono">{activeRun.blogsPublished}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-rose-500 font-bold">Failed:</span>
                        <span className="text-rose-500 font-mono">{activeRun.blogsFailed}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-[11px] text-zinc-500 leading-relaxed font-sans">
                    * Next run scheduled automatically via cron according to publishing time configurations.
                  </div>
                </div>

                {/* Live Console Output Box */}
                <div className="lg:col-span-2 flex flex-col h-full bg-black border border-zinc-900 rounded-3xl overflow-hidden min-h-[400px]">
                  <div className="px-5 py-3 bg-zinc-950 border-b border-zinc-900 flex justify-between items-center select-none">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      Live Telemetry Output
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
                      <span className="text-[9px] text-zinc-500 font-mono">STREAMING</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-5 overflow-y-auto font-mono text-[11.5px] text-zinc-400 space-y-2 max-h-[350px]">
                    {activeRun.logs.map((log, index) => (
                      <div key={index} className="leading-relaxed border-b border-zinc-950 pb-1">
                        {log}
                      </div>
                    ))}
                    {activeRun.status === "running" && (
                      <div className="text-brand-orange flex items-center gap-2 pt-1 animate-pulse">
                        <span className="animate-spin text-[12px]">⌛</span>
                        Agent is writing content files...
                      </div>
                    )}
                    <div ref={consoleEndRef} />
                  </div>
                </div>

              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-zinc-800 rounded-3xl">
                <span className="material-symbols-outlined text-[36px] text-zinc-600 mb-2">terminal</span>
                <p className="text-zinc-400 text-sm">No agent run logs logged in the database yet.</p>
              </div>
            )}
          </section>
        )}

        {/* Tab 2: Blog Management List */}
        {activeTab === "blogs" && (
          <section className="space-y-6">
            
            {/* Blogs Table */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden">
              <div className="p-5 border-b border-zinc-900 flex justify-between items-center select-none">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  AI Generated Articles ({blogs.length})
                </h3>
              </div>

              {blogs.length === 0 ? (
                <div className="text-center py-16 text-zinc-500">
                  No generated blogs discovered in the project directories.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-900 text-zinc-500 font-bold uppercase tracking-wider text-[10px] bg-zinc-900/10">
                        <th className="p-4 pl-6">Title</th>
                        <th className="p-4">Slug</th>
                        <th className="p-4">Primary Keyword</th>
                        <th className="p-4">SEO Score</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 pr-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                      {blogs.map((blog) => (
                        <tr key={blog.slug} className="hover:bg-zinc-900/20">
                          <td className="p-4 pl-6 font-bold text-white max-w-[280px] truncate">
                            {blog.title}
                          </td>
                          <td className="p-4 font-mono text-zinc-400">
                            /blog/{blog.slug}
                          </td>
                          <td className="p-4 text-zinc-300">
                            {blog.keyword}
                          </td>
                          <td className="p-4">
                            <span className={`font-bold ${
                              blog.seoScore >= 90
                                ? "text-emerald-400"
                                : blog.seoScore >= 80
                                ? "text-amber-500"
                                : "text-rose-500"
                            }`}>
                              {blog.seoScore}/100
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded font-bold uppercase text-[9px] ${
                              blog.status === "published"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : blog.status === "review"
                                ? "bg-amber-500/20 text-amber-500"
                                : "bg-rose-500/20 text-rose-500"
                            }`}>
                              {blog.status}
                            </span>
                          </td>
                          <td className="p-4 pr-6 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              onClick={() => setPreviewingBlog(blog)}
                              className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded text-[10px] cursor-pointer"
                            >
                              Preview
                            </button>
                            
                            <button
                              onClick={() => setEditingBlog(blog)}
                              className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded text-[10px] cursor-pointer"
                            >
                              Edit
                            </button>
                            
                            {blog.status === "review" && (
                              <button
                                onClick={() => handleBlogAction(blog.slug, "publish")}
                                className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded text-[10px] cursor-pointer"
                              >
                                Publish
                              </button>
                            )}

                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete /blog/${blog.slug}?`)) {
                                  handleBlogAction(blog.slug, "delete");
                                }
                              }}
                              className="px-2 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded text-[10px] cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Tab 3: Settings Panel */}
        {activeTab === "settings" && (
          <section className="max-w-[700px]">
            <form onSubmit={handleSaveSettings} className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-900 pb-3">
                Agent Configuration parameters
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                    Blogs Per Day
                  </label>
                  <input
                    type="number"
                    value={settings.blogsPerDay}
                    onChange={(e) => setSettings({ ...settings, blogsPerDay: parseInt(e.target.value) || 10 })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-850 rounded-xl text-xs focus:outline-none focus:border-brand-orange"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                    Publishing Time (HH:MM)
                  </label>
                  <input
                    type="text"
                    value={settings.publishingTime}
                    onChange={(e) => setSettings({ ...settings, publishingTime: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-850 rounded-xl text-xs focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                    Min Words
                  </label>
                  <input
                    type="number"
                    value={settings.minWords}
                    onChange={(e) => setSettings({ ...settings, minWords: parseInt(e.target.value) || 1000 })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-850 rounded-xl text-xs focus:outline-none focus:border-brand-orange"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                    Max Words
                  </label>
                  <input
                    type="number"
                    value={settings.maxWords}
                    onChange={(e) => setSettings({ ...settings, maxWords: parseInt(e.target.value) || 2000 })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-850 rounded-xl text-xs focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={settings.targetAudience}
                  onChange={(e) => setSettings({ ...settings, targetAudience: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-850 rounded-xl text-xs focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                  Website Niche
                </label>
                <textarea
                  rows={2}
                  value={settings.websiteNiche}
                  onChange={(e) => setSettings({ ...settings, websiteNiche: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-850 rounded-xl text-xs focus:outline-none focus:border-brand-orange font-sans leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between border-t border-zinc-900 pt-4 mt-6 select-none">
                <div>
                  <span className="text-[11px] font-bold block">Auto Publish Blogs</span>
                  <span className="text-[9.5px] text-zinc-500 block mt-0.5">Toggle to skip review step and publish blogs live instantly.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, autoPublish: !settings.autoPublish })}
                  className={`w-11 h-6 rounded-full p-1 transition-all ${
                    settings.autoPublish ? "bg-brand-orange flex justify-end" : "bg-zinc-800 flex justify-start"
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
                </button>
              </div>

              <div className="flex items-center justify-between border-t border-zinc-900 pt-5 mt-4">
                <span className="text-xs text-brand-orange font-bold font-sans">{saveStatus}</span>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-orange text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-orange/10 hover:scale-[1.02] cursor-pointer"
                >
                  Save Configurations
                </button>
              </div>

            </form>
          </section>
        )}

      </div>

      {/* ──────────────────────────────────────────────────────── */}
      {/* MODAL EDIT PANEL OVERLAY */}
      {/* ──────────────────────────────────────────────────────── */}
      {editingBlog && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-[800px] bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto relative text-white">
            <h3 className="text-base font-black tracking-tight mb-4 border-b border-zinc-900 pb-3 flex justify-between">
              <span>Edit Article Details</span>
              <button 
                onClick={() => setEditingBlog(null)} 
                className="text-zinc-500 hover:text-white text-xs cursor-pointer font-sans"
              >
                ✕ Close
              </button>
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">Title</label>
                <input
                  type="text"
                  value={editingBlog.title}
                  onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">Meta Description</label>
                <textarea
                  rows={2}
                  value={editingBlog.metaDescription}
                  onChange={(e) => setEditingBlog({ ...editingBlog, metaDescription: e.target.value })}
                  className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white leading-relaxed font-sans"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">Excerpt</label>
                <textarea
                  rows={2}
                  value={editingBlog.excerpt}
                  onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                  className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white leading-relaxed font-sans"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">Introduction Text</label>
                <textarea
                  rows={4}
                  value={editingBlog.introduction}
                  onChange={(e) => setEditingBlog({ ...editingBlog, introduction: e.target.value })}
                  className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white leading-relaxed font-sans"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">Conclusion Text</label>
                <textarea
                  rows={3}
                  value={editingBlog.conclusion}
                  onChange={(e) => setEditingBlog({ ...editingBlog, conclusion: e.target.value })}
                  className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white leading-relaxed font-sans"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 border-t border-zinc-900 pt-5 select-none">
              <button
                onClick={() => setEditingBlog(null)}
                className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-450 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              
              <button
                onClick={() => handleBlogAction(editingBlog.slug, "edit", editingBlog)}
                className="px-6 py-2 bg-brand-orange text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-orange/10 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────── */}
      {/* MODAL PREVIEW PANEL OVERLAY */}
      {/* ──────────────────────────────────────────────────────── */}
      {previewingBlog && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-[850px] bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto relative text-white">
            <h3 className="text-base font-black tracking-tight mb-4 border-b border-zinc-900 pb-3 flex justify-between select-none">
              <span>Dynamic Blog Preview</span>
              <button 
                onClick={() => setPreviewingBlog(null)} 
                className="text-zinc-500 hover:text-white text-xs cursor-pointer font-sans"
              >
                ✕ Close
              </button>
            </h3>
            
            {/* Styled Mockup matching real blog page */}
            <div className="bg-[#FAF9F6] text-zinc-900 p-6 rounded-2xl max-h-[60vh] overflow-y-auto text-left prose font-sans">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[9px] font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded border border-brand-orange/10">
                  {previewingBlog.category}
                </span>
                <span className="text-[10px] text-zinc-450">• 5 min read</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 leading-tight mb-4">
                {previewingBlog.title}
              </h2>
              <p className="text-xs text-zinc-450 border-y border-zinc-200 py-3 my-4 italic">
                {previewingBlog.excerpt}
              </p>
              
              {(previewingBlog.featuredImageBase64 || previewingBlog.featuredImage) && (
                <div className="my-6 aspect-video overflow-hidden rounded-xl bg-zinc-100 relative">
                  <img
                    src={previewingBlog.featuredImageBase64 || previewingBlog.featuredImage}
                    alt={previewingBlog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <p className="text-sm leading-relaxed mb-6 font-sans whitespace-pre-wrap">{previewingBlog.introduction}</p>

              {previewingBlog.sections && previewingBlog.sections.map((sec, idx) => (
                <div key={idx} className="my-5">
                  <h4 className="text-base font-bold text-zinc-900 mb-2">{sec.heading}</h4>
                  <div className="text-xs leading-relaxed text-zinc-650" dangerouslySetInnerHTML={{ __html: sec.content }} />
                </div>
              ))}

              <p className="text-sm leading-relaxed mt-6 border-t border-zinc-200 pt-4 whitespace-pre-wrap">{previewingBlog.conclusion}</p>
            </div>

            <div className="flex justify-end gap-3 mt-6 border-t border-zinc-900 pt-5 select-none">
              <button
                onClick={() => setPreviewingBlog(null)}
                className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-450 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Close Preview
              </button>
              
              {previewingBlog.status === "review" && (
                <button
                  onClick={() => {
                    handleBlogAction(previewingBlog.slug, "publish");
                    setPreviewingBlog(null);
                  }}
                  className="px-6 py-2 bg-brand-orange text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-orange/10 cursor-pointer"
                >
                  Approve &amp; Publish
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
