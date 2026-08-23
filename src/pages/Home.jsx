// import Hero from "../components/home/Hero";
// import QuestSection from "../components/home/QuestSection";
// import { popularQuests, newQuests } from "../data/quests";
// import { Flame, Sparkles } from "lucide-react";

// export default function Home() {
//   return (
//     <>
//       <Hero />
//       <QuestSection
//         title="Popular quests"
//         icon={<Flame size={24} />}
//         quests={popularQuests}
//         layout="carousel"
//       />
//       <QuestSection
//         title="New adventures"
//         icon={<Sparkles size={24} />}
//         quests={newQuests}
//         layout="carousel"
//       />
//     </>
//   );
// }

// import { useState, useEffect } from "react";
// import { Flame, Sparkles } from "lucide-react";
// import Hero from "../components/home/Hero";
// import QuestSection from "../components/home/QuestSection";
// import { getPublishedQuests } from "../api/quests";
// import { useAuth } from "../context/AuthContext";

// export default function Home() {
//   const [popularQuests, setPopularQuests] = useState([]);
//   const [newQuests, setNewQuests] = useState([]);

//   useEffect(() => {
//     const loadQuests = async () => {
//       try {
//         const published = await getPublishedQuests();
//         // Сортуємо за кількістю проходжень для популярних
//         const sortedByPlays = [...published].sort(
//           (a, b) => b.playCount - a.playCount,
//         );
//         setPopularQuests(sortedByPlays.slice(0, 4));
//         // Сортуємо за датою створення для нових
//         const sortedByDate = [...published].sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
//         );
//         setNewQuests(sortedByDate.slice(0, 4));
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     loadQuests();
//   }, []);

//   return (
//     <>
//       <Hero />
//       <QuestSection
//         title="Popular quests"
//         icon={<Flame size={24} />}
//         quests={popularQuests}
//         layout="carousel"
//       />
//       <QuestSection
//         title="New adventures"
//         icon={<Sparkles size={24} />}
//         quests={newQuests}
//         layout="carousel"
//       />
//     </>
//   );
// }

import { useState, useEffect } from "react";
import { Flame, Sparkles } from "lucide-react";
import Hero from "../components/home/Hero";
import QuestSection from "../components/home/QuestSection";
import { getPublishedQuests } from "../api/quests";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const [popularQuests, setPopularQuests] = useState([]);
  const [newQuests, setNewQuests] = useState([]);

  useEffect(() => {
    const loadQuests = async () => {
      try {
        const published = await getPublishedQuests();
        const sortedByPlays = [...published].sort(
          (a, b) => b.playCount - a.playCount,
        );
        setPopularQuests(sortedByPlays.slice(0, 4));
        const sortedByDate = [...published].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setNewQuests(sortedByDate.slice(0, 4));
      } catch (err) {
        console.error(err);
      }
    };
    loadQuests();
  }, [user]); // Додано залежність від user

  return (
    <>
      <Hero />
      <QuestSection
        title="Popular quests"
        icon={<Flame size={24} />}
        quests={popularQuests}
        layout="carousel"
      />
      <QuestSection
        title="New adventures"
        icon={<Sparkles size={24} />}
        quests={newQuests}
        layout="carousel"
      />
    </>
  );
}
