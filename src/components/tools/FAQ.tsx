'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const METADATA_FAQS: FaqItem[] = [
  {
    question: 'What is image metadata?',
    answer:
      'Image metadata is supplementary data packaged inside the image file container alongside visual pixel information. It records technical camera settings, hardware serials, exact geographic coordinates (geotags), editing history, author copyrights, and generation prompts from AI engines.',
  },
  {
    question: 'What is EXIF data?',
    answer:
      'EXIF (Exchangeable Image File Format) is an international standard used by digital cameras, smartphones, and software to store capture attributes. It frequently includes your camera make, model, lens parameters, shutter speed, aperture, ISO, timestamp, and device serial numbers.',
  },
  {
    question: 'What is GPS metadata in photos?',
    answer:
      'GPS metadata consists of exact global positioning coordinates (latitude, longitude, altitude, and timestamp) recorded by your smartphone or GPS-enabled camera at the precise location the picture was captured. Cleaning GPS data protects your privacy and prevents location tracking when sharing photos online.',
  },
  {
    question: 'What is XMP metadata?',
    answer:
      'XMP (Extensible Metadata Platform) is an XML-based metadata standard pioneered by Adobe. It records non-destructive edit histories, color adjustments, software versions, copyright credentials, and is frequently utilized by generative AI tools to record generation parameters.',
  },
  {
    question: 'What is IPTC metadata?',
    answer:
      'IPTC (International Press Telecommunications Council) metadata is the photojournalism and stock photography standard for attaching captions, headlines, copyright notices, author by-lines, and contact details to image files.',
  },
  {
    question: 'What is C2PA / Content Credentials?',
    answer:
      'C2PA (Coalition for Content Provenance and Authenticity) is an open technical standard that embeds cryptographic provenance manifests (often in JUMBF container boxes) to certify the origin, history, and digital signing of media assets across creation tools.',
  },
  {
    question: 'Does removing metadata remove AI watermarks or bypass AI detectors?',
    answer:
      'No. This tool removes container metadata records (such as EXIF software tags, XMP prompts, and PNG parameter blocks). It does NOT alter pixel-level invisible digital watermarks (such as SynthID or steganographic noise) and does not bypass neural AI content detectors. We believe in 100% technical honesty: metadata cleaning strips file headers, but does not alter the underlying synthetic pixel patterns.',
  },
  {
    question: 'Does metadata removal affect image quality?',
    answer:
      'In "Metadata Only" mode (Mode 1), the visual pixel stream is preserved while stripping header metadata chunks, resulting in virtually no visual quality loss. In "Re-encode Image" mode (Mode 2), the image is freshly re-encoded with your selected quality factor (default 90%), which provides complete container recreation with minimal to no perceptible difference.',
  },
  {
    question: 'Are uploaded images stored on your servers?',
    answer:
      'No. Skillsha enforces a strict zero-retention privacy policy. Uploaded images are held strictly in temporary RAM buffers solely for the duration of the scan and clean operation. No files are saved to permanent disks, sent to third-party APIs, or used for AI model training.',
  },
  {
    question: 'What image formats are supported?',
    answer:
      'Skillsha AI Image Metadata Remover supports standard JPG, JPEG, PNG, WebP, AVIF, and TIFF images up to 25 MB.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-12 space-y-6">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
          Everything You Need to Know About Metadata Cleaning
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Clear, honest technical answers regarding image privacy, EXIF, and AI provenance.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3 pt-4">
        {METADATA_FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.question}
              className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-zinc-400'
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-white/5 pt-4 animate-in fade-in duration-200">
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
