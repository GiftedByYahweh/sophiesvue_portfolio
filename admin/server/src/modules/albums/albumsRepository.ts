import { sqlBaseRepository } from '#common/baseRepository';
import { DBProvider } from 'src/db/provider';
import { albumsTable } from 'src/db/schema';
import { desc, eq, inArray } from 'drizzle-orm';
import { AlbumEntity } from './albumEntity';

export type AlbumsRepository = ReturnType<typeof albumsRepository>;

export function albumsRepository(dbProvider: DBProvider) {
  const base = sqlBaseRepository<AlbumEntity>(dbProvider, albumsTable);

  async function getByCollectionId(collectionId: string) {
    const rows = await dbProvider
      .current()
      .select()
      .from(albumsTable)
      .where(eq(albumsTable.collectionId, collectionId))
      .orderBy(desc(albumsTable.sortOrder));
    return rows as AlbumEntity[];
  }

  async function deleteByCollectionId(collectionId: string) {
    const rows = await dbProvider
      .current()
      .delete(albumsTable)
      .where(eq(albumsTable.collectionId, collectionId))
      .returning();
    return rows as AlbumEntity[];
  }

  async function deleteByCollectionIds(collectionIds: string[]) {
    if (!collectionIds.length) return [];
    const rows = await dbProvider
      .current()
      .delete(albumsTable)
      .where(inArray(albumsTable.collectionId, collectionIds))
      .returning();
    return rows as AlbumEntity[];
  }

  return {
    ...base,
    getByCollectionId,
    deleteByCollectionId,
    deleteByCollectionIds,
  };
}
