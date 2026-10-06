export interface SeoMetaState {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords: string;
  author: string;
  siteName: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: 'website' | 'article' | 'product';
  twitterCard: 'summary_large_image' | 'summary';
  twitterHandle: string;
}

export function generateHtmlMetaTags(state: SeoMetaState): string {
  const lines: string[] = [];

  lines.push('<!-- Standard Metadata -->');
  if (state.title) lines.push(`<title>${escapeHtml(state.title)}</title>`);
  if (state.description) lines.push(`<meta name="description" content="${escapeHtml(state.description)}" />`);
  if (state.keywords) lines.push(`<meta name="keywords" content="${escapeHtml(state.keywords)}" />`);
  if (state.author) lines.push(`<meta name="author" content="${escapeHtml(state.author)}" />`);
  if (state.canonicalUrl) lines.push(`<link rel="canonical" href="${escapeHtml(state.canonicalUrl)}" />`);

  const robots = `${state.robotsIndex ? 'index' : 'noindex'}, ${state.robotsFollow ? 'follow' : 'nofollow'}, max-snippet:-1, max-image-preview:large`;
  lines.push(`<meta name="robots" content="${robots}" />`);

  lines.push('');
  lines.push('<!-- Open Graph / Facebook / LinkedIn -->');
  lines.push(`<meta property="og:type" content="${state.ogType || 'website'}" />`);
  if (state.canonicalUrl) lines.push(`<meta property="og:url" content="${escapeHtml(state.canonicalUrl)}" />`);
  lines.push(`<meta property="og:title" content="${escapeHtml(state.ogTitle || state.title)}" />`);
  lines.push(`<meta property="og:description" content="${escapeHtml(state.ogDescription || state.description)}" />`);
  if (state.ogImage) lines.push(`<meta property="og:image" content="${escapeHtml(state.ogImage)}" />`);
  if (state.siteName) lines.push(`<meta property="og:site_name" content="${escapeHtml(state.siteName)}" />`);

  lines.push('');
  lines.push('<!-- Twitter / X Cards -->');
  lines.push(`<meta name="twitter:card" content="${state.twitterCard || 'summary_large_image'}" />`);
  lines.push(`<meta name="twitter:title" content="${escapeHtml(state.ogTitle || state.title)}" />`);
  lines.push(`<meta name="twitter:description" content="${escapeHtml(state.ogDescription || state.description)}" />`);
  if (state.ogImage) lines.push(`<meta name="twitter:image" content="${escapeHtml(state.ogImage)}" />`);
  if (state.twitterHandle) lines.push(`<meta name="twitter:site" content="${escapeHtml(state.twitterHandle)}" />`);

  return lines.join('\n');
}

export function generateNextJsMetadataSnippet(state: SeoMetaState): string {
  const title = state.title || 'Page Title';
  const description = state.description || 'Page Description';
  const url = state.canonicalUrl || 'https://example.com';
  const ogImg = state.ogImage || 'https://example.com/og-image.jpg';

  return `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${title.replace(/'/g, "\\'")}',
  description: '${description.replace(/'/g, "\\'")}',
  alternates: {
    canonical: '${url}',
  },
  robots: {
    index: ${state.robotsIndex},
    follow: ${state.robotsFollow},
    'max-snippet': -1,
    'max-image-preview': 'large',
  },
  openGraph: {
    type: '${state.ogType}',
    siteName: '${(state.siteName || 'Skillsha').replace(/'/g, "\\'")}',
    title: '${(state.ogTitle || title).replace(/'/g, "\\'")}',
    description: '${(state.ogDescription || description).replace(/'/g, "\\'")}',
    url: '${url}',
    images: [{ url: '${ogImg}' }],
  },
  twitter: {
    card: '${state.twitterCard}',
    title: '${(state.ogTitle || title).replace(/'/g, "\\'")}',
    description: '${(state.ogDescription || description).replace(/'/g, "\\'")}',
    images: ['${ogImg}'],
    ${state.twitterHandle ? `creator: '${state.twitterHandle}',` : ''}
  },
};`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
