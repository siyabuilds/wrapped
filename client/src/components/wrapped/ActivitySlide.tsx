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
      <Card className="bg-card/90 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden">
        <CardContent className="pt-10 pb-8 flex flex-col items-center gap-6">
          {/* Icon */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-chart-2 rounded-full blur-lg opacity-60" />
            <div className="relative size-20 bg-card rounded-full flex items-center justify-center ring-4 ring-primary/30">
              <Calendar className="size-10 text-primary" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-muted-foreground uppercase tracking-wider text-sm">
              Most Active Day
            </p>
            <h2 className="text-5xl font-bold text-foreground gradient-text">
              {stats.mostActiveDay}
            </h2>
          </div>

          {/* Personality Badge */}
          <div className="px-4 py-2 rounded-full bg-muted/30 border border-border/30">
            <span className="text-sm text-muted-foreground">
              You're a{" "}
              <span className="text-foreground font-semibold">
                {isWeekendWarrior ? "Weekend Warrior 🎮" : "Weekday Grinder 💼"}
              </span>
            </span>
          </div>

          {/* Activity Distribution */}
          <div className="w-full mt-4 space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Activity Distribution
            </p>

            {/* Visual Bar */}
            <div className="h-6 bg-muted/30 rounded-full overflow-hidden flex">
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

            {/* Legend */}
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <Briefcase className="size-4 text-chart-2" />
                <span className="text-muted-foreground">Weekdays</span>
                <span className="text-foreground font-semibold">
                  {stats.weekDayActivity.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
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
