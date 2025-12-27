import { config } from "../config";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const weekDays = DAYS.slice(1, 6);
const weekendDays = [DAYS[0], DAYS[6]];

// Calculate language stats from repos
export const calculateLanguageStats = (repos) => {
  const languageCounts = {};

  repos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });

  const topLanguage =
    Object.entries(languageCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    "Unknown";

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

// Calculate day of week activity statistics
export const calculateDayOfWeekStats = (contributions, events) => {
  const dayCounts = {
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
    // Fallback to events data if contributions data is missing
    events.forEach((event) => {
      const date = new Date(event.created_at);
      const dayName = DAYS[date.getDay()];
      dayCounts[dayName] += 1;
    });
  }

  const mostActiveDay = Object.entries(dayCounts).sort(
    (a, b) => b[1] - a[1]
  )[0][0];

  const weekDayActivity = weekDays.reduce(
    (sum, day) => sum + dayCounts[day],
    0
  );
  const weekendDayActivity = weekendDays.reduce(
    (sum, day) => sum + dayCounts[day],
    0
  );
  return {
    mostActiveDay,
    weekDayActivity,
    weekendDayActivity,
  };
};

// Find ghosted repo (longest time since last update)
export const findGhostedRepo = (repos) => {
  const now = new Date();
  let ghostedRepo = null;
  let maxGhostDays = 0;

  repos.forEach((repo) => {
    const createdAt = new Date(repo.created_at);
    // Only consider repos older than 30 days
    if ((now - createdAt) / (1000 * 60 * 60 * 24) > 30) {
      const lastUpdatedAt = new Date(repo.updated_at);
      const ghostDays = Math.floor(
        (now - lastUpdatedAt) / (1000 * 60 * 60 * 24)
      );
      if (ghostDays > maxGhostDays) {
        maxGhostDays = ghostDays;
        ghostedRepo = repo;
      }
    }
  });

  return ghostedRepo
    ? {
        name: ghostedRepo.name,
        url: ghostedRepo.html_url,
        ghostDays: maxGhostDays,
      }
    : null;
};
