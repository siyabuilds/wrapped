export interface LanguageBreakdown {
  name: string;
  count: number;
  percentage: number;
}

export interface RepoInfo {
  name: string;
  url: string;
  stars?: number;
  ghostDays?: number;
}

export interface Predictions {
  languagePrediction: string;
  ossPrediction: string;
  burnoutRisk: string;
}

export interface AIInsights {
  predictions: Predictions;
  advice: string;
  devStory: string;
}

export interface WrappedStats {
  username: string;
  avatarUrl: string;
  name: string | null;
  bio: string | null;
  topLanguage: string;
  languagesBreakdown: LanguageBreakdown[];
  mostActiveDay: string;
  weekDayActivity: number;
  weekendDayActivity: number;
  ghostedRepo: RepoInfo | null;
  topStarredRepo: RepoInfo | null;
  totalCommits: number;
  activeDays: number;
  totalRepos: number;
  public_repos: number;
  totalContributions: number;
  followers: number;
  following: number;
  totalEvents: number;
  year: number;
  createdAt?: string;
  roast?: string;
  predictions?: Predictions;
  advice?: string;
  devStory?: string;
}
