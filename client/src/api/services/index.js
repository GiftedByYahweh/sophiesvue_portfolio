export const categoryApi = (transport) => ({
  getAll: () => transport.get("/categories"),
  getTitles: () => transport.get("/category-titles"),
})

export const collectionApi = (transport) => ({
  getAll: (params) => transport.get(`/collections?${params}`),
  getFavorites: () => transport.get("/favorite-collections"),
  getTitles: (params) => transport.get(`/collection-titles?${params}`),
})

export const albumApi = (transport) => ({
  getAll: (params) => transport.get(`/album?${params}`),
})

export const profileApi = (transport) => ({
  get: () => transport.get(`/profile`),
})

export const priceApi = (transport) => ({
  getAll: () => transport.get(`/price`),
})
