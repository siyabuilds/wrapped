import mongoose, { Model, Schema } from "mongoose";

interface LanguageBreakdown {
  name: string;
  count: number;
  percentage: number;
}

interface RepoReference {
  name: string;
  url: string;
  stars?: number;
  ghostDays?: number;
}

interface Predictions {
  languagePrediction?: string;
  ossPrediction?: string;
  burnoutRisk?: string;
}

export interface WrappedDocument {
  username: string;
  year: number;
  name?: string | null;
  avatarUrl?: string;
  bio?: string | null;
  topLanguage?: string;
  languagesBreakdown?: LanguageBreakdown[];
  mostActiveDay?: string;
  weekDayActivity?: number;
  weekendDayActivity?: number;
  totalRepos?: number;
  public_repos?: number;
  ghostedRepo?: RepoReference | null;
  topStarredRepo?: RepoReference | null;
  totalCommits?: number;
  activeDays?: number;
  totalContributions?: number;
  totalEvents?: number;
  followers?: number;
  following?: number;
  roast?: string;
  devStory?: string;
  advice?: string;
  predictions?: Predictions;
  createdAt?: Date;
  updatedAt?: Date;
}

interface WrappedModel extends Model<WrappedDocument> {
  findByUsernameAndYear(username: string, year: number): Promise<WrappedDocument | null>;
  upsertWrapped(
    username: string,
    year: number,
    data: Partial<WrappedDocument>
  ): Promise<WrappedDocument | null>;
}

const LanguageBreakdownSchema = new Schema<LanguageBreakdown>(
  {
    name: { type: String, required: true },
    count: { type: Number, required: true },
    percentage: { type: Number, required: true },
  },
  { _id: false }
);

const RepoReferenceSchema = new Schema<RepoReference>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    stars: { type: Number },
    ghostDays: { type: Number },
  },
  { _id: false }
);

const PredictionsSchema = new Schema<Predictions>(
  {
    languagePrediction: { type: String },
    ossPrediction: { type: String },
    burnoutRisk: { type: String },
  },
  { _id: false }
);

const WrappedSchema = new Schema<WrappedDocument, WrappedModel>({
  username: { type: String, required: true },
  year: { type: Number, required: true },

  name: { type: String },
  avatarUrl: { type: String },
  bio: { type: String },

  topLanguage: { type: String },
  languagesBreakdown: [LanguageBreakdownSchema],

  mostActiveDay: { type: String },
  weekDayActivity: { type: Number },
  weekendDayActivity: { type: Number },

  totalRepos: { type: Number },
  public_repos: { type: Number },
  ghostedRepo: { type: RepoReferenceSchema },
  topStarredRepo: { type: RepoReferenceSchema },

  totalCommits: { type: Number },
  activeDays: { type: Number },
  totalContributions: { type: Number },
  totalEvents: { type: Number },

  followers: { type: Number },
  following: { type: Number },

  roast: { type: String },
  devStory: { type: String },
  advice: { type: String },
  predictions: { type: PredictionsSchema },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

WrappedSchema.index({ username: 1, year: 1 }, { unique: true });

WrappedSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

WrappedSchema.static("findByUsernameAndYear", function (username: string, year: number) {
  return this.findOne({ username, year });
});

WrappedSchema.static(
  "upsertWrapped",
  async function (username: string, year: number, data: Partial<WrappedDocument>) {
    return this.findOneAndUpdate(
      { username, year },
      { ...data, updatedAt: new Date() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
);

export const Wrapped =
  (mongoose.models.Wrapped as WrappedModel) ||
  mongoose.model<WrappedDocument, WrappedModel>("Wrapped", WrappedSchema);
