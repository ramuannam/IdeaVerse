export interface FilterState {
  categories: string[];
  investmentRange: {
    under50k: boolean;
    '50k-2L': boolean;
    '2L-10L': boolean;
    above10L: boolean;
  };
  expertise: {
    beginner: boolean;
    intermediate: boolean;
    expert: boolean;
  };
  advantages: {
    women: boolean;
    'sc-st': boolean;
    'single-mothers': boolean;
    disabled: boolean;
  };
  governmentSupport: boolean;
}

export interface SearchFilters {
  search?: string;
  category?: string;
  investmentMin?: number;
  investmentMax?: number;
  expertise?: string[];
  advantages?: string[];
  governmentSupport?: boolean;
}

export interface BusinessIdea {
  id: number;
  title: string;
  description: string;
  detailedDescription?: string;
  category: string;
  targetDemographic: string;
  minInvestment: number;
  maxInvestment: number;
  expertiseLevel: string;
  requirements?: string;
  successRate: number;
  timeToProfit?: string;
  isTrending: boolean;
  trendReason?: string;
  rating: number;
  viewCount: number;
  imageUrl?: string;
  successStories?: SuccessStory[];
  governmentSupport?: GovernmentSupport[];
  trainingResources?: TrainingResource[];
  investmentDetails?: InvestmentDetail[];
  steps?: ImplementationStep[];
  tags?: Tag[];
}

export interface SuccessStory {
  id: number;
  name: string;
  location?: string;
  story: string;
  earnings?: string;
}

export interface GovernmentSupport {
  id: number;
  supportDetail: string;
}

export interface TrainingResource {
  id: number;
  resource: string;
}

export interface InvestmentDetail {
  id: number;
  detailKey: string;
  detailValue: string;
}

export interface ImplementationStep {
  id: number;
  step: string;
}

export interface Tag {
  id: number;
  tag: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
