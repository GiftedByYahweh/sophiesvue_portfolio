import { FastifyPluginCallback } from 'fastify';
import { CollectionService } from './collectionService';
import { AuthGuard } from '#modules/auth/authGuard';
import { UploadFile } from '#filesStorage/types';

interface CollectionRoutesOptions {
  collectionService: CollectionService;
  authGuard: AuthGuard;
}

export const collectionRoutes: FastifyPluginCallback<
  CollectionRoutesOptions
> = (app, { collectionService, authGuard }) => {
  app.route<{ Params: { categoryId: string } }>({
    method: 'GET',
    url: '/by-category/:categoryId',
    schema: {
      params: {
        type: 'object',
        required: ['categoryId'],
        properties: {
          categoryId: { type: 'string', format: 'uuid' },
        },
      },
    },
    handler: async (req) => {
      const data = await collectionService.getByCategoryId(
        req.params.categoryId,
      );
      return { data };
    },
  });

  app.route<{ Params: { categoryId: string } }>({
    method: 'GET',
    url: '/short-list/:categoryId',
    schema: {
      params: {
        type: 'object',
        required: ['categoryId'],
        properties: {
          categoryId: { type: 'string', format: 'uuid' },
        },
      },
    },
    handler: async (req) => {
      const data = await collectionService.getNamesByCategoryId(
        req.params.categoryId,
      );
      return { data };
    },
  });

  app.get('/favorites', async () => {
    const data = await collectionService.getFavorites();
    return { data };
  });

  app.route<{
    Body: {
      name: string;
      categoryId: string;
      photo: UploadFile;
      isLiked?: boolean;
    };
  }>({
    method: 'POST',
    url: '/create',
    preHandler: authGuard.check,
    schema: {
      consumes: ['multipart/form-data'],
      body: {
        type: 'object',
        required: ['name', 'categoryId', 'photo'],
        properties: {
          name: { type: 'string', minLength: 1 },
          categoryId: { type: 'string', format: 'uuid' },
          isLiked: { type: 'boolean' },
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
      const data = await collectionService.create(req.body);
      return { data };
    },
  });

  app.route<{ Params: { id: string } }>({
    method: 'DELETE',
    url: '/collection/:id',
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
      const data = await collectionService.delete(req.params.id);
      return { data };
    },
  });
};
