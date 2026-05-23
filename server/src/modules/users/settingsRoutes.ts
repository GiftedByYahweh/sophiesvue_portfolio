import { FastifyPluginCallback } from 'fastify';
import { UploadFile } from '#filesStorage/types';
import { AuthGuard } from '#modules/auth/authGuard';
import { SettingsService } from './settingsService';

interface SettingsRoutesOptions {
  settingsService: SettingsService;
  authGuard: AuthGuard;
}

export const settingsRoutes: FastifyPluginCallback<SettingsRoutesOptions> = (
  app,
  { settingsService, authGuard },
) => {
  app.get('/', async () => {
    const data = await settingsService.get();
    return { data };
  });

  app.route<{
    Body: {
      instLink: string;
      mainSubTitle: string;
      mainTitleColor: string;
      mainHeaderColor: string;
      photo?: UploadFile;
    };
  }>({
    method: 'PATCH',
    url: '/',
    preHandler: authGuard.check,
    schema: {
      consumes: ['multipart/form-data'],
      body: {
        type: 'object',
        required: [
          'instLink',
          'mainSubTitle',
          'mainTitleColor',
          'mainHeaderColor',
        ],
        properties: {
          instLink: { type: 'string', minLength: 1 },
          mainSubTitle: { type: 'string', minLength: 1 },
          mainTitleColor: { type: 'string', minLength: 1 },
          mainHeaderColor: { type: 'string', minLength: 1 },
          photo: {
            type: 'object',
            properties: { filename: { type: 'string' } },
          },
        },
      },
    },
    handler: async (req) => {
      const data = await settingsService.update(req.body);
      return { data };
    },
  });
};
