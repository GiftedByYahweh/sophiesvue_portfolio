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
