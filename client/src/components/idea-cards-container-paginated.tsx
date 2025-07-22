import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BusinessIdeaCard from "./business-idea-card";
import Pagination from "./pagination";
import { BusinessIdea, SearchFilters, PaginatedResponse } from "@/lib/types";

interface IdeaCardsContainerProps {
  searchFilters: SearchFilters;
  sortBy: string;
}

export default function IdeaCardsContainer({ searchFilters, sortBy }: IdeaCardsContainerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 6;

  const { data: response, isLoading, error } = useQuery({
    queryKey: ['/api/ideas', searchFilters, sortBy, currentPage],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      // Add search filters
      if (searchFilters.search) params.append('search', searchFilters.search);
      if (searchFilters.category) params.append('category', searchFilters.category);
      if (searchFilters.investmentMin) params.append('minInvestment', searchFilters.investmentMin.toString());
      if (searchFilters.investmentMax) params.append('maxInvestment', searchFilters.investmentMax.toString());
      if (searchFilters.expertise && searchFilters.expertise.length > 0) {
        params.append('expertiseLevel', searchFilters.expertise[0]);
      }
      if (searchFilters.governmentSupport) params.append('governmentSupport', 'true');
      
      // Add pagination
      params.append('page', currentPage.toString());
      params.append('size', pageSize.toString());
      
      const response = await fetch(`http://localhost:8080/api/ideas?${params}`);
      if (!response.ok) throw new Error('Failed to fetch ideas');
      return response.json();
    }
  });

  const ideas: BusinessIdea[] = response?.content || [];
  const totalPages = response?.totalPages || 0;
  const hasNext = response?.hasNext || false;
  const hasPrevious = response?.hasPrevious || false;
  const totalElements = response?.totalElements || 0;

  // Reset to page 0 when filters change
  const handleFilterChange = () => {
    setCurrentPage(0);
  };

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white rounded-lg border-2 p-6 h-80">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="h-5 bg-gray-200 rounded w-20"></div>
                    <div className="h-5 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 text-center py-12">
        <div className="bg-white rounded-lg border-2 border-red-200 p-8">
          <h3 className="text-lg font-semibold text-red-600 mb-2">Error Loading Ideas</h3>
          <p className="text-gray-600">Unable to load business ideas. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (ideas.length === 0) {
    return (
      <div className="flex-1 text-center py-12">
        <div className="bg-white rounded-lg border-2 p-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Ideas Found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters to find more business ideas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      {/* Results summary */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          {totalElements} Business Ideas Found
        </h2>
        <div className="text-sm text-gray-600">
          Showing {(currentPage * pageSize) + 1}-{Math.min((currentPage + 1) * pageSize, totalElements)} of {totalElements}
        </div>
      </div>

      {/* Ideas grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {ideas.map((idea) => (
          <BusinessIdeaCard 
            key={idea.id} 
            idea={idea}
            onBookmark={(id) => console.log('Bookmark toggled:', id)}
            isBookmarked={false}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        onPageChange={handlePageChange}
      />
    </div>
  );
}