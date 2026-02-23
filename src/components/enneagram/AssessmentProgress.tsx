"use client";

import { PROGRESS_MICRO_COPIES } from "@/constants/assessment";

interface AssessmentProgressProps {
  currentPage: number;
  totalPages: number;
}

function getMicroCopy(percent: number): string {
  if (percent >= 100) return PROGRESS_MICRO_COPIES["100"];
  if (percent >= 81) return PROGRESS_MICRO_COPIES["81-99"];
  if (percent >= 61) return PROGRESS_MICRO_COPIES["61-80"];
  if (percent >= 41) return PROGRESS_MICRO_COPIES["41-60"];
  if (percent >= 21) return PROGRESS_MICRO_COPIES["21-40"];
  return PROGRESS_MICRO_COPIES["0-20"];
}

export default function AssessmentProgress({
  currentPage,
  totalPages,
}: AssessmentProgressProps) {
  const progressValue =
    totalPages > 0 ? ((currentPage + 1) / totalPages) * 100 : 0;
  const microCopy = getMicroCopy(progressValue);

  return (
    <div className="space-y-2" role="progressbar" aria-valuenow={currentPage + 1} aria-valuemin={1} aria-valuemax={totalPages} aria-label="질문 진행률">
      <div className="flex justify-between items-center text-sm">
        <span className="text-theme-text-muted font-medium">{microCopy}</span>
        <span className="text-theme-text-muted tabular-nums">
          {currentPage + 1} / {totalPages}
        </span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: totalPages }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i <= currentPage ? "bg-theme-primary" : "bg-theme-surface"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
