<script setup>
  import AppText from "@/components/shared/AppText.vue"
  import { useAuthStore } from "@/stores/auth"

  const emit = defineEmits({
    click: null,
  })

  const { title, buttonTitle } = defineProps({
    title: String,
    buttonTitle: String,
  })

  const auth = useAuthStore()

  const onClick = () => {
    emit("click")
  }
</script>

<template>
  <section v-if="auth.isAuth" class="admin-panel">
    <AppText uppercase>{{ title }}</AppText>
    <slot name="actions">
      <button class="secondary" @click="onClick">{{ buttonTitle }}</button>
    </slot>
  </section>
</template>

<style scoped>
  .admin-panel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--neutral-color);
  }
</style>
