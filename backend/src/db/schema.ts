import {InferSelectModel, sql} from 'drizzle-orm';
import {sqliteTable, text, integer, real} from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id', {mode: 'number'}).primaryKey({autoIncrement: true}),
  name: text('name', {length: 256}).notNull(),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`).notNull()
});

export const auctions = sqliteTable('auctions', {
  id: integer('id', {mode: 'number'}).primaryKey({autoIncrement: true}),
  title: text('title', {length: 256}).notNull(),
  status: text('status').default('OPEN').notNull(),
  endAt: text('endAt'),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`).notNull()
});

export const bid = sqliteTable('bid', {
  id: integer('id', {mode: 'number'}).primaryKey({autoIncrement: true}),
  auction_id: integer('auction_id', {mode: 'number'}),
  user_id: integer('user_id', {mode: 'number'}),
  amount: real('amount').notNull(),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`).notNull()
});

export type User = InferSelectModel<typeof users>
export type Auction = InferSelectModel<typeof auctions>
