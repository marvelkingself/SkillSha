import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import GlobalInteraction from "@/components/GlobalInteraction";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkillSha | Best IT Training Institute in Noida",
  description: "SkillSha is a live, mentor-led IT training institute in Noida offering AI Engineering, Full-Stack Development, UI/UX Design, and Product Management programs with placement assistance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Warm up third-party origins on the critical path */}
        <link rel="preconnect" href="https://img.youtube.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload LCP Image for instant paint */}
        <link rel="preload" href="https://img.youtube.com/vi/sgVJPhMHnys/hqdefault.jpg" as="image" fetchPriority="high" />
        {/* Icon font: media="print" so it never blocks first paint, flipped to "all" once loaded */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var l = document.createElement('link');
                l.rel = 'stylesheet';
                l.media = 'print';
                l.onload = function() { this.media = 'all'; };
                l.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap';
                document.head.appendChild(l);
              })();
            `,
          }}
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          />
        </noscript>
        {/* Simple inline script to read theme from local storage or system preference to prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
              } else {
                  document.documentElement.classList.remove('dark');
              }
            `,
          }}
        />
      </head>
      <body className={`${dmSans.variable} ${spaceGrotesk.variable} relative min-h-screen overflow-x-clip bg-[#FAF9F6] dark:bg-[#050505] text-zinc-900 dark:text-white transition-colors duration-300 selection:bg-brand-orange selection:text-white pb-32 md:pb-0 font-sans`} suppressHydrationWarning>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P5NFQTKB');
          `}
        </Script>
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-8RCRBGKM1Q" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8RCRBGKM1Q');
          `}
        </Script>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P5NFQTKB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        {/* World-Class 2026 Ambient Background Elements */}
        <div className="noise-overlay"></div>
        <div className="fixed inset-0 pointer-events-none z-[-2] overflow-hidden select-none">
            {/* Ambient Floating Orbs */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-orange/[0.04] dark:bg-brand-orange/[0.025] blur-[120px] top-[-100px] left-[-100px] animate-[float-slow-1_20s_infinite_ease-in-out] glow-orb"></div>
            <div className="absolute w-[600px] h-[600px] rounded-full bg-indigo-500/[0.03] dark:bg-indigo-500/[0.015] blur-[130px] top-[40%] right-[-150px] animate-[float-slow-2_25s_infinite_ease-in-out] glow-orb"></div>
            <div className="absolute w-[450px] h-[450px] rounded-full bg-amber-500/[0.025] dark:bg-amber-500/[0.012] blur-[110px] bottom-[-100px] left-[20%] animate-[float-slow-1_18s_infinite_ease-in-out] glow-orb"></div>
            
            {/* Large Background Glow Orbs clipped to viewport */}
            <div className="glow-orb w-[500px] h-[500px] bg-brand-orange top-[-150px] left-[-100px] dark:hidden"></div>
            <div className="glow-orb w-[400px] h-[400px] bg-brand-red top-[30%] right-[-100px] dark:hidden"></div>
        </div>

        {/* Interactive Cursor Glow Spotlight */}
        <div id="interactive-bg-glow" className="fixed inset-0 pointer-events-none z-[-2] opacity-0 transition-opacity duration-1000 select-none">
            <div className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_closest-side,rgba(37,99,235,0.05),transparent_100%)] dark:bg-[radial-gradient(circle_closest-side,rgba(37,99,235,0.03),transparent_100%)]"></div>
        </div>
        
        {/* Full-bleed top grid background (hero only) */}
        <div className="absolute inset-x-0 top-0 h-[800px] bg-grid pointer-events-none z-[-1]" style={{ maskImage: 'linear-gradient(to bottom, black 70%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent)' }}></div>

        <GlobalInteraction />
        {children}
        <Script src="/script.js" strategy="afterInteractive" />
        {/* Microsoft Clarity */}
        <Script id="ms-clarity" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","x90nk88d2u");`
        }} />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
