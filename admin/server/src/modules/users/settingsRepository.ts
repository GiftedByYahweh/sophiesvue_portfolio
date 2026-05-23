import { sqlBaseRepository } from '#common/baseRepository';
import { DBProvider } from 'src/db/provider';
import { settingsTable } from 'src/db/schema';
import { SettingsEntity } from './settingsEntity';

export type SettingsRepository = ReturnType<typeof settingsRepository>;

export function settingsRepository(dbProvider: DBProvider) {
  const base = sqlBaseRepository<SettingsEntity>(dbProvider, settingsTable);

  async function get() {
    const rows = await dbProvider.current().select().from(settingsTable).limit(1);
    return (rows[0] as SettingsEntity) ?? null;
  }

  return { ...base, get };
}
