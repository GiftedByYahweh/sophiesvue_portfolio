export const createTransport = (instance) => ({
  get: async (url, params) => {
    const response = await instance(url, params)
    return response.json()
  },
})
