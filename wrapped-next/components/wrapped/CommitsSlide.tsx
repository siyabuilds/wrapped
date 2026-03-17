import { GitCommit, Flame, Activity, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { WrappedStats } from "@/types/wrapped";
import { SlideWrapper } from "./SlideWrapper";

interface CommitsSlideProps {
  stats: WrappedStats;
}

export function CommitsSlide({ stats }: CommitsSlideProps) {
  const commitsPerDay =
    stats.activeDays > 0
      ? (stats.totalCommits / stats.activeDays).toFixed(1)
      : "0";

  return (
    <SlideWrapper>
      <Card className="h-full border-border/80 bg-card/95 shadow-[0_16px_60px_-35px_rgba(25,40,76,0.45)]">
        <CardContent className="flex h-full flex-col items-center gap-6 pt-8 pb-8 sm:pt-10">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-chart-4 to-chart-5 blur-md opacity-60" />
            <div className="relative flex size-20 items-center justify-center rounded-full bg-card ring-4 ring-chart-4/25">
              <GitCommit className="size-10 text-chart-4" />
            </div>
          </div>

          <div className="space-y-2 text-center">
            <p className="text-sm uppercase tracking-[0.17em] text-muted-foreground">
              Total Commits
            </p>
            <h2 className="gradient-text text-5xl font-bold sm:text-6xl">
              {stats.totalCommits.toLocaleString()}
            </h2>
          </div>

          <div className="mt-2 grid w-full grid-cols-2 gap-3 sm:gap-4">
            <div className="glass-panel flex flex-col items-center p-4">
              <Flame className="mb-2 size-5 text-chart-1" />
              <span className="text-2xl font-bold text-foreground">
                {stats.activeDays}
              </span>
              <span className="text-xs text-muted-foreground">Active Days</span>
            </div>

            <div className="glass-panel flex flex-col items-center p-4">
              <TrendingUp className="mb-2 size-5 text-chart-4" />
              <span className="text-2xl font-bold text-foreground">
                {commitsPerDay}
              </span>
              <span className="text-xs text-muted-foreground">Avg/Day</span>
            </div>
          </div>

          <div className="mt-1 w-full rounded-2xl border border-primary/20 bg-primary/8 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="size-5 text-primary" />
                <span className="text-muted-foreground">
                  Total Contributions
                </span>
              </div>
              <span className="text-xl font-bold text-foreground">
                {stats.totalContributions.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </SlideWrapper>
  );
}
