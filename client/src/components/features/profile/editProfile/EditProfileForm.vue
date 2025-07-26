<script setup>
  import { FileDrop } from "@/components/widgets"
  import { editProfile } from "@/services/profile"
  import { QueryClient, useMutation, useQueryClient } from "@tanstack/vue-query"
  import { ref, computed } from "vue"

  const queryClient = useQueryClient()

  const emit = defineEmits({
    close: null,
  })
  const currentInfo = defineModel()

  const newInfo = ref({
    ...currentInfo.value,
    photo: [currentInfo.value.photo],
    prevPhoto: currentInfo.value.photo,
  })

  const notEnabled = computed(() => {
    return (
      !newInfo.value.text || !newInfo.value.inst || !newInfo.value.photo.length
    )
  })

  const newPhoto = computed(() => {
    const file = newInfo.value.photo[0]
    return file instanceof File ? file : null
  })

  const onCreateSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["about"] })
    emit("close")
  }

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: () => editProfile({ ...newInfo.value, photo: newPhoto.value }),
    onSuccess: onCreateSuccess,
  })

  const onEdit = async () => {
    try {
      await mutateAsync()
    } catch (e) {
      console.log()
    }
  }
</script>

<template>
  <form @submit.prevent class="wrapper">
    <div class="body">
      <FileDrop v-model="newInfo.photo" />
      <div class="info">
        <textarea v-model="newInfo.text" class="text" type="text"></textarea>
        <input v-model="newInfo.inst" type="text" />
      </div>
    </div>
    <div class="btns">
      <button class="secondary" @click="$emit('close')">Close</button>
      <button
        type="submit"
        class="primary"
        :disabled="notEnabled"
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
</style>
