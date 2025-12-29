import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Sub-schema for language breakdown
const LanguageBreakdownSchema = new Schema(
  {
    name: { type: String, required: true },
    count: { type: Number, required: true },
    percentage: { type: Number, required: true },
  },
  { _id: false }
);

// Sub-schema for repository references
const RepoReferenceSchema = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    stars: { type: Number },
    ghostDays: { type: Number },
  },
  { _id: false }
);

// Sub-schema for AI predictions
const PredictionsSchema = new Schema(
  {
    languagePrediction: { type: String },
    ossPrediction: { type: String },
    burnoutRisk: { type: String },
  },
  { _id: false }
);

// Define Wrapped schema with all stats
const WrappedSchema = new Schema({
  username: { type: String, required: true },
  year: { type: Number, required: true },

  // User information
  name: { type: String },
  avatarUrl: { type: String },
  bio: { type: String },

  // Language stats
  topLanguage: { type: String },
  languagesBreakdown: [LanguageBreakdownSchema],

  // Activity stats
  mostActiveDay: { type: String },
  weekDayActivity: { type: Number },
  weekendDayActivity: { type: Number },

  // Repository stats
  totalRepos: { type: Number },
  public_repos: { type: Number },
  ghostedRepo: { type: RepoReferenceSchema },
  topStarredRepo: { type: RepoReferenceSchema },

  // Contribution stats
  totalCommits: { type: Number },
  activeDays: { type: Number },
  totalContributions: { type: Number },
  totalEvents: { type: Number },

  // Social stats
  followers: { type: Number },
  following: { type: Number },

  // AI-generated content
  roast: { type: String },
  devStory: { type: String },
  advice: { type: String },
  predictions: { type: PredictionsSchema },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Compound index on username and year for efficient lookups
WrappedSchema.index({ username: 1, year: 1 }, { unique: true });

// Pre-save hook to update updatedAt timestamp
WrappedSchema.pre("save", async function () {
  this.updatedAt = new Date();
});

// Static method to find by username and year
WrappedSchema.statics.findByUsernameAndYear = function (username, year) {
  return this.findOne({ username, year });
};

// Static method to upsert (update or insert) wrapped data
WrappedSchema.statics.upsertWrapped = async function (username, year, data) {
  return this.findOneAndUpdate(
    { username, year },
    { ...data, updatedAt: new Date() },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
};

export const Wrapped = model("Wrapped", WrappedSchema);
