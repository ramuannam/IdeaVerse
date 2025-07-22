import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterState } from "@/lib/types";

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  onClearFilters: () => void;
  showMobile: boolean;
  onCloseMobile: () => void;
}

export default function FilterSidebar({ 
  filters, 
  setFilters, 
  onClearFilters, 
  showMobile, 
  onCloseMobile 
}: FilterSidebarProps) {
  const updateFilter = (section: keyof FilterState, key: string | keyof FilterState[typeof section], value: boolean) => {
    if (section === 'governmentSupport') {
      setFilters({ ...filters, governmentSupport: value });
    } else {
      setFilters({
        ...filters,
        [section]: {
          ...filters[section],
          [key]: value
        }
      });
    }
  };

  const sidebarContent = (
    <Card className="w-80 flex-shrink-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Filters</CardTitle>
        {showMobile && (
          <Button variant="ghost" size="sm" onClick={onCloseMobile}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Investment Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Investment Range</label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="under50k"
                checked={filters.investmentRange.under50k}
                onCheckedChange={(checked) => updateFilter('investmentRange', 'under50k', !!checked)}
              />
              <label htmlFor="under50k" className="text-sm">Under ₹50,000</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="50k-2L"
                checked={filters.investmentRange['50k-2L']}
                onCheckedChange={(checked) => updateFilter('investmentRange', '50k-2L', !!checked)}
              />
              <label htmlFor="50k-2L" className="text-sm">₹50,000 - ₹2 Lakhs</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="2L-10L"
                checked={filters.investmentRange['2L-10L']}
                onCheckedChange={(checked) => updateFilter('investmentRange', '2L-10L', !!checked)}
              />
              <label htmlFor="2L-10L" className="text-sm">₹2 - ₹10 Lakhs</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="above10L"
                checked={filters.investmentRange.above10L}
                onCheckedChange={(checked) => updateFilter('investmentRange', 'above10L', !!checked)}
              />
              <label htmlFor="above10L" className="text-sm">Above ₹10 Lakhs</label>
            </div>
          </div>
        </div>

        {/* Expertise Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Expertise Required</label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="beginner"
                checked={filters.expertise.beginner}
                onCheckedChange={(checked) => updateFilter('expertise', 'beginner', !!checked)}
              />
              <label htmlFor="beginner" className="text-sm">Beginner Friendly</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="intermediate"
                checked={filters.expertise.intermediate}
                onCheckedChange={(checked) => updateFilter('expertise', 'intermediate', !!checked)}
              />
              <label htmlFor="intermediate" className="text-sm">Some Experience</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="expert"
                checked={filters.expertise.expert}
                onCheckedChange={(checked) => updateFilter('expertise', 'expert', !!checked)}
              />
              <label htmlFor="expert" className="text-sm">Expert Level</label>
            </div>
          </div>
        </div>

        {/* Special Advantages */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Special Advantages</label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="women"
                checked={filters.advantages.women}
                onCheckedChange={(checked) => updateFilter('advantages', 'women', !!checked)}
              />
              <label htmlFor="women" className="text-sm">Women Entrepreneurs</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sc-st"
                checked={filters.advantages['sc-st']}
                onCheckedChange={(checked) => updateFilter('advantages', 'sc-st', !!checked)}
              />
              <label htmlFor="sc-st" className="text-sm">SC/ST Category</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="single-mothers"
                checked={filters.advantages['single-mothers']}
                onCheckedChange={(checked) => updateFilter('advantages', 'single-mothers', !!checked)}
              />
              <label htmlFor="single-mothers" className="text-sm">Single Mothers</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="disabled"
                checked={filters.advantages.disabled}
                onCheckedChange={(checked) => updateFilter('advantages', 'disabled', !!checked)}
              />
              <label htmlFor="disabled" className="text-sm">Specially Abled</label>
            </div>
          </div>
        </div>

        {/* Government Support */}
        <div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="governmentSupport"
              checked={filters.governmentSupport}
              onCheckedChange={(checked) => updateFilter('governmentSupport', 'governmentSupport', !!checked)}
            />
            <label htmlFor="governmentSupport" className="text-sm font-medium">Has Government Subsidies</label>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full" 
          onClick={onClearFilters}
        >
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  );

  if (showMobile) {
    return (
      <div className="fixed inset-0 z-50 lg:hidden">
        <div className="fixed inset-0 bg-black/20" onClick={onCloseMobile} />
        <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl">
          <div className="h-full overflow-y-auto p-4">
            {sidebarContent}
          </div>
        </div>
      </div>
    );
  }

  return (
    <aside className="hidden lg:block sticky top-32">
      {sidebarContent}
    </aside>
  );
}
