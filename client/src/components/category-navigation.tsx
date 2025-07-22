import { Bed, MessageCircle, Sun, Rocket, Factory, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategoryNavigationProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onToggleFilters: () => void;
}

const categories = [
  { id: "all", label: "All Ideas", icon: null },
  { id: "lazy", label: "For Lazy People", icon: Bed },
  { id: "talkative", label: "Talkative Women", icon: MessageCircle },
  { id: "early-risers", label: "Early Risers", icon: Sun },
  { id: "unicorn", label: "Unicorn Inspired", icon: Rocket },
  { id: "manufacturing", label: "Manufacturing", icon: Factory },
];

export default function CategoryNavigation({ 
  selectedCategory, 
  setSelectedCategory, 
  sortBy, 
  setSortBy,
  onToggleFilters 
}: CategoryNavigationProps) {
  return (
    <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={onToggleFilters}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <span className="text-gray-600 font-medium hidden md:block">Browse by Category:</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-3 overflow-x-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant="ghost"
                  size="sm"
                  className={`btn-category ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {Icon && <Icon className="h-4 w-4 mr-2" />}
                  {category.label}
                </Button>
              );
            })}
          </div>
          
          <div className="flex items-center space-x-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="investment-low">Lowest Investment</SelectItem>
                <SelectItem value="investment-high">Highest Investment</SelectItem>
                <SelectItem value="success-rate">Success Rate</SelectItem>
                <SelectItem value="recent">Recently Added</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  );
}
