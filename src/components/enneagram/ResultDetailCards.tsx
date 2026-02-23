"use client";

import { getSymbolLabel } from "@/lib/symbol-labels";

interface ResultDetailCardsProps {
  primaryType: PrimaryType;
  wingData?: WingAnalysisItem | null;
}

/** 강점: 체크 아이콘 / 약점: 성장 화살표 / 행동: 움직임 아이콘 */
const ICONS = {
  strength: (
    <svg className="w-4 h-4 flex-shrink-0 text-theme-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  weakness: (
    <svg className="w-4 h-4 flex-shrink-0 text-theme-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  ),
  behavioral: (
    <svg className="w-4 h-4 flex-shrink-0 text-theme-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </svg>
  ),
} as const;

/** 상징: 행성/탄생석/탄생화/타로/행운의 물건 아이콘 */
const SYMBOL_ICONS = {
  planet: (
    <svg className="w-5 h-5 flex-shrink-0 text-theme-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  stone: (
    <svg className="w-5 h-5 flex-shrink-0 text-theme-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3 3 9l9 12 9-12-9-6z" />
      <path d="M3 9h18" />
    </svg>
  ),
  flower: (
    <svg className="w-5 h-5 flex-shrink-0 text-theme-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      <path d="M5.64 5.64l2.83 2.83M15.53 15.53l2.83 2.83M5.64 18.36l2.83-2.83M15.53 8.47l2.83-2.83" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  tarot: (
    <svg className="w-5 h-5 flex-shrink-0 text-theme-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="16" height="18" rx="2" />
      <path d="M6 8h8M6 12h8M6 16h4" />
    </svg>
  ),
  lucky: (
    <svg className="w-5 h-5 flex-shrink-0 text-theme-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
} as const;

function SymbolInline({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label?: string;
}) {
  return (
    <span
      className="inline-flex flex-col items-center gap-1.5 shrink-0"
      title={label ? `${label}: ${value}` : undefined}
      aria-label={label ? `${label} ${value}` : undefined}
    >
      {icon}
      <span className="text-center text-sm text-theme-text font-medium">{value}</span>
    </span>
  );
}

function TraitGrid({
  items,
  iconType,
}: {
  items: string[];
  iconType: keyof typeof ICONS;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((text, i) => (
        <div key={i} className="flex items-start gap-3">
          <span className="mt-0.5">{ICONS[iconType]}</span>
          <span className="text-sm leading-relaxed">{text}</span>
        </div>
      ))}
    </div>
  );
}

function DetailCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="group relative rounded-2xl p-[2px] bg-gradient-to-br from-theme-primary/40 via-theme-primary/15 to-theme-secondary/30 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-theme-primary/10"
      style={{ boxShadow: "0 4px 24px -4px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.05) inset" }}
    >
      <div className="relative rounded-[14px] bg-theme-surface/85 backdrop-blur-md p-5 sm:p-6 min-h-0">
        <h3 className="text-base font-semibold text-theme-text mb-3">{title}</h3>
        <div className="text-theme-text-muted text-sm sm:text-base leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ResultDetailCards({
  primaryType,
  wingData,
}: ResultDetailCardsProps) {
  const { core_traits, analysis, symbolism, aesthetics, description_detail } =
    primaryType;
  const displayContent = description_detail ?? primaryType.summary;

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 상세 설명 */}
      <DetailCard title="상세 설명">
        <p className="whitespace-pre-line">{displayContent}</p>
      </DetailCard>

      {/* 핵심 특성: 욕망, 두려움, 동기 */}
      <DetailCard title="당신의 욕망">{core_traits.desire}</DetailCard>
      <DetailCard title="당신의 두려움">{core_traits.fear}</DetailCard>
      <DetailCard title="핵심 동기">{core_traits.motivation}</DetailCard>

      {/* 강점 */}
      <DetailCard title="강점">
        <TraitGrid items={analysis.strengths} iconType="strength" />
      </DetailCard>

      {/* 약점 */}
      <DetailCard title="약점">
        <TraitGrid items={analysis.weaknesses} iconType="weakness" />
      </DetailCard>

      {/* 성장 포인트 */}
      <DetailCard title="성장 포인트">{analysis.growth_tip}</DetailCard>

      {/* 상징 (symbolism) */}
      {symbolism && (
        <DetailCard title="상징">
          <div className="flex flex-wrap items-start gap-4">
            <SymbolInline icon={SYMBOL_ICONS.planet} value={getSymbolLabel(symbolism.planet_key)} label="행성" />
            <SymbolInline icon={SYMBOL_ICONS.stone} value={getSymbolLabel(symbolism.birthstone_key)} label="탄생석" />
            <SymbolInline icon={SYMBOL_ICONS.flower} value={getSymbolLabel(symbolism.birthflower_key)} label="탄생화" />
            <SymbolInline icon={SYMBOL_ICONS.tarot} value={getSymbolLabel(symbolism.tarot_key)} label="타로" />
            {symbolism.lucky_items.length > 0 && (
              <SymbolInline
                icon={SYMBOL_ICONS.lucky}
                value={symbolism.lucky_items.map(getSymbolLabel).join(", ")}
                label="행운의 물건"
              />
            )}
          </div>
        </DetailCard>
      )}

      {/* 색상 팔레트 (aesthetics) */}
      {aesthetics?.palette && aesthetics.palette.length > 0 && (
        <DetailCard title="퍼스널 컬러">
          <div className="flex flex-wrap items-center gap-4">
            {aesthetics.palette.map((hex, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-12 h-12 rounded-xl flex-shrink-0"
                  style={{ backgroundColor: hex }}
                  title={hex}
                  aria-label={`색상 ${hex}`}
                />
                <span className="text-xs text-theme-text-muted font-mono">{hex}</span>
              </div>
            ))}
          </div>
        </DetailCard>
      )}

      {/* 날개 유형 (wingData 있을 때만) */}
      {wingData && (
        <>
          <DetailCard
            title={`${wingData.wing_type}번 날개: ${wingData.subtype_title}`}
          >
            <p className="mb-4">{wingData.summary}</p>
            {wingData.analysis_details.behavioral_traits.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-theme-text mb-3">
                  행동적 특성
                </h4>
                <TraitGrid
                  items={wingData.analysis_details.behavioral_traits}
                  iconType="behavioral"
                />
              </div>
            )}
            <p className="mb-2">
              <span className="font-medium text-theme-text">사회적 스타일:</span>{" "}
              {wingData.analysis_details.social_style}
            </p>
            <p>
              <span className="font-medium text-theme-text">
                스트레스 트리거:
              </span>{" "}
              {wingData.analysis_details.stress_trigger}
            </p>
          </DetailCard>

          {wingData.analysis_details.depth_description && (
            <DetailCard title="날개 심층 설명">
              <p className="whitespace-pre-line">
                {wingData.analysis_details.depth_description}
              </p>
            </DetailCard>
          )}
        </>
      )}
    </div>
  );
}
