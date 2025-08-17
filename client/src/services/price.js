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
  description2,
  importantInfo2,
}) => {
  const formData = new FormData()
  formData.append("price", price)
  formData.append("file", photo)
  formData.append("description", description)
  formData.append("description2", description2)
  formData.append("importantInfo", importantInfo)
  formData.append("importantInfo2", importantInfo2)
  formData.append("category", category)
  const response = await apiClient.price.create(formData)
  if (!response.data) throw new Error(response.error)
  return response.data
}

export const editPrice = async ({
  price,
  category,
  photo,
  prevPhoto,
  description,
  description2,
  importantInfo,
  importantInfo2,
}) => {
  const formData = new FormData()
  formData.append("price", price)
  formData.append("file", photo)
  formData.append("prevPhoto", prevPhoto)
  formData.append("description", description)
  formData.append("description2", description2)
  formData.append("importantInfo", importantInfo)
  formData.append("importantInfo2", importantInfo2)
  formData.append("category", category)
  const response = await apiClient.price.edit(formData)
  if (!response.data) throw new Error(response.error)
  return response.data
}
