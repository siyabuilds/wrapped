import { ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorViewProps {
  error: string;
  onBack: () => void;
}

export function ErrorView({ error, onBack }: ErrorViewProps) {
  return (
    <div className="animated-bg min-h-screen flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 max-w-md text-center">
        <div className="size-16 rounded-full bg-destructive/20 flex items-center justify-center">
          <AlertCircle className="size-8 text-destructive" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-white/60">{error}</p>
        </div>
        <Button onClick={onBack} variant="outline" className="gap-2">
          <ArrowLeft className="size-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
