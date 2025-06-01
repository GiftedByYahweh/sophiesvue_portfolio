<script setup>
  import { computed, ref } from "vue"
  import AppPhoto from "@/components/shared/AppPhoto.vue"
  import AppText from "@/components/shared/AppText.vue"
  import { useAuthStore } from "@/stores/auth"

  const API = import.meta.env.VITE_API_URL

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

  const photoUrl = computed(() => {
    return `${API}/${photo}`
  })

  const onDelete = () => {
    emit("delete")
  }
</script>

<template>
  <div class="card" @click="$emit('click')">
    <div class="photo-wrapper">
      <AppPhoto class="photo" :src="photoUrl" :alt="title" :square="square" />
    </div>
    <AppText v-if="title">{{ title }} →</AppText>
    <button v-if="auth.isAuth" class="close" @click.stop="onDelete">
      &times;
    </button>
  </div>
</template>

<style scoped>
  .card {
    cursor: pointer;
    position: relative;
  }
  .photo-wrapper {
    overflow: hidden;
  }
  .photo {
    transform: scale(1);
    transition: transform 0.4s ease;
  }
  .photo:hover {
    transform: scale(1.1);
  }
</style>
