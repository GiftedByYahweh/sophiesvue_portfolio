<script setup>
  import { RoutePaths } from "@/router/routes"
  import { INSTAGRAM_URL } from "@/utils/consts"
</script>

<template>
  <div>
    <button class="burger_wrapper">x</button>
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
</template>

<style scoped></style>
