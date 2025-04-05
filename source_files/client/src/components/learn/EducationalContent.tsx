import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Article } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface EducationalContentProps {
  onCategorySelect?: () => void;
  initialCategory?: string;
  initialTopic?: string | null;
}

export default function EducationalContent({ onCategorySelect, initialCategory = "Climate Change", initialTopic }: EducationalContentProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  // Update activeCategory if initialCategory changes (from parent component)
  useEffect(() => {
    setActiveCategory(initialCategory);
    setActiveTag(null);
  }, [initialCategory]);
  
  // Update activeTag if initialTopic changes (from parent component)
  useEffect(() => {
    if (initialTopic) {
      setActiveTag(initialTopic);
    }
  }, [initialTopic]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showArticleDialog, setShowArticleDialog] = useState(false);
  const { toast } = useToast();

  const { data: articles, isLoading, error } = useQuery<Article[]>({
    queryKey: ['/api/articles', activeCategory],
    queryFn: () => fetch(`/api/articles?category=${encodeURIComponent(activeCategory)}`).then(res => res.json()),
  });
  
  // Get the tags from the current articles
  const availableTags = useMemo(() => {
    if (!articles) return [];
    
    const tags = articles
      .flatMap(article => article.tags || [])
      .filter((tag, index, self) => self.indexOf(tag) === index);
    
    return tags;
  }, [articles]);
  
  // Filter articles by tag if a tag is selected
  const filteredArticles = useMemo(() => {
    if (!articles) return [];
    if (!activeTag) return articles;
    
    return articles.filter(article => 
      article.tags && article.tags.includes(activeTag)
    );
  }, [articles, activeTag]);

  const categories = [
    "Climate Change",
    "Biodiversity",
    "Pollution",
    "Sustainable Living",
    "Conservation",
  ];

  // Get category-based image for articles
  const getCategoryImage = (category: string) => {
    const images = {
      "Climate Change": "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&auto=format&fit=crop",
      "Biodiversity": "https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?w=800&auto=format&fit=crop",
      "Pollution": "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&auto=format&fit=crop",
      "Sustainable Living": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop",
      "Conservation": "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=800&auto=format&fit=crop"
    };
    
    return images[category as keyof typeof images] || images["Climate Change"];
  };

  const handleReadArticle = (article: Article) => {
    setSelectedArticle(article);
    setShowArticleDialog(true);
    onCategorySelect?.();
  };

  const handleBookmarkArticle = (article: Article) => {
    toast({
      title: "Article Bookmarked",
      description: `"${article.title}" has been saved to your bookmarks.`,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-heading font-semibold mb-4">
        Environmental Education
      </h2>

      {/* Categories */}
      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`whitespace-nowrap px-4 py-2 rounded-full ${
                activeCategory === category
                  ? "bg-primary-500 text-white"
                  : "bg-white border border-gray-200 text-gray-700"
              } font-medium text-sm`}
              onClick={() => {
                setActiveCategory(category);
                setActiveTag(null); // Reset tag filter when changing category
                onCategorySelect?.();
              }}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Tags filter */}
        {availableTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-gray-500 mr-2 py-1">Filter by topic:</span>
            <button
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                activeTag === null
                  ? "bg-green-100 text-green-800 font-medium"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTag(null)}
            >
              All topics
            </button>
            {availableTags.map((tag) => (
              <button
                key={tag}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  activeTag === tag
                    ? "bg-green-100 text-green-800 font-medium"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Loading state
          <>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="w-full h-48 bg-gray-200" />
                <div className="p-4">
                  <div className="flex gap-2 mb-2">
                    <div className="h-6 w-20 bg-blue-100 rounded" />
                    <div className="h-6 w-20 bg-green-100 rounded" />
                  </div>
                  <div className="h-6 w-3/4 bg-gray-200 mb-2 rounded" />
                  <div className="h-4 bg-gray-100 mb-1 rounded" />
                  <div className="h-4 bg-gray-100 mb-1 rounded" />
                  <div className="h-4 bg-gray-100 mb-4 rounded w-2/3" />
                  <div className="flex justify-between">
                    <div className="h-10 w-24 bg-primary-100 rounded" />
                    <div className="h-10 w-10 bg-gray-100 rounded-full" />
                  </div>
                </div>
              </Card>
            ))}
          </>
        ) : error || !articles ? (
          // Error state
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <Card className="p-6 text-center">
              <p className="text-gray-500">
                Unable to load articles. Please try again later.
              </p>
            </Card>
          </div>
        ) : articles.length === 0 ? (
          // Empty state
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <Card className="p-6 text-center">
              <p className="text-gray-500">
                No articles available for this category yet.
              </p>
            </Card>
          </div>
        ) : filteredArticles.length === 0 && activeTag ? (
          // No results after filtering
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <Card className="p-6 text-center">
              <p className="text-gray-500">
                No articles found with the tag "{activeTag}". Please try another filter.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTag(null)}
                className="mt-4"
              >
                Clear filter
              </Button>
            </Card>
          </div>
        ) : (
          // Loaded articles
          filteredArticles.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden border border-gray-100"
            >
              <div className="w-full h-48 bg-gray-100 overflow-hidden">
                <img 
                  src={getCategoryImage(article.category)} 
                  alt={article.category} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex gap-2 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                    {article.category}
                  </span>
                  {article.tags && article.tags.map((tag, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTag(tag);
                      }}
                      className={`px-2 py-1 ${
                        activeTag === tag
                          ? "bg-green-500 text-white"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      } rounded text-xs font-medium transition-colors`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 line-clamp-3">{article.excerpt}</p>
                <div className="mt-4 flex justify-between items-center">
                  <Button
                    className="bg-primary-500 hover:bg-primary-600"
                    onClick={() => handleReadArticle(article)}
                  >
                    Read More
                  </Button>
                  <button
                    className="text-gray-500 p-2 hover:text-primary-500 transition"
                    aria-label="Bookmark"
                    onClick={() => handleBookmarkArticle(article)}
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
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
      
      {/* Article Dialog */}
      <Dialog open={showArticleDialog} onOpenChange={setShowArticleDialog}>
        {selectedArticle && (
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto sm:max-w-[70vw]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading">
                {selectedArticle.title}
              </DialogTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                  {selectedArticle.category}
                </span>
                {selectedArticle.tags && selectedArticle.tags.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveTag(tag);
                      setShowArticleDialog(false);
                    }}
                    className="px-2 py-1 bg-green-100 text-green-700 hover:bg-green-200 rounded text-xs font-medium transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </DialogHeader>
            <div className="mt-4 mb-6">
              {/* Article Hero Image */}
              <div className="w-full h-56 md:h-72 mb-6 overflow-hidden rounded-md">
                <img 
                  src={getCategoryImage(selectedArticle.category)} 
                  alt={selectedArticle.category} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Article Information */}
              <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
                <Badge variant="outline" className="gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  5 min read
                </Badge>
                
                <Badge variant="outline" className="gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                  {selectedArticle.tags?.[0] || selectedArticle.category}
                </Badge>
                
                <Badge variant="outline" className="gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  Beginner Level
                </Badge>
              </div>
              
              {/* Article Content */}
              <p className="text-gray-700 italic mb-4 text-base">{selectedArticle.excerpt}</p>
              <Separator className="my-4" />
              <div className="space-y-5 text-gray-700">
                {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">{paragraph}</p>
                ))}
              </div>
              
              {/* Content Footer */}
              <div className="bg-gray-50 p-4 rounded-md mt-6">
                <h4 className="font-medium text-sm mb-2">Continue Learning</h4>
                <p className="text-sm text-gray-600">
                  Explore more articles in the "{selectedArticle.category}" category to deepen your knowledge.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button 
                onClick={() => handleBookmarkArticle(selectedArticle)}
                variant="outline"
                className="gap-2"
              >
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
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                Bookmark
              </Button>
              <Button 
                onClick={() => setShowArticleDialog(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
