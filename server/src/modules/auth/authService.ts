import { crypto } from '#utils/crypto';
import { AppError, ErrorCode } from '#common/appError';
import { UsersRepository } from '#modules/users/usersRepository';
import { LoginPayload, LoginResult } from './types';
import { SessionStorage } from './session/sessionStorage';

export type AuthService = ReturnType<typeof authService>;

export function authService(
  usersRepo: UsersRepository,
  sessionStore: SessionStorage,
) {
  async function login(payload: LoginPayload): Promise<LoginResult> {
    const { username, password, userAgent, ipAddress } = payload;
    const currentUser = await usersRepo.findByName(username);
    if (!currentUser) {
      throw new AppError(
        ErrorCode.INVALID_CREDENTIALS,
        'Wrong email or password',
      );
    }

    const correctPassword = await crypto.verify(
      currentUser.passwordHash,
      password,
    );
    if (!correctPassword) {
      throw new AppError(
        ErrorCode.INVALID_CREDENTIALS,
        'Wrong email or password',
      );
    }

    const maxAge = sessionStore.getSessionAgeInSeconds();
    const session = await sessionStore.set({
      userId: currentUser.id,
      userAgent,
      ipAddress,
    });

    return { sessionId: session.id, maxAge };
  }

  async function logout(sessionId: string): Promise<void> {
    await sessionStore.delete(sessionId);
  }

  return { login, logout };
}
