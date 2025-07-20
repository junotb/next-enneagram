"use client";

import { Question } from "@/components/enneagram/Question";

interface QuestionsProps {
  questions?: Question[];
}

export default function Questions({ questions }: QuestionsProps) {
  if (!questions || questions.length === 0) {
    return <div className="flex justify-center items-center w-full h-full text-center text-gray-500">질문이 없습니다.</div>;
  }
  
  return (
    <div className="flex flex-col gap-4 p-4 w-full min-w-xs max-w-lg">
      {questions.map((question) => <Question key={question.seq} seq={question.seq} type={question.type} question={question} />)}
    </div>
  );
}