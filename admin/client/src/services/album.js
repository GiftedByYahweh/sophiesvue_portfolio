import { apiClient } from "@/api"
import { usePortfolio } from "@/composables/usePortfolio"

const mapAlbumRow = (row) => ({
  id: row.id,
  title: row.name,
  slug: row.slug,
  photo: row.photoLink,
  type: row.type === "horizontal" ? "horizontal" : "",
  isActive: row.isActive,
})

export const fetchAlbum = async (collectionSlug) => {
  const portfolio = usePortfolio()
  const collectionId = portfolio.currentCollectionId(collectionSlug)
  if (!collectionId) {
    throw new Error("Колекцію не знайдено")
  }
  const response = await apiClient.album.getByCollection(collectionId)
  return response.data.map(mapAlbumRow)
}

export const createAlbums = async ({ collectionId, photos, type }) => {
  const photoType = type ? "horizontal" : "normal"
  let last
  for (let i = 0; i < photos.length; i++) {
    const formData = new FormData()
    formData.append("collectionId", collectionId)
    formData.append("type", photoType)
    formData.append("name", `Photo ${i + 1}`)
    formData.append("photo", photos[i])
    last = await apiClient.album.create(formData)
  }
  return last
}

export const updateAlbum = async (id, { title, slug, isActive, type, photo }) => {
  const formData = new FormData()
  formData.append("name", title)
  formData.append("slug", slug ?? "")
  formData.append("isActive", String(isActive))
  formData.append("type", type || "normal")
  if (photo) formData.append("photo", photo)
  return apiClient.album.update(id, formData)
}

export const hideAlbum = async (id) => {
  return apiClient.album.hide(id)
}

export const restoreAlbum = async (id) => {
  return apiClient.album.restore(id)
}

export const delteteAlbum = async (id) => {
  return apiClient.album.delete(id)
}
