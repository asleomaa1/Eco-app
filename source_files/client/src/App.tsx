import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Learn from "@/pages/Learn";
import Track from "@/pages/Track";
import Community from "@/pages/Community";
import Resources from "@/pages/Resources";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { useState } from "react";
import LanguageModal from "./components/modals/LanguageModal";
import AccessibilityModal from "./components/modals/AccessibilityModal";
import { useAppContext } from "./context/AppContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/learn" component={Learn} />
      <Route path="/track" component={Track} />
      <Route path="/community" component={Community} />
      <Route path="/resources" component={Resources} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);
  const { state } = useAppContext();

  const handleSettings = () => {
    setIsAccessibilityModalOpen(true);
  };

  const handleSearch = () => {
    // Implement search functionality
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-gray-50 pb-16">
        <Header onSettings={handleSettings} onSearch={handleSearch} />
        
        <div className="flex-grow container mx-auto px-4 py-6">
          <Router />
        </div>
        
        <BottomNavigation />
        
        {isLanguageModalOpen && (
          <LanguageModal onClose={() => setIsLanguageModalOpen(false)} />
        )}
        
        {isAccessibilityModalOpen && (
          <AccessibilityModal onClose={() => setIsAccessibilityModalOpen(false)} />
        )}
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
