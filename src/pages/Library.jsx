import { useState, useMemo, useEffect } from "react";
import { Search, User } from "lucide-react";
import { useSearchParams } from "react-router-dom";
// import { allQuests } from "../data/quests";
import { allQuests as staticQuests } from "../data/quests";
import QuestCard from "../components/quest/QuestCard";

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

const categories = ["Popular", "New", "Top Rated"];
const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Highest Rating", value: "rating_desc" },
  { label: "Lowest Rating", value: "rating_asc" },
  { label: "Most Played", value: "plays_desc" },
  { label: "Alphabetical", value: "alpha" },
];

const ITEMS_PER_PAGE = 8;

function getAllQuests() {
  const published = JSON.parse(localStorage.getItem("publishedQuests") || "[]");
  return [...staticQuests, ...published];
}

export default function Library() {
  const allQuests = getAllQuests();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [sort, setSort] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Ініціалізація вибраних жанрів з URL
  const [selectedGenres, setSelectedGenres] = useState(() => {
    const genreParam = searchParams.get("genre");
    const genresParam = searchParams.get("genres");
    if (genreParam) return [genreParam];
    if (genresParam) return genresParam.split(",").filter(Boolean);
    return [];
  });

  // Синхронізація URL при зміні жанрів
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedGenres.length === 1) {
      params.set("genre", selectedGenres[0]);
    } else if (selectedGenres.length > 1) {
      params.set("genres", selectedGenres.join(","));
    }
    // Інші параметри можна додати тут за бажанням
    setSearchParams(params, { replace: true });
  }, [selectedGenres, setSearchParams]);

  // Фільтрація та сортування
  const filteredQuests = useMemo(() => {
    let result = [...allQuests];

    if (searchTitle.trim()) {
      const query = searchTitle.toLowerCase();
      result = result.filter((q) => q.title.toLowerCase().includes(query));
    }

    if (searchAuthor.trim()) {
      const query = searchAuthor.toLowerCase();
      result = result.filter((q) => q.author.toLowerCase().includes(query));
    }

    if (selectedGenres.length > 0) {
      result = result.filter((q) => selectedGenres.includes(q.genre));
    }

    if (activeCategory === "Popular") {
      result = result.filter((q) => q.plays > 1500);
    } else if (activeCategory === "New") {
      result = result.filter((q) => [5, 6, 7, 8].includes(q.id)); // умовно нові
    } else if (activeCategory === "Top Rated") {
      result = result.filter((q) => q.rating >= 4.5);
    }

    switch (sort) {
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      case "oldest":
        result.sort((a, b) => a.id - b.id);
        break;
      case "rating_desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "rating_asc":
        result.sort((a, b) => a.rating - b.rating);
        break;
      case "plays_desc":
        result.sort((a, b) => b.plays - a.plays);
        break;
      case "alpha":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    return result;
  }, [searchTitle, searchAuthor, selectedGenres, activeCategory, sort]);

  const displayedQuests = filteredQuests.slice(0, visibleCount);
  const hasMore = visibleCount < filteredQuests.length;

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
    setVisibleCount(ITEMS_PER_PAGE); // скидаємо до початкової кількості
  };

  const resetVisible = () => setVisibleCount(ITEMS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Банер */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-text mb-3">
          Quest Library
        </h1>
        <p className="text-lg text-text/60 font-body max-w-2xl mx-auto">
          Discover thousands of interactive adventures.
        </p>
      </div>

      {/* Пошукові рядки */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text/40"
          />
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTitle}
            onChange={(e) => {
              setSearchTitle(e.target.value);
              resetVisible();
            }}
            className="w-full pl-10 pr-4 py-3 bg-card rounded-xl border border-transparent focus:border-button outline-none font-body text-text placeholder-text/40"
          />
        </div>
        <div className="relative flex-1">
          <User
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text/40"
          />
          <input
            type="text"
            placeholder="Search author..."
            value={searchAuthor}
            onChange={(e) => {
              setSearchAuthor(e.target.value);
              resetVisible();
            }}
            className="w-full pl-10 pr-4 py-3 bg-card rounded-xl border border-transparent focus:border-button outline-none font-body text-text placeholder-text/40"
          />
        </div>
      </div>

      {/* Панель фільтрів жанрів (кнопки) */}
      <div className="flex flex-wrap gap-2 mb-6">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => toggleGenre(genre)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedGenres.includes(genre)
                ? "bg-button text-white"
                : "bg-card text-text hover:bg-primary/30"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Категорії + сортування */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory((prev) => (prev === cat ? null : cat));
                resetVisible();
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeCategory === cat
                  ? "bg-button text-white"
                  : "bg-card text-text hover:bg-primary/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-text/60">Sort by</span>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              resetVisible();
            }}
            className="bg-card rounded-lg px-3 py-2 text-sm font-medium text-text outline-none border border-transparent focus:border-button"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid карток */}
      {displayedQuests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedQuests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Search size={48} className="mx-auto text-text/20 mb-4" />
          <p className="text-xl font-heading text-text/40 mb-2">
            No quests found
          </p>
          <p className="text-text/30">Try changing your search or filters.</p>
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
            className="px-8 py-3 bg-card hover:bg-primary/30 rounded-full font-semibold text-text transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
