import { crypto } from '#utils/crypto';
import { SessionRepository } from './sessionRepository';
import { SessionPayload } from './types';

export type SessionStorage = ReturnType<typeof pgSessionStore>;

export function pgSessionStore(repo: SessionRepository, maxAge: number) {
  async function set(payload: SessionPayload) {
    const id = crypto.getRandomId();
    const createdAt = new Date();
    const expiresAt = new Date(Date.now() + maxAge);
    return repo.set({
      ...payload,
      createdAt,
      expiresAt,
      lastSeenAt: createdAt,
      revokedAt: null,
      id,
    });
  }

  async function get(sessionId: string) {
    return repo.get(sessionId);
  }

  async function remove(sessionId: string) {
    await repo.delete(sessionId);
  }

  function getSessionAgeInSeconds() {
    return Math.floor(maxAge / 1000);
  }

  return { set, get, delete: remove, getSessionAgeInSeconds };
}
