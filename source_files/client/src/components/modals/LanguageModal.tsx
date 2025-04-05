import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface LanguageModalProps {
  onClose: () => void;
}

export default function LanguageModal({ onClose }: LanguageModalProps) {
  const { state, dispatch } = useAppContext();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "zh", name: "中文" },
  ];

  const handleSelectLanguage = async (languageCode: string) => {
    if (state.user.language === languageCode) {
      onClose();
      return;
    }

    setIsUpdating(true);
    try {
      await apiRequest("PATCH", `/api/users/${state.user.id}/language`, {
        language: languageCode,
      });

      dispatch({
        type: "UPDATE_USER_LANGUAGE",
        payload: languageCode,
      });

      toast({
        title: "Language Updated",
        description: "Your language preference has been updated.",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update language preference.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <Card className="bg-white rounded-xl w-11/12 max-w-md mx-auto overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-heading font-semibold">Select Language</h3>
          <button
            className="text-gray-500"
            onClick={onClose}
            disabled={isUpdating}
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
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <div className="space-y-2">
            {languages.map((language) => (
              <button
                key={language.code}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center justify-between"
                onClick={() => handleSelectLanguage(language.code)}
                disabled={isUpdating}
              >
                <span className="font-medium">{language.name}</span>
                {state.user.language === language.code && (
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
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
