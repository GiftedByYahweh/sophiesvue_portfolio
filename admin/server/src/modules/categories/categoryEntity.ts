export interface CategoryEntity {
  id: string;
  slug: string;
  name: string;
  photoLink: string;
  isActive: boolean;
  sortOrder?: number;
}
