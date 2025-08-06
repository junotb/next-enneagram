"use client";

interface EnneagramWingCardProps {
  wing: EnneagramWing;
}

export default function EnneagramWingCard({ wing }: EnneagramWingCardProps) {
  return (
    <div className="md:border md:border-gray-400 w-full md:max-w-xs p-4 space-y-4 md:rounded-lg md:shadow-xl">
      <div className="flex flex-col">
        <h1 className="text-lg font-bold">{wing.type}번 날개. {wing.title.korean}</h1>
        <h3 className="font-semibold text-gray-600">{wing.title.english}</h3>
      </div>
      <p className="text-sm">{wing.description}</p>
    </div>
  );
}