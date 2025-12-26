import { config } from "../config";

// GitHub API Base URL
export const GITHUB_API_BASE = "https://api.github.com";

// GitHub GraphQL Endpoint
export const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

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
