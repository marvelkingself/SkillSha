import type { Metadata } from 'next';
import Link from 'next/link';
import MetadataRemoverClient from '@/components/tools/MetadataRemoverClient';
import FAQ, { METADATA_FAQS } from '@/components/tools/FAQ';
import { Sparkles, ShieldCheck, ChevronRight, Lock, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Image Metadata Remover - Remove EXIF, GPS & XMP | Skillsha',
  description:
    'Free online image metadata remover by Skillsha. Scan and clean supported EXIF, GPS, XMP, IPTC and C2PA metadata from images with guaranteed secondary verification.',
  alternates: {
    canonical: 'https://skillsha.com/tools/ai-image-metadata-remover',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillSha Tools',
    title: 'AI Image Metadata Remover - Remove EXIF, GPS & XMP | Skillsha',
    description:
      'Inspect and clean camera EXIF, GPS geotags, XMP data, and AI prompts from your images. Zero server storage.',
    url: 'https://skillsha.com/tools/ai-image-metadata-remover',
    images: [{ url: 'https://skillsha.com/files/logo-icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Image Metadata Remover | Skillsha Tools',
    description: 'Free online image metadata cleaner. Strip EXIF, GPS, and AI metadata safely.',
    images: ['https://skillsha.com/files/logo-icon.png'],
  },
};

export default function ImageMetadataRemoverPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Skillsha AI Image Metadata Remover',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All (Web-based)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online tool to inspect and strip EXIF, GPS coordinates, XMP, IPTC, and AI parameters from JPG, PNG, and WebP images.',
        url: 'https://skillsha.com/tools/ai-image-metadata-remover',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Skillsha',
            item: 'https://skillsha.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Free Tools',
            item: 'https://skillsha.com/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'AI Image Metadata Remover',
            item: 'https://skillsha.com/tools/ai-image-metadata-remover',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: METADATA_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="space-y-16">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
        <Link href="/" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/tools" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
          Tools
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-zinc-900 dark:text-white font-bold">
          AI Image Metadata Remover
        </span>
      </nav>

      {/* Tool Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Image Tools • 100% Free & Private</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
          AI Image <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-brand-orange bg-clip-text text-transparent">Metadata Remover</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Scan and clean supported EXIF, GPS location geotags, XMP records, IPTC notices, and generative AI parameters from your images before publishing or sharing.
        </p>
      </div>

      {/* Main Interactive Tool App */}
      <MetadataRemoverClient />

      {/* Educational Guide & SEO In-depth Sections */}
      <section className="pt-16 border-t border-zinc-200/80 dark:border-white/10 space-y-12 max-w-4xl mx-auto">
        <div className="space-y-3 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Comprehensive Privacy Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
            Understanding Image Metadata & Digital Fingerprints
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Every photo taken with a smartphone or generated by modern AI models contains hidden metadata structures. Here is what they contain and why cleaning them matters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card: What is Image Metadata */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-white/5 space-y-3 shadow-sm">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              What is Image Metadata?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Image metadata is data stored within the file binary that describes how, when, where, and by whom an image was created. Without stripping this data, sharing a photograph online can inadvertently expose your exact geographic coordinates, personal camera serials, and device information.
            </p>
          </div>

          {/* Card: EXIF Data */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-white/5 space-y-3 shadow-sm">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              What is EXIF Data?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              EXIF (Exchangeable Image File Format) stores camera parameters such as exposure time, F-number, ISO speed, camera manufacturer, exact model, lens serials, software versions, and timestamp of capture.
            </p>
          </div>

          {/* Card: GPS Geotags */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-white/5 space-y-3 shadow-sm">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              What is GPS Metadata?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Smartphones automatically embed GPS latitude, longitude, and elevation into photos. If you upload photos taken at home or private locations to forums, marketplaces, or messaging apps, anyone can extract your exact physical location.
            </p>
          </div>

          {/* Card: XMP & IPTC */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-white/5 space-y-3 shadow-sm">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              What are XMP and IPTC?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              XMP is an XML metadata standard by Adobe that stores editing steps and creator credentials. IPTC is standard for journalism, including captions and copyrights. Removing them ensures clean files free of editing breadcrumbs.
            </p>
          </div>
        </div>

        {/* Deep Dive Alert: AI Watermarks vs Metadata */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20 space-y-4">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-extrabold text-sm uppercase tracking-wider">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>Honest Technical Note: Metadata vs. AI Watermarks</span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <p>
              <strong>Does metadata removal bypass AI detectors or remove invisible watermarks?</strong>
            </p>
            <p>
              No. We believe in 100% technical honesty: This tool removes <em>file container metadata</em> (such as EXIF software tags, XMP prompts, Stable Diffusion parameter blocks, and C2PA manifests).
            </p>
            <p>
              It does <strong>not</strong> alter pixel-level invisible digital watermarks (such as Google SynthID or frequency-domain watermarks) and does not bypass neural AI content classifiers. Metadata cleaning strips header records, but does not alter the underlying generated pixel patterns.
            </p>
          </div>
        </div>

        {/* Verification Guarantee Section */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 space-y-4 shadow-sm">
          <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>How Our Two-Stage Verification Pipeline Works</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Unlike basic tools that claim metadata is stripped without checking, Skillsha runs an automated secondary scan on the output buffer before presenting it to you. The audit report strictly marks a category as &ldquo;Removed&rdquo; only when the secondary scan confirms the metadata tags are completely absent.
          </p>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <FAQ />
    </div>
  );
}
