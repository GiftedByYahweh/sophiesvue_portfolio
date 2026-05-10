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
    Body: { name: string; photo: UploadFile };
  }>({
    method: 'POST',
    url: '/create',
    preHandler: authGuard.check,
    schema: {
      consumes: ['multipart/form-data'],
      body: {
        type: 'object',
        required: ['name', 'photo'],
        properties: {
          name: { type: 'string', minLength: 1 },
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
