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
      <Card className="bg-card/90 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden">
        <CardContent className="pt-10 pb-8 flex flex-col items-center gap-6">
          {/* Icon */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-chart-1 to-chart-3 rounded-full blur-lg opacity-60" />
            <div className="relative size-20 bg-card rounded-full flex items-center justify-center ring-4 ring-chart-3/30">
              <Code2 className="size-10 text-chart-3" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-muted-foreground uppercase tracking-wider text-sm">
              Top Language
            </p>
            <h2 className="text-5xl font-bold text-foreground gradient-text">
              {stats.topLanguage}
            </h2>
          </div>

          {/* Language Breakdown */}
          {stats.languagesBreakdown.length > 0 && (
            <div className="w-full space-y-3 mt-4">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Languages you used this year
              </p>
              {stats.languagesBreakdown.map((lang, index) => (
                <div key={lang.name} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground font-medium">
                      {lang.name}
                    </span>
                    <span className="text-muted-foreground">
                      {lang.count} repos ({lang.percentage}%)
                    </span>
                  </div>
                  <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
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
