// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { BookOpen, Clock, Heart, FileText } from "lucide-react";
// import QuestCard from "../components/quest/QuestCard";
// import { allQuests } from "../data/quests";

// const tabs = [
//   { key: "in-progress", label: "В процесі", icon: <Clock size={18} /> },
//   { key: "completed", label: "Завершені", icon: <BookOpen size={18} /> },
//   { key: "favorites", label: "Улюблені", icon: <Heart size={18} /> },
//   { key: "my-quests", label: "Мої квести", icon: <FileText size={18} /> },
// ];

// export default function MyLibrary() {
//   const [activeTab, setActiveTab] = useState("in-progress");
//   const { user } = useAuth();

//   // Тимчасові дані – пізніше будемо брати з localStorage або API
//   const inProgressIds =
//     JSON.parse(localStorage.getItem("progress") || "{}")[user?.id] || [];
//   const favoritesIds = JSON.parse(localStorage.getItem("favorites") || "[]");
//   const myQuestsIds = JSON.parse(localStorage.getItem("userQuests") || "[]");

//   // Фільтруємо квести з allQuests для демонстрації
//   const getQuests = () => {
//     switch (activeTab) {
//       case "in-progress":
//         return allQuests.filter((q) => inProgressIds.includes(q.id));
//       case "completed":
//         return allQuests.slice(0, 2); // приклад
//       case "favorites":
//         return allQuests.filter((q) => favoritesIds.includes(q.id));
//       case "my-quests":
//         return allQuests.filter((q) => myQuestsIds.includes(q.id));
//       default:
//         return [];
//     }
//   };

//   const quests = getQuests();

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
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

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { BookOpen, Clock, Heart, FileText } from "lucide-react";
import QuestCard from "../components/quest/QuestCard";
import { allQuests as staticQuests } from "../data/quests";

const tabs = [
  { key: "in-progress", label: "В процесі", icon: <Clock size={18} /> },
  { key: "completed", label: "Завершені", icon: <BookOpen size={18} /> },
  { key: "favorites", label: "Улюблені", icon: <Heart size={18} /> },
  { key: "my-quests", label: "Мої квести", icon: <FileText size={18} /> },
];

export default function MyLibrary() {
  const [activeTab, setActiveTab] = useState("in-progress");
  const { user } = useAuth();

  // Отримуємо всі опубліковані квести (глобальні) + статичні
  const publishedQuests = JSON.parse(
    localStorage.getItem("publishedQuests") || "[]",
  );
  const allQuests = [...staticQuests, ...publishedQuests];

  // Персональні дані користувача з localStorage
  const progressData = JSON.parse(localStorage.getItem("progress") || "{}");
  const inProgressIds = user ? progressData[user.id] || [] : [];
  const favoritesIds = JSON.parse(localStorage.getItem("favorites") || "[]");
  const myQuestsIds = user
    ? JSON.parse(localStorage.getItem(`userQuests_${user.id}`) || "[]")
    : [];

  const getQuests = () => {
    switch (activeTab) {
      case "in-progress":
        return allQuests.filter((q) => inProgressIds.includes(q.id));
      case "completed":
        // Поки що приклад, пізніше можна замінити на реальну логіку завершених квестів
        return allQuests.slice(0, 2);
      case "favorites":
        return allQuests.filter((q) => favoritesIds.includes(q.id));
      case "my-quests":
        return publishedQuests.filter((q) => myQuestsIds.includes(q.id));
      default:
        return [];
    }
  };

  const quests = getQuests();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-heading font-bold text-text mb-8">
        Особиста бібліотека
      </h1>

      {/* Вкладки */}
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

      {/* Список квестів */}
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
