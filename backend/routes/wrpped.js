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

const wrappedRouter = express.Router();

// GET /api/wrapped/:username/
// Fetch GitHub stats for a year
wrappedRouter.get("/:username/", async (req, res) => {});

// POST /api/wrapped/:username/roast
// Generate AI-powered roast based on stats
wrappedRouter.post("/:username/roast", async (req, res) => {});

// POST /api/wrapped/:username/ai-insights
// Generate AI-powered insights based on stats
wrappedRouter.post("/:username/ai-insights", async (req, res) => {});

export default wrappedRouter;
