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
import { config } from "../config/index.js";
import { Wrapped } from "../models/Wrapped.js";

const wrappedRouter = express.Router();

// GET /api/wrapped/:username/
// Fetch GitHub stats for a year (with caching)
wrappedRouter.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const year = config.year();

    // Check cache first
    const cachedWrapped = await Wrapped.findByUsernameAndYear(username, year);
    if (cachedWrapped) {
      console.log(`Cache hit for ${username} (${year})`);
      return res.json(cachedWrapped.toObject());
    }

    // Fetch from GitHub on cache miss
    const [user, repos, commitSearch, events, contributions] =
      await Promise.all([
        fetchFromGitHub(`/users/${username}`),
        fetchFromGitHub(
          `/users/${username}/repos?per_page=100&sort=pushed&direction=desc`
        ),
        fetchFromGitHub(`/users/${username}/events/public?per_page=100`),
        searchCommits(username, year),
        getUserContributions(username, year),
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

    // Cache the stats
    const wrapped = await Wrapped.upsertWrapped(username, year, stats);
    console.log(`Cached stats for ${username} (${year})`);

    res.json(wrapped.toObject());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/wrapped/:username/roast
// Generate AI-powered roast based on stats (with caching)
wrappedRouter.post("/:username/roast", async (req, res) => {
  try {
    const { username } = req.params;
    const { stats } = req.body;
    const year = config.year();

    if (!stats) {
      return res.status(400).json({ error: "Stats data is required" });
    }

    // Check if roast is already cached
    const cachedWrapped = await Wrapped.findByUsernameAndYear(username, year);
    if (cachedWrapped?.roast) {
      console.log(`Roast cache hit for ${username} (${year})`);
      return res.json({ roast: cachedWrapped.roast });
    }

    // Generate new roast
    const roast = await generateRoast(stats);

    // Cache the roast
    await Wrapped.upsertWrapped(username, year, { roast });
    console.log(`Cached roast for ${username} (${year})`);

    res.json({ roast });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/wrapped/:username/ai-insights
// Generate AI-powered insights based on stats (with caching)
wrappedRouter.post("/:username/ai-insights", async (req, res) => {
  try {
    const { username } = req.params;
    const { stats } = req.body;
    const year = config.year();

    if (!stats) {
      return res.status(400).json({ error: "Stats data is required" });
    }

    // Check if insights are already cached
    const cachedWrapped = await Wrapped.findByUsernameAndYear(username, year);
    if (
      cachedWrapped?.predictions &&
      cachedWrapped?.advice &&
      cachedWrapped?.devStory
    ) {
      console.log(`AI insights cache hit for ${username} (${year})`);
      return res.json({
        predictions: cachedWrapped.predictions,
        advice: cachedWrapped.advice,
        devStory: cachedWrapped.devStory,
      });
    }

    console.log(`Generating AI insights for ${username} (${year})...`);

    // Generate new insights
    const [predictions, advice, devStory] = await Promise.all([
      generatePredictions(stats),
      generateAdvice(stats),
      generateDevStory(stats),
    ]);

    // Cache the insights
    await Wrapped.upsertWrapped(username, year, {
      predictions,
      advice,
      devStory,
    });
    console.log(`Cached AI insights for ${username} (${year})`);

    res.json({ predictions, advice, devStory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default wrappedRouter;
