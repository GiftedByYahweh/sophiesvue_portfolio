import { apiClient } from "@/api"

export const fetchAlbum = async (collection) => {
  const params = new URLSearchParams({ collection: collection })
  const response = await apiClient.album.getAll(params.toString())
  if (!response.data) throw new Error(response.error)
  return response.data
}
