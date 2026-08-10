import { useState, useRef } from "react";
import {
  Plus,
  Trash2,
  Play,
  ArrowLeft,
  Download,
  X,
  Save,
  Globe,
  BookOpen,
} from "lucide-react";
import Button from "../ui/Button";

const uid = () => Math.random().toString(36).slice(2, 9);

const createScene = (overrides = {}) => ({
  id: uid(),
  title: "New Scene",
  background: "#1e1b2e",
  characterName: "",
  characterImage: "",
  text: "",
  choices: [],
  ...overrides,
});

const seedScenes = () => {
  const s2 = createScene({ title: "Ending", text: "The story ends here." });
  const s1b = createScene({
    title: "Run Away",
    text: "You run through a dark corridor.",
    choices: [{ id: uid(), label: "To the end", targetId: s2.id }],
  });
  const s1a = createScene({
    title: "Talk",
    text: "You decide to talk to the stranger.",
    choices: [{ id: uid(), label: "To the end", targetId: s2.id }],
  });
  const start = createScene({
    title: "Beginning",
    characterName: "Stranger",
    text: "The door creaks. Someone stands in the doorway, silently watching you.",
    choices: [
      { id: uid(), label: "Talk", targetId: s1a.id },
      { id: uid(), label: "Run away", targetId: s1b.id },
    ],
  });
  return [start, s1a, s1b, s2];
};

export default function NovelEditor({ questMeta, onBack }) {
  const [scenes, setScenes] = useState(seedScenes());
  const [selectedId, setSelectedId] = useState(scenes[0].id);
  const [mode, setMode] = useState("editor"); // "editor" | "play"
  const [playSceneId, setPlaySceneId] = useState(scenes[0].id);
  const [showExport, setShowExport] = useState(false);
  const fileInputRef = useRef(null);

  const selected = scenes.find((s) => s.id === selectedId) || scenes[0];

  const updateScene = (id, patch) => {
    setScenes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    );
  };

  const addScene = () => {
    const s = createScene({ title: `Scene ${scenes.length + 1}` });
    setScenes((prev) => [...prev, s]);
    setSelectedId(s.id);
  };

  const deleteScene = (id) => {
    if (scenes.length === 1) return;
    setScenes((prev) =>
      prev
        .filter((s) => s.id !== id)
        .map((s) => ({
          ...s,
          choices: s.choices.filter((c) => c.targetId !== id),
        })),
    );
    if (selectedId === id) setSelectedId(scenes.find((s) => s.id !== id).id);
  };

  const addChoice = () => {
    const other = scenes.find((s) => s.id !== selected.id) || selected;
    updateScene(selected.id, {
      choices: [
        ...selected.choices,
        { id: uid(), label: "New choice", targetId: other.id },
      ],
    });
  };

  const updateChoice = (choiceId, patch) => {
    updateScene(selected.id, {
      choices: selected.choices.map((c) =>
        c.id === choiceId ? { ...c, ...patch } : c,
      ),
    });
  };

  const deleteChoice = (choiceId) => {
    updateScene(selected.id, {
      choices: selected.choices.filter((c) => c.id !== choiceId),
    });
  };

  const startPlay = () => {
    setPlaySceneId(scenes[0].id);
    setMode("play");
  };

  const exportJson = JSON.stringify({ meta: questMeta, scenes }, null, 2);

  const downloadJson = () => {
    const blob = new Blob([exportJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${questMeta.title || "novel"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (Array.isArray(parsed.scenes) && parsed.scenes.length) {
          setScenes(parsed.scenes);
          setSelectedId(parsed.scenes[0].id);
        }
      } catch {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const saveDraft = () => {
    // Тут буде запит до API, поки зберігаємо в localStorage як приклад
    localStorage.setItem(
      "draftQuest",
      JSON.stringify({ meta: questMeta, scenes }),
    );
    alert("Draft saved locally!");
  };

  const publish = () => {
    // Імітація публікації
    alert(`Quest "${questMeta.title}" published!`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-text font-body">
      {/* Верхня панель */}
      <div className="flex items-center justify-between px-5 py-2 border-b border-primary/20 bg-card">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="text-text/60 hover:text-button transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <BookOpen size={18} className="text-button" />
          <h2 className="font-heading font-bold text-base">
            {questMeta.title || "Untitled Quest"}
          </h2>
        </div>
        <div className="flex gap-2">
          {mode === "editor" ? (
            <>
              <Button
                variant="outline"
                className="text-xs py-1.5 px-3"
                onClick={() => fileInputRef.current?.click()}
              >
                Import JSON
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json"
                hidden
                onChange={importJson}
              />
              <Button
                variant="outline"
                className="text-xs py-1.5 px-3"
                onClick={() => setShowExport(true)}
              >
                <Download size={14} /> Export
              </Button>
              <Button
                variant="outline"
                className="text-xs py-1.5 px-3"
                onClick={startPlay}
              >
                <Play size={14} /> Test Play
              </Button>
              <div className="border-l border-primary/20 mx-1" />
              <Button
                variant="primary"
                className="text-xs py-1.5 px-3"
                onClick={saveDraft}
              >
                <Save size={14} /> Save Draft
              </Button>
              <Button
                variant="primary"
                className="text-xs py-1.5 px-3"
                onClick={publish}
              >
                <Globe size={14} /> Publish
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              className="text-xs py-1.5 px-3"
              onClick={() => setMode("editor")}
            >
              <ArrowLeft size={14} /> Back to Editor
            </Button>
          )}
        </div>
      </div>

      {mode === "editor" ? (
        <div className="flex flex-1 min-h-0">
          {/* Список сцен */}
          <div className="w-56 border-r border-primary/20 p-3 bg-card overflow-y-auto">
            <Button
              variant="outline"
              className="w-full justify-center mb-3"
              onClick={addScene}
            >
              <Plus size={15} /> Add Scene
            </Button>
            {scenes.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={`flex justify-between items-center px-3 py-2 rounded-lg mb-1 cursor-pointer text-sm font-medium transition-colors ${
                  s.id === selectedId
                    ? "bg-primary/30 border border-button"
                    : "hover:bg-primary/10 border border-transparent"
                }`}
              >
                <span className="truncate">{s.title || "(untitled)"}</span>
                {scenes.length > 1 && (
                  <Trash2
                    size={14}
                    className="text-text/40 hover:text-red-400 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteScene(s.id);
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Форма редагування сцени */}
          <div className="flex-1 p-8 overflow-y-auto bg-background space-y-5">
            {/* Назва сцени */}
            <div>
              <label className="block text-xs font-semibold text-text/60 mb-1">
                Scene Title (for editor)
              </label>
              <input
                value={selected.title}
                onChange={(e) =>
                  updateScene(selected.id, { title: e.target.value })
                }
                className="w-full px-3 py-2 bg-card rounded-lg border border-transparent focus:border-button outline-none text-text"
              />
            </div>

            {/* Фон та ім'я персонажа */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text/60 mb-1">
                  Background (hex or URL)
                </label>
                <input
                  value={selected.background}
                  onChange={(e) =>
                    updateScene(selected.id, { background: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-card rounded-lg border border-transparent focus:border-button outline-none text-text"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text/60 mb-1">
                  Character Name
                </label>
                <input
                  value={selected.characterName}
                  onChange={(e) =>
                    updateScene(selected.id, { characterName: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-card rounded-lg border border-transparent focus:border-button outline-none text-text"
                />
              </div>
            </div>

            {/* URL спрайту */}
            <div>
              <label className="block text-xs font-semibold text-text/60 mb-1">
                Character Image URL (optional)
              </label>
              <input
                value={selected.characterImage}
                onChange={(e) =>
                  updateScene(selected.id, { characterImage: e.target.value })
                }
                className="w-full px-3 py-2 bg-card rounded-lg border border-transparent focus:border-button outline-none text-text"
              />
            </div>

            {/* Текст сцени */}
            <div>
              <label className="block text-xs font-semibold text-text/60 mb-1">
                Scene Text
              </label>
              <textarea
                value={selected.text}
                onChange={(e) =>
                  updateScene(selected.id, { text: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2 bg-card rounded-lg border border-transparent focus:border-button outline-none text-text resize-none"
              />
            </div>

            {/* Вибори */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-button">
                  Choices
                </span>
                <Button
                  variant="outline"
                  className="text-xs py-1 px-3"
                  onClick={addChoice}
                >
                  <Plus size={13} /> Add Choice
                </Button>
              </div>
              {selected.choices.length === 0 && (
                <p className="text-xs text-text/40 mb-2">
                  No choices — this scene will be an ending.
                </p>
              )}
              {selected.choices.map((c) => (
                <div key={c.id} className="flex gap-2 items-center mb-2">
                  <input
                    value={c.label}
                    onChange={(e) =>
                      updateChoice(c.id, { label: e.target.value })
                    }
                    placeholder="Button text"
                    className="flex-1 px-3 py-2 bg-card rounded-lg border border-transparent focus:border-button outline-none text-sm"
                  />
                  <span className="text-text/40">→</span>
                  <select
                    value={c.targetId}
                    onChange={(e) =>
                      updateChoice(c.id, { targetId: e.target.value })
                    }
                    className="flex-1 px-3 py-2 bg-card rounded-lg border border-transparent focus:border-button outline-none text-sm"
                  >
                    {scenes.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => deleteChoice(c.id)}
                    className="text-text/40 hover:text-red-400"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Player
          scenes={scenes}
          sceneId={playSceneId}
          onNavigate={setPlaySceneId}
          onRestart={startPlay}
        />
      )}

      {/* Модальне вікно експорту */}
      {showExport && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-heading font-bold">Export JSON</h3>
              <button
                onClick={() => setShowExport(false)}
                className="text-text/40 hover:text-text"
              >
                <X size={18} />
              </button>
            </div>
            <textarea
              readOnly
              value={exportJson}
              className="w-full h-64 p-3 bg-background rounded-lg text-xs font-mono border border-primary/20"
            />
            <div className="mt-2">
              <Button variant="primary" onClick={downloadJson}>
                <Download size={15} /> Download
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// // Компонент програвача (режим перегляду)

// function Player({ scenes, sceneId, onNavigate, onRestart }) {
//   const scene = scenes.find((s) => s.id === sceneId) || scenes[0];
//   const isImage = /^https?:\/\//.test(scene.background);
//   const hasCharacterImage =
//     scene.characterImage && /^https?:\/\//.test(scene.characterImage);

//   return (
//     <div
//       className="flex-1 flex flex-col justify-end min-h-[520px] relative"
//       style={{
//         background: isImage
//           ? `url(${scene.background}) center/cover`
//           : scene.background,
//       }}
//     >
//       {/* Спрайт персонажа — тепер з більшим відступом знизу */}
//       {hasCharacterImage && (
//         <img
//           src={scene.characterImage}
//           alt={scene.characterName}
//           className="absolute bottom-56 left-1/2 transform -translate-x-1/2 max-h-64 object-contain z-10"
//         />
//       )}

//       {/* Текстовий блок: більше місця знизу, більший шрифт */}
//       <div
//         className={`mt-auto w-full bg-card/85 backdrop-blur-sm border-t border-primary/20 px-6 py-4 ${
//           hasCharacterImage ? "pt-12" : ""
//         }`}
//         style={{ maxHeight: "70%", overflowY: "auto" }}
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
//                 onClick={() => onNavigate(c.targetId)}
//                 className="px-5 py-2.5 bg-card hover:bg-primary/30 border border-primary/30 rounded-lg text-base font-medium text-text transition-colors"
//               >
//                 {c.label}
//               </button>
//             ))}
//           </div>
//         ) : (
//           <Button variant="primary" onClick={onRestart}>
//             Restart
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// }

function Player({ scenes, sceneId, onNavigate, onRestart }) {
  const scene = scenes.find((s) => s.id === sceneId) || scenes[0];
  const isImage = /^https?:\/\//.test(scene.background);
  const hasCharacterImage =
    scene.characterImage && scene.characterImage.trim().length > 0;

  return (
    <div className="flex flex-col min-h-[520px] bg-background">
      {/* Верхня область: фон сцени + спрайт персонажа */}
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

      {/* Текстова панель завжди знизу */}
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
                onClick={() => onNavigate(c.targetId)}
                className="px-5 py-2.5 bg-card hover:bg-primary/30 border border-primary/30 rounded-lg text-base font-medium text-text transition-colors"
              >
                {c.label}
              </button>
            ))}
          </div>
        ) : (
          <Button variant="primary" onClick={onRestart}>
            Restart
          </Button>
        )}
      </div>
    </div>
  );
}
