import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Article } from "@shared/schema";
import { useAppContext } from "@/context/AppContext";

export default function LatestArticles() {
  const { state } = useAppContext();
  const { toast } = useToast();
  
  const { data: articles, isLoading, error } = useQuery<Article[]>({
    queryKey: ['/api/articles'],
  });

  const handleViewAllArticles = () => {
    toast({
      title: "View All Articles",
      description: "Navigating to all articles...",
    });
  };

  if (isLoading) {
    return (
      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-heading font-semibold">Latest Articles</h3>
        </div>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <Card key={i} className="flex h-20 animate-pulse">
              <div className="w-20 h-20 bg-gray-200"></div>
              <div className="p-3 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/4"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || !articles) {
    return (
      <div className="mt-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-heading font-semibold">Latest Articles</h3>
        </div>
        <Card className="p-4 text-center text-gray-500">
          Unable to load latest articles. Please try again later.
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-heading font-semibold">Latest Articles</h3>
        <button
          className="text-primary-500 font-medium text-sm"
          onClick={handleViewAllArticles}
        >
          View all
        </button>
      </div>

      <div className="space-y-4">
        {articles.slice(0, 2).map((article) => (
          <Card key={article.id} className="flex overflow-hidden border border-gray-100">
            <div className="w-20 h-20 bg-gray-200 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
                <path d="M7 2v20" />
                <path d="M17 2v20" />
                <path d="M2 12h20" />
                <path d="M2 7h5" />
                <path d="M2 17h5" />
                <path d="M17 17h5" />
                <path d="M17 7h5" />
              </svg>
            </div>
            <div className="p-3 flex-1">
              <h4 className="font-medium text-gray-800 line-clamp-2">
                {article.title}
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(article.publishDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
