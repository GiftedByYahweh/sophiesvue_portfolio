import { apiClient } from "@/api"

export const fetchProfile = async () => {
  const response = await apiClient.profile.get()
  if (!response.data) throw new Error(response.error)
  return response.data
}

export const editProfile = async (profile) => {
  const formData = new FormData()
  const photo = typeof profile.photo === File ? profile.photo : null
  formData.append("text", profile.text)
  formData.append("file", photo)
  formData.append("inst", profile.inst)
  const response = await apiClient.profile.edit(formData)
  if (!response.data) throw new Error(response.error)
  return response.data
}
