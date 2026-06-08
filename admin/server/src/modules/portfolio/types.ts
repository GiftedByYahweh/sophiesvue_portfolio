export interface PortfolioAlbumDto {
  id: string;
  photoLink: string;
  type: string;
}

export interface PortfolioCollectionDto {
  id: string;
  slug: string;
  name: string;
  photoLink: string;
  isLiked: boolean;
  likedDate: Date | null;
  albums: PortfolioAlbumDto[];
}

export interface PortfolioCategoryDto {
  id: string;
  slug: string;
  name: string;
  photoLink: string;
  collections: PortfolioCollectionDto[];
}

export interface PortfolioSnapshotDto {
  categories: PortfolioCategoryDto[];
}
