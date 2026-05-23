<script setup>
  import { FavoriteCollectionsList } from "@/components/features/portfolio"
  import AppPage from "@/components/shared/AppPage.vue"
  import AppText from "@/components/shared/AppText.vue"
</script>

<template>
  <section>
    <div class="photo-container">
      <div class="title-container">
        <div class="title-block">
          <AppText
            element="h1"
            size="title"
            weight="400"
            variant="primary"
            align="center"
          >
            <AppText
              element="span"
              size="title"
              text-style="italic"
              variant="primary"
              weight="400"
            >
              SOPHIA
            </AppText>
            VITINENKO
          </AppText>
          <AppText uppercase variant="primary" align="right">
            based in kyiv
          </AppText>
        </div>
      </div>
    </div>
    <AppPage class="photo-grid">
      <FavoriteCollectionsList />
    </AppPage>
  </section>
</template>

<style scoped>
  .photo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-image: url("../assets/main.jpg");
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    background-blend-mode: darken;
  }
  .title-container {
    background: #0f0b0a66;
    display: grid;
    height: 100%;
    width: 100%;
    place-items: center;
  }
</style>
