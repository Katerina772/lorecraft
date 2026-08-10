import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Camera, BookOpen, Play, Heart, Edit3, Save, X } from "lucide-react";
import Button from "../components/ui/Button";
import QuestCard from "../components/quest/QuestCard";
import { allQuests } from "../data/quests"; // для демонстрації "створених" квестів (пізніше замінимо на реальні)

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user?.bio || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");

  // Статистика (поки що мокова, пізніше братимемо з даних)
  const stats = {
    created: JSON.parse(localStorage.getItem("userQuests") || "[]").length,
    inProgress:
      JSON.parse(localStorage.getItem("progress") || "{}")[user?.id]?.length ||
      0,
    completed: 3, // приклад
    favorites: JSON.parse(localStorage.getItem("favorites") || "[]").length,
  };

  const handleSave = () => {
    updateProfile({ bio, avatar });
    setIsEditing(false);
  };

  // Отримуємо створені користувачем квести (поки що просто перші 4 з allQuests для вигляду)
  const userQuests = allQuests.slice(0, 2); // тимчасово

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Профільна інформація */}
      <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm mb-10">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Аватар */}
          <div className="relative">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary/30 flex items-center justify-center text-4xl font-heading text-button">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
            )}
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-button text-white p-1 rounded-full">
                <Camera size={16} />
              </button>
            )}
          </div>

          <div className="flex-1 space-y-3">
            <h1 className="text-3xl font-heading font-bold text-text">
              {user?.username}
            </h1>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Коротка інформація про себе..."
                  className="w-full px-4 py-2 bg-background rounded-lg border border-primary/20 outline-none text-text"
                />
                <input
                  type="text"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="URL аватара (необов'язково)"
                  className="w-full px-4 py-2 bg-background rounded-lg border border-primary/20 outline-none text-text"
                />
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    onClick={handleSave}
                    className="flex items-center gap-1"
                  >
                    <Save size={16} /> Зберегти
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-1"
                  >
                    <X size={16} /> Скасувати
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-text/70">
                  {user?.bio || "Інформація не вказана"}
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-button hover:underline text-sm flex items-center gap-1"
                >
                  <Edit3 size={14} /> Редагувати
                </button>
              </>
            )}
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-background rounded-xl p-4 text-center">
            <BookOpen size={24} className="mx-auto text-button mb-2" />
            <p className="text-2xl font-bold text-text">{stats.created}</p>
            <p className="text-sm text-text/60">Створено</p>
          </div>
          <div className="bg-background rounded-xl p-4 text-center">
            <Play size={24} className="mx-auto text-button mb-2" />
            <p className="text-2xl font-bold text-text">{stats.inProgress}</p>
            <p className="text-sm text-text/60">В процесі</p>
          </div>
          <div className="bg-background rounded-xl p-4 text-center">
            <BookOpen size={24} className="mx-auto text-button mb-2" />
            <p className="text-2xl font-bold text-text">{stats.completed}</p>
            <p className="text-sm text-text/60">Завершено</p>
          </div>
          <div className="bg-background rounded-xl p-4 text-center">
            <Heart size={24} className="mx-auto text-button mb-2" />
            <p className="text-2xl font-bold text-text">{stats.favorites}</p>
            <p className="text-sm text-text/60">Улюблене</p>
          </div>
        </div>
      </div>

      {/* Створені квести */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-heading font-semibold text-text">
            Мої квести
          </h2>
          <Link to="/create">
            <Button variant="primary" className="text-sm">
              Створити новий
            </Button>
          </Link>
        </div>
        {userQuests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userQuests.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        ) : (
          <p className="text-text/60">Ви ще не створили жодного квесту.</p>
        )}
      </div>

      {/* Кнопка переходу до особистої бібліотеки */}
      <div className="mt-10 text-center">
        <Link to="/my-library">
          <Button variant="outline" className="px-8 py-3 text-lg">
            Перейти до особистої бібліотеки
          </Button>
        </Link>
      </div>
    </div>
  );
}
