"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  programInterest: string;
}

interface PaymentRecord {
  id: string;
  program: string;
  amountType: string;
  total: number;
  paymentMethod: string;
  createdAt: string;
}

interface BookingRecord {
  id: string;
  dateTime: string;
}

interface CertificateRecord {
  id: string;
  credentialId: string;
  courseName: string;
  dateIssued: string;
  grade: string;
}

interface CurriculumItem {
  id: string;
  course_id: string;
  module_title: string;
  lesson_title: string;
  lesson_content: string;
  order_index: number;
}

interface AssignmentItem {
  id: string;
  course_id: string;
  title: string;
  description: string;
}

interface SubmissionRecord {
  id: string;
  fileUrl: string;
  grade: string | null;
  feedback: string | null;
  submittedAt: string;
  assignment: {
    id: string;
    title: string;
    description: string;
  };
}

interface BulletinItem {
  id: string;
  message: string;
  created_at: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  
  // Dashboard Tabs: courses, accomplishments, billing, assignments, settings
  const [activeTab, setActiveTab] = useState<"courses" | "accomplishments" | "billing" | "assignments" | "settings">("courses");

  // Database records
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);

  // Institutional curriculum and student progress states
  const [curriculum, setCurriculum] = useState<CurriculumItem[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [bulletins, setBulletins] = useState<BulletinItem[]>([]);

  // Active lesson reading state
  const [activeReadingLesson, setActiveReadingLesson] = useState<CurriculumItem | null>(null);

  // Homework Assignments and Submissions state
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [homeworkInputs, setHomeworkInputs] = useState<{ [assignmentId: string]: string }>({});
  const [isSubmittingHomework, setIsSubmittingHomework] = useState<string | null>(null);

  // AI Tutor chat companion state
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiHistory, setAiHistory] = useState<{ role: "user" | "model"; text: string }[]>([]);
  const [aiInput, setAiInput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Live Presentation Sync Room state
  const [livePresentation, setLivePresentation] = useState<{
    presentationId: string;
    title: string;
    slides: any[];
    slideIndex: number;
  } | null>(null);
  const [isJoinedLiveRoom, setIsJoinedLiveRoom] = useState(false);
  const [activePoll, setActivePoll] = useState<{ question: string; options: string[] } | null>(null);
  const [hasVotedPoll, setHasVotedPoll] = useState(false);
  const [pollVotes, setPollVotes] = useState<{ [option: string]: number }>({});

  // Form edit states
  const [editName, setEditName] = useState("");
  const [editTrack, setEditTrack] = useState("");
  const [editBio, setEditBio] = useState("AI Enthusiast and Lifelong Learner.");
  const [editLinkedin, setEditLinkedin] = useState("");
  const [editGithub, setEditGithub] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isUpdating, setIsUpdating] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  // Get active course key based on user program
  const getCourseId = () => {
    if (!user) return "ai-engineering";
    const track = user.programInterest?.toLowerCase() || "";
    if (track.includes("design") || track.includes("ui")) return "ui-ux";
    if (track.includes("data") || track.includes("machine")) return "data-science";
    if (track.includes("product") || track.includes("leadership")) return "product-leadership";
    return "ai-engineering";
  };

  useEffect(() => {
    // Retrieve user session
    const storedUser = localStorage.getItem("skillsha_user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setEditName(parsed.name);
        setEditTrack(parsed.programInterest);
        fetchDashboardData();
      } catch (e) {
        console.error(e);
      }
    }

    // Sync tab parameter from URL search params
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab && ["courses", "accomplishments", "billing", "assignments", "settings"].includes(tab)) {
        setActiveTab(tab as any);
      }
    }
  }, []);

  // Fetch course-specific data once user session is loaded
  useEffect(() => {
    if (!user) return;
    const courseId = getCourseId();
    fetchCurriculum(courseId);
    fetchProgress(courseId);
    fetchBulletins(courseId);
    fetchAssignmentsAndSubmissions(courseId);
    setupRealtimeClassroomSync(courseId);
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("skillsha_token");
      const res = await fetch(`/api/student/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPayments(data.payments || []);
        setBookings(data.bookings || []);
        setCertificates(data.certificates || []);
      }
    } catch (err) {
      console.error("Dashboard fetching error:", err);
    }
  };

  const fetchCurriculum = async (courseId: string) => {
    try {
      const res = await fetch(`/api/teacher/curriculum?courseId=${courseId}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setCurriculum(data.curriculum || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProgress = async (courseId: string) => {
    try {
      const token = localStorage.getItem("skillsha_token");
      const res = await fetch(`/api/student/progress?courseId=${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success && data.progress) {
        setCompletedLessons(data.progress.completed_lessons || []);
        setProgressPercent(data.progress.progress_percentage || 0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBulletins = async (courseId: string) => {
    try {
      const res = await fetch(`/api/teacher/bulletin?courseId=${courseId}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setBulletins(data.bulletins || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAssignmentsAndSubmissions = async (courseId: string) => {
    try {
      const token = localStorage.getItem("skillsha_token");
      const res = await fetch(`/api/student/submissions?courseId=${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAssignments(data.assignments || []);
        setSubmissions(data.submissions || []);
        
        // Prefill homework inputs with existing submission code if present
        const inputs: { [id: string]: string } = {};
        (data.submissions || []).forEach((s: any) => {
          inputs[s.assignment.id] = s.fileUrl;
        });
        setHomeworkInputs(inputs);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Setup Realtime sync with Teacher presenter channel
  const setupRealtimeClassroomSync = (courseId: string) => {
    const channel = supabase.channel(`classroom:${courseId}`);

    channel
      .on("broadcast", { event: "slide-changed" }, (payload) => {
        // Teacher is live! Update slide information
        setLivePresentation({
          presentationId: payload.payload.presentationId,
          title: payload.payload.title,
          slides: payload.payload.slides,
          slideIndex: payload.payload.slideIndex,
        });
      })
      .on("broadcast", { event: "push-poll" }, (payload) => {
        // Teacher pushed a slide poll
        setActivePoll({
          question: payload.payload.question,
          options: payload.payload.options,
        });
        setHasVotedPoll(false);
        // Reset votes
        const initialVotes: { [opt: string]: number } = {};
        payload.payload.options.forEach((o: string) => (initialVotes[o] = 0));
        setPollVotes(initialVotes);
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  };

  const handleToggleLessonComplete = async (lessonId: string, isCompleted: boolean) => {
    try {
      const token = localStorage.getItem("skillsha_token");
      const courseId = getCourseId();
      const res = await fetch(`/api/student/progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseId,
          lessonId,
          completed: isCompleted,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setCompletedLessons(data.progress.completed_lessons || []);
        setProgressPercent(data.progress.progress_percentage || 0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleHomeworkSubmit = async (assignmentId: string) => {
    const inputVal = homeworkInputs[assignmentId];
    if (!inputVal || !inputVal.trim()) return;

    setIsSubmittingHomework(assignmentId);
    try {
      const token = localStorage.getItem("skillsha_token");
      const res = await fetch(`/api/student/submissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          assignmentId,
          submissionContent: inputVal,
        }),
      });

      if (res.ok) {
        alert("Homework submitted successfully! The instructor can now evaluate it.");
        fetchAssignmentsAndSubmissions(getCourseId());
      } else {
        const err = await res.json();
        alert(err.error || "Failed to upload homework.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingHomework(null);
    }
  };

  // -------------------------------------------------------------
  // AI TUTOR COMPANION SIDEBAR CHAT HANDLERS
  // -------------------------------------------------------------
  const handleAiSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userMsg = aiInput;
    setAiInput("");
    setAiHistory((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsAiLoading(true);

    try {
      const token = localStorage.getItem("skillsha_token");
      const res = await fetch(`/api/student/ai-assistant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseId: getCourseId(),
          message: userMsg,
          chatHistory: aiHistory,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAiHistory((prev) => [...prev, { role: "model", text: data.reply }]);
      } else {
        setAiHistory((prev) => [
          ...prev,
          { role: "model", text: "⚠️ Error contacting AI Tutor. Please verify environment keys." },
        ]);
      }
    } catch (err) {
      console.error(err);
      setAiHistory((prev) => [
        ...prev,
        { role: "model", text: "⚠️ Connection timeout. Try sending again." },
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // -------------------------------------------------------------
  // POLL OPTION SELECTION
  // -------------------------------------------------------------
  const handleVotePoll = (option: string) => {
    setHasVotedPoll(true);
    setPollVotes((prev) => {
      const updated = { ...prev };
      updated[option] = (updated[option] || 0) + 1;
      return updated;
    });
  };

  // Profile configurations save
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg("");
    setIsUpdating(true);

    try {
      const token = localStorage.getItem("skillsha_token");
      const res = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editName,
          programInterest: editTrack,
          password: newPassword || undefined,
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        const updated = { ...user, ...data.user };
        localStorage.setItem("skillsha_user", JSON.stringify(updated));
        setUser(updated);
        setStatusMsg("✅ Settings saved successfully!");
        setNewPassword("");
        fetchDashboardData();
      } else {
        setStatusMsg("❌ " + (data.error || "Update failed."));
      }
    } catch (err) {
      console.error(err);
      setStatusMsg("❌ Connection error. Try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("skillsha_user");
    localStorage.removeItem("skillsha_token");
    localStorage.removeItem("skillsha_teacher_secret");
    setUser(null);
    window.location.href = "/login";
  };

  const triggerCounselingModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("openCounselingModal"));
    }
  };

  return (
    <div className="min-h-screen text-zinc-950 dark:text-white transition-colors duration-300 bg-[#FAF9F6] dark:bg-[#050505]">
      
      {/* Noise Overlay */}
      <div className="noise-overlay"></div>
      
      {/* 1. DESKTOP / TABLET DASHBOARD LAYOUT */}
      <div className="hidden md:flex flex-col min-h-screen relative z-10">
        <Header />

        {/* Dashboard Banner */}
        <section className="bg-white/40 dark:bg-[#0c0c0c]/30 backdrop-blur-md border-b border-zinc-200/50 dark:border-white/5 text-zinc-900 dark:text-white pt-32 pb-10 px-6 transition-colors">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest bg-zinc-200/50 dark:bg-white/10 px-3 py-1 rounded-full text-zinc-500 dark:text-zinc-400">
                Academic Portal
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2.5">
                Welcome back, <span className="text-gradient font-black">{user ? user.name : "Student"}</span>
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 font-medium">
                Track your syllabus status and verified academic achievements.
              </p>
            </div>
            {user && (
              <div className="flex gap-3">
                <button
                  onClick={() => setIsAiOpen(!isAiOpen)}
                  className="px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  💬 Ask AI Tutor
                </button>
                <button 
                  onClick={triggerCounselingModal}
                  className="px-5 py-2.5 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shadow-brand-orange/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  📅 Book Advisor Call
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-5 py-2.5 bg-transparent border border-zinc-200 dark:border-white/20 text-zinc-700 dark:text-white hover:bg-zinc-150 dark:hover:bg-white/5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Live Presentation sync bar banner */}
        {livePresentation && (
          <section className="bg-brand-orange/15 border-b border-brand-orange/30 p-4 text-center sticky top-[72px] z-40 backdrop-blur-md">
            <div className="max-w-[1200px] mx-auto flex justify-between items-center">
              <span className="text-xs font-extrabold text-brand-orange animate-pulse">
                🎙️ Live Interactive Lecture Room is Active: "{livePresentation.title}"
              </span>
              <button
                onClick={() => setIsJoinedLiveRoom(true)}
                className="px-4 py-1.5 bg-brand-orange text-white text-xs font-bold uppercase rounded-xl hover:scale-102 transition-transform"
              >
                Join Lecture Slide Syncer
              </button>
            </div>
          </section>
        )}

        {/* Horizontal Navigation Tabs */}
        <section className="bg-[#FAF9F6]/80 dark:bg-[#050505]/80 backdrop-blur-md border-b border-zinc-200/50 dark:border-white/5 sticky top-[72px] z-30 shadow-xs">
          <div className="max-w-[1200px] mx-auto px-6 flex gap-8 overflow-x-auto selection:bg-transparent">
            {[
              { id: "courses", label: "My Roadmap Syllabus", icon: "📚" },
              { id: "assignments", label: "Homework Projects", icon: "✍️" },
              { id: "accomplishments", label: "Accomplishments", icon: "🏆" },
              { id: "billing", label: "Payments & Purchases", icon: "💳" },
              { id: "settings", label: "Profile Settings", icon: "⚙️" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === tab.id
                    ? "border-brand-orange text-brand-orange"
                    : "border-transparent text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Content Body Grid */}
        <main className="max-w-[1200px] mx-auto px-6 py-12 flex-1 w-full relative">
          {!user ? (
            <div className="max-w-md mx-auto glass-panel border border-zinc-200/50 dark:border-white/5 rounded-2xl p-8 text-center shadow-lg">
              <span className="text-4xl block mb-3">🎓</span>
              <h2 className="text-xl font-bold tracking-tight">Academic Console Locked</h2>
              <p className="text-xs text-zinc-400 mt-1 mb-6">Log in to review curriculum items.</p>
              <a href="/login" className="inline-block w-full py-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold uppercase tracking-wider text-center">
                Sign In to Console
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Sidebar Summary */}
              <aside className="lg:col-span-4 space-y-6">
                <div className="glass-panel border border-zinc-200/50 dark:border-white/5 rounded-2xl p-6 shadow-xs text-center">
                  <div className="w-20 h-20 bg-gradient-to-tr from-brand-orange to-brand-red rounded-full flex items-center justify-center text-white text-3xl font-extrabold mx-auto mb-4 shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{user.name}</h3>
                  <span className="text-xs text-zinc-400 font-medium block mt-0.5">{user.email}</span>
                  
                  <div className="mt-6 pt-6 border-t border-zinc-200/50 dark:border-white/5 space-y-3 text-left">
                    <div>
                      <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider block">Bio</span>
                      <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-1 leading-relaxed">{editBio}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider block">Learning Objectives</span>
                      <span className="inline-block mt-1 text-xs font-bold text-brand-orange">🎯 {user.programInterest}</span>
                    </div>
                  </div>
                </div>

                {/* Class bulletin Board */}
                <div className="glass-panel border border-zinc-200/50 dark:border-white/5 rounded-2xl p-6 shadow-xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">📢 Class Announcements</h4>
                  {bulletins.length === 0 ? (
                    <p className="text-xs text-zinc-500">No active school announcements.</p>
                  ) : (
                    <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                      {bulletins.map((b) => (
                        <div key={b.id} className="text-xs border-b border-zinc-200/20 dark:border-white/5 pb-2.5 last:border-0 last:pb-0">
                          <p className="font-semibold text-zinc-700 dark:text-zinc-300">{b.message}</p>
                          <span className="text-[9px] text-zinc-400 block mt-1 font-mono">{new Date(b.created_at).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Professional social handles */}
                <div className="glass-panel border border-zinc-200/50 dark:border-white/5 rounded-2xl p-6 shadow-xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">Professional Handles</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1">LinkedIn Profile</label>
                      <input type="text" placeholder="linkedin.com/in/username" value={editLinkedin} onChange={(e) => setEditLinkedin(e.target.value)} className="w-full px-3 py-2.5 border border-zinc-200/50 dark:border-white/10 rounded-xl bg-white/50 dark:bg-white/[0.02] text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-orange text-zinc-800 dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1">GitHub Username</label>
                      <input type="text" placeholder="github.com/username" value={editGithub} onChange={(e) => setEditGithub(e.target.value)} className="w-full px-3 py-2.5 border border-zinc-200/50 dark:border-white/10 rounded-xl bg-white/50 dark:bg-white/[0.02] text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-orange text-zinc-800 dark:text-white" />
                    </div>
                  </div>
                </div>
              </aside>

              {/* Workspace Right Panel */}
              <section className="lg:col-span-8 space-y-6">
                
                {/* 1. COURSES TAB (timeline structure) */}
                {activeTab === "courses" && (
                  <div className="space-y-6 animate-reveal active">
                    
                    {/* Header Progress Card */}
                    <div className="glass-panel border border-zinc-200/50 dark:border-white/5 rounded-2xl p-6 shadow-xs bg-white/40 dark:bg-[#0c0c0c]/40">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <span className="text-[9px] font-bold text-brand-orange uppercase tracking-wider block">Currently Enrolled</span>
                          <h3 className="text-xl font-black mt-1 leading-tight">{user.programInterest}</h3>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-[10px] text-zinc-400 block font-semibold">Course Progress</span>
                            <span className="text-sm font-black text-brand-orange">{progressPercent}%</span>
                          </div>
                          <div className="w-24 bg-zinc-200 dark:bg-white/10 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-brand-orange h-full" style={{ width: `${progressPercent}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Lesson Timeline Display */}
                    <div className="glass-panel border border-zinc-200/50 dark:border-white/5 rounded-2xl p-6 shadow-xs space-y-6">
                      <h4 className="text-sm font-black uppercase tracking-wider text-zinc-400">Interactive Syllabus Timeline</h4>
                      
                      {curriculum.length === 0 ? (
                        <div className="text-center py-12 border border-dashed border-zinc-200 dark:border-white/10 rounded-xl">
                          <span className="text-3xl block mb-2">📚</span>
                          <p className="text-xs text-zinc-500">Curriculum is being planned by the school teachers.</p>
                        </div>
                      ) : (
                        <div className="relative border-l-2 border-zinc-200 dark:border-white/10 pl-6 ml-3 space-y-8">
                          {curriculum.map((lesson) => {
                            const isDone = completedLessons.includes(lesson.id);
                            return (
                              <div key={lesson.id} className="relative group">
                                {/* Bullet indicator */}
                                <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                                  isDone 
                                    ? "bg-brand-orange border-brand-orange text-white" 
                                    : "bg-[#FAF9F6] dark:bg-[#050505] border-zinc-300 dark:border-zinc-700"
                                }`}>
                                  {isDone && <span className="text-[9px]">✓</span>}
                                </div>

                                <div className="p-4 border border-zinc-200/50 dark:border-white/5 bg-white/20 dark:bg-zinc-900/20 rounded-xl hover:bg-white/50 dark:hover:bg-zinc-900/50 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                                  <div className="cursor-pointer flex-1" onClick={() => setActiveReadingLesson(lesson)}>
                                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{lesson.module_title}</span>
                                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white mt-1 group-hover:text-brand-orange transition-colors">
                                      {lesson.lesson_title}
                                    </h4>
                                  </div>
                                  
                                  <button
                                    onClick={() => handleToggleLessonComplete(lesson.id, !isDone)}
                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                                      isDone 
                                        ? "bg-zinc-100 dark:bg-white/5 text-zinc-400 hover:text-rose-500" 
                                        : "bg-brand-orange/10 text-brand-orange border border-brand-orange/20 hover:bg-brand-orange/20"
                                    }`}
                                  >
                                    {isDone ? "Completed" : "Mark Done"}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 2. ASSIGNMENTS & HOMEWORK SUBMISSIONS TAB */}
                {activeTab === "assignments" && (
                  <div className="glass-panel border border-zinc-200/50 dark:border-white/5 rounded-2xl p-6 shadow-xs animate-reveal active space-y-6">
                    <h2 className="text-lg font-bold">Academic Homework Submissions</h2>
                    
                    {assignments.length === 0 ? (
                      <div className="text-center py-12 border border-dashed border-zinc-200 dark:border-white/10 rounded-2xl">
                        <span className="text-3xl block mb-2">✍️</span>
                        <p className="text-xs text-zinc-500">No active homework assignments for this course track.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {assignments.map((asg) => {
                          const existingSub = submissions.find((s) => s.assignment.id === asg.id);
                          return (
                            <div key={asg.id} className="p-5 border border-zinc-200/50 dark:border-white/5 bg-white/20 dark:bg-zinc-900/50 rounded-2xl space-y-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-base font-extrabold text-zinc-900 dark:text-white">{asg.title}</h3>
                                  <p className="text-xs text-zinc-500 mt-1">{asg.description}</p>
                                </div>
                                <div>
                                  {existingSub ? (
                                    existingSub.grade ? (
                                      <span className="text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-500 px-2.5 py-0.5 rounded-full">
                                        Grade: {existingSub.grade}
                                      </span>
                                    ) : (
                                      <span className="text-[10px] font-extrabold uppercase bg-amber-500/10 text-amber-500 px-2.5 py-0.5 rounded-full">
                                        Submitted
                                      </span>
                                    )
                                  ) : (
                                    <span className="text-[10px] font-extrabold uppercase bg-rose-500/10 text-rose-500 px-2.5 py-0.5 rounded-full">
                                      Missing
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Form submit input code */}
                              <div className="space-y-2">
                                <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                                  Your Solution (Paste Python/JS code or text answer)
                                </label>
                                <textarea
                                  rows={4}
                                  value={homeworkInputs[asg.id] || ""}
                                  onChange={(e) =>
                                    setHomeworkInputs({
                                      ...homeworkInputs,
                                      [asg.id]: e.target.value,
                                    })
                                  }
                                  placeholder="def solve(): \n    pass..."
                                  className="w-full px-4 py-3 border border-zinc-200/50 dark:border-white/10 rounded-2xl bg-zinc-950 text-emerald-400 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-brand-orange"
                                />
                              </div>

                              {/* Teacher Feedback display */}
                              {existingSub && existingSub.feedback && (
                                <div className="p-4 bg-brand-orange/5 border border-brand-orange/10 rounded-xl text-xs space-y-1">
                                  <span className="text-[9px] font-extrabold uppercase text-brand-orange tracking-widest">Instructor Evaluation Comment:</span>
                                  <p className="text-zinc-700 dark:text-zinc-300 italic">"{existingSub.feedback}"</p>
                                </div>
                              )}

                              <div className="flex justify-end pt-2">
                                <button
                                  onClick={() => handleHomeworkSubmit(asg.id)}
                                  disabled={isSubmittingHomework === asg.id}
                                  className="px-5 py-2.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-bold uppercase rounded-xl"
                                >
                                  {isSubmittingHomework === asg.id ? "Uploading Solution..." : "Submit Homework solution"}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* 3. ACCOMPLISHMENTS TAB */}
                {activeTab === "accomplishments" && (
                  <div className="glass-panel border border-zinc-200/50 dark:border-white/5 rounded-2xl p-6 shadow-xs animate-reveal active space-y-6">
                    <h2 className="text-lg font-bold">Verified Achievements</h2>
                    {certificates.length === 0 ? (
                      <div className="text-center py-12 border border-dashed border-zinc-200 dark:border-white/10 rounded-2xl">
                        <span className="text-3xl block mb-2">🏆</span>
                        <p className="text-xs text-zinc-500">Milestone certificates will display here once generated.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {certificates.map((c) => (
                          <div key={c.id} className="border border-zinc-200/50 dark:border-white/5 rounded-2xl p-6 bg-white/30 dark:bg-[#121214]/50 flex justify-between items-center">
                            <div>
                              <span className="text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-500 px-2.5 py-0.5 rounded-full">Grade: {c.grade}</span>
                              <h3 className="text-base font-bold mt-2">{c.courseName}</h3>
                              <span className="text-[10px] text-zinc-400 font-mono">ID: {c.credentialId}</span>
                            </div>
                            <a href={`/certificate?id=${c.credentialId}`} className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold uppercase rounded-xl">
                              Verify Portal
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 4. BILLING TAB */}
                {activeTab === "billing" && (
                  <div className="glass-panel border border-zinc-200/50 dark:border-white/5 rounded-2xl p-6 shadow-xs animate-reveal active space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-bold">Tuition Billing Statements</h2>
                      <a href="/fee-payment" className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold uppercase tracking-wider">
                        Make Payment
                      </a>
                    </div>
                    {payments.length === 0 ? (
                      <div className="text-center py-12 border border-dashed border-zinc-200 dark:border-white/10 rounded-2xl">
                        <span className="text-3xl block mb-2">💳</span>
                        <p className="text-xs text-zinc-500">No transactions recorded in Supabase.</p>
                      </div>
                    ) : (
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-zinc-200/50 dark:border-white/5 text-zinc-400 font-bold uppercase tracking-wider text-[9px]">
                            <th className="pb-3">Invoice ID</th>
                            <th className="pb-3">Program Track</th>
                            <th className="pb-3">Type</th>
                            <th className="pb-3">Total Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200/30 dark:divide-white/5">
                          {payments.map((p) => (
                            <tr key={p.id} className="text-zinc-700 dark:text-zinc-300">
                              <td className="py-4 font-mono text-zinc-400">#INV-{p.id.slice(-6)}</td>
                              <td className="py-4 font-bold">{p.program}</td>
                              <td className="py-4 capitalize font-semibold">{p.amountType}</td>
                              <td className="py-4 font-bold text-zinc-950 dark:text-white">₹{p.total.toLocaleString("en-IN")}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* 5. SETTINGS TAB */}
                {activeTab === "settings" && (
                  <div className="glass-panel border border-zinc-200/50 dark:border-white/5 rounded-2xl p-6 shadow-xs animate-reveal active space-y-6">
                    <h2 className="text-lg font-bold">Profile Configurations</h2>
                    {statusMsg && <div className="p-3 bg-zinc-50/50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-bold rounded-xl text-center">{statusMsg}</div>}
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Full Name</label>
                          <input type="text" required value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full px-4 py-2.5 border border-zinc-200/50 dark:border-white/10 rounded-xl bg-white/50 dark:bg-white/[0.02] text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-orange text-zinc-800 dark:text-white" />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Email Address</label>
                          <input type="email" disabled value={user.email} className="w-full px-4 py-2.5 border border-zinc-200/50 dark:border-white/10 rounded-xl bg-zinc-200/50 dark:bg-white/5 text-zinc-400 text-xs font-semibold focus:outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Syllabus Focus</label>
                        <select value={editTrack} onChange={(e) => setEditTrack(e.target.value)} className="w-full px-4 py-2.5 border border-zinc-200/50 dark:border-white/10 rounded-xl bg-white/50 dark:bg-white/[0.02] text-xs font-semibold focus:outline-none text-zinc-800 dark:text-white">
                          <option value="AI Engineering Masterclass">AI Engineering Masterclass</option>
                          <option value="Advanced UI/UX & Design Systems">Advanced UI/UX & Design Systems</option>
                          <option value="Data Science & Machine Learning">Data Science & Machine Learning</option>
                          <option value="Product Leadership & Growth">Product Leadership & Growth</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1">New Password (Optional)</label>
                        <input type="password" placeholder="••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-2.5 border border-zinc-200/50 dark:border-white/10 rounded-xl bg-white/50 dark:bg-white/[0.02] text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-orange text-zinc-800 dark:text-white" />
                      </div>
                      <button type="submit" disabled={isUpdating} className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold uppercase tracking-wider cursor-pointer">
                        {isUpdating ? "Saving..." : "Save Settings"}
                      </button>
                    </form>
                  </div>
                )}

              </section>
            </div>
          )}
        </main>
        
        <Footer />
      </div>

      {/* ========================================================================= */}
      {/* LESSON MATERIAL READER LIGHTBOX MODAL                                    */}
      {/* ========================================================================= */}
      {activeReadingLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-6">
          <div className="bg-white dark:bg-[#09090b] max-w-2xl w-full border border-zinc-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto text-xs">
            <div className="flex justify-between items-start border-b border-zinc-200/20 dark:border-white/5 pb-3">
              <div>
                <span className="text-[9px] font-bold text-brand-orange uppercase">{activeReadingLesson.module_title}</span>
                <h3 className="text-base font-black text-zinc-950 dark:text-white mt-0.5">{activeReadingLesson.lesson_title}</h3>
              </div>
              <button
                onClick={() => setActiveReadingLesson(null)}
                className="text-lg font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Content Body */}
            <div className="py-4 text-zinc-700 dark:text-zinc-300 leading-relaxed font-semibold space-y-3 whitespace-pre-line text-sm">
              {activeReadingLesson.lesson_content}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200/20 dark:border-white/5">
              <button
                onClick={() => {
                  const done = completedLessons.includes(activeReadingLesson.id);
                  handleToggleLessonComplete(activeReadingLesson.id, !done);
                  setActiveReadingLesson(null);
                }}
                className="px-5 py-2.5 bg-brand-orange text-white font-bold rounded-xl"
              >
                {completedLessons.includes(activeReadingLesson.id) ? "Mark Incomplete" : "Mark Completed ✓"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LIVE PRESENTATION DECK SYNC MODAL                                        */}
      {/* ========================================================================= */}
      {isJoinedLiveRoom && livePresentation && (
        <div className="fixed inset-0 z-50 flex flex-col bg-zinc-950 text-white overflow-hidden">
          {/* Header sync indicators */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/60 backdrop-blur-md">
            <div>
              <span className="text-[9px] font-extrabold uppercase text-brand-orange animate-pulse">
                🔴 LIVE STREAM CLASSROOM
              </span>
              <h2 className="text-sm font-black mt-0.5">{livePresentation.title}</h2>
            </div>
            <button
              onClick={() => setIsJoinedLiveRoom(false)}
              className="px-4 py-2 bg-rose-600 text-white text-xs font-bold uppercase rounded-xl"
            >
              Exit Classroom
            </button>
          </div>

          <div className="flex-1 p-6 md:p-12 overflow-y-auto flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
            {/* Presentation Slide Renderer */}
            <div className="w-full glass-panel border border-white/15 bg-white/5 rounded-3xl p-8 md:p-12 shadow-2xl text-center min-h-[300px] flex flex-col justify-center items-center space-y-4">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                Slide {livePresentation.slideIndex + 1} of {livePresentation.slides.length}
              </span>
              <div className="whitespace-pre-line text-lg font-bold leading-relaxed max-w-2xl">
                {livePresentation.slides[livePresentation.slideIndex]?.content || "Waiting for presenter..."}
              </div>
            </div>

            {/* Realtime Poll Trigger */}
            {activePoll && (
              <div className="w-full mt-8 p-6 bg-brand-orange/10 border border-brand-orange/30 rounded-3xl space-y-4">
                <span className="text-[10px] font-extrabold uppercase text-brand-orange tracking-widest animate-pulse block">
                  🗳️ ACTIVE POP-UP POLL
                </span>
                <h3 className="text-sm font-extrabold">{activePoll.question}</h3>
                
                {!hasVotedPoll ? (
                  <div className="grid grid-cols-2 gap-3">
                    {activePoll.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleVotePoll(opt)}
                        className="py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-[10px] text-emerald-500 font-bold">✓ Vote recorded! Realtime classroom totals:</p>
                    {activePoll.options.map((opt) => {
                      const votes = pollVotes[opt] || 0;
                      return (
                        <div key={opt} className="flex justify-between items-center text-xs">
                          <span>{opt}</span>
                          <span className="font-mono font-bold bg-white/10 px-2 py-0.5 rounded">{votes} votes</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FLOATING DRAWER FOR AI TUTOR CHAT COMPANION                             */}
      {/* ========================================================================= */}
      {isAiOpen && (
        <div className="fixed right-0 top-0 bottom-0 z-50 w-[380px] bg-white dark:bg-[#0c0c0e] border-l border-zinc-200 dark:border-white/10 shadow-2xl flex flex-col text-xs transition-transform">
          <div className="p-4 border-b border-zinc-200/50 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xl">🪄</span>
              <div>
                <h4 className="font-extrabold text-zinc-900 dark:text-white">SkillSha AI Study Tutor</h4>
                <span className="text-[9px] text-brand-orange font-bold uppercase tracking-wider">Contextual Syllabus Companion</span>
              </div>
            </div>
            <button
              onClick={() => setIsAiOpen(false)}
              className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-base font-bold"
            >
              ✕
            </button>
          </div>

          {/* Chat message transcript */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {aiHistory.length === 0 && (
              <div className="text-center py-12 text-zinc-400 space-y-2">
                <span className="text-3xl block">👋</span>
                <p className="font-semibold">I'm SkillSha AI. Ask me questions like:</p>
                <div className="space-y-1.5 pt-2">
                  <p className="px-3 py-1.5 bg-zinc-100 dark:bg-white/5 rounded-lg text-[10px] cursor-pointer hover:text-brand-orange" onClick={() => setAiInput("What is my next lesson?")}>"What is my next lesson?"</p>
                  <p className="px-3 py-1.5 bg-zinc-100 dark:bg-white/5 rounded-lg text-[10px] cursor-pointer hover:text-brand-orange" onClick={() => setAiInput("Summarize my course roadmap.")}>"Summarize my course roadmap."</p>
                  <p className="px-3 py-1.5 bg-zinc-100 dark:bg-white/5 rounded-lg text-[10px] cursor-pointer hover:text-brand-orange" onClick={() => setAiInput("Based on my grades, what should I improve?")}>"Based on my grades, what should I improve?"</p>
                </div>
              </div>
            )}

            {aiHistory.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-2xl max-w-[85%] ${
                  msg.role === "user"
                    ? "bg-brand-orange text-white ml-auto"
                    : "bg-zinc-100 dark:bg-white/5 text-zinc-800 dark:text-zinc-200 mr-auto whitespace-pre-line font-semibold leading-relaxed"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {isAiLoading && (
              <div className="p-3 bg-zinc-100 dark:bg-white/5 text-zinc-400 rounded-2xl mr-auto animate-pulse font-mono">
                Thinking...
              </div>
            )}
          </div>

          {/* Chat inputs */}
          <form onSubmit={handleAiSend} className="p-4 border-t border-zinc-200/50 dark:border-white/5 flex gap-2">
            <input
              type="text"
              required
              placeholder="Ask AI Tutor..."
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-zinc-200/50 dark:border-white/10 rounded-xl bg-white/50 dark:bg-white/[0.02] text-xs focus:outline-none focus:ring-1 focus:ring-brand-orange text-zinc-800 dark:text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-brand-orange text-white font-bold rounded-xl"
            >
              Send
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
