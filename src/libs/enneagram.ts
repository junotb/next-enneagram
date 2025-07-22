const ENNEAGRAM_TYPES = 9;

/**
 * 채점 함수: 사용자 응답 기반으로 Enneagram 유형 점수 계산
 * @param {Answer[]} answers - 응답 데이터
 * @param {Question[]} questions - 질문 데이터
 * @returns {number} 결과 Enneagram 유형 (1-9)
 */
function findEnneagramType(answers: Answer[], questions: Question[]): number {
  const scores: Record<number, number> = {};

  // 초기화
  for (let i = 1; i <= ENNEAGRAM_TYPES; i++) {
    scores[i] = 0;
  }

  // 질문 매핑 (seq → 질문)
  const questionMap: Record<number, Question> = {};
  questions.forEach(question => {
    questionMap[question.seq] = question;
  });

  // 점수 누적
  answers.forEach(answer => {
    const question = questionMap[answer.seq];
    if (!question) return;

    const type = question.type;
    const score = answer.answer;

    // 기본 유형 점수
    scores[type] += score * 1.0;
  });

  // 정렬
  const sortedTypes = Object.keys(scores)
    .map((type: string) => ({ type: parseInt(type), score: scores[parseInt(type)] }))
    .sort((a, b) => b.score - a.score);

  return sortedTypes[0].type;
}

export default findEnneagramType;