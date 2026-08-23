import { DB_KEYS } from "./db";

function getUsers() {
  return JSON.parse(localStorage.getItem(DB_KEYS.users)) || [];
}

function saveUsers(users) {
  localStorage.setItem(DB_KEYS.users, JSON.stringify(users));
}

export async function registerUser(userData) {
  const users = getUsers();
  if (users.find((u) => u.email === userData.email)) {
    throw new Error("Користувач з таким email вже існує");
  }
  const newUser = {
    id: Date.now(),
    username: userData.username,
    email: userData.email,
    password_hash: userData.password, // у реальному API тут буде хеш
    avatar: "",
    description: "",
    birth_date: userData.birth_date, // дата народження
    role: "USER",
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
    is_active: true,
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

export async function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(
    (u) => u.email === email && u.password_hash === password,
  );
  if (!user) throw new Error("Невірний email або пароль");
  user.last_login = new Date().toISOString();
  saveUsers(users.map((u) => (u.id === user.id ? user : u)));
  return user;
}

export async function updateProfile(userId, updates) {
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) throw new Error("Користувача не знайдено");
  users[idx] = { ...users[idx], ...updates };
  saveUsers(users);
  return users[idx];
}

export async function getCurrentUser(userId) {
  const users = getUsers();
  return users.find((u) => u.id === userId) || null;
}
