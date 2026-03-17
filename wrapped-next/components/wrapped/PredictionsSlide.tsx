import { Sparkles, Loader2, Rocket, GitBranch, Battery } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Predictions } from "@/types/wrapped";
import { SlideWrapper } from "./SlideWrapper";

interface PredictionsSlideProps {
  predictions: Predictions | null;
  isLoading: boolean;
  nextYear: number;
}

export function PredictionsSlide({
  predictions,
  isLoading,
  nextYear,
}: PredictionsSlideProps) {
  return (
    <SlideWrapper>
      <Card className="h-full border-border/80 bg-card/95 shadow-[0_16px_60px_-35px_rgba(25,40,76,0.45)]">
        <CardContent className="flex h-full flex-col items-center gap-6 pt-10 pb-8">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-chart-4 to-chart-3 blur-md opacity-60" />
            <div className="relative flex size-20 items-center justify-center rounded-full bg-card ring-4 ring-chart-4/25">
              <Sparkles className="size-10 text-chart-4" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm uppercase tracking-[0.17em] text-muted-foreground">
              {nextYear} Predictions
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              What's in store for you?
            </h2>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center gap-3 py-8">
              <Loader2 className="size-5 animate-spin text-chart-4" />
              <span className="text-muted-foreground">
                Consulting the crystal ball...
              </span>
            </div>
          ) : predictions ? (
            <div className="w-full space-y-4">
              <div className="rounded-xl border border-chart-4/25 bg-chart-4/10 p-4">
                <div className="flex items-start gap-3">
                  <Rocket className="size-5 shrink-0 mt-0.5 text-chart-4" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Language Journey
                    </p>
                    <p className="text-foreground">
                      {predictions.languagePrediction}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-chart-3/25 bg-chart-3/10 p-4">
                <div className="flex items-start gap-3">
                  <GitBranch className="size-5 shrink-0 mt-0.5 text-chart-3" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Open Source
                    </p>
                    <p className="text-foreground">
                      {predictions.ossPrediction}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-primary/25 bg-primary/8 p-4">
                <div className="flex items-start gap-3">
                  <Battery className="size-5 shrink-0 mt-0.5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Energy Check
                    </p>
                    <p className="text-foreground">{predictions.burnoutRisk}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              Predictions unavailable. The future is still wide open.
            </p>
          )}
        </CardContent>
      </Card>
    </SlideWrapper>
  );
}
