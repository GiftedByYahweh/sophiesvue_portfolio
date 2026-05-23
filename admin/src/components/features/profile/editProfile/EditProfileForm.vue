<script setup>
  import AppLoader from "@/components/shared/AppLoader.vue"
  import { FileDrop } from "@/components/widgets"
  import { editProfile } from "@/services/profile"
  import { useMutation, useQueryClient } from "@tanstack/vue-query"
  import { ref, computed } from "vue"
  import { useToast } from "@/composables/useToast"

  const queryClient = useQueryClient()
  const toast = useToast()

  const emit = defineEmits({
    close: null,
  })
  const currentInfo = defineModel()

  const newInfo = ref({
    ...currentInfo.value,
    photo: [currentInfo.value.photo],
  })

  const notEnabled = computed(() => {
    return !newInfo.value.text || !newInfo.value.photo.length
  })

  const newPhoto = computed(() => {
    const file = newInfo.value.photo[0]
    return file instanceof File ? file : null
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => editProfile({ ...newInfo.value, photo: newPhoto.value }),
  })

  const onEdit = async () => {
    const result = await mutateAsync()
    if (result.ok) {
      toast.success("Успішно збережено профіль")
      queryClient.invalidateQueries({ queryKey: ["about"] })
      emit("close")
    } else {
      toast.error(result.message ?? "Помилка")
    }
  }
</script>

<template>
  <form @submit.prevent class="wrapper">
    <div class="body">
      <FileDrop v-model="newInfo.photo" />
      <div class="info">
        <textarea v-model="newInfo.text" class="text" type="text"></textarea>
        <textarea v-model="newInfo.contactInfo" class="contact-info"></textarea>
      </div>
    </div>
    <div class="btns">
      <button class="secondary" @click="$emit('close')">Close</button>
      <div v-if="isPending" class="loading-box">
        <AppLoader />
      </div>
      <button
        type="submit"
        class="primary"
        :disabled="notEnabled || isPending"
        @click="onEdit"
      >
        Save
      </button>
    </div>
  </form>
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
  .loading-box {
    position: relative;
    max-width: 100px;
  }
</style>
