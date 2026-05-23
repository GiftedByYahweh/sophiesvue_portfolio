import { sqlBaseRepository } from '#common/baseRepository';
import { DBProvider } from 'src/db/provider';
import { collectionsTable } from 'src/db/schema';
import { and, desc, eq } from 'drizzle-orm';
import { CollectionEntity } from './collectionEntity';

export type CollectionsRepository = ReturnType<typeof collectionsRepository>;

export function collectionsRepository(dbProvider: DBProvider) {
  const base = sqlBaseRepository<CollectionEntity>(
    dbProvider,
    collectionsTable,
  );

  async function findByCategoryAndName(categoryId: string, name: string) {
    const [collection] = await dbProvider
      .current()
      .select()
      .from(collectionsTable)
      .where(
        and(
          eq(collectionsTable.categoryId, categoryId),
          eq(collectionsTable.name, name),
        ),
      );
    return collection ?? null;
  }

  async function getByCategoryId(categoryId: string) {
    const rows = await dbProvider
      .current()
      .select()
      .from(collectionsTable)
      .where(eq(collectionsTable.categoryId, categoryId))
      .orderBy(desc(collectionsTable.sortOrder));
    return rows;
  }

  async function getNamesByCategoryId(categoryId: string) {
    return dbProvider
      .current()
      .select({ id: collectionsTable.id, name: collectionsTable.name })
      .from(collectionsTable)
      .where(eq(collectionsTable.categoryId, categoryId))
      .orderBy(desc(collectionsTable.id));
  }

  async function getFavorites() {
    const rows = await dbProvider
      .current()
      .select()
      .from(collectionsTable)
      .where(eq(collectionsTable.isLiked, true))
      .orderBy(desc(collectionsTable.sortOrder));
    return rows;
  }

  async function deleteByCategoryId(categoryId: string) {
    const rows = await dbProvider
      .current()
      .delete(collectionsTable)
      .where(eq(collectionsTable.categoryId, categoryId))
      .returning();
    return rows;
  }

  return {
    ...base,
    findByCategoryAndName,
    getByCategoryId,
    getNamesByCategoryId,
    getFavorites,
    deleteByCategoryId,
  };
}
