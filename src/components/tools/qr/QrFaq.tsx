'use client';

import { useState } from 'react';
import { QR_FAQS } from '@/config/qr-faqs';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function QrFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="space-y-6 max-w-4xl mx-auto pt-6">
      <div className="flex items-center gap-2.5 text-slate-900 dark:text-white">
        <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl sm:text-2xl font-bold">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-3">
        {QR_FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 text-slate-400 ${
                    isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-4 text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
