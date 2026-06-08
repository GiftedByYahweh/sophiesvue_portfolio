export interface Album {
  id: string;
  slug: string;
  name: string;
  photoLink: string;
  type: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  photoLink: string;
  isLiked: boolean;
  likedDate: string | null;
  albums: Album[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  photoLink: string;
  collections: Collection[];
}

export interface PortfolioSnapshot {
  categories: Category[];
}

export interface Profile {
  photo: string;
  text: string;
  contactInfo: string;
}

export interface Settings {
  id: string;
  instLink: string;
  mainSubTitle: string;
  mainTitleColor: string;
  mainPhotoLink: string;
  mainHeaderColor: string;
}

export interface PriceItem {
  id: string;
  categoryId: string;
  category: string;
  categorySlug: string;
  photoLink: string;
  price: string;
  description: string;
  importantInfo: string;
  duration: string;
}
