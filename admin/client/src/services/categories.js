import { apiClient } from "@/api"

const mapCategoryRow = (row) => ({
  id: row.id,
  title: row.name,
  slug: row.slug,
  photo: row.photoLink,
  isActive: row.isActive,
})

export const fetchCategories = async () => {
  const response = await apiClient.categories.getAll()
  return response.data.map(mapCategoryRow)
}

export const fetchCategoryTitles = async () => {
  const response = await apiClient.categories.getAll()
  return response.data.map(mapCategoryRow)
}

export const createCategory = async (title, slug, photo) => {
  const formData = new FormData()
  formData.append("name", title)
  formData.append("slug", slug)
  formData.append("photo", photo)
  return apiClient.categories.create(formData)
}

export const updateCategory = async (id, { title, slug, isActive, photo }) => {
  const formData = new FormData()
  formData.append("name", title)
  formData.append("slug", slug ?? "")
  formData.append("isActive", String(isActive))
  if (photo) formData.append("photo", photo)
  return apiClient.categories.update(id, formData)
}

export const hideCategory = async (id) => {
  return apiClient.categories.hide(id)
}

export const restoreCategory = async (id) => {
  return apiClient.categories.restore(id)
}

export const delteteCategory = async (id) => {
  return apiClient.categories.delete(id)
}
