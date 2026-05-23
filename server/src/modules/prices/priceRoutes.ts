import { FastifyPluginCallback } from 'fastify';
import { AuthGuard } from '#modules/auth/authGuard';
import { PriceService } from './priceService';

interface PriceRoutesOptions {
  priceService: PriceService;
  authGuard: AuthGuard;
}

export const priceRoutes: FastifyPluginCallback<PriceRoutesOptions> = (
  app,
  { priceService, authGuard },
) => {
  app.get('/all', async () => {
    const data = await priceService.getAll();
    return { data };
  });

  app.route<{
    Body: {
      categoryId: string;
      description: string;
      importantInfo: string;
      duration: string;
      price: string;
    };
  }>({
    method: 'POST',
    url: '/create',
    preHandler: authGuard.check,
    schema: {
      body: {
        type: 'object',
        required: ['categoryId', 'description', 'importantInfo', 'duration', 'price'],
        properties: {
          categoryId: { type: 'string', format: 'uuid' },
          description: { type: 'string', minLength: 1 },
          importantInfo: { type: 'string', minLength: 1 },
          duration: { type: 'string', minLength: 1 },
          price: { type: 'string', minLength: 1 },
        },
      },
    },
    handler: async (req) => {
      const data = await priceService.create(req.body);
      return { data };
    },
  });

  app.route<{
    Params: { id: string };
    Body: {
      categoryId: string;
      description: string;
      importantInfo: string;
      duration: string;
      price: string;
    };
  }>({
    method: 'PATCH',
    url: '/price/:id',
    preHandler: authGuard.check,
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string', format: 'uuid' } },
      },
      body: {
        type: 'object',
        required: ['categoryId', 'description', 'importantInfo', 'duration', 'price'],
        properties: {
          categoryId: { type: 'string', format: 'uuid' },
          description: { type: 'string', minLength: 1 },
          importantInfo: { type: 'string', minLength: 1 },
          duration: { type: 'string', minLength: 1 },
          price: { type: 'string', minLength: 1 },
        },
      },
    },
    handler: async (req) => {
      const data = await priceService.update(req.params.id, req.body);
      return { data };
    },
  });

  app.route<{ Params: { id: string } }>({
    method: 'DELETE',
    url: '/price/:id',
    preHandler: authGuard.check,
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string', format: 'uuid' } },
      },
    },
    handler: async (req) => {
      const data = await priceService.delete(req.params.id);
      return { data };
    },
  });
};
