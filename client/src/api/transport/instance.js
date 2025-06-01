import { getToken } from "@/utils/localStorage"

export const $fetch = async (url, options = {}) => {
  const token = getToken()
  const headers = new Headers(options.headers || {})
  if (token) headers.set("Authorization", `Bearer ${token}`)
  const fullPath = `${import.meta.env.VITE_API_URL}${url}`
  const response = await fetch(fullPath, {
    ...options,
    headers,
  })
  return response
}
