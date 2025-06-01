export const RoutePaths = {
  main: {
    name: "main",
    path: "/",
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
    name: RoutePaths.main.name,
    component: () => import("@/pages/MainPage.vue"),
  },
  {
    path: RoutePaths.about.path,
    name: RoutePaths.about.name,
    component: () => import("@/pages/AboutPage.vue"),
  },
  {
    path: RoutePaths.price.path,
    name: RoutePaths.price.name,
    component: () => import("@/pages/PricePage.vue"),
  },
  {
    path: RoutePaths.portfolio.path,
    name: RoutePaths.portfolio.name,
    component: () => import("@/pages/PortfolioPage.vue"),
  },
]
