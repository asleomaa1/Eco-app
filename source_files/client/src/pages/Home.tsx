import { useAppContext } from "@/context/AppContext";
import DailyTipCard from "@/components/home/DailyTipCard";
import WeeklyChallengeCard from "@/components/home/WeeklyChallengeCard";
import SustainabilityStats from "@/components/home/SustainabilityStats";
import LatestArticles from "@/components/home/LatestArticles";

export default function Home() {
  const { state } = useAppContext();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <section className="mb-6">
        <h2 className="text-xl font-heading font-semibold mb-2">
          Welcome back, {state.user.name}!
        </h2>
        <p className="text-gray-600">Your sustainable actions make a difference.</p>
      </section>

      {/* Daily Tip Card */}
      <DailyTipCard />

      {/* Weekly Challenge Card */}
      <WeeklyChallengeCard />

      {/* Sustainability Stats */}
      <SustainabilityStats />

      {/* Latest Articles */}
      <LatestArticles />
    </div>
  );
}
