// import { DB_KEYS } from "./db";

// export async function getAverageRating(questId) {
//   const ratings = JSON.parse(localStorage.getItem(DB_KEYS.ratings)) || [];
//   const questRatings = ratings.filter((r) => r.quest_id === questId);
//   if (questRatings.length === 0) return 0;
//   const sum = questRatings.reduce((acc, r) => acc + r.rating, 0);
//   return sum / questRatings.length;
// }
// export async function getUserRating(userId, questId) {
//   const ratings = JSON.parse(localStorage.getItem(DB_KEYS.ratings)) || [];
//   const found = ratings.find(
//     (r) => r.user_id === userId && r.quest_id === questId,
//   );
//   return found ? found.rating : null;
// }
// export async function saveRating(userId, questId, rating) {
//   let ratings = JSON.parse(localStorage.getItem(DB_KEYS.ratings)) || [];
//   ratings = ratings.filter(
//     (r) => !(r.user_id === userId && r.quest_id === questId),
//   );
//   ratings.push({
//     id: Date.now(),
//     user_id: userId,
//     quest_id: questId,
//     rating,
//     created_at: new Date().toISOString(),
//   });
//   localStorage.setItem(DB_KEYS.ratings, JSON.stringify(ratings));
// }

import { DB_KEYS } from "./db";

// Отримати середній рейтинг квесту (обчислюється з ratings)
export async function getAverageRating(questId) {
  const ratings = JSON.parse(localStorage.getItem(DB_KEYS.ratings)) || [];
  const questRatings = ratings.filter((r) => r.quest_id === questId);
  if (questRatings.length === 0) return 0;
  const sum = questRatings.reduce((acc, r) => acc + r.rating, 0);
  return sum / questRatings.length;
}

// Отримати оцінку конкретного користувача для квесту
export async function getUserRating(userId, questId) {
  const ratings = JSON.parse(localStorage.getItem(DB_KEYS.ratings)) || [];
  const found = ratings.find(
    (r) => r.user_id === userId && r.quest_id === questId,
  );
  return found ? found.rating : null;
}

// Зберегти або оновити оцінку користувача
export async function saveRating(userId, questId, rating) {
  let ratings = JSON.parse(localStorage.getItem(DB_KEYS.ratings)) || [];

  // Видаляємо попередню оцінку цього користувача для цього квесту
  ratings = ratings.filter(
    (r) => !(r.user_id === userId && r.quest_id === questId),
  );

  // Додаємо нову оцінку
  ratings.push({
    id: Date.now(),
    user_id: userId,
    quest_id: questId,
    rating,
    created_at: new Date().toISOString(),
  });

  localStorage.setItem(DB_KEYS.ratings, JSON.stringify(ratings));

  // Перераховуємо середній рейтинг
  const questRatings = ratings.filter((r) => r.quest_id === questId);
  const averageRating =
    questRatings.length > 0
      ? questRatings.reduce((acc, r) => acc + r.rating, 0) / questRatings.length
      : 0;

  // Оновлюємо поле average_rating у відповідному квесті
  const quests = JSON.parse(localStorage.getItem(DB_KEYS.quests)) || [];
  const updatedQuests = quests.map((quest) =>
    quest.id === questId ? { ...quest, average_rating: averageRating } : quest,
  );
  localStorage.setItem(DB_KEYS.quests, JSON.stringify(updatedQuests));

  return averageRating; // повертаємо новий середній рейтинг (необов'язково)
}
