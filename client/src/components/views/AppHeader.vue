<script setup>
  import { RoutePaths } from "@/router/routes"
  import AppText from "@/components/shared/AppText.vue"
  import { computed } from "vue"
  import { useRoute } from "vue-router"
  import { INSTAGRAM_URL } from "@/utils/consts"

  const route = useRoute()

  const textColor = computed(() => {
    return route.path === RoutePaths.main.path ? "primary" : "secondary"
  })
  const logoVariant = computed(() => {
    return route.path === RoutePaths.main.path ? "logoWhite" : "logoBlack"
  })
</script>

<template>
  <header class="header blur">
    <div class="content">
      <RouterLink :to="RoutePaths.main.path">
        <img :src="`/src/assets/${logoVariant}.svg`" alt="" />
      </RouterLink>
      <nav class="nav-block">
        <ul class="nav-list">
          <li>
            <AppText
              :to="RoutePaths.portfolio.path"
              element="RouterLink"
              :variant="textColor"
              hover
            >
              PORTFOLIO
            </AppText>
          </li>
          <li>
            <AppText
              :to="RoutePaths.about.path"
              element="RouterLink"
              :variant="textColor"
              hover
            >
              ABOUT ME
            </AppText>
          </li>
          <li>
            <AppText
              :to="RoutePaths.price.path"
              element="RouterLink"
              :variant="textColor"
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
          :variant="textColor"
          hover
        >
          inst →
        </AppText>
      </nav>
    </div>
  </header>
</template>

<style scoped>
  .header {
    width: 100%;
    height: var(--header-height);
    padding: 45px;
    position: fixed;
    display: flex;
    justify-content: center;
    z-index: 1;
  }
  .content {
    width: 100%;
    max-width: var(--max-content-width);
    display: flex;
    justify-content: space-between;
  }
  .nav-block {
    width: 60%;
    display: flex;
    justify-content: space-between;
  }
  .nav-list {
    display: flex;
    gap: 30px;
    list-style: none;
  }
  .blur {
    backdrop-filter: blur(10px);
  }

  @media screen and (max-width: 800px) {
    .header {
      padding: 45px 20px;
    }
  }
</style>
