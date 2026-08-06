import Hero from "../components/home/Hero";
import QuestSection from "../components/home/QuestSection";
import { popularQuests, newQuests } from "../data/quests";

export default function Home() {
  return (
    <>
      <Hero />
      <QuestSection
        title="Popular quests"
        icon="🌿"
        quests={popularQuests}
        layout="carousel"
      />
      <QuestSection
        title="New adventures"
        icon="✨"
        quests={newQuests}
        layout="carousel"
      />
    </>
  );
}
