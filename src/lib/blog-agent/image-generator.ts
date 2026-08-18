import sharp from "sharp";

export interface GeneratedImageData {
  relativePath: string;
  base64: string;
}

export interface ImageProvider {
  generateFeaturedImage(title: string, category: string, outputPath: string): Promise<GeneratedImageData>;
}

export class DefaultImageGenerator implements ImageProvider {
  /**
   * Generates or fetches a featured image for a blog post in Base64 memory format (no local file writes).
   * Compiles a dark-mode brand-consistent abstract SVG with BLUE theme accents and converts to Base64.
   */
  async generateFeaturedImage(title: string, category: string, outputPath: string): Promise<GeneratedImageData> {
    const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;
    const filename = "featured-image.png";
    const slugDir = "blog-post";
    const relativePath = `/content/blogs/${slugDir}/${filename}`;

    if (unsplashKey) {
      try {
        console.log(`Unsplash API key found. Querying photo for: "${category} - ${title}"`);
        const query = `${category} technology software blue abstract`;
        const res = await fetch(
          `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${unsplashKey}&orientation=landscape`
        );
        if (res.ok) {
          const data: any = await res.json();
          const imageUrl = data.urls.regular;

          const imageRes = await fetch(imageUrl);
          if (imageRes.ok) {
            const buffer = Buffer.from(await imageRes.arrayBuffer());
            const processedBuffer = await sharp(buffer)
              .resize(1200, 630, { fit: "cover" })
              .png({ quality: 80 })
              .toBuffer();

            const base64 = `data:image/png;base64,${processedBuffer.toString("base64")}`;
            return { relativePath, base64 };
          }
        }
      } catch (err) {
        console.error("Unsplash download failed, falling back to SVG generator:", err);
      }
    }

    // Fallback: Blue-themed brand SVG generator (in memory)
    try {
      const svg = this.createBlueAbstractSVG(title, category);
      const pngBuffer = await sharp(Buffer.from(svg))
        .png()
        .toBuffer();

      const base64 = `data:image/png;base64,${pngBuffer.toString("base64")}`;
      return { relativePath, base64 };
    } catch (error) {
      console.error("SVG image compilation failed:", error);
      throw error;
    }
  }

  private createBlueAbstractSVG(title: string, category: string): string {
    const escapedTitle = title
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;")
      .replace(/:/g, "&#58;");

    const cleanCategory = category.toUpperCase();

    // Word wrap title into two lines for SVG presentation
    const words = escapedTitle.split(" ");
    let line1 = "";
    let line2 = "";

    for (const word of words) {
      if ((line1 + word).length < 25) {
        line1 += (line1 ? " " : "") + word;
      } else if ((line2 + word).length < 28) {
        line2 += (line2 ? " " : "") + word;
      } else {
        if (line2 && !line2.endsWith("...")) {
          line2 += "...";
        }
      }
    }

    return `
      <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg-glow" cx="20%" cy="20%" r="90%">
            <stop offset="0%" stop-color="#0a101f" />
            <stop offset="60%" stop-color="#040711" />
            <stop offset="100%" stop-color="#020307" />
          </radialGradient>
          <linearGradient id="brand-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3B82F6" />
            <stop offset="100%" stop-color="#1D4ED8" />
          </linearGradient>
          <linearGradient id="brand-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#60A5FA" />
            <stop offset="100%" stop-color="#2563EB" />
          </linearGradient>
          <radialGradient id="neon-glow-top" cx="50%" cy="0%" r="50%">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#3B82F6" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="neon-glow-bottom" cx="80%" cy="80%" r="40%">
            <stop offset="0%" stop-color="#2563EB" stop-opacity="0.2" />
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0" />
          </radialGradient>
        </defs>

        <!-- Base Background -->
        <rect width="1200" height="630" fill="url(#bg-glow)" />

        <!-- Blue Ambient Spotlights -->
        <rect width="1200" height="630" fill="url(#neon-glow-top)" />
        <circle cx="900" cy="500" r="300" fill="url(#neon-glow-bottom)" />

        <!-- Grid Pattern Overlay -->
        <g stroke="#ffffff" stroke-opacity="0.02" stroke-width="1">
          <path d="M 0,50 L 1200,50 M 0,100 L 1200,100 M 0,150 L 1200,150 M 0,200 L 1200,200 M 0,250 L 1200,250 M 0,300 L 1200,300 M 0,350 L 1200,350 M 0,400 L 1200,400 M 0,450 L 1200,450 M 0,500 L 1200,500 M 0,550 L 1200,550" />
          <path d="M 100,0 L 100,630 M 200,0 L 200,630 M 300,0 L 300,630 M 400,0 L 400,630 M 500,0 L 500,630 M 600,0 L 600,630 M 700,0 L 700,630 M 800,0 L 800,630 M 900,0 L 900,630 M 1000,0 L 1000,630 M 1100,0 L 1100,630" />
        </g>

        <!-- Abstract Tech Circles in Blue -->
        <circle cx="1000" cy="180" r="140" stroke="url(#brand-blue)" stroke-width="1.5" stroke-opacity="0.4" fill="none" />
        <circle cx="1000" cy="180" r="100" stroke="#60A5FA" stroke-dasharray="10, 15" stroke-width="1" stroke-opacity="0.3" fill="none" />
        <circle cx="1000" cy="180" r="60" stroke="#ffffff" stroke-width="1" stroke-opacity="0.08" fill="none" />

        <!-- Blue Brand Accent Lines -->
        <line x1="80" y1="100" x2="80" y2="530" stroke="url(#brand-blue)" stroke-width="3.5" stroke-linecap="round" opacity="0.9" />
        <line x1="80" y1="100" x2="150" y2="100" stroke="url(#brand-blue)" stroke-width="3.5" stroke-linecap="round" opacity="0.9" />

        <!-- Title Block Category -->
        <text x="120" y="180" fill="#60A5FA" font-family="'Space Grotesk', 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="900" letter-spacing="4" opacity="0.95">
          ${cleanCategory}
        </text>

        <!-- Main Title Text -->
        <text x="120" y="270" fill="#ffffff" font-family="'DM Sans', 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="bold" letter-spacing="-1">
          ${line1}
        </text>
        ${
          line2
            ? `<text x="120" y="340" fill="#ffffff" font-family="'DM Sans', 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="bold" letter-spacing="-1">${line2}</text>`
            : ""
        }

        <!-- Description / Brand Tagline -->
        <text x="120" y="470" fill="#94A3B8" font-family="'DM Sans', 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="500">
          Operator &amp; Builder Network Publications
        </text>

        <!-- Bottom Logo Mockup with Blue Sha -->
        <text x="120" y="530" fill="#ffffff" font-family="'Space Grotesk', 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="bold" letter-spacing="-1">
          Skill<tspan fill="#3B82F6">Sha</tspan>
        </text>
        <circle cx="225" cy="522" r="4" fill="#60A5FA" />
      </svg>
    `;
  }
}

export function getImageGenerator(): ImageProvider {
  return new DefaultImageGenerator();
}
