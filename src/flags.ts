import { flag } from "flags/next";

/**
 * Example Feature Flag for Vercel Flags + Web Analytics Observability
 * You can create more feature flags here or connect to Vercel Toolbar / LaunchDarkly / Statsig / Edge Config.
 */
export const showNewHeroBanner = flag<boolean>({
  key: "show-new-hero-banner",
  defaultValue: false,
  async decide() {
    // Determine flag state (e.g. based on environment, user, or Edge Config)
    return process.env.NODE_ENV === "development";
  },
});
