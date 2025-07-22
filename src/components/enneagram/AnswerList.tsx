import AnswerCard from "@/components/enneagram/AnswerCard";

interface AnswerListProps {
  seq: number;
  onChange: (seq: number, answer: number) => void;
}

export default function AnswerList({ seq, onChange }: AnswerListProps) {
  const answers = [1, 2, 3, 4, 5];

  const handleChange = (answer: number) => {
    onChange(seq, answer);
  };
  
  return (
    <div className="flex justify-center items-center gap-4 px-2">
      {answers.map((answer) => (
        <AnswerCard
          key={answer}
          name={`answer-${seq}`}
          value={answer}
          onChange={handleChange}
        />
      ))}
    </div>
  );
}
