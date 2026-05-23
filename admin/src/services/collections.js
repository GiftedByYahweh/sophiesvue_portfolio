import { apiClient } from "@/api"
import { usePortfolio } from "@/composables/usePortfolio"

const mapCollectionRow = (row) => ({
  id: row.id,
  title: row.name,
  slug: row.slug,
  photo: row.photoLink,
  categoryId: row.categoryId,
  type: row.isLiked ? "horizontal" : "",
  isActive: row.isActive,
  isLiked: row.isLiked,
})

export const fetchCollections = async (categorySlug) => {
  const portfolio = usePortfolio()
  const categoryId = portfolio.currentCategoryId(categorySlug)
  if (!categoryId) {
    throw new Error("Категорію не знайдено")
  }
  const response = await apiClient.collections.getByCategory(categoryId)
  return response.data.map(mapCollectionRow)
}

export const fetchFavoriteCollections = async () => {
  const response = await apiClient.collections.getFavorites()
  return response.data.map(mapCollectionRow)
}

export const fetchCollectionTitles = async (categorySlug) => {
  const portfolio = usePortfolio()
  const categoryId = portfolio.currentCategoryId(categorySlug)
  if (!categoryId) {
    throw new Error("Категорію не знайдено")
  }
  const response = await apiClient.collections.getByCategory(categoryId)
  return response.data.map(mapCollectionRow)
}

export const createCollection = async ({ title, slug, photo, status, categoryId }) => {
  const formData = new FormData()
  formData.append("name", title)
  formData.append("categoryId", categoryId)
  formData.append("photo", photo)
  if (slug) formData.append("slug", slug)
  if (status === "liked") formData.append("isLiked", "true")
  return apiClient.collections.create(formData)
}

export const updateCollection = async (id, { title, slug, isActive, isLiked, photo }) => {
  const formData = new FormData()
  formData.append("name", title)
  formData.append("slug", slug ?? "")
  formData.append("isActive", String(isActive))
  formData.append("isLiked", String(isLiked))
  if (photo) formData.append("photo", photo)
  return apiClient.collections.update(id, formData)
}

export const hideCollection = async (id) => {
  return apiClient.collections.hide(id)
}

export const restoreCollection = async (id) => {
  return apiClient.collections.restore(id)
}

export const setCollectionLiked = async (id, item, isLiked) => {
  return updateCollection(id, {
    title: item.title,
    slug: item.slug,
    isActive: item.isActive,
    isLiked,
  })
}

export const delteteCollection = async (id) => {
  return apiClient.collections.delete(id)
}
