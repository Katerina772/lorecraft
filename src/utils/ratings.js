// Отримати всі оцінки
export function getRatings() {
  return JSON.parse(localStorage.getItem("ratings") || "[]");
}

// Зберегти оцінку користувача для квесту
export function saveRating(questId, userId, value) {
  const ratings = getRatings().filter(
    (r) => !(r.questId === questId && r.userId === userId),
  );
  ratings.push({ questId, userId, value });
  localStorage.setItem("ratings", JSON.stringify(ratings));
}

// Отримати середній рейтинг квесту (null, якщо оцінок немає)
export function getAverageRating(questId) {
  const ratings = getRatings().filter((r) => r.questId === questId);
  if (ratings.length === 0) return null;
  const sum = ratings.reduce((acc, r) => acc + r.value, 0);
  return sum / ratings.length;
}

// Отримати оцінку конкретного користувача (або null)
export function getUserRating(questId, userId) {
  const found = getRatings().find(
    (r) => r.questId === questId && r.userId === userId,
  );
  return found ? found.value : null;
}
