const DB_KEYS = {
  users: "db_users",
  quests: "db_quests",
  scenes: "db_scenes",
  choices: "db_choices",
  genres: "db_genres",
  media: "db_media",
  progress: "db_progress",
  ratings: "db_ratings",
  favorites: "db_favorites",
  variables: "db_quest_variables",
};

function initDB() {
  if (!localStorage.getItem(DB_KEYS.users))
    localStorage.setItem(DB_KEYS.users, "[]");
  if (!localStorage.getItem(DB_KEYS.quests))
    localStorage.setItem(DB_KEYS.quests, "[]");
  if (!localStorage.getItem(DB_KEYS.scenes))
    localStorage.setItem(DB_KEYS.scenes, "[]");
  if (!localStorage.getItem(DB_KEYS.choices))
    localStorage.setItem(DB_KEYS.choices, "[]");
  if (!localStorage.getItem(DB_KEYS.media))
    localStorage.setItem(DB_KEYS.media, "[]");
  if (!localStorage.getItem(DB_KEYS.progress))
    localStorage.setItem(DB_KEYS.progress, "[]");
  if (!localStorage.getItem(DB_KEYS.ratings))
    localStorage.setItem(DB_KEYS.ratings, "[]");
  if (!localStorage.getItem(DB_KEYS.favorites))
    localStorage.setItem(DB_KEYS.favorites, "[]");
  // Жанри (початкові)
  const defaultGenres = [
    { id: 1, name: "Fantasy" },
    { id: 2, name: "Horror" },
    { id: 3, name: "Romance" },
    { id: 4, name: "Adventure" },
    { id: 5, name: "Detective" },
    { id: 6, name: "Sci-Fi" },
    { id: 7, name: "Slice of Life" },
    { id: 8, name: "Comedy" },
    { id: 9, name: "Thriller" },
  ];
  if (!localStorage.getItem(DB_KEYS.genres))
    localStorage.setItem(DB_KEYS.genres, JSON.stringify(defaultGenres));
}

initDB();

export { DB_KEYS };
