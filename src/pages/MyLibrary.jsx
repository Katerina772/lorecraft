// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { BookOpen, Clock, Heart, FileText, ArrowLeft } from "lucide-react";
// import QuestCard from "../components/quest/QuestCard";
// import { allQuests as staticQuests } from "../data/quests";

// const tabs = [
//   { key: "in-progress", label: "В процесі", icon: <Clock size={18} /> },
//   { key: "completed", label: "Завершені", icon: <BookOpen size={18} /> },
//   { key: "favorites", label: "Улюблені", icon: <Heart size={18} /> },
//   { key: "my-quests", label: "Мої квести", icon: <FileText size={18} /> },
// ];

// export default function MyLibrary() {
//   const [activeTab, setActiveTab] = useState("in-progress");
//   const { user } = useAuth();

//   const publishedQuests = JSON.parse(
//     localStorage.getItem("publishedQuests") || "[]",
//   );
//   const allQuests = [...staticQuests, ...publishedQuests];

//   const progressData = JSON.parse(localStorage.getItem("progress") || "{}");
//   const inProgressIds = user ? progressData[user.id] || [] : [];

//   const completedData = JSON.parse(localStorage.getItem("completed") || "{}");
//   const completedIds = user ? completedData[user.id] || [] : [];

//   const favoritesIds = JSON.parse(localStorage.getItem("favorites") || "[]");
//   const myQuestsIds = user
//     ? JSON.parse(localStorage.getItem(`userQuests_${user.id}`) || "[]")
//     : [];

//   const getQuests = () => {
//     switch (activeTab) {
//       case "in-progress":
//         return allQuests.filter((q) => inProgressIds.includes(q.id));
//       case "completed":
//         return allQuests.filter((q) => completedIds.includes(q.id));
//       case "favorites":
//         return allQuests.filter((q) => favoritesIds.includes(q.id));
//       case "my-quests":
//         return publishedQuests.filter((q) => myQuestsIds.includes(q.id));
//       default:
//         return [];
//     }
//   };

//   const quests = getQuests();

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       {/* Кнопка назад до профілю */}
//       <Link
//         to="/profile"
//         className="inline-flex items-center gap-2 text-text/60 hover:text-button mb-6 transition-colors"
//       >
//         <ArrowLeft size={18} />
//         <span>Назад до профілю</span>
//       </Link>

//       <h1 className="text-3xl font-heading font-bold text-text mb-8">
//         Особиста бібліотека
//       </h1>

//       {/* Вкладки */}
//       <div className="flex flex-wrap gap-2 mb-8">
//         {tabs.map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => setActiveTab(tab.key)}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
//               activeTab === tab.key
//                 ? "bg-button text-white"
//                 : "bg-card text-text hover:bg-primary/30"
//             }`}
//           >
//             {tab.icon}
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Список квестів */}
//       {quests.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {quests.map((quest) => (
//             <QuestCard key={quest.id} quest={quest} />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-20 bg-card rounded-2xl">
//           <BookOpen size={48} className="mx-auto text-text/20 mb-4" />
//           <p className="text-xl font-heading text-text/40">
//             {activeTab === "in-progress" && "Немає активних квестів"}
//             {activeTab === "completed" && "Немає завершених квестів"}
//             {activeTab === "favorites" && "Немає улюблених квестів"}
//             {activeTab === "my-quests" && "Ви ще не створили жодного квесту"}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BookOpen, Clock, Heart, FileText, ArrowLeft } from "lucide-react";
import QuestCard from "../components/quest/QuestCard";
import { getPublishedQuests, getPublishedQuestsByAuthor } from "../api/quests";
import { getProgress } from "../api/progress";
import { getFavorites } from "../api/favorites";

const tabs = [
  { key: "in-progress", label: "В процесі", icon: <Clock size={18} /> },
  { key: "completed", label: "Завершені", icon: <BookOpen size={18} /> },
  { key: "favorites", label: "Улюблені", icon: <Heart size={18} /> },
  { key: "my-quests", label: "Мої квести", icon: <FileText size={18} /> },
];

export default function MyLibrary() {
  const [activeTab, setActiveTab] = useState("in-progress");
  const { user } = useAuth();
  const [allQuests, setAllQuests] = useState([]);
  const [inProgressIds, setInProgressIds] = useState([]);
  const [completedIds, setCompletedIds] = useState([]);
  const [favoritesIds, setFavoritesIds] = useState([]);
  const [myQuestIds, setMyQuestIds] = useState([]);

  useEffect(() => {
    if (!user) return;
    const loadData = async () => {
      const published = await getPublishedQuests();
      setAllQuests(published);
      const progress = await getProgress(user.id);
      setInProgressIds(
        progress.filter((p) => !p.is_completed).map((p) => p.quest_id),
      );
      setCompletedIds(
        progress.filter((p) => p.is_completed).map((p) => p.quest_id),
      );
      const favs = await getFavorites(user.id);
      setFavoritesIds(favs);
      const myQuests = await getPublishedQuestsByAuthor(user.id);
      setMyQuestIds(myQuests.map((q) => q.id));
    };
    loadData();
  }, [user]);

  const getQuests = () => {
    switch (activeTab) {
      case "in-progress":
        return allQuests.filter((q) => inProgressIds.includes(q.id));
      case "completed":
        return allQuests.filter((q) => completedIds.includes(q.id));
      case "favorites":
        return allQuests.filter((q) => favoritesIds.includes(q.id));
      case "my-quests":
        return allQuests.filter((q) => myQuestIds.includes(q.id));
      default:
        return [];
    }
  };

  const quests = getQuests();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link
        to="/profile"
        className="inline-flex items-center gap-2 text-text/60 hover:text-button mb-6 transition-colors"
      >
        <ArrowLeft size={18} />
        <span>Назад до профілю</span>
      </Link>

      <h1 className="text-3xl font-heading font-bold text-text mb-8">
        Особиста бібліотека
      </h1>

      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === tab.key
                ? "bg-button text-white"
                : "bg-card text-text hover:bg-primary/30"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {quests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {quests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-card rounded-2xl">
          <BookOpen size={48} className="mx-auto text-text/20 mb-4" />
          <p className="text-xl font-heading text-text/40">
            {activeTab === "in-progress" && "Немає активних квестів"}
            {activeTab === "completed" && "Немає завершених квестів"}
            {activeTab === "favorites" && "Немає улюблених квестів"}
            {activeTab === "my-quests" && "Ви ще не створили жодного квесту"}
          </p>
        </div>
      )}
    </div>
  );
}
