import { apiClient } from "@/api"

export const fetchPrice = async () => {
  const response = await apiClient.price.getAll()
  if (!response.data) throw new Error(response.error)
  return response.data
}

export const addPrice = async ({
  price,
  category,
  photo,
  description,
  importantInfo,
}) => {
  const formData = new FormData()
  formData.append("price", price)
  formData.append("photo", photo)
  formData.append("description", description)
  formData.append("importantInfo", importantInfo)
  formData.append("category", category)
  const response = await apiClient.price.create(formData)
  if (!response.data) throw new Error(response.error)
  return response.data
}

export const editPrice = async ({
  price,
  category,
  photo,
  description,
  importantInfo,
}) => {
  const formData = new FormData()
  formData.append("price", price)
  formData.append("photo", photo)
  formData.append("description", description)
  formData.append("importantInfo", importantInfo)
  formData.append("category", category)
  const response = await apiClient.price.edit(formData)
  if (!response.data) throw new Error(response.error)
  return response.data
}
