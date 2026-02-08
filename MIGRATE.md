# Migration Guide: Express + Vite → Next.js

This document outlines the step-by-step migration plan to convert the current **Express backend + Vite React frontend** architecture into a single **Next.js application** for deployment on Vercel.

---

## 📋 Pre-Migration Checklist

Before starting, ensure you understand the current architecture:

| Component     | Current Stack       | Next.js Equivalent                  |
| ------------- | ------------------- | ----------------------------------- |
| Frontend      | Vite + React 19     | Next.js App Router                  |
| Backend       | Express.js          | Next.js API Routes / Server Actions |
| Database      | MongoDB (Mongoose)  | MongoDB (Mongoose) - unchanged      |
| AI Service    | OpenAI SDK          | OpenAI SDK - unchanged              |
| Styling       | Tailwind CSS v4     | Tailwind CSS v4                     |
| UI Components | shadcn/ui (Base UI) | shadcn/ui (Base UI)                 |

---

## 🚀 Migration Phases

> **⚠️ IMPORTANT**: Phases are **synchronous and sequential**. You **MUST** complete each phase before starting the next. If you want to contribute, check which phase is the last one marked complete, then work on the **next uncompleted phase only**.

---

### Phase 1: Project Initialization

**Status**: ⬜ Not Started

Set up the new Next.js project structure alongside the existing code.

- [ ] **1.1** Create a new Next.js project in a `next-app/` directory

  ```bash
  npx create-next-app@latest next-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
  ```

- [ ] **1.2** Configure `next.config.ts` for the project
  - Enable `serverActions`
  - Configure `images.remotePatterns` for GitHub avatars (`avatars.githubusercontent.com`)

- [ ] **1.3** Set up environment variables structure
  - Create `.env.local.example` with required variables:
    ```
    GITHUB_TOKEN=
    OPENAI_API_KEY=
    MONGODB_URI=
    ```

- [ ] **1.4** Install required dependencies

  ```bash
  npm install mongoose openai
  npm install @base-ui/react embla-carousel-react html-to-image lucide-react class-variance-authority clsx tailwind-merge
  npm install @fontsource-variable/jetbrains-mono
  ```

- [ ] **1.5** Configure Tailwind CSS v4 with the existing design tokens
  - Copy over custom CSS variables from `client/src/index.css`
  - Set up the animated background gradient styles

**Deliverable**: A working Next.js skeleton that runs with `npm run dev`

---

### Phase 2: Database Layer Migration

**Status**: ⬜ Not Started

Migrate the MongoDB connection and models to work with Next.js serverless environment.

- [ ] **2.1** Create `src/lib/db/connect.ts`
  - Adapt `backend/db/connect.js` for serverless (connection caching)
  - Use global caching pattern for MongoDB connection:
    ```typescript
    // Pattern for serverless MongoDB connection
    let cached = global.mongoose;
    if (!cached) {
      cached = global.mongoose = { conn: null, promise: null };
    }
    ```

- [ ] **2.2** Create `src/lib/db/models/Wrapped.ts`
  - Convert `backend/models/Wrapped.js` to TypeScript
  - Export proper TypeScript interfaces for the schema

- [ ] **2.3** Create `src/types/wrapped.ts`
  - Copy and adapt from `client/src/types/wrapped.ts`
  - Add server-side specific types if needed

- [ ] **2.4** Test database connection
  - Create a simple test API route to verify MongoDB connectivity
  - Ensure connection pooling works in serverless environment

**Deliverable**: MongoDB connection working in Next.js API routes

---

### Phase 3: Utility Functions Migration

**Status**: ⬜ Not Started

Migrate the GitHub API utilities and stats calculation functions.

- [ ] **3.1** Create `src/lib/github.ts`
  - Convert `backend/utils/github.js` to TypeScript
  - Functions to migrate:
    - `fetchFromGitHub()`
    - `searchCommits()`
    - `getUserContributions()`
  - Add proper TypeScript types for GitHub API responses

- [ ] **3.2** Create `src/lib/stats.ts`
  - Convert `backend/utils/stats.js` to TypeScript
  - Functions to migrate:
    - `calculateLanguageStats()`
    - `calculateDayOfWeekStats()`
    - `findGhostedRepo()`
    - `getTopStarredRepo()`
    - `calculateTotalCommits()`
    - `calculateActiveDays()`
    - `calculateStats()`

- [ ] **3.3** Create `src/lib/config.ts`
  - Migrate year calculation logic from `backend/config/index.js`
  - Use `process.env` directly (Next.js handles env loading)

**Deliverable**: All utility functions working with TypeScript types

---

### Phase 4: AI Services Migration

**Status**: ⬜ Not Started

Migrate the OpenAI integration for generating roasts, predictions, and insights.

- [ ] **4.1** Create `src/lib/ai.ts`
  - Convert `backend/services/ai.js` to TypeScript
  - Functions to migrate:
    - `generateRoast()`
    - `generatePredictions()`
    - `generateAdvice()`
    - `generateDevStory()`

- [ ] **4.2** Add proper error handling and fallbacks
  - Ensure graceful degradation when OpenAI is unavailable
  - Add TypeScript types for AI responses

- [ ] **4.3** Consider using Vercel AI SDK (optional enhancement)
  - Evaluate if `ai` package would simplify streaming responses
  - Document decision in code comments

**Deliverable**: AI service functions ready for use in API routes

---

### Phase 5: API Routes Migration

**Status**: ⬜ Not Started

Convert Express routes to Next.js App Router API routes.

- [ ] **5.1** Create `src/app/api/wrapped/[username]/route.ts`
  - Migrate GET handler from `backend/routes/wrpped.js`
  - Implement caching logic with MongoDB
  - Return proper Next.js `Response` objects

- [ ] **5.2** Create `src/app/api/wrapped/[username]/roast/route.ts`
  - Migrate POST handler for roast generation
  - Include caching logic

- [ ] **5.3** Create `src/app/api/wrapped/[username]/ai-insights/route.ts`
  - Migrate POST handler for AI insights (predictions, advice, devStory)
  - Include caching logic

- [ ] **5.4** Create `src/app/api/health/route.ts`
  - Simple health check endpoint for monitoring

- [ ] **5.5** Test all API routes
  - Verify responses match current backend format
  - Test error handling scenarios

**Deliverable**: All API endpoints working identically to Express backend

---

### Phase 6: UI Components Migration

**Status**: ⬜ Not Started

Migrate the React components from Vite to Next.js.

- [ ] **6.1** Set up shadcn/ui in Next.js

  ```bash
  npx shadcn@latest init
  ```

  - Configure for Base UI variant if using that

- [ ] **6.2** Copy UI components to `src/components/ui/`
  - Migrate all components from `client/src/components/ui/`
  - Update imports to use Next.js conventions

- [ ] **6.3** Copy wrapped slide components to `src/components/wrapped/`
  - Migrate all slides from `client/src/components/wrapped/`
  - Components to migrate:
    - `IntroSlide.tsx`
    - `CommitsSlide.tsx`
    - `LanguagesSlide.tsx`
    - `ActivitySlide.tsx`
    - `ReposSlide.tsx`
    - `GhostedSlide.tsx`
    - `RoastSlide.tsx`
    - `PredictionsSlide.tsx`
    - `AdviceSlide.tsx`
    - `DevStorySlide.tsx`
    - `SummarySlide.tsx`
    - `WrappedCarousel.tsx`
    - `CarouselNavigation.tsx`
    - `SlideWrapper.tsx`

- [ ] **6.4** Copy view components to `src/components/views/`
  - `InputView.tsx`
  - `LoadingView.tsx`
  - `ErrorView.tsx`
  - `WrappedView.tsx`

- [ ] **6.5** Copy utility functions
  - `src/lib/utils.ts` from `client/src/lib/utils.ts`

**Deliverable**: All components rendering correctly in Next.js

---

### Phase 7: Page Routes & Client Logic

**Status**: ⬜ Not Started

Create the Next.js pages and migrate the client-side state logic.

- [ ] **7.1** Create the main page `src/app/page.tsx`
  - Migrate logic from `client/src/App.tsx`
  - This will be a Client Component (`"use client"`)
  - Handle view state (input → loading → wrapped → error)

- [ ] **7.2** Update API calls to use relative paths
  - Remove `VITE_API_URL` environment variable usage
  - API calls should use `/api/wrapped/...` directly

- [ ] **7.3** Create `src/app/layout.tsx`
  - Set up metadata (title, description, OpenGraph)
  - Import global styles and fonts

- [ ] **7.4** Create `src/app/globals.css`
  - Migrate styles from `client/src/index.css`
  - Include animated background gradients

- [ ] **7.5** Test full user flow
  - Input username → Loading → View wrapped stats
  - Test error states
  - Test AI content generation

**Deliverable**: Complete working application in Next.js

---

### Phase 8: Static Assets & Metadata

**Status**: ⬜ Not Started

Migrate static assets and configure SEO/metadata.

- [ ] **8.1** Copy static assets to `public/`
  - Any images, fonts, or other static files

- [ ] **8.2** Configure metadata in `layout.tsx`

  ```typescript
  export const metadata: Metadata = {
    title: "GitHub Wrapped",
    description: "Your year in code - GitHub stats wrapped",
    // Add OpenGraph, Twitter cards, etc.
  };
  ```

- [ ] **8.3** Add favicon and app icons
  - Create `src/app/icon.tsx` or add static files

- [ ] **8.4** Configure `robots.txt` and `sitemap.xml` if needed

**Deliverable**: Complete SEO and asset configuration

---

### Phase 9: Testing & Verification

**Status**: ⬜ Not Started

Comprehensive testing before removing old code.

- [ ] **9.1** Create test checklist document
  - List all features to verify

- [ ] **9.2** Test API endpoints
  - Compare responses with original Express backend
  - Verify caching behavior

- [ ] **9.3** Test UI functionality
  - All carousel slides render correctly
  - Navigation works
  - Share/download functionality works

- [ ] **9.4** Test responsive design
  - Mobile, tablet, desktop breakpoints

- [ ] **9.5** Test error scenarios
  - Invalid username
  - API rate limits
  - Database connection issues

- [ ] **9.6** Performance testing
  - Lighthouse scores
  - Core Web Vitals

**Deliverable**: Documented test results showing feature parity

---

### Phase 10: Deployment Configuration

**Status**: ⬜ Not Started

Prepare for Vercel deployment.

- [ ] **10.1** Create `vercel.json` if custom configuration needed

- [ ] **10.2** Update environment variables documentation
  - Document all required env vars for Vercel dashboard

- [ ] **10.3** Configure MongoDB Atlas for production
  - Ensure IP whitelist allows Vercel's IPs (or use 0.0.0.0/0)
  - Document connection string format

- [ ] **10.4** Set up Vercel project
  - Connect GitHub repository
  - Configure environment variables
  - Set up preview deployments

- [ ] **10.5** Test production deployment
  - Deploy to Vercel
  - Verify all functionality works

**Deliverable**: Working production deployment on Vercel

---

### Phase 11: Cleanup & Documentation

**Status**: ⬜ Not Started

Remove old code and update documentation.

- [ ] **11.1** Move Next.js app to root
  - Move contents of `next-app/` to project root
  - Update all import paths if needed

- [ ] **11.2** Remove old directories
  - Delete `backend/` directory
  - Delete `client/` directory
  - Delete root `Dockerfile` (Vercel handles deployment)

- [ ] **11.3** Update `README.md`
  - Update setup instructions for Next.js
  - Update deployment instructions for Vercel
  - Remove references to Express/Vite

- [ ] **11.4** Update `package.json` scripts
  - Ensure standard Next.js scripts are present
  - Remove any old build scripts

- [ ] **11.5** Archive this migration guide
  - Move `MIGRATE.md` to `docs/` or delete
  - Add migration notes to project history

**Deliverable**: Clean, single Next.js application

---

## 📁 Final Project Structure

After migration, the project should look like:

```
wrapped/
├── public/
│   └── (static assets)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── health/
│   │   │   │   └── route.ts
│   │   │   └── wrapped/
│   │   │       └── [username]/
│   │   │           ├── route.ts
│   │   │           ├── roast/
│   │   │           │   └── route.ts
│   │   │           └── ai-insights/
│   │   │               └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   └── (shadcn components)
│   │   ├── views/
│   │   │   ├── InputView.tsx
│   │   │   ├── LoadingView.tsx
│   │   │   ├── ErrorView.tsx
│   │   │   └── WrappedView.tsx
│   │   └── wrapped/
│   │       └── (carousel slides)
│   ├── lib/
│   │   ├── db/
│   │   │   ├── connect.ts
│   │   │   └── models/
│   │   │       └── Wrapped.ts
│   │   ├── ai.ts
│   │   ├── config.ts
│   │   ├── github.ts
│   │   ├── stats.ts
│   │   └── utils.ts
│   └── types/
│       └── wrapped.ts
├── .env.local.example
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🤝 Contributing

1. Check the phase statuses above
2. Find the **first uncompleted phase**
3. Create a branch named `migrate/phase-X-description`
4. Complete **ALL tasks** in that phase
5. Submit a PR with:
   - Description of changes
   - Screenshots/recordings if UI changes
   - Test results showing the phase works
6. Once merged, update the phase status to ✅ Complete

**Remember**: Do NOT skip phases or work on future phases. The migration is sequential!

---

## 📝 Notes

- **MongoDB**: The database layer remains largely unchanged. Mongoose works the same way in Next.js.
- **OpenAI**: The AI integration remains the same, just moved to server-side only code.
- **Environment Variables**: Next.js uses `.env.local` instead of `.env`. Variables prefixed with `NEXT_PUBLIC_` are exposed to the client.
- **Serverless Considerations**: MongoDB connections need caching for serverless. OpenAI calls work the same way.
