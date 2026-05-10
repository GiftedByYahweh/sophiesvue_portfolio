import { DBProvider } from 'src/db/provider';
import { createTxContext } from 'src/db/txContext';
import { unitOfWork } from 'src/db/unitOfWork';
import { AppConfig } from './config';
import { authService } from './modules/auth/authService.js';
import { authGuard } from './modules/auth/authGuard.js';
import { usersRepository } from '#modules/users/usersRepository';
import { pgSessionStore } from '#modules/auth/session/sessionStorage';
import { sqlSessionRepository } from '#modules/auth/session/sessionRepository';
import { categoriesRepository } from '#modules/categories/categoriesRepository';
import { categoryService } from '#modules/categories/categoryService';
import { collectionsRepository } from '#modules/collections/collectionsRepository';
import { collectionService } from '#modules/collections/collectionService';
import { albumsRepository } from '#modules/albums/albumsRepository';
import { albumService } from '#modules/albums/albumService';
import { CloudinaryProvider } from './filesStorage/cloudinaryProvider';
import { filesStorage } from './filesStorage/filesStorage';

export const createAppContainer = (config: AppConfig) => {
  const txContext = createTxContext();
  const dbProvider = new DBProvider(config, txContext);
  const uow = unitOfWork(dbProvider);
  const cloudinaryProvider = new CloudinaryProvider(config.cloudinary);

  const usersRepo = usersRepository(dbProvider);
  const sessionRepo = sqlSessionRepository(dbProvider);
  const categoriesRepo = categoriesRepository(dbProvider);
  const collectionsRepo = collectionsRepository(dbProvider);
  const albumsRepo = albumsRepository(dbProvider);

  const sessions = pgSessionStore(sessionRepo, config.session.maxAge);
  const flStorage = filesStorage(cloudinaryProvider);

  const auth = authService(usersRepo, sessions);
  const albums = albumService(albumsRepo, flStorage);
  const collections = collectionService(
    collectionsRepo,
    albums,
    uow,
    flStorage,
  );
  const categories = categoryService(
    categoriesRepo,
    collections,
    uow,
    flStorage,
  );

  const guards = {
    auth: authGuard(sessions),
  };

  return {
    repositories: {
      users: usersRepo,
      categories: categoriesRepo,
      collections: collectionsRepo,
      albums: albumsRepo,
    },
    services: {
      auth,
      categories,
      collections,
      albums,
    },
    guards,
  };
};

export type AppContainer = ReturnType<typeof createAppContainer>;
