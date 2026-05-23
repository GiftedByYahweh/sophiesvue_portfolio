export const setToken = (token) => {
  localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN, token)
}

export const getToken = () => {
  const token = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN) || ""
  return token
}

export const removeToken = () => {
  localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN)
}
