export interface AlbumEntity {
  id: string;
  photoLink: string;
  isActive: boolean;
  collectionId: string;
  type: string;
  sortOrder?: number;
}
