// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Button from "../ui/Button";
// import { useAuth } from "../../context/AuthContext";

// export default function QuestPlayer({ scenes }) {
//   const [currentSceneId, setCurrentSceneId] = useState(scenes[0]?.id);
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { user } = useAuth();

//   const scene = scenes.find((s) => s.id === currentSceneId) || scenes[0];

//   // Функція завершення квесту
//   const completeQuest = () => {
//     if (!user) return;
//     const questId = Number(id);
//     const progress = JSON.parse(localStorage.getItem("progress") || "{}");
//     const completed = JSON.parse(localStorage.getItem("completed") || "{}");

//     // Видаляємо з "в процесі"
//     if (progress[user.id]) {
//       progress[user.id] = progress[user.id].filter((q) => q !== questId);
//       localStorage.setItem("progress", JSON.stringify(progress));
//     }

//     // Додаємо в "завершені"
//     if (!completed[user.id]) completed[user.id] = [];
//     if (!completed[user.id].includes(questId)) {
//       completed[user.id].push(questId);
//       localStorage.setItem("completed", JSON.stringify(completed));
//     }
//   };

//   // Автоматично завершуємо при появі кінцевої сцени
//   useEffect(() => {
//     if (scene && scene.choices.length === 0 && user) {
//       completeQuest();
//     }
//   }, [scene, user]);

//   if (!scene) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 py-20 text-center">
//         <h2 className="text-2xl font-heading">No scenes available</h2>
//         <Button
//           variant="primary"
//           onClick={() => navigate(`/quest/${id}`)}
//           className="mt-4"
//         >
//           Back to Quest
//         </Button>
//       </div>
//     );
//   }

//   const isImage = /^https?:\/\//.test(scene.background);
//   const hasCharacterImage =
//     scene.characterImage && scene.characterImage.trim().length > 0;

//   return (
//     <div className="flex flex-col min-h-screen bg-background">
//       {/* Область фону та спрайту */}
//       <div
//         className="flex-1 relative overflow-hidden"
//         style={{
//           background: isImage
//             ? `url(${scene.background}) center/cover`
//             : scene.background,
//         }}
//       >
//         {hasCharacterImage && (
//           <img
//             src={scene.characterImage}
//             alt={scene.characterName}
//             className="absolute inset-4 mx-auto object-contain"
//             style={{
//               maxWidth: "calc(100% - 2rem)",
//               maxHeight: "calc(100% - 2rem)",
//             }}
//           />
//         )}
//       </div>

//       {/* Текстова панель */}
//       <div
//         className="flex-shrink-0 bg-card/90 backdrop-blur border-t border-primary/20 px-6 py-5"
//         style={{ maxHeight: "50%", overflowY: "auto" }}
//       >
//         {scene.characterName && (
//           <div className="text-button font-bold text-base mb-2">
//             {scene.characterName}
//           </div>
//         )}
//         <p className="text-text text-base leading-relaxed mb-4">{scene.text}</p>

//         {scene.choices.length > 0 ? (
//           <div className="flex flex-wrap gap-3">
//             {scene.choices.map((c) => (
//               <button
//                 key={c.id}
//                 onClick={() => setCurrentSceneId(c.targetId)}
//                 className="px-5 py-2.5 bg-card hover:bg-primary/30 border border-primary/30 rounded-lg text-base font-medium text-text transition-colors"
//               >
//                 {c.label}
//               </button>
//             ))}
//           </div>
//         ) : (
//           <div className="flex flex-col items-start gap-3">
//             <p className="text-sm text-text/50">The End</p>
//             <Button variant="primary" onClick={() => navigate(`/quest/${id}`)}>
//               Back to Quest
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { getQuestWithScenes } from "../../api/quests";
import { updateProgress } from "../../api/progress";

export default function QuestPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scenes, setScenes] = useState([]);
  const [currentSceneId, setCurrentSceneId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Завантаження сцен квесту
  useEffect(() => {
    const loadQuest = async () => {
      try {
        const data = await getQuestWithScenes(Number(id));
        if (data && data.scenes.length > 0) {
          setScenes(data.scenes);
          setCurrentSceneId(data.scenes[0].id);
        } else {
          // Якщо сцен немає, показуємо заглушку
          setScenes([]);
        }
      } catch (err) {
        console.error(err);
        setScenes([]);
      } finally {
        setLoading(false);
      }
    };
    loadQuest();
  }, [id]);

  const scene = scenes.find((s) => s.id === currentSceneId);

  // Оновлення прогресу при зміні сцени
  const handleNavigate = useCallback(
    (targetSceneId) => {
      setCurrentSceneId(targetSceneId);
      if (user) {
        const questId = Number(id);
        const totalScenes = scenes.length;
        const currentIndex = scenes.findIndex((s) => s.id === targetSceneId);
        const progressPercent = Math.round(
          ((currentIndex + 1) / totalScenes) * 100,
        );
        const isEnding =
          scenes[currentIndex]?.isEnding ||
          scenes[currentIndex]?.choices.length === 0;
        updateProgress(
          user.id,
          questId,
          targetSceneId,
          progressPercent,
          isEnding,
        );
      }
    },
    [user, id, scenes],
  );

  // Якщо сцена кінцева, відмічаємо завершення
  useEffect(() => {
    if (scene && scene.isEnding && user) {
      const questId = Number(id);
      updateProgress(user.id, questId, scene.id, 100, true);
    }
  }, [scene, user, id]);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!scene) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-heading">No scenes available</h2>
        <Button
          variant="primary"
          onClick={() => navigate(`/quest/${id}`)}
          className="mt-4"
        >
          Back to Quest
        </Button>
      </div>
    );
  }

  const isImage = /^https?:\/\//.test(scene.background);
  const hasCharacterImage =
    scene.characterImage && /^https?:\/\//.test(scene.characterImage);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div
        className="flex-1 relative overflow-hidden"
        style={{
          background: isImage
            ? `url(${scene.background}) center/cover`
            : scene.background || "#1e1b2e",
        }}
      >
        {hasCharacterImage && (
          <img
            src={scene.characterImage}
            alt={scene.characterName}
            className="absolute inset-4 mx-auto object-contain"
            style={{
              maxWidth: "calc(100% - 2rem)",
              maxHeight: "calc(100% - 2rem)",
            }}
          />
        )}
      </div>

      <div
        className="flex-shrink-0 bg-card/90 backdrop-blur border-t border-primary/20 px-4 sm:px-6 py-4 sm:py-5"
        style={{ maxHeight: "50%", overflowY: "auto" }}
      >
        {scene.characterName && (
          <div className="text-button font-bold text-base mb-2">
            {scene.characterName}
          </div>
        )}
        <p className="text-text text-base leading-relaxed mb-4">{scene.text}</p>

        {scene.choices.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {scene.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleNavigate(choice.targetId)}
                className="px-5 py-2.5 bg-card hover:bg-primary/30 border border-primary/30 rounded-lg text-base font-medium text-text transition-colors"
              >
                {choice.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-start gap-3">
            <p className="text-sm text-text/50">The End</p>
            <Button variant="primary" onClick={() => navigate(`/quest/${id}`)}>
              Back to Quest
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
