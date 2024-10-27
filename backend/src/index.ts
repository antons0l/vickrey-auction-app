import { drizzle } from 'drizzle-orm/d1'
import { Hono } from 'hono'
import { auctions } from './db/schema'

export type Env = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Env }>()

app.get('/api/auctions', async (c) => {
  const db = drizzle(c.env.DB);
  const result = await db.select().from(auctions).all();
  return c.json(result);
});

app.post('/api/auctions', async (c) => {
  const db = drizzle(c.env.DB);
  const { title } = await c.req.json();
  const result = await db.insert(auctions).values({title}).returning();
  return c.json(result);
})

export default app