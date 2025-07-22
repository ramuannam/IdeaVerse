import { useState } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import CategoryNavigation from "@/components/category-navigation";
import FilterSidebar from "@/components/filter-sidebar";
import IdeaCardsContainer from "@/components/idea-cards-container-paginated";
import Footer from "@/components/footer";
import { FilterState, SearchFilters } from "@/lib/types";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    investmentRange: {
      under50k: false,
      '50k-2L': false,
      '2L-10L': false,
      above10L: false,
    },
    expertise: {
      beginner: false,
      intermediate: false,
      expert: false,
    },
    advantages: {
      women: false,
      'sc-st': false,
      'single-mothers': false,
      disabled: false,
    },
    governmentSupport: false,
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const searchFilters: SearchFilters = {
    search: searchQuery || undefined,
    category: selectedCategory !== "all" ? selectedCategory : undefined,
    governmentSupport: filters.governmentSupport || undefined,
  };

  // Convert filter state to API parameters
  if (Object.values(filters.investmentRange).some(Boolean)) {
    if (filters.investmentRange.under50k) {
      searchFilters.investmentMax = 50000;
    } else if (filters.investmentRange['50k-2L']) {
      searchFilters.investmentMin = 50000;
      searchFilters.investmentMax = 200000;
    } else if (filters.investmentRange['2L-10L']) {
      searchFilters.investmentMin = 200000;
      searchFilters.investmentMax = 1000000;
    } else if (filters.investmentRange.above10L) {
      searchFilters.investmentMin = 1000000;
    }
  }

  const activeExpertise = Object.entries(filters.expertise)
    .filter(([_, active]) => active)
    .map(([key, _]) => key);
  if (activeExpertise.length > 0) {
    searchFilters.expertise = activeExpertise;
  }

  const activeAdvantages = Object.entries(filters.advantages)
    .filter(([_, active]) => active)
    .map(([key, _]) => key);
  if (activeAdvantages.length > 0) {
    searchFilters.advantages = activeAdvantages;
  }

  const clearFilters = () => {
    setFilters({
      categories: [],
      investmentRange: {
        under50k: false,
        '50k-2L': false,
        '2L-10L': false,
        above10L: false,
      },
      expertise: {
        beginner: false,
        intermediate: false,
        expert: false,
      },
      advantages: {
        women: false,
        'sc-st': false,
        'single-mothers': false,
        disabled: false,
      },
      governmentSupport: false,
    });
    setSelectedCategory("all");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onToggleFilters={() => setShowMobileFilters(!showMobileFilters)}
      />
      <HeroSection />
      <CategoryNavigation 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onToggleFilters={() => setShowMobileFilters(!showMobileFilters)}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <FilterSidebar 
            filters={filters}
            setFilters={setFilters}
            onClearFilters={clearFilters}
            showMobile={showMobileFilters}
            onCloseMobile={() => setShowMobileFilters(false)}
          />
          <IdeaCardsContainer 
            searchFilters={searchFilters}
            sortBy={sortBy}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
