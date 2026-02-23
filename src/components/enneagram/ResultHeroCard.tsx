"use client";

import { EMOJI_BY_TYPE } from "@/constants/enneagram";

interface ResultHeroCardProps {
  primaryType: PrimaryType;
  wingData?: WingAnalysisItem | null;
}

export default function ResultHeroCard({
  primaryType,
  wingData,
}: ResultHeroCardProps) {
  const emoji = EMOJI_BY_TYPE[primaryType.type_num] ?? "✨";
  const displaySummary = wingData ? wingData.summary : primaryType.summary;

  return (
    <div
      className="group relative w-full rounded-2xl p-[2px] bg-gradient-to-br from-theme-primary/50 via-theme-primary/20 to-theme-secondary/40 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-theme-primary/15"
      style={{ boxShadow: "0 8px 32px -8px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.06) inset" }}
    >
      <div className="relative rounded-[14px] bg-theme-surface/90 backdrop-blur-md p-6 sm:p-8 text-center min-h-0">
      <div className="text-5xl sm:text-6xl mb-4" aria-hidden>
        {emoji}
      </div>
      <h1 className="text-xl sm:text-2xl font-bold text-theme-text mb-1">
        {wingData
          ? `${primaryType.type_num}w${wingData.wing_type}유형. ${wingData.subtype_title}`
          : `${primaryType.type_num}유형. ${primaryType.title}`}
      </h1>
      <p className="text-theme-text-muted font-medium text-sm sm:text-base mb-4">
        {primaryType.tagline}
      </p>
      <p className="text-theme-text text-base sm:text-lg leading-relaxed">
        {displaySummary}
      </p>
      </div>
    </div>
  );
}
