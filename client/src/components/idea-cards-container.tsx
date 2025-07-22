import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import IdeaCard from "./idea-card";
import { BusinessIdea } from "@shared/schema";
import { SearchFilters } from "@/lib/types";

interface IdeaCardsContainerProps {
  searchFilters: SearchFilters;
  sortBy: string;
}

export default function IdeaCardsContainer({ searchFilters, sortBy }: IdeaCardsContainerProps) {
  const queryParams = new URLSearchParams();
  
  Object.entries(searchFilters).forEach(([key, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach(v => queryParams.append(key, v));
      } else {
        queryParams.set(key, value.toString());
      }
    }
  });

  const { data: ideas = [], isLoading, error } = useQuery<BusinessIdea[]>({
    queryKey: ["/api/ideas", queryParams.toString()],
    queryFn: async () => {
      const url = `/api/ideas${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch ideas');
      }
      return response.json();
    },
  });

  // Sort ideas based on sortBy
  const sortedIdeas = [...ideas].sort((a, b) => {
    switch (sortBy) {
      case 'investment-low':
        return a.investment.min - b.investment.min;
      case 'investment-high':
        return b.investment.max - a.investment.max;
      case 'success-rate':
        return (b.successRate || 0) - (a.successRate || 0);
      case 'recent':
        return b.id - a.id; // Assuming higher ID means more recent
      case 'popular':
      default:
        return (b.views || 0) - (a.views || 0);
    }
  });

  if (isLoading) {
    return (
      <main className="flex-1">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-gray-600">Loading amazing business ideas...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">We couldn't load the business ideas. Please try again.</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </main>
    );
  }

  if (ideas.length === 0) {
    return (
      <main className="flex-1">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Ideas Found</h2>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or search terms to find more business ideas.
          </p>
          <Button onClick={() => window.location.reload()}>Reset Filters</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Showing {sortedIdeas.length} Ideas
          </h2>
          <p className="text-gray-600 mt-1">
            Perfect opportunities for middle-class entrepreneurs
          </p>
        </div>
      </div>

      <div className="masonry">
        {sortedIdeas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-12">
        <Button size="lg" className="px-8">
          Load More Ideas
        </Button>
        <p className="text-gray-500 mt-3 text-sm">
          Showing {sortedIdeas.length} of {sortedIdeas.length} ideas
        </p>
      </div>
    </main>
  );
}
