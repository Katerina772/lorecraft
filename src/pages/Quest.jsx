// import { useParams, useNavigate } from "react-router-dom";
// import { Star, User, Eye, Heart, ArrowLeft, Play } from "lucide-react";
// import { allQuests as staticQuests } from "../data/quests";
// import StarRating from "../components/ui/StarRating";
// import RatingInput from "../components/ui/RatingInput";
// import Button from "../components/ui/Button";
// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { getAverageRating, saveRating, getUserRating } from "../utils/ratings";

// export default function Quest() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   // Об'єднуємо статичні та опубліковані квести
//   const publishedQuests = JSON.parse(
//     localStorage.getItem("publishedQuests") || "[]",
//   );
//   const allQuests = [...staticQuests, ...publishedQuests];
//   const quest = allQuests.find((q) => q.id === Number(id));

//   // Рейтинг
//   const [avgRating, setAvgRating] = useState(null);
//   const [userRating, setUserRating] = useState(null);

//   // Улюблене
//   const [favorite, setFavorite] = useState(() => {
//     const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
//     return favs.includes(Number(id));
//   });

//   useEffect(() => {
//     if (quest) {
//       setAvgRating(getAverageRating(quest.id));
//       if (user) {
//         setUserRating(getUserRating(quest.id, user.id));
//       }
//     }
//   }, [id, quest, user]);

//   const handleRate = (value) => {
//     if (!user) return;
//     saveRating(quest.id, user.id, value);
//     setUserRating(value);
//     setAvgRating(getAverageRating(quest.id)); // оновлюємо середню
//   };

//   const toggleFavorite = () => {
//     if (!user) return;
//     const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
//     let newFavs;
//     if (favorite) {
//       newFavs = favs.filter((fid) => fid !== Number(id));
//     } else {
//       newFavs = [...favs, Number(id)];
//     }
//     localStorage.setItem("favorites", JSON.stringify(newFavs));
//     setFavorite(!favorite);
//   };

//   const startQuest = () => {
//     if (user) {
//       const progress = JSON.parse(localStorage.getItem("progress") || "{}");
//       if (!progress[user.id]) progress[user.id] = [];
//       if (!progress[user.id].includes(Number(id))) {
//         progress[user.id].push(Number(id));
//         localStorage.setItem("progress", JSON.stringify(progress));
//       }
//     }
//     navigate(`/quest/${id}/play`);
//   };

//   if (!quest) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 py-20 text-center">
//         <h1 className="text-3xl font-heading font-bold text-text">
//           Quest not found
//         </h1>
//         <button
//           onClick={() => navigate(-1)}
//           className="mt-4 text-button hover:underline"
//         >
//           ← Go back
//         </button>
//       </div>
//     );
//   }

//   const displayRating = avgRating !== null ? avgRating : quest.rating;

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">
//       {/* Кнопка назад */}
//       <button
//         onClick={() => {
//           if (window.history.length > 1) window.history.back();
//           else navigate("/library");
//         }}
//         className="inline-flex items-center gap-2 text-text/60 hover:text-button mb-8 transition-colors"
//       >
//         <ArrowLeft size={18} />
//         <span>Back</span>
//       </button>

//       {/* Основна інформація */}
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

//             {/* Рейтинг (середній) */}
//             <div className="flex items-center gap-4 mb-6">
//               <StarRating rating={displayRating} />
//               <span className="text-sm text-text/50 flex items-center gap-1">
//                 <Eye size={14} />
//                 {quest.plays} plays
//               </span>
//             </div>

//             {/* Оцінка користувача */}
//             {user ? (
//               <div className="mb-6">
//                 <p className="text-sm text-text/70 mb-1">Your rating:</p>
//                 <RatingInput rating={userRating || 0} onRate={handleRate} />
//                 {userRating && (
//                   <p className="text-xs text-text/50 mt-1">
//                     You rated this quest {userRating}/10
//                   </p>
//                 )}
//               </div>
//             ) : (
//               <p className="text-sm text-text/50 mb-4">
//                 <span
//                   className="text-button cursor-pointer"
//                   onClick={() => navigate("/login")}
//                 >
//                   Log in
//                 </span>{" "}
//                 to rate this quest.
//               </p>
//             )}

//             <p className="text-text/70 leading-relaxed mb-8">
//               {quest.description}
//             </p>
//           </div>

//           {/* Кнопки дій */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             <Button
//               variant="primary"
//               onClick={startQuest}
//               className="flex items-center gap-2"
//             >
//               <Play size={16} />
//               Start Quest
//             </Button>
//             <button
//               onClick={toggleFavorite}
//               className={`px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wider flex items-center gap-2 transition-colors ${
//                 favorite
//                   ? "bg-red-500 text-white hover:bg-red-600"
//                   : "bg-card text-text hover:bg-primary/30"
//               }`}
//             >
//               <Heart size={16} className={favorite ? "fill-white" : ""} />
//               {favorite ? "In Favorites" : "Add to Favorites"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useParams, useNavigate } from "react-router-dom";
import { Star, User, Eye, Heart, ArrowLeft, Play } from "lucide-react";
import { allQuests as staticQuests } from "../data/quests";
import StarRating from "../components/ui/StarRating";
import RatingInput from "../components/ui/RatingInput";
import Button from "../components/ui/Button";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getAverageRating, saveRating, getUserRating } from "../utils/ratings";
import { incrementPlays, getPlays } from "../utils/plays";

export default function Quest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const publishedQuests = JSON.parse(
    localStorage.getItem("publishedQuests") || "[]",
  );
  const allQuests = [...staticQuests, ...publishedQuests];
  const quest = allQuests.find((q) => q.id === Number(id));

  const [avgRating, setAvgRating] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [favorite, setFavorite] = useState(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    return favs.includes(Number(id));
  });

  useEffect(() => {
    if (quest) {
      setAvgRating(getAverageRating(quest.id));
      if (user) setUserRating(getUserRating(quest.id, user.id));
    }
  }, [id, quest, user]);

  const handleRate = (value) => {
    if (!user) return;
    saveRating(quest.id, user.id, value);
    setUserRating(value);
    setAvgRating(getAverageRating(quest.id));
  };

  const toggleFavorite = () => {
    if (!user) return;
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
    // Збільшуємо лічильник проходжень
    incrementPlays(quest.id);

    // Зберігаємо шлях, з якого прийшли, для кнопки "Back"
    sessionStorage.setItem("questReferrer", window.location.pathname);

    // Додаємо в прогрес, якщо авторизований
    if (user) {
      const progress = JSON.parse(localStorage.getItem("progress") || "{}");
      if (!progress[user.id]) progress[user.id] = [];
      if (!progress[user.id].includes(Number(id))) {
        progress[user.id].push(Number(id));
        localStorage.setItem("progress", JSON.stringify(progress));
      }
    }

    navigate(`/quest/${id}/play`);
  };

  const handleBack = () => {
    const referrer = sessionStorage.getItem("questReferrer");
    // Повертаємось на сторінку, з якої прийшли, або на головну
    if (referrer && referrer !== window.location.pathname) {
      navigate(referrer);
    } else {
      navigate("/");
    }
    sessionStorage.removeItem("questReferrer");
  };

  if (!quest) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-heading font-bold text-text">
          Quest not found
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-button hover:underline"
        >
          ← Go back
        </button>
      </div>
    );
  }

  const displayRating = avgRating !== null ? avgRating : quest.rating;
  const totalPlays = quest.plays + getPlays(quest.id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Кнопка назад – тепер використовує збережений шлях */}
      <button
        onClick={handleBack}
        className="inline-flex items-center gap-2 text-text/60 hover:text-button mb-8 transition-colors"
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>

      <div className="grid md:grid-cols-2 gap-10">
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

        <div className="flex flex-col justify-between">
          <div>
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

            <div className="flex items-center gap-4 mb-6">
              <StarRating rating={displayRating} />
              <span className="text-sm text-text/50 flex items-center gap-1">
                <Eye size={14} />
                {totalPlays} plays
              </span>
            </div>

            {user ? (
              <div className="mb-6">
                <p className="text-sm text-text/70 mb-1">Your rating:</p>
                <RatingInput rating={userRating || 0} onRate={handleRate} />
                {userRating && (
                  <p className="text-xs text-text/50 mt-1">
                    You rated this quest {userRating}/10
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-text/50 mb-4">
                <span
                  className="text-button cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </span>{" "}
                to rate this quest.
              </p>
            )}

            <p className="text-text/70 leading-relaxed mb-8">
              {quest.description}
            </p>
          </div>

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
