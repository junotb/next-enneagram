const ENNEAGRAM_TYPES = 9;

export interface EnneagramResult {
  type: number;
  wing: number | null;
  scores: Record<number, number>;
}

function getWingCandidates(primaryType: number): [number, number] {
  const left = primaryType === 1 ? 9 : primaryType - 1;
  const right = primaryType === 9 ? 1 : primaryType + 1;
  return [left, right];
}

/**
 * 리커트 1–5 척도 역채점: is_reverse일 때 (6 - answer)로 변환
 * - 동의(5) → 1점, 비동의(1) → 5점
 */
function getEffectiveScore(answer: number, isReverse: boolean): number {
  return isReverse ? 6 - answer : answer;
}

/**
 * 채점 함수: 사용자 응답 기반으로 Enneagram 유형 및 Wing 점수 계산
 * - weight: 문항별 가중치 (category별 차등 반영)
 * - is_reverse: 역채점 문항 (동의할수록 해당 유형 점수 감소)
 * @param answers - 응답 데이터 (seq = 문항 id)
 * @param questions - assessment-144q 포맷 질문 데이터
 * @returns primary type, wing(인접 타입 중 점수 높은 쪽, 동점이면 null), scores
 */
export function findEnneagramType(
  answers: Answer[],
  questions: AssessmentQuestion[]
): EnneagramResult {
  const scores: Record<number, number> = {};

  for (let i = 1; i <= ENNEAGRAM_TYPES; i++) {
    scores[i] = 0;
  }

  const questionMap: Record<number, AssessmentQuestion> = {};
  questions.forEach((q) => {
    questionMap[q.id] = q;
  });

  answers.forEach((answer) => {
    const question = questionMap[answer.seq];
    if (!question) return;
    const effectiveScore = getEffectiveScore(answer.answer, question.is_reverse);
    const contribution = effectiveScore * (question.weight ?? 1);
    scores[question.type_num] += contribution;
  });

  const sortedTypes = Object.keys(scores)
    .map((k) => ({ type: parseInt(k), score: scores[parseInt(k)] }))
    .sort((a, b) => b.score - a.score);

  const primaryType = sortedTypes[0].type;
  const [leftWing, rightWing] = getWingCandidates(primaryType);
  const leftScore = scores[leftWing] ?? 0;
  const rightScore = scores[rightWing] ?? 0;

  let wing: number | null = null;
  if (leftScore > rightScore) wing = leftWing;
  else if (rightScore > leftScore) wing = rightWing;

  return { type: primaryType, wing, scores };
}
