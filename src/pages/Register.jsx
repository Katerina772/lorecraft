// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import Button from "../components/ui/Button";

// export default function Register() {
//   const { register } = useAuth();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     age: "",
//   });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");

//     if (form.password !== form.confirmPassword) {
//       setError("Паролі не співпадають");
//       return;
//     }
//     if (!form.age || form.age < 0) {
//       setError("Вкажіть коректний вік");
//       return;
//     }

//     try {
//       register({
//         username: form.username,
//         email: form.email,
//         password: form.password,
//         age: parseInt(form.age),
//       });
//       navigate("/");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto px-4 py-20">
//       <h1 className="text-3xl font-heading font-bold text-text text-center mb-8">
//         Реєстрація
//       </h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//         <div>
//           <label className="block text-sm font-semibold text-text/70 mb-1">
//             Ім'я користувача
//           </label>
//           <input
//             name="username"
//             value={form.username}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 bg-card rounded-xl border border-transparent focus:border-button outline-none text-text"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-text/70 mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 bg-card rounded-xl border border-transparent focus:border-button outline-none text-text"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-text/70 mb-1">
//             Вік
//           </label>
//           <input
//             type="number"
//             name="age"
//             value={form.age}
//             onChange={handleChange}
//             required
//             min="1"
//             className="w-full px-4 py-3 bg-card rounded-xl border border-transparent focus:border-button outline-none text-text"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-semibold text-text/70 mb-1">
//             Пароль
//           </label>
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 bg-card rounded-xl border border-transparent focus:border-button outline-none text-text"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-text/70 mb-1">
//             Підтвердження пароля
//           </label>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={form.confirmPassword}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 bg-card rounded-xl border border-transparent focus:border-button outline-none text-text"
//           />
//         </div>
//         <Button variant="primary" className="w-full">
//           Зареєструватися
//         </Button>
//       </form>
//       <p className="mt-4 text-center text-text/60">
//         Вже є акаунт?{" "}
//         <Link to="/login" className="text-button hover:underline">
//           Увійти
//         </Link>
//       </p>
//     </div>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    birth_date: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Паролі не співпадають");
      return;
    }
    if (!form.birth_date) {
      setError("Вкажіть дату народження");
      return;
    }

    // Перевірка, що дата не в майбутньому
    const birthDate = new Date(form.birth_date);
    const today = new Date();
    if (birthDate > today) {
      setError("Дата народження не може бути в майбутньому");
      return;
    }

    try {
      await register({
        username: form.username,
        email: form.email,
        password: form.password,
        birth_date: form.birth_date,
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <h1 className="text-3xl font-heading font-bold text-text text-center mb-8">
        Реєстрація
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label className="block text-sm font-semibold text-text/70 mb-1">
            Ім'я користувача
          </label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-card rounded-xl border border-transparent focus:border-button outline-none text-text"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text/70 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-card rounded-xl border border-transparent focus:border-button outline-none text-text"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text/70 mb-1">
            Дата народження
          </label>
          <input
            type="date"
            name="birth_date"
            value={form.birth_date}
            onChange={handleChange}
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
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-card rounded-xl border border-transparent focus:border-button outline-none text-text"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text/70 mb-1">
            Підтвердження пароля
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-card rounded-xl border border-transparent focus:border-button outline-none text-text"
          />
        </div>
        <Button variant="primary" className="w-full">
          Зареєструватися
        </Button>
      </form>
      <p className="mt-4 text-center text-text/60">
        Вже є акаунт?{" "}
        <Link to="/login" className="text-button hover:underline">
          Увійти
        </Link>
      </p>
    </div>
  );
}
