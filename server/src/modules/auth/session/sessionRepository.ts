import { and, eq, gt } from 'drizzle-orm';
import { DBProvider } from 'src/db/provider';
import { sessionsTable } from 'src/db/schema';
import { SessionEntity } from './sessionEntity';

export interface SessionRepository {
  set(session: SessionEntity): Promise<SessionEntity>;
  get(sessionId: string): Promise<SessionEntity | null>;
  delete(id: string): Promise<{ count: number }>;
}

export function sqlSessionRepository(
  dbProvider: DBProvider,
): SessionRepository {
  async function set(session: SessionEntity) {
    const [row] = await dbProvider
      .current()
      .insert(sessionsTable)
      .values(session)
      .returning();
    return row;
  }

  async function get(sessionId: string) {
    const [row] = await dbProvider
      .current()
      .select()
      .from(sessionsTable)
      .where(
        and(
          eq(sessionsTable.id, sessionId),
          gt(sessionsTable.expiresAt, new Date()),
        ),
      )
      .limit(1);
    return row;
  }

  async function remove(id: string) {
    await dbProvider
      .current()
      .delete(sessionsTable)
      .where(eq(sessionsTable.id, id));
    return { count: 1 };
  }

  return { set, get, delete: remove };
}
