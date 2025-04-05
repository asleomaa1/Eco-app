import { useAppContext } from "@/context/AppContext";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

export default function WeeklyChallengeCard() {
  const { state } = useAppContext();
  const { toast } = useToast();
  const { weeklyChallenge } = state;

  const handleChallengeDetails = () => {
    toast({
      title: "Challenge Details",
      description: "This would show the full challenge details in a real app.",
    });
  };

  return (
    <Card className="overflow-hidden border border-blue-100">
      <div className="bg-secondary-500 px-4 py-3 text-white">
        <div className="flex justify-between items-center">
          <h3 className="font-heading font-semibold">Weekly Challenge</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="7" />
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
          </svg>
        </div>
      </div>
      <div className="p-4">
        <p className="font-medium text-gray-800">{weeklyChallenge.title}</p>
        <p className="text-gray-600 mt-1">{weeklyChallenge.description}</p>

        <div className="mt-3">
          <Progress value={weeklyChallenge.progress} className="h-2.5 bg-gray-100" />
          <p className="text-xs text-gray-500 mt-1">
            Progress: {weeklyChallenge.progress}%
          </p>
        </div>

        <div className="mt-4">
          <button
            className="bg-secondary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary-600 transition"
            onClick={handleChallengeDetails}
          >
            Challenge Details
          </button>
        </div>
      </div>
    </Card>
  );
}
