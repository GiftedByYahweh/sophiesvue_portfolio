import { apiClient } from "@/api"

export const fetchAlbum = async (category, collection) => {
  const params = new URLSearchParams({ category, collection })
  const response = await apiClient.album.getAll(params.toString())
  if (!response.data) throw new Error(response.error)
  return response.data
}
