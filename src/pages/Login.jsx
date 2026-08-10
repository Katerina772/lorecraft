import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    try {
      login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <h1 className="text-3xl font-heading font-bold text-text text-center mb-8">
        Вхід
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label className="block text-sm font-semibold text-text/70 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-card rounded-xl border border-transparent focus:border-button outline-none text-text"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text/70 mb-1">
            Пароль
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-card rounded-xl border border-transparent focus:border-button outline-none text-text"
          />
        </div>
        <Button variant="primary" className="w-full">
          Увійти
        </Button>
      </form>
      <p className="mt-4 text-center text-text/60">
        Немає акаунту?{" "}
        <Link to="/register" className="text-button hover:underline">
          Зареєструватися
        </Link>
      </p>
    </div>
  );
}
