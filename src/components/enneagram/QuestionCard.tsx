import AnswerList from "@/components/enneagram/AnswerList";
import { useEnneagram } from "@/contexts/EnneagramContext";

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const { seq, type } = question;
  const { setAnswers } = useEnneagram();

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
    <div className="flex flex-col gap-4 border border-gray-400 p-4 rounded shadow-xl">
      {question.question}
      <AnswerList seq={seq} onChange={handleChange} />
    </div>
  );
}
