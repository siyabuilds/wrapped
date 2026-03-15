import { NextResponse } from "next/server";
import { connectDB } from "@/db/connect";
import { Wrapped } from "@/db/models/Wrapped";
import { generateAdvice, generateDevStory, generatePredictions } from "@/lib/server/ai";
import { config } from "@/lib/server/config";

type RouteContext = {
  params: Promise<{ username: string }> | { username: string };
};

type InsightsBody = {
  stats?: Record<string, unknown>;
};

const getUsername = async (context: RouteContext): Promise<string> => {
  const params = await Promise.resolve(context.params);
  return params.username;
};

export async function POST(request: Request, context: RouteContext) {
  try {
    await connectDB();

    const username = await getUsername(context);
    const year = config.year();
    const body = (await request.json()) as InsightsBody;

    if (!body?.stats) {
      return NextResponse.json({ error: "Stats data is required" }, { status: 400 });
    }

    const cachedWrapped = await Wrapped.findByUsernameAndYear(username, year);
    if (cachedWrapped?.predictions && cachedWrapped?.advice && cachedWrapped?.devStory) {
      return NextResponse.json({
        predictions: cachedWrapped.predictions,
        advice: cachedWrapped.advice,
        devStory: cachedWrapped.devStory,
      });
    }

    const [predictions, advice, devStory] = await Promise.all([
      generatePredictions(body.stats),
      generateAdvice(body.stats),
      generateDevStory(body.stats),
    ]);

    await Wrapped.upsertWrapped(username, year, {
      predictions,
      advice,
      devStory,
    });

    return NextResponse.json({ predictions, advice, devStory });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
