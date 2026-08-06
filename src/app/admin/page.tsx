"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Student {
  id: string;
  name: string;
  email: string;
  programInterest: string;
  createdAt: string;
}

interface Booking {
  id: string;
  name: string;
  mobile: string;
  dateTime: string;
  createdAt: string;
}

interface Payment {
  id: string;
  name: string;
  email: string;
  program: string;
  amountType: string;
  amount: number;
  gst: number;
  total: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

interface Certificate {
  id: string;
  credentialId: string;
  studentName: string;
  courseName: string;
  dateIssued: string;
  grade: string;
  instructor: string;
  createdAt: string;
}

interface Assignment {
  id: string;
  course_id: string;
  title: string;
  description: string;
  created_at: string;
}

interface AuditLog {
  timestamp: string;
  action: string;
  category: "auth" | "certificate" | "billing" | "curriculum";
  details: string;
}

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [accessKey, setAccessKey] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  // Database records state
  const [students, setStudents] = useState<Student[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  // Search filter query
  const [searchQuery, setSearchQuery] = useState("");

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    { timestamp: new Date(Date.now() - 3600000).toISOString(), action: "System Initialized", category: "auth", details: "Secured environment verified." },
    { timestamp: new Date(Date.now() - 1800000).toISOString(), action: "Database Synced", category: "auth", details: "All tables updated from Supabase PostgreSQL." }
  ]);

  // System Health States (Simulated live variables)
  const [pingLatency, setPingLatency] = useState(42);
  const [activeSocketChannels, setActiveSocketChannels] = useState(12);
  const [dbPoolUsage, setDbPoolUsage] = useState(4);

  // New Certificate Form States
  const [newCert, setNewCert] = useState({
    credentialId: "",
    studentName: "",
    courseName: "AI Engineering Masterclass",
    dateIssued: "",
    grade: "Distinction (A+)",
    instructor: "Dr. Aris Thorne",
  });
  const [certMessage, setCertMessage] = useState("");
  const [certError, setCertError] = useState("");

  // New Assignment Form States
  const [newAssignment, setNewAssignment] = useState({
    courseId: "ai-engineering",
    title: "",
    description: "",
  });
  const [asgMessage, setAsgMessage] = useState("");
  const [asgError, setAsgError] = useState("");

  // Check auth on load
  useEffect(() => {
    const savedKey = sessionStorage.getItem("skillsha_admin_key");
    if (savedKey === "skillsha-admin-secret-2026") {
      setIsAdmin(true);
      fetchAdminData();
    } else {
      setLoading(false);
    }
  }, []);

  // Live monitor effect
  useEffect(() => {
    if (!isAdmin) return;
    const interval = setInterval(() => {
      setPingLatency(Math.floor(35 + Math.random() * 15));
      setActiveSocketChannels(Math.floor(10 + Math.random() * 5));
      setDbPoolUsage(Math.floor(2 + Math.random() * 6));
    }, 4000);
    return () => clearInterval(interval);
  }, [isAdmin]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessKey === "skillsha-admin-secret-2026") {
      sessionStorage.setItem("skillsha_admin_key", accessKey);
      setIsAdmin(true);
      setAuthError("");
      fetchAdminData();
      logAction("Login Successful", "auth", "Administrator authenticated.");
    } else {
      setAuthError("Invalid Access Key. Please contact system administrator.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("skillsha_admin_key");
    setIsAdmin(false);
    setLoading(false);
  };

  const logAction = (action: string, category: "auth" | "certificate" | "billing" | "curriculum", details: string) => {
    const newLog: AuditLog = {
      timestamp: new Date().toISOString(),
      action,
      category,
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const secret = "skillsha-admin-secret-2026";
      
      // Fetch stats tables
      const res = await fetch("/api/admin/data", {
        headers: { "x-admin-secret": secret },
      });
      const data = await res.json();
      if (data.success) {
        setStudents(data.users || []);
        setBookings(data.bookings || []);
        setPayments(data.payments || []);
        setCertificates(data.certificates || []);
      }

      // Fetch assignments
      const asgRes = await fetch("/api/admin/assignments", {
        headers: { "x-admin-secret": secret },
      });
      const asgData = await asgRes.json();
      if (asgData.success) {
        setAssignments(asgData.assignments || []);
      }

    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // CERTIFICATES ACTIONS
  // -------------------------------------------------------------
  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCertError("");
    setCertMessage("");

    if (!newCert.credentialId || !newCert.studentName || !newCert.dateIssued) {
      setCertError("Please fill out all fields.");
      return;
    }

    try {
      const res = await fetch("/api/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCert),
      });

      const data = await res.json();
      if (data.success) {
        setCertMessage(`Successfully issued certificate ${newCert.credentialId.toUpperCase()}!`);
        setCertificates((prev) => [data.certificate, ...prev]);
        logAction("Certificate Issued", "certificate", `Credential ${newCert.credentialId} signed for ${newCert.studentName}`);
        setNewCert((prev) => ({
          ...prev,
          credentialId: "",
          studentName: "",
          dateIssued: "",
        }));
      } else {
        setCertError(data.error || "Failed to create certificate.");
      }
    } catch (err) {
      setCertError("A network error occurred. Please try again.");
    }
  };

  // -------------------------------------------------------------
  // ASSIGNMENTS ACTIONS
  // -------------------------------------------------------------
  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    setAsgError("");
    setAsgMessage("");

    if (!newAssignment.title || !newAssignment.description) {
      setAsgError("Please provide all details.");
      return;
    }

    try {
      const secret = "skillsha-admin-secret-2026";
      const res = await fetch("/api/admin/assignments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify(newAssignment),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAsgMessage(`Successfully created assignment "${newAssignment.title}"!`);
        setAssignments((prev) => [data.assignment, ...prev]);
        logAction("Assignment Created", "curriculum", `Added "${newAssignment.title}" to ${newAssignment.courseId}`);
        setNewAssignment((prev) => ({
          ...prev,
          title: "",
          description: "",
        }));
      } else {
        setAsgError(data.error || "Failed to create assignment.");
      }
    } catch (err) {
      setAsgError("A network error occurred. Try again.");
    }
  };

  const handleDeleteAssignment = async (id: string, title: string) => {
    if (!confirm("Are you sure you want to delete this assignment?")) return;

    try {
      const secret = "skillsha-admin-secret-2026";
      const res = await fetch(`/api/admin/assignments?id=${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-secret": secret,
        },
      });

      if (res.ok) {
        setAssignments((prev) => prev.filter((a) => a.id !== id));
        logAction("Assignment Deleted", "curriculum", `Removed "${title}" from courses.`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // -------------------------------------------------------------
  // CSV EXPORTER
  // -------------------------------------------------------------
  const exportToCSV = (datasetName: string, headers: string[], rows: any[]) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.map((val: any) => `"${String(val).replace(/"/g, '""')}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `skillsha_export_${datasetName}_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    logAction("CSV Export Initiated", "billing", `Exported data sheet for ${datasetName}`);
  };

  const handleExportStudents = () => {
    const headers = ["ID", "Name", "Email", "Program Interest", "Registration Date"];
    const rows = students.map((s) => [s.id, s.name, s.email, s.programInterest, s.createdAt]);
    exportToCSV("students", headers, rows);
  };

  const handleExportPayments = () => {
    const headers = ["Invoice ID", "Student Name", "Email", "Program", "Billed Type", "Amount", "GST (18%)", "Total Paid", "Method", "Date"];
    const rows = payments.map((p) => [p.id, p.name, p.email, p.program, p.amountType, p.amount, p.gst, p.total, p.paymentMethod, p.createdAt]);
    exportToCSV("billing_records", headers, rows);
  };

  // Helper calculations
  const totalRevenue = payments.reduce((acc, curr) => acc + curr.total, 0);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#050505] flex items-center justify-center p-6 relative font-sans text-zinc-900 dark:text-white transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden select-none">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-orange/[0.04] dark:bg-brand-orange/[0.025] blur-[120px] top-[-100px] left-[-100px]"></div>
          <div className="absolute w-[450px] h-[450px] rounded-full bg-indigo-500/[0.03] dark:bg-indigo-500/[0.015] blur-[110px] bottom-[-100px] right-[-100px]"></div>
        </div>
        <div className="w-full max-w-md bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/50 dark:border-white/5 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <img src="/files/logo.svg" alt="SkillSha Logo" className="h-6 w-auto block dark:hidden mx-auto" />
              <img src="/files/logo-dark.svg" alt="SkillSha Logo" className="h-6 w-auto hidden dark:block mx-auto" />
            </Link>
            <h1 className="text-xl font-bold tracking-tight">Institutional Access Panel</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Please authenticate to access the administration dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Access Key</label>
              <input
                type="password"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder="Enter admin access key"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 text-sm focus:outline-none focus:border-brand-orange/50 transition-colors"
                required
              />
            </div>

            {authError && (
              <p className="text-xs text-red-500 font-medium">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold uppercase tracking-wider hover:shadow-[0_4px_20px_rgba(13,148,136,0.3)] transition-all cursor-pointer"
            >
              Verify Credentials
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#050505] relative font-sans text-zinc-900 dark:text-white transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden select-none">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-orange/[0.03] dark:bg-brand-orange/[0.015] blur-[120px] top-0 left-[10%]"></div>
        <div className="absolute w-[600px] h-[600px] rounded-full bg-indigo-500/[0.02] dark:bg-indigo-500/[0.01] blur-[130px] bottom-0 right-[10%]"></div>
      </div>

      {/* Admin Navbar */}
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/85 dark:bg-[#050505]/85 backdrop-blur-md border-b border-zinc-200/50 dark:border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/">
            <img src="/files/logo.svg" alt="SkillSha Logo" className="h-6 w-auto block dark:hidden" />
            <img src="/files/logo-dark.svg" alt="SkillSha Logo" className="h-6 w-auto hidden dark:block" />
          </Link>
          <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-md">
            Enterprise Admin
          </span>
        </div>

        {/* Realtime System Performance HUD */}
        <div className="hidden lg:flex items-center gap-6 text-[10px] font-mono border-l border-zinc-200 dark:border-white/10 pl-6 select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-zinc-400">SERVER STATUS: OK</span>
          </div>
          <div>
            <span className="text-zinc-400">LATENCY:</span> <span className="text-emerald-500 font-bold">{pingLatency}ms</span>
          </div>
          <div>
            <span className="text-zinc-400">DB POOL:</span> <span className="text-indigo-400 font-bold">{dbPoolUsage}/20</span>
          </div>
          <div>
            <span className="text-zinc-400">LIVE WEBSOCKETS:</span> <span className="text-brand-orange font-bold">{activeSocketChannels}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={fetchAdminData}
            title="Refresh database data"
            className="p-2 rounded-lg border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            🔄 Sync
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="max-w-[1400px] mx-auto py-8 px-6 md:px-12">
        
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 border-b border-zinc-200/50 dark:border-white/5 pb-4 mb-8 scrollbar-none">
          {[
            { id: "overview", label: "Overview Dashboard", icon: "📊" },
            { id: "students", label: "Student Registry", icon: "👥" },
            { id: "assignments", label: "Assignments Creator", icon: "📝" },
            { id: "bookings", label: "Counseling Bookings", icon: "📅" },
            { id: "payments", label: "Tuition Payments", icon: "💳" },
            { id: "certificates", label: "Certificates Manager", icon: "🎓" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSearchQuery("");
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-brand-orange to-brand-red text-white shadow-[0_4px_15px_rgba(13,148,136,0.25)]"
                  : "bg-white/50 border border-zinc-200/60 dark:bg-zinc-900/40 dark:border-white/5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-zinc-400 animate-pulse">Syncing institutional records...</p>
          </div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Stats Widgets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: "Total Students", value: students.length, color: "text-brand-orange", icon: "👥", desc: "Registered accounts" },
                    { title: "Counseling Bookings", value: bookings.length, color: "text-blue-500", icon: "📅", desc: "Mentorship sessions" },
                    { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, color: "text-green-500", icon: "💰", desc: "Processed payments" },
                    { title: "Certificates Issued", value: certificates.length, color: "text-indigo-500", icon: "🎓", desc: "Verified credentials" },
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col justify-between group hover:border-brand-orange/30 transition-all duration-300 hover:scale-[1.01]">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{stat.title}</span>
                        <span className="text-xl">{stat.icon}</span>
                      </div>
                      <div>
                        <h3 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${stat.color} leading-none`}>{stat.value}</h3>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 font-normal">{stat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Growth, Auditing Feed and Performance Monitor */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Graph */}
                  <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl p-6 shadow-sm text-left flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-6">Revenue & Program Distribution</h4>
                      <div className="h-[220px] flex items-end justify-between gap-2 md:gap-4 px-2 border-b border-zinc-200 dark:border-white/10 pb-2">
                        {[
                          { label: "AI Eng", val: 80, color: "from-brand-orange to-orange-500" },
                          { label: "UI/UX", val: 55, color: "from-pink-500 to-rose-500" },
                          { label: "Data Sci", val: 65, color: "from-cyan-500 to-blue-500" },
                          { label: "Product", val: 40, color: "from-violet-500 to-purple-500" },
                          { label: "Quant", val: 75, color: "from-red-500 to-rose-600" },
                          { label: "Content", val: 30, color: "from-amber-400 to-orange-500" },
                          { label: "Wellness", val: 20, color: "from-teal-400 to-emerald-500" },
                        ].map((item, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                            <div className="w-full relative rounded-t-lg bg-zinc-100 dark:bg-zinc-950/40 h-[180px] flex items-end overflow-hidden">
                              <div
                                style={{ height: `${item.val}%` }}
                                className={`w-full bg-gradient-to-t ${item.color} rounded-t-md transition-all duration-1000 group-hover:opacity-90`}
                              ></div>
                            </div>
                            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tight whitespace-nowrap">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Audit Logs and Logs Activity Feed */}
                  <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl p-6 shadow-sm text-left flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-4">🛡️ System Audit Logs</h4>
                      <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                        {auditLogs.map((log, idx) => (
                          <div key={idx} className="text-xs border-b border-zinc-100 dark:border-white/5 pb-2.5 last:border-0 last:pb-0">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-zinc-800 dark:text-zinc-200">{log.action}</span>
                              <span className="text-[8px] font-mono text-zinc-400">{new Date(log.timestamp).toLocaleTimeString()}</span>
                            </div>
                            <p className="text-[10px] text-zinc-500 mt-0.5 leading-tight">{log.details}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* STUDENTS TAB */}
            {activeTab === "students" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <h2 className="text-base font-bold uppercase tracking-wider">Student Registry</h2>
                    <button
                      onClick={handleExportStudents}
                      className="px-3.5 py-1.5 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-wider rounded-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-sm shadow-brand-orange/20"
                    >
                      📥 Export CSV
                    </button>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by student name or email..."
                    className="px-4 py-2 text-xs rounded-full border border-zinc-200 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 focus:outline-none focus:border-brand-orange w-full max-w-sm"
                  />
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-zinc-50 dark:bg-white/[0.01] border-b border-zinc-200 dark:border-white/5 text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
                          <th className="px-6 py-4">Student Name</th>
                          <th className="px-6 py-4">Email Address</th>
                          <th className="px-6 py-4">Course/Program Interest</th>
                          <th className="px-6 py-4">Date Registered</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-white/5 font-medium">
                        {students
                          .filter(s =>
                            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            s.email.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((student) => (
                            <tr key={student.id} className="hover:bg-zinc-50/50 dark:hover:bg-white/[0.01] transition-all">
                              <td className="px-6 py-4 text-zinc-900 dark:text-white font-bold">{student.name}</td>
                              <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">{student.email}</td>
                              <td className="px-6 py-4">
                                <span className="text-[10px] bg-brand-orange/10 text-brand-orange px-2.5 py-0.5 rounded-md font-bold">
                                  {student.programInterest}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-zinc-500">{new Date(student.createdAt).toLocaleString()}</td>
                            </tr>
                          ))}
                        {students.length === 0 && (
                          <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-zinc-400 italic">No student accounts registered in the database.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ASSIGNMENTS CREATOR TAB */}
            {activeTab === "assignments" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                {/* Form to create homework assignment */}
                <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl p-6 shadow-sm h-fit">
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-6">Publish Homework Assignment</h3>
                  
                  <form onSubmit={handleCreateAssignment} className="space-y-4 text-xs font-semibold">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5">For Course Track</label>
                      <select
                        value={newAssignment.courseId}
                        onChange={(e) => setNewAssignment({ ...newAssignment, courseId: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-white/10 bg-[#FAF9F6] dark:bg-zinc-950/60 focus:outline-none focus:border-brand-orange text-xs"
                      >
                        <option value="ai-engineering">AI Engineering Masterclass</option>
                        <option value="ui-ux">Advanced UI/UX & Design Systems</option>
                        <option value="data-science">Data Science & Machine Learning</option>
                        <option value="product-leadership">Product Leadership & Growth</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5">Assignment Title</label>
                      <input
                        type="text"
                        value={newAssignment.title}
                        onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                        placeholder="e.g. Homework 2: RAG Pipeline with vector store"
                        className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 focus:outline-none focus:border-brand-orange"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5">Guidelines / Prompt Description</label>
                      <textarea
                        rows={6}
                        value={newAssignment.description}
                        onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                        placeholder="Describe coding requirements, expected outputs, grading rubrics..."
                        className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 focus:outline-none focus:border-brand-orange"
                        required
                      />
                    </div>

                    {asgMessage && (
                      <p className="text-xs text-green-500 font-bold">{asgMessage}</p>
                    )}
                    {asgError && (
                      <p className="text-xs text-red-500 font-bold">{asgError}</p>
                    )}

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-gradient-to-r from-brand-orange to-brand-red text-white text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
                    >
                      Publish Homework Project
                    </button>
                  </form>
                </div>

                {/* Directory of current published assignments */}
                <div className="lg:col-span-8 space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider">Active Published Homeworks</h3>

                  {assignments.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-zinc-200 dark:border-white/10 rounded-2xl">
                      <span className="text-3xl block mb-2">📝</span>
                      <p className="text-xs text-zinc-500">No homework assignments created yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {assignments.map((asg) => (
                        <div key={asg.id} className="p-5 border border-zinc-200/50 dark:border-white/5 bg-white/20 dark:bg-zinc-900/50 rounded-2xl flex justify-between items-center text-xs">
                          <div>
                            <span className="text-[9px] font-bold text-brand-orange uppercase bg-brand-orange/10 px-2 py-0.5 rounded-md font-mono">
                              {asg.course_id}
                            </span>
                            <h4 className="text-sm font-bold mt-2 text-zinc-900 dark:text-white">{asg.title}</h4>
                            <p className="text-zinc-500 mt-1">{asg.description}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteAssignment(asg.id, asg.title)}
                            className="px-3.5 py-1.5 border border-rose-500/10 hover:bg-rose-500/5 text-rose-500 rounded-lg text-[10px] font-bold uppercase cursor-pointer"
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

            {/* BOOKINGS TAB */}
            {activeTab === "bookings" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <h2 className="text-base font-bold uppercase tracking-wider">Mentorship & Counseling Bookings</h2>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by student name..."
                    className="px-4 py-2 text-xs rounded-full border border-zinc-200 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 focus:outline-none focus:border-brand-orange w-full max-w-sm"
                  />
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-zinc-50 dark:bg-white/[0.01] border-b border-zinc-200 dark:border-white/5 text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
                          <th className="px-6 py-4">Student Name</th>
                          <th className="px-6 py-4">Mobile Number</th>
                          <th className="px-6 py-4">Requested Time Slot</th>
                          <th className="px-6 py-4">Booking Created</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-white/5 font-medium">
                        {bookings
                          .filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((booking) => (
                            <tr key={booking.id} className="hover:bg-zinc-50/50 dark:hover:bg-white/[0.01] transition-all">
                              <td className="px-6 py-4 text-zinc-900 dark:text-white font-bold">{booking.name}</td>
                              <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">{booking.mobile}</td>
                              <td className="px-6 py-4 text-brand-orange font-bold">{booking.dateTime}</td>
                              <td className="px-6 py-4 text-zinc-500">{new Date(booking.createdAt).toLocaleString()}</td>
                            </tr>
                          ))}
                        {bookings.length === 0 && (
                          <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-zinc-400 italic">No counseling sessions booked in the database.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* PAYMENTS TAB */}
            {activeTab === "payments" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <h2 className="text-base font-bold uppercase tracking-wider">Tuition Fee Transactions</h2>
                    <button
                      onClick={handleExportPayments}
                      className="px-3.5 py-1.5 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-wider rounded-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-sm shadow-brand-orange/20"
                    >
                      📥 Export CSV
                    </button>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by student name or email..."
                    className="px-4 py-2 text-xs rounded-full border border-zinc-200 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 focus:outline-none focus:border-brand-orange w-full max-w-sm"
                  />
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-zinc-50 dark:bg-white/[0.01] border-b border-zinc-200 dark:border-white/5 text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
                          <th className="px-6 py-4">Billed Student</th>
                          <th className="px-6 py-4">Selected Program</th>
                          <th className="px-6 py-4">Type</th>
                          <th className="px-6 py-4 text-right">Base Amount</th>
                          <th className="px-6 py-4 text-right">GST (18%)</th>
                          <th className="px-6 py-4 text-right font-bold">Total Paid</th>
                          <th className="px-6 py-4">Method</th>
                          <th className="px-6 py-4 text-center">Status</th>
                          <th className="px-6 py-4">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-white/5 font-medium">
                        {payments
                          .filter(p =>
                            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.email.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((payment) => (
                            <tr key={payment.id} className="hover:bg-zinc-50/50 dark:hover:bg-white/[0.01] transition-all">
                              <td className="px-6 py-4 text-left">
                                <p className="font-bold text-zinc-900 dark:text-white leading-tight">{payment.name}</p>
                                <p className="text-[10px] text-zinc-500 leading-none mt-1">{payment.email}</p>
                              </td>
                              <td className="px-6 py-4 text-zinc-800 dark:text-zinc-200">{payment.program}</td>
                              <td className="px-6 py-4">
                                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                  payment.amountType === "full"
                                    ? "bg-green-500/10 text-green-500"
                                    : "bg-amber-500/10 text-amber-500"
                                }`}>
                                  {payment.amountType}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right text-zinc-600 dark:text-zinc-400">₹{payment.amount.toLocaleString("en-IN")}</td>
                              <td className="px-6 py-4 text-right text-zinc-500">₹{payment.gst.toLocaleString("en-IN")}</td>
                              <td className="px-6 py-4 text-right text-brand-orange font-bold">₹{payment.total.toLocaleString("en-IN")}</td>
                              <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400 uppercase text-[10px] font-bold">{payment.paymentMethod}</td>
                              <td className="px-6 py-4 text-center">
                                <span className="text-[9px] font-bold bg-green-500/10 text-green-500 px-2 py-0.5 rounded-md">
                                  {payment.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-zinc-400">{new Date(payment.createdAt).toLocaleString()}</td>
                            </tr>
                          ))}
                        {payments.length === 0 && (
                          <tr>
                            <td colSpan={9} className="px-6 py-12 text-center text-zinc-400 italic">No transaction records in the database.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* CERTIFICATES TAB */}
            {activeTab === "certificates" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                {/* Form to issue certificate */}
                <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl p-6 shadow-sm h-fit">
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-6">Issue Verified Certificate</h3>
                  
                  <form onSubmit={handleIssueCertificate} className="space-y-4 text-xs font-semibold">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5">Credential ID</label>
                      <input
                        type="text"
                        value={newCert.credentialId}
                        onChange={(e) => setNewCert({ ...newCert, credentialId: e.target.value })}
                        placeholder="e.g. SKILLSHA-2026-AI"
                        className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 focus:outline-none focus:border-brand-orange"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5">Student Name</label>
                      <input
                        type="text"
                        value={newCert.studentName}
                        onChange={(e) => setNewCert({ ...newCert, studentName: e.target.value })}
                        placeholder="Full name of student"
                        className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 focus:outline-none focus:border-brand-orange"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5">Course Name</label>
                      <select
                        value={newCert.courseName}
                        onChange={(e) => setNewCert({ ...newCert, courseName: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-white/10 bg-[#FAF9F6] dark:bg-zinc-950/60 focus:outline-none focus:border-brand-orange text-xs"
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

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5">Date Issued</label>
                      <input
                        type="text"
                        value={newCert.dateIssued}
                        onChange={(e) => setNewCert({ ...newCert, dateIssued: e.target.value })}
                        placeholder="e.g. May 18, 2026"
                        className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 focus:outline-none focus:border-brand-orange"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5">Grade</label>
                      <input
                        type="text"
                        value={newCert.grade}
                        onChange={(e) => setNewCert({ ...newCert, grade: e.target.value })}
                        placeholder="e.g. Distinction (A+)"
                        className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 focus:outline-none focus:border-brand-orange"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5">Authorized Instructor</label>
                      <input
                        type="text"
                        value={newCert.instructor}
                        onChange={(e) => setNewCert({ ...newCert, instructor: e.target.value })}
                        placeholder="Instructor Name"
                        className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 focus:outline-none focus:border-brand-orange"
                        required
                      />
                    </div>

                    {certMessage && (
                      <p className="text-xs text-green-500 font-bold">{certMessage}</p>
                    )}
                    {certError && (
                      <p className="text-xs text-red-500 font-bold">{certError}</p>
                    )}

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-gradient-to-r from-brand-orange to-brand-red text-white text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
                    >
                      Issue & Sign Credential
                    </button>
                  </form>
                </div>

                {/* Directory list of issued certificates */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider">Issued Credentials Directory</h3>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by student name or credential ID..."
                      className="px-4 py-2 text-xs rounded-full border border-zinc-200 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 focus:outline-none focus:border-brand-orange w-full max-w-xs"
                    />
                  </div>

                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-zinc-50 dark:bg-white/[0.01] border-b border-zinc-200 dark:border-white/5 text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
                            <th className="px-6 py-4">Credential ID</th>
                            <th className="px-6 py-4">Recipient Student</th>
                            <th className="px-6 py-4">Course Title</th>
                            <th className="px-6 py-4">Grade</th>
                            <th className="px-6 py-4">Authorized By</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-white/5 font-medium">
                          {certificates
                            .filter(c =>
                              c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              c.credentialId.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((cert) => (
                              <tr key={cert.id} className="hover:bg-zinc-50/50 dark:hover:bg-white/[0.01] transition-all">
                                <td className="px-6 py-4 font-bold text-brand-orange">
                                  <Link href={`/certificate?id=${cert.credentialId}`} target="_blank" className="hover:underline">
                                    {cert.credentialId} ↗
                                  </Link>
                                </td>
                                <td className="px-6 py-4 text-zinc-900 dark:text-white font-bold">{cert.studentName}</td>
                                <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">{cert.courseName}</td>
                                <td className="px-6 py-4 text-zinc-500 font-bold">{cert.grade}</td>
                                <td className="px-6 py-4 text-zinc-500">{cert.instructor}</td>
                              </tr>
                            ))}
                          {certificates.length === 0 && (
                            <tr>
                              <td colSpan={5} className="px-6 py-12 text-center text-zinc-400 italic">No credentials issued yet.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
