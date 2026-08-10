import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { LogOut, User } from "lucide-react"; // додайте до існуючих імпортів

const categories = [
  "Fantasy",
  "Horror",
  "Romance",
  "Adventure",
  "Detective",
  "Sci-Fi",
  "Slice of Life",
  "Comedy",
  "Thriller",
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false); // для мобільного підменю
  const [desktopHover, setDesktopHover] = useState(false); // для десктопного наведення
  const { user, logout } = useAuth();

  return (
    <nav className="bg-card shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Логотип */}
        <Link to="/" className="font-heading font-bold text-2xl text-text">
          LoreCraft
        </Link>

        {/* Десктопна навігація */}
        <div className="hidden md:flex items-center gap-8 text-base font-semibold">
          <Link
            to="/"
            className="text-text hover:text-button transition-colors"
          >
            Home
          </Link>
          <Link
            to="/library"
            className="text-text hover:text-button transition-colors"
          >
            Library
          </Link>

          {/* Категорії з випадаючим меню при наведенні
          <div
            className="relative"
            onMouseEnter={() => setDesktopHover(true)}
            onMouseLeave={() => setDesktopHover(false)}
          >
            <Link
              to="/library"
              className="text-text hover:text-button transition-colors flex items-center gap-1"
            >
              Categories ▾
            </Link>
            {desktopHover && (
              <div className="absolute top-full left-0 mt-2 bg-card rounded-xl shadow-xl p-4 grid grid-cols-2 gap-2 w-64">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/library?genre=${cat}`}
                    className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div> */}

          <Link
            to="/create"
            className="text-text hover:text-button transition-colors"
          >
            Create Quest
          </Link>
          <Link
            to="/community"
            className="text-text hover:text-button transition-colors"
          >
            Community
          </Link>
          <Link
            to="/about"
            className="text-text hover:text-button transition-colors"
          >
            About
          </Link>
        </div>

        {/* Кнопки входу/реєстрації (десктоп) */}
        {/* <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-base font-semibold text-text hover:text-button transition-colors"
          >
            Login
          </Link>
          <Link to="/register">
            <Button variant="primary" className="text-sm px-5 py-2.5">
              Register
            </Button>
          </Link>
        </div> */}

        {user ? (
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/profile"
              className="flex items-center gap-2 text-text hover:text-button transition-colors"
            >
              <User size={18} />
              <span className="text-sm font-medium">{user.username}</span>
            </Link>
            <button
              onClick={logout}
              className="text-text/60 hover:text-red-400 transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="text-base font-semibold text-text hover:text-button transition-colors"
            >
              Login
            </Link>
            <Link to="/register">
              <Button variant="primary" className="text-sm px-5 py-2.5">
                Register
              </Button>
            </Link>
          </div>
        )}

        {/* Бургер-меню (мобільна) */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-text hover:bg-primary/20 transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Мобільне випадаюче меню */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-primary/20 px-4 pb-4">
          <div className="flex flex-col gap-2 pt-4">
            <Link
              to="/"
              className="block py-2 text-lg font-semibold text-text hover:text-button"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/library"
              className="block py-2 text-lg font-semibold text-text hover:text-button"
              onClick={() => setMobileOpen(false)}
            >
              Library
            </Link>

            {/* Категорії з підменю (мобільна версія) */}
            <div>
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex items-center justify-between w-full py-2 text-lg font-semibold text-text hover:text-button"
              >
                Categories
                <svg
                  className={`w-4 h-4 transition-transform ${categoriesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {categoriesOpen && (
                <div className="ml-4 grid grid-cols-2 gap-1 mt-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      to={`/library?genre=${cat}`}
                      className="block py-2 text-base font-medium text-text/80 hover:text-button"
                      onClick={() => {
                        setCategoriesOpen(false);
                        setMobileOpen(false);
                      }}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/create"
              className="block py-2 text-lg font-semibold text-text hover:text-button"
              onClick={() => setMobileOpen(false)}
            >
              Create Quest
            </Link>
            <Link
              to="/community"
              className="block py-2 text-lg font-semibold text-text hover:text-button"
              onClick={() => setMobileOpen(false)}
            >
              Community
            </Link>
            <Link
              to="/about"
              className="block py-2 text-lg font-semibold text-text hover:text-button"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>

            <hr className="border-primary/20 my-2" />
            {/* <div className="flex flex-col gap-3">
              <Link
                to="/login"
                className="block py-2 text-lg font-semibold text-text hover:text-button"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
              <Link to="/register" onClick={() => setMobileOpen(false)}>
                <Button variant="primary" className="w-full text-center">
                  Register
                </Button>
              </Link>
            </div> */}
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block py-2 text-lg font-semibold text-text hover:text-button"
                  onClick={() => setMobileOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/my-library"
                  className="block py-2 text-lg font-semibold text-text hover:text-button"
                  onClick={() => setMobileOpen(false)}
                >
                  My Library
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="block py-2 text-lg font-semibold text-text hover:text-button text-left"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 text-lg font-semibold text-text hover:text-button"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" className="w-full text-center">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
