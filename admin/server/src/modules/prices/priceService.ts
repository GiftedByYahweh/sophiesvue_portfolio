import { AppError, ErrorCode } from '#common/appError';
import { PricesRepository } from './pricesRepository';
import { CreatePricePayload, UpdatePricePayload } from './types';

export type PriceService = ReturnType<typeof priceService>;

export function priceService(pricesRepo: PricesRepository) {
  async function getAll() {
    return pricesRepo.getAllWithCategory();
  }

  async function create(payload: CreatePricePayload) {
    const existing = await pricesRepo.findByCategoryAndDuration(payload.categoryId, payload.duration);
    if (existing) {
      throw new AppError(ErrorCode.VALIDATION_ERROR, 'Така тривалість уже існує в цій категорії');
    }
    return pricesRepo.create({
      id: crypto.randomUUID(),
      categoryId: payload.categoryId,
      description: payload.description,
      importantInfo: payload.importantInfo,
      duration: payload.duration,
      price: payload.price,
    });
  }

  async function update(id: string, payload: UpdatePricePayload) {
    const price = await pricesRepo.findById(id);
    if (!price) throw new AppError(ErrorCode.NOT_FOUND, 'Прайс не знайдено');

    const existing = await pricesRepo.findByCategoryAndDuration(payload.categoryId, payload.duration);
    if (existing && existing.id !== id) {
      throw new AppError(ErrorCode.VALIDATION_ERROR, 'Така тривалість уже існує в цій категорії');
    }

    return pricesRepo.update(id, {
      categoryId: payload.categoryId,
      description: payload.description,
      importantInfo: payload.importantInfo,
      duration: payload.duration,
      price: payload.price,
    });
  }

  async function remove(id: string) {
    const price = await pricesRepo.findById(id);
    if (!price) throw new AppError(ErrorCode.NOT_FOUND, 'Прайс не знайдено');
    await pricesRepo.delete(id);
    return { id };
  }

  return { getAll, create, update, delete: remove };
}
