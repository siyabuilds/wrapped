export const isDev = process.env.NODE_ENV === "development";

export const config = {
  githubToken: process.env.GITHUB_TOKEN,
  openaiToken: process.env.OPENAI_TOKEN,
  year: (): number => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const december1st = new Date(currentYear, 11, 1);

    return now < december1st ? currentYear - 1 : currentYear;
  },
  defaultModel: "gpt-4o-mini",
};
