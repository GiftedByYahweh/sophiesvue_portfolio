import { FastifyPluginCallback } from 'fastify';
import { AuthGuard } from '#modules/auth/authGuard';
import { UploadFile } from '#filesStorage/types';
import { AboutService } from './aboutService';

interface AboutRoutesOptions {
  aboutService: AboutService;
  authGuard: AuthGuard;
}

const toDto = (about: {
  id: string;
  photoLink: string;
  aboutInfo: string;
  contactInfo: string;
}) => ({
  id: about.id,
  photo: about.photoLink,
  text: about.aboutInfo,
  contactInfo: about.contactInfo,
});

export const aboutRoutes: FastifyPluginCallback<AboutRoutesOptions> = (
  app,
  { aboutService, authGuard },
) => {
  app.get('/about', async () => {
    const about = await aboutService.get();
    if (!about) return { data: null };
    return { data: toDto(about) };
  });

  app.route<{
    Params: { id: string };
    Body: { text: string; contactInfo: string; photo?: UploadFile };
  }>({
    method: 'PATCH',
    url: '/about/:id',
    preHandler: authGuard.check,
    schema: {
      consumes: ['multipart/form-data'],
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string', format: 'uuid' } },
      },
      body: {
        type: 'object',
        required: ['text', 'contactInfo'],
        properties: {
          text: { type: 'string', minLength: 1 },
          contactInfo: { type: 'string' },
          photo: {
            type: 'object',
            properties: { filename: { type: 'string' } },
          },
        },
      },
    },
    handler: async (req) => {
      const data = await aboutService.update(req.params.id, req.body);
      return { data: data ? toDto(data) : null };
    },
  });
};
