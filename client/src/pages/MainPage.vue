<script setup>
  import AppPage from "@/components/shared/AppPage.vue"
  import AppPhoto from "@/components/shared/AppPhoto.vue"
  import AppText from "@/components/shared/AppText.vue"

  const photos = [
    {
      src: "src/assets/hor.jpg",
      alt: "Photo 1",
    },
    {
      src: "src/assets/main.jpg",
      alt: "Photo 2",
    },
    {
      src: "src/assets/main.jpg",
      alt: "Photo 3",
    },
    {
      src: "src/assets/hor.jpg",
      alt: "Photo 4",
    },
    {
      src: "src/assets/sq.jpeg",
      alt: "Photo 5",
    },
  ]
</script>

<template>
  <section>
    <div class="photo-container">
      <div class="title-container">
        <div class="title-block">
          <AppText element="h1" size="title" weight="400" variant="primary">
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
          <AppText uppercase variant="primary">based in kyiv</AppText>
        </div>
      </div>
    </div>
    <AppPage class="photo-grid">
      <AppPhoto v-for="photo in photos" :src="photo.src" :alt="photo.alt" />
    </AppPage>
  </section>
</template>

<style scoped>
  .photo-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  .photo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-image: url("../assets/main.jpg");
    background-size: cover;
    background-position: center;
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
