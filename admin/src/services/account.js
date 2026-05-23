import { apiClient } from "@/api"

export const loginByUsername = async (username, password) => {
  const result = await apiClient.account.login({ username, password })
  if (!result.ok) {
    throw new Error(result.message || "Не вдалося увійти")
  }
  return result
}
