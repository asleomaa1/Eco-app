import { useLocation } from "wouter";
import { useAppContext } from "@/context/AppContext";

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();
  const { state, dispatch } = useAppContext();

  const handleTabChange = (tab: string, path: string) => {
    dispatch({ type: "SET_ACTIVE_TAB", payload: tab });
    setLocation(path);
  };

  const getTabClass = (tabName: string) => {
    const isActive = location === (tabName === 'home' ? '/' : `/${tabName}`);
    return `flex flex-col items-center px-3 py-1 ${
      isActive ? "text-primary-500" : "text-gray-500"
    }`;
  };

  return (
    <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full">
      <div className="flex justify-around px-2 py-3">
        <button
          className={getTabClass("home")}
          aria-label="Home"
          onClick={() => handleTabChange("home", "/")}
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
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="text-xs mt-1 font-medium">Home</span>
        </button>
        <button
          className={getTabClass("learn")}
          aria-label="Learn"
          onClick={() => handleTabChange("learn", "/learn")}
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
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <span className="text-xs mt-1">Learn</span>
        </button>
        <button
          className={getTabClass("track")}
          aria-label="Track"
          onClick={() => handleTabChange("track", "/track")}
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
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <polyline points="16 3 12 7 8 3" />
          </svg>
          <span className="text-xs mt-1">Track</span>
        </button>
        <button
          className={getTabClass("community")}
          aria-label="Community"
          onClick={() => handleTabChange("community", "/community")}
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
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className="text-xs mt-1">Community</span>
        </button>
        <button
          className={getTabClass("resources")}
          aria-label="Resources"
          onClick={() => handleTabChange("resources", "/resources")}
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
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
          <span className="text-xs mt-1">Resources</span>
        </button>
      </div>
    </nav>
  );
}
