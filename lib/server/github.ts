import { config } from "@/lib/server/config";

export const GITHUB_API_BASE = "https://api.github.com";
export const GITHUB_GRAPHQL_ENDPOINT = `${GITHUB_API_BASE}/graphql`;

export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  name: string;
  html_url: string;
  language: string | null;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
}

export interface GitHubEvent {
  type: string;
  created_at: string;
  payload?: {
    commits?: Array<unknown>;
  };
}

export interface CommitSearchResponse {
  total_count?: number;
}

interface ContributionDay {
  contributionCount: number;
  date: string;
  weekday: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface ContributionsCollection {
  totalCommitContributions: number;
  totalPullRequestContributions: number;
  totalIssueContributions: number;
  totalRepositoryContributions: number;
  contributionCalendar: ContributionCalendar;
}

const getGitHubHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };

  if (config.githubToken) {
    headers.Authorization = `Bearer ${config.githubToken}`;
  }

  return headers;
};

export const fetchFromGitHub = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
    headers: getGitHubHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
};

export const searchCommits = async (
  username: string,
  year: number,
  page = 1
): Promise<CommitSearchResponse> => {
  const query = `author:${username} author-date:${year}-01-01..${year}-12-31`;
  const response = await fetch(
    `${GITHUB_API_BASE}/search/commits?q=${encodeURIComponent(query)}&per_page=100&page=${page}`,
    {
      headers: {
        ...getGitHubHeaders(),
        Accept: "application/vnd.github.cloak-preview",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub Search API error: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as CommitSearchResponse;
};

export const getUserContributions = async (
  username: string,
  year: number
): Promise<ContributionsCollection | null> => {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          totalRepositoryContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                weekday
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: getGitHubHeaders(),
    body: JSON.stringify({ query, variables: { username } }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL API error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as {
    data?: {
      user?: {
        contributionsCollection?: ContributionsCollection;
      };
    };
  };

  return data.data?.user?.contributionsCollection ?? null;
};
