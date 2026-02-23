"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import BuyMeACoffeeWidget from "@/components/BuyMeACoffeeWidget";
import { useEnneagramTheme } from "@/contexts/EnneagramThemeContext";
import { AnimatedGradientText } from "@/components/ui/AnimatedGradientText";
import { MagicCard } from "@/components/ui/MagicCard";
import { NeonGradientCard } from "@/components/ui/NeonGradientCard";

const RIPPLE_DURATION_MS = 500;

export default function Home() {
  const { colors, animateToMonochrome } = useEnneagramTheme();
  const router = useRouter();
  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      idRef.current += 1;
      setRipple({ x, y, id: idRef.current });
      animateToMonochrome(() => router.push("/enneagram"));
    },
    [router, animateToMonochrome]
  );

  return (
    <div className="font-sans flex flex-col w-full min-h-screen bg-theme-background transition-colors duration-500">
      <main className="relative flex flex-col flex-grow items-center justify-center py-12 px-4 w-full min-h-screen overflow-y-auto">
        <div className="flex flex-col items-center w-full max-w-lg space-y-8">
          {/* 호기심 자극 문구 - Animated Gradient Text (테마 컬러 적용) */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-medium text-theme-text-muted">
              당신의 잠재된 성향은?
            </h1>
            <p className="text-4xl sm:text-5xl font-bold">
              <AnimatedGradientText
                speed={1.2}
                colorFrom="var(--theme-primary)"
                colorTo="var(--theme-secondary)"
                className="font-extrabold"
              >
                에니어그램
              </AnimatedGradientText>
            </p>
          </div>

          {/* MagicCard: 클릭 시 포인터 중심 Ripple → 시작 */}
          <div
            ref={containerRef}
            className="w-full aspect-[4/3] max-w-sm cursor-pointer relative overflow-hidden rounded-[26px]"
            onClick={handleClick}
          >
            <AnimatePresence>
              {ripple && (
                <motion.div
                  key={ripple.id}
                  className="absolute pointer-events-none rounded-full z-20"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: 4,
                    height: 4,
                    x: "-50%",
                    y: "-50%",
                    background: `radial-gradient(circle, ${colors.primary}66 0%, ${colors.primary}33 40%, transparent 70%)`,
                  }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: 120,
                    opacity: 0,
                    transition: {
                      duration: RIPPLE_DURATION_MS / 1000,
                      ease: "easeOut",
                    },
                  }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
            <NeonGradientCard
              className="h-full"
              borderSize={2}
              borderRadius={24}
              noPadding
              neonColors={{
                firstColor: "var(--theme-primary)",
                secondColor: "var(--theme-secondary)",
              }}
            >
              <MagicCard
                className="h-full rounded-[22px]"
                gradientSize={280}
                gradientFrom="var(--theme-primary)"
                gradientTo="var(--theme-secondary)"
                gradientColor="var(--theme-primary)"
                gradientOpacity={0.55}
              >
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                  <div className="mb-4 text-6xl text-theme-text drop-shadow-sm">✦</div>
                  <h2 className="text-xl font-bold text-theme-text mb-2">
                    144문항 프로페셔널 테스트
                  </h2>
                  <p className="text-sm text-theme-text-muted leading-relaxed">
                    아홉 가지 성격 유형의 깊은 연결을 발견하고
                    <br />
                    나만의 에니어그램 지도를 그려보세요
                  </p>
                  <p className="mt-4 text-xs text-theme-text-muted opacity-80">
                    클릭하면 시작됩니다
                  </p>
                </div>
              </MagicCard>
            </NeonGradientCard>
          </div>

          {/* 짧은 설명 */}
          <p className="text-center text-sm text-theme-text-muted max-w-xs">
            약 15분이면 당신의 숨겨진 성향과 성장 방향을 발견할 수 있습니다
          </p>
        </div>
        <BuyMeACoffeeWidget />
      </main>
    </div>
  );
}