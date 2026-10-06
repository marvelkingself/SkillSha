export interface QrFaq {
  question: string;
  answer: string;
}

export const QR_FAQS: QrFaq[] = [
  {
    question: 'Are QR codes created on Skillsha 100% free and permanent?',
    answer:
      'Yes, all QR codes generated through Skillsha are 100% free, static, and permanent. They never expire, contain no subscription limits, and have no scan counters because data is encoded directly into the 2D matrix pattern.',
  },
  {
    question: 'Does Skillsha store or track the links and information encoded in my QR code?',
    answer:
      'No. Skillsha operates a strict client-side-first privacy model. The QR code generation runs directly inside your web browser using HTML5 Canvas and Vector SVG rendering. Your URLs, passwords, Wi-Fi credentials, and contact details are never transmitted to our servers or saved anywhere.',
  },
  {
    question: 'Which Error Correction Level should I use?',
    answer:
      'Standard QR codes support 4 levels: Low (7% recovery), Medium (15% recovery, recommended default), Quartile (25% recovery), and High (30% recovery). If you are printing outdoors, on moving vehicles, or placing a custom company logo in the center of the QR code, select High (H) error correction.',
  },
  {
    question: 'Can I download vector SVG QR codes for professional high-resolution printing?',
    answer:
      'Yes. Skillsha provides both high-resolution PNG downloads (up to 1000px) and lossless vector SVG exports. SVG files can be infinitely scaled for large billboards, banners, product packaging, and business cards without pixelation.',
  },
  {
    question: 'How do Wi-Fi QR codes work on smartphones?',
    answer:
      'When you generate a Wi-Fi QR code with your network SSID and WPA/WPA2/WPA3 password, scanning the code with an iPhone or Android camera automatically prompts the user with a "Join Network" button, connecting them instantly without typing the password.',
  },
  {
    question: 'What is the minimum recommended print size for a QR code?',
    answer:
      'For short URLs and contact cards, a physical print size of at least 2 cm × 2 cm (0.8 in × 0.8 in) is recommended. For long URLs or complex vCards with higher matrix density, ensure at least 3 cm × 3 cm with adequate contrast between foreground and background.',
  },
  {
    question: 'Can I put my brand logo in the center of the QR code?',
    answer:
      'Yes! You can upload your own custom logo or select the Skillsha icon. The generator automatically positions it in the center with a protective contrast badge and adjusts error correction so scanners can still read the data effortlessly.',
  },
];
