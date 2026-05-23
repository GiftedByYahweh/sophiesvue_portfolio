import { eq } from 'drizzle-orm';
import { PgColumn, PgTable } from 'drizzle-orm/pg-core';
import { DBProvider } from 'src/db/provider';

export interface BaseRepository<Entity> {
  getAll(): Promise<Entity[]>;
  findById(id: string): Promise<Entity | null>;
  create(data: Entity): Promise<Entity>;
  update(id: string, data: Partial<Entity>): Promise<Entity | null>;
  delete(id: string): Promise<{ count: number }>;
}

export function sqlBaseRepository<Entity>(
  dbProvider: DBProvider,
  table: PgTable & { id: PgColumn },
): BaseRepository<Entity> {
  return {
    async getAll() {
      const rows = await dbProvider.current().select().from(table);
      return rows as Entity[];
    },

    async findById(id) {
      const rows = await dbProvider
        .current()
        .select()
        .from(table)
        .where(eq(table.id, id))
        .limit(1);
      return (rows[0] as Entity) ?? null;
    },

    async create(data) {
      const rows = await dbProvider
        .current()
        .insert(table)
        .values(data as Record<string, unknown>)
        .returning();
      return rows[0] as Entity;
    },

    async update(id, data) {
      const rows = await dbProvider
        .current()
        .update(table)
        .set(data as Record<string, unknown>)
        .where(eq(table.id, id))
        .returning();
      return rows[0] as Entity;
    },

    async delete(id) {
      await dbProvider
        .current()
        .delete(table)
        .where(eq(table.id, id))
        .returning()
        .catch();
      return { count: 1 };
    },
  };
}
