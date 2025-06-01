import { apiClient } from "@/api"

export const fetchCollections = async (name) => {
  const params = new URLSearchParams({ category: name })
  const response = await apiClient.collections.getAll(params.toString())
  if (!response.data) throw new Error(response.error)
  return response.data
}

export const fetchCollectionTitles = async (name) => {
  const params = new URLSearchParams({ category: name })
  const response = await apiClient.collections.getTitles(params.toString())
  if (!response.data) throw new Error(response.error)
  return response.data
}

export const createCollection = async ({ title, photo, liked, categoryId }) => {
  const formData = new FormData()
  formData.append("title", title)
  formData.append("liked", liked)
  formData.append("file", photo)
  formData.append("categoryId", categoryId)
  const response = await apiClient.collections.create(formData)
  if (!response.data) throw new Error(response.error.message)
  return response.data
}

export const delteteCollection = async (id) => {
  const response = await apiClient.collections.delete(id)
  if (!response.data) throw new Error(response.error)
  return response.data
}
