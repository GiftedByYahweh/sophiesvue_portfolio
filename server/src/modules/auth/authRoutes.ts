import { FastifyPluginCallback } from 'fastify';
import { AUTH_SESSION_COOKIE_NAME } from './consts';
import { AuthService } from './authService';
import { AuthGuard } from './authGuard';

interface AuthRoutesOptions {
  authService: AuthService;
  authGuard: AuthGuard;
}

export const authRoutes: FastifyPluginCallback<AuthRoutesOptions> = (
  app,
  { authService, authGuard },
) => {
  app.route<{ Body: { username: string; password: string } }>({
    method: 'POST',
    url: '/login',
    schema: {
      body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string' },
          password: { type: 'string' },
        },
      },
    },
    handler: async (req, reply) => {
      const { username, password } = req.body;
      const ip = req.ip;
      const userAgent = req.headers['user-agent'] || 'n/a';
      const { sessionId, maxAge } = await authService.login({
        username,
        password,
        ipAddress: ip,
        userAgent,
      });
      reply.setCookie(AUTH_SESSION_COOKIE_NAME, sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge,
      });
      return { ok: true };
    },
  });

  app.route({
    method: 'GET',
    url: '/session',
    preHandler: authGuard.check,
    handler: () => ({ ok: true }),
  });

  app.route({
    method: 'POST',
    url: '/logout',
    preHandler: authGuard.check,
    handler: async (req, reply) => {
      await authService.logout(req.sessionId!);
      reply.clearCookie(AUTH_SESSION_COOKIE_NAME, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
      return { ok: true };
    },
  });
};
