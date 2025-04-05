import { createContext, useContext, useReducer, ReactNode } from "react";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  language: string;
  accessibilitySettings: {
    textSize: number;
    contrast: number;
    screenReader: boolean;
    dyslexiaFont: boolean;
    reduceAnimations: boolean;
  };
};

type UserStats = {
  recycling: string;
  carbonSaved: string;
  waterSaved: string;
  treesPlanted: number;
};

type DailyTip = {
  id: number;
  title: string;
  description: string;
};

type WeeklyChallenge = {
  id: number;
  title: string;
  description: string;
  progress: number;
};

type AppState = {
  user: User;
  userStats: UserStats;
  dailyTip: DailyTip;
  weeklyChallenge: WeeklyChallenge;
  activeTab: string;
};

type AppAction =
  | { type: "SET_USER"; payload: User }
  | { type: "SET_USER_STATS"; payload: UserStats }
  | { type: "SET_DAILY_TIP"; payload: DailyTip }
  | { type: "SET_WEEKLY_CHALLENGE"; payload: WeeklyChallenge }
  | { type: "SET_ACTIVE_TAB"; payload: string }
  | { type: "UPDATE_CHALLENGE_PROGRESS"; payload: number }
  | { type: "UPDATE_USER_LANGUAGE"; payload: string }
  | { type: "UPDATE_ACCESSIBILITY_SETTINGS"; payload: User["accessibilitySettings"] };

const initialState: AppState = {
  user: {
    id: 1,
    name: "Alicia",
    username: "alicia",
    email: "alicia@example.com",
    language: "en",
    accessibilitySettings: {
      textSize: 1,
      contrast: 1,
      screenReader: false,
      dyslexiaFont: false,
      reduceAnimations: false,
    },
  },
  userStats: {
    recycling: "12 kg",
    carbonSaved: "24 kg",
    waterSaved: "140 L",
    treesPlanted: 2,
  },
  dailyTip: {
    id: 1,
    title: "Save water while brushing teeth",
    description: "Turn off the tap while brushing your teeth. This can save up to 8 gallons of water per day, which is 240 gallons per month!",
  },
  weeklyChallenge: {
    id: 1,
    title: "Plastic-Free Week",
    description: "Avoid single-use plastics this week. Use reusable bags, bottles, and containers whenever possible.",
    progress: 45,
  },
  activeTab: "home",
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_USER_STATS":
      return { ...state, userStats: action.payload };
    case "SET_DAILY_TIP":
      return { ...state, dailyTip: action.payload };
    case "SET_WEEKLY_CHALLENGE":
      return { ...state, weeklyChallenge: action.payload };
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload };
    case "UPDATE_CHALLENGE_PROGRESS":
      return {
        ...state,
        weeklyChallenge: {
          ...state.weeklyChallenge,
          progress: action.payload,
        },
      };
    case "UPDATE_USER_LANGUAGE":
      return {
        ...state,
        user: {
          ...state.user,
          language: action.payload,
        },
      };
    case "UPDATE_ACCESSIBILITY_SETTINGS":
      return {
        ...state,
        user: {
          ...state.user,
          accessibilitySettings: action.payload,
        },
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
