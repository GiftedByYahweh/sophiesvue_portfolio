<script setup>
  import { computed } from "vue"
  import { Pencil, Eye, EyeOff, Trash2, Heart, HeartOff } from "@lucide/vue"
  import AppPhoto from "@/components/shared/AppPhoto.vue"
  import AppText from "@/components/shared/AppText.vue"
  import ActionsDropdown from "@/components/shared/ActionsDropdown.vue"
  import { useAuth } from "@/composables/useAuth"
  import { useRoute } from "vue-router"
  import { RoutePaths } from "@/router/routes"

  const route = useRoute()

  const emit = defineEmits({
    click: null,
    edit: null,
    toggleVisibility: null,
    toggleLike: null,
    delete: null,
  })

  const {
    title,
    photo,
    isActive = true,
    isLiked,
  } = defineProps({
    title: String,
    photo: String,
    square: Boolean,
    isActive: { type: Boolean, default: true },
    isLiked: { type: Boolean, default: undefined },
    likeable: Boolean,
  })

  const auth = useAuth()

  const canManage = computed(() => {
    return auth.isAuth.value && route.path !== RoutePaths.main.path
  })

  const isHidden = computed(() => !isActive)

  const items = computed(() => {
    const list = [
      {
        icon: Pencil,
        label: "Редагувати",
        onSelect: () => emit("edit"),
      },
      {
        icon: isHidden.value ? Eye : EyeOff,
        label: isHidden.value ? "Відновити" : "Приховати",
        onSelect: () => emit("toggleVisibility"),
      },
    ]
    if (isLiked !== undefined) {
      list.push({
        icon: isLiked ? HeartOff : Heart,
        label: isLiked ? "Дізлайкнути" : "Лайкнути",
        onSelect: () => emit("toggleLike"),
      })
    }
    list.push({
      icon: Trash2,
      label: "Видалити",
      variant: "danger",
      onSelect: () => emit("delete"),
    })
    return list
  })
</script>

<template>
  <div
    class="card"
    :class="{ 'with-title': title, hidden: isHidden }"
    @click="$emit('click')"
  >
    <div class="photo-wrapper">
      <AppPhoto class="photo" :src="photo" :alt="title" :square="square" />
      <span v-if="isHidden" class="badge">Приховано</span>
    </div>
    <AppText v-if="title" class="title">{{ title }} →</AppText>
    <div v-if="canManage" class="actions" @click.stop>
      <ActionsDropdown :items="items" />
    </div>
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
    position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
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
  .hidden .photo {
    opacity: 0.45;
    filter: grayscale(60%);
  }
  .badge {
    position: absolute;
    top: 8px;
    left: 8px;
    padding: 3px 8px;
    font-size: 11px;
    line-height: 1;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.65);
    border-radius: 2px;
  }
  .actions {
    position: absolute;
    top: 8px;
    right: 8px;
  }
</style>
