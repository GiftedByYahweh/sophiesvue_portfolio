import { sql } from 'drizzle-orm';
import {
  boolean,
  integer,
  numeric,
  pgSequence,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
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

export const settingsTable = pgTable('settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  instLink: text('inst_link').notNull(),
  mainSubTitle: text('main_subtitle').notNull(),
  mainTitleColor: text('main_title_color').notNull(),
  mainPhotoLink: text('main_photo_link').notNull(),
  mainHeaderColor: text('main_header_color').notNull(),
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
  photoLink: text('photo_link').notNull(),
  aboutInfo: text('about_info').notNull(),
  contactInfo: text('contact_info').notNull(),
});

export const categoriesTable = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
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
  duration: text('duration').notNull(),
  price: numeric('price').notNull(),
});

export const collectionsTable = pgTable(
  'collections',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull(),
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
  },
  (t) => [
    uniqueIndex('collections_category_slug_idx').on(t.categoryId, t.slug),
  ],
);

export const albumsTable = pgTable(
  'albums',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    photoLink: text('photo_link').notNull(),
    isActive: boolean('is_active').notNull().default(true),
    collectionId: uuid('collection_id')
      .notNull()
      .references(() => collectionsTable.id, { onDelete: 'restrict' }),
    sortOrder: integer('sort_order')
      .notNull()
      .default(sql`nextval('albums_sort_order_seq')`),
    type: text('type').notNull().default('normal'),
  },
  (t) => [uniqueIndex('albums_collection_slug_idx').on(t.collectionId)],
);
