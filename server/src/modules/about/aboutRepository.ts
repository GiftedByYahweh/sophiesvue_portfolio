import { sqlBaseRepository } from '#common/baseRepository';
import { DBProvider } from 'src/db/provider';
import { aboutTable } from 'src/db/schema';
import { AboutEntity } from './aboutEntity';

export type AboutRepository = ReturnType<typeof aboutRepository>;

export function aboutRepository(dbProvider: DBProvider) {
  const base = sqlBaseRepository<AboutEntity>(dbProvider, aboutTable);

  async function get() {
    const [about] = await dbProvider.current().select().from(aboutTable).limit(1);
    return about ?? null;
  }

  return { ...base, get };
}
