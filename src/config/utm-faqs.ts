export interface UtmFaq {
  question: string;
  answer: string;
}

export const UTM_FAQS: UtmFaq[] = [
  {
    question: 'What are UTM parameters and why are they essential for marketing?',
    answer:
      'UTM (Urchin Tracking Module) parameters are 5 specific query tags added to the end of a URL: utm_source, utm_medium, utm_campaign, utm_term, and utm_content. When users click the link, Google Analytics (GA4) attributes the session and conversions back to the exact campaign, ad creative, and platform that drove the visitor.',
  },
  {
    question: 'Are UTM parameters case-sensitive in Google Analytics 4 (GA4)?',
    answer:
      'Yes! Google Analytics treats "Facebook", "facebook", and "FACEBOOK" as three completely distinct sources, fragmenting your reports. Skillsha automatically enforces lowercase formatting to ensure clean, unified analytics data.',
  },
  {
    question: 'What is the difference between utm_source and utm_medium?',
    answer:
      'Source (utm_source) answers WHERE the traffic comes from (e.g. google, facebook, linkedin, newsletter). Medium (utm_medium) answers HOW it arrived (e.g. cpc, email, organic-social, affiliate).',
  },
  {
    question: 'Which UTM parameters are strictly required?',
    answer:
      'For accurate tracking in Google Analytics 4, utm_source, utm_medium, and utm_campaign are strongly recommended. utm_term (used for paid search keywords) and utm_content (used to differentiate A/B test creatives or buttons) are optional.',
  },
  {
    question: 'Should I use spaces, underscores, or hyphens in UTM values?',
    answer:
      'Hyphens (-) or underscores (_) are standard best practice. Raw spaces get URL-encoded into awkward "%20" strings which look messy and can cause tracking discrepancies across marketing platforms.',
  },
  {
    question: 'Can I use UTM tags on internal website links?',
    answer:
      'No. You should never use UTM parameters on internal links between pages of your own website (e.g. from your homepage to your checkout). Doing so resets the user session and overwrites the original referral source that first brought the visitor to your site.',
  },
  {
    question: 'Does Skillsha store or track the links I create?',
    answer:
      'No. The Skillsha UTM Campaign Builder runs 100% locally in your browser. None of your URLs, campaign names, or sensitive promotional links are logged or stored on our servers.',
  },
];
