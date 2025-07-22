import { ChangeEvent } from "react";

interface AnswerCardProps {
  name: string;
  value: number;
  onChange: (answer: number) => void;
}

export default function AnswerCard({ name, value, onChange }: AnswerCardProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const answer = parseInt(event.target.value, 10);
    onChange(answer);
  };

  return (
    <div className="flex justify-center gap-2">
      <input type="radio" name={name} value={value} onChange={handleChange} />
      <span className="font-semibold text-gray-600">{value}</span>
    </div>
  );
}