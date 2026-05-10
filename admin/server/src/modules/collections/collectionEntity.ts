export interface CollectionEntity {
  id: string;
  name: string;
  photoLink: string;
  categoryId: string;
  isActive: boolean;
  isLiked: boolean;
  sortOrder?: number;
}
