import { BookOpen, Loader2, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SlideWrapper } from "./SlideWrapper";

interface DevStorySlideProps {
  devStory: string | null;
  isLoading: boolean;
  year: number;
}

export function DevStorySlide({
  devStory,
  isLoading,
  year,
}: DevStorySlideProps) {
  return (
    <SlideWrapper>
      <Card className="h-full border-border/80 bg-card/95 shadow-[0_16px_60px_-35px_rgba(25,40,76,0.45)]">
        <CardContent className="flex h-full flex-col items-center gap-6 pt-10 pb-8">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-chart-3 to-chart-4 blur-md opacity-60" />
            <div className="relative flex size-20 items-center justify-center rounded-full bg-card ring-4 ring-chart-3/25">
              <BookOpen className="size-10 text-chart-3" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm uppercase tracking-[0.17em] text-muted-foreground">
              Your {year} Story
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              One sentence to sum it up
            </h2>
          </div>

          <div className="w-full rounded-2xl border border-chart-3/25 bg-gradient-to-br from-chart-3/10 to-chart-4/10 p-6">
            {isLoading ? (
              <div className="flex items-center justify-center gap-3 py-4">
                <Loader2 className="size-5 animate-spin text-chart-3" />
                <span className="text-muted-foreground">
                  Crafting your story...
                </span>
              </div>
            ) : devStory ? (
              <div className="relative">
                <Quote className="absolute -top-2 -left-1 size-8 text-chart-3/30" />
                <p className="text-foreground text-center text-xl leading-relaxed italic pl-6">
                  {devStory}
                </p>
                <Quote className="absolute -bottom-2 -right-1 size-8 rotate-180 text-chart-3/30" />
              </div>
            ) : (
              <p className="text-muted-foreground text-center">
                In {year}, your work moved forward through iteration and consistency.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </SlideWrapper>
  );
}
