import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Resource } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/context/AppContext";

export default function ResourceLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();
  const { state } = useAppContext();
  const { language } = state.user;

  // Query for all resources or by category if selected
  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ['/api/resources', selectedCategory, language],
    queryFn: () => {
      const url = selectedCategory
        ? `/api/resources?category=${encodeURIComponent(selectedCategory)}&language=${language}`
        : `/api/resources?language=${language}`;
      return fetch(url).then(res => res.json());
    },
  });

  // Query for search results
  const { data: searchResults, isLoading: isSearching } = useQuery<Resource[]>({
    queryKey: ['/api/resources/search', searchQuery, language],
    queryFn: () => {
      return fetch(`/api/resources/search?q=${encodeURIComponent(searchQuery)}&language=${language}`).then(res => res.json());
    },
    enabled: searchQuery.length > 2,
  });

  const resourceCategories = [
    { id: "recycling", icon: "recycle", label: "Recycling Guides", color: "green" },
    { id: "energy", icon: "home-gear", label: "Energy Efficiency", color: "blue" },
    { id: "gardening", icon: "plant", label: "Sustainable Gardening", color: "amber" },
    { id: "eco-products", icon: "shopping-bag", label: "Eco-Friendly Products", color: "red" },
  ];

  const handleDownloadResource = (resourceId: number, url: string, title: string) => {
    // In a real app, this would trigger a file download
    // For now, we'll simulate by opening the URL in a new tab
    window.open(url, '_blank');
    
    toast({
      title: "Resource Download Started",
      description: `Downloading "${title}"`,
    });
  };

  const handleWatchResource = (resourceId: number, url: string, title: string) => {
    // In a real app, this would open a video player
    // For now, we'll simulate by opening the URL in a new tab
    window.open(url, '_blank');
    
    toast({
      title: "Video Opening",
      description: `Opening "${title}" for viewing`,
    });
  };

  const handleOpenGuide = (resourceId: number, url: string, title: string) => {
    // In a real app, this would open the guide in a specialized viewer
    // For now, we'll simulate by opening the URL in a new tab
    window.open(url, '_blank');
    
    toast({
      title: "Guide Opening",
      description: `Opening "${title}"`,
    });
  };

  const handleSearchResources = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const getIconComponent = (iconName: string, colorClass: string) => {
    switch (iconName) {
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
      case "home-gear":
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
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <circle cx="12" cy="12" r="3" />
            <path d="M15 12c0-1.66-1.34-3-3-3" />
          </svg>
        );
      case "plant":
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
            <path d="M7 17.259V6.741a3 3 0 0 1 4.41-2.653c.155.092.305.194.45.307a1 1 0 0 0 1.14-.028 3 3 0 0 1 4.83 2.374v10.518a3 3 0 0 1-4.41 2.653c-.155-.092-.305-.194-.45-.307a1 1 0 0 0-1.14.028A3 3 0 0 1 7 17.259Z" />
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

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-primary-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M8 13h8" />
            <path d="M8 17h4" />
            <path d="M8 9h1" />
          </svg>
        );
      case 'video':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-secondary-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m22 8-6 4 6 4V8Z" />
            <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        );
    }
  };

  // Determine which resources to display
  const displayResources = searchQuery.length > 2 ? searchResults : resources;
  const isLoadingResources = searchQuery.length > 2 ? isSearching : isLoading;

  return (
    <div>
      <h2 className="text-xl font-heading font-semibold mb-4">Resource Library</h2>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Input
          type="text"
          placeholder="Search resources..."
          className="pl-10"
          value={searchQuery}
          onChange={handleSearchResources}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {/* Resource Categories */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {resourceCategories.map((category) => (
          <button
            key={category.id}
            className={`bg-white rounded-lg shadow-sm p-4 flex flex-col items-center border ${
              selectedCategory === category.id
                ? `border-${category.color}-500`
                : "border-gray-100"
            } hover:border-primary-500 transition`}
            onClick={() => {
              setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              );
              setSearchQuery("");
            }}
          >
            <div className={`bg-${category.color}-100 p-3 rounded-full mb-2`}>
              {getIconComponent(category.icon, `text-${category.color}-500`)}
            </div>
            <p className="text-sm font-medium text-gray-800">{category.label}</p>
          </button>
        ))}
      </div>

      {/* Featured Resources */}
      <h3 className="font-heading font-semibold mb-3">
        {searchQuery.length > 2 ? "Search Results" : "Featured Resources"}
      </h3>
      <div className="space-y-4 mb-6">
        {isLoadingResources ? (
          // Loading state
          <>
            {[1, 2].map((i) => (
              <Card key={i} className="flex animate-pulse">
                <div className="bg-gray-200 p-4 flex items-center justify-center w-14">
                  <div className="w-8 h-8 rounded" />
                </div>
                <div className="p-4 flex-1">
                  <div className="flex justify-between">
                    <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
                    <div className="h-4 w-12 bg-gray-100 rounded-full" />
                  </div>
                  <div className="h-4 bg-gray-100 rounded mb-2" />
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>
              </Card>
            ))}
          </>
        ) : !displayResources || displayResources.length === 0 ? (
          // Empty state
          <Card className="p-6 text-center text-gray-500">
            {searchQuery.length > 2
              ? "No resources match your search criteria."
              : "No resources available for this category."}
          </Card>
        ) : (
          // Loaded resources
          displayResources.slice(0, 2).map((resource) => (
            <Card
              key={resource.id}
              className="overflow-hidden border border-gray-100 flex"
            >
              <div className={`bg-${resource.type === 'pdf' ? 'primary' : 'secondary'}-100 p-4 flex items-center justify-center`}>
                {getFileIcon(resource.type)}
              </div>
              <div className="p-4 flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium text-gray-800">{resource.title}</h4>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full uppercase">
                    {resource.type}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1 mb-2">
                  {resource.description}
                </p>
                <button
                  className="text-primary-500 font-medium text-sm flex items-center gap-1"
                  onClick={() => 
                    resource.type === 'video' 
                      ? handleWatchResource(resource.id, resource.url, resource.title) 
                      : handleDownloadResource(resource.id, resource.url, resource.title)
                  }
                >
                  {resource.type === 'video' ? 'Watch' : 'Download'}{' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {resource.type === 'video' ? (
                      <circle cx="12" cy="12" r="10" />
                    ) : (
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    )}
                    {resource.type === 'video' ? (
                      <polygon points="10 8 16 12 10 16 10 8" />
                    ) : (
                      <>
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Recent Guides */}
      {!searchQuery && (
        <>
          <h3 className="font-heading font-semibold mb-3">Recent Guides</h3>
          <div className="space-y-3">
            {isLoading ? (
              // Loading state
              <>
                {[1, 2, 3].map((i) => (
                  <Card
                    key={i}
                    className="p-3 flex justify-between items-center animate-pulse"
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-gray-200 rounded-full mr-3" />
                      <div>
                        <div className="h-4 bg-gray-200 rounded w-40 mb-1" />
                        <div className="h-3 bg-gray-100 rounded w-24" />
                      </div>
                    </div>
                    <div className="w-6 h-6 bg-gray-100 rounded-full" />
                  </Card>
                ))}
              </>
            ) : !resources || resources.length === 0 ? (
              // Empty state
              <Card className="p-4 text-center text-gray-500">
                No recent guides available.
              </Card>
            ) : (
              // Loaded guides (filtering for guides)
              resources
                .filter((r) => r.type === 'article' || r.type === 'guide' || r.type === 'pdf')
                .slice(0, 3)
                .map((resource) => (
                  <Card
                    key={resource.id}
                    className="p-3 border border-gray-100 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary-500 mr-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 3a2 2 0 00-2 2" />
                        <path d="M19 3a2 2 0 012 2" />
                        <path d="M21 19a2 2 0 01-2 2" />
                        <path d="M5 21a2 2 0 01-2-2" />
                        <path d="M9 3h1" />
                        <path d="M9 21h1" />
                        <path d="M14 3h1" />
                        <path d="M14 21h1" />
                        <path d="M3 9v1" />
                        <path d="M21 9v1" />
                        <path d="M3 14v1" />
                        <path d="M21 14v1" />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-800">{resource.title}</p>
                        <p className="text-xs text-gray-500">
                          Added{" "}
                          {new Date(resource.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <button
                      className="text-primary-500 hover:text-primary-600 transition"
                      onClick={() => handleOpenGuide(resource.id, resource.url, resource.title)}
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
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </Card>
                ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
