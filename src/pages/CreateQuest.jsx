import { useState } from "react";
import { ArrowLeft, Save, Globe, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import NovelEditor from "../components/editor/NovelEditor";

const genres = [
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

const ageRatings = ["6+", "12+", "16+", "18+"];

export default function CreateQuest() {
  const [step, setStep] = useState(1); // 1 = форма, 2 = редактор
  const [meta, setMeta] = useState({
    title: "",
    description: "",
    genre: "Fantasy",
    ageRating: "12+",
    cover: "",
  });

  const handleChange = (field, value) => {
    setMeta((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    if (!meta.title.trim()) {
      alert("Please enter a title.");
      return;
    }
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-background">
      {step === 1 ? (
        <div className="max-w-2xl mx-auto px-4 py-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-text/60 hover:text-button mb-8 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>

          <h1 className="text-4xl font-heading font-bold text-text mb-6">
            Create New Quest
          </h1>

          <div className="space-y-6">
            {/* Назва */}
            <div>
              <label className="block text-sm font-semibold text-text/70 mb-2">
                Title
              </label>
              <input
                type="text"
                value={meta.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full px-4 py-3 bg-card rounded-xl border border-transparent focus:border-button outline-none font-body text-text placeholder-text/40"
                placeholder="Enter quest title..."
              />
            </div>

            {/* Опис */}
            <div>
              <label className="block text-sm font-semibold text-text/70 mb-2">
                Description
              </label>
              <textarea
                value={meta.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-card rounded-xl border border-transparent focus:border-button outline-none font-body text-text placeholder-text/40 resize-none"
                placeholder="A short description of your quest..."
              />
            </div>

            {/* Жанр */}
            <div>
              <label className="block text-sm font-semibold text-text/70 mb-2">
                Genre
              </label>
              <select
                value={meta.genre}
                onChange={(e) => handleChange("genre", e.target.value)}
                className="w-full px-4 py-3 bg-card rounded-xl border border-transparent focus:border-button outline-none font-body text-text"
              >
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Вікове обмеження */}
            <div>
              <label className="block text-sm font-semibold text-text/70 mb-2">
                Age Rating
              </label>
              <div className="flex gap-2">
                {ageRatings.map((age) => (
                  <button
                    key={age}
                    onClick={() => handleChange("ageRating", age)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      meta.ageRating === age
                        ? "bg-button text-white"
                        : "bg-card text-text hover:bg-primary/30"
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            {/* Обкладинка (URL) */}
            <div>
              <label className="block text-sm font-semibold text-text/70 mb-2">
                Cover Image URL (optional)
              </label>
              <input
                type="text"
                value={meta.cover}
                onChange={(e) => handleChange("cover", e.target.value)}
                className="w-full px-4 py-3 bg-card rounded-xl border border-transparent focus:border-button outline-none font-body text-text placeholder-text/40"
                placeholder="https://example.com/cover.jpg"
              />
            </div>

            <div className="pt-4">
              <Button
                variant="primary"
                onClick={handleContinue}
                className="w-full"
              >
                Continue to Editor
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <NovelEditor questMeta={meta} onBack={() => setStep(1)} />
      )}
    </div>
  );
}
