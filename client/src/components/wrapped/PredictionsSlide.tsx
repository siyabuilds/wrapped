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
      <Card className="bg-card/90 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden">
        <CardContent className="pt-10 pb-8 flex flex-col items-center gap-6">
          {/* Icon */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full blur-lg opacity-60" />
            <div className="relative size-20 bg-card rounded-full flex items-center justify-center ring-4 ring-violet-500/30">
              <Sparkles className="size-10 text-violet-500" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-muted-foreground uppercase tracking-wider text-sm">
              {nextYear} Predictions ✨
            </p>
            <h2 className="text-2xl font-bold text-foreground">
              What's in store for you?
            </h2>
          </div>

          {/* Predictions Content */}
          {isLoading ? (
            <div className="flex items-center justify-center gap-3 py-8">
              <Loader2 className="size-5 animate-spin text-violet-500" />
              <span className="text-muted-foreground">
                Consulting the crystal ball...
              </span>
            </div>
          ) : predictions ? (
            <div className="w-full space-y-4">
              {/* Language Prediction */}
              <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
                <div className="flex items-start gap-3">
                  <Rocket className="size-5 text-violet-500 shrink-0 mt-0.5" />
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

              {/* OSS Prediction */}
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-start gap-3">
                  <GitBranch className="size-5 text-purple-500 shrink-0 mt-0.5" />
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

              {/* Burnout Risk */}
              <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
                <div className="flex items-start gap-3">
                  <Battery className="size-5 text-pink-500 shrink-0 mt-0.5" />
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
              Predictions unavailable. The future is full of possibilities! 🌟
            </p>
          )}
        </CardContent>
      </Card>
    </SlideWrapper>
  );
}
