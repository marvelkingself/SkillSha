import fs from "fs";
import path from "path";
import sharp from "sharp";

export interface ImageProvider {
  generateFeaturedImage(title: string, category: string, outputPath: string): Promise<string>;
}

export class DefaultImageGenerator implements ImageProvider {
  /**
   * Generates or fetches a featured image for a blog post.
   * If UNSPLASH_ACCESS_KEY is set, it attempts to download a relevant image.
   * Otherwise, it generates a beautiful dark-mode brand-consistent abstract SVG and compiles it to WebP.
   */
  async generateFeaturedImage(title: string, category: string, outputPath: string): Promise<string> {
    const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (unsplashKey) {
      try {
        console.log(`Unsplash API key found. Querying relevant photo for: "${category} - ${title}"`);
        const query = `${category} technology abstract modern`;
        const res = await fetch(
          `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${unsplashKey}&orientation=landscape`
        );
        if (res.ok) {
          const data: any = await res.json();
          const imageUrl = data.urls.regular;
          
          // Download image
          const imageRes = await fetch(imageUrl);
          if (imageRes.ok) {
            const buffer = Buffer.from(await imageRes.arrayBuffer());
            await sharp(buffer)
              .resize(1200, 630, { fit: "cover" })
              .webp({ quality: 80 })
              .toFile(outputPath);
            
            return `/content/blogs/${path.basename(path.dirname(outputPath))}/${path.basename(outputPath)}`;
          }
        }
      } catch (err) {
        console.error("Unsplash download failed, falling back to SVG generator:", err);
      }
    }

    // Fallback: Custom premium brand-themed neon SVG generator
    try {
      const svg = this.createAbstractSVG(title, category);
      await sharp(Buffer.from(svg))
        .png() // Compile to standard web-ready PNG
        .toFile(outputPath);
      
      return `/content/blogs/${path.basename(path.dirname(outputPath))}/${path.basename(outputPath)}`;
    } catch (error) {
      console.error("SVG image compilation failed:", error);
      throw error;
    }
  }

  private createAbstractSVG(title: string, category: string): string {
    // Escape XML entities in title
    const escapedTitle = title
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

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
            <stop offset="0%" stop-color="#141416" />
            <stop offset="60%" stop-color="#0a0a0c" />
            <stop offset="100%" stop-color="#020203" />
          </radialGradient>
          <linearGradient id="brand-orange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FF6B00" />
            <stop offset="100%" stop-color="#FF3D00" />
          </linearGradient>
          <linearGradient id="brand-red" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FF0055" />
            <stop offset="100%" stop-color="#990022" />
          </linearGradient>
          <radialGradient id="neon-glow-top" cx="50%" cy="0%" r="50%">
            <stop offset="0%" stop-color="#FF6B00" stop-opacity="0.15" />
            <stop offset="100%" stop-color="#FF6B00" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="neon-glow-bottom" cx="80%" cy="80%" r="40%">
            <stop offset="0%" stop-color="#FF0055" stop-opacity="0.1" />
            <stop offset="100%" stop-color="#FF0055" stop-opacity="0" />
          </radialGradient>
        </defs>

        <!-- Base Background -->
        <rect width="1200" height="630" fill="url(#bg-glow)" />

        <!-- Neon Ambient Spotlights -->
        <rect width="1200" height="630" fill="url(#neon-glow-top)" />
        <circle cx="900" cy="500" r="300" fill="url(#neon-glow-bottom)" />

        <!-- Grid Pattern Overlay -->
        <g stroke="#ffffff" stroke-opacity="0.015" stroke-width="1">
          <path d="M 0,50 L 1200,50 M 0,100 L 1200,100 M 0,150 L 1200,150 M 0,200 L 1200,200 M 0,250 L 1200,250 M 0,300 L 1200,300 M 0,350 L 1200,350 M 0,400 L 1200,400 M 0,450 L 1200,450 M 0,500 L 1200,500 M 0,550 L 1200,550" />
          <path d="M 100,0 L 100,630 M 200,0 L 200,630 M 300,0 L 300,630 M 400,0 L 400,630 M 500,0 L 500,630 M 600,0 L 600,630 M 700,0 L 700,630 M 800,0 L 800,630 M 900,0 L 900,630 M 100,0 L 100,630 M 1000,0 L 1000,630 M 1100,0 L 1100,630" />
        </g>

        <!-- Abstract Tech Circles -->
        <circle cx="1000" cy="180" r="140" stroke="url(#brand-orange)" stroke-width="1.5" stroke-opacity="0.2" fill="none" />
        <circle cx="1000" cy="180" r="100" stroke="#FF0055" stroke-dasharray="10, 15" stroke-width="1" stroke-opacity="0.15" fill="none" />
        <circle cx="1000" cy="180" r="60" stroke="#ffffff" stroke-width="1" stroke-opacity="0.05" fill="none" />

        <!-- Brand Accent Lines -->
        <line x1="80" y1="100" x2="80" y2="530" stroke="url(#brand-orange)" stroke-width="3" stroke-linecap="round" opacity="0.8" />
        <line x1="80" y1="100" x2="150" y2="100" stroke="url(#brand-orange)" stroke-width="3" stroke-linecap="round" opacity="0.8" />

        <!-- Title Block Category -->
        <text x="120" y="180" fill="#FF6B00" font-family="'Space Grotesk', 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="900" letter-spacing="4" opacity="0.9">
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
        <text x="120" y="470" fill="#a0a0a5" font-family="'DM Sans', 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="500">
          Operator &amp; Builder Network Publications
        </text>

        <!-- Bottom Logo Mockup -->
        <text x="120" y="530" fill="#ffffff" font-family="'Space Grotesk', 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="bold" letter-spacing="-1">
          Skill<tspan fill="#FF6B00">Sha</tspan>
        </text>
        <circle cx="230" cy="522" r="4" fill="#FF0055" />
      </svg>
    `;
  }
}

export function getImageGenerator(): ImageProvider {
  return new DefaultImageGenerator();
}
