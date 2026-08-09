import { Link } from "react-router-dom";
import { Eye, User } from "lucide-react";
import StarRating from "../ui/StarRating";

export default function QuestCard({ quest }) {
  return (
    <Link
      to={`/quest/${quest.id}`}
      className="group block bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300"
    >
      {/* Обкладинка */}
      <div className="h-44 bg-primary/20 relative">
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
        {/* Жанр (бейдж зверху) */}
        <span className="absolute top-3 left-3 bg-background/80 backdrop-blur text-text text-xs font-semibold px-2 py-1 rounded-full">
          {quest.genre}
        </span>
        {/* Вікове обмеження */}
        <span className="absolute top-3 right-3 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-full">
          {quest.ageRating}
        </span>
      </div>

      {/* Контент */}
      <div className="p-4">
        <h3 className="font-heading font-bold text-lg mb-1 group-hover:text-button transition-colors">
          {quest.title}
        </h3>
        <p className="text-xs text-text/50 line-clamp-2 mb-3">
          {quest.description}
        </p>

        <div className="flex items-center text-xs text-text/60 mb-2">
          <User size={12} className="mr-1" />
          {quest.author}
        </div>

        <div className="flex items-center justify-between">
          <StarRating rating={quest.rating} />
          <span className="text-xs text-text/40 flex items-center gap-1">
            <Eye size={12} />
            {quest.plays}
          </span>
        </div>
      </div>
    </Link>
  );
}
