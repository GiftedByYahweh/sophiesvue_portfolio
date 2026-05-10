import { sqlBaseRepository } from '#common/baseRepository';
import { DBProvider } from 'src/db/provider';
import { usersTable } from 'src/db/schema';
import { eq } from 'drizzle-orm';
import { UserEntity } from './userEntity';

export type UsersRepository = ReturnType<typeof usersRepository>;

export function usersRepository(dbProvider: DBProvider) {
  const base = sqlBaseRepository<UserEntity>(dbProvider, usersTable);

  async function findByName(name: string) {
    const [user] = await dbProvider
      .current()
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, name));
    return user ?? null;
  }

  return {
    ...base,
    findByName,
  };
}
