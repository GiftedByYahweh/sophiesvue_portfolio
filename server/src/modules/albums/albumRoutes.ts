import { FastifyPluginCallback } from 'fastify';
import { AlbumService } from './albumService';
import { AuthGuard } from '#modules/auth/authGuard';
import { UploadFile } from '#filesStorage/types';

interface AlbumRoutesOptions {
  albumService: AlbumService;
  authGuard: AuthGuard;
}

export const albumRoutes: FastifyPluginCallback<AlbumRoutesOptions> = (
  app,
  { albumService, authGuard },
) => {
  app.route<{ Params: { collectionId: string } }>({
    method: 'GET',
    url: '/by-collection/:collectionId',
    schema: {
      params: {
        type: 'object',
        required: ['collectionId'],
        properties: {
          collectionId: { type: 'string', format: 'uuid' },
        },
      },
    },
    handler: async (req) => {
      const data = await albumService.getByCollectionId(
        req.params.collectionId,
      );
      return { data };
    },
  });

  app.route<{
    Body: {
      collectionId: string;
      type?: string;
      photo: UploadFile;
    };
  }>({
    method: 'POST',
    url: '/create',
    preHandler: authGuard.check,
    schema: {
      consumes: ['multipart/form-data'],
      body: {
        type: 'object',
        required: ['name', 'collectionId', 'photo'],
        properties: {
          collectionId: { type: 'string', format: 'uuid' },
          type: { type: 'string' },
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
      const data = await albumService.create(req.body);
      return { data };
    },
  });

  app.route<{
    Params: { id: string };
    Body: {
      name: string;
      isActive: string;
      type: string;
      slug: string;
      photo?: UploadFile;
    };
  }>({
    method: 'PATCH',
    url: '/album/:id',
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
        required: ['name', 'isActive', 'type', 'slug'],
        properties: {
          name: { type: 'string', minLength: 1 },
          slug: { type: 'string' },
          isActive: { type: 'string' },
          type: { type: 'string' },
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
      const data = await albumService.update(req.params.id, req.body);
      return { data };
    },
  });

  app.route<{ Params: { id: string } }>({
    method: 'PATCH',
    url: '/album/:id/hide',
    preHandler: authGuard.check,
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string', format: 'uuid' } },
      },
    },
    handler: async (req) => {
      const data = await albumService.hide(req.params.id);
      return { data };
    },
  });

  app.route<{ Params: { id: string } }>({
    method: 'PATCH',
    url: '/album/:id/restore',
    preHandler: authGuard.check,
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string', format: 'uuid' } },
      },
    },
    handler: async (req) => {
      const data = await albumService.restore(req.params.id);
      return { data };
    },
  });

  app.route<{ Params: { id: string } }>({
    method: 'DELETE',
    url: '/album/:id',
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
      const data = await albumService.delete(req.params.id);
      return { data };
    },
  });
};
