import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  hasNext, 
  hasPrevious, 
  onPageChange 
}: PaginationProps) {
  if (totalPages <= 1) return null;
  
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Show 5 page numbers at most
    let start = Math.max(0, currentPage - Math.floor(showPages / 2));
    let end = Math.min(totalPages - 1, start + showPages - 1);
    
    // Adjust start if we're near the end
    if (end - start + 1 < showPages) {
      start = Math.max(0, end - showPages + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 py-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>
      
      <div className="flex items-center space-x-1">
        {currentPage > 2 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(0)}
            >
              1
            </Button>
            {currentPage > 3 && <span className="px-2 text-gray-500">...</span>}
          </>
        )}
        
        {getPageNumbers().map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page)}
            className="w-10"
          >
            {page + 1}
          </Button>
        ))}
        
        {currentPage < totalPages - 3 && (
          <>
            {currentPage < totalPages - 4 && <span className="px-2 text-gray-500">...</span>}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(totalPages - 1)}
            >
              {totalPages}
            </Button>
          </>
        )}
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className="flex items-center gap-1"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}