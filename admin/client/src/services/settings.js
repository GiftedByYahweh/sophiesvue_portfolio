import { apiClient } from "@/api"

export const fetchSettings = async () => {
  const response = await apiClient.settings.get()
  return response.data
}

export const saveSettings = async ({ instLink, mainSubTitle, mainTitleColor, mainHeaderColor, photo }) => {
  const formData = new FormData()
  formData.append("instLink", instLink)
  formData.append("mainSubTitle", mainSubTitle)
  formData.append("mainTitleColor", mainTitleColor)
  formData.append("mainHeaderColor", mainHeaderColor)
  if (photo) formData.append("photo", photo)
  return apiClient.settings.update(formData)
}
