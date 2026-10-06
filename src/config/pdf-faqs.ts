export interface PdfFaq {
  question: string;
  answer: string;
}

export const PDF_FAQS: PdfFaq[] = [
  {
    question: 'How does Skillsha compress PDF files without damaging text quality?',
    answer:
      'PDF documents store text and vector lines mathematically as scalable fonts and paths. Skillsha preserves 100% of these crisp vector fonts while targeting heavy raster images, redundant XML metadata packets, and unreferenced object streams for compression.',
  },
  {
    question: 'Are my confidential PDF documents uploaded to external servers?',
    answer:
      'No. The Skillsha PDF Compressor operates entirely client-side inside your browser memory. Your bank statements, job resumes, business contracts, and private documents are never uploaded to any remote server or stored in any database.',
  },
  {
    question: 'Which compression preset should I choose?',
    answer:
      'We offer three presets: "Recommended" (balances size and clarity, perfect for resumes and email attachments), "Extreme" (maximum reduction, best for meeting strict government or job portal upload limits under 1MB), and "Light" (lossless optimization preserving high-DPI print quality).',
  },
  {
    question: 'What is the maximum PDF file size I can compress?',
    answer:
      'Since processing occurs directly on your computer without server upload bottlenecks, you can compress PDFs up to 50MB smoothly. For larger documents, ensure your browser has sufficient available RAM.',
  },
  {
    question: 'Can I compress multiple PDF documents simultaneously?',
    answer:
      'Yes! You can drag and drop multiple PDF documents into the batch queue. Each file is compressed in parallel, and you can download files individually or all at once.',
  },
  {
    question: 'Will hyperlinks and bookmarks in the PDF still work after compression?',
    answer:
      'Yes. Internal document bookmarks, external web hyperlinks, and table of contents structures are preserved during optimization.',
  },
  {
    question: 'Is this PDF Compressor completely free to use?',
    answer:
      'Yes, 100% free and unlimited. There are no hourly file caps, no watermarks added, and no account registration required.',
  },
];
