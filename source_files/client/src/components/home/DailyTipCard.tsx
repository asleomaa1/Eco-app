import { useAppContext } from "@/context/AppContext";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function DailyTipCard() {
  const { state } = useAppContext();
  const { toast } = useToast();
  const { dailyTip } = state;

  const handleSaveTip = () => {
    toast({
      title: "Tip saved!",
      description: "This tip has been saved to your collection.",
    });
  };

  const handleShareTip = () => {
    // In a real app, this would use the Web Share API
    navigator.clipboard.writeText(
      `${dailyTip.title}: ${dailyTip.description} - Shared from EcoGuardians app`
    );
    toast({
      title: "Tip copied to clipboard!",
      description: "Now you can paste and share it with others.",
    });
  };

  return (
    <Card className="overflow-hidden border border-green-100">
      <div className="bg-primary-500 px-4 py-3 text-white">
        <div className="flex justify-between items-center">
          <h3 className="font-heading font-semibold">Daily Eco Tip</h3>
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
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        </div>
      </div>
      <div className="p-4">
        <p className="font-medium text-gray-800">{dailyTip.title}</p>
        <p className="text-gray-600 mt-1">{dailyTip.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <button
            className="text-primary-500 font-medium flex items-center gap-1"
            onClick={handleSaveTip}
          >
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
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>{" "}
            Save tip
          </button>
          <button
            className="text-primary-500 font-medium flex items-center gap-1"
            onClick={handleShareTip}
          >
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
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>{" "}
            Share
          </button>
        </div>
      </div>
    </Card>
  );
}
