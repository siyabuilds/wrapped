import { mongo } from "mongoose";

export const config = {
  port: process.env.PORT || 3001,
  githubToken: process.env.GITHUB_TOKEN,
  openaiToken: process.env.OPENAI_TOKEN,
  year: () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const december1st = new Date(currentYear, 11, 1);

    return now < december1st ? currentYear - 1 : currentYear;
  },
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/wrapped",
  defaultModel: "gpt-4.1-mini",
};
