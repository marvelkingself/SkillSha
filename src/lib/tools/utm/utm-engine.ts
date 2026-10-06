export interface UtmParams {
  baseUrl: string;
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
}

export interface UtmFormatOptions {
  autoLowercase: boolean;
  spaceReplacement: 'hyphen' | 'underscore' | 'plus';
}

export interface UtmPreset {
  id: string;
  name: string;
  channel: string;
  source: string;
  medium: string;
  description: string;
}

export const UTM_PRESETS: UtmPreset[] = [
  {
    id: 'google-cpc',
    name: 'Google Ads (Search/PPC)',
    channel: 'Paid Search',
    source: 'google',
    medium: 'cpc',
    description: 'Track paid search campaigns, responsive search ads, and keywords in Google Ads.',
  },
  {
    id: 'facebook-ads',
    name: 'Facebook Ads',
    channel: 'Paid Social',
    source: 'facebook',
    medium: 'paid-social',
    description: 'Track Meta Ads Manager conversions and sponsored feed carousel links.',
  },
  {
    id: 'instagram-bio',
    name: 'Instagram Link in Bio',
    channel: 'Organic Social',
    source: 'instagram',
    medium: 'bio',
    description: 'Attribute profile visits, bio clicks, and story link stickers.',
  },
  {
    id: 'linkedin-sponsored',
    name: 'LinkedIn Sponsored Ads',
    channel: 'Paid Social',
    source: 'linkedin',
    medium: 'paid-social',
    description: 'B2B lead generation ads and promoted thought-leadership posts.',
  },
  {
    id: 'twitter-x',
    name: 'Twitter / X Campaign',
    channel: 'Paid Social',
    source: 'twitter',
    medium: 'paid-social',
    description: 'Promoted posts, influencer tweets, and engagement campaigns on X.',
  },
  {
    id: 'email-newsletter',
    name: 'Email Newsletter',
    channel: 'Email',
    source: 'newsletter',
    medium: 'email',
    description: 'Track click rates across weekly email digests and automated drip campaigns.',
  },
  {
    id: 'youtube-desc',
    name: 'YouTube Video Description',
    channel: 'Organic Video',
    source: 'youtube',
    medium: 'video-description',
    description: 'Measure traffic driven from video links, pinned comments, and end screens.',
  },
  {
    id: 'affiliate-partner',
    name: 'Affiliate & Influencer',
    channel: 'Affiliate',
    source: 'partner',
    medium: 'affiliate',
    description: 'Track third-party referral revenue and commission attribution.',
  },
];

export function sanitizeParam(
  val: string | undefined,
  options: UtmFormatOptions
): string {
  if (!val) return '';
  let str = val.trim();

  if (options.autoLowercase) {
    str = str.toLowerCase();
  }

  const sep = options.spaceReplacement === 'underscore' ? '_' : options.spaceReplacement === 'plus' ? '+' : '-';
  str = str.replace(/\s+/g, sep);

  return str;
}

export function buildUtmUrl(
  params: UtmParams,
  options: UtmFormatOptions = { autoLowercase: true, spaceReplacement: 'hyphen' }
): { fullUrl: string; isValid: boolean; error?: string } {
  let base = params.baseUrl.trim();
  if (!base) {
    return { fullUrl: '', isValid: false, error: 'Base website URL is required.' };
  }

  // Prepend https:// if protocol is omitted
  if (!/^https?:\/\//i.test(base)) {
    base = `https://${base}`;
  }

  try {
    const urlObj = new URL(base);

    const s = sanitizeParam(params.source, options);
    const m = sanitizeParam(params.medium, options);
    const c = sanitizeParam(params.campaign, options);
    const t = sanitizeParam(params.term, options);
    const cnt = sanitizeParam(params.content, options);

    if (s) urlObj.searchParams.set('utm_source', s);
    if (m) urlObj.searchParams.set('utm_medium', m);
    if (c) urlObj.searchParams.set('utm_campaign', c);
    if (t) urlObj.searchParams.set('utm_term', t);
    if (cnt) urlObj.searchParams.set('utm_content', cnt);

    return { fullUrl: urlObj.toString(), isValid: true };
  } catch {
    return { fullUrl: '', isValid: false, error: 'Invalid URL format entered.' };
  }
}

export function generateBatchChannels(
  baseUrl: string,
  campaignName: string,
  options: UtmFormatOptions
): { channel: string; url: string; source: string; medium: string }[] {
  const selectedPresets = [
    { channel: 'Google Search Ads', source: 'google', medium: 'cpc' },
    { channel: 'Meta / Facebook Ads', source: 'facebook', medium: 'paid-social' },
    { channel: 'Instagram Feed / Bio', source: 'instagram', medium: 'social' },
    { channel: 'LinkedIn Ads', source: 'linkedin', medium: 'paid-social' },
    { channel: 'Email Newsletter', source: 'newsletter', medium: 'email' },
    { channel: 'YouTube Video Links', source: 'youtube', medium: 'video' },
  ];

  return selectedPresets.map((p) => {
    const res = buildUtmUrl(
      {
        baseUrl,
        source: p.source,
        medium: p.medium,
        campaign: campaignName || 'launch_campaign',
      },
      options
    );
    return {
      channel: p.channel,
      url: res.fullUrl,
      source: p.source,
      medium: p.medium,
    };
  });
}
