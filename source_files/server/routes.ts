import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertUserSchema, 
  insertTipSchema, 
  insertChallengeSchema, 
  insertArticleSchema, 
  insertActivitySchema, 
  insertPostSchema, 
  insertResourceSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = app.route('/api');

  // User routes
  app.get('/api/users/:id', async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = await storage.getUser(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Remove password before returning user
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });

  app.post('/api/users', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  app.patch('/api/users/:id/language', async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const language = z.string().parse(req.body.language);
    
    const user = await storage.updateUserLanguage(userId, language);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });

  app.patch('/api/users/:id/accessibility', async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const settings = z.object({
      textSize: z.number(),
      contrast: z.number(),
      screenReader: z.boolean(),
      dyslexiaFont: z.boolean(),
      reduceAnimations: z.boolean()
    }).parse(req.body);
    
    const user = await storage.updateUserAccessibilitySettings(userId, settings);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });

  // Tips routes
  app.get('/api/tips', async (req, res) => {
    const language = req.query.language as string || "en";
    const tips = await storage.getTips(language);
    res.json(tips);
  });

  app.get('/api/tips/:id', async (req, res) => {
    const tipId = parseInt(req.params.id, 10);
    const tip = await storage.getTip(tipId);
    
    if (!tip) {
      return res.status(404).json({ message: "Tip not found" });
    }
    
    res.json(tip);
  });

  app.post('/api/tips', async (req, res) => {
    try {
      const tipData = insertTipSchema.parse(req.body);
      const tip = await storage.createTip(tipData);
      res.status(201).json(tip);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid tip data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create tip" });
    }
  });

  // Challenges routes
  app.get('/api/challenges', async (req, res) => {
    const language = req.query.language as string || "en";
    const challenges = await storage.getChallenges(language);
    res.json(challenges);
  });

  app.get('/api/challenges/:id', async (req, res) => {
    const challengeId = parseInt(req.params.id, 10);
    const challenge = await storage.getChallenge(challengeId);
    
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }
    
    res.json(challenge);
  });

  app.post('/api/challenges', async (req, res) => {
    try {
      const challengeData = insertChallengeSchema.parse(req.body);
      const challenge = await storage.createChallenge(challengeData);
      res.status(201).json(challenge);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid challenge data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create challenge" });
    }
  });

  // Articles routes
  app.get('/api/articles', async (req, res) => {
    const category = req.query.category as string | undefined;
    const language = req.query.language as string || "en";
    const articles = await storage.getArticles(category, language);
    res.json(articles);
  });

  app.get('/api/articles/:id', async (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    const article = await storage.getArticle(articleId);
    
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    
    res.json(article);
  });

  app.post('/api/articles', async (req, res) => {
    try {
      const articleData = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(articleData);
      res.status(201).json(article);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid article data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create article" });
    }
  });

  // Activities routes
  app.get('/api/users/:userId/activities', async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const activities = await storage.getUserActivities(userId);
    res.json(activities);
  });

  app.post('/api/activities', async (req, res) => {
    try {
      const activityData = insertActivitySchema.parse(req.body);
      const activity = await storage.createActivity(activityData);
      res.status(201).json(activity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid activity data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create activity" });
    }
  });

  // Posts routes
  app.get('/api/posts', async (req, res) => {
    const category = req.query.category as string | undefined;
    const posts = await storage.getPosts(category);
    res.json(posts);
  });

  app.get('/api/posts/:id', async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await storage.getPost(postId);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    res.json(post);
  });

  app.post('/api/posts', async (req, res) => {
    try {
      const postData = insertPostSchema.parse(req.body);
      const post = await storage.createPost(postData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid post data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create post" });
    }
  });

  app.post('/api/posts/:id/like', async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await storage.likePost(postId);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    res.json(post);
  });

  // Resources routes
  app.get('/api/resources', async (req, res) => {
    const category = req.query.category as string | undefined;
    const language = req.query.language as string || "en";
    const resources = await storage.getResources(category, language);
    res.json(resources);
  });

  app.get('/api/resources/search', async (req, res) => {
    const query = req.query.q as string;
    const language = req.query.language as string || "en";
    
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }
    
    const resources = await storage.searchResources(query, language);
    res.json(resources);
  });

  app.get('/api/resources/:id', async (req, res) => {
    const resourceId = parseInt(req.params.id, 10);
    const resource = await storage.getResource(resourceId);
    
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    
    res.json(resource);
  });

  app.post('/api/resources', async (req, res) => {
    try {
      const resourceData = insertResourceSchema.parse(req.body);
      const resource = await storage.createResource(resourceData);
      res.status(201).json(resource);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid resource data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create resource" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
