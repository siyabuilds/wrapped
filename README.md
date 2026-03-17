# Wrapped

Developer year-in-review for GitHub users.

This app fetches GitHub activity, computes yearly stats, caches results in MongoDB, and generates optional AI insights (roast, predictions, advice, and dev story).

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- MongoDB + Mongoose
- Tailwind CSS 4
- OpenAI API (optional, with local fallbacks)

## Features

- Username-based wrapped page: `/wrapped/:username`
- Aggregated yearly GitHub stats (repos, commits, activity, language mix, contributions)
- Cached wrapped results per `username + year`
- AI-generated extras:
	- roast
	- predictions
	- personalized advice
	- one-line dev story
- Graceful fallback behavior when OpenAI or portions of GitHub data are unavailable

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment variables

Create `.env.local` in the project root:

```env
# Required
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority

# Recommended (prevents GitHub rate limits)
GITHUB_TOKEN=ghp_xxx

# Optional (enables AI insights)
OPENAI_TOKEN=sk-xxx

# Optional for split frontend/backend deployments
# Leave unset for same-origin API calls in local development.
NEXT_PUBLIC_API_URL=
```

### 3. Run the app

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Run production server
- `npm run lint` - Run ESLint

## API Routes

### `GET /api/wrapped/:username`

- Computes wrapped stats for the target year and caches in MongoDB.
- Returns cached result when available.
- Returns `404` when the GitHub user does not exist.

### `POST /api/wrapped/:username/ai-insights`

Body:

```json
{
	"stats": { "...": "wrapped stats object" }
}
```

Response:

```json
{
	"predictions": {
		"languagePrediction": "...",
		"ossPrediction": "...",
		"burnoutRisk": "..."
	},
	"advice": "...",
	"devStory": "..."
}
```

### `POST /api/wrapped/:username/roast`

Body:

```json
{
	"stats": { "...": "wrapped stats object" }
}
```

Response:

```json
{
	"roast": "..."
}
```

## Year Logic

The wrapped year is dynamic:

- before December 1st: previous year
- on/after December 1st: current year

## Notes

- `OPENAI_TOKEN` is optional. If missing, AI endpoints return deterministic fallback text.
- `GITHUB_TOKEN` is strongly recommended to reduce rate-limit issues.
- MongoDB is required because wrapped output and AI fields are cached/stored.
