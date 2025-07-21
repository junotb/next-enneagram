"use client";

import { QuestionCard } from "@/components/enneagram/QuestionCard";

interface QuestionsListProps {
  questions: Question[];
}

export default function QuestionList({ questions }: QuestionsListProps) {
  return (
    <>
      {questions.map((question) => <QuestionCard key={question.seq} seq={question.seq} type={question.type} question={question} />)}
    </>
  );
}