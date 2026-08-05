"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface CurriculumItem {
  id: string;
  course_id: string;
  module_title: string;
  lesson_title: string;
  lesson_content: string;
  order_index: number;
}

interface SubmissionItem {
  id: string;
  fileUrl: string;
  grade: string | null;
  feedback: string | null;
  submittedAt: string;
  student: {
    id: string;
    name: string;
    email: string;
  };
  assignment: {
    id: string;
    title: string;
    description: string;
    course_id: string;
  };
}

interface BulletinItem {
  id: string;
  course_id: string;
  message: string;
  created_at: string;
}

interface PresentationItem {
  id: string;
  course_id: string;
  title: string;
  slides_data: any[];
  created_at: string;
}

interface StudentProgressItem {
  user_id: string;
  name: string;
  email: string;
  completed_lessons: string[];
  progress_percentage: number;
}

export default function TeacherPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  
  const [activeTab, setActiveTab] = useState<"curriculum" | "grades" | "bulletins" | "progress" | "presentations">("curriculum");
  const [selectedCourse, setSelectedCourse] = useState("ai-engineering");

  // State arrays
  const [curriculum, setCurriculum] = useState<CurriculumItem[]>([]);
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [bulletins, setBulletins] = useState<BulletinItem[]>([]);
  const [presentations, setPresentations] = useState<PresentationItem[]>([]);
  const [studentProgress, setStudentProgress] = useState<StudentProgressItem[]>([]);

  // Editing Curriculum Item Form
  const [isEditingCurriculum, setIsEditingCurriculum] = useState(false);
  const [curriculumForm, setCurriculumForm] = useState({
    id: "",
    module_title: "",
    lesson_title: "",
    lesson_content: "",
    order_index: 1,
  });

  // AI Course Planner Input
  const [aiTopicInput, setAiTopicInput] = useState("");
  const [isGeneratingCurriculum, setIsGeneratingCurriculum] = useState(false);

  // AI Grading loading state
  const [gradingLoadingId, setGradingLoadingId] = useState<string | null>(null);

  // Presentation Active Live Broadcast state
  const [activePresentation, setActivePresentation] = useState<PresentationItem | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [realtimeChannel, setRealtimeChannel] = useState<any>(null);

  // New Presentation Form state
  const [newPresentationTitle, setNewPresentationTitle] = useState("");
  const [newPresentationSlidesText, setNewPresentationSlidesText] = useState(
    `# Welcome to AI Class
Today we discuss neural representations.
---
# What is a Transformer?
Self-attention maps input sequences to query, key, value spaces.
---
# Hands-on Code
\`\`\`python
# Simple Attention
import torch
scores = q @ k.transpose(-2, -1) / d_k**0.5
\`\`\``
  );

  // Bulletin message input
  const [bulletinMessage, setBulletinMessage] = useState("");

  // Check auth on load
  useEffect(() => {
    const savedSecret = localStorage.getItem("skillsha_teacher_secret");
    if (savedSecret === "skillsha-teacher-secret-2026") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch data when authenticated or selection changes
  useEffect(() => {
    if (!isAuthenticated) return;

    fetchCurriculum();
    fetchSubmissions();
    fetchBulletins();
    fetchPresentations();
    fetchStudentProgress();
  }, [isAuthenticated, selectedCourse]);

  // Supabase Realtime channel lifecycle for Live Presentation broadcasting
  useEffect(() => {
    if (!activePresentation) {
      if (realtimeChannel) {
        realtimeChannel.unsubscribe();
        setRealtimeChannel(null);
      }
      return;
    }

    // Subscribe to classroom broadcast channel
    const channel = supabase.channel(`classroom:${selectedCourse}`, {
      config: { broadcast: { self: true } }
    });

    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        setRealtimeChannel(channel);
        // Initial broadcast
        channel.send({
          type: "broadcast",
          event: "slide-changed",
          payload: {
            presentationId: activePresentation.id,
            title: activePresentation.title,
            slides: activePresentation.slides_data,
            slideIndex: activeSlideIndex,
          }
        });
      }
    });

    return () => {
      channel.unsubscribe();
    };
  }, [activePresentation, activeSlideIndex]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "skillsha-teacher-secret-2026") {
      localStorage.setItem("skillsha_teacher_secret", passcode);
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid teacher passcode. Please review your credentials.");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("skillsha_teacher_secret");
    setIsAuthenticated(false);
    setActivePresentation(null);
  };

  // -------------------------------------------------------------
  // Data Fetching Functions
  // -------------------------------------------------------------
  const fetchCurriculum = async () => {
    try {
      const res = await fetch(`/api/teacher/curriculum?courseId=${selectedCourse}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setCurriculum(data.curriculum || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const secret = localStorage.getItem("skillsha_teacher_secret") || "";
      const res = await fetch(`/api/teacher/grades`, {
        headers: { "x-teacher-secret": secret },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Filter submissions matching selected course ID
        const list = (data.submissions || []).filter(
          (s: any) => s.assignment?.course_id === selectedCourse
        );
        setSubmissions(list);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBulletins = async () => {
    try {
      const res = await fetch(`/api/teacher/bulletin?courseId=${selectedCourse}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setBulletins(data.bulletins || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPresentations = async () => {
    try {
      const res = await fetch(`/api/teacher/presentation?courseId=${selectedCourse}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setPresentations(data.presentations || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStudentProgress = async () => {
    try {
      // Fetch all users and all student_progress rows to compute progress overview
      const { data: users, error: userErr } = await supabase
        .from("users")
        .select("id, name, email")
        .order("name", { ascending: true });

      const { data: progressRows, error: progErr } = await supabase
        .from("student_progress")
        .select("*")
        .eq("course_id", selectedCourse);

      if (userErr || progErr) {
        console.error(userErr, progErr);
        return;
      }

      // Map profiles together
      const mapped = (users || []).map((u) => {
        const pRow = (progressRows || []).find((pr) => pr.user_id === u.id);
        return {
          user_id: u.id,
          name: u.name,
          email: u.email,
          completed_lessons: pRow?.completed_lessons || [],
          progress_percentage: Number(pRow?.progress_percentage || 0),
        };
      });

      setStudentProgress(mapped);
    } catch (err) {
      console.error(err);
    }
  };

  // -------------------------------------------------------------
  // Curriculum Handlers
  // -------------------------------------------------------------
  const handleSaveCurriculumItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const secret = localStorage.getItem("skillsha_teacher_secret") || "";
      const isNew = !curriculumForm.id;
      const body = {
        action: isNew ? "create" : "update",
        courseId: selectedCourse,
        lessonId: curriculumForm.id || undefined,
        lessonData: {
          moduleTitle: curriculumForm.module_title,
          lessonTitle: curriculumForm.lesson_title,
          lessonContent: curriculumForm.lesson_content,
          orderIndex: Number(curriculumForm.order_index),
        },
      };

      const res = await fetch(`/api/teacher/curriculum`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-teacher-secret": secret,
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setIsEditingCurriculum(false);
        setCurriculumForm({
          id: "",
          module_title: "",
          lesson_title: "",
          lesson_content: "",
          order_index: 1,
        });
        fetchCurriculum();
        fetchStudentProgress();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save syllabus lesson.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCurriculumItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return;
    try {
      const secret = localStorage.getItem("skillsha_teacher_secret") || "";
      const res = await fetch(`/api/teacher/curriculum`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-teacher-secret": secret,
        },
        body: JSON.stringify({
          action: "delete",
          courseId: selectedCourse,
          lessonId: id,
        }),
      });

      if (res.ok) {
        fetchCurriculum();
        fetchStudentProgress();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAiPlanCurriculum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTopicInput.trim()) return;

    setIsGeneratingCurriculum(true);
    try {
      const secret = localStorage.getItem("skillsha_teacher_secret") || "";
      const res = await fetch(`/api/teacher/curriculum`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-teacher-secret": secret,
        },
        body: JSON.stringify({
          action: "generate",
          courseId: selectedCourse,
          topic: aiTopicInput,
        }),
      });

      if (res.ok) {
        setAiTopicInput("");
        fetchCurriculum();
        fetchStudentProgress();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to generate syllabus.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingCurriculum(false);
    }
  };

  // -------------------------------------------------------------
  // Grading Handlers
  // -------------------------------------------------------------
  const handleTriggerAiGrading = async (sub: SubmissionItem) => {
    setGradingLoadingId(sub.id);
    try {
      const secret = localStorage.getItem("skillsha_teacher_secret") || "";
      const res = await fetch(`/api/teacher/grades`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-teacher-secret": secret,
        },
        body: JSON.stringify({
          action: "ai-grade",
          assignmentTitle: sub.assignment.title,
          assignmentDescription: sub.assignment.description,
          studentWork: sub.fileUrl, // In our database, file_url holds the submission markdown/content
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Automatically prefill the feedback and grade for the teacher to review
        updateSubmissionLocalState(sub.id, data.aiGrade, data.aiFeedback);
      } else {
        alert(data.error || "Failed to trigger AI grading assistant.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGradingLoadingId(null);
    }
  };

  const updateSubmissionLocalState = (subId: string, grade: string, feedback: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, grade, feedback } : s))
    );
  };

  const handleSaveGrade = async (subId: string, grade: string, feedback: string) => {
    try {
      const secret = localStorage.getItem("skillsha_teacher_secret") || "";
      const res = await fetch(`/api/teacher/grades`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-teacher-secret": secret,
        },
        body: JSON.stringify({
          submissionId: subId,
          grade,
          feedback,
        }),
      });

      if (res.ok) {
        alert("Grade and feedback saved successfully!");
        fetchSubmissions();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save grading.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // -------------------------------------------------------------
  // Bulletins Handlers
  // -------------------------------------------------------------
  const handlePostBulletin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulletinMessage.trim()) return;

    try {
      const secret = localStorage.getItem("skillsha_teacher_secret") || "";
      const res = await fetch(`/api/teacher/bulletin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-teacher-secret": secret,
        },
        body: JSON.stringify({
          action: "create",
          courseId: selectedCourse,
          message: bulletinMessage,
        }),
      });

      if (res.ok) {
        setBulletinMessage("");
        fetchBulletins();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBulletin = async (id: string) => {
    try {
      const secret = localStorage.getItem("skillsha_teacher_secret") || "";
      const res = await fetch(`/api/teacher/bulletin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-teacher-secret": secret,
        },
        body: JSON.stringify({
          action: "delete",
          courseId: selectedCourse,
          bulletinId: id,
        }),
      });

      if (res.ok) {
        fetchBulletins();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // -------------------------------------------------------------
  // Presentation Handlers
  // -------------------------------------------------------------
  const handleCreatePresentation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPresentationTitle.trim() || !newPresentationSlidesText.trim()) return;

    // Parse presentation slides (separated by ---)
    const slides = newPresentationSlidesText
      .split("---")
      .map((s, idx) => ({
        id: idx + 1,
        content: s.trim(),
      }))
      .filter((s) => s.content.length > 0);

    try {
      const secret = localStorage.getItem("skillsha_teacher_secret") || "";
      const res = await fetch(`/api/teacher/presentation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-teacher-secret": secret,
        },
        body: JSON.stringify({
          action: "create",
          courseId: selectedCourse,
          title: newPresentationTitle,
          slidesData: slides,
        }),
      });

      if (res.ok) {
        setNewPresentationTitle("");
        setNewPresentationSlidesText("");
        fetchPresentations();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to create presentation.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePresentation = async (id: string) => {
    if (!confirm("Delete this presentation?")) return;
    try {
      const secret = localStorage.getItem("skillsha_teacher_secret") || "";
      const res = await fetch(`/api/teacher/presentation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-teacher-secret": secret,
        },
        body: JSON.stringify({
          action: "delete",
          courseId: selectedCourse,
          presentationId: id,
        }),
      });

      if (res.ok) {
        if (activePresentation?.id === id) {
          setActivePresentation(null);
        }
        fetchPresentations();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStartLive = (presentation: PresentationItem) => {
    setActivePresentation(presentation);
    setActiveSlideIndex(0);
  };

  const handleBroadcastPoll = () => {
    if (!realtimeChannel) return;
    channelBroadcast("push-poll", {
      question: "Which optimizer handles sparse updates best?",
      options: ["AdamW", "AdaGrad", "RMSprop", "SGD"],
    });
    alert("Live interactive poll pushed to all student consoles!");
  };

  const channelBroadcast = (event: string, payload: any) => {
    if (realtimeChannel) {
      realtimeChannel.send({
        type: "broadcast",
        event,
        payload,
      });
    }
  };

  // -------------------------------------------------------------
  // RENDERING PASSPHRASE AUTH SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen text-zinc-950 dark:text-white transition-colors duration-300 bg-[#FAF9F6] dark:bg-[#050505] flex flex-col justify-between">
        <Header />
        <div className="noise-overlay"></div>
        <main className="flex-1 flex items-center justify-center px-6 py-24 relative z-10">
          <div className="max-w-md w-full glass-panel border border-zinc-200/50 dark:border-white/5 rounded-3xl p-8 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-tr from-brand-orange to-brand-red rounded-2xl flex items-center justify-center text-white text-3xl mx-auto shadow-md shadow-brand-orange/20 animate-pulse">
              👨‍🏫
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">Instructor Portal</h1>
              <p className="text-xs text-zinc-400 mt-1">
                Enter your unique passcode to access the institutional curriculum builder.
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  required
                  placeholder="Enter passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full text-center px-4 py-3.5 border border-zinc-200/50 dark:border-white/10 rounded-2xl bg-white/50 dark:bg-white/[0.02] text-sm font-semibold tracking-widest focus:outline-none focus:ring-1 focus:ring-brand-orange text-zinc-800 dark:text-white"
                />
              </div>
              {authError && (
                <p className="text-[11px] text-rose-500 font-bold bg-rose-500/10 py-2 rounded-xl">
                  {authError}
                </p>
              )}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold uppercase tracking-wider rounded-2xl shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // -------------------------------------------------------------
  // MAIN INSTRUCTOR DASHBOARD VIEW
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen text-zinc-950 dark:text-white transition-colors duration-300 bg-[#FAF9F6] dark:bg-[#050505]">
      <div className="noise-overlay"></div>
      
      <div className="flex flex-col min-h-screen relative z-10">
        <Header />

        {/* Dashboard Banner */}
        <section className="bg-white/40 dark:bg-[#0c0c0c]/30 backdrop-blur-md border-b border-zinc-200/50 dark:border-white/5 text-zinc-900 dark:text-white pt-32 pb-8 px-6 transition-colors">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full text-brand-orange">
                Instructor Console
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight mt-2.5">
                Teacher Command Station
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                Manage curriculum nodes, evaluation workflows, and broadcast live slide presentations.
              </p>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div>
                <label className="block text-[8px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Active Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="px-4 py-2 border border-zinc-200/50 dark:border-white/10 rounded-xl bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-800 dark:text-white focus:outline-none"
                >
                  <option value="ai-engineering">AI Engineering Masterclass</option>
                  <option value="ui-ux">Advanced UI/UX & Design Systems</option>
                  <option value="data-science">Data Science & Machine Learning</option>
                  <option value="product-leadership">Product Leadership & Growth</option>
                </select>
              </div>

              <button
                onClick={handleSignOut}
                className="px-4 py-2.5 bg-transparent border border-zinc-200 dark:border-white/20 text-zinc-700 dark:text-white hover:bg-zinc-150 dark:hover:bg-white/5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer self-end"
              >
                Sign Out
              </button>
            </div>
          </div>
        </section>

        {/* Live Presentation Presenter Control Panel (Sticker bar when active) */}
        {activePresentation && (
          <div className="bg-brand-orange/10 border-b border-brand-orange/30 p-4 text-center sticky top-[72px] z-50 backdrop-blur-md">
            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
              <span className="text-xs font-bold text-brand-orange animate-pulse">
                🎙️ Broadcasting Live: "{activePresentation.title}" — Slide {activeSlideIndex + 1} of {activePresentation.slides_data.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={activeSlideIndex <= 0}
                  onClick={() => setActiveSlideIndex((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 text-xs font-bold rounded-lg disabled:opacity-40"
                >
                  ◀ Previous
                </button>
                <button
                  disabled={activeSlideIndex >= activePresentation.slides_data.length - 1}
                  onClick={() => setActiveSlideIndex((prev) => Math.min(activePresentation.slides_data.length - 1, prev + 1))}
                  className="px-3 py-1.5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 text-xs font-bold rounded-lg disabled:opacity-40"
                >
                  Next ▶
                </button>
                <button
                  onClick={handleBroadcastPoll}
                  className="px-3.5 py-1.5 bg-brand-orange text-white text-xs font-bold rounded-lg"
                >
                  🗳️ Push Poll
                </button>
                <button
                  onClick={() => setActivePresentation(null)}
                  className="px-3 py-1.5 bg-rose-600 text-white text-xs font-bold rounded-lg"
                >
                  Stop Class
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Controls */}
        <section className="bg-[#FAF9F6]/80 dark:bg-[#050505]/80 backdrop-blur-md border-b border-zinc-200/50 dark:border-white/5 sticky top-[72px] z-30 shadow-xs">
          <div className="max-w-[1200px] mx-auto px-6 flex gap-8 overflow-x-auto selection:bg-transparent">
            {[
              { id: "curriculum", label: "Syllabus Builder", icon: "📚" },
              { id: "grades", label: "Grades & Submissions", icon: "🏆" },
              { id: "bulletins", label: "Class Bulletin", icon: "📢" },
              { id: "progress", label: "Student Progress Heatmap", icon: "📊" },
              { id: "presentations", label: "Lecture Slides", icon: "🎙️" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                }}
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

        {/* Content Workspace */}
        <main className="max-w-[1200px] mx-auto px-6 py-10 flex-1 w-full">
          
          {/* TAB 1: CURRICULUM BUILDER */}
          {activeTab === "curriculum" && (
            <div className="space-y-8 animate-reveal active">
              
              {/* AI planning toolbox */}
              <div className="glass-panel border border-zinc-200/50 dark:border-white/5 rounded-3xl p-6 shadow-xs">
                <h3 className="text-base font-bold flex items-center gap-2">
                  <span>🪄</span> AI Course Curriculum Planner
                </h3>
                <p className="text-xs text-zinc-400 mt-1 mb-4">
                  Define a course topic. Gemini will draft and seed a comprehensive syllabus outline.
                </p>
                <form onSubmit={handleAiPlanCurriculum} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Advanced Vector Databases & LangChain Integrations"
                    value={aiTopicInput}
                    onChange={(e) => setAiTopicInput(e.target.value)}
                    className="flex-1 px-4 py-3 border border-zinc-200/50 dark:border-white/10 rounded-2xl bg-white dark:bg-white/[0.02] text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-orange text-zinc-800 dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={isGeneratingCurriculum}
                    className="px-6 py-3 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-2xl cursor-pointer hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    {isGeneratingCurriculum ? "Synthesizing Syllabus..." : "Plan Course 🚀"}
                  </button>
                </form>
              </div>

              {/* Curriculum List */}
              <div className="glass-panel border border-zinc-200/50 dark:border-white/5 rounded-3xl p-6 shadow-xs">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-bold">Curriculum Roadmap Outline</h3>
                  <button
                    onClick={() => {
                      setCurriculumForm({
                        id: "",
                        module_title: "",
                        lesson_title: "",
                        lesson_content: "",
                        order_index: curriculum.length + 1,
                      });
                      setIsEditingCurriculum(true);
                    }}
                    className="px-4 py-2 bg-brand-orange text-white text-xs font-bold uppercase rounded-xl"
                  >
                    + Add Lesson
                  </button>
                </div>

                {/* Edit Form Modal Overlay */}
                {isEditingCurriculum && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-6">
                    <div className="bg-white dark:bg-[#0c0c0e] max-w-xl w-full border border-zinc-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
                      <h4 className="text-base font-bold">
                        {curriculumForm.id ? "Edit Syllabus Node" : "Insert Syllabus Node"}
                      </h4>
                      <form onSubmit={handleSaveCurriculumItem} className="space-y-4 text-xs">
                        <div>
                          <label className="block text-[9px] font-bold text-zinc-400 uppercase mb-1">Module Title</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Module 1: Foundations"
                            value={curriculumForm.module_title}
                            onChange={(e) =>
                              setCurriculumForm({ ...curriculumForm, module_title: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 border border-zinc-200/50 dark:border-white/10 rounded-xl bg-white/50 dark:bg-white/[0.02] text-xs font-semibold focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-zinc-400 uppercase mb-1">Lesson Title</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Introduction to Neural Architectures"
                            value={curriculumForm.lesson_title}
                            onChange={(e) =>
                              setCurriculumForm({ ...curriculumForm, lesson_title: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 border border-zinc-200/50 dark:border-white/10 rounded-xl bg-white/50 dark:bg-white/[0.02] text-xs font-semibold focus:outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] font-bold text-zinc-400 uppercase mb-1">Sequence Order Index</label>
                            <input
                              type="number"
                              required
                              value={curriculumForm.order_index}
                              onChange={(e) =>
                                setCurriculumForm({ ...curriculumForm, order_index: Number(e.target.value) })
                              }
                              className="w-full px-3.5 py-2.5 border border-zinc-200/50 dark:border-white/10 rounded-xl bg-white/50 dark:bg-white/[0.02] text-xs font-semibold focus:outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-zinc-400 uppercase mb-1">Lesson Material (Markdown Content)</label>
                          <textarea
                            required
                            rows={8}
                            placeholder="Enter educational reading syllabus content, code examples, markdown..."
                            value={curriculumForm.lesson_content}
                            onChange={(e) =>
                              setCurriculumForm({ ...curriculumForm, lesson_content: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 border border-zinc-200/50 dark:border-white/10 rounded-xl bg-white/50 dark:bg-white/[0.02] text-xs font-semibold focus:outline-none"
                          />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                          <button
                            type="button"
                            onClick={() => setIsEditingCurriculum(false)}
                            className="px-4 py-2 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-gradient-to-r from-brand-orange to-brand-red text-white font-bold rounded-xl"
                          >
                            Save Node
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {curriculum.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-zinc-200 dark:border-white/10 rounded-2xl">
                    <span className="text-3xl block mb-2">📚</span>
                    <p className="text-xs text-zinc-500">No lessons available for this course yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {curriculum.map((c) => (
                      <div
                        key={c.id}
                        className="p-4 border border-zinc-200/50 dark:border-white/5 bg-white/20 dark:bg-[#121214]/50 rounded-2xl flex justify-between items-center text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-zinc-400">Order: {c.order_index}</span>
                            <span className="text-[10px] font-extrabold uppercase bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded-full">
                              {c.module_title}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold mt-2 text-zinc-800 dark:text-white">
                            {c.lesson_title}
                          </h4>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setCurriculumForm({
                                id: c.id,
                                module_title: c.module_title,
                                lesson_title: c.lesson_title,
                                lesson_content: c.lesson_content,
                                order_index: c.order_index,
                              });
                              setIsEditingCurriculum(true);
                            }}
                            className="px-3 py-1.5 border border-zinc-200 dark:border-white/10 rounded-lg text-zinc-700 dark:text-zinc-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCurriculumItem(c.id)}
                            className="px-3 py-1.5 border border-rose-500/10 text-rose-500 rounded-lg"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: GRADES & SUBMISSIONS */}
          {activeTab === "grades" && (
            <div className="space-y-6 animate-reveal active">
              <div className="glass-panel border border-zinc-200/50 dark:border-white/5 rounded-3xl p-6 shadow-xs">
                <h3 className="text-base font-bold mb-6">Student Assignment Work ledger</h3>

                {submissions.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-zinc-200 dark:border-white/10 rounded-2xl">
                    <span className="text-3xl block mb-2">📥</span>
                    <p className="text-xs text-zinc-500">No submissions recorded for this course track.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {submissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-5 border border-zinc-200/50 dark:border-white/5 bg-white/30 dark:bg-[#121214]/50 rounded-2xl space-y-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                              {sub.assignment.title}
                            </span>
                            <h4 className="text-sm font-bold text-zinc-950 dark:text-white mt-0.5">
                              Submitted by: {sub.student.name} ({sub.student.email})
                            </h4>
                            <span className="text-[10px] text-zinc-400 mt-0.5 font-mono">
                              On: {new Date(sub.submittedAt).toLocaleString()}
                            </span>
                          </div>
                          
                          {/* Grade status indicator */}
                          <div className="text-right">
                            {sub.grade ? (
                              <span className="text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-500 px-2.5 py-0.5 rounded-full">
                                {sub.grade}
                              </span>
                            ) : (
                              <span className="text-[10px] font-extrabold uppercase bg-amber-500/10 text-amber-500 px-2.5 py-0.5 rounded-full animate-pulse">
                                Pending Grade
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Submission code/body details */}
                        <div className="p-4 bg-zinc-950 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto border border-zinc-800">
                          <pre>{sub.fileUrl}</pre>
                        </div>

                        {/* AI Evaluator Trigger */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-zinc-200/30 dark:border-white/5">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                              <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                                Award Grade
                              </label>
                              <button
                                onClick={() => handleTriggerAiGrading(sub)}
                                disabled={gradingLoadingId === sub.id}
                                className="text-[9px] font-bold uppercase text-brand-orange border border-brand-orange/20 px-2 py-0.5 rounded bg-brand-orange/5 cursor-pointer disabled:opacity-40"
                              >
                                {gradingLoadingId === sub.id ? "Evaluating via AI..." : "🪄 AI Grader Assistant"}
                              </button>
                            </div>
                            <input
                              type="text"
                              value={sub.grade || ""}
                              onChange={(e) =>
                                updateSubmissionLocalState(sub.id, e.target.value, sub.feedback || "")
                              }
                              placeholder="e.g. Excellent (A)"
                              className="w-full px-3.5 py-2 border border-zinc-200/50 dark:border-white/10 rounded-xl bg-white/50 dark:bg-white/[0.02] text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-orange text-zinc-800 dark:text-white"
                            />
                          </div>

                          <div className="flex-[2] space-y-3">
                            <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                              Constructive Feedback
                            </label>
                            <textarea
                              rows={2}
                              value={sub.feedback || ""}
                              onChange={(e) =>
                                updateSubmissionLocalState(sub.id, sub.grade || "", e.target.value)
                              }
                              placeholder="Leave comments or improvements..."
                              className="w-full px-3.5 py-2 border border-zinc-200/50 dark:border-white/10 rounded-xl bg-white/50 dark:bg-white/[0.02] text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-orange text-zinc-800 dark:text-white"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            onClick={() => handleSaveGrade(sub.id, sub.grade || "", sub.feedback || "")}
                            className="px-4 py-2 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-bold uppercase rounded-xl"
                          >
                            Save Evaluation
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: CLASS BULLETINS */}
          {activeTab === "bulletins" && (
            <div className="space-y-6 animate-reveal active">
              
              {/* Broadcast Form */}
              <div className="glass-panel border border-zinc-200/50 dark:border-white/5 rounded-3xl p-6 shadow-xs">
                <h3 className="text-base font-bold flex items-center gap-2">
                  <span>📢</span> Broadcast Class Announcement
                </h3>
                <p className="text-xs text-zinc-400 mt-1 mb-4">
                  Notify all students in the portal with live announcements.
                </p>
                <form onSubmit={handlePostBulletin} className="space-y-4">
                  <textarea
                    required
                    rows={3}
                    placeholder="Type announcement here..."
                    value={bulletinMessage}
                    onChange={(e) => setBulletinMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-zinc-200/50 dark:border-white/10 rounded-2xl bg-white dark:bg-white/[0.02] text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-orange text-zinc-800 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Post Bulletin
                  </button>
                </form>
              </div>

              {/* Bulletin List */}
              <div className="glass-panel border border-zinc-200/50 dark:border-white/5 rounded-3xl p-6 shadow-xs">
                <h3 className="text-base font-bold mb-4">Active Bulletins</h3>
                {bulletins.length === 0 ? (
                  <p className="text-xs text-zinc-500 py-6 text-center">No announcements posted yet.</p>
                ) : (
                  <div className="space-y-3">
                    {bulletins.map((b) => (
                      <div
                        key={b.id}
                        className="p-4 border border-zinc-200/50 dark:border-white/5 bg-white/20 dark:bg-zinc-900/50 rounded-2xl flex justify-between items-center text-xs"
                      >
                        <div className="flex-1 pr-4">
                          <p className="text-zinc-800 dark:text-zinc-200 font-semibold">{b.message}</p>
                          <span className="text-[10px] text-zinc-400 block mt-1 font-mono">
                            {new Date(b.created_at).toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteBulletin(b.id)}
                          className="px-3 py-1.5 border border-rose-500/10 text-rose-500 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: STUDENT PROGRESS ANALYTICS */}
          {activeTab === "progress" && (
            <div className="space-y-6 animate-reveal active">
              <div className="glass-panel border border-zinc-200/50 dark:border-white/5 rounded-3xl p-6 shadow-xs">
                <h3 className="text-base font-bold mb-2">Student Learning Matrix</h3>
                <p className="text-xs text-zinc-400 mb-6">
                  Track completion progress and highlight stalling students needing assistance.
                </p>

                {studentProgress.length === 0 ? (
                  <p className="text-xs text-zinc-500 py-6 text-center">No student progress datasets found.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-zinc-200/50 dark:border-white/5 text-zinc-400 font-bold uppercase tracking-wider text-[9px]">
                          <th className="pb-3">Student Name</th>
                          <th className="pb-3">Email Address</th>
                          <th className="pb-3">Completed Lessons</th>
                          <th className="pb-3">Syllabus Progress</th>
                          <th className="pb-3">Status Alert</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200/30 dark:divide-white/5">
                        {studentProgress.map((student) => {
                          const isStalling = student.progress_percentage < 25;
                          return (
                            <tr key={student.user_id} className="text-zinc-700 dark:text-zinc-300">
                              <td className="py-4 font-bold">{student.name}</td>
                              <td className="py-4 text-zinc-400">{student.email}</td>
                              <td className="py-4 font-mono font-semibold">
                                {student.completed_lessons.length} nodes
                              </td>
                              <td className="py-4">
                                <div className="flex items-center gap-3">
                                  <span className="font-bold text-zinc-950 dark:text-white w-9">
                                    {student.progress_percentage}%
                                  </span>
                                  <div className="w-24 bg-zinc-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                                    <div
                                      className="bg-brand-orange h-full"
                                      style={{ width: `${student.progress_percentage}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="py-4">
                                {isStalling ? (
                                  <span className="text-[9px] font-extrabold uppercase bg-rose-500/10 text-rose-500 px-2 py-0.5 rounded-full">
                                    🚨 Struggle Alert
                                  </span>
                                ) : (
                                  <span className="text-[9px] font-extrabold uppercase bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">
                                    Healthy
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: PRESENTATIONS */}
          {activeTab === "presentations" && (
            <div className="space-y-6 animate-reveal active">
              
              {/* Slide Creator Form */}
              <div className="glass-panel border border-zinc-200/50 dark:border-white/5 rounded-3xl p-6 shadow-xs">
                <h3 className="text-base font-bold flex items-center gap-2">
                  <span>🎙️</span> Create Premium Lecture Slideshow
                </h3>
                <p className="text-xs text-zinc-400 mt-1 mb-4">
                  Define high-fidelity, interactive slides. Separate slide pages using <code className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded font-mono">---</code>.
                </p>
                <form onSubmit={handleCreatePresentation} className="space-y-4">
                  <div>
                    <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                      Lecture title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Masterclass Lecture 1: Embeddings & Vector Stores"
                      value={newPresentationTitle}
                      onChange={(e) => setNewPresentationTitle(e.target.value)}
                      className="w-full px-4 py-3 border border-zinc-200/50 dark:border-white/10 rounded-2xl bg-white dark:bg-white/[0.02] text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-orange text-zinc-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                      Slides Markdown Content (separate slides with ---)
                    </label>
                    <textarea
                      required
                      rows={10}
                      value={newPresentationSlidesText}
                      onChange={(e) => setNewPresentationSlidesText(e.target.value)}
                      className="w-full px-4 py-3 border border-zinc-200/50 dark:border-white/10 rounded-2xl bg-white dark:bg-white/[0.02] text-xs font-mono focus:outline-none focus:ring-1 focus:ring-brand-orange text-zinc-800 dark:text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Publish Slideshow
                  </button>
                </form>
              </div>

              {/* Slideshow List */}
              <div className="glass-panel border border-zinc-200/50 dark:border-white/5 rounded-3xl p-6 shadow-xs">
                <h3 className="text-base font-bold mb-4">Published Presentations</h3>
                {presentations.length === 0 ? (
                  <p className="text-xs text-zinc-500 py-6 text-center">No presentation slides published yet.</p>
                ) : (
                  <div className="space-y-3">
                    {presentations.map((p) => (
                      <div
                        key={p.id}
                        className="p-4 border border-zinc-200/50 dark:border-white/5 bg-white/20 dark:bg-zinc-900/50 rounded-2xl flex justify-between items-center text-xs"
                      >
                        <div>
                          <h4 className="text-sm font-bold text-zinc-800 dark:text-white">{p.title}</h4>
                          <span className="text-[10px] text-zinc-400 block mt-1 font-semibold">
                            {p.slides_data.length} slide pages
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleStartLive(p)}
                            className="px-3 py-1.5 bg-brand-orange text-white rounded-lg font-bold"
                          >
                            🎙️ Go Live Presenter
                          </button>
                          <button
                            onClick={() => handleDeletePresentation(p.id)}
                            className="px-3 py-1.5 border border-rose-500/10 text-rose-500 rounded-lg"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </main>

        <Footer />
      </div>
    </div>
  );
}
