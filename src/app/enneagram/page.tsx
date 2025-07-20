"use client";

import Questions from "@/components/enneagram/Questions";
import { useEnneagram } from "@/contexts/EnneagramContext";

export default function Page() {
  const context = useEnneagram();

  return (
    <Questions questions={context?.questions} />
  );
}