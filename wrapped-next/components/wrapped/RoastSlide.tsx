import { Flame, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SlideWrapper } from "./SlideWrapper";

interface RoastSlideProps {
  roast: string | null;
  isLoading: boolean;
}

export function RoastSlide({ roast, isLoading }: RoastSlideProps) {
  return (
    <SlideWrapper>
      <Card className="h-full border-border/80 bg-card/95 shadow-[0_16px_60px_-35px_rgba(25,40,76,0.45)]">
        <CardContent className="flex h-full flex-col items-center gap-6 pt-10 pb-8">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-chart-1 to-primary blur-md opacity-60" />
            <div className="relative flex size-20 items-center justify-center rounded-full bg-card ring-4 ring-chart-1/25">
              <Flame className="size-10 text-orange-500" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm uppercase tracking-[0.17em] text-muted-foreground">
              AI Roast
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Time to get roasted!
            </h2>
          </div>

          <div className="w-full rounded-2xl border border-chart-1/30 bg-chart-1/10 p-5">
            {isLoading ? (
              <div className="flex items-center justify-center gap-3 py-4">
                <Loader2 className="size-5 animate-spin text-orange-500" />
                <span className="text-muted-foreground">
                  Generating your roast...
                </span>
              </div>
            ) : roast ? (
              <p className="text-foreground text-center text-lg leading-relaxed">
                {roast}
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                Could not generate a roast this time.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </SlideWrapper>
  );
}
