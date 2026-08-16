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
    {
        "source": "/ai-engineering",
        "destination": "/course/ai-engineering-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/ai-engineering/:city",
        "destination": "/course/ai-engineering-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/full-stack-development",
        "destination": "/course/full-stack-development-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/full-stack-development/:city",
        "destination": "/course/full-stack-development-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/digital-marketing-with-gen-ai",
        "destination": "/course/digital-marketing-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/digital-marketing-with-gen-ai/:city",
        "destination": "/course/digital-marketing-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/digital-marketing",
        "destination": "/course/digital-marketing-course-standard-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/digital-marketing/:city",
        "destination": "/course/digital-marketing-course-standard-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/ui-ux-design",
        "destination": "/course/ui-ux-design-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/ui-ux-design/:city",
        "destination": "/course/ui-ux-design-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/data-science-ai",
        "destination": "/course/data-science-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/data-science-ai/:city",
        "destination": "/course/data-science-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/product-management",
        "destination": "/course/product-management-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/product-management/:city",
        "destination": "/course/product-management-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/algorithmic-trading",
        "destination": "/course/algorithmic-trading-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/algorithmic-trading/:city",
        "destination": "/course/algorithmic-trading-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/graphic-designing",
        "destination": "/course/graphic-design-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/graphic-designing/:city",
        "destination": "/course/graphic-design-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/mental-health-wellness",
        "destination": "/course/mental-health-wellness-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/mental-health-wellness/:city",
        "destination": "/course/mental-health-wellness-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/ai-healthcare-doctor",
        "destination": "/course/ai-healthcare-doctor-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/ai-healthcare-doctor/:city",
        "destination": "/course/ai-healthcare-doctor-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/ai-clinical-nurse",
        "destination": "/course/ai-clinical-nurse-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/ai-clinical-nurse/:city",
        "destination": "/course/ai-clinical-nurse-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/ai-finance-ca",
        "destination": "/course/ai-finance-ca-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/ai-finance-ca/:city",
        "destination": "/course/ai-finance-ca-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/data-analyst",
        "destination": "/course/data-analyst-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/data-analyst/:city",
        "destination": "/course/data-analyst-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/business-analyst",
        "destination": "/course/business-analyst-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/business-analyst/:city",
        "destination": "/course/business-analyst-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/ai-ml-with-gen-ai",
        "destination": "/course/ai-ml-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/ai-ml-with-gen-ai/:city",
        "destination": "/course/ai-ml-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/software-testing",
        "destination": "/course/software-testing-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/software-testing/:city",
        "destination": "/course/software-testing-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/playwright-automation",
        "destination": "/course/playwright-automation-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/playwright-automation/:city",
        "destination": "/course/playwright-automation-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/ai-engineering-course",
        "destination": "/course/ai-engineering-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/ai-engineering-course/:city",
        "destination": "/course/ai-engineering-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/full-stack-development-course",
        "destination": "/course/full-stack-development-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/full-stack-development-course/:city",
        "destination": "/course/full-stack-development-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/digital-marketing-course-with-gen-ai/:city",
        "destination": "/course/digital-marketing-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/digital-marketing-course",
        "destination": "/course/digital-marketing-course-standard-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/digital-marketing-course/:city",
        "destination": "/course/digital-marketing-course-standard-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/ui-ux-design-course",
        "destination": "/course/ui-ux-design-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/ui-ux-design-course/:city",
        "destination": "/course/ui-ux-design-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/data-science-course",
        "destination": "/course/data-science-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/data-science-course/:city",
        "destination": "/course/data-science-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/product-management-course",
        "destination": "/course/product-management-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/product-management-course/:city",
        "destination": "/course/product-management-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/algorithmic-trading-course",
        "destination": "/course/algorithmic-trading-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/algorithmic-trading-course/:city",
        "destination": "/course/algorithmic-trading-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/graphic-design-course",
        "destination": "/course/graphic-design-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/graphic-design-course/:city",
        "destination": "/course/graphic-design-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/mental-health-wellness-course",
        "destination": "/course/mental-health-wellness-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/mental-health-wellness-course/:city",
        "destination": "/course/mental-health-wellness-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/ai-healthcare-doctor-course",
        "destination": "/course/ai-healthcare-doctor-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/ai-healthcare-doctor-course/:city",
        "destination": "/course/ai-healthcare-doctor-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/ai-clinical-nurse-course",
        "destination": "/course/ai-clinical-nurse-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/ai-clinical-nurse-course/:city",
        "destination": "/course/ai-clinical-nurse-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/ai-finance-ca-course",
        "destination": "/course/ai-finance-ca-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/ai-finance-ca-course/:city",
        "destination": "/course/ai-finance-ca-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/data-analyst-course",
        "destination": "/course/data-analyst-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/data-analyst-course/:city",
        "destination": "/course/data-analyst-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/business-analyst-course",
        "destination": "/course/business-analyst-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/business-analyst-course/:city",
        "destination": "/course/business-analyst-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/ai-ml-course",
        "destination": "/course/ai-ml-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/ai-ml-course/:city",
        "destination": "/course/ai-ml-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/software-testing-course",
        "destination": "/course/software-testing-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/software-testing-course/:city",
        "destination": "/course/software-testing-course-in-:city-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/playwright-automation-course",
        "destination": "/course/playwright-automation-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/playwright-automation-course/:city",
        "destination": "/course/playwright-automation-course-in-:city-with-gen-ai",
        "permanent": true
    }
];
  },
};

export default nextConfig;
