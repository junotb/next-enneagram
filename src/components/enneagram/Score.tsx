import { ChangeEvent } from "react";

interface ScoreProps {
  name: string;
  value: number;
  onChange: (score: number) => void;
}

export default function Score({ name, value, onChange }: ScoreProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const score = parseInt(event.target.value, 10);
    onChange(score);
  };

  return (
    <div className="flex justify-center gap-2">
      <input type="radio" name={name} value={value} onChange={handleChange} className="form-checkbox text-blue-600" />
      <span className="font-semibold">{value}</span>
    </div>
  );
}