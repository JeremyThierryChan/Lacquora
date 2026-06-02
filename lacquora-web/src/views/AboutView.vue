<script setup lang="ts">
const { t } = useI18n()
</script>
<template>
  <div class="pt-[72px] min-h-screen bg-obsidian">
    <div class="container-site section-padding">
      <span class="type-label tracking-[0.25em] text-gold/60 block mb-6">{{ t('about.label') }}</span>
      <h1 class="type-section-title text-ivory">{{ t('about.title') }}</h1>
    </div>
  </div>
</template>
