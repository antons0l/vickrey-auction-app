import { drizzle } from 'drizzle-orm/d1'
import { Hono } from 'hono'
import { auctions } from './db/schema'

export type Env = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Env }>();

app.use('*', async (c, next) => {
  await next();
  c.header('Access-Control-Allow-Origin', 'https://vickrey-auction-app.pages.dev');
  c.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type');
});

app.get('/api/auctions', async (c) => {
  const db = drizzle(c.env.DB);
  const result = await db.select().from(auctions).all();
  return c.json(result, 200);
});

app.post('/api/auctions', async (c) => {
  const db = drizzle(c.env.DB);
  const { title } = await c.req.json();
  const result = await db.insert(auctions).values({title}).returning();
  return c.json(result, 200);
})

export default app