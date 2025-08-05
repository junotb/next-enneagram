"use client";

interface EnneagramCardProps {
  enneagram: Enneagram;
}

export default function EnneagramCard({ enneagram }: EnneagramCardProps) {
  const leftWing = enneagram.wings[0];
  const rightWing = enneagram.wings[1];

  return (
    <div className="flex justify-center items-center gap-4">
      <div className="border border-gray-400 w-full max-w-xs p-4 space-y-4 rounded-lg shadow-xl">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">{leftWing.type}번 날개. {leftWing.title.korean}</h1>
          <h3 className="font-semibold text-gray-600">{leftWing.title.english}</h3>
        </div>
        <p className="text-sm mb-4">{leftWing.description}</p>
      </div>
      <div className="border-2 border-gray-400 w-full min-w-xs max-w-lg p-8 space-y-8 rounded-lg shadow-xl">
        <div className="flex items-end gap-2">
          <h1 className="text-2xl font-bold">{enneagram.type}. {enneagram.title.korean}</h1>
          <h3 className="text-xl font-semibold text-gray-600">{enneagram.title.english}</h3>
        </div>
        <p className="text-lg">{enneagram.description}</p>
        <div className="flex gap-4">
          <div className="w-full">
            <h5 className="font-semibold">당신의 두려움</h5>
            <p className="text-sm text-gray-500">{enneagram.core_fear}</p>
          </div>
          <div className="w-full">
            <h5 className="font-semibold">당신의 욕망</h5>
            <p className="text-sm text-gray-500">{enneagram.core_desire}</p>
          </div>
        </div>
      </div>
      <div className="border border-gray-400 w-full max-w-xs p-4 space-y-2 rounded-lg shadow-xl">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">{rightWing.type}번 날개. {rightWing.title.korean}</h1>
          <h3 className="font-semibold text-gray-600">{rightWing.title.english}</h3>
        </div>
        <p className="text-sm mb-4">{rightWing.description}</p>
      </div>
    </div>
  );
}