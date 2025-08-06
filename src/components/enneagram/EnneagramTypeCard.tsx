"use client";

interface EnneagramTypeCardProps {
  enneagram: Enneagram;
}

export default function EnneagramTypeCard({ enneagram }: EnneagramTypeCardProps) {
  return (
    <div className="md:border-2 md:border-gray-400 w-full min-w-xs max-w-lg p-4 md:p-8 md:rounded-lg md:shadow-xl">
      <div className="flex items-end gap-2 p-2">
        <h1 className="text-lg md:text-xl font-bold">{enneagram.type}. {enneagram.title.korean}</h1>
        <h3 className="md:text-lg font-semibold text-gray-600">{enneagram.title.english}</h3>
      </div>
      <div className="py-2">
        <p>{enneagram.description}</p>
      </div>
      <div className="border-t md:border-0 border-gray-400 p-2 w-full rounded-xl">
        <h5 className="font-semibold">당신의 두려움</h5>
        <p className="text-sm text-gray-500">{enneagram.core_fear}</p>
      </div>
      <div className="border-t md:border-0 border-gray-400 p-2 w-full rounded-xl">
        <h5 className="font-semibold">당신의 욕망</h5>
        <p className="text-sm text-gray-500">{enneagram.core_desire}</p>
      </div>
    </div>
  );
}