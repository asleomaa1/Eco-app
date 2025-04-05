import { pgTable, text, serial, integer, boolean, jsonb, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  language: text("language").default("en"),
  accessibilitySettings: jsonb("accessibility_settings").$type<{
    textSize: number;
    contrast: number;
    screenReader: boolean;
    dyslexiaFont: boolean;
    reduceAnimations: boolean;
  }>().default({
    textSize: 1,
    contrast: 1,
    screenReader: false,
    dyslexiaFont: false,
    reduceAnimations: false
  }),
});

// Tips model
export const tips = pgTable("tips", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  language: text("language").default("en"),
});

// Challenges model
export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  language: text("language").default("en"),
});

// Environmental articles model
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array(),
  publishDate: timestamp("publish_date").notNull().defaultNow(),
  language: text("language").default("en"),
});

// Sustainability activities model
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(), // e.g., "transport", "recycling", "energy", "consumption"
  description: text("description").notNull(),
  carbonSaved: real("carbon_saved").notNull(),
  date: timestamp("date").notNull().defaultNow(),
});

// Community forum posts model
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  likeCount: integer("like_count").default(0),
  commentCount: integer("comment_count").default(0),
});

// Resource items model
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // e.g., "pdf", "video", "article", "guide"
  category: text("category").notNull(), // e.g., "recycling", "energy", "gardening", "eco-products"
  url: text("url").notNull(),
  language: text("language").default("en"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertTipSchema = createInsertSchema(tips).omit({ id: true });
export const insertChallengeSchema = createInsertSchema(challenges).omit({ id: true });
export const insertArticleSchema = createInsertSchema(articles).omit({ id: true });
export const insertActivitySchema = createInsertSchema(activities).omit({ id: true });
export const insertPostSchema = createInsertSchema(posts).omit({ id: true, likeCount: true, commentCount: true, createdAt: true });
export const insertResourceSchema = createInsertSchema(resources).omit({ id: true, createdAt: true });

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertTip = z.infer<typeof insertTipSchema>;
export type InsertChallenge = z.infer<typeof insertChallengeSchema>;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type InsertResource = z.infer<typeof insertResourceSchema>;

export type User = typeof users.$inferSelect;
export type Tip = typeof tips.$inferSelect;
export type Challenge = typeof challenges.$inferSelect;
export type Article = typeof articles.$inferSelect;
export type Activity = typeof activities.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Resource = typeof resources.$inferSelect;
