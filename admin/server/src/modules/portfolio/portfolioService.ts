import { PortfolioRepository } from './portfolioRepository';
import {
  PortfolioCategoryDto,
  PortfolioCollectionDto,
  PortfolioSnapshotDto,
} from './types';

export type PortfolioService = ReturnType<typeof portfolioService>;

export function portfolioService(portfolioRepo: PortfolioRepository) {
  async function getSnapshot(): Promise<PortfolioSnapshotDto> {
    const categories = await portfolioRepo.getActiveCategories();
    const categoryIds = categories.map((c) => c.id);
    const collections =
      await portfolioRepo.getActiveCollectionsByCategoryIds(categoryIds);
    const collectionIds = collections.map((c) => c.id);
    const albums =
      await portfolioRepo.getActiveAlbumsByCollectionIds(collectionIds);
    const albumsByCollection = new Map<
      string,
      PortfolioCollectionDto['albums']
    >();
    for (const album of albums) {
      const list = albumsByCollection.get(album.collectionId) ?? [];
      list.push({
        id: album.id,
        photoLink: album.photoLink,
        type: album.type,
      });
      albumsByCollection.set(album.collectionId, list);
    }
    const collectionsByCategory = new Map<
      string,
      PortfolioCategoryDto['collections']
    >();
    for (const collection of collections) {
      const list = collectionsByCategory.get(collection.categoryId) ?? [];
      list.push({
        id: collection.id,
        slug: collection.slug,
        name: collection.name,
        photoLink: collection.photoLink,
        isLiked: collection.isLiked,
        albums: albumsByCollection.get(collection.id) ?? [],
      });
      collectionsByCategory.set(collection.categoryId, list);
    }

    return {
      categories: categories.map((category) => ({
        id: category.id,
        slug: category.slug,
        name: category.name,
        photoLink: category.photoLink,
        collections: collectionsByCategory.get(category.id) ?? [],
      })),
    };
  }

  return { getSnapshot };
}
