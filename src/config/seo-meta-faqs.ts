export interface SeoMetaFaq {
  question: string;
  answer: string;
}

export const SEO_META_FAQS: SeoMetaFaq[] = [
  {
    question: 'What is the optimal character length for an SEO title tag in 2026?',
    answer:
      'Google measures title tags in pixels rather than exact character counts, with a maximum display limit of roughly 600 pixels. In characters, this translates to 50 to 60 characters. Keeping your title within this range ensures it will not be truncated with trailing ellipses (...) on desktop or mobile search results.',
  },
  {
    question: 'How long should a meta description be for Google SERP?',
    answer:
      'The ideal meta description length is between 140 and 160 characters (up to ~960 pixels). While Google sometimes rewrites or extracts snippets directly from page content, providing a clear, benefit-driven description with a call-to-action significantly boosts search click-through rate (CTR).',
  },
  {
    question: 'Why are Open Graph (OG) tags critical for digital marketing?',
    answer:
      'When your link is shared on WhatsApp, LinkedIn, Facebook, Slack, or Discord, these platforms parse og:title, og:description, and og:image tags to construct rich visual preview cards. Pages with high-quality OG images and custom titles generate up to 3x higher engagement than plain links.',
  },
  {
    question: 'What is a Canonical URL and when should I use it?',
    answer:
      'A canonical URL (<link rel="canonical" href="..." />) tells search engines which URL represents the original "master" version of a page. This prevents duplicate content penalties if your page can be accessed via multiple paths, tracking query strings (such as UTM parameters), or HTTP/HTTPS variants.',
  },
  {
    question: 'What do the "index, follow" robots directives mean?',
    answer:
      '"index" allows search engine crawlers to include the page in their search index. "follow" tells crawlers to follow the links found on the page to discover other pages. Setting "noindex" is recommended for internal admin dashboards, thank-you pages, or staging sites.',
  },
  {
    question: 'How do I use the exported Next.js Metadata snippet in App Router?',
    answer:
      'Skillsha provides a dedicated Next.js tab that formats your tags into the official TypeScript "export const metadata: Metadata = { ... }" object. Simply copy and paste the snippet into your page.tsx or layout.tsx file in Next.js 13, 14, 15, or 16.',
  },
  {
    question: 'Does this tool store my website data or meta tags?',
    answer:
      'No. The Skillsha SEO Meta Tag Generator operates completely client-side in your browser. None of your titles, descriptions, or URLs are sent to external servers or logged in any database.',
  },
];
