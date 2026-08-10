import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Завантажуємо користувача з localStorage при старті
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const register = (userData) => {
    // Перевіряємо, чи існує користувач з таким email
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existing = users.find((u) => u.email === userData.email);
    if (existing) {
      throw new Error("Користувач з таким email вже існує");
    }
    // Зберігаємо нового користувача
    const newUser = { ...userData, id: Date.now() };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    // Автоматично входимо
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!found) {
      throw new Error("Невірний email або пароль");
    }
    setUser(found);
    localStorage.setItem("user", JSON.stringify(found));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
