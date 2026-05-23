import { sqlBaseRepository } from '#common/baseRepository';
import { DBProvider } from 'src/db/provider';
import { albumsTable } from 'src/db/schema';
import { and, desc, eq, inArray } from 'drizzle-orm';
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

  async function findByCollectionAndSlug(collectionId: string, slug: string) {
    const [album] = await dbProvider
      .current()
      .select()
      .from(albumsTable)
      .where(
        and(
          eq(albumsTable.collectionId, collectionId),
          eq(albumsTable.slug, slug),
        ),
      )
      .limit(1);
    return (album as AlbumEntity | undefined) ?? null;
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
    findByCollectionAndSlug,
    deleteByCollectionId,
    deleteByCollectionIds,
  };
}
