interface EnneagramCardProps {
  enneagram: Enneagram;
}

export default function EnneagramCard({ enneagram }: EnneagramCardProps) {
  return (
    <div className="border border-gray-400 w-full min-w-xs max-w-lg p-8 space-y-4 rounded-xl shadow-xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{enneagram.type}. {enneagram.title.korean}</h1>
        <h3 className="text-xl font-semibold text-gray-600">{enneagram.title.english}</h3>
      </div>
      <p className="text-lg mb-4">{enneagram.description}</p>
      <p className="text-sm text-gray-500">{enneagram.core_fear}</p>
      <p className="text-sm text-gray-500">{enneagram.core_desire}</p>
    </div>
  );
}