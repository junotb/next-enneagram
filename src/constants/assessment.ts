/** 리커트 척도 옵션 */
export const LIKERT_OPTIONS: { value: number; label: string; scale: number }[] = [
  { value: 1, label: "전혀 그렇지 않다", scale: 0.6 },
  { value: 2, label: "그렇지 않다", scale: 0.75 },
  { value: 3, label: "보통이다", scale: 1 },
  { value: 4, label: "그렇다", scale: 1.25 },
  { value: 5, label: "매우 그렇다", scale: 1.5 },
];

/** 진행률 구간별 미세 문구 */
export const PROGRESS_MICRO_COPIES: Record<string, string> = {
  "0-20": "시작이 반이에요!",
  "21-40": "잘하고 있어요.",
  "41-60": "절반을 넘었어요.",
  "61-80": "조금만 더 힘내요!",
  "81-99": "거의 다 왔어요!",
  "100": "완료! 결과를 확인해보세요.",
};
