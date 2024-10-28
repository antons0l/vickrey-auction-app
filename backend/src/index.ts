import { drizzle } from 'drizzle-orm/d1'
import { Hono } from 'hono'
import { Auction, auctions } from './db/schema'

export type Env = {
  DB: D1Database,
  CORS_DOMAIN_ALLOW: string
}

const app = new Hono<{ Bindings: Env }>();

app.use('*', async (c, next) => {
  await next();
  c.header('Access-Control-Allow-Origin', c.env.CORS_DOMAIN_ALLOW);
  c.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type');
});

app.get('/api/auctions', async (c) => {
  const db = drizzle(c.env.DB);
  const result: Auction[] = await db.select().from(auctions).all();
  return c.json(result, 200);
});

app.post('/api/auctions', async (c) => {
  const db = drizzle(c.env.DB);
  const { title, endAt } = await c.req.json();
  const result = await db.insert(auctions).values({title, endAt}).returning();
  return c.json(result, 200);
});

export default app