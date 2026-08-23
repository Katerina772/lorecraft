import { DB_KEYS } from "./db";
export async function getGenres() {
  return JSON.parse(localStorage.getItem(DB_KEYS.genres)) || [];
}
