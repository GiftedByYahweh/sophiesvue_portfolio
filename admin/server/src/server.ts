import fastify, { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyCookie from '@fastify/cookie';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifyMultipart, { MultipartFile } from '@fastify/multipart';
import { UploadFile } from '#filesStorage/types';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { AppContainer } from './container.js';
import { AppConfig } from './config.js';
import { authRoutes } from '#modules/auth/authRoutes';
import { categoryRoutes } from '#modules/categories/categoryRoutes';
import { collectionRoutes } from '#modules/collections/collectionRoutes';
import { albumRoutes } from '#modules/albums/albumRoutes';
import { Logger } from 'src/logger/index.js';
import { AppError, ErrorCode } from '#common/appError';

declare module '@fastify/multipart' {
  interface MultipartFile {
    value?: UploadFile;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    sessionId?: string;
  }
}

interface CreateServerOptions {
  container: AppContainer;
  config: AppConfig;
  logger: Logger;
}

const MULTIPART_400_CODES = new Set([
  'FST_PARTS_LIMIT',
  'FST_FILES_LIMIT',
  'FST_FIELDS_LIMIT',
  'FST_REQ_FILE_TOO_LARGE',
  'FST_PROTO_VIOLATION',
  'FST_INVALID_MULTIPART_CONTENT_TYPE',
  'FST_INVALID_JSON_FIELD_ERROR',
]);

export const createServer = async ({
  container,
  config,
  logger,
}: CreateServerOptions) => {
  const server = fastify({
    trustProxy: true,
  });

  await registerPlugins(server, config);
  registerErrorHandlers(server, logger);

  await registerRoutes(server, container);
  server.decorateRequest('sessionId', undefined);

  await server.ready();
  return server;
};

async function registerPlugins(server: FastifyInstance, config: AppConfig) {
  await server.register(fastifyHelmet, { contentSecurityPolicy: false });
  await server.register(fastifyCors, config.cors);
  await server.register(fastifyCookie, { secret: config.session.secret });
  await server.register(fastifyMultipart, {
    ...config.multipart,
    attachFieldsToBody: 'keyValues',
    onFile: async (part: MultipartFile) => {
      const filename = part.filename.trim().replace(/\s+/g, '_');
      const buffer = await part.toBuffer();
      part.value = { filename, buffer };
    },
  });
  await server.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
    errorResponseBuilder: () => {
      throw new AppError(
        ErrorCode.TOO_MANY_REQUESTS,
        'Too many requests, please try again later',
      );
    },
  });
  await server.register(fastifySwagger, {
    openapi: {
      info: { title: 'Admin API', version: '1.0.0' },
    },
  });
  await server.register(fastifySwaggerUi, { routePrefix: '/api-swagger-docs' });
}

function registerErrorHandlers(server: FastifyInstance, logger: Logger) {
  server.setNotFoundHandler((req) => {
    throw new AppError(
      ErrorCode.NOT_FOUND,
      `Requested URL (${req.method} ${req.url}) not found`,
    );
  });

  server.setSchemaErrorFormatter((errors) => {
    const error = errors[0];
    const fieldName = error.instancePath.substring(1);
    const field = fieldName ? fieldName : 'Field';
    const reason = error.message ?? 'is invalid';
    const message = `${field}: ${reason}`;
    return new AppError(ErrorCode.VALIDATION_ERROR, message);
  });

  server.setErrorHandler((error, request, reply) => {
    if (error instanceof AppError) {
      reply.status(error.toHttpCode()).send({
        ok: false,
        code: error.code,
        message: error.message,
        timestamp: Date.now(),
      });
      return;
    }
    if (MULTIPART_400_CODES.has(error.code)) {
      reply.status(400).send({
        ok: false,
        code: ErrorCode.VALIDATION_ERROR,
        message: error.message,
        timestamp: Date.now(),
      });
      return;
    }

    logger.error(
      'API',
      `Unknown error at ${request.method} ${request.url}: ${error}`,
    );

    reply.status(500).send({
      ok: false,
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      timestamp: Date.now(),
    });
  });
}

async function registerRoutes(
  server: FastifyInstance,
  container: AppContainer,
) {
  server.get('/health', () => ({ ok: true }));

  await server.register(authRoutes, {
    prefix: '/api/auth',
    authService: container.services.auth,
    authGuard: container.guards.auth,
  });

  await server.register(categoryRoutes, {
    prefix: '/api/categoties',
    categoryService: container.services.categories,
    authGuard: container.guards.auth,
  });

  await server.register(collectionRoutes, {
    prefix: '/api/collections',
    collectionService: container.services.collections,
    authGuard: container.guards.auth,
  });

  await server.register(albumRoutes, {
    prefix: '/api/albums',
    albumService: container.services.albums,
    authGuard: container.guards.auth,
  });
}
