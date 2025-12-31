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
      <Card className="bg-card/90 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden">
        <CardContent className="pt-10 pb-8 flex flex-col items-center gap-6">
          {/* Icon */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full blur-lg opacity-60" />
            <div className="relative size-20 bg-card rounded-full flex items-center justify-center ring-4 ring-yellow-500/30">
              <Lightbulb className="size-10 text-yellow-500" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-muted-foreground uppercase tracking-wider text-sm">
              Personalized Tip 💡
            </p>
            <h2 className="text-2xl font-bold text-foreground">
              A word of advice
            </h2>
          </div>

          {/* Advice Content */}
          <div className="w-full p-6 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            {isLoading ? (
              <div className="flex items-center justify-center gap-3 py-4">
                <Loader2 className="size-5 animate-spin text-yellow-500" />
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
                Keep doing what you're doing – you're on the right track! 🚀
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </SlideWrapper>
  );
}
