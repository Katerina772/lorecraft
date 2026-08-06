export default function QuestCard({ quest }) {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="h-48 bg-primary/20">
        {quest.cover ? (
          <img
            src={quest.cover}
            alt={quest.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-heading text-primary">
            {quest.title[0]}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-heading font-bold text-lg mb-1">{quest.title}</h3>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-yellow-600">⭐{quest.rating}</span>
          <span className="text-text/60">•</span>
          <span className="text-text/70">{quest.genre}</span>
        </div>
        <p className="text-xs text-text/50 mt-2">{quest.plays} plays</p>
      </div>
    </div>
  );
}
