// import { useParams } from "react-router-dom";
// import { allQuests as staticQuests } from "../data/quests";
// import QuestPlayer from "../components/quest/QuestPlayer";

// export default function PlayQuest() {
//   const { id } = useParams();
//   const publishedQuests = JSON.parse(
//     localStorage.getItem("publishedQuests") || "[]",
//   );
//   const allQuests = [...staticQuests, ...publishedQuests];
//   const quest = allQuests.find((q) => q.id === Number(id));

//   if (!quest) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 py-20 text-center">
//         <h1 className="text-3xl font-heading">Quest not found</h1>
//       </div>
//     );
//   }

//   // Якщо сцени є – використовуємо їх, інакше одна сцена-заглушка
//   const scenes = quest.scenes?.length
//     ? quest.scenes
//     : [
//         {
//           id: "no-content",
//           title: "No Content",
//           background: "#F6F1E7",
//           characterName: "",
//           characterImage: "",
//           text: "This quest has no interactive content yet.",
//           choices: [],
//         },
//       ];

//   return <QuestPlayer scenes={scenes} />;
// }

import QuestPlayer from "../components/quest/QuestPlayer";

export default function PlayQuest() {
  return <QuestPlayer />;
}
