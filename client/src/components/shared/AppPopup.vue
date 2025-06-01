<script setup>
  import AppText from "./AppText.vue"

  const { title } = defineProps({
    title: String,
  })
  const isVisible = defineModel("visible")

  defineOptions({
    inheritAttrs: false,
  })

  const onClose = () => {
    isVisible.value = false
  }
</script>

<template>
  <Teleport to="body">
    <Transition name="fade" mode="out-in">
      <div v-if="isVisible" class="container">
        <div class="popup" v-bind="$attrs">
          <AppText class="title" uppercase>{{ title }}</AppText>
          <slot name="body" :close="onClose"></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
  .container {
    position: fixed;
    width: 100%;
    height: 100%;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.243);
    display: grid;
    place-items: center;
    z-index: 100;
  }
  .popup {
    background-color: var(--primary-color);
    padding: 15px;
    border-radius: 2px;
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 10px;
  }
  .title {
    padding-bottom: 10px;
    border-bottom: 1px solid var(--neutral-color);
  }
</style>
