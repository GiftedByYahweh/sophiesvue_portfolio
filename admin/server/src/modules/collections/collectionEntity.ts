export interface CollectionEntity {
  id: string;
  slug: string;
  name: string;
  photoLink: string;
  categoryId: string;
  isActive: boolean;
  isLiked: boolean;
  likedDate?: Date;
  sortOrder?: number;
}
