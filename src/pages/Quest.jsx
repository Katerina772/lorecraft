import { useParams, Link } from "react-router-dom";
import { Star, User, Eye, Heart, ArrowLeft, Play } from "lucide-react";
import { allQuests } from "../data/quests";
import StarRating from "../components/ui/StarRating";
import Button from "../components/ui/Button";
import { useState } from "react";

export default function Quest() {
  const { id } = useParams();
  const quest = allQuests.find((q) => q.id === Number(id));

  // Стан для улюбленого (тимчасово, без бекенду)
  const [isFavorite, setIsFavorite] = useState(false);

  if (!quest) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-heading font-bold text-text">
          Quest not found
        </h1>
        <Link
          to="/library"
          className="mt-4 inline-block text-button hover:underline"
        >
          ← Back to Library
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Кнопка назад */}
      <button
        onClick={() => {
          if (window.history.length > 1) {
            window.history.back();
          } else {
            window.location.href = "/library";
          }
        }}
        className="inline-flex items-center gap-2 text-text/60 hover:text-button mb-8 transition-colors"
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>

      {/* Основна інформація: обкладинка + деталі */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Обкладинка */}
        <div className="rounded-2xl overflow-hidden shadow-lg bg-card">
          {quest.cover ? (
            <img
              src={quest.cover}
              alt={quest.title}
              className="w-full h-auto object-cover"
            />
          ) : (
            <div className="w-full aspect-[4/3] bg-primary/20 flex items-center justify-center text-6xl font-heading text-primary">
              {quest.title[0]}
            </div>
          )}
        </div>

        {/* Текстова інформація */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Жанр та вікове обмеження */}
            <div className="flex gap-3 mb-3">
              <span className="bg-card px-3 py-1 rounded-full text-xs font-semibold text-text">
                {quest.genre}
              </span>
              <span className="bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold">
                {quest.ageRating}
              </span>
            </div>

            <h1 className="text-4xl font-heading font-bold text-text mb-2">
              {quest.title}
            </h1>

            <div className="flex items-center gap-2 text-text/60 mb-4">
              <User size={16} />
              <span className="font-medium">{quest.author}</span>
            </div>

            {/* Рейтинг */}
            <div className="flex items-center gap-4 mb-6">
              <StarRating rating={quest.rating} />
              <span className="text-sm text-text/50 flex items-center gap-1">
                <Eye size={14} />
                {quest.plays} plays
              </span>
            </div>

            {/* Опис */}
            <p className="text-text/70 leading-relaxed mb-8">
              {quest.description}
            </p>
          </div>

          {/* Кнопки дій */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={`/quest/${quest.id}/play`}>
              <Button
                variant="primary"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wider flex items-center gap-2 bg-card "
              >
                <Play size={16} />
                Start Quest
              </Button>
            </Link>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`flex items-center gap-2 px-6 py-3 tracking-wider rounded-full transition-colors ${
                isFavorite
                  ? "bg-red-400 text-white hover:bg-red-300"
                  : "bg-card text-text hover:bg-primary/30"
              }`}
            >
              <Heart size={16} className={isFavorite ? "fill-white" : ""} />
              {isFavorite ? "In Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>

      {/* Додаткові секції (коментарі, схожі квести) можна додати пізніше */}
    </div>
  );
}
