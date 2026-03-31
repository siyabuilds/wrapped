import { ArrowLeft, CalendarX, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoActivityViewProps {
  username: string;
  year: number;
  onBack: () => void;
}

export function NoActivityView({ username, year, onBack }: NoActivityViewProps) {
  return (
    <div className="animated-bg min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl surface-card p-8 sm:p-10 text-center space-y-6">
        <div className="mx-auto size-16 rounded-2xl bg-primary/12 border border-primary/30 flex items-center justify-center">
          <CalendarX className="size-8 text-primary" />
        </div>

        <div className="space-y-3">
          <p className="soft-tag mx-auto w-fit">No Wrapped Activity</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            @{username} was quiet in {year}
          </h2>
          <p className="text-muted-foreground text-balance">
            There were no public commits or contributions to summarize for this year.
            Try a different year or check out this profile directly on GitHub.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button onClick={onBack} variant="outline" className="gap-2 w-full sm:w-auto">
            <ArrowLeft className="size-4" />
            Back Home
          </Button>
          <Button
            asChild
            className="gap-2 w-full sm:w-auto"
          >
            <a
              href={`https://github.com/${encodeURIComponent(username)}`}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink className="size-4" />
              Open GitHub Profile
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
