# 🎁 GitHub Wrapped

A "Spotify Wrapped"-style experience for your GitHub profile. Generate personalized year-in-review summaries featuring your coding stats, AI-powered roasts, predictions, and more!

![GitHub Wrapped](https://img.shields.io/badge/GitHub-Wrapped-blueviolet?style=for-the-badge&logo=github)

## ✨ Features

- **📊 Comprehensive Stats** - Total commits, active days, contributions, and activity patterns
- **💻 Language Breakdown** - Your top programming languages with percentage analysis
- **🏆 Top Repositories** - Your most starred and most active repos
- **👻 Ghosted Repos** - Identify projects you've abandoned (we've all been there!)
- **🔥 AI-Powered Roasts** - Witty, personalized roasts based on your coding habits
- **🔮 Predictions** - AI predictions for your next year in tech
- **💡 Developer Advice** - Personalized tips based on your GitHub activity
- **📖 Dev Story** - A narrative of your year in code
- **📸 Shareable Cards** - Beautiful carousel slides to share on social media

## 🏗️ Architecture

This project uses a **monorepo structure** with:

```
wrapped/
├── backend/          # Express.js API server
│   ├── config/       # Environment configuration
│   ├── db/           # MongoDB connection management
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API routes
│   ├── services/     # AI service integrations
│   └── utils/        # GitHub API & stats utilities
├── client/           # React + Vite frontend
│   └── src/
│       ├── components/   # UI components
│       │   ├── ui/       # shadcn/ui primitives
│       │   ├── views/    # View components
│       │   └── wrapped/  # Carousel slide components
│       ├── lib/          # Utility functions
│       └── types/        # TypeScript types
└── Dockerfile        # Multi-stage production build
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** v24+ (LTS recommended)
- **MongoDB** - Local instance or cloud (MongoDB Atlas)
- **GitHub Token** - For API access ([create one here](https://github.com/settings/tokens))
- **OpenAI API Key** - For AI features ([get one here](https://platform.openai.com/api-keys))

### Environment Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/siyabuilds/wrapped.git
   cd wrapped
   ```

2. Create a `.env` file in the root directory:

   ```env
   # Environment
   NODE_ENV=development

   # Backend Server
   PORT=3001

   # Database
   MONGODB_URI=mongodb://localhost:27017/wrapped_dev

   # API Keys
   OPENAI_TOKEN=your_openai_api_key_here
   GITHUB_TOKEN=your_github_token_here

   # CORS (for development)
   CLIENT_URI=http://localhost:5173
   ```

### Running Locally

#### Backend

```bash
cd backend
npm install
npm run dev    # Starts with nodemon for hot reload
```

The API will be available at `http://localhost:3001`

#### Frontend

```bash
cd client
npm install
npm run dev    # Starts Vite dev server
```

The frontend will be available at `http://localhost:5173`

### Production Build (Docker)

The project includes a multi-stage Dockerfile that builds both frontend and backend:

```bash
docker build -t github-wrapped .
docker run -p 3001:3001 \
  -e MONGODB_URI=your_mongo_uri \
  -e OPENAI_TOKEN=your_openai_key \
  -e GITHUB_TOKEN=your_github_token \
  github-wrapped
```

## 📡 API Routes

### Base URL: `/api/wrapped`

| Method | Endpoint                 | Description                              |
| ------ | ------------------------ | ---------------------------------------- |
| `GET`  | `/:username`             | Fetch GitHub stats for a user (cached)   |
| `POST` | `/:username/roast`       | Generate AI roast based on stats         |
| `POST` | `/:username/ai-insights` | Generate predictions, advice & dev story |

### Health Check Endpoints

| Method | Endpoint       | Description           |
| ------ | -------------- | --------------------- |
| `GET`  | `/health`      | HTML health dashboard |
| `GET`  | `/health/json` | JSON health status    |

### Detailed Route Documentation

#### `GET /api/wrapped/:username`

Fetches comprehensive GitHub statistics for the specified user.

**Response:**

```json
{
  "username": "octocat",
  "year": 2025,
  "avatarUrl": "https://...",
  "name": "The Octocat",
  "topLanguage": "JavaScript",
  "languagesBreakdown": [
    { "name": "JavaScript", "count": 15, "percentage": 45 }
  ],
  "totalCommits": 523,
  "activeDays": 187,
  "mostActiveDay": "Tuesday",
  "ghostedRepo": { "name": "old-project", "ghostDays": 365 },
  "topStarredRepo": { "name": "popular-repo", "stars": 1234 },
  "totalContributions": 892,
  "followers": 1500,
  "following": 42
}
```

#### `POST /api/wrapped/:username/roast`

Generates a witty AI-powered roast.

**Request Body:**

```json
{
  "stats": {
    /* WrappedStats object */
  }
}
```

**Response:**

```json
{
  "roast": "You wrote 523 commits in JavaScript this year, but let's be honest – half of them were 'fixed typo' 🔥"
}
```

#### `POST /api/wrapped/:username/ai-insights`

Generates predictions, advice, and developer story.

**Request Body:**

```json
{
  "stats": {
    /* WrappedStats object */
  }
}
```

**Response:**

```json
{
  "predictions": {
    "languagePrediction": "TypeScript might become your new best friend in 2026! 🚀",
    "ossPrediction": "You're showing signs of an open source contributor in the making!",
    "burnoutRisk": "Your weekend activity suggests healthy work-life balance 💪"
  },
  "advice": "Consider contributing to larger open source projects...",
  "devStory": "2025 was the year you truly found your groove..."
}
```

## 🧠 Technical Decisions & Approaches

### Why These Technologies?

#### Backend: Express.js + MongoDB + Mongoose

- **Express.js**: Lightweight, flexible, and well-suited for REST APIs. The async/await pattern works seamlessly with GitHub and OpenAI API calls.
- **MongoDB**: Schema-less design allows flexibility for storing varied GitHub stats and AI-generated content. Perfect for caching user data.
- **Mongoose**: Provides schema validation, indexing, and static methods for clean data access patterns.

#### Frontend: React + Vite + TypeScript + shadcn/ui

- **Vite**: Blazing fast HMR (Hot Module Replacement) and optimized production builds.
- **TypeScript**: Type safety for complex stats objects and API responses.
- **shadcn/ui**: Accessible, customizable components built on Radix UI. Not a dependency—components are copied into the project for full control.
- **Tailwind CSS v4**: Utility-first styling with the latest CSS features.

### Caching Strategy

The application implements a **database-first caching** approach:

1. When a user requests their wrapped, check MongoDB first
2. If cached data exists for the username + year combination, return it immediately
3. On cache miss, fetch from GitHub APIs, calculate stats, and cache the result
4. AI-generated content (roasts, predictions) is cached separately and lazily generated

**Why this approach?**

- Reduces GitHub API rate limit hits
- Expensive AI calls are only made once per user/year
- Users see instant results on repeat visits
- Compound index on `(username, year)` ensures O(1) lookups

### GitHub Data Collection

The app uses **multiple GitHub APIs** to build a comprehensive picture:

| API                               | Data Retrieved                               |
| --------------------------------- | -------------------------------------------- |
| REST `/users/:username`           | Profile info, followers, public repo count   |
| REST `/users/:username/repos`     | Repository list with languages, stars, dates |
| REST `/search/commits`            | Commit search for the specific year          |
| GraphQL `contributionsCollection` | Detailed contribution calendar, total counts |

**Why combine REST and GraphQL?**

- REST is simpler for basic data retrieval
- GraphQL's `contributionsCollection` provides the contribution calendar that REST doesn't expose
- Parallel requests with `Promise.all()` minimize latency

### AI Integration (OpenAI)

- **Model**: `gpt-4o-mini` - Cost-effective while maintaining quality
- **System Prompts**: Carefully crafted to ensure fun, appropriate roasts
- **Fallbacks**: If OpenAI is unavailable, generic fallback responses are provided
- **Structured Output**: AI returns JSON for predictions, ensuring consistent parsing

### Year Calculation Logic

```javascript
year: () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const december1st = new Date(currentYear, 11, 1);
  return now < december1st ? currentYear - 1 : currentYear;
};
```

**Why December 1st?**

- Before December, users see last year's wrapped (the year with complete data)
- Starting December 1st, the current year becomes available
- Mirrors how Spotify Wrapped works

### Graceful Shutdown

The server implements proper signal handling:

- Catches `SIGTERM` and `SIGINT` signals
- Stops accepting new requests
- Waits for existing requests to complete
- Cleanly disconnects from MongoDB
- Forces shutdown after 10-second timeout

## 🎨 Frontend Architecture

### State Machine Pattern

The frontend uses a simple state machine for view management:

```
input → loading → wrapped
           ↓
         error
```

### Carousel Slides

The wrapped experience is presented as a carousel with these slides:

1. **IntroSlide** - Username and avatar intro
2. **ActivitySlide** - Commit patterns and active days
3. **LanguagesSlide** - Language breakdown chart
4. **ReposSlide** - Top repositories
5. **CommitsSlide** - Commit statistics
6. **GhostedSlide** - Abandoned repos callout
7. **RoastSlide** - AI-generated roast
8. **DevStorySlide** - AI narrative
9. **PredictionsSlide** - Next year predictions
10. **AdviceSlide** - AI advice
11. **SummarySlide** - Final shareable summary

### Export Feature

Uses `html-to-image` library to convert slides to PNG for social sharing.

## 📁 Project Structure Details

### Backend Files

| File                | Purpose                                          |
| ------------------- | ------------------------------------------------ |
| `index.js`          | Express app setup, middleware, graceful shutdown |
| `config/index.js`   | Environment variables, year calculation          |
| `db/connect.js`     | MongoDB connection pooling and event handlers    |
| `models/Wrapped.js` | Mongoose schema with static methods              |
| `routes/wrpped.js`  | API route handlers with caching logic            |
| `services/ai.js`    | OpenAI integration for all AI features           |
| `utils/github.js`   | GitHub REST & GraphQL API utilities              |
| `utils/stats.js`    | Stats calculation and aggregation                |

### Frontend Files

| File                   | Purpose                                          |
| ---------------------- | ------------------------------------------------ |
| `App.tsx`              | Main app with state management                   |
| `types/wrapped.ts`     | TypeScript interfaces                            |
| `components/views/*`   | View components (Input, Loading, Error, Wrapped) |
| `components/wrapped/*` | Individual carousel slides                       |
| `components/ui/*`      | Reusable UI primitives                           |

## 🔧 Configuration Options

| Variable       | Default                   | Description               |
| -------------- | ------------------------- | ------------------------- |
| `NODE_ENV`     | `development`             | Environment mode          |
| `PORT`         | `3001`                    | Backend server port       |
| `MONGODB_URI`  | `localhost:27017/wrapped` | MongoDB connection string |
| `GITHUB_TOKEN` | -                         | GitHub PAT for API access |
| `OPENAI_TOKEN` | -                         | OpenAI API key            |
| `CLIENT_URI`   | `http://localhost:5173`   | CORS allowed origin       |

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

## 👤 Author

**Siyabonga Samson Lukhele**

- Website: [samsonlukhele.me](https://samsonlukhele.me/)
- Email: siyabonga.lukhele@umuzi.org

---

<p align="center">
  Made with ❤️ and way too much ☕
</p>
