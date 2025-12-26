import mongoose from "mongoose";
import { config } from "../config/index.js";

// Connect to MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
