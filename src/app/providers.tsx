"use client";

import { HeroUIProvider } from "@heroui/react";
import { EnneagramThemeProvider } from "@/contexts/EnneagramThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <EnneagramThemeProvider>{children}</EnneagramThemeProvider>
    </HeroUIProvider>
  );
}
