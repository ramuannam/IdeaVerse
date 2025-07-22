import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all business ideas with optional filtering
  app.get("/api/ideas", async (req, res) => {
    try {
      const { 
        category, 
        search, 
        investmentMin, 
        investmentMax,
        expertise,
        advantages,
        governmentSupport 
      } = req.query;

      let ideas;

      if (search) {
        ideas = await storage.searchBusinessIdeas(search as string);
      } else if (category && category !== 'all') {
        ideas = await storage.getBusinessIdeasByCategory(category as string);
      } else {
        // Apply filters
        const filters: any = {};
        
        if (category && category !== 'all') {
          filters.categories = [category as string];
        }
        
        if (investmentMin || investmentMax) {
          filters.investmentRange = {};
          if (investmentMin) filters.investmentRange.min = parseInt(investmentMin as string);
          if (investmentMax) filters.investmentRange.max = parseInt(investmentMax as string);
        }
        
        if (expertise) {
          filters.expertise = Array.isArray(expertise) ? expertise : [expertise];
        }
        
        if (advantages) {
          filters.specialAdvantages = Array.isArray(advantages) ? advantages : [advantages];
        }
        
        if (governmentSupport) {
          filters.governmentSupport = governmentSupport === 'true';
        }

        if (Object.keys(filters).length > 0) {
          ideas = await storage.filterBusinessIdeas(filters);
        } else {
          ideas = await storage.getAllBusinessIdeas();
        }
      }

      res.json(ideas);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch business ideas" });
    }
  });

  // Get specific business idea by ID
  app.get("/api/ideas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const idea = await storage.getBusinessIdeaById(id);
      
      if (!idea) {
        return res.status(404).json({ message: "Business idea not found" });
      }

      // Increment view count
      await storage.incrementViews(id);
      
      res.json(idea);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch business idea" });
    }
  });

  // Get user bookmarks
  app.get("/api/bookmarks/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const bookmarks = await storage.getUserBookmarks(userId);
      res.json(bookmarks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookmarks" });
    }
  });

  // Add bookmark
  app.post("/api/bookmarks", async (req, res) => {
    try {
      const bookmarkSchema = z.object({
        userId: z.string(),
        ideaId: z.number()
      });

      const { userId, ideaId } = bookmarkSchema.parse(req.body);
      
      // Check if already bookmarked
      const isAlreadyBookmarked = await storage.isBookmarked(userId, ideaId);
      if (isAlreadyBookmarked) {
        return res.status(400).json({ message: "Already bookmarked" });
      }

      const bookmark = await storage.addBookmark({ userId, ideaId });
      res.json(bookmark);
    } catch (error) {
      res.status(500).json({ message: "Failed to add bookmark" });
    }
  });

  // Remove bookmark
  app.delete("/api/bookmarks/:userId/:ideaId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const ideaId = parseInt(req.params.ideaId);
      
      await storage.removeBookmark(userId, ideaId);
      res.json({ message: "Bookmark removed" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove bookmark" });
    }
  });

  // Check if idea is bookmarked
  app.get("/api/bookmarks/:userId/:ideaId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const ideaId = parseInt(req.params.ideaId);
      
      const isBookmarked = await storage.isBookmarked(userId, ideaId);
      res.json({ isBookmarked });
    } catch (error) {
      res.status(500).json({ message: "Failed to check bookmark status" });
    }
  });

  // Get categories and statistics
  app.get("/api/stats", async (req, res) => {
    try {
      const allIdeas = await storage.getAllBusinessIdeas();
      
      const stats = {
        totalIdeas: allIdeas.length,
        categories: [...new Set(allIdeas.map(idea => idea.category))].length,
        successStories: allIdeas.reduce((sum, idea) => sum + (idea.successStories?.length || 0), 0)
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
