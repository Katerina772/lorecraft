import QuestCard from "./QuestCard";

export default function QuestGrid({ quests }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {quests.map((q) => (
        <QuestCard key={q.id} quest={q} />
      ))}
    </div>
  );
}
