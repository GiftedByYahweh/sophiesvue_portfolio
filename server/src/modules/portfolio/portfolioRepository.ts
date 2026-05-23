import { and, desc, eq, inArray } from 'drizzle-orm';
import { DBProvider } from 'src/db/provider';
import { albumsTable, categoriesTable, collectionsTable } from 'src/db/schema';

export type PortfolioRepository = ReturnType<typeof portfolioRepository>;

export function portfolioRepository(dbProvider: DBProvider) {
  async function getActiveCategories() {
    return dbProvider
      .current()
      .select({
        id: categoriesTable.id,
        slug: categoriesTable.slug,
        name: categoriesTable.name,
        photoLink: categoriesTable.photoLink,
      })
      .from(categoriesTable)
      .where(eq(categoriesTable.isActive, true))
      .orderBy(desc(categoriesTable.sortOrder));
  }

  async function getActiveCollectionsByCategoryIds(categoryIds: string[]) {
    if (categoryIds.length === 0) return [];
    return dbProvider
      .current()
      .select({
        id: collectionsTable.id,
        slug: collectionsTable.slug,
        name: collectionsTable.name,
        photoLink: collectionsTable.photoLink,
        isLiked: collectionsTable.isLiked,
        categoryId: collectionsTable.categoryId,
      })
      .from(collectionsTable)
      .where(
        and(
          inArray(collectionsTable.categoryId, categoryIds),
          eq(collectionsTable.isActive, true),
        ),
      )
      .orderBy(desc(collectionsTable.sortOrder));
  }

  async function getActiveAlbumsByCollectionIds(collectionIds: string[]) {
    if (collectionIds.length === 0) return [];
    return dbProvider
      .current()
      .select({
        id: albumsTable.id,
        photoLink: albumsTable.photoLink,
        type: albumsTable.type,
        collectionId: albumsTable.collectionId,
      })
      .from(albumsTable)
      .where(
        and(
          inArray(albumsTable.collectionId, collectionIds),
          eq(albumsTable.isActive, true),
        ),
      )
      .orderBy(desc(albumsTable.sortOrder));
  }

  return {
    getActiveCategories,
    getActiveCollectionsByCategoryIds,
    getActiveAlbumsByCollectionIds,
  };
}
