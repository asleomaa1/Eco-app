import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TopicGuidesProps {
  category: string;
  onTopicSelect?: (topic: string) => void;
}

interface TopicGuide {
  topic: string;
  description: string;
  icon: React.ReactNode;
}

export default function TopicGuides({ category, onTopicSelect }: TopicGuidesProps) {
  // Define topic guides per category
  const getTopicGuides = (category: string): TopicGuide[] => {
    switch (category) {
      case "Climate Change":
        return [
          {
            topic: "Science",
            description: "Explore the scientific foundations of climate change including greenhouse gas mechanisms, carbon cycle, and atmospheric science.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
            )
          },
          {
            topic: "Impacts",
            description: "Understand how climate change affects ecosystems, weather patterns, agriculture, health, and human communities worldwide.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            )
          },
          {
            topic: "Solutions",
            description: "Discover innovations in renewable energy, conservation practices, policy approaches, and lifestyle changes to mitigate climate change.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            )
          },
          {
            topic: "Policy",
            description: "Learn about global agreements, national policies, carbon pricing mechanisms, and international collaborations addressing climate change.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18"></path>
                <path d="M18.4 7.79A9 9 0 1 0 4.6 19.31L4 16H6a8 8 0 0 1 15.45-1.6"></path>
                <path d="M7 10h3v3"></path>
                <path d="M13 17l6-6"></path>
                <path d="M16 11h2a2 2 0 0 1 2 2v1"></path>
              </svg>
            )
          }
        ];
      case "Biodiversity":
        return [
          {
            topic: "Ecosystems",
            description: "Discover the complex interactions between species and their environments that create Earth's diverse ecosystems.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 9.75s1 1.5 3 1.5 3-1.5 4-1.5 2 1.5 4 1.5 3-1.5 3-1.5"></path>
                <path d="M2 14.75s1 1.5 3 1.5 3-1.5 4-1.5 2 1.5 4 1.5 3-1.5 3-1.5"></path>
                <path d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"></path>
              </svg>
            )
          },
          {
            topic: "Species",
            description: "Explore the incredible diversity of plant and animal species, their adaptations, behaviors, and ecological roles.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
            )
          },
          {
            topic: "Conservation",
            description: "Learn about strategies to protect endangered species, preserve habitats, and maintain genetic diversity.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            )
          },
          {
            topic: "Marine",
            description: "Dive into marine ecosystems, from coral reefs to deep sea habitats, and their unique biodiversity challenges.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 10h18"></path>
                <path d="M12 2v8"></path>
                <path d="M12 18v4"></path>
                <path d="M3 17a5 5 0 0 0 10 0c0-2.76-4.48-5-5-5-2 .76-5 2.24-5 5Z"></path>
                <path d="M19 17a5 5 0 0 1-10 0c0-2.76 4.48-5 5-5 2 .76 5 2.24 5 5Z"></path>
              </svg>
            )
          }
        ];
      case "Pollution":
        return [
          {
            topic: "Air Quality",
            description: "Understand air pollutants, their sources, health impacts, and measurement methods for monitoring air quality.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                <path d="M12 12v9"></path>
                <path d="m8 17 4 4 4-4"></path>
              </svg>
            )
          },
          {
            topic: "Water",
            description: "Explore freshwater and ocean pollution issues including industrial discharge, agricultural runoff, and plastic waste.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v6"></path>
                <path d="M5.636 9.74A9 9 0 1 0 20.1 17h-2"></path>
                <path d="M9 17h9"></path>
                <path d="m16 12-3.5 4.5"></path>
                <path d="M7.5 12h.01"></path>
              </svg>
            )
          },
          {
            topic: "Microplastics",
            description: "Learn about the emerging issue of microplastic pollution in oceans, freshwater, soils, and even the human body.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"></path>
                <path d="M11 12V2"></path>
                <path d="m21 15-3.84 1.5c-1.73.67-3.96-.3-5-2.5-1.39-2.93-3.8-3.97-5.56-3a.65.65 0 0 0-.27.34L3 16"></path>
                <path d="M19 16v6"></path>
                <path d="M15 16v6"></path>
                <path d="M11 16v6"></path>
                <path d="M7 16v6"></path>
                <path d="M3 16v6"></path>
              </svg>
            )
          },
          {
            topic: "Chemicals",
            description: "Discover how industrial chemicals, pesticides, and other toxic substances affect environments and human health.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2v7.31"></path>
                <path d="M14 9.3V1.99"></path>
                <path d="M8.5 2h7"></path>
                <path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path>
                <path d="M5.58 16.5h12.85"></path>
              </svg>
            )
          }
        ];
      case "Sustainable Living":
        return [
          {
            topic: "Food",
            description: "Explore sustainable food choices, local sourcing, plant-based options, and reducing food waste.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 12H3a18.2 18.2 0 0 0 5 10"></path>
                <path d="M16 12h8a18.2 18.2 0 0 1-5 10"></path>
                <path d="M12 2v10"></path>
                <path d="M12 1c-5 9-5 14 0 22"></path>
                <path d="M12 1c5 9 5 14 0 22"></path>
              </svg>
            )
          },
          {
            topic: "Zero Waste",
            description: "Learn strategies for reducing waste through refusing, reusing, recycling, repairing, and composting.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 3-7 7h3v11h4v-7h4v7h4v-11h3l-7-7"></path>
                <path d="M9 13v-1h6v1"></path>
              </svg>
            )
          },
          {
            topic: "Energy",
            description: "Discover home energy efficiency tips, renewable options, and reducing your carbon footprint.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19.66 7A10 10 0 0 0 7.17 3.17a10.26 10.26 0 0 0 0 17.66A10 10 0 0 0 19.66 7"></path>
                <path d="M22 12h-4"></path>
                <path d="M12 2v4"></path>
                <path d="m12 12-4.3-4.3"></path>
                <path d="M12 12a2.12 2.12 0 1 0 3 3 2.12 2.12 0 0 0-3-3Z"></path>
              </svg>
            )
          },
          {
            topic: "Transportation",
            description: "Explore eco-friendly transportation alternatives including public transit, cycling, EVs, and reducing air travel.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="7" cy="17" r="2"></circle>
                <circle cx="17" cy="17" r="2"></circle>
                <path d="M7 12h10"></path>
                <path d="m21 8-4 2-8-1L4 8"></path>
                <path d="M16 17H8"></path>
                <path d="M7 5m13 8V5c0-1.105-.333-2-1.5-2h-5c-1.167 0-1.5.895-1.5 2v8"></path>
              </svg>
            )
          }
        ];
      case "Conservation":
        return [
          {
            topic: "Wildlife",
            description: "Learn about efforts to protect endangered species, combat poaching, and preserve biodiversity.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 16V5c0-1.05.95-2 2-2h14c1.05 0 2 .95 2 2v10c0 1.05-.95 2-2 2h-2"></path>
                <path d="M15 14h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h2"></path>
                <path d="M9 14V3"></path>
                <path d="M3 21c4 0 7-1 7-6"></path>
              </svg>
            )
          },
          {
            topic: "Forests",
            description: "Explore deforestation issues, reforestation efforts, sustainable forestry, and protecting old-growth forests.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 14v6"></path>
                <path d="M9 14v6"></path>
                <path d="M13 14h4a4 4 0 0 0 0-8"></path>
                <path d="M13 6H9a4 4 0 0 0 0 8h4"></path>
              </svg>
            )
          },
          {
            topic: "Oceans",
            description: "Discover marine conservation efforts including protected areas, sustainable fishing, and reducing ocean pollution.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.1 16c2 .5 3.6 0 4.9-1 1.4 1 3 1.5 5 1.5s3.6-.5 5-1.5c1.3 1 2.9 1.5 4.9 1"></path>
                <path d="M3 8.9c2-.5 3.6 0 4.9 1 1.4-1 3-1.5 5-1.5s3.6.5 5 1.5c1.3-1 2.9-1.5 4.9-1"></path>
                <path d="M3 4v16"></path>
                <path d="M21 4v16"></path>
              </svg>
            )
          },
          {
            topic: "Community",
            description: "Learn about community-based conservation, indigenous stewardship, and local environmental activism.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 18a4 4 0 0 0-8 0"></path>
                <circle cx="12" cy="11" r="3"></circle>
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              </svg>
            )
          }
        ];
      default:
        return [];
    }
  };

  const guides = getTopicGuides(category);

  if (guides.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Explore Topics in {category}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {guides.map((guide, index) => (
          <Card 
            key={index} 
            className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onTopicSelect?.(guide.topic)}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-3">{guide.icon}</div>
              <h4 className="font-medium mb-2">{guide.topic}</h4>
              <p className="text-sm text-gray-600">{guide.description}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-3 text-primary-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onTopicSelect?.(guide.topic);
                }}
              >
                Explore articles
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}