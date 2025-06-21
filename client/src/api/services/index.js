export const accountApi = (transport) => ({
  login: (data) => transport.post("/login", data),
  logout: () => transport.get("/logout"),
})

export const categoryApi = (transport) => ({
  getAll: () => transport.get("/categories"),
  getTitles: () => transport.get("/category-titles"),
  create: (payload) => transport.post("/category", payload),
  delete: (id) => transport.delete(`/category/${id}`),
})

export const collectionApi = (transport) => ({
  getAll: (params) => transport.get(`/collections?${params}`),
  getFavorites: () => transport.get("/favorite-collections?"),
  getTitles: () => transport.get("/collection-titles"),
  create: (payload) => transport.post("/collection", payload),
  delete: (id) => transport.delete(`/collection/${id}`),
})

export const albumApi = (transport) => ({
  getAll: (params) => transport.get(`/album?${params}`),
  create: () => transport.post("/create"),
})

export const profileApi = (transport) => ({
  get: () => transport.get(`/profile`),
  edit: (payload) => transport.post("/profile", payload),
})

export const priceApi = (transport) => ({
  getAll: () => transport.get(`/price`),
  create: (payload) => transport.post("/price", payload),
  edit: (payload) => transport.put("/price", payload),
})
