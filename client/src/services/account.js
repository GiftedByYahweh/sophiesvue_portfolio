import { apiClient } from "@/api"

export const loginByUsername = async (username, password) => {
  const response = await apiClient.account.login({
    username,
    password,
  })
  if (!response.data) throw new Error(response.error)
  return response.data
}
