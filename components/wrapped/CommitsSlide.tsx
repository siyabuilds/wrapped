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
      <Card className="bg-card/90 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden">
        <CardContent className="pt-10 pb-8 flex flex-col items-center gap-6">
          {/* Icon */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-chart-4 to-chart-5 rounded-full blur-lg opacity-60" />
            <div className="relative size-20 bg-card rounded-full flex items-center justify-center ring-4 ring-chart-4/30">
              <GitCommit className="size-10 text-chart-4" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-muted-foreground uppercase tracking-wider text-sm">
              Total Commits
            </p>
            <h2 className="text-6xl font-bold text-foreground gradient-text">
              {stats.totalCommits.toLocaleString()}
            </h2>
          </div>

          {/* Stats Grid */}
          <div className="w-full grid grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col items-center p-4 rounded-xl bg-muted/30 border border-border/30">
              <Flame className="size-5 text-orange-500 mb-2" />
              <span className="text-2xl font-bold text-foreground">
                {stats.activeDays}
              </span>
              <span className="text-xs text-muted-foreground">Active Days</span>
            </div>

            <div className="flex flex-col items-center p-4 rounded-xl bg-muted/30 border border-border/30">
              <TrendingUp className="size-5 text-chart-1 mb-2" />
              <span className="text-2xl font-bold text-foreground">
                {commitsPerDay}
              </span>
              <span className="text-xs text-muted-foreground">Avg/Day</span>
            </div>
          </div>

          {/* Total Contributions */}
          <div className="w-full p-4 rounded-xl bg-primary/10 border border-primary/20 mt-2">
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
