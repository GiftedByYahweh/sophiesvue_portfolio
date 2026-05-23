import {
  accountApi,
  albumApi,
  categoryApi,
  collectionApi,
  portfolioApi,
  profileApi,
  priceApi,
  settingsApi,
} from "./apiClient"
import { createTransport } from "./httpTransport"

const transport = createTransport("/api")

export const apiClient = {
  account: accountApi(transport),
  categories: categoryApi(transport),
  collections: collectionApi(transport),
  album: albumApi(transport),
  portfolio: portfolioApi(transport),
  profile: profileApi(transport),
  price: priceApi(transport),
  settings: settingsApi(transport),
}
