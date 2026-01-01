import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Check mode
export const isDev = process.env.NODE_ENV === "development";

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
  mongoUri: isDev ? "mongodb://localhost:27017/wrapped" : process.env.MONGO_URI,
  defaultModel: "gpt-4o-mini",
  clientUri: isDev ? "http://localhost:5173" : process.env.CLIENT_URI,
};
