import express from "express";
import cors from "cors";
import { config } from "./config/index.js";
import { connectDB } from "./db/connect.js";

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", year: config.year });
});

app.get("/", (req, res) => {
  res.send("Welcome to the GitHub Wrapped API!");
});

// Start server
app.listen(config.port, () => {
  console.log(
    `🚀 GitHub Wrapped API running on http://localhost:${config.port}`
  );
  console.log(`🔑 GitHub Token: ${config.githubToken ? "✓" : "✗"}`);
  console.log(`🤖 OpenAI Token: ${config.openaiToken ? "✓" : "✗"}`);
  console.log(`📅 Current Wrapped Year: ${config.year()}`);
});
