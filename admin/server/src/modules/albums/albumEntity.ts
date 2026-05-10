export interface AlbumEntity {
  id: string;
  name: string;
  photoLink: string;
  isActive: boolean;
  collectionId: string;
  type: string;
  sortOrder?: number;
}
