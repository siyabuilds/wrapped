import { ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorViewProps {
  error: string;
  onBack: () => void;
}

export function ErrorView({ error, onBack }: ErrorViewProps) {
  return (
    <div className="animated-bg min-h-screen flex items-center justify-center px-4 py-10">
      <div className="hero-shell w-full max-w-xl p-8 sm:p-10 flex flex-col items-center gap-6 text-center">
        <div className="size-16 rounded-2xl bg-destructive/18 border border-destructive/35 flex items-center justify-center">
          <AlertCircle className="size-8 text-destructive" />
        </div>
        <div>
          <p className="soft-tag mx-auto mb-3">Request Failed</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
        <Button onClick={onBack} variant="outline" className="gap-2">
          <ArrowLeft className="size-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
