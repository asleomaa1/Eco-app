import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "@/context/AppContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function SustainabilityTracker() {
  const { state } = useAppContext();
  const { toast } = useToast();
  const [selectedActivityType, setSelectedActivityType] = useState<string | null>(null);

  const { data: activities, isLoading, error } = useQuery<Activity[]>({
    queryKey: [`/api/users/${state.user.id}/activities`],
  });

  const monthlyData = [
    { month: "Jan", value: 60 },
    { month: "Feb", value: 75 },
    { month: "Mar", value: 65 },
    { month: "Apr", value: 80 },
    { month: "May", value: 72 },
  ];

  const handleLogActivity = () => {
    if (!selectedActivityType) {
      toast({
        title: "Select Activity Type",
        description: "Please select an activity type first",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Activity Logging",
      description: `This would open the ${selectedActivityType} logging form in a real app.`,
    });
  };

  const activityTypes = [
    { id: "transport", icon: "car", label: "Log Transport", color: "green" },
    { id: "recycling", icon: "recycle", label: "Log Recycling", color: "blue" },
    { id: "energy", icon: "lightbulb", label: "Log Energy", color: "amber" },
    {
      id: "consumption",
      icon: "shopping-bag",
      label: "Log Consumption",
      color: "red",
    },
  ];

  const getIconComponent = (iconName: string, color: string) => {
    const colorClass = `text-${color}-500`;
    
    switch (iconName) {
      case "car":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${colorClass}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
            <circle cx="6.5" cy="16.5" r="2.5" />
            <circle cx="16.5" cy="16.5" r="2.5" />
          </svg>
        );
      case "recycle":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${colorClass}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
            <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
            <path d="m14 16-3 3 3 3" />
            <path d="M8.293 13.596 4.425 9.682c-.4-.4-.6-.6-.669-.825a1.18 1.18 0 0 1 0-.652c.07-.225.27-.424.67-.823L7.97 4.58A2.12 2.12 0 0 1 9.5 4h5" />
            <path d="M17.657 6.343 20.5 3.5" />
            <path d="M10.5 8 8 5.5l2.5-2.5" />
            <path d="M14.5 11.5 18 8h-5" />
          </svg>
        );
      case "lightbulb":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${colorClass}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18h6" />
            <path d="M10 22h4" />
            <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
          </svg>
        );
      case "shopping-bag":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${colorClass}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-heading font-semibold mb-4">
        Sustainability Tracker
      </h2>

      {/* Carbon Footprint Card */}
      <Card className="overflow-hidden border border-gray-100 mb-6">
        <div className="bg-secondary-500 px-4 py-3 text-white">
          <div className="flex justify-between items-center">
            <h3 className="font-heading font-semibold">Carbon Footprint</h3>
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
              <path d="M19 15s-2 2.5-2 4a2 2 0 0 0 4 0c0-1.5-2-4-2-4" />
              <path d="M4 15s-2 2.5-2 4a2 2 0 0 0 4 0c0-1.5-2-4-2-4" />
              <path d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0" />
            </svg>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-2xl font-bold text-gray-800">286 kg</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Month</p>
              <p className="text-2xl font-bold text-gray-800">320 kg</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Reduction</p>
              <p className="text-2xl font-bold text-green-500">-11%</p>
            </div>
          </div>

          {/* Simple Graph */}
          <div className="h-40 bg-gray-50 rounded-lg flex items-end p-4 gap-2 mb-4">
            {monthlyData.map((month, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-full bg-blue-${300 + index * 100} rounded-t-sm`}
                  style={{ height: `${month.value}%` }}
                ></div>
                <p className="text-xs mt-1 text-gray-500">{month.month}</p>
              </div>
            ))}
          </div>

          <Button
            className="w-full bg-secondary-500 hover:bg-secondary-600"
            onClick={handleLogActivity}
          >
            Log New Activity
          </Button>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {activityTypes.map((activity) => (
          <button
            key={activity.id}
            className={`bg-white rounded-lg shadow-sm p-4 flex flex-col items-center border ${
              selectedActivityType === activity.id
                ? `border-${activity.color}-500`
                : "border-gray-100"
            }`}
            onClick={() => setSelectedActivityType(activity.id)}
          >
            <div className={`bg-${activity.color}-100 p-3 rounded-full mb-2`}>
              {getIconComponent(activity.icon, activity.color)}
            </div>
            <p className="text-sm font-medium text-gray-800">
              {activity.label}
            </p>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="overflow-hidden border border-gray-100">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="font-heading font-semibold">Recent Activities</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {isLoading ? (
            // Loading state
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 flex items-center animate-pulse">
                  <div className="bg-blue-100 p-2 rounded-full mr-3 w-10 h-10"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                  </div>
                  <div className="h-3 bg-gray-100 rounded w-12"></div>
                </div>
              ))}
            </>
          ) : error || !activities ? (
            // Error state
            <div className="p-4 text-center text-gray-500">
              Unable to load activities. Please try again later.
            </div>
          ) : activities.length === 0 ? (
            // Empty state
            <div className="p-4 text-center text-gray-500">
              No activities logged yet. Start tracking your sustainable actions!
            </div>
          ) : (
            // Loaded activities
            activities.slice(0, 3).map((activity) => (
              <div key={activity.id} className="p-4 flex items-center">
                <div
                  className={`bg-${
                    activity.type === "transport"
                      ? "blue"
                      : activity.type === "recycling"
                      ? "green"
                      : activity.type === "energy"
                      ? "amber"
                      : "red"
                  }-100 p-2 rounded-full mr-3`}
                >
                  {activity.type === "transport" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17h8M8 5a4 4 0 0 1 8 0M6 9h12v7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" />
                    </svg>
                  ) : activity.type === "recycling" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
                      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
                      <path d="m14 16-3 3 3 3" />
                      <path d="M8.293 13.596 4.425 9.682c-.4-.4-.6-.6-.669-.825a1.18 1.18 0 0 1 0-.652c.07-.225.27-.424.67-.823L7.97 4.58A2.12 2.12 0 0 1 9.5 4h5" />
                      <path d="M17.657 6.343 20.5 3.5" />
                      <path d="M10.5 8 8 5.5l2.5-2.5" />
                      <path d="M14.5 11.5 18 8h-5" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${
                        activity.type === "energy"
                          ? "text-amber-500"
                          : "text-red-500"
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {activity.type === "energy" ? (
                        <path d="M5 14h14l-9 7V4h9" />
                      ) : (
                        <>
                          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                          <path d="M3 6h18" />
                          <path d="M16 10a4 4 0 0 1-8 0" />
                        </>
                      )}
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {activity.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Saved {activity.carbonSaved} kg CO₂
                  </p>
                </div>
                <p className="text-xs text-gray-400">
                  {new Date(activity.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
