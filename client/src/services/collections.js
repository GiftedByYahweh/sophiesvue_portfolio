import { apiClient } from "@/api"

export const fetchCollections = async (name) => {
  const params = new URLSearchParams({ category: name })
  const response = await apiClient.collections.getAll(params.toString())
  if (!response.data) throw new Error(response.error)
  return response.data
}

export const fetchFavoriteCollections = async () => {
  const response = await apiClient.collections.getFavorites()
  if (!response.data) throw new Error(response.error)
  return response.data
}

export const fetchCollectionTitles = async (name) => {
  const params = new URLSearchParams({ category: name })
  const response = await apiClient.collections.getTitles(params.toString())
  if (!response.data) throw new Error(response.error)
  return response.data
}
