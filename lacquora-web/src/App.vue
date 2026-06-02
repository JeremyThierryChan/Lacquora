<script setup lang="ts">
import { useUIStore } from '@/stores/useUIStore'
import { useScroll } from '@vueuse/core'

const uiStore = useUIStore()
const { y } = useScroll(window)

watch(y, (val) => {
  uiStore.setNavScrolled(val > 60)
})
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="page" mode="out-in">
      <component :is="Component" :key="route.path" />
    </Transition>
  </RouterView>
</template>
