import { apiClient } from "@/api"

export const fetchProfile = async () => {
  const response = await apiClient.profile.getAll()
  if (!response.data) throw new Error(response.error)
  return response.data
}
