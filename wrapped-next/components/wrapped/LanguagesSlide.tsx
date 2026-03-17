import { Code2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { WrappedStats } from "@/types/wrapped";
import { SlideWrapper } from "./SlideWrapper";

interface LanguagesSlideProps {
  stats: WrappedStats;
}

// Color palette for language bars
const LANGUAGE_COLORS = [
  "from-chart-1 to-chart-2",
  "from-chart-2 to-chart-3",
  "from-chart-3 to-chart-4",
  "from-chart-4 to-chart-5",
  "from-chart-5 to-primary",
];

export function LanguagesSlide({ stats }: LanguagesSlideProps) {
  return (
    <SlideWrapper>
      <Card className="h-full border-border/80 bg-card/95 shadow-[0_16px_60px_-35px_rgba(25,40,76,0.45)]">
        <CardContent className="flex h-full flex-col items-center gap-6 pt-8 pb-8 sm:pt-10">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-chart-2 to-chart-3 blur-md opacity-60" />
            <div className="relative flex size-20 items-center justify-center rounded-full bg-card ring-4 ring-chart-3/25">
              <Code2 className="size-10 text-chart-3" />
            </div>
          </div>

          <div className="space-y-2 text-center">
            <p className="text-sm uppercase tracking-[0.17em] text-muted-foreground">
              Top Language
            </p>
            <h2 className="gradient-text text-4xl font-bold sm:text-5xl">
              {stats.topLanguage}
            </h2>
          </div>

          {stats.languagesBreakdown.length > 0 && (
            <div className="mt-1 w-full space-y-3">
              <p className="mb-2 text-center text-sm text-muted-foreground">
                Languages you used this year
              </p>
              {stats.languagesBreakdown.map((lang, index) => (
                <div key={lang.name} className="space-y-1.5 rounded-xl border border-border/70 bg-background/70 p-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground font-medium">
                      {lang.name}
                    </span>
                    <span className="text-muted-foreground">
                      {lang.count} repos · {lang.percentage}%
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-muted/70">
                    <div
                      className={`h-full bg-gradient-to-r ${
                        LANGUAGE_COLORS[index % LANGUAGE_COLORS.length]
                      } rounded-full transition-all duration-1000`}
                      style={{ width: `${lang.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </SlideWrapper>
  );
}
