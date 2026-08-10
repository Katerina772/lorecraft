// import { useParams, Link } from "react-router-dom";
// import { Star, User, Eye, Heart, ArrowLeft, Play } from "lucide-react";
// import { allQuests } from "../data/quests";
// import StarRating from "../components/ui/StarRating";
// import Button from "../components/ui/Button";
// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";

// export default function Quest() {

//   const { id } = useParams();
//   const quest = allQuests.find((q) => q.id === Number(id));

//   // Стан для улюбленого (тимчасово, без бекенду)
//   const [isFavorite, setIsFavorite] = useState(false);

//   if (!quest) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 py-20 text-center">
//         <h1 className="text-3xl font-heading font-bold text-text">
//           Quest not found
//         </h1>
//         <Link
//           to="/library"
//           className="mt-4 inline-block text-button hover:underline"
//         >
//           ← Back to Library
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">
//       {/* Кнопка назад */}
//       <button
//         onClick={() => {
//           if (window.history.length > 1) {
//             window.history.back();
//           } else {
//             window.location.href = "/library";
//           }
//         }}
//         className="inline-flex items-center gap-2 text-text/60 hover:text-button mb-8 transition-colors"
//       >
//         <ArrowLeft size={18} />
//         <span>Back</span>
//       </button>

//       {/* Основна інформація: обкладинка + деталі */}
//       <div className="grid md:grid-cols-2 gap-10">
//         {/* Обкладинка */}
//         <div className="rounded-2xl overflow-hidden shadow-lg bg-card">
//           {quest.cover ? (
//             <img
//               src={quest.cover}
//               alt={quest.title}
//               className="w-full h-auto object-cover"
//             />
//           ) : (
//             <div className="w-full aspect-[4/3] bg-primary/20 flex items-center justify-center text-6xl font-heading text-primary">
//               {quest.title[0]}
//             </div>
//           )}
//         </div>

//         {/* Текстова інформація */}
//         <div className="flex flex-col justify-between">
//           <div>
//             {/* Жанр та вікове обмеження */}
//             <div className="flex gap-3 mb-3">
//               <span className="bg-card px-3 py-1 rounded-full text-xs font-semibold text-text">
//                 {quest.genre}
//               </span>
//               <span className="bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold">
//                 {quest.ageRating}
//               </span>
//             </div>

//             <h1 className="text-4xl font-heading font-bold text-text mb-2">
//               {quest.title}
//             </h1>

//             <div className="flex items-center gap-2 text-text/60 mb-4">
//               <User size={16} />
//               <span className="font-medium">{quest.author}</span>
//             </div>

//             {/* Рейтинг */}
//             <div className="flex items-center gap-4 mb-6">
//               <StarRating rating={quest.rating} />
//               <span className="text-sm text-text/50 flex items-center gap-1">
//                 <Eye size={14} />
//                 {quest.plays} plays
//               </span>
//             </div>

//             {/* Опис */}
//             <p className="text-text/70 leading-relaxed mb-8">
//               {quest.description}
//             </p>
//           </div>

//           {/* Кнопки дій */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             <Link to={`/quest/${quest.id}/play`}>
//               <Button
//                 variant="primary"
//                 className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wider flex items-center gap-2 bg-card "
//               >
//                 <Play size={16} />
//                 Start Quest
//               </Button>
//             </Link>
//             <button
//               onClick={() => setIsFavorite(!isFavorite)}
//               className={`flex items-center gap-2 px-6 py-3 tracking-wider rounded-full transition-colors ${
//                 isFavorite
//                   ? "bg-red-400 text-white hover:bg-red-300"
//                   : "bg-card text-text hover:bg-primary/30"
//               }`}
//             >
//               <Heart size={16} className={isFavorite ? "fill-white" : ""} />
//               {isFavorite ? "In Favorites" : "Add to Favorites"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Додаткові секції (коментарі, схожі квести) можна додати пізніше */}
//     </div>
//   );
// }

import { useParams, useNavigate } from "react-router-dom";
import { Star, User, Eye, Heart, ArrowLeft, Play } from "lucide-react";
import { allQuests } from "../data/quests";
import StarRating from "../components/ui/StarRating";
import Button from "../components/ui/Button";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Quest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const quest = allQuests.find((q) => q.id === Number(id));

  // Ініціалізація стану улюбленого з localStorage
  const [favorite, setFavorite] = useState(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    return favs.includes(Number(id));
  });

  // Оновлюємо стан при зміні id (наприклад, якщо користувач перейшов між квестами без перезавантаження)
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorite(favs.includes(Number(id)));
  }, [id]);

  const toggleFavorite = () => {
    if (!user) return; // гість не може додавати в улюблене
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    let newFavs;
    if (favorite) {
      newFavs = favs.filter((fid) => fid !== Number(id));
    } else {
      newFavs = [...favs, Number(id)];
    }
    localStorage.setItem("favorites", JSON.stringify(newFavs));
    setFavorite(!favorite);
  };

  const startQuest = () => {
    if (user) {
      // Зберігаємо квест у список "в процесі"
      const progress = JSON.parse(localStorage.getItem("progress") || "{}");
      if (!progress[user.id]) progress[user.id] = [];
      if (!progress[user.id].includes(Number(id))) {
        progress[user.id].push(Number(id));
        localStorage.setItem("progress", JSON.stringify(progress));
      }
    }
    navigate(`/quest/${id}/play`);
  };

  if (!quest) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-heading font-bold text-text">
          Quest not found
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 inline-block text-button hover:underline"
        >
          ← Go back
        </button>
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
            navigate("/library");
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
            <Button
              variant="primary"
              onClick={startQuest}
              className="flex items-center gap-2"
            >
              <Play size={16} />
              Start Quest
            </Button>
            <button
              onClick={toggleFavorite}
              className={`px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wider flex items-center gap-2 transition-colors ${
                favorite
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-card text-text hover:bg-primary/30"
              }`}
            >
              <Heart size={16} className={favorite ? "fill-white" : ""} />
              {favorite ? "In Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
