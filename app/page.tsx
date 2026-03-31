"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { InputView } from "@/components/views";

export default function Home() {
  const router = useRouter();

  const handleSubmit = useCallback((submittedUsername: string) => {
    router.push(`/wrapped/${encodeURIComponent(submittedUsername)}`);
  }, [router]);

  return <InputView onSubmit={handleSubmit} />;
}
