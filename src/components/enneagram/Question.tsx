import Scores from "@/components/enneagram/Scores";
import { useEnneagram } from "@/contexts/EnneagramContext";

interface QuestionProps {
  seq: number;
  type: number;
  question: Question;
}

export function Question({ seq, type, question }: QuestionProps) {
  const { setAnswers } = useEnneagram();

  const handleChange = (seq: number, score: number) => {
  };

  return (
    <div className="flex flex-col gap-4 p-4 shadow-xl rounded-xl">
      {question.question}
      <Scores seq={seq} onChange={handleChange} />
    </div>
  );
}
