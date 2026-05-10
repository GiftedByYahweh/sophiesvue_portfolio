import { AppError, ErrorCode } from '#common/appError.js';
import { FastifyRequest } from 'fastify';
import { AUTH_SESSION_COOKIE_NAME } from './consts';
import { SessionStorage } from './session/sessionStorage';

export type AuthGuard = ReturnType<typeof authGuard>;

export function authGuard(sessionStore: SessionStorage) {
  async function check(req: FastifyRequest) {
    const sessionId = req.cookies[AUTH_SESSION_COOKIE_NAME];
    if (!sessionId) {
      throw new AppError(ErrorCode.INVALID_CREDENTIALS, 'Unauthorized');
    }

    const session = await sessionStore.get(sessionId);
    if (!session) {
      throw new AppError(ErrorCode.INVALID_CREDENTIALS, 'Unauthorized');
    }

    req.sessionId = sessionId;
  }
  return { check };
}
