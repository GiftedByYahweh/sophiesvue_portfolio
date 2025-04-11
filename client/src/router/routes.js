export const RoutePaths = {
  main: {
    name: "main",
    path: "/",
  },
  photo: {
    name: "photo",
    path: "/photo",
  },
  portfolio: {
    name: "portfolio",
    path: "/portfolio",
  },
  about: {
    name: "about",
    path: "/about",
  },
  price: {
    name: "price",
    path: "/price",
  },
}

export const routes = [
  {
    path: RoutePaths.main.path,
    component: () => import("@/pages/MainPage.vue"),
  },
  {
    path: RoutePaths.photo.path,
    component: () => import("@/pages/PhotoPage.vue"),
  },
  {
    path: RoutePaths.about.path,
    component: () => import("@/pages/AboutPage.vue"),
  },
  {
    path: RoutePaths.price.path,
    component: () => import("@/pages/PricePage.vue"),
  },
  {
    path: RoutePaths.portfolio.path,
    component: () => import("@/pages/PortfolioPage.vue"),
  },
]
