import Hero from "../components/home/Hero";
import QuestSection from "../components/home/QuestSection";
import { popularQuests, newQuests } from "../data/quests";
import { Flame, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero />
      <QuestSection
        title="Popular quests"
        icon={<Flame size={24} />}
        quests={popularQuests}
        layout="carousel"
      />
      <QuestSection
        title="New adventures"
        icon={<Sparkles size={24} />}
        quests={newQuests}
        layout="carousel"
      />
    </>
  );
}
