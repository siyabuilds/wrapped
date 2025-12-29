import { useState } from "react";
import { Headphones } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function App() {
  const [username, setUsername] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submittedUsername, setSubmittedUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setSubmittedUsername(username.trim());
      setDialogOpen(true);
    }
  };

  return (
    <div className="animated-bg min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-center">
        <span className="text-white">GitHub </span>
        <span className="gradient-text">Wrapped</span>
      </h1>

      <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-md">
        <Input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 h-14 text-lg bg-white/10 border-white/30 text-white placeholder:text-white/60"
        />
        <Button type="submit" size="lg" className="gap-2 h-14 text-lg px-6">
          <Headphones className="size-6" />
          Get Wrapped
        </Button>
      </form>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Success!</AlertDialogTitle>
            <AlertDialogDescription>
              {submittedUsername} received
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setDialogOpen(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default App;
