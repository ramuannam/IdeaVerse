import { businessIdeas, bookmarks, type BusinessIdea, type InsertBusinessIdea, type Bookmark, type InsertBookmark } from "@shared/schema";

export interface IStorage {
  // Business Ideas
  getAllBusinessIdeas(): Promise<BusinessIdea[]>;
  getBusinessIdeaById(id: number): Promise<BusinessIdea | undefined>;
  getBusinessIdeasByCategory(category: string): Promise<BusinessIdea[]>;
  searchBusinessIdeas(query: string): Promise<BusinessIdea[]>;
  filterBusinessIdeas(filters: {
    categories?: string[];
    investmentRange?: { min?: number; max?: number };
    expertise?: string[];
    specialAdvantages?: string[];
    governmentSupport?: boolean;
  }): Promise<BusinessIdea[]>;
  createBusinessIdea(idea: InsertBusinessIdea): Promise<BusinessIdea>;
  incrementViews(id: number): Promise<void>;

  // Bookmarks
  getUserBookmarks(userId: string): Promise<BusinessIdea[]>;
  addBookmark(bookmark: InsertBookmark): Promise<Bookmark>;
  removeBookmark(userId: string, ideaId: number): Promise<void>;
  isBookmarked(userId: string, ideaId: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private businessIdeas: Map<number, BusinessIdea>;
  private bookmarks: Map<string, Bookmark[]>;
  private currentIdeaId: number;
  private currentBookmarkId: number;

  constructor() {
    this.businessIdeas = new Map();
    this.bookmarks = new Map();
    this.currentIdeaId = 1;
    this.currentBookmarkId = 1;
    this.seedData();
  }

  private seedData() {
    const sampleIdeas: InsertBusinessIdea[] = [
      {
        title: "Home-based Tiffin Service",
        description: "Start a healthy tiffin delivery service from your kitchen. Perfect for working professionals and students.",
        category: "Food & Beverage",
        targetDemographic: "homemakers",
        investment: { min: 25000, max: 75000, currency: "INR" },
        expertise: "Basic Cooking",
        trainingTime: "2-3 weeks",
        monthlyEarning: { min: 20000, max: 60000, currency: "INR" },
        profitMargin: "40-60%",
        successRate: 85,
        timeInvestment: "6-8 hours/day",
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        specialAdvantages: ["Women Friendly", "Home-based", "Flexible Hours"],
        governmentSupport: {
          available: true,
          schemes: ["PMEGP", "Stand-Up India", "Mudra Loan"],
          subsidies: ["25% subsidy for women", "Interest rate subsidy"]
        },
        fundingOptions: ["Mudra Loan", "Personal Savings", "Family Investment"],
        bankSupport: ["SBI", "HDFC", "ICICI - Special schemes for women entrepreneurs"],
        resources: ["Commercial kitchen setup", "Delivery vehicles", "Packaging materials"],
        successStories: [{
          name: "Meera Sharma",
          location: "Mumbai",
          story: "Started with ₹30,000, now serving 200+ customers daily",
          earnings: "₹75,000/month"
        }],
        trainingPrograms: ["Food safety certification", "Business management", "Digital marketing"],
        marketDemand: "High - Growing demand for healthy home-cooked food",
        scalability: "High - Can expand to multiple areas",
        location: "Urban and Semi-urban areas",
        seasonality: "Year-round business",
        competitionLevel: "Medium"
      },
      {
        title: "Social Media Manager for Local Shops",
        description: "Help local businesses grow their online presence. Perfect for women who love talking and connecting with people.",
        category: "Digital Marketing",
        targetDemographic: "talkative women",
        investment: { min: 15000, max: 40000, currency: "INR" },
        expertise: "Basic Social Media",
        trainingTime: "4-6 weeks",
        monthlyEarning: { min: 20000, max: 60000, currency: "INR" },
        profitMargin: "70-80%",
        successRate: 78,
        timeInvestment: "4-6 hours/day",
        imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        specialAdvantages: ["Women Entrepreneurs", "Communication Skills", "Work from Home"],
        governmentSupport: {
          available: true,
          schemes: ["Digital India Initiative", "Skill India", "Women Entrepreneurship"],
          subsidies: ["Free training programs", "Equipment subsidies"]
        },
        fundingOptions: ["Self-funded", "Skill development loans", "Equipment financing"],
        bankSupport: ["Digital India loans", "Equipment financing schemes"],
        resources: ["Laptop/Computer", "High-speed internet", "Design software"],
        successStories: [{
          name: "Priya Patel",
          location: "Pune",
          story: "Manages 12 local businesses, built strong community presence",
          earnings: "₹85,000/month"
        }],
        trainingPrograms: ["Google Digital Marketing", "Facebook Blueprint", "Content creation"],
        marketDemand: "Very High - Every business needs online presence",
        scalability: "Very High - Can serve clients globally",
        location: "Anywhere with internet",
        seasonality: "Year-round business",
        competitionLevel: "Medium to High"
      },
      {
        title: "Morning Fitness Coaching",
        description: "Turn your early rising habit into a profitable fitness business. Train people before their work hours.",
        category: "Health & Fitness",
        targetDemographic: "early risers",
        investment: { min: 30000, max: 80000, currency: "INR" },
        expertise: "Fitness Knowledge",
        trainingTime: "3-6 months certification",
        monthlyEarning: { min: 25000, max: 80000, currency: "INR" },
        profitMargin: "60-75%",
        successRate: 92,
        timeInvestment: "3-4 hours/day (early morning)",
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        specialAdvantages: ["Health & Fitness", "High Demand", "Personal Satisfaction"],
        governmentSupport: {
          available: true,
          schemes: ["PMEGP Loan", "Skill India", "Sports Authority support"],
          subsidies: ["35% subsidy for general category", "Equipment subsidies"]
        },
        fundingOptions: ["PMEGP Loan", "Sports equipment loans", "Personal investment"],
        bankSupport: ["Specialized fitness business loans", "Equipment financing"],
        resources: ["Fitness equipment", "Open space/gym", "Certification"],
        successStories: [{
          name: "Rajesh Kumar",
          location: "Delhi",
          story: "Trains 50+ clients in morning batches, excellent health impact",
          earnings: "₹1,20,000/month"
        }],
        trainingPrograms: ["Fitness trainer certification", "Nutrition courses", "Business management"],
        marketDemand: "Very High - Growing health consciousness",
        scalability: "High - Multiple batches and locations",
        location: "Urban areas with working professionals",
        seasonality: "Year-round with peak in Jan-Mar",
        competitionLevel: "Medium"
      },
      {
        title: "Hyperlocal Grocery Delivery",
        description: "Perfect for people who don't want to leave home much. Deliver groceries within 2km radius of your area.",
        category: "Delivery Services",
        targetDemographic: "lazy people",
        investment: { min: 40000, max: 100000, currency: "INR" },
        expertise: "Basic Business Skills",
        trainingTime: "1-2 weeks",
        monthlyEarning: { min: 30000, max: 75000, currency: "INR" },
        profitMargin: "15-25%",
        successRate: 75,
        timeInvestment: "4-6 hours/day",
        imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        specialAdvantages: ["Minimal Effort", "High Demand", "Scalable"],
        governmentSupport: {
          available: true,
          schemes: ["Startup India", "PMEGP", "Digital India"],
          subsidies: ["Vehicle loans", "Technology subsidies"]
        },
        fundingOptions: ["Vehicle loans", "Working capital loans", "Partner investment"],
        bankSupport: ["Commercial vehicle loans", "Business current accounts"],
        resources: ["Delivery vehicle", "Mobile app", "Storage space"],
        successStories: [{
          name: "Amit Gupta",
          location: "Bangalore",
          story: "Serves 300+ households, minimal physical effort required",
          earnings: "₹95,000/month"
        }],
        trainingPrograms: ["Supply chain management", "Customer service", "Technology training"],
        marketDemand: "Very High - Convenience-driven market",
        scalability: "Very High - Can expand to multiple areas",
        location: "Dense residential areas",
        seasonality: "Year-round with peak during festivals",
        competitionLevel: "High but localized advantage"
      },
      {
        title: "Handmade Jewelry Business",
        description: "Create unique jewelry pieces from home. Sell online and at local exhibitions. Perfect creative outlet that pays.",
        category: "Handicrafts",
        targetDemographic: "creative individuals",
        investment: { min: 20000, max: 60000, currency: "INR" },
        expertise: "Creative + Basic Craft",
        trainingTime: "2-4 months",
        monthlyEarning: { min: 25000, max: 100000, currency: "INR" },
        profitMargin: "60-80%",
        successRate: 68,
        timeInvestment: "5-7 hours/day",
        imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        specialAdvantages: ["Women Entrepreneurs", "Creative Work", "High Profit Margin", "Export Potential"],
        governmentSupport: {
          available: true,
          schemes: ["Mudra Loan", "Stand-Up India", "Handicraft Development"],
          subsidies: ["Women entrepreneur subsidies", "Export promotion"]
        },
        fundingOptions: ["Mudra Loan", "Handicraft board loans", "Self-funded"],
        bankSupport: ["Women entrepreneur schemes", "Export financing"],
        resources: ["Raw materials", "Tools", "Packaging", "Online platforms"],
        successStories: [{
          name: "Meera Rajasthani",
          location: "Jaipur",
          story: "Exports to 5 countries, started from local exhibitions",
          earnings: "₹1,80,000/month"
        }],
        trainingPrograms: ["Jewelry making courses", "Design software", "Export procedures"],
        marketDemand: "High - Growing fashion jewelry market",
        scalability: "High - Online and export opportunities",
        location: "Anywhere - online business potential",
        seasonality: "Peak during festivals and wedding seasons",
        competitionLevel: "Medium - uniqueness is key"
      },
      {
        title: "Online Subject Tutoring",
        description: "Teach your favorite subjects online. Flexible hours, work from home, help students succeed academically.",
        category: "Education",
        targetDemographic: "educators",
        investment: { min: 10000, max: 30000, currency: "INR" },
        expertise: "Subject Knowledge",
        trainingTime: "2-4 weeks",
        monthlyEarning: { min: 20000, max: 80000, currency: "INR" },
        profitMargin: "80-90%",
        successRate: 88,
        timeInvestment: "3-6 hours/day",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        specialAdvantages: ["Work from Home", "Flexible Hours", "High Demand"],
        governmentSupport: {
          available: true,
          schemes: ["Digital India", "Skill India", "Education Technology"],
          subsidies: ["Equipment subsidies", "Internet connectivity support"]
        },
        fundingOptions: ["Self-funded", "Equipment loans", "Platform partnerships"],
        bankSupport: ["Education loans for setup", "Technology financing"],
        resources: ["Computer/Laptop", "High-speed internet", "Teaching materials"],
        successStories: [{
          name: "Dr. Sharma",
          location: "Chennai",
          story: "Teaches 150+ students across India, flexible schedule",
          earnings: "₹1,50,000/month"
        }],
        trainingPrograms: ["Online teaching certification", "Technology training", "Content creation"],
        marketDemand: "Very High - Growing online education market",
        scalability: "Very High - Can teach unlimited students",
        location: "Anywhere with internet",
        seasonality: "Year-round with exam season peaks",
        competitionLevel: "High but subject specialization helps"
      },
      {
        title: "Organic Vegetable Farming",
        description: "Start small-scale organic farming. High demand for chemical-free vegetables. Can be started even with small land.",
        category: "Agriculture",
        targetDemographic: "farmers",
        investment: { min: 100000, max: 300000, currency: "INR" },
        expertise: "Basic Farming",
        trainingTime: "6-12 months",
        monthlyEarning: { min: 40000, max: 120000, currency: "INR" },
        profitMargin: "150-200% annually",
        successRate: 76,
        timeInvestment: "8-10 hours/day",
        landRequired: "1-5 acres",
        roi: "150-200% annually",
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        specialAdvantages: ["Sustainable", "High Profit", "Export Ready"],
        governmentSupport: {
          available: true,
          schemes: ["PM-KISAN", "Organic Certification", "PMFBY"],
          subsidies: ["Drip irrigation subsidies", "Organic certification support"]
        },
        fundingOptions: ["KCC loans", "Agriculture loans", "Government schemes"],
        bankSupport: ["Kisan Credit Card", "Agriculture term loans", "Crop insurance"],
        resources: ["Land", "Seeds", "Irrigation", "Organic inputs"],
        successStories: [{
          name: "Ravi Farmer",
          location: "Punjab",
          story: "Converted 3 acres to organic, supplies to major cities",
          earnings: "₹2,00,000/month"
        }],
        trainingPrograms: ["Organic farming techniques", "Certification process", "Marketing"],
        marketDemand: "Very High - 25% YoY growth",
        scalability: "High - Can expand acreage and crops",
        location: "Rural and peri-urban areas",
        seasonality: "Seasonal crops with year-round planning",
        competitionLevel: "Low to Medium"
      },
      {
        title: "Digital Marketing Consultant",
        description: "Help businesses grow online like unicorn startups do. Learn from successful companies and implement strategies.",
        category: "Consulting",
        targetDemographic: "tech-savvy individuals",
        investment: { min: 25000, max: 75000, currency: "INR" },
        expertise: "Digital Marketing",
        trainingTime: "3-6 months",
        monthlyEarning: { min: 50000, max: 200000, currency: "INR" },
        profitMargin: "75-85%",
        successRate: 82,
        timeInvestment: "6-8 hours/day",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        specialAdvantages: ["High Growth", "Scalable", "Remote Work"],
        governmentSupport: {
          available: true,
          schemes: ["Digital India", "Startup India", "Skill India"],
          subsidies: ["Technology infrastructure support", "Training subsidies"]
        },
        fundingOptions: ["Self-funded", "Equipment loans", "Skill development financing"],
        bankSupport: ["Business loans for consultancy", "Equipment financing"],
        resources: ["Computer", "Marketing tools", "Certification"],
        successStories: [{
          name: "Neha Digital",
          location: "Hyderabad",
          story: "Helps 20+ businesses, learned from unicorn strategies",
          earnings: "₹3,50,000/month"
        }],
        trainingPrograms: ["Google certification", "Facebook Blueprint", "Analytics training"],
        marketDemand: "Very High - Every business needs digital presence",
        scalability: "Very High - Global client potential",
        location: "Anywhere with internet",
        seasonality: "Year-round business",
        competitionLevel: "High but specialization helps"
      }
    ];

    sampleIdeas.forEach(idea => {
      this.createBusinessIdea(idea);
    });
  }

  async getAllBusinessIdeas(): Promise<BusinessIdea[]> {
    return Array.from(this.businessIdeas.values());
  }

  async getBusinessIdeaById(id: number): Promise<BusinessIdea | undefined> {
    return this.businessIdeas.get(id);
  }

  async getBusinessIdeasByCategory(category: string): Promise<BusinessIdea[]> {
    return Array.from(this.businessIdeas.values()).filter(
      idea => idea.category.toLowerCase() === category.toLowerCase()
    );
  }

  async searchBusinessIdeas(query: string): Promise<BusinessIdea[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.businessIdeas.values()).filter(
      idea => 
        idea.title.toLowerCase().includes(lowercaseQuery) ||
        idea.description.toLowerCase().includes(lowercaseQuery) ||
        idea.category.toLowerCase().includes(lowercaseQuery) ||
        idea.targetDemographic?.toLowerCase().includes(lowercaseQuery)
    );
  }

  async filterBusinessIdeas(filters: {
    categories?: string[];
    investmentRange?: { min?: number; max?: number };
    expertise?: string[];
    specialAdvantages?: string[];
    governmentSupport?: boolean;
  }): Promise<BusinessIdea[]> {
    let ideas = Array.from(this.businessIdeas.values());

    if (filters.categories && filters.categories.length > 0) {
      ideas = ideas.filter(idea => 
        filters.categories!.some(cat => 
          idea.category.toLowerCase().includes(cat.toLowerCase()) ||
          idea.targetDemographic?.toLowerCase().includes(cat.toLowerCase())
        )
      );
    }

    if (filters.investmentRange) {
      const { min, max } = filters.investmentRange;
      ideas = ideas.filter(idea => {
        if (min !== undefined && idea.investment.max < min) return false;
        if (max !== undefined && idea.investment.min > max) return false;
        return true;
      });
    }

    if (filters.expertise && filters.expertise.length > 0) {
      ideas = ideas.filter(idea => 
        filters.expertise!.some(exp => 
          idea.expertise.toLowerCase().includes(exp.toLowerCase())
        )
      );
    }

    if (filters.specialAdvantages && filters.specialAdvantages.length > 0) {
      ideas = ideas.filter(idea => 
        idea.specialAdvantages?.some(advantage => 
          filters.specialAdvantages!.some(filter => 
            advantage.toLowerCase().includes(filter.toLowerCase())
          )
        )
      );
    }

    if (filters.governmentSupport !== undefined) {
      ideas = ideas.filter(idea => 
        idea.governmentSupport?.available === filters.governmentSupport
      );
    }

    return ideas;
  }

  async createBusinessIdea(insertIdea: InsertBusinessIdea): Promise<BusinessIdea> {
    const id = this.currentIdeaId++;
    const idea: BusinessIdea = { 
      ...insertIdea, 
      id,
      views: 0,
      rating: Math.floor(Math.random() * 50) + 45, // Random rating between 4.5-5.0
      location: insertIdea.location || null
    };
    this.businessIdeas.set(id, idea);
    return idea;
  }

  async incrementViews(id: number): Promise<void> {
    const idea = this.businessIdeas.get(id);
    if (idea) {
      idea.views = (idea.views || 0) + 1;
      this.businessIdeas.set(id, idea);
    }
  }

  async getUserBookmarks(userId: string): Promise<BusinessIdea[]> {
    const userBookmarks = this.bookmarks.get(userId) || [];
    const bookmarkedIdeas: BusinessIdea[] = [];
    
    for (const bookmark of userBookmarks) {
      const idea = this.businessIdeas.get(bookmark.ideaId);
      if (idea) {
        bookmarkedIdeas.push(idea);
      }
    }
    
    return bookmarkedIdeas;
  }

  async addBookmark(insertBookmark: InsertBookmark): Promise<Bookmark> {
    const id = this.currentBookmarkId++;
    const bookmark: Bookmark = { ...insertBookmark, id };
    
    const userBookmarks = this.bookmarks.get(insertBookmark.userId) || [];
    userBookmarks.push(bookmark);
    this.bookmarks.set(insertBookmark.userId, userBookmarks);
    
    return bookmark;
  }

  async removeBookmark(userId: string, ideaId: number): Promise<void> {
    const userBookmarks = this.bookmarks.get(userId) || [];
    const filteredBookmarks = userBookmarks.filter(b => b.ideaId !== ideaId);
    this.bookmarks.set(userId, filteredBookmarks);
  }

  async isBookmarked(userId: string, ideaId: number): Promise<boolean> {
    const userBookmarks = this.bookmarks.get(userId) || [];
    return userBookmarks.some(b => b.ideaId === ideaId);
  }
}

export const storage = new MemStorage();
