import SectionTitle from "../ui/SectionTitle";
import QuestGrid from "../quest/QuestGrid";
import Carousel from "../common/Carousel";
import QuestCard from "../quest/QuestCard";

export default function QuestSection({ title, icon, quests, layout = "grid" }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <SectionTitle icon={icon}>{title}</SectionTitle>
      {layout === "carousel" ? (
        <Carousel
          items={quests}
          renderItem={(quest) => <QuestCard quest={quest} />}
        />
      ) : (
        <QuestGrid quests={quests} />
      )}
    </section>
  );
}
