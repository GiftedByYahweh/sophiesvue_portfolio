import { apiClient } from "@/api"

export const fetchAlbum = async (category, collection) => {
  const params = new URLSearchParams({ category, collection })
  const response = await apiClient.album.getAll(params.toString())
  if (!response.data) throw new Error(response.error)
  return response.data
}

export const createAlbums = async ({ collectionId, photos, type }) => {
  let i = 1
  const formData = new FormData()
  const photoType = type === "horizontal" ? "horizontal" : "normal"
  formData.append("collectionId", collectionId)
  formData.append("type", photoType)
  for (const photo of photos) {
    formData.append(`file${i}`, photo)
    i++
  }
  const response = await apiClient.album.create(formData)
  if (!response.data) throw new Error(response.error)
  return response.datal
}

export const delteteAlbum = async (id) => {
  const response = await apiClient.album.delete(id)
  if (!response.data) throw new Error(response.error)
  return response.data
}
