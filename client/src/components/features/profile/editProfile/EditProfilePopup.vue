<script setup>
  import AppPopup from "@/components/shared/AppPopup.vue"
  import { FileDrop } from "@/components/widgets"
  import { computed, ref, watch } from "vue"

  const visible = defineModel("visible")
  const currentInfo = defineModel("currentInfo")

  const newInfo = ref(null)

  const notEnabled = computed(() => {
    return (
      !newInfo.value.text || !newInfo.value.inst || !newInfo.value.photo.length
    )
  })

  const onSubmit = async () => {}

  watch(currentInfo, (newVal) => {
    newInfo.value = { ...newVal, photo: [newVal.photo] }
    console.log(newInfo.value.photo)
  })
</script>

<template>
  <AppPopup v-model:visible="visible" title="Edit personal info">
    <template #body="{ close }">
      <form @submit.prevent class="wrapper">
        <div class="body">
          <FileDrop v-model="newInfo.photo" />
          <div class="info">
            <textarea
              v-model="newInfo.text"
              class="text"
              type="text"
            ></textarea>
            <input v-model="newInfo.inst" type="text" />
          </div>
        </div>
        <div class="btns">
          <button class="secondary" @click="close">Close</button>
          <button
            type="submit"
            class="primary"
            :disabled="notEnabled"
            @click="onSubmit"
          >
            Save
          </button>
        </div>
      </form>
    </template>
  </AppPopup>
</template>

<style scoped>
  .wrapper {
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 10px;
  }
  .body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .text {
    min-height: 400px;
    min-width: 400px;
  }
  .info {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
