import { DB_KEYS } from "./db";
export async function getFavorites(userId) {
  const favs = JSON.parse(localStorage.getItem(DB_KEYS.favorites)) || [];
  return favs.filter((f) => f.user_id === userId).map((f) => f.quest_id);
}
export async function addFavorite(userId, questId) {
  const favs = JSON.parse(localStorage.getItem(DB_KEYS.favorites)) || [];
  if (!favs.find((f) => f.user_id === userId && f.quest_id === questId)) {
    favs.push({
      id: Date.now(),
      user_id: userId,
      quest_id: questId,
      added_at: new Date().toISOString(),
    });
    localStorage.setItem(DB_KEYS.favorites, JSON.stringify(favs));
  }
}
export async function removeFavorite(userId, questId) {
  let favs = JSON.parse(localStorage.getItem(DB_KEYS.favorites)) || [];
  favs = favs.filter((f) => !(f.user_id === userId && f.quest_id === questId));
  localStorage.setItem(DB_KEYS.favorites, JSON.stringify(favs));
}
