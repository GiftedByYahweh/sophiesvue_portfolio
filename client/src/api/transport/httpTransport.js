export const createTransport = (instance) => ({
  get: async (url, params) => {
    const response = await instance(url, params)
    return response.json()
  },
  post: async (url, data) => {
    const isFormData = data instanceof FormData
    const payload = isFormData ? data : JSON.stringify(data)
    const headers = {}
    if (!isFormData) headers["Content-Type"] = "application/json"
    const response = await instance(url, {
      method: "POST",
      headers,
      body: payload,
    })
    return response.json()
  },
  delete: async (url) => {
    const response = await instance(url, {
      method: "DELETE",
    })
    return response.json()
  },
})
