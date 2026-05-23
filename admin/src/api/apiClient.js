export const accountApi = (transport) => ({
  login: (data) => transport.post("/auth/login", data),
  logout: () => transport.post("/auth/logout"),
  session: () => transport.get("/auth/session"),
})

export const categoryApi = (transport) => ({
  getAll: () => transport.get("/categoties/all"),
  getTitles: () => transport.get("/categoties/short-list"),
  create: (payload) => transport.post("/categoties/create", payload),
  update: (id, payload) =>
    transport.patch(`/categoties/category/${id}`, payload),
  hide: (id) => transport.patch(`/categoties/category/${id}/hide`),
  restore: (id) => transport.patch(`/categoties/category/${id}/restore`),
  delete: (id) => transport.delete(`/categoties/category/${id}`),
})

export const collectionApi = (transport) => ({
  getByCategory: (categoryId) =>
    transport.get(`/collections/by-category/${categoryId}`),
  getTitles: (categoryId) =>
    transport.get(`/collections/short-list/${categoryId}`),
  getFavorites: () => transport.get("/collections/favorites"),
  create: (payload) => transport.post("/collections/create", payload),
  update: (id, payload) =>
    transport.patch(`/collections/collection/${id}`, payload),
  hide: (id) => transport.patch(`/collections/collection/${id}/hide`),
  restore: (id) => transport.patch(`/collections/collection/${id}/restore`),
  delete: (id) => transport.delete(`/collections/collection/${id}`),
})

export const albumApi = (transport) => ({
  getByCollection: (collectionId) =>
    transport.get(`/albums/by-collection/${collectionId}`),
  create: (payload) => transport.post("/albums/create", payload),
  update: (id, payload) => transport.patch(`/albums/album/${id}`, payload),
  hide: (id) => transport.patch(`/albums/album/${id}/hide`),
  restore: (id) => transport.patch(`/albums/album/${id}/restore`),
  delete: (id) => transport.delete(`/albums/album/${id}`),
})

export const portfolioApi = (transport) => ({
  getSnapshot: () => transport.get("/portfolio/snapshot"),
})

export const profileApi = (transport) => ({
  get: () => transport.get("/profile/about"),
  update: (id, payload) => transport.patch(`/profile/about/${id}`, payload),
})

export const priceApi = (transport) => ({
  getAll: () => transport.get("/price/all"),
  create: (payload) => transport.post("/price/create", payload),
  update: (id, payload) => transport.patch(`/price/price/${id}`, payload),
  delete: (id) => transport.delete(`/price/price/${id}`),
})

export const settingsApi = (transport) => ({
  get: () => transport.get("/settings"),
  update: (payload) => transport.patch("/settings", payload),
})
