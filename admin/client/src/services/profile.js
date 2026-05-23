import { apiClient } from "@/api"

export const fetchProfile = async () => {
  const response = await apiClient.profile.get()
  return response.data
}

export const editProfile = async ({ text, contactInfo, photo }) => {
  const about = await apiClient.profile.get()
  if (!about.data?.id) throw new Error("Профіль не знайдено")
  const formData = new FormData()
  formData.append("text", text)
  formData.append("contactInfo", contactInfo)
  if (photo) formData.append("photo", photo)
  return apiClient.profile.update(about.data.id, formData)
}
