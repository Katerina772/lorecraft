import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../ui/Button";

export default function QuestPlayer({ scenes }) {
  const [currentSceneId, setCurrentSceneId] = useState(scenes[0]?.id);
  const navigate = useNavigate();
  const { id } = useParams(); // id квесту для повернення

  const scene = scenes.find((s) => s.id === currentSceneId) || scenes[0];
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
    scene.characterImage && scene.characterImage.trim().length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Область фону та спрайту */}
      <div
        className="flex-1 relative overflow-hidden"
        style={{
          background: isImage
            ? `url(${scene.background}) center/cover`
            : scene.background,
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

      {/* Текстова панель */}
      <div
        className="flex-shrink-0 bg-card/90 backdrop-blur border-t border-primary/20 px-6 py-5"
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
            {scene.choices.map((c) => (
              <button
                key={c.id}
                onClick={() => setCurrentSceneId(c.targetId)}
                className="px-5 py-2.5 bg-card hover:bg-primary/30 border border-primary/30 rounded-lg text-base font-medium text-text transition-colors"
              >
                {c.label}
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
