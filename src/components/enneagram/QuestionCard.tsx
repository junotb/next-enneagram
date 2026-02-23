"use client";

import AnswerList from "@/components/enneagram/AnswerList";
import { NeonGradientCard } from "@/components/ui/NeonGradientCard";
import { useEnneagram } from "@/contexts/EnneagramContext";
import { useEnneagramTheme } from "@/contexts/EnneagramThemeContext";

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const { seq, type } = question;
  const { answers, setAnswers } = useEnneagram();
  const { colors } = useEnneagramTheme();
  const selectedAnswer = answers.find((a) => a.seq === seq);
  const value = selectedAnswer ? String(selectedAnswer.answer) : "";

  const handleChange = (seq: number, answer: number) => {
    setAnswers((prevAnswers: Answer[]) => {
      const existingAnswerIndex = prevAnswers.findIndex((answer: Answer) => answer.seq === seq);
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { seq, type, answer };
        return updatedAnswers;
      } else {
        return [...prevAnswers, { seq, type, answer }];
      }
    });
  };

  return (
    <NeonGradientCard
      className="w-full !h-auto"
      borderSize={2}
      borderRadius={20}
      noPadding
      noGlow
      innerClassName="bg-theme-surface"
      neonColors={{
        firstColor: colors.primary,
        secondColor: colors.secondary,
      }}
    >
      <div className="gap-4 p-5 sm:p-6 flex flex-col">
        <p className="text-theme-text text-base sm:text-lg leading-relaxed">
          {question.question}
        </p>
        <AnswerList seq={seq} value={value} onChange={handleChange} />
      </div>
    </NeonGradientCard>
  );
}
