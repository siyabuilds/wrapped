import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Define Wrapped schema
const WrappedSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String },
  avatarUrl: { type: String },
  year: { type: Number, required: true },
  roast: { type: String },
  devStory: { type: String },
  predictions: {
    languagePrediction: String,
    ossPrediction: String,
    burnoutRisk: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export const Wrapped = model("Wrapped", WrappedSchema);
