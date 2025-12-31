import OpenAI from "openai";
import { config } from "../config/index.js";

// Check if OpenAI token is configured
const isOpenAIConfigured = () => {
  return Boolean(config.openaiToken);
};

// Initialize OpenAI client
const getOpenAIClient = () => {
  isOpenAIConfigured();
  return new OpenAI({
    apiKey: config.openaiToken,
  });
};

// AI-powered roast based on GitHub activity
export const generateRoast = async (activitySummary) => {
  const openai = getOpenAIClient();
  if (!openai) {
    return `You spent most of your time writing ${
      activitySummary.topLanguage || "code"
    }. Your most loyal repo is "${
      activitySummary.topStarredRepo?.name || "unknown"
    }" and you really ghosted "${
      activitySummary.ghostedRepo?.name || "that one project"
    }". Classic developer move! 🔥`;
  }
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a witty AI that creates fun, playful roasts for developers based on their GitHub stats. Keep it short (2-3 sentences), funny, and not mean-spirited. Use emojis.",
        },
        {
          role: "user",
          content: `Create a fun roast for this developer's GitHub ${config.year()} stats:
            - Top language: ${activitySummary.topLanguage}
            - Total commits: ${activitySummary.totalCommits}
            - Most active day: ${activitySummary.mostActiveDay}
            - Top repo: ${activitySummary.topStarredRepo?.name || "unknown"}
            - Ghosted repo (longest without commits): ${
              activitySummary.ghostedRepo?.name || "none"
            }
            - Total repos: ${activitySummary.totalRepos}
            - Streak days: ${activitySummary.activeDays}`,
        },
      ],
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating roast:", error);
    return "Couldn't generate a roast at this time, but keep coding!🚀";
  }
};

// Generate next year's predictions based on current year's data/stats
export const generatePredictions = async (stats) => {
  const openai = getOpenAIClient();
  if (!openai) {
    return {
      languagePrediction: `In ${
        config.year() + 1
      }, you might explore new languages beyond ${
        stats.topLanguage || "your comfort zone"
      }! 🚀`,
      ossPrediction:
        "Open source contributions could be in your future - keep an eye out for projects that excite you!",
      burnoutRisk:
        "Remember to take breaks and maintain a healthy coding pace! 💪",
    };
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a fun, speculative AI that makes playful predictions about a developer's next year. Frame everything as speculation, not facts. Be encouraging but realistic. Return a JSON object with exactly these keys:
- languagePrediction: A fun prediction about what language they might use more (1-2 sentences)
- ossPrediction: Whether they might contribute to open source (1-2 sentences)  
- burnoutRisk: A careful but fun assessment of their coding pace (1-2 sentences, use emojis)

Keep it light-hearted and positive. Use emojis sparingly but effectively.`,
        },
        {
          role: "user",
          content: `Make fun predictions for this developer's ${
            config.year() + 1
          }:
            - Top language: ${stats.topLanguage}
            - Languages used: ${
              stats.languagesBreakdown?.map((l) => l.name).join(", ") ||
              stats.topLanguage
            }
            - Total commits: ${stats.totalCommits}
            - Most active day: ${stats.mostActiveDay}
            - Active days this year: ${stats.activeDays}
            - Total repos: ${stats.totalRepos}
            - Top repo stars: ${stats.topStarredRepo?.stars || 0}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const parsed = JSON.parse(completion.choices[0].message.content);
    return {
      languagePrediction: parsed.languagePrediction,
      ossPrediction: parsed.ossPrediction,
      burnoutRisk: parsed.burnoutRisk,
    };
  } catch (error) {
    console.error("Error generating predictions:", error);
    return defaultPredictions;
  }
};

// Generate personalized advice based on user's GitHub habits
export const generateAdvice = async (habits) => {
  const openai = getOpenAIClient();

  const isWeekendCoder = ["Saturday", "Sunday"].includes(habits.mostActiveDay);
  const defaultAdvice = isWeekendCoder
    ? "You commit mostly on weekends → you might benefit from shorter weekday coding sessions to keep momentum going. Even 20 minutes counts! ⏰"
    : `Your ${habits.mostActiveDay} productivity peak suggests you've found your flow state day. Protect that time! 🛡️`;

  if (!openai) {
    return defaultAdvice;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a helpful AI that gives ONE personalized, actionable coding tip based on a developer's actual patterns. 
The advice should:
- Be specific to their data (mention their actual patterns)
- Be actionable and practical
- Feel personal without being creepy
- Be 1-2 sentences max
- Include one relevant emoji

Examples of good advice:
- "You commit mostly on weekends → you might benefit from shorter weekday coding sessions to keep momentum going."
- "Your Tuesday productivity spikes suggest that's your flow state day — try protecting that time from meetings."
- "With many repos and few active days, consider focusing on fewer projects more deeply."`,
        },
        {
          role: "user",
          content: `Give ONE personalized tip for this developer:
            - Most active day: ${habits.mostActiveDay}
            - Weekday activity: ${habits.weekDayActivity}
            - Weekend activity: ${habits.weekendDayActivity}
            - Total commits: ${habits.totalCommits}
            - Active days: ${habits.activeDays}
            - Total repos: ${habits.totalRepos}
            - Top language: ${habits.topLanguage}
            - Ghosted repo for ${habits.ghostedRepo?.ghostDays || 0} days: ${
            habits.ghostedRepo?.name || "none"
          }`,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error generating advice:", error);
    return defaultAdvice;
  }
};

// Generate a one-sentence dev story summarizing the user's year
export const generateDevStory = async (yearSummary) => {
  const openai = getOpenAIClient();
  const defaultStory = `In ${config.year()}, you explored ${
    yearSummary.topLanguage
  }, doubled down on ${
    yearSummary.topStarredRepo?.name || "your craft"
  }, and quietly abandoned ${
    yearSummary.ghostedRepo?.name
      ? yearSummary.ghostedRepo.name
      : "that side project you swore you'd finish"
  }.`;

  if (!openai) {
    return defaultStory;
  }

  try {
    const openai = getOpenAIClient();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You create a single, memorable sentence that summarizes a developer's year. 
The format should be: "In ${config.year()}, you [did X], [doubled down on Y], and [quietly abandoned Z]."
Make it:
- Exactly one sentence
- Relatable and slightly self-deprecating
- Screenshot-worthy
- Based on their actual stats
- No emojis in this one — keep it clean and quotable`,
        },
        {
          role: "user",
          content: `Create a one-sentence dev story for ${config.year()}:
            - Top language: ${yearSummary.topLanguage}
            - Other languages: ${
              yearSummary.languagesBreakdown
                ?.slice(1)
                .map((l) => l.name)
                .join(", ") || "none"
            }
            - Top repo: ${yearSummary.topStarredRepo?.name || "unknown"}
            - Ghosted repo: ${yearSummary.ghostedRepo?.name || "none"}
            - Total commits: ${yearSummary.totalCommits}
            - Total repos: ${yearSummary.totalRepos}
            - Most active day: ${yearSummary.mostActiveDay}`,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error generating dev story:", error);
    return defaultStory;
  }
};
