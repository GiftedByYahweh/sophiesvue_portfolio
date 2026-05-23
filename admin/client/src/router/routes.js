export const RoutePaths = {
  main: { name: "main", path: "/" },
  portfolio: { name: "portfolio", path: "/portfolio" },
  collections: { name: "collections", path: "/portfolio/:category" },
  album: { name: "album", path: "/portfolio/:category/:collection" },
  about: { name: "about", path: "/about" },
  price: { name: "price", path: "/price" },
  settings: { name: "settings", path: "/settings" },
  auth: { name: "auth", path: "/auth" },
}

export const routes = [
  {
    path: RoutePaths.auth.path,
    name: RoutePaths.auth.name,
    component: () => import("@/pages/AuthPage.vue"),
    meta: { layout: "AuthLayout" },
  },
  {
    path: RoutePaths.main.path,
    redirect: RoutePaths.portfolio.path,
  },
  {
    path: RoutePaths.about.path,
    name: RoutePaths.about.name,
    component: () => import("@/pages/AboutPage.vue"),
    meta: { layout: "MainLayout", requiresAuth: true },
  },
  {
    path: RoutePaths.price.path,
    name: RoutePaths.price.name,
    component: () => import("@/pages/PricePage.vue"),
    meta: { layout: "MainLayout", requiresAuth: true },
  },
  {
    path: RoutePaths.settings.path,
    name: RoutePaths.settings.name,
    component: () => import("@/pages/SettingsPage.vue"),
    meta: { layout: "MainLayout", requiresAuth: true },
  },
  {
    path: RoutePaths.portfolio.path,
    name: RoutePaths.portfolio.name,
    component: () => import("@/pages/CategoriesPage.vue"),
    meta: { layout: "MainLayout", requiresAuth: true },
  },
  {
    path: RoutePaths.collections.path,
    name: RoutePaths.collections.name,
    component: () => import("@/pages/CollectionsPage.vue"),
    meta: { layout: "MainLayout", requiresAuth: true },
  },
  {
    path: RoutePaths.album.path,
    name: RoutePaths.album.name,
    component: () => import("@/pages/AlbumPage.vue"),
    meta: { layout: "MainLayout", requiresAuth: true },
  },
]
