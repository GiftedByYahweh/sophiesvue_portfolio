<script setup>
  import AppPopup from "@/components/shared/AppPopup.vue"
  import AppText from "@/components/shared/AppText.vue"
  import { computed } from "vue"

  const visible = defineModel()
  const { portfolio, name } = defineProps({
    portfolio: String,
    name: String,
  })
  const emit = defineEmits({
    delete: null,
    close: null,
  })

  const popupTitle = computed(() => {
    return `delete ${portfolio}`
  })
</script>

<template>
  <AppPopup v-model:visible="visible" :title="popupTitle">
    <template #body>
      <form @submit.prevent>
        <AppText align="center">
          Delete
          <AppText element="span" variant="accent">
            {{ name }}
          </AppText>
          ?
        </AppText>
        <div class="wrapper">
          <button class="secondary" @click="$emit('close')">Cancel</button>
          <button type="submit" class="primary" @click="$emit('delete')">
            Delete
          </button>
        </div>
      </form>
    </template>
  </AppPopup>
</template>

<style scoped>
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    gap: 10px;
  }
</style>
