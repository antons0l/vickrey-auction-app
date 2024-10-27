import {sql} from 'drizzle-orm';
import {sqliteTable, text, integer} from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id', {mode: 'number'}).primaryKey({autoIncrement: true}),
  name: text('name', {length: 256}).notNull(),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`).notNull()
});

export const auctions = sqliteTable('auctions', {
  id: integer('id', {mode: 'number'}).primaryKey({autoIncrement: true}),
  title: text('title', {length: 256}).notNull(),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`).notNull()
});

