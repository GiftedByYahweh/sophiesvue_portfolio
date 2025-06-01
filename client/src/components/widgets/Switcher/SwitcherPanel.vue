<script setup>
  import AppText from "@/components/shared/AppText.vue"

  const { prev, next } = defineProps({
    prev: String,
    next: String,
    moreThenOne: Boolean,
  })

  const emit = defineEmits({
    onClick: null,
  })

  const onItemClick = (item) => {
    emit("onClick", item)
  }
</script>

<template>
  <div v-if="moreThenOne" class="panel">
    <Transition name="fade" mode="out-in">
      <AppText :key="'prev-' + prev" @click="onItemClick(prev)" uppercase hover>
        ← {{ prev }}
      </AppText>
    </Transition>
    <Transition name="fade" mode="out-in">
      <AppText :key="'next-' + next" @click="onItemClick(next)" uppercase hover>
        {{ next }} →
      </AppText>
    </Transition>
  </div>
</template>

<style scoped>
  .panel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
</style>
