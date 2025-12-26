import OpenAI from "openai";
import { config } from "../config/index.js";

// Initialize OpenAI client
const getOpenAIClient = () => {
  if (!config.openaiToken) {
    throw new Error("OpenAI token is not configured.");
  }
  return new OpenAI({
    apiKey: config.openaiToken,
  });
};

// AI-powered roast based on GitHub activity
export const generateRoast = async (activitySummary) => {};

// Generate next year's predictions based on current year's data/stats
export const generatePredictions = (stats) => {};

// Generate personalized advice based on user's GitHub habits
export const generateAdvice = (habits) => {};

// Generate a one-sentence dev story summarizing the user's year
export const generateDevStory = (yearSummary) => {};
