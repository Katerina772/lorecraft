// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const stored = localStorage.getItem("user");
//     if (stored) setUser(JSON.parse(stored));
//   }, []);

//   // Синхронізуємо зміни користувача з localStorage
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//       // Також оновлюємо в загальному списку користувачів
//       const users = JSON.parse(localStorage.getItem("users") || "[]");
//       const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
//       localStorage.setItem("users", JSON.stringify(updatedUsers));
//     }
//   }, [user]);

//   const register = (userData) => {
//     const users = JSON.parse(localStorage.getItem("users") || "[]");
//     if (users.find((u) => u.email === userData.email)) {
//       throw new Error("Користувач з таким email вже існує");
//     }
//     const newUser = {
//       ...userData,
//       id: Date.now(),
//       bio: "",
//       avatar: "",
//       joined: new Date().toISOString(),
//     };
//     users.push(newUser);
//     localStorage.setItem("users", JSON.stringify(users));
//     setUser(newUser);
//   };

//   const login = (email, password) => {
//     const users = JSON.parse(localStorage.getItem("users") || "[]");
//     const found = users.find(
//       (u) => u.email === email && u.password === password,
//     );
//     if (!found) throw new Error("Невірний email або пароль");
//     setUser(found);
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   const updateProfile = useCallback((updates) => {
//     setUser((prev) => (prev ? { ...prev, ...updates } : null));
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{ user, register, login, logout, updateProfile }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState, useEffect } from "react";
import {
  loginUser,
  registerUser,
  updateProfile,
  getCurrentUser,
} from "../api/auth";

import { DB_KEYS } from "../api/db";
const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const stored = localStorage.getItem("user");
//     if (stored) {
//       const user = JSON.parse(stored);
//       // Оновити дані з "бази" (можна просто залишити)
//       setUser(user);
//     }
//   }, []);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      // Синхронізуємо з db_users
      const dbUsers = JSON.parse(localStorage.getItem(DB_KEYS.users) || "[]");
      if (!dbUsers.find((u) => u.id === parsed.id)) {
        dbUsers.push(parsed);
        localStorage.setItem(DB_KEYS.users, JSON.stringify(dbUsers));
      }
      setUser(parsed);
    }
  }, []);

  const register = async (userData) => {
    const newUser = await registerUser(userData);
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const login = async (email, password) => {
    const loggedUser = await loginUser(email, password);
    setUser(loggedUser);
    localStorage.setItem("user", JSON.stringify(loggedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateProfile = async (updates) => {
    if (!user) return;
    const updated = await updateProfile(user.id, updates);
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
