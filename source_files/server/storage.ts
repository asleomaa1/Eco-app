import {
  users, User, InsertUser,
  tips, Tip, InsertTip,
  challenges, Challenge, InsertChallenge,
  articles, Article, InsertArticle,
  activities, Activity, InsertActivity,
  posts, Post, InsertPost,
  resources, Resource, InsertResource
} from "@shared/schema";
import { db } from './db';
import { eq, like, desc, and } from 'drizzle-orm';

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserLanguage(userId: number, language: string): Promise<User | undefined>;
  updateUserAccessibilitySettings(userId: number, settings: User['accessibilitySettings']): Promise<User | undefined>;
  
  // Tips operations
  getTips(language?: string): Promise<Tip[]>;
  getTip(id: number): Promise<Tip | undefined>;
  createTip(tip: InsertTip): Promise<Tip>;

  // Challenges operations
  getChallenges(language?: string): Promise<Challenge[]>;
  getChallenge(id: number): Promise<Challenge | undefined>;
  createChallenge(challenge: InsertChallenge): Promise<Challenge>;

  // Articles operations
  getArticles(category?: string, language?: string): Promise<Article[]>;
  getArticle(id: number): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;

  // Activity operations
  getUserActivities(userId: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  
  // Post operations
  getPosts(category?: string): Promise<Post[]>;
  getPost(id: number): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  likePost(postId: number): Promise<Post | undefined>;

  // Resource operations
  getResources(category?: string, language?: string): Promise<Resource[]>;
  searchResources(query: string, language?: string): Promise<Resource[]>;
  getResource(id: number): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUserLanguage(userId: number, language: string): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set({ language })
      .where(eq(users.id, userId))
      .returning();
    return updatedUser;
  }

  async updateUserAccessibilitySettings(userId: number, settings: User['accessibilitySettings']): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set({ accessibilitySettings: settings })
      .where(eq(users.id, userId))
      .returning();
    return updatedUser;
  }
  
  // Tips operations
  async getTips(language = "en"): Promise<Tip[]> {
    return db.select().from(tips).where(eq(tips.language, language));
  }

  async getTip(id: number): Promise<Tip | undefined> {
    const [tip] = await db.select().from(tips).where(eq(tips.id, id));
    return tip;
  }

  async createTip(insertTip: InsertTip): Promise<Tip> {
    const [tip] = await db.insert(tips).values(insertTip).returning();
    return tip;
  }

  // Challenges operations
  async getChallenges(language = "en"): Promise<Challenge[]> {
    return db.select().from(challenges).where(eq(challenges.language, language));
  }

  async getChallenge(id: number): Promise<Challenge | undefined> {
    const [challenge] = await db.select().from(challenges).where(eq(challenges.id, id));
    return challenge;
  }

  async createChallenge(insertChallenge: InsertChallenge): Promise<Challenge> {
    const [challenge] = await db.insert(challenges).values(insertChallenge).returning();
    return challenge;
  }

  // Articles operations
  async getArticles(category?: string, language = "en"): Promise<Article[]> {
    if (category) {
      return db.select().from(articles)
        .where(and(eq(articles.language, language), eq(articles.category, category)))
        .orderBy(desc(articles.publishDate));
    }
    return db.select().from(articles)
      .where(eq(articles.language, language))
      .orderBy(desc(articles.publishDate));
  }

  async getArticle(id: number): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.id, id));
    return article;
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const [article] = await db.insert(articles).values(insertArticle).returning();
    return article;
  }

  // Activity operations
  async getUserActivities(userId: number): Promise<Activity[]> {
    return db.select().from(activities)
      .where(eq(activities.userId, userId))
      .orderBy(desc(activities.date));
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const [activity] = await db.insert(activities).values(insertActivity).returning();
    return activity;
  }
  
  // Post operations
  async getPosts(category?: string): Promise<Post[]> {
    if (category) {
      return db.select().from(posts)
        .where(eq(posts.category, category))
        .orderBy(desc(posts.createdAt));
    }
    return db.select().from(posts).orderBy(desc(posts.createdAt));
  }

  async getPost(id: number): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post;
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const [post] = await db.insert(posts)
      .values({
        ...insertPost,
        likeCount: 0,
        commentCount: 0
      })
      .returning();
    return post;
  }

  async likePost(postId: number): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, postId));
    
    if (!post) return undefined;
    
    const [updatedPost] = await db
      .update(posts)
      .set({ likeCount: post.likeCount + 1 })
      .where(eq(posts.id, postId))
      .returning();
    
    return updatedPost;
  }

  // Resource operations
  async getResources(category?: string, language = "en"): Promise<Resource[]> {
    if (category) {
      return db.select().from(resources)
        .where(and(eq(resources.language, language), eq(resources.category, category)))
        .orderBy(desc(resources.createdAt));
    }
    return db.select().from(resources)
      .where(eq(resources.language, language))
      .orderBy(desc(resources.createdAt));
  }

  async searchResources(query: string, language = "en"): Promise<Resource[]> {
    return db.select().from(resources)
      .where(
        and(
          eq(resources.language, language),
          like(resources.title, `%${query}%`)
        )
      )
      .orderBy(desc(resources.createdAt));
  }

  async getResource(id: number): Promise<Resource | undefined> {
    const [resource] = await db.select().from(resources).where(eq(resources.id, id));
    return resource;
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const [resource] = await db.insert(resources).values(insertResource).returning();
    return resource;
  }
}

export const storage = new DatabaseStorage();