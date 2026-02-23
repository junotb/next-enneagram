"use client";

import { use, useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { useEnneagram } from "@/contexts/EnneagramContext";
import { useEnneagramTheme } from "@/contexts/EnneagramThemeContext";
import BuyMeACoffeeWidget from "@/components/BuyMeACoffeeWidget";
import ResultHeroCard from "@/components/enneagram/ResultHeroCard";
import ResultDetailCards from "@/components/enneagram/ResultDetailCards";
import EnneagramScoreChart from "@/components/enneagram/EnneagramScoreChart";
import ResultCTASection from "@/components/enneagram/ResultCTASection";
import {
  SCORES_STORAGE_KEY,
  WING_STORAGE_KEY,
} from "@/constants/storage-keys";

interface PageProps {
  params: Promise<{ type: string }>;
}

export default function Page({ params }: PageProps) {
  const { type } = use(params);
  const { primaryTypes, wingAnalysis } = useEnneagram();
  const { setType } = useEnneagramTheme();
  const [primaryType, setPrimaryType] = useState<PrimaryType | null>(null);
  const [wingData, setWingData] = useState<WingAnalysisItem | null>(null);
  const [scores, setScores] = useState<Record<number, number> | null>(null);

  useEffect(() => {
    const parsedType = parseInt(type, 10);
    if (parsedType >= 1 && parsedType <= 9) {
      setType(parsedType);
    }
  }, [type, setType]);

  useEffect(() => {
    if (!primaryTypes || primaryTypes.length === 0) return;
    const parsedType = parseInt(type, 10);
    const primary = primaryTypes.find((p) => p.type_num === parsedType);
    if (!primary) return;
    setPrimaryType(primary);
  }, [type, primaryTypes]);

  useEffect(() => {
    if (!primaryType || wingAnalysis.length === 0) return;
    try {
      const wingStr = sessionStorage.getItem(WING_STORAGE_KEY);
      if (!wingStr) {
        setWingData(null);
        return;
      }
      const wingNum = parseInt(wingStr, 10);
      const item = wingAnalysis.find(
        (w) => w.core_type === primaryType.type_num && w.wing_type === wingNum
      );
      setWingData(item ?? null);
    } catch {
      setWingData(null);
    }
  }, [primaryType, wingAnalysis]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SCORES_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<number, number>;
        if (parsed && typeof parsed === "object") {
          setScores(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, [type]);

  const isLoading = !primaryType;
  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen w-full bg-theme-background text-theme-text transition-colors duration-500">
      {/* 콘텐츠 영역: px-6 sm:px-8 (퀴즈 페이지와 통일) */}
      <div className="flex flex-col flex-grow px-6 sm:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 max-w-2xl mx-auto w-full">
        {/* Hero Summary Card */}
        <ResultHeroCard primaryType={primaryType} wingData={wingData} />

        {/* Interactive Chart */}
        {scores && (
          <section className="space-y-3 sm:space-y-4">
            <h2 className="text-lg font-semibold text-theme-text">
              성향 분포
            </h2>
            <div className="rounded-xl border-2 border-theme-primary/20 bg-theme-surface p-4 sm:p-5">
              <EnneagramScoreChart
                scores={scores}
                primaryType={primaryType.type_num}
              />
            </div>
          </section>
        )}

        {/* 카드 - 상세 정보 */}
        <section className="space-y-3 sm:space-y-4">
          <h2 className="text-lg font-semibold text-theme-text">
            자세히 알아보기
          </h2>
          <ResultDetailCards
            primaryType={primaryType}
            wingData={wingData}
          />
        </section>
      </div>

      {/* CTA Section: 콘텐츠와 동일한 패딩·max-width */}
      <div className="px-6 sm:px-8 py-6 sm:py-8 space-y-4">
        <div className="max-w-2xl mx-auto w-full space-y-6">
          <ResultCTASection
            type={primaryType.type_num}
            title={wingData ? `${primaryType.type_num}w${wingData.wing_type} ${wingData.subtype_title}` : primaryType.title}
            primaryTypes={primaryTypes}
          />
          <div className="pt-5 sm:pt-6 border-t border-theme-primary/10">
            <BuyMeACoffeeWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
