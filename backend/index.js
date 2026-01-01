import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { config, isDev } from "./config/index.js";
import { connectDB, disconnectDB, isDBConnected } from "./db/connect.js";
import wrappedRouter from "./routes/wrpped.js";

// ES Module dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public directory (always available)
app.use(express.static(path.join(__dirname, "public")));

// Health check - JSON endpoint
app.get("/health/json", (req, res) => {
  res.json({
    status: "ok",
    year: config.year(),
    database: isDBConnected() ? "connected" : "disconnected",
  });
});

// Health check - HTML dashboard
app.get("/health", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "health.html"));
});

// Dev-only root route
if (isDev) {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index-dev.html"));
  });
}

// Routes
app.use("/api/wrapped", wrappedRouter);

// Serve static files in production - SPA fallback
if (!isDev) {
  // Catch-all route for SPA - serve index.html for any non-API routes
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
}

// Async startup pattern - connect DB before starting server
const startServer = async () => {
  try {
    await connectDB();

    // Start server after successful DB connection
    const server = app.listen(config.port, () => {
      console.log(
        `GitHub Wrapped API running on http://localhost:${config.port}`
      );
      console.log(`🔑 GitHub Token: ${config.githubToken ? "✓" : "✗"}`);
      console.log(`🤖 OpenAI Token: ${config.openaiToken ? "✓" : "✗"}`);
      console.log(`📅 Current Wrapped Year: ${config.year()}`);
    });

    // Graceful shutdown handlers
    const gracefulShutdown = async (signal) => {
      console.log(`\n${signal} received, shutting down gracefully...`);

      // Stop accepting new requests
      server.close(async () => {
        console.log("HTTP server closed");

        // Disconnect from database
        await disconnectDB();

        console.log("Graceful shutdown complete");
        process.exit(0);
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        console.error("Forced shutdown after timeout");
        process.exit(1);
      }, 10000);
    };

    // Listen for termination signals
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();
