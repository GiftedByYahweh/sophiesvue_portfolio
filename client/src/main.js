import { createApp } from "vue"
import { createPinia } from "pinia"
import { VueQueryPlugin } from "@tanstack/vue-query"
import "@/css/app.css"
import App from "./App.vue"
import router from "@/router/router"

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueQueryPlugin)
app.mount("#portfolio")
