import { Lightbulb, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SlideWrapper } from "./SlideWrapper";

interface AdviceSlideProps {
  advice: string | null;
  isLoading: boolean;
}

export function AdviceSlide({ advice, isLoading }: AdviceSlideProps) {
  return (
    <SlideWrapper>
      <Card className="h-full border-border/80 bg-card/95 shadow-[0_16px_60px_-35px_rgba(25,40,76,0.45)]">
        <CardContent className="flex h-full flex-col items-center gap-6 pt-10 pb-8">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-chart-2 to-accent blur-md opacity-60" />
            <div className="relative flex size-20 items-center justify-center rounded-full bg-card ring-4 ring-chart-2/25">
              <Lightbulb className="size-10 text-chart-2" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm uppercase tracking-[0.17em] text-muted-foreground">
              Personalized Tip
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              A word of advice
            </h2>
          </div>

          <div className="w-full rounded-2xl border border-chart-2/25 bg-chart-2/10 p-6">
            {isLoading ? (
              <div className="flex items-center justify-center gap-3 py-4">
                <Loader2 className="size-5 animate-spin text-chart-2" />
                <span className="text-muted-foreground">
                  Generating advice...
                </span>
              </div>
            ) : advice ? (
              <p className="text-foreground text-center text-lg leading-relaxed">
                {advice}
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                Keep shipping steadily and refining your craft.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </SlideWrapper>
  );
}
