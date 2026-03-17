import { Calendar, Coffee, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { WrappedStats } from "@/types/wrapped";
import { SlideWrapper } from "./SlideWrapper";

interface ActivitySlideProps {
  stats: WrappedStats;
}

export function ActivitySlide({ stats }: ActivitySlideProps) {
  const totalActivity = stats.weekDayActivity + stats.weekendDayActivity;
  const weekdayPercent =
    totalActivity > 0
      ? Math.round((stats.weekDayActivity / totalActivity) * 100)
      : 50;
  const weekendPercent = 100 - weekdayPercent;

  const isWeekendWarrior = stats.weekendDayActivity > stats.weekDayActivity;

  return (
    <SlideWrapper>
      <Card className="h-full border-border/80 bg-card/95 shadow-[0_16px_60px_-35px_rgba(25,40,76,0.45)]">
        <CardContent className="flex h-full flex-col items-center gap-6 pt-8 pb-8 sm:pt-10">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary to-chart-2 blur-md opacity-60" />
            <div className="relative flex size-20 items-center justify-center rounded-full bg-card ring-4 ring-primary/25">
              <Calendar className="size-10 text-primary" />
            </div>
          </div>

          <div className="space-y-2 text-center">
            <p className="text-sm uppercase tracking-[0.17em] text-muted-foreground">
              Most Active Day
            </p>
            <h2 className="gradient-text text-4xl font-bold sm:text-5xl">
              {stats.mostActiveDay}
            </h2>
          </div>

          <div className="rounded-full border border-border/75 bg-background/85 px-4 py-2">
            <span className="text-sm text-muted-foreground">
              Style:
              <span className="text-foreground font-semibold">
                {isWeekendWarrior ? " Weekend-focused builder" : " Weekday grinder"}
              </span>
            </span>
          </div>

          <div className="mt-1 w-full space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Activity Distribution
            </p>

            <div className="flex h-6 overflow-hidden rounded-full bg-muted/70">
              <div
                className="h-full bg-gradient-to-r from-chart-2 to-chart-3 flex items-center justify-center"
                style={{ width: `${weekdayPercent}%` }}
              >
                {weekdayPercent > 20 && (
                  <span className="text-xs font-medium text-white">
                    {weekdayPercent}%
                  </span>
                )}
              </div>
              <div
                className="h-full bg-gradient-to-r from-chart-4 to-chart-5 flex items-center justify-center"
                style={{ width: `${weekendPercent}%` }}
              >
                {weekendPercent > 20 && (
                  <span className="text-xs font-medium text-white">
                    {weekendPercent}%
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              <div className="glass-panel flex items-center gap-2 p-3">
                <Briefcase className="size-4 text-chart-2" />
                <span className="text-muted-foreground">Weekdays</span>
                <span className="text-foreground font-semibold">
                  {stats.weekDayActivity.toLocaleString()}
                </span>
              </div>
              <div className="glass-panel flex items-center gap-2 p-3">
                <Coffee className="size-4 text-chart-4" />
                <span className="text-muted-foreground">Weekends</span>
                <span className="text-foreground font-semibold">
                  {stats.weekendDayActivity.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </SlideWrapper>
  );
}
