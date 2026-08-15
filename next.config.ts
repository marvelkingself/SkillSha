import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "/vi/**",
      },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
  async redirects() {
    return [
      { source: "/ai-engineering", destination: "/course/ai-engineering-course", permanent: true },
      { source: "/full-stack-development", destination: "/course/full-stack-development-course", permanent: true },
      { source: "/digital-marketing-with-gen-ai", destination: "/course/digital-marketing-course-with-gen-ai", permanent: true },
      { source: "/digital-marketing", destination: "/course/digital-marketing-course", permanent: true },
      { source: "/ui-ux-design", destination: "/course/ui-ux-design-course", permanent: true },
      { source: "/data-science-ai", destination: "/course/data-science-course", permanent: true },
      { source: "/product-management", destination: "/course/product-management-course", permanent: true },
      { source: "/algorithmic-trading", destination: "/course/algorithmic-trading-course", permanent: true },
      { source: "/graphic-designing", destination: "/course/graphic-design-course", permanent: true },
      { source: "/mental-health-wellness", destination: "/course/mental-health-wellness-course", permanent: true },
      { source: "/ai-healthcare-doctor", destination: "/course/ai-healthcare-doctor-course", permanent: true },
      { source: "/ai-clinical-nurse", destination: "/course/ai-clinical-nurse-course", permanent: true },
      { source: "/ai-finance-ca", destination: "/course/ai-finance-ca-course", permanent: true },
      { source: "/data-analyst", destination: "/course/data-analyst-course", permanent: true },
      { source: "/business-analyst", destination: "/course/business-analyst-course", permanent: true },
      { source: "/ai-ml-with-gen-ai", destination: "/course/ai-ml-course", permanent: true },
      { source: "/software-testing", destination: "/course/software-testing-course", permanent: true },
      { source: "/playwright-automation", destination: "/course/playwright-automation-course", permanent: true },
      
      { source: "/ai-engineering/:city", destination: "/course/ai-engineering-course/:city", permanent: true },
      { source: "/full-stack-development/:city", destination: "/course/full-stack-development-course/:city", permanent: true },
      { source: "/digital-marketing-with-gen-ai/:city", destination: "/course/digital-marketing-course-with-gen-ai/:city", permanent: true },
      { source: "/digital-marketing/:city", destination: "/course/digital-marketing-course/:city", permanent: true },
      { source: "/ui-ux-design/:city", destination: "/course/ui-ux-design-course/:city", permanent: true },
      { source: "/data-science-ai/:city", destination: "/course/data-science-course/:city", permanent: true },
      { source: "/product-management/:city", destination: "/course/product-management-course/:city", permanent: true },
      { source: "/algorithmic-trading/:city", destination: "/course/algorithmic-trading-course/:city", permanent: true },
      { source: "/graphic-designing/:city", destination: "/course/graphic-design-course/:city", permanent: true },
      { source: "/mental-health-wellness/:city", destination: "/course/mental-health-wellness-course/:city", permanent: true },
      { source: "/ai-healthcare-doctor/:city", destination: "/course/ai-healthcare-doctor-course/:city", permanent: true },
      { source: "/ai-clinical-nurse/:city", destination: "/course/ai-clinical-nurse-course/:city", permanent: true },
      { source: "/ai-finance-ca/:city", destination: "/course/ai-finance-ca-course/:city", permanent: true },
      { source: "/data-analyst/:city", destination: "/course/data-analyst-course/:city", permanent: true },
      { source: "/business-analyst/:city", destination: "/course/business-analyst-course/:city", permanent: true },
      { source: "/ai-ml-with-gen-ai/:city", destination: "/course/ai-ml-course/:city", permanent: true },
      { source: "/software-testing/:city", destination: "/course/software-testing-course/:city", permanent: true },
      { source: "/playwright-automation/:city", destination: "/course/playwright-automation-course/:city", permanent: true },
    ];
  },
};

export default nextConfig;
