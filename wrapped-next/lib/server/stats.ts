import { config } from "@/lib/server/config";
import {
  CommitSearchResponse,
  ContributionsCollection,
  GitHubEvent,
  GitHubRepo,
  GitHubUser,
} from "@/lib/server/github";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weekDays = DAYS.slice(1, 6);
const weekendDays = [DAYS[0], DAYS[6]];

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
  ghostedRepo: RepoReference | null;
  topStarredRepo: RepoReference | null;
  totalCommits: number;
  activeDays: number;
  totalRepos: number;
  public_repos: number;
  totalContributions: number;
  followers: number;
  following: number;
  totalEvents: number;
  year: number;
}

/**
 * Calculates various GitHub activity stats for a user based on their profile, repositories, events, commit search results, and contribution calendar. 
 * @param repos - List of user's GitHub repositories
 */
const calculateLanguageStats = (repos: GitHubRepo[]) => {
  const languageCounts: Record<string, number> = {};

  repos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });

  const topLanguage = Object.entries(languageCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Unknown";

  const languagesBreakdown = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / repos.length) * 100),
    }));

  return { topLanguage, languagesBreakdown };
};

/**
 * Takes a user's contribution calendar and public events to calculate their most active day of the week, as well as their weekday and weekend activity levels.
 * @param contributions - User's contribution calendar data from GitHub API
 * @param events - List of user's public events from GitHub API
 */
const calculateDayOfWeekStats = (
  contributions: ContributionsCollection | null,
  events: GitHubEvent[]
) => {
  const dayCounts: Record<string, number> = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  };

  if (contributions?.contributionCalendar?.weeks) {
    contributions.contributionCalendar.weeks.forEach((week) => {
      week.contributionDays.forEach((day) => {
        const date = new Date(day.date);
        const dayName = DAYS[date.getDay()];
        dayCounts[dayName] += day.contributionCount;
      });
    });
  } else {
    events.forEach((event) => {
      const date = new Date(event.created_at);
      const dayName = DAYS[date.getDay()];
      dayCounts[dayName] += 1;
    });
  }

  const mostActiveDay = Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0][0];
  const weekDayActivity = weekDays.reduce((sum, day) => sum + dayCounts[day], 0);
  const weekendDayActivity = weekendDays.reduce((sum, day) => sum + dayCounts[day], 0);

  return { mostActiveDay, weekDayActivity, weekendDayActivity };
};

/**
 * The "ghosted repo" is the repo with the longest streak of inactivity (no updates) that is at least 30 days old. This function identifies that repo and calculates how many days it has been inactive.
 * @param repos - List of user's GitHub repositories
 * @returns 
 */
const findGhostedRepo = (repos: GitHubRepo[]): RepoReference | null => {
  const now = new Date();
  let ghostedRepo: GitHubRepo | null = null;
  let maxGhostDays = 0;

  for (const repo of repos) {
    const createdAt = new Date(repo.created_at);
    if ((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24) > 30) {
      const lastUpdatedAt = new Date(repo.updated_at);
      const ghostDays = Math.floor((now.getTime() - lastUpdatedAt.getTime()) / (1000 * 60 * 60 * 24));
      if (ghostDays > maxGhostDays) {
        maxGhostDays = ghostDays;
        ghostedRepo = repo;
      }
    }
  }

  if (!ghostedRepo) {
    return null;
  }

  return {
    name: ghostedRepo.name,
    url: ghostedRepo.html_url,
    ghostDays: maxGhostDays,
  };
};

/**
 * This function identifies the user's most starred repository and returns its name, URL, and star count. If the user has no repositories or all repos have zero stars, it returns null.
 * @param repos - List of user's GitHub repositories
 */
const getTopStarredRepo = (repos: GitHubRepo[]): RepoReference | null => {
  const sortedByStars = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
  const topRepo = sortedByStars[0];

  return topRepo
    ? {
        name: topRepo.name,
        url: topRepo.html_url,
        stars: topRepo.stargazers_count,
      }
    : null;
};

/**
 * This function calculates the total number of commits a user has made in the year by first checking the contributions collection for total commit contributions, then falling back to the commit search results, and finally counting commits from public events if the other data is not available.
 * @param contributions - User's contributions collection data from GitHub API, which may include total commit contributions
 * @param commitSearch - Results from GitHub's commit search API, which may include a total_count of commits matching the search criteria
 * @param events - List of user's public events from GitHub API
 * @returns 
 */
const calculateTotalCommits = (
  contributions: ContributionsCollection | null,
  commitSearch: CommitSearchResponse,
  events: GitHubEvent[]
) => {
  if (contributions?.totalCommitContributions) {
    return contributions.totalCommitContributions;
  }

  if (commitSearch?.total_count) {
    return commitSearch.total_count;
  }

  return events
    .filter((event) => event.type === "PushEvent")
    .reduce((sum, event) => sum + (event.payload?.commits?.length || 0), 0);
};

/**
 * This function calculates the number of days a user has been active by checking their contribution calendar and public events.
 * @param contributions - User's contributions collection data from GitHub API
 * @param events - List of user's public events from GitHub API
 */
const calculateActiveDays = (contributions: ContributionsCollection | null, events: GitHubEvent[]) => {
  if (contributions?.contributionCalendar?.weeks) {
    let activeDays = 0;

    contributions.contributionCalendar.weeks.forEach((week) => {
      week.contributionDays.forEach((day) => {
        if (day.contributionCount > 0) {
          activeDays += 1;
        }
      });
    });

    return activeDays;
  }

  const commitDates = new Set(
    events
      .filter((event) => event.type === "PushEvent")
      .map((event) => new Date(event.created_at).toDateString())
  );

  return commitDates.size;
};

/**
 * This function calculates all the statistics for a GitHub user based on their repositories, events, and contribution data. It compiles this data into a WrappedStats object that can be stored in the database and returned to the client.
 * @param user - GitHub user profile data from GitHub API
 * @param repos - List of user's GitHub repositories
 * @param events - List of user's public events from GitHub API
 * @param commitSearch - Results from GitHub's commit search API
 * @param contributions - User's contributions collection data from GitHub API
 * @returns The calculated statistics for the GitHub user, structured as a WrappedStats object.
 */
export const calculateStats = (
  user: GitHubUser,
  repos: GitHubRepo[],
  events: GitHubEvent[],
  commitSearch: CommitSearchResponse,
  contributions: ContributionsCollection | null
): WrappedStats => {
  const { topLanguage, languagesBreakdown } = calculateLanguageStats(repos);
  const { mostActiveDay, weekDayActivity, weekendDayActivity } = calculateDayOfWeekStats(
    contributions,
    events
  );
  const ghostedRepo = findGhostedRepo(repos);
  const topStarredRepo = getTopStarredRepo(repos);
  const totalCommits = calculateTotalCommits(contributions, commitSearch, events);
  const activeDays = calculateActiveDays(contributions, events);
  const totalContributions = contributions?.contributionCalendar?.totalContributions || events.length;

  return {
    username: user.login,
    avatarUrl: user.avatar_url,
    name: user.name,
    bio: user.bio,
    topLanguage,
    languagesBreakdown,
    mostActiveDay,
    weekDayActivity,
    weekendDayActivity,
    ghostedRepo,
    topStarredRepo,
    totalCommits,
    activeDays,
    totalRepos: repos.length,
    public_repos: user.public_repos,
    totalContributions,
    followers: user.followers,
    following: user.following,
    totalEvents: events.length,
    year: config.year(),
  };
};
