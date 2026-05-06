export const $fetch = async (url, options = {}) => {
  const headers = new Headers(options.headers || {})
  const fullPath = `${import.meta.env.VITE_API_URL}${url}`
  const response = await fetch(fullPath, {
    ...options,
    headers,
  })
  return response
}
