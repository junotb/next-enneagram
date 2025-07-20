import Score from "@/components/enneagram/Score";

interface ScoreProps {
  seq: number;
  onChange: (seq: number, score: number) => void;
}

export default function Scores({ seq, onChange }: ScoreProps) {
  const scores = [1, 2, 3, 4, 5];

  const handleChange = (score: number) => {
    onChange(seq, score);
  };
  
  return (
    <div className="flex justify-center items-center gap-4 px-2">
      {scores.map((score) => (
        <Score
          key={score}
          name={`score-${seq}`}
          value={score}
          onChange={handleChange}
        />
      ))}
    </div>
  );
}
