import { ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorViewProps {
  error: string;
  onBack: () => void;
}

export function ErrorView({ error, onBack }: ErrorViewProps) {
  return (
    <div className="animated-bg subtle-grid relative min-h-screen px-4 py-6 sm:px-6 sm:py-8">
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="surface-card flex w-full max-w-lg flex-col items-center gap-6 p-7 text-center sm:p-9">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-destructive/10">
            <AlertCircle className="size-8 text-destructive" />
          </div>
          <div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
              Oops! Something went wrong
            </h2>
            <p className="text-muted-foreground">{error}</p>
          </div>
          <Button onClick={onBack} variant="outline" className="gap-2 rounded-2xl">
            <ArrowLeft className="size-4" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
