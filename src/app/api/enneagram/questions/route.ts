import { NextResponse } from "next/server";
import AssessmentQuestions from "@/data/assessment-144q.json";

/** assessment-144q 포맷을 프론트엔드 Question 포맷으로 변환 */
function toQuestionFormat(items: AssessmentQuestion[]): Question[] {
  return items.map((q) => ({
    seq: q.id,
    type: q.type_num,
    question: q.content,
  }));
}

export async function GET() {
  const questions = toQuestionFormat(AssessmentQuestions as AssessmentQuestion[]);
  return NextResponse.json(questions);
}