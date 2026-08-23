// import { DB_KEYS } from "./db";
// import { getGenres } from "./genres";

// function getQuests() {
//   return JSON.parse(localStorage.getItem(DB_KEYS.quests)) || [];
// }
// function getScenes() {
//   return JSON.parse(localStorage.getItem(DB_KEYS.scenes)) || [];
// }
// function getChoices() {
//   return JSON.parse(localStorage.getItem(DB_KEYS.choices)) || [];
// }
// function saveQuests(quests) {
//   localStorage.setItem(DB_KEYS.quests, JSON.stringify(quests));
// }
// function saveScenes(scenes) {
//   localStorage.setItem(DB_KEYS.scenes, JSON.stringify(scenes));
// }
// function saveChoices(choices) {
//   localStorage.setItem(DB_KEYS.choices, JSON.stringify(choices));
// }

// // Отримати квест з усіма сценами та виборами (для редактора)
// export async function getQuestWithScenes(questId) {
//   const quest = getQuests().find((q) => q.id === questId);
//   if (!quest) return null;
//   const scenes = getScenes()
//     .filter((s) => s.quest_id === questId)
//     .sort((a, b) => a.order_number - b.order_number);
//   const scenesWithChoices = scenes.map((scene) => ({
//     ...scene,
//     choices: getChoices()
//       .filter((c) => c.scene_id === scene.id)
//       .map((c) => ({
//         id: c.id,
//         label: c.text,
//         targetId: c.next_scene_id,
//       })),
//   }));
//   // Конвертуємо в формат, зручний для редактора (background, characterImage)
//   const editorScenes = scenesWithChoices.map((s) => ({
//     id: s.id,
//     title: s.title,
//     background:
//       s.background_url || s.background_media_id
//         ? `media:${s.background_media_id}`
//         : "#1e1b2e", // спрощено
//     characterName: s.character_name,
//     characterImage: s.character_media_id ? `media:${s.character_media_id}` : "",
//     text: s.text,
//     isEnding: s.is_ending,
//     endingType: s.ending_type,
//     audio: s.audio_media_id ? `media:${s.audio_media_id}` : "",
//     choices: s.choices,
//   }));
//   return {
//     meta: {
//       id: quest.id,
//       title: quest.title,
//       description: quest.description,
//       genreId: quest.genre_id,
//       ageRating: quest.age_rating,
//       coverMediaId: quest.cover_media_id,
//       status: quest.status,
//     },
//     scenes: editorScenes,
//   };
// }

// // Створити новий квест (мета + сцени + вибори) зі статусом DRAFT
// export async function createQuest(authorId, meta, scenes) {
//   const quests = getQuests();
//   const newQuest = {
//     id: Date.now(),
//     author_id: authorId,
//     genre_id: meta.genreId,
//     title: meta.title,
//     description: meta.description,
//     cover_media_id: meta.coverMediaId || null,
//     age_rating: meta.ageRating,
//     status: meta.status || "DRAFT",
//     average_rating: 0,
//     play_count: 0,
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString(),
//   };
//   quests.push(newQuest);
//   saveQuests(quests);
//   // Зберігаємо сцени та вибори
//   const dbScenes = getScenes();
//   const dbChoices = getChoices();
//   scenes.forEach((scene, index) => {
//     const sceneId = Date.now() + Math.random();
//     dbScenes.push({
//       id: sceneId,
//       quest_id: newQuest.id,
//       title: scene.title,
//       text: scene.text,
//       background_media_id: scene.backgroundMediaId || null,
//       character_name: scene.characterName,
//       character_media_id: scene.characterMediaId || null,
//       audio_media_id: scene.audioMediaId || null,
//       order_number: index,
//       is_ending: scene.isEnding || scene.choices.length === 0,
//       ending_type: scene.endingType || "GOOD",
//     });
//     scene.choices.forEach((choice) => {
//       dbChoices.push({
//         id: Date.now() + Math.random(),
//         scene_id: sceneId,
//         text: choice.label,
//         next_scene_id: choice.targetId, // targetId буде збережено після присвоєння сцен
//       });
//     });
//   });
//   saveScenes(dbScenes);
//   saveChoices(dbChoices);
//   return newQuest;
// }

// // Опублікувати квест (змінити статус на PUBLISHED)
// export async function publishQuest(questId) {
//   const quests = getQuests();
//   const idx = quests.findIndex((q) => q.id === questId);
//   if (idx !== -1) {
//     quests[idx].status = "PUBLISHED";
//     quests[idx].updated_at = new Date().toISOString();
//     saveQuests(quests);
//   }
// }

// // Отримати список опублікованих квестів для каталогу
// export async function getPublishedQuests() {
//   const quests = getQuests().filter((q) => q.status === "PUBLISHED");
//   return quests.map((q) => ({
//     id: q.id,
//     title: q.title,
//     description: q.description,
//     author: null, // ім'я автора буде окремо
//     authorId: q.author_id,
//     genreId: q.genre_id,
//     ageRating: q.age_rating,
//     averageRating: q.average_rating,
//     playCount: q.play_count,
//     coverMediaId: q.cover_media_id,
//     createdAt: q.created_at,
//   }));
// }

import { DB_KEYS } from "./db";
import { getGenres } from "./genres";

// ---------- Допоміжні функції ----------
function getQuests() {
  return JSON.parse(localStorage.getItem(DB_KEYS.quests)) || [];
}
function getScenes() {
  return JSON.parse(localStorage.getItem(DB_KEYS.scenes)) || [];
}
function getChoices() {
  return JSON.parse(localStorage.getItem(DB_KEYS.choices)) || [];
}
function saveQuests(quests) {
  localStorage.setItem(DB_KEYS.quests, JSON.stringify(quests));
}
function saveScenes(scenes) {
  localStorage.setItem(DB_KEYS.scenes, JSON.stringify(scenes));
}
function saveChoices(choices) {
  localStorage.setItem(DB_KEYS.choices, JSON.stringify(choices));
}

// ---------- Отримання квесту зі сценами для редактора ----------
export async function getQuestWithScenes(questId) {
  const quest = getQuests().find((q) => q.id === Number(questId));
  if (!quest) return null;
  const scenes = getScenes()
    .filter((s) => s.quest_id === quest.id)
    .sort((a, b) => a.order_number - b.order_number);
  const editorScenes = scenes.map((scene) => ({
    id: String(scene.id),
    title: scene.title,
    background: scene.background_media_id || "",
    characterName: scene.character_name,
    characterImage: scene.character_media_id || "",
    text: scene.text,
    isEnding: scene.is_ending,
    endingType: scene.ending_type,
    audio: scene.audio_media_id || "",
    choices: getChoices()
      .filter((c) => c.scene_id === scene.id)
      .map((c) => ({
        id: String(c.id),
        label: c.text,
        targetId: String(c.next_scene_id),
      })),
  }));
  return {
    questId: quest.id,
    meta: {
      title: quest.title,
      description: quest.description,
      genreId: quest.genre_id,
      ageRating: quest.age_rating,
      cover: quest.cover_media_id || "",
      status: quest.status,
    },
    scenes: editorScenes,
  };
}

// ---------- Збереження квесту (створення або оновлення) ----------
export async function saveQuest({
  questId = null,
  authorId,
  meta,
  scenes,
  status = "DRAFT",
}) {
  const quests = getQuests();
  let newQuestId;
  if (questId) {
    // Оновлення існуючого квесту
    const idx = quests.findIndex((q) => q.id === questId);
    if (idx === -1) throw new Error("Quest not found");
    quests[idx] = {
      ...quests[idx],
      title: meta.title,
      description: meta.description,
      genre_id: meta.genreId,
      age_rating: meta.ageRating,
      cover_media_id: meta.cover || null,
      status,
      updated_at: new Date().toISOString(),
    };
    newQuestId = questId;
    saveQuests(quests);
    // Видаляємо старі сцени та вибори перед оновленням
    const oldScenes = getScenes().filter((s) => s.quest_id === newQuestId);
    const oldSceneIds = oldScenes.map((s) => s.id);
    const oldChoices = getChoices().filter((c) =>
      oldSceneIds.includes(c.scene_id),
    );
    const newScenes = getScenes().filter((s) => s.quest_id !== newQuestId);
    const newChoices = getChoices().filter(
      (c) => !oldSceneIds.includes(c.scene_id),
    );
    // Вставляємо нові сцени та вибори
    const sceneIdMap = {};
    const dbScenes = [...newScenes];
    const dbChoices = [...newChoices];
    scenes.forEach((scene, index) => {
      const dbSceneId = Date.now() + Math.random();
      sceneIdMap[scene.id] = dbSceneId;
      dbScenes.push({
        id: dbSceneId,
        quest_id: newQuestId,
        title: scene.title,
        text: scene.text,
        background_media_id: scene.background || null,
        character_name: scene.characterName,
        character_media_id: scene.characterImage || null,
        audio_media_id: scene.audio || null,
        order_number: index,
        is_ending: scene.isEnding,
        ending_type: scene.endingType,
      });
    });
    // Додаємо вибори з мапінгом targetId
    scenes.forEach((scene) => {
      scene.choices.forEach((choice) => {
        dbChoices.push({
          id: Date.now() + Math.random(),
          scene_id: sceneIdMap[scene.id],
          text: choice.label,
          next_scene_id: sceneIdMap[choice.targetId],
        });
      });
    });
    saveScenes(dbScenes);
    saveChoices(dbChoices);
  } else {
    // Створення нового квесту
    const newQuest = {
      id: Date.now(),
      author_id: authorId,
      genre_id: meta.genreId,
      title: meta.title,
      description: meta.description,
      cover_media_id: meta.cover || null,
      age_rating: meta.ageRating,
      status,
      average_rating: 0,
      play_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    quests.push(newQuest);
    saveQuests(quests);
    newQuestId = newQuest.id;
    const sceneIdMap = {};
    const dbScenes = getScenes();
    const dbChoices = getChoices();
    scenes.forEach((scene, index) => {
      const dbSceneId = Date.now() + Math.random();
      sceneIdMap[scene.id] = dbSceneId;
      dbScenes.push({
        id: dbSceneId,
        quest_id: newQuestId,
        title: scene.title,
        text: scene.text,
        background_media_id: scene.background || null,
        character_name: scene.characterName,
        character_media_id: scene.characterImage || null,
        audio_media_id: scene.audio || null,
        order_number: index,
        is_ending: scene.isEnding,
        ending_type: scene.endingType,
      });
    });
    scenes.forEach((scene) => {
      scene.choices.forEach((choice) => {
        dbChoices.push({
          id: Date.now() + Math.random(),
          scene_id: sceneIdMap[scene.id],
          text: choice.label,
          next_scene_id: sceneIdMap[choice.targetId],
        });
      });
    });
    saveScenes(dbScenes);
    saveChoices(dbChoices);
  }
  return newQuestId;
}

// ---------- Публікація квесту ----------
export async function publishQuest(questId) {
  const quests = getQuests();
  const idx = quests.findIndex((q) => q.id === questId);
  if (idx !== -1) {
    quests[idx].status = "PUBLISHED";
    quests[idx].updated_at = new Date().toISOString();
    saveQuests(quests);
  }
}

// ---------- Отримання опублікованих квестів для каталогу ----------
// export async function getPublishedQuests() {
//   const quests = getQuests().filter((q) => q.status === "PUBLISHED");
//   const users = JSON.parse(localStorage.getItem(DB_KEYS.users)) || [];
//   return quests.map((q) => {
//     const author = users.find((u) => u.id === q.author_id);
//     return {
//       id: q.id,
//       title: q.title,
//       description: q.description,
//       authorId: q.author_id,
//       authorName: author ? author.username : "Unknown",
//       genreId: q.genre_id,
//       ageRating: q.age_rating,
//       averageRating: q.average_rating,
//       playCount: q.play_count,
//       cover: q.cover_media_id || "",
//       createdAt: q.created_at,
//     };
//   });
// }

export async function getPublishedQuests() {
  const quests = getQuests().filter((q) => q.status === "PUBLISHED");
  const users = JSON.parse(localStorage.getItem(DB_KEYS.users)) || [];
  const genres = await getGenres();
  return quests.map((q) => {
    const author = users.find((u) => u.id === q.author_id);
    const genre = genres.find((g) => g.id === q.genre_id);
    return {
      id: q.id,
      title: q.title,
      description: q.description,
      authorId: q.author_id,
      authorName: author ? author.username : "Unknown",
      genreId: q.genre_id,
      genreName: genre ? genre.name : "",
      ageRating: q.age_rating,
      averageRating: q.average_rating,
      playCount: q.play_count,
      cover: q.cover_media_id || "",
      createdAt: q.created_at,
    };
  });
}

// ---------- Отримання опублікованих квестів автора ----------
export async function getPublishedQuestsByAuthor(authorId) {
  const quests = getQuests().filter(
    (q) => q.author_id === authorId && q.status === "PUBLISHED",
  );
  return quests.map((q) => ({
    id: q.id,
    title: q.title,
    description: q.description,
    genreId: q.genre_id,
    ageRating: q.age_rating,
    averageRating: q.average_rating,
    playCount: q.play_count,
    cover: q.cover_media_id || "",
  }));
}

// ---------- Отримання чернеток автора ----------
export async function getDraftsByAuthor(authorId) {
  const quests = getQuests().filter(
    (q) => q.author_id === authorId && q.status === "DRAFT",
  );
  return quests.map((q) => ({
    draftId: q.id,
    title: q.title,
    description: q.description,
    genreId: q.genre_id,
    ageRating: q.age_rating,
    cover: q.cover_media_id || "",
    updatedAt: q.updated_at,
  }));
}

// ---------- Отримання квесту за ID (для сторінки квесту) ----------
export async function getQuestById(questId) {
  const quest = getQuests().find(
    (q) => q.id === Number(questId) && q.status === "PUBLISHED",
  );
  if (!quest) return null;
  const users = JSON.parse(localStorage.getItem(DB_KEYS.users)) || [];
  const author = users.find((u) => u.id === quest.author_id);
  return {
    id: quest.id,
    title: quest.title,
    description: quest.description,
    authorId: quest.author_id,
    authorName: author ? author.username : "Unknown",
    genreId: quest.genre_id,
    ageRating: quest.age_rating,
    averageRating: quest.average_rating,
    playCount: quest.play_count,
    cover: quest.cover_media_id || "",
    status: quest.status,
    createdAt: quest.created_at,
  };
}

// ---------- Видалення чернетки (опціонально) ----------
export async function deleteQuest(questId) {
  const quests = getQuests().filter((q) => q.id !== questId);
  saveQuests(quests);
  const scenes = getScenes().filter((s) => s.quest_id !== questId);
  saveScenes(scenes);
  const sceneIds = scenes.map((s) => s.id);
  const choices = getChoices().filter((c) => !sceneIds.includes(c.scene_id));
  saveChoices(choices);
}
