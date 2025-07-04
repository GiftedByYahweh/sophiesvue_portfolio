<script setup>
  import AppText from "@/components/shared/AppText.vue"
  import { RoutePaths } from "@/router/routes"
  import { INSTAGRAM_URL } from "@/utils/consts"
  import { useRouter } from "vue-router"

  const emit = defineEmits({
    onRouteClick: null,
  })
  const { textColor } = defineProps({
    textColor: String,
  })

  const router = useRouter()

  const onRouterClick = (route) => {
    router.push(route)
    emit("onRouteClick")
  }
</script>

<template>
  <nav class="nav-block">
    <ul class="nav-list">
      <li>
        <AppText
          @click="onRouterClick(RoutePaths.portfolio.path)"
          role="button"
          :variant="textColor"
          hover
        >
          PORTFOLIO
        </AppText>
      </li>
      <li>
        <AppText
          @click="onRouterClick(RoutePaths.about.path)"
          role="button"
          :variant="textColor"
          hover
        >
          ABOUT ME
        </AppText>
      </li>
      <li>
        <AppText
          @click="onRouterClick(RoutePaths.price.path)"
          role="button"
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
</template>

<style scoped>
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
  @media screen and (max-width: 768px) {
    .nav-list {
      width: 100%;
      flex-direction: column;
    }
    .nav-block {
      width: 100%;
      height: 100%;
      flex-direction: column;
      align-items: center;
    }
  }
</style>
