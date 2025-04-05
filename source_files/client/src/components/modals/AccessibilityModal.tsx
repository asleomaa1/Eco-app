import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/context/AppContext";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AccessibilityModalProps {
  onClose: () => void;
}

export default function AccessibilityModal({ onClose }: AccessibilityModalProps) {
  const { state, dispatch } = useAppContext();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [settings, setSettings] = useState({
    ...state.user.accessibilitySettings,
  });

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      await apiRequest("PATCH", `/api/users/${state.user.id}/accessibility`, settings);

      dispatch({
        type: "UPDATE_ACCESSIBILITY_SETTINGS",
        payload: settings,
      });

      toast({
        title: "Settings Updated",
        description: "Your accessibility settings have been updated.",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update accessibility settings.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleTextSizeChange = (value: number[]) => {
    setSettings({
      ...settings,
      textSize: value[0],
    });
  };

  const handleContrastChange = (value: number[]) => {
    setSettings({
      ...settings,
      contrast: value[0],
    });
  };

  const handleToggleChange = (settingName: keyof typeof settings) => {
    setSettings({
      ...settings,
      [settingName]: !settings[settingName as keyof typeof settings],
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <Card className="bg-white rounded-xl w-11/12 max-w-md mx-auto overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-heading font-semibold">Accessibility Options</h3>
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
        <div className="p-4 space-y-6">
          <div>
            <Label className="text-gray-700 font-medium mb-2 block">
              Text Size
            </Label>
            <div className="flex items-center gap-3">
              <button
                className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"
                onClick={() =>
                  handleTextSizeChange([Math.max(0.5, settings.textSize - 0.1)])
                }
                disabled={settings.textSize <= 0.5}
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
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <Slider
                defaultValue={[settings.textSize]}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={handleTextSizeChange}
                className="flex-1"
              />
              <button
                className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"
                onClick={() =>
                  handleTextSizeChange([Math.min(2, settings.textSize + 0.1)])
                }
                disabled={settings.textSize >= 2}
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
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <Label className="text-gray-700 font-medium mb-2 block">
              Contrast
            </Label>
            <div className="flex items-center gap-3">
              <button
                className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"
                onClick={() =>
                  handleContrastChange([Math.max(0.5, settings.contrast - 0.1)])
                }
                disabled={settings.contrast <= 0.5}
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
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 18a6 6 0 0 0 0-12v12z" />
                </svg>
              </button>
              <Slider
                defaultValue={[settings.contrast]}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={handleContrastChange}
                className="flex-1"
              />
              <button
                className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"
                onClick={() =>
                  handleContrastChange([Math.min(2, settings.contrast + 0.1)])
                }
                disabled={settings.contrast >= 2}
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
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-gray-700 font-medium">
              Screen Reader Support
            </Label>
            <Switch
              checked={settings.screenReader}
              onCheckedChange={() => handleToggleChange("screenReader")}
              aria-label="Toggle screen reader support"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-gray-700 font-medium">
              Dyslexia-Friendly Font
            </Label>
            <Switch
              checked={settings.dyslexiaFont}
              onCheckedChange={() => handleToggleChange("dyslexiaFont")}
              aria-label="Toggle dyslexia-friendly font"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-gray-700 font-medium">
              Reduce Animations
            </Label>
            <Switch
              checked={settings.reduceAnimations}
              onCheckedChange={() => handleToggleChange("reduceAnimations")}
              aria-label="Toggle reduced animations"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition disabled:opacity-50"
              onClick={handleSave}
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
