import mongoose from "mongoose";
import { config } from "../config/index.js";

// Connect to MongoDB with connection pooling and event handlers
export const connectDB = async () => {
  // Prevent duplicate connections - check mongoose readyState
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    // Connection options with pool settings
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(config.mongoUri, options);
    console.log("Connected to MongoDB");

    // Set up event handlers after successful connection
    setupEventHandlers();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // Let index.js handle the exit
  }
};

// Set up event handlers once
let handlersSetUp = false;
const setupEventHandlers = () => {
  if (handlersSetUp) return;
  handlersSetUp = true;

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("MongoDB reconnected");
  });
};

// Graceful disconnect function
export const disconnectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
    throw error;
  }
};

// Check if database is connected
export const isDBConnected = () => {
  return mongoose.connection.readyState === 1;
};
