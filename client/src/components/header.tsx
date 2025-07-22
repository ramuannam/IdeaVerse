import { Search, Bookmark, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onToggleFilters: () => void;
}

export default function Header({ searchQuery, setSearchQuery, onToggleFilters }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">10000 Ideas</h1>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Search for business ideas, categories, investment levels..."
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={onToggleFilters}>
              <Menu className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Bookmark className="h-5 w-5" />
            </Button>
            <Button className="rounded-full">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
