import { apiClient } from "@/api"

export const fetchCategories = async () => {
  const response = await apiClient.categories.getAll()
  if (!response.data) throw new Error(response.error)
  return response.data
}

export const fetchCategoryTitles = async () => {
  const response = await apiClient.categories.getTitles()
  if (!response.data) throw new Error(response.error)
  return response.data
}

export const createCategory = async (title, photo) => {
  const formData = new FormData()
  formData.append("title", title)
  formData.append("file", photo)
  const response = await apiClient.categories.create(formData)
  if (!response.data) throw new Error(response.error)
  return response.data
}

export const delteteCategory = async (id) => {
  const response = await apiClient.categories.delete(id)
  if (!response.data) throw new Error(response.error)
  return response.data
}
