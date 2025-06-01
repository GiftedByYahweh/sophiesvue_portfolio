<script setup>
  import AppPhoto from "@/components/shared/AppPhoto.vue"
  import AppText from "@/components/shared/AppText.vue"
  import AppLoader from "@/components/shared/AppLoader.vue"
  import { computed } from "vue"
  import { useQuery } from "@tanstack/vue-query"
  import { fetchProfile } from "@/services/profile"

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    retry: false,
  })

  const instagramName = computed(() => {
    const instUrl = new URL(data.value.inst)
    const userName = instUrl.pathname.split("/")[1]
    return userName
  })
</script>

<template>
  <AppLoader v-if="isLoading"></AppLoader>
  <div v-else class="about-me">
    <AppPhoto :src="data.photo" alt="Portfolio Photo" />
    <div class="info">
      <div class="about">
        <p class="formatted-text">{{ data.text }}</p>
      </div>
      <div class="contact">
        <AppText>To contact me you can write me to:</AppText>
        <AppText>
          instagram -
          <AppText
            element="a"
            :href="data.inst"
            target="_blank"
            variant="accent"
            underline
          >
            @{{ instagramName }}
          </AppText>
        </AppText>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .about-me {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
  }
  .info {
    display: grid;
    gap: 40px;
    grid-template-rows: 1fr auto;
  }
  .about {
    display: grid;
    height: 100%;
  }
  .contact {
    display: grid;
    gap: 30px;
  }
  .formatted-text {
    white-space: pre-wrap;
  }
</style>
