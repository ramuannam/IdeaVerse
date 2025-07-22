import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const businessIdeas = pgTable("business_ideas", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  targetDemographic: text("target_demographic"),
  investment: jsonb("investment").$type<{
    min: number;
    max: number;
    currency: string;
  }>().notNull(),
  expertise: text("expertise").notNull(),
  trainingTime: text("training_time"),
  monthlyEarning: jsonb("monthly_earning").$type<{
    min: number;
    max: number;
    currency: string;
  }>(),
  profitMargin: text("profit_margin"),
  successRate: integer("success_rate"),
  timeInvestment: text("time_investment"),
  landRequired: text("land_required"),
  roi: text("roi"),
  rating: integer("rating").default(0),
  views: integer("views").default(0),
  imageUrl: text("image_url"),
  specialAdvantages: text("special_advantages").array(),
  governmentSupport: jsonb("government_support").$type<{
    available: boolean;
    schemes: string[];
    subsidies: string[];
  }>(),
  fundingOptions: text("funding_options").array(),
  bankSupport: text("bank_support").array(),
  resources: text("resources").array(),
  successStories: jsonb("success_stories").$type<{
    name: string;
    location: string;
    story: string;
    earnings: string;
  }[]>(),
  trainingPrograms: text("training_programs").array(),
  marketDemand: text("market_demand"),
  scalability: text("scalability"),
  location: text("location"),
  seasonality: text("seasonality"),
  competitionLevel: text("competition_level"),
});

export const bookmarks = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  ideaId: integer("idea_id").notNull().references(() => businessIdeas.id),
});

export const insertBusinessIdeaSchema = createInsertSchema(businessIdeas).omit({
  id: true,
  views: true,
  rating: true,
});

export const insertBookmarkSchema = createInsertSchema(bookmarks).omit({
  id: true,
});

export type InsertBusinessIdea = z.infer<typeof insertBusinessIdeaSchema>;
export type BusinessIdea = typeof businessIdeas.$inferSelect;
export type InsertBookmark = z.infer<typeof insertBookmarkSchema>;
export type Bookmark = typeof bookmarks.$inferSelect;
