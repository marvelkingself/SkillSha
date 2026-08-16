"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function FeePaymentPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("AI Engineering Masterclass");
  const [amountType, setAmountType] = useState("registration");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const getAmount = () => {
    if (amountType === "registration") return 15000;
    if (amountType === "installments") return 45000;
    return 120000; // Full Program Fee
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please fill in your name and email address.");
      return;
    }
    setIsProcessing(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          program,
          amountType,
          amount: getAmount(),
          gst,
          total,
          paymentMethod
        })
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        const data = await res.json();
        alert(data.error || "Payment recording failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error processing transaction.");
    } finally {
      setIsProcessing(false);
    }
  };

  const gst = getAmount() * 0.18;
  const total = getAmount() + gst;

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#050505] text-zinc-900 dark:text-white transition-colors duration-300">
      <meta name="robots" content="noindex, nofollow" />
      <Header />
      
      <main className="max-w-[1200px] mx-auto px-6 pt-32 pb-24">
        {/* Page Intro */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-reveal active">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/10 dark:bg-brand-orange/20 px-3 py-1 rounded-full">
            Secure Payment Gateway
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-4 mb-4">
            Fee Payment 💳
          </h1>
          <p className="text-[14px] text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">
            Process tuition, registration, or installment payments securely. Verified transactions are processed in real-time.
          </p>
        </div>

        {isSuccess ? (
          <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl p-8 shadow-2xl text-center animate-reveal active">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Payment Successful</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
              Thank you, <span className="font-semibold text-zinc-800 dark:text-zinc-200">{name}</span>. A digital receipt has been dispatched to <span className="font-semibold text-zinc-800 dark:text-zinc-200">{email}</span>. Your seat is confirmed.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                setName("");
                setEmail("");
              }}
              className="px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              Make Another Payment
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-4xl mx-auto">
            {/* Form Section */}
            <form onSubmit={handlePayment} className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Billing Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Student Full Name
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
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. contact@skillsha.in"
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.02] text-zinc-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Select Program Track
                </label>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
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

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                  Payment Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { type: "registration", label: "Registration Fee", val: "₹15,000" },
                    { type: "installments", label: "Installment", val: "₹45,000" },
                    { type: "full", label: "Full Course Fee", val: "₹1,20,000" }
                  ].map((item) => (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => setAmountType(item.type)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        amountType === item.type
                          ? "border-brand-orange bg-brand-orange/[0.03] text-brand-orange"
                          : "border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.02] hover:bg-zinc-100 dark:hover:bg-white/5"
                      }`}
                    >
                      <span className="block text-[9px] uppercase font-bold tracking-wider opacity-60">{item.label}</span>
                      <span className="block text-xs font-extrabold mt-1">{item.val}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "upi", label: "UPI / QR Code", icon: "📱" },
                    { id: "card", label: "Card Payment", icon: "💳" },
                    { id: "net", label: "Net Banking", icon: "🏦" }
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        paymentMethod === method.id
                          ? "border-brand-orange bg-brand-orange/[0.03] text-brand-orange"
                          : "border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.02] hover:bg-zinc-100 dark:hover:bg-white/5"
                      }`}
                    >
                      <span className="text-xs">{method.icon}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-md shadow-brand-orange/20 cursor-pointer flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Processing Transaction...
                  </>
                ) : (
                  `Pay ₹${total.toLocaleString("en-IN")}`
                )}
              </button>
            </form>

            {/* Summary Sidebar */}
            <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-6">
                  Order Summary
                </h3>
                
                <div className="space-y-4 text-xs">
                  <div className="flex justify-between items-start border-b border-zinc-100 dark:border-white/5 pb-4">
                    <div>
                      <span className="block font-bold text-zinc-800 dark:text-zinc-200">{program}</span>
                      <span className="block text-[10px] text-zinc-400 mt-1 capitalize">{amountType} Payment</span>
                    </div>
                    <span className="font-extrabold text-zinc-900 dark:text-white">₹{getAmount().toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between items-center text-zinc-500 dark:text-zinc-400 py-1">
                    <span>Subtotal</span>
                    <span>₹{getAmount().toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between items-center text-zinc-500 dark:text-zinc-400 py-1">
                    <span>GST (18%)</span>
                    <span>₹{gst.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between items-center border-t border-zinc-100 dark:border-white/5 pt-4 text-sm font-bold">
                    <span className="text-zinc-800 dark:text-zinc-200">Grand Total</span>
                    <span className="text-brand-orange text-base font-extrabold">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              {/* Secure Trust Stamp */}
              <div className="mt-8 p-4 bg-zinc-50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/5 rounded-xl flex items-start gap-3">
                <div className="text-xl">🛡️</div>
                <div className="text-left">
                  <h4 className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide">SSL Secured Encryption</h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5 leading-relaxed font-normal normal-case">All transactions are processed through 256-bit secure end-to-end encrypted gateways. No card credentials are stored locally.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
