import express from "express";
import {
  fetchFromGitHub,
  searchCommits,
  getUserContributions,
} from "../utils/github.js";
import { calculateStats } from "../utils/stats.js";
import {
  generateRoast,
  generatePredictions,
  generateAdvice,
  generateDevStory,
} from "../services/ai.js";
import { config } from "../config.js";

const wrappedRouter = express.Router();

// GET /api/wrapped/:username/
// Fetch GitHub stats for a year
wrappedRouter.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const [user, repos, commitSearch, events, contributions] =
      await Promise.all([
        fetchFromGitHub(`/users/${username}`),
        fetchFromGitHub(
          `/users/${username}/repos?per_page=100&sort=pushed&direction=desc`
        ),
        fetchFromGitHub(`/users/${username}/events/public?per_page=100`),
        searchCommits(username, config.year()),
        getUserContributions(username, config.year()),
      ]);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const stats = calculateStats(
      user,
      repos,
      events,
      commitSearch,
      contributions
    );
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/wrapped/:username/roast
// Generate AI-powered roast based on stats
wrappedRouter.post("/:username/roast", async (req, res) => {
  try {
    const { stats } = req.body;

    if (!stats) {
      return res.status(400).json({ error: "Stats data is required" });
    }

    const roast = await generateRoast(stats);
    res.json({ roast });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/wrapped/:username/ai-insights
// Generate AI-powered insights based on stats
wrappedRouter.post("/:username/ai-insights", async (req, res) => {
  try {
    const { stats } = req.body;

    if (!stats) {
      return res.status(400).json({ error: "Stats data is required" });
    }

    const [predictions, advice, devStory] = await Promise.all([
      generatePredictions(stats),
      generateAdvice(stats),
      generateDevStory(stats),
    ]);

    res.json({ predictions, advice, devStory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default wrappedRouter;
