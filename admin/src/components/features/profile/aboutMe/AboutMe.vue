<script setup>
  import AppPhoto from "@/components/shared/AppPhoto.vue"
  import AppLoader from "@/components/shared/AppLoader.vue"

  const {
    about = {},
    isLoading,
    error,
  } = defineProps({
    about: Object,
    isLoading: Boolean,
    error: String,
  })
</script>

<template>
  <AppLoader v-if="isLoading"></AppLoader>
  <div v-if="!about">NO DATA</div>
  <div v-else class="about-me">
    <AppPhoto :src="about.photo" alt="Portfolio Photo" />
    <div class="info">
      <div class="about">
        <p class="formatted-text">{{ about.text }}</p>
      </div>
      <div class="contact">
        <p class="formatted-text">{{ about.contactInfo }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .about-me {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
    height: 100%;
  }
  .info {
    display: grid;
    gap: 40px;
    grid-template-rows: 1fr auto;
  }
  .about {
    display: grid;
    height: 100%;
  }
  .contact {
    display: grid;
  }
  .formatted-text {
    white-space: pre-wrap;
  }
</style>
