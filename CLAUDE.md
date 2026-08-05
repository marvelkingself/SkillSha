# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start dev server (webpack, not Turbopack — see `dev` script uses `next dev --webpack`)
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — ESLint (flat config in `eslint.config.mjs`, extends `eslint-config-next`)

No test runner is configured in this repo.

## Architecture

Next.js 16 App Router site (`src/app`) for SkillSha, a course/education platform. TypeScript, Tailwind v4, path alias `@/*` → `./src/*`.

**Data layer is Supabase only.** Every API route in `src/app/api/**/route.ts` reads/writes via `src/lib/supabase.ts` (a plain `@supabase/supabase-js` client using the anon key). Supabase schema lives in `supabase/migrations/*.sql` — tables: `users`, `bookings`, `certificates`, `payments`, `courses_registry`, `student_progress`, `assignments`, `submissions`, `bulletins`, `presentations`. DB columns are snake_case; API responses map them to camelCase by hand in each route (no ORM/ORM-style mapper).

`src/lib/db.ts` (Mongoose) and `src/models/*.ts` (Mongoose schemas for User/Booking/Payment/Certificate) are **dead code** — nothing imports them. Don't use them for new features; follow the Supabase pattern used by existing routes instead.

**Auth**: custom JWT via `jose`, not NextAuth. `src/lib/auth.ts` exports `signToken`/`verifyToken`. Token is set as an HttpOnly cookie `skillsha_token` on login/register (`src/app/api/auth/{login,register}/route.ts`) and also accepted via `Authorization: Bearer` header. Every protected API route calls `verifyToken(request)` itself — there is no middleware.ts / centralized auth gate. Passwords hashed with bcryptjs.

Admin routes (`src/app/api/admin/**`) accept *either* a valid session where `email === "admin@skillsha.com"` *or* a static header `x-admin-secret: skillsha-admin-secret-2026` — check `src/app/api/admin/data/route.ts` for the exact pattern before touching admin auth.

**AI assistant** (`src/app/api/student/ai-assistant/route.ts`) uses `@google/generative-ai` (Gemini, model `gemini-2.5-flash`), gated behind `verifyToken`. It builds a system prompt from the student's Supabase curriculum/progress/submissions rows before calling the model — follow that context-assembly pattern if extending it.

**Routing**: course pages are dynamic and driven by static data, not the DB — `src/data/courses.ts` (`COURSES_DATA`) and `src/data/cities.ts` (`CITIES_LIST`) feed `generateStaticParams` for `src/app/[id]/page.tsx` and `src/app/[id]/[city]/page.tsx` (programmatic SEO: one page per course × city combo). Adding a course/city means editing those data files, not adding routes.

Role-specific dashboards are plain pages backed by role-specific API routes: `src/app/admin`, `src/app/teacher`, student-facing dashboard/profile pages, each paired with matching routes under `src/app/api/{admin,teacher,student}/`.
