import { apiClient } from "@/api"

export const fetchProfile = async () => {
  const response = await apiClient.profile.get()
  if (!response.data) throw new Error(response.error)
  return response.data
}
