import { sql } from 'drizzle-orm';
import {
  boolean,
  integer,
  numeric,
  pgSequence,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const categoriesSortOrderSeq = pgSequence('categories_sort_order_seq');
export const collectionsSortOrderSeq = pgSequence('collections_sort_order_seq');
export const albumsSortOrderSeq = pgSequence('albums_sort_order_seq');

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: text('username').notNull(),
  passwordHash: text('password_hash').notNull(),
});

export const sessionsTable = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  ipAddress: text('ip_address').notNull(),
  userAgent: text('user_agent').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  lastSeenAt: timestamp('last_seen_at', { withTimezone: true }).notNull(),
  revokedAt: timestamp('revoked_at', { withTimezone: true }),
});

export const aboutTable = pgTable('about', {
  id: uuid('id').primaryKey().defaultRandom(),
  aboutInfo: text('about_info').notNull(),
  contactInfo: text('contact_info').notNull(),
  instLink: text('inst_link').notNull(),
});

export const categoriesTable = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  photoLink: text('photo_link').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  sortOrder: integer('sort_order')
    .notNull()
    .default(sql`nextval('categories_sort_order_seq')`),
});

export const pricesTable = pgTable('prices', {
  id: uuid('id').primaryKey().defaultRandom(),
  categoryId: uuid('category_id')
    .notNull()
    .references(() => categoriesTable.id, { onDelete: 'cascade' }),
  description: text('description').notNull(),
  importantInfo: text('important_info').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  duration: text('duration').notNull(),
});

export const collectionsTable = pgTable('collections', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  photoLink: text('photo_link').notNull(),
  categoryId: uuid('category_id')
    .notNull()
    .references(() => categoriesTable.id, { onDelete: 'restrict' }),
  isActive: boolean('is_active').notNull().default(true),
  isLiked: boolean('is_liked').notNull().default(false),
  sortOrder: integer('sort_order')
    .notNull()
    .default(sql`nextval('collections_sort_order_seq')`),
});

export const albumsTable = pgTable('albums', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  photoLink: text('photo_link').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  collectionId: uuid('collection_id')
    .notNull()
    .references(() => collectionsTable.id, { onDelete: 'restrict' }),
  sortOrder: integer('sort_order')
    .notNull()
    .default(sql`nextval('albums_sort_order_seq')`),
  type: text('type').notNull().default('normal'),
});
