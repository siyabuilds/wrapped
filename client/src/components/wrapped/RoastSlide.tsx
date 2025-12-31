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
      <Card className="bg-card/90 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden">
        <CardContent className="pt-10 pb-8 flex flex-col items-center gap-6">
          {/* Icon */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-lg opacity-60" />
            <div className="relative size-20 bg-card rounded-full flex items-center justify-center ring-4 ring-orange-500/30">
              <Flame className="size-10 text-orange-500" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-muted-foreground uppercase tracking-wider text-sm">
              AI Roast 🔥
            </p>
            <h2 className="text-2xl font-bold text-foreground">
              Time to get roasted!
            </h2>
          </div>

          {/* Roast Content */}
          <div className="w-full p-5 rounded-xl bg-orange-500/10 border border-orange-500/20">
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
                Couldn't generate a roast. You must be too perfect! 😎
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </SlideWrapper>
  );
}
