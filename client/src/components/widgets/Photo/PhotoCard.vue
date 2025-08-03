<script setup>
  import { computed } from "vue"
  import AppPhoto from "@/components/shared/AppPhoto.vue"
  import AppText from "@/components/shared/AppText.vue"
  import { useAuthStore } from "@/stores/auth"
  import { useRoute } from "vue-router"
  import { RoutePaths } from "@/router/routes"

  const route = useRoute()

  const emit = defineEmits({
    click: null,
    delete: null,
  })

  const { title, photo } = defineProps({
    title: String,
    photo: String,
    square: Boolean,
  })

  const auth = useAuthStore()

  const canDelete = computed(() => {
    return auth.isAuth && route.path !== RoutePaths.main.path
  })

  const onDelete = () => {
    emit("delete")
  }
</script>

<template>
  <div class="card" :class="{ 'with-title': title }" @click="$emit('click')">
    <div class="photo-wrapper">
      <AppPhoto class="photo" :src="photo" :alt="title" :square="square" />
    </div>
    <AppText v-if="title" class="title">{{ title }} →</AppText>
    <button v-if="canDelete" class="close" @click.stop="onDelete">
      &times;
    </button>
  </div>
</template>

<style scoped>
  .card {
    cursor: pointer;
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
  }
  .photo-wrapper {
    overflow: hidden;
    height: 100%;
  }
  .photo {
    transform: scale(1);
    transition: transform 0.4s ease;
  }
  .photo:hover {
    transform: scale(1.1);
  }
  .with-title {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
