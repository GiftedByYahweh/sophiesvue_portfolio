import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const proxyTarget = env.VITE_PROXY_TARGET || "http://127.0.0.1:5000"

  return {
    plugins: [vue()],
    resolve: {
      alias: [{ find: "@", replacement: "/src" }],
    },
    server: {
      open: true,
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
  }
})
