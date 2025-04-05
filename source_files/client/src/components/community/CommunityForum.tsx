import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Post } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function CommunityForum() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const { toast } = useToast();

  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ['/api/posts', activeCategory],
    queryFn: () => 
      activeCategory === "All Posts" 
        ? fetch('/api/posts').then(res => res.json())
        : fetch(`/api/posts?category=${encodeURIComponent(activeCategory)}`).then(res => res.json()),
  });

  const forumCategories = [
    "All Posts",
    "Tips & Tricks",
    "Questions",
    "Projects",
    "Success Stories",
  ];

  const handleCreatePost = () => {
    toast({
      title: "Create Post",
      description: "This would open the post creation form in a real app.",
    });
  };

  const handleLikePost = async (postId: number) => {
    try {
      await apiRequest("POST", `/api/posts/${postId}/like`);
      queryClient.invalidateQueries({ queryKey: ['/api/posts'] });
      toast({
        title: "Post Liked",
        description: "Thank you for your feedback!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to like the post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCommentPost = (postId: number) => {
    toast({
      title: "Add Comment",
      description: "This would open the comment form in a real app.",
    });
  };

  const handleSharePost = (postId: number) => {
    toast({
      title: "Share Post",
      description: "This would open sharing options in a real app.",
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-heading font-semibold">Community Forum</h2>
        <Button
          className="bg-primary-500 hover:bg-primary-600"
          onClick={handleCreatePost}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>{" "}
          New Post
        </Button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {forumCategories.map((category) => (
          <button
            key={category}
            className={`whitespace-nowrap px-4 py-2 rounded-full ${
              activeCategory === category
                ? "bg-primary-500 text-white"
                : "bg-white border border-gray-200 text-gray-700"
            } font-medium text-sm`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {isLoading ? (
          // Loading state
          <>
            {[1, 2].map((i) => (
              <Card key={i} className="p-4 animate-pulse">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                  </div>
                  <div className="w-20 h-6 bg-green-100 rounded"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded mb-1"></div>
                <div className="h-4 bg-gray-100 rounded mb-1"></div>
                <div className="h-4 bg-gray-100 rounded mb-3 w-2/3"></div>
                <div className="flex gap-2 mb-3">
                  <div className="h-6 w-20 bg-gray-100 rounded"></div>
                  <div className="h-6 w-20 bg-gray-100 rounded"></div>
                </div>
                <div className="flex justify-between mt-4 pt-3 border-t">
                  <div className="flex gap-4">
                    <div className="h-6 w-16 bg-gray-100 rounded"></div>
                    <div className="h-6 w-16 bg-gray-100 rounded"></div>
                  </div>
                  <div className="h-6 w-8 bg-gray-100 rounded"></div>
                </div>
              </Card>
            ))}
          </>
        ) : error || !posts ? (
          // Error state
          <Card className="p-6 text-center">
            <p className="text-gray-500">
              Unable to load posts. Please try again later.
            </p>
          </Card>
        ) : posts.length === 0 ? (
          // Empty state
          <Card className="p-6 text-center">
            <p className="text-gray-500">
              No posts available for this category yet. Be the first to post!
            </p>
          </Card>
        ) : (
          // Loaded posts
          posts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden border border-gray-100"
            >
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      User #{post.userId}
                    </p>
                    <p className="text-xs text-gray-500">
                      Posted {formatTimeAgo(new Date(post.createdAt))}
                    </p>
                  </div>
                  <span className="ml-auto px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                    {post.category}
                  </span>
                </div>

                <h3 className="font-heading font-semibold text-lg mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-3">{post.content}</p>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2 mb-3">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-4">
                    <button
                      className="flex items-center gap-1 text-gray-500 hover:text-primary-500 transition"
                      onClick={() => handleLikePost(post.id)}
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
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>{" "}
                      <span>{post.likeCount}</span>
                    </button>
                    <button
                      className="flex items-center gap-1 text-gray-500 hover:text-primary-500 transition"
                      onClick={() => handleCommentPost(post.id)}
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
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>{" "}
                      <span>{post.commentCount}</span>
                    </button>
                  </div>
                  <button
                    className="text-gray-500 hover:text-primary-500 transition"
                    onClick={() => handleSharePost(post.id)}
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
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
