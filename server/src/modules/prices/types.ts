export interface CreatePricePayload {
  categoryId: string;
  description: string;
  importantInfo: string;
  duration: string;
  price: string;
}

export type UpdatePricePayload = CreatePricePayload;
