import { Star } from "lucide-react";

export default function StarRating({ rating, max = 5 }) {
  const full = Math.floor(rating);
  const empty = max - full;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star
          key={`full-${i}`}
          size={14}
          className="text-yellow-500 fill-yellow-500"
        />
      ))}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`empty-${i}`} size={14} className="text-gray-300" />
      ))}
      <span className="ml-1 text-xs text-text/70">{rating}</span>
    </div>
  );
}
