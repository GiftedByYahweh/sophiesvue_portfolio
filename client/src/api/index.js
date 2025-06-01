import {
  categoryApi,
  accountApi,
  collectionApi,
  albumApi,
  profileApi,
  priceApi,
} from "./services"
import { createTransport } from "./transport/httpTransport"
import { $fetch } from "./transport/instance"

const transport = createTransport($fetch)

export const apiClient = {
  account: accountApi(transport),
  categories: categoryApi(transport),
  collections: collectionApi(transport),
  album: albumApi(transport),
  profile: profileApi(transport),
  price: priceApi(transport),
}
