import { apiClient } from "@/api"

const mapPriceRow = (row) => ({
  id: row.id,
  categoryId: row.categoryId,
  category: row.category,
  categorySlug: row.categorySlug,
  photoLink: row.photoLink,
  price: row.price,
  description: row.description,
  importantInfo: row.importantInfo,
  duration: row.duration,
})

export const fetchPrice = async () => {
  const response = await apiClient.price.getAll()
  return response.data.map(mapPriceRow)
}

export const addPrice = async ({ categoryId, price, description, importantInfo, duration }) => {
  return apiClient.price.create({ categoryId, price: String(price), description, importantInfo, duration })
}

export const editPrice = async (id, { categoryId, price, description, importantInfo, duration }) => {
  return apiClient.price.update(id, { categoryId, price: String(price), description, importantInfo, duration })
}

export const deletePrice = async (id) => {
  return apiClient.price.delete(id)
}
