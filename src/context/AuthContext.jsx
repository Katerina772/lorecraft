import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Синхронізуємо зміни користувача з localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      // Також оновлюємо в загальному списку користувачів
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  }, [user]);

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === userData.email)) {
      throw new Error("Користувач з таким email вже існує");
    }
    const newUser = {
      ...userData,
      id: Date.now(),
      bio: "",
      avatar: "",
      joined: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setUser(newUser);
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!found) throw new Error("Невірний email або пароль");
    setUser(found);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateProfile = useCallback((updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
