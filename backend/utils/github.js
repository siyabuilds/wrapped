import { config } from "../config";

// GitHub API Base URL
export const GITHUB_API_BASE = "https://api.github.com";

// GitHub GraphQL Endpoint
export const GITHUB_GRAPHQL_ENDPOINT = `${GITHUB_API_BASE}/graphql`;

// Function to get headers for GitHub API requests
export const getGitHubHeaders = () => {
  const headers = {
    Accept: "application/vnd.github.v3+json",
  };
  if (config.githubToken) {
    headers.Authorization = `Bearer ${config.githubToken}`;
  }
  return headers;
};

// GitHub basic feth function
export const fetchFromGitHub = async (endpoint) => {
  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
    headers: getGitHubHeaders(),
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

// Search commits for user for a given year
export const searchCommits = async (username, year, page = 1) => {
  const query = `author:${username} author-date:${year}-01-01..${year}-12-31`;
  const response = await fetch(
    `${GITHUB_API_BASE}/search/commits?q=${encodeURIComponent(
      query
    )}&per_page=100&page=${page}`,
    {
      headers: {
        ...getGitHubHeaders(),
        Accept: "application/vnd.github.cloak-preview",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `GitHub Search API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};
