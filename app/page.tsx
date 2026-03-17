"use client";

import { useRouter } from "next/navigation";
import { InputView } from "@/components/views";

export default function Home() {
  const router = useRouter();

  const handleSubmit = (submittedUsername: string) => {
    router.push(`/wrapped/${encodeURIComponent(submittedUsername)}`);
  };

  return <InputView onSubmit={handleSubmit} />;
}
