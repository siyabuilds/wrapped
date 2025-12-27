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

export default wrappedRouter;
