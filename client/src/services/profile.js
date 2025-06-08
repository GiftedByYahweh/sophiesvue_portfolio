import { apiClient } from "@/api"

export const fetchProfile = async () => {
  const response = await apiClient.profile.get()
  if (!response.data) throw new Error(response.error)
  return response.data
}

export const editProfile = async (profile) => {
  const formData = new FormData()
  formData.append("text", profile.text)
  formData.append("file", profile.photo)
  formData.append("inst", profile.inst)
  const response = await apiClient.profile.edit(formData)
  if (!response.data) throw new Error(response.error)
  return response.data
}
