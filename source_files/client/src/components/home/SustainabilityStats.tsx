import { useAppContext } from "@/context/AppContext";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function SustainabilityStats() {
  const { state } = useAppContext();
  const { toast } = useToast();
  const { userStats } = state;

  const handleViewAllStats = () => {
    toast({
      title: "View All Stats",
      description: "This would show detailed stats in a real app.",
    });
  };

  return (
    <Card className="overflow-hidden border border-gray-100">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="font-heading font-semibold">Your Impact</h3>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        <div className="text-center p-2">
          <div className="bg-green-100 inline-flex items-center justify-center p-3 rounded-full mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-primary-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 3 21 3 21 8" />
              <line x1="4" y1="20" x2="21" y2="3" />
              <polyline points="21 16 21 21 16 21" />
              <line x1="15" y1="15" x2="21" y2="21" />
              <line x1="4" y1="4" x2="9" y2="9" />
            </svg>
          </div>
          <p className="font-medium">{userStats.recycling}</p>
          <p className="text-sm text-gray-600">Waste Recycled</p>
        </div>
        <div className="text-center p-2">
          <div className="bg-blue-100 inline-flex items-center justify-center p-3 rounded-full mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-secondary-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 15s-2 2.5-2 4a2 2 0 0 0 4 0c0-1.5-2-4-2-4" />
              <path d="M4 15s-2 2.5-2 4a2 2 0 0 0 4 0c0-1.5-2-4-2-4" />
              <path d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0" />
            </svg>
          </div>
          <p className="font-medium">{userStats.carbonSaved}</p>
          <p className="text-sm text-gray-600">CO₂ Saved</p>
        </div>
        <div className="text-center p-2">
          <div className="bg-amber-100 inline-flex items-center justify-center p-3 rounded-full mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-amber-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              <polyline points="16 16 18 18 20 16" />
            </svg>
          </div>
          <p className="font-medium">{userStats.waterSaved}</p>
          <p className="text-sm text-gray-600">Water Saved</p>
        </div>
        <div className="text-center p-2">
          <div className="bg-purple-100 inline-flex items-center justify-center p-3 rounded-full mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-purple-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17.259V6.741a3 3 0 0 1 4.41-2.653c.155.092.305.194.45.307a1 1 0 0 0 1.14-.028 3 3 0 0 1 4.83 2.374v10.518a3 3 0 0 1-4.41 2.653c-.155-.092-.305-.194-.45-.307a1 1 0 0 0-1.14.028A3 3 0 0 1 7 17.259Z" />
            </svg>
          </div>
          <p className="font-medium">{userStats.treesPlanted}</p>
          <p className="text-sm text-gray-600">Trees Planted</p>
        </div>
      </div>
      <div className="px-4 py-3 border-t border-gray-100 text-center">
        <button
          className="text-primary-500 font-medium flex items-center gap-1 mx-auto"
          onClick={handleViewAllStats}
        >
          View detailed impact{" "}
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
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </Card>
  );
}
