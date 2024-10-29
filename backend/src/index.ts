import { drizzle } from 'drizzle-orm/d1'
import { Hono } from 'hono'
import { Auction, auctions, bids, User, users } from './db/schema'

export type Env = {
  DB: D1Database,
  CORS_DOMAIN_ALLOW: string
}

const app = new Hono<{ Bindings: Env }>();

app.use('*', async (c, next) => {    
  c.header('Access-Control-Allow-Origin', c.env.CORS_DOMAIN_ALLOW);
  c.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type');
  // Handle preflight request
  if (c.req.method === 'OPTIONS') {
    return c.text('', 200);
  }
  await next();
});

// get all auctions
app.get('/api/auctions', async (c) => {
  const db = drizzle(c.env.DB);
  const result: Auction[] = await db.select().from(auctions).all();
  return c.json(result, 200);
});

// create a new auction
app.post('/api/auctions', async (c) => {
  const db = drizzle(c.env.DB);
  const { title, endAt } = await c.req.json();
  const result = await db.insert(auctions).values({title, endAt}).returning();
  return c.json(result, 200);
});

// get all users
app.get('/api/users', async (c) => {
  const db = drizzle(c.env.DB);
  const result: User[] = await db.select().from(users).all();
  return c.json(result, 200);
});

// create a new user
app.post('/api/users', async (c) => {
  const db = drizzle(c.env.DB);
  const { name } = await c.req.json();
  const result = await db.insert(users).values({name}).returning();
  return c.json(result[0], 200);
});

// create a new bid
app.post('/api/bids', async (c) => {
  const db = drizzle(c.env.DB);
  const { auctionId, userId, amount } = await c.req.json();
  const result = await db.insert(bids).values({auction_id: auctionId, user_id: userId, amount}).returning();
  return c.json(result, 200);
});

export default app