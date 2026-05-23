import { FastifyPluginCallback } from 'fastify';
import { CategoryService } from './categoryService';
import { AuthGuard } from '#modules/auth/authGuard';
import { UploadFile } from '#filesStorage/types';

interface CategoryRoutesOptions {
  categoryService: CategoryService;
  authGuard: AuthGuard;
}

export const categoryRoutes: FastifyPluginCallback<CategoryRoutesOptions> = (
  app,
  { categoryService, authGuard },
) => {
  app.get('/all', async () => {
    const data = await categoryService.getAll();
    return { data };
  });

  app.get('/short-list', async () => {
    const data = await categoryService.getNames();
    return { data };
  });

  app.route<{
    Body: { name: string; slug: string; photo: UploadFile };
  }>({
    method: 'POST',
    url: '/create',
    preHandler: authGuard.check,
    schema: {
      consumes: ['multipart/form-data'],
      body: {
        type: 'object',
        required: ['name', 'photo', 'slug'],
        properties: {
          name: { type: 'string', minLength: 1 },
          slug: { type: 'string', minLength: 1, maxLength: 20 },
          photo: {
            type: 'object',
            required: ['filename', 'buffer'],
            properties: {
              filename: { type: 'string', minLength: 1 },
            },
          },
        },
      },
    },
    handler: async (req) => {
      const data = await categoryService.create(req.body);
      return { data };
    },
  });

  app.route<{
    Params: { id: string };
    Body: {
      name: string;
      isActive: string;
      slug: string;
      photo?: UploadFile;
    };
  }>({
    method: 'PATCH',
    url: '/category/:id',
    preHandler: authGuard.check,
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', format: 'uuid' },
        },
      },
      body: {
        type: 'object',
        required: ['name', 'isActive', 'slug'],
        properties: {
          name: { type: 'string', minLength: 4 },
          isActive: { type: 'string' },
          slug: { type: 'string', minLength: 1, maxLength: 20 },
          photo: {
            type: 'object',
            properties: {
              filename: { type: 'string' },
            },
          },
        },
      },
    },
    handler: async (req) => {
      const data = await categoryService.update(req.params.id, req.body);
      return { data };
    },
  });

  app.route<{ Params: { id: string } }>({
    method: 'PATCH',
    url: '/category/:id/hide',
    preHandler: authGuard.check,
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string', format: 'uuid' } },
      },
    },
    handler: async (req) => {
      const data = await categoryService.hide(req.params.id);
      return { data };
    },
  });

  app.route<{ Params: { id: string } }>({
    method: 'PATCH',
    url: '/category/:id/restore',
    preHandler: authGuard.check,
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string', format: 'uuid' } },
      },
    },
    handler: async (req) => {
      const data = await categoryService.restore(req.params.id);
      return { data };
    },
  });

  app.route<{ Params: { id: string } }>({
    method: 'DELETE',
    url: '/category/:id',
    preHandler: authGuard.check,
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', format: 'uuid' },
        },
      },
    },
    handler: async (req) => {
      const data = await categoryService.delete(req.params.id);
      return { data };
    },
  });
};
