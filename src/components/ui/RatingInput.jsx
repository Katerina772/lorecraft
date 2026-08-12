import { Star } from "lucide-react";

export default function RatingInput({ rating, onRate, max = 10 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const value = i + 1;
        return (
          <button
            key={value}
            onClick={() => onRate(value)}
            className="focus:outline-none"
          >
            <Star
              size={18}
              className={
                value <= rating
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }
            />
          </button>
        );
      })}
    </div>
  );
}
