# GitHub Wrapped 🎁

> A beautiful, AI-powered year-in-review for GitHub developers.

Welcome to my **GitHub Wrapped** project! This app acts as your personal developer retrospective. It fetches your GitHub activity, computes your yearly stats, securely caches them in MongoDB, and generates optional AI insights like a gentle roast, predictions for the coming year, personalized advice, and a one-line dev story.

Built with a focus on clean design, performance, and robustness. I'm actively seeking feedback, so feel free to open an issue or submit a PR!

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI & Styling**: React 19 + TypeScript, Tailwind CSS 4, shadcn/ui
- **Database**: MongoDB + Mongoose
- **AI Integration**: OpenAI API (with robust local fallbacks)
- **Animations**: Embla Carousel, Radix UI, CSS animations

## ✨ Features

- **Personalized URL**: Share your stats via `/wrapped/:username`
- **Comprehensive Stats**: Aggregates yearly GitHub repos, commits, activity heatmaps, language mix, and contributions.
- **AI-Generated Goodies**:
  - 🔥 A gentle developer roast
  - 🔮 Predictions for your next year of coding
  - 💡 Personalized advice based on your language stack
  - 📖 A one-line "dev story" summarizing your year
- **Performance First**: Cached results per `username + year` configuration to keep the load blazingly fast.
- **Graceful Fallbacks**: Works perfectly even when OpenAI or portions of GitHub data are unavailable or rate-limited.

---

## 🛠️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env.local` file in the project root:

```env
# Required for caching stats & ai insights
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority

# Highly Recommended (prevents GitHub API rate limits)
GITHUB_TOKEN=ghp_xxx

# Optional (enables spicy AI insights; uses static fallbacks if omitted)
OPENAI_TOKEN=sk-xxx

# Optional for split frontend/backend deployments
NEXT_PUBLIC_API_URL=
```

### 3. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to start wrapping!

## 📊 API Routes

*   **`GET /api/wrapped/:username`**: Computes wrapped stats for the target year. Returns cached results when available or 404 if the user doesn't exist.
*   **`POST /api/wrapped/:username/ai-insights`**: Generates AI insights (predictions, advice, dev story) from stats.
*   **`POST /api/wrapped/:username/roast`**: Generates the AI roast.

## 🤝 Contributing

I am looking for feedback from the community! If you're a developer checking this out:
1. Fork the repo and create your branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

Let's build something awesome together.
