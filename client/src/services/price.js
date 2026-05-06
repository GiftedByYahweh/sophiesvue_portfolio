import { apiClient } from "@/api"

export const fetchPrice = async () => {
  const response = await apiClient.price.getAll()
  if (!response.data) throw new Error(response.error)
  return response.data
}
