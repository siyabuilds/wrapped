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
      <Card className="bg-card/90 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden">
        <CardContent className="pt-10 pb-8 flex flex-col items-center gap-6">
          {/* Icon */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-lg opacity-60" />
            <div className="relative size-20 bg-card rounded-full flex items-center justify-center ring-4 ring-cyan-500/30">
              <BookOpen className="size-10 text-cyan-500" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-muted-foreground uppercase tracking-wider text-sm">
              Your {year} Story 📖
            </p>
            <h2 className="text-2xl font-bold text-foreground">
              One sentence to sum it up
            </h2>
          </div>

          {/* Story Content */}
          <div className="w-full p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
            {isLoading ? (
              <div className="flex items-center justify-center gap-3 py-4">
                <Loader2 className="size-5 animate-spin text-cyan-500" />
                <span className="text-muted-foreground">
                  Crafting your story...
                </span>
              </div>
            ) : devStory ? (
              <div className="relative">
                <Quote className="size-8 text-cyan-500/30 absolute -top-2 -left-1" />
                <p className="text-foreground text-center text-xl leading-relaxed italic pl-6">
                  {devStory}
                </p>
                <Quote className="size-8 text-cyan-500/30 absolute -bottom-2 -right-1 rotate-180" />
              </div>
            ) : (
              <p className="text-muted-foreground text-center">
                In {year}, you wrote code, broke things, fixed them, and called
                it a day. A classic dev journey! 💻
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </SlideWrapper>
  );
}
