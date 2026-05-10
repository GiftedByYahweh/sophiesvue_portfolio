import { sqlBaseRepository } from '#common/baseRepository';
import { DBProvider } from 'src/db/provider';
import { categoriesTable } from 'src/db/schema';
import { desc, eq } from 'drizzle-orm';
import { CategoryEntity } from './categoryEntity';

export type CategoriesRepository = ReturnType<typeof categoriesRepository>;

export function categoriesRepository(dbProvider: DBProvider) {
  const base = sqlBaseRepository<CategoryEntity>(dbProvider, categoriesTable);

  async function findByName(name: string) {
    const [category] = await dbProvider
      .current()
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.name, name));
    return category ?? null;
  }

  async function getNames() {
    return dbProvider
      .current()
      .select({ id: categoriesTable.id, name: categoriesTable.name })
      .from(categoriesTable)
      .orderBy(desc(categoriesTable.id));
  }

  return {
    ...base,
    findByName,
    getNames,
  };
}
