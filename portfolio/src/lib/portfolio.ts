import type {
  Category,
  Collection,
  PortfolioSnapshot,
  PriceItem,
  Profile,
  Settings,
} from "./types";
import { API_URL } from "./config";

let _snapshotCache: PortfolioSnapshot | null = null;
let _profileCache: Profile | null = null;
let _pricesCache: PriceItem[] | null = null;
let _settingsCache: Settings | null = null;

export async function getSnapshot(): Promise<PortfolioSnapshot> {
  if (_snapshotCache) return _snapshotCache;

  const url = `${API_URL}/api/portfolio/snapshot`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Portfolio snapshot fetch failed: ${res.status} ${res.statusText} (${url})`,
    );
  }
  const body = (await res.json()) as { data: PortfolioSnapshot };
  _snapshotCache = body.data;
  return _snapshotCache;
}

export function findCategoryBySlug(
  snapshot: PortfolioSnapshot,
  slug: string,
): Category | undefined {
  return snapshot.categories.find((c) => c.slug === slug);
}

export function findCollectionBySlug(
  category: Category,
  slug: string,
): Collection | undefined {
  return category.collections.find((c) => c.slug === slug);
}

export interface Neighbours<T> {
  prev: T | null;
  next: T | null;
}

export async function getProfile(): Promise<Profile> {
  if (_profileCache) return _profileCache;

  const url = `${API_URL}/api/profile/about`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Profile fetch failed: ${res.status} ${res.statusText} (${url})`,
    );
  }
  const body = (await res.json()) as {
    data: { id: string; photo: string; text: string; contactInfo: string } | null;
  };
  if (!body.data) throw new Error(`Profile not found (${url})`);
  _profileCache = {
    photo: body.data.photo,
    text: body.data.text,
    contactInfo: body.data.contactInfo,
  };
  return _profileCache;
}

export async function getPrices(): Promise<PriceItem[]> {
  if (_pricesCache) return _pricesCache;

  const url = `${API_URL}/api/price/all`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Prices fetch failed: ${res.status} ${res.statusText} (${url})`,
    );
  }
  const body = (await res.json()) as {
    data: Array<{
      id: string;
      categoryId: string;
      category: string;
      categorySlug: string;
      photoLink: string;
      description: string;
      importantInfo: string;
      duration: string;
      price: string;
    }>;
  };
  _pricesCache = body.data.map((row) => ({
    id: row.id,
    categoryId: row.categoryId,
    category: row.category,
    categorySlug: row.categorySlug,
    photoLink: row.photoLink,
    price: row.price,
    description: row.description,
    importantInfo: row.importantInfo,
    duration: row.duration,
  }));
  return _pricesCache;
}

export async function getSettings(): Promise<Settings> {
  if (_settingsCache) return _settingsCache;

  const url = `${API_URL}/api/settings`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Settings fetch failed: ${res.status} ${res.statusText} (${url})`,
    );
  }
  const body = (await res.json()) as { data: Settings };
  if (!body.data) throw new Error(`Settings not found (${url})`);
  _settingsCache = body.data;
  return _settingsCache;
}

export function getNeighbours<T extends { slug: string }>(
  list: T[],
  currentSlug: string,
): Neighbours<T> {
  if (list.length < 2) return { prev: null, next: null };

  const i = list.findIndex((item) => item.slug === currentSlug);
  if (i === -1) return { prev: null, next: null };

  const prev = list[i === 0 ? list.length - 1 : i - 1] ?? null;
  const next = list[i === list.length - 1 ? 0 : i + 1] ?? null;
  return { prev, next };
}
