import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "/vi/**",
      }
    ],
  },
  experimental: {
    optimizeCss: true,
  },
  async redirects() {
    return [
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
        "source": "/course/data-science-course",
        "destination": "/course/data-science-course-with-gen-ai",
        "permanent": true
    },
    {
        "source": "/course/data-science-course/:city",
        "destination": "/course/data-science-course-in-:city-with-gen-ai",
        "permanent": true
    }
    ];
  },
};

export default nextConfig;
