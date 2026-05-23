import { sqlBaseRepository } from '#common/baseRepository';
import { DBProvider } from 'src/db/provider';
import { categoriesTable, pricesTable } from 'src/db/schema';
import { and, eq } from 'drizzle-orm';
import { PriceEntity } from './priceEntity';

export type PricesRepository = ReturnType<typeof pricesRepository>;

export function pricesRepository(dbProvider: DBProvider) {
  const base = sqlBaseRepository<PriceEntity>(dbProvider, pricesTable);

  async function getAllWithCategory() {
    return dbProvider
      .current()
      .select({
        id: pricesTable.id,
        categoryId: pricesTable.categoryId,
        category: categoriesTable.name,
        categorySlug: categoriesTable.slug,
        photoLink: categoriesTable.photoLink,
        description: pricesTable.description,
        importantInfo: pricesTable.importantInfo,
        duration: pricesTable.duration,
        price: pricesTable.price,
      })
      .from(pricesTable)
      .innerJoin(
        categoriesTable,
        eq(pricesTable.categoryId, categoriesTable.id),
      );
  }

  async function findByCategoryAndDuration(categoryId: string, duration: string) {
    const rows = await dbProvider
      .current()
      .select()
      .from(pricesTable)
      .where(and(eq(pricesTable.categoryId, categoryId), eq(pricesTable.duration, duration)))
      .limit(1);
    return (rows[0] as PriceEntity) ?? null;
  }

  return { ...base, getAllWithCategory, findByCategoryAndDuration };
}
