import { DB_KEYS } from "./db";
export async function updateProgress(
  userId,
  questId,
  currentSceneId,
  progressPercent,
  isCompleted,
) {
  let progress = JSON.parse(localStorage.getItem(DB_KEYS.progress)) || [];
  const existing = progress.find(
    (p) => p.user_id === userId && p.quest_id === questId,
  );
  if (existing) {
    existing.current_scene_id = currentSceneId;
    existing.progress_percent = progressPercent;
    existing.last_played = new Date().toISOString();
    existing.is_completed = isCompleted;
  } else {
    progress.push({
      id: Date.now(),
      user_id: userId,
      quest_id: questId,
      current_scene_id: currentSceneId,
      progress_percent: progressPercent,
      last_played: new Date().toISOString(),
      is_completed: isCompleted,
    });
  }
  localStorage.setItem(DB_KEYS.progress, JSON.stringify(progress));
}
export async function getProgress(userId) {
  const progress = JSON.parse(localStorage.getItem(DB_KEYS.progress)) || [];
  return progress.filter((p) => p.user_id === userId);
}
