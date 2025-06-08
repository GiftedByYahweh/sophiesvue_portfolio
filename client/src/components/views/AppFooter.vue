<script setup>
  import { ref } from "vue"
  import { RoutePaths } from "@/router/routes"
  import AppText from "@/components/shared/AppText.vue"
  import { AuthByName } from "@/components/features/auth"
  import { useAuthStore } from "@/stores/auth"
  import { removeToken } from "@/utils/localStorage"
  import { INSTAGRAM_URL } from "@/utils/consts"

  const auth = useAuthStore()

  const authModal = ref(false)

  const openAuthModal = () => {
    authModal.value = true
  }

  const logout = () => {
    auth.onLogout()
    removeToken()
  }
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <button v-if="!auth.isAuth" class="clear" @click="openAuthModal">
        <img src="../../assets/logoWhite.svg" />
      </button>
      <button v-else class="primary" @click="logout">Logout</button>
      <nav class="nav-block">
        <ul class="nav-list">
          <li>
            <AppText
              :to="RoutePaths.portfolio.path"
              element="RouterLink"
              variant="primary"
              hover
            >
              PORTFOLIO
            </AppText>
          </li>
          <li>
            <AppText
              :to="RoutePaths.about.path"
              element="RouterLink"
              variant="primary"
              hover
            >
              ABOUT ME
            </AppText>
          </li>
          <li>
            <AppText
              :to="RoutePaths.price.path"
              element="RouterLink"
              variant="primary"
              hover
            >
              PRICE
            </AppText>
          </li>
        </ul>
        <AppText
          element="a"
          :href="INSTAGRAM_URL"
          target="_blank"
          variant="primary"
          hover
        >
          inst →
        </AppText>
      </nav>
    </div>

    <AuthByName v-model:visible="authModal" />
  </footer>
</template>

<style scoped>
  .footer {
    background-color: var(--secondary-color);
    padding: 45px;
    display: flex;
    justify-content: center;
  }
  .footer-content {
    width: 100%;
    max-width: var(--max-content-width);
    display: flex;
    justify-content: space-between;
    gap: 40px;
  }
  .nav-block {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 250px;
  }
  .nav-list {
    display: grid;
    gap: 15px;
    list-style: none;
  }

  @media screen and (max-width: 800px) {
    .footer {
      padding: 45px 20px;
    }
    .footer-content {
      flex-direction: column;
    }
    .nav-block {
      max-width: initial;
    }
  }
</style>
