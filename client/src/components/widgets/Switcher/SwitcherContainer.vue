<script setup>
  import { computed } from "vue"
  import SwitcherPanel from "./SwitcherPanel.vue"

  const { query, list } = defineProps({
    query: String,
    list: Array,
  })

  const emit = defineEmits({
    switchList: null,
  })

  const moreThenOne = computed(() => {
    return list.length > 0
  })

  const distributedItems = computed(() => {
    const currentIndex = list.indexOf(query)
    const lastIndex = list.length - 1
    let nextIndex = currentIndex + 1 > lastIndex ? 0 : currentIndex + 1
    let prevIndex = currentIndex - 1 < 0 ? lastIndex : currentIndex - 1
    const prev = list[prevIndex]
    const next = list[nextIndex]
    return { prev, next }
  })

  const onListSwitch = (param) => {
    emit("switchList", param)
  }
</script>

<template>
  <div class="wrapper" :class="{ hidden: !moreThenOne }">
    <SwitcherPanel
      :more-then-one="moreThenOne"
      :prev="distributedItems.prev"
      :next="distributedItems.next"
      @on-click="onListSwitch"
    />
    <Transition name="fade" mode="out-in">
      <slot></slot>
    </Transition>
    <SwitcherPanel
      :more-then-one="moreThenOne"
      :prev="distributedItems.prev"
      :next="distributedItems.next"
      @on-click="onListSwitch"
    />
  </div>
</template>

<style scoped>
  .wrapper {
    width: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: 30px;
  }
  .hidden {
    grid-template-rows: 1fr;
  }
</style>
