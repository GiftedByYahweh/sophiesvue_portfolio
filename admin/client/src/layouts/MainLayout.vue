<script setup>
  import { ref } from "vue"
  import { useAuth } from "@/composables/useAuth"
  import { RoutePaths } from "@/router/routes"
  import logoBlack from "@/assets/logoBlack.svg"
  import AppPopup from "@/components/shared/AppPopup.vue"
  import PublishConfirm from "@/components/features/publish/PublishConfirm.vue"

  const auth = useAuth()
  const showPublish = ref(false)
</script>

<template>
  <div class="admin-layout">
    <nav class="admin-nav">
      <RouterLink :to="RoutePaths.portfolio.path" class="logo">
        <img :src="logoBlack" alt="logo" />
      </RouterLink>
      <ul class="nav-links">
        <li>
          <RouterLink :to="RoutePaths.portfolio.path">PORTFOLIO</RouterLink>
        </li>
        <li>
          <RouterLink :to="RoutePaths.about.path">ABOUT ME</RouterLink>
        </li>
        <li>
          <RouterLink :to="RoutePaths.price.path">PRICE</RouterLink>
        </li>
        <li>
          <RouterLink :to="RoutePaths.settings.path">SETTINGS</RouterLink>
        </li>
      </ul>
      <button
        v-if="auth.isAuth"
        class="primary publish-btn"
        @click="showPublish = true"
      >
        Опублікувати
      </button>
      <button v-if="auth.isAuth" class="secondary logout-btn" @click="auth.onLogout">
        Logout
      </button>
    </nav>
    <main class="admin-body">
      <slot />
    </main>

    <AppPopup v-model:visible="showPublish" title="Оновити версію сайта">
      <template #body="{ close }">
        <PublishConfirm @close="close" />
      </template>
    </AppPopup>
  </div>
</template>

<style scoped>
  .admin-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .admin-nav {
    display: flex;
    align-items: center;
    gap: 40px;
    padding: 16px 45px;
    border-bottom: 1px solid var(--neutral-color);
    background: var(--primary-color);
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .logo img {
    height: 32px;
    display: block;
  }
  .nav-links {
    display: flex;
    gap: 30px;
    list-style: none;
    flex: 1;
  }
  .nav-links a {
    font-size: 0.85rem;
    letter-spacing: 0.05em;
    color: var(--secondary-color);
    opacity: 0.5;
    transition: opacity 0.15s;
  }
  .nav-links a:hover,
  .nav-links a.router-link-active {
    opacity: 1;
  }
  .publish-btn {
    margin-left: auto;
    flex-shrink: 0;
  }
  .logout-btn {
    flex-shrink: 0;
  }
  .admin-body {
    flex: 1;
  }
</style>
