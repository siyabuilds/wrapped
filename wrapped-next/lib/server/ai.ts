import OpenAI from "openai";
import { config } from "@/lib/server/config";

type StatsLike = {
  topLanguage?: string;
  totalCommits?: number;
  mostActiveDay?: string;
  totalRepos?: number;
  activeDays?: number;
  weekDayActivity?: number;
  weekendDayActivity?: number;
  languagesBreakdown?: Array<{ name: string }>;
  topStarredRepo?: { name?: string; stars?: number } | null;
  ghostedRepo?: { name?: string; ghostDays?: number } | null;
};

const getOpenAIClient = (): OpenAI | null => {
  if (!config.openaiToken) return null;
  return new OpenAI({ apiKey: config.openaiToken });
};

export const generateRoast = async (activitySummary: StatsLike): Promise<string> => {
  const openai = getOpenAIClient();

  if (!openai) {
    return `You spent most of your time writing ${activitySummary.topLanguage || "code"}. Your most loyal repo is "${activitySummary.topStarredRepo?.name || "unknown"}" and you really ghosted "${activitySummary.ghostedRepo?.name || "that one project"}". Classic developer move!`;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: config.defaultModel,
      messages: [
        {
          role: "system",
          content:
            "You are a witty AI that creates fun, playful roasts for developers based on their GitHub stats. Keep it short (2-3 sentences), funny, and not mean-spirited. Use emojis.",
        },
        {
          role: "user",
          content: `Create a fun roast for this developer's GitHub ${config.year()} stats:\n- Top language: ${activitySummary.topLanguage}\n- Total commits: ${activitySummary.totalCommits}\n- Most active day: ${activitySummary.mostActiveDay}\n- Top repo: ${activitySummary.topStarredRepo?.name || "unknown"}\n- Ghosted repo (longest without commits): ${activitySummary.ghostedRepo?.name || "none"}\n- Total repos: ${activitySummary.totalRepos}\n- Streak days: ${activitySummary.activeDays}`,
        },
      ],
    });

    return completion.choices[0]?.message?.content?.trim() || "Couldn't generate a roast at this time, but keep coding!";
  } catch (error) {
    console.error("Error generating roast:", error);
    return "Couldn't generate a roast at this time, but keep coding!";
  }
};

export const generatePredictions = async (
  stats: StatsLike
): Promise<{ languagePrediction: string; ossPrediction: string; burnoutRisk: string }> => {
  const openai = getOpenAIClient();

  const fallback = {
    languagePrediction: `In ${config.year() + 1}, you might explore new languages beyond ${stats.topLanguage || "your comfort zone"}.`,
    ossPrediction:
      "Open source contributions could be in your future - keep an eye out for projects that excite you!",
    burnoutRisk: "Remember to take breaks and maintain a healthy coding pace!",
  };

  if (!openai) {
    return fallback;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: config.defaultModel,
      messages: [
        {
          role: "system",
          content: `You are a fun, speculative AI that makes playful predictions about a developer's next year. Frame everything as speculation, not facts. Be encouraging but realistic. Return a JSON object with exactly these keys:\n- languagePrediction\n- ossPrediction\n- burnoutRisk`,
        },
        {
          role: "user",
          content: `Make fun predictions for this developer's ${config.year() + 1}:\n- Top language: ${stats.topLanguage}\n- Languages used: ${stats.languagesBreakdown?.map((l) => l.name).join(", ") || stats.topLanguage}\n- Total commits: ${stats.totalCommits}\n- Most active day: ${stats.mostActiveDay}\n- Active days this year: ${stats.activeDays}\n- Total repos: ${stats.totalRepos}\n- Top repo stars: ${stats.topStarredRepo?.stars || 0}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) return fallback;

    const parsed = JSON.parse(content) as {
      languagePrediction?: string;
      ossPrediction?: string;
      burnoutRisk?: string;
    };

    return {
      languagePrediction: parsed.languagePrediction || fallback.languagePrediction,
      ossPrediction: parsed.ossPrediction || fallback.ossPrediction,
      burnoutRisk: parsed.burnoutRisk || fallback.burnoutRisk,
    };
  } catch (error) {
    console.error("Error generating predictions:", error);
    return fallback;
  }
};

export const generateAdvice = async (habits: StatsLike): Promise<string> => {
  const openai = getOpenAIClient();

  const isWeekendCoder = ["Saturday", "Sunday"].includes(habits.mostActiveDay || "");
  const fallback = isWeekendCoder
    ? "You commit mostly on weekends. Try short weekday coding sessions to keep momentum going."
    : `Your ${habits.mostActiveDay || "weekday"} productivity peak suggests you've found your flow state day. Protect that time.`;

  if (!openai) {
    return fallback;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: config.defaultModel,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI that gives one personalized, actionable coding tip based on a developer's patterns. Keep it to 1-2 sentences.",
        },
        {
          role: "user",
          content: `Give one personalized tip for this developer:\n- Most active day: ${habits.mostActiveDay}\n- Weekday activity: ${habits.weekDayActivity}\n- Weekend activity: ${habits.weekendDayActivity}\n- Total commits: ${habits.totalCommits}\n- Active days: ${habits.activeDays}\n- Total repos: ${habits.totalRepos}\n- Top language: ${habits.topLanguage}\n- Ghosted repo for ${habits.ghostedRepo?.ghostDays || 0} days: ${habits.ghostedRepo?.name || "none"}`,
        },
      ],
    });

    return completion.choices[0]?.message?.content || fallback;
  } catch (error) {
    console.error("Error generating advice:", error);
    return fallback;
  }
};

export const generateDevStory = async (yearSummary: StatsLike): Promise<string> => {
  const openai = getOpenAIClient();

  const fallback = `In ${config.year()}, you explored ${yearSummary.topLanguage || "new tech"}, doubled down on ${yearSummary.topStarredRepo?.name || "your craft"}, and quietly abandoned ${yearSummary.ghostedRepo?.name || "that side project you swore you'd finish"}.`;

  if (!openai) {
    return fallback;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: config.defaultModel,
      messages: [
        {
          role: "system",
          content:
            "You create a single, memorable sentence that summarizes a developer's year. Keep it one sentence, clean, and based on the stats.",
        },
        {
          role: "user",
          content: `Create a one-sentence dev story for ${config.year()}:\n- Top language: ${yearSummary.topLanguage}\n- Other languages: ${yearSummary.languagesBreakdown?.slice(1).map((l) => l.name).join(", ") || "none"}\n- Top repo: ${yearSummary.topStarredRepo?.name || "unknown"}\n- Ghosted repo: ${yearSummary.ghostedRepo?.name || "none"}\n- Total commits: ${yearSummary.totalCommits}\n- Total repos: ${yearSummary.totalRepos}\n- Most active day: ${yearSummary.mostActiveDay}`,
        },
      ],
    });

    return completion.choices[0]?.message?.content || fallback;
  } catch (error) {
    console.error("Error generating dev story:", error);
    return fallback;
  }
};
