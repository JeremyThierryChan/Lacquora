<script setup lang="ts">
interface Props {
  series: 'lacquer' | 'future' | 'master'
}
defineProps<Props>()

const seriesMap = {
  lacquer: { label: 'Lacquer Series', labelZh: '漆艺', color: 'text-lacquer border-lacquer/40' },
  future:  { label: 'Future Series',  labelZh: '未来', color: 'text-silver/50 border-silver/20' },
  master:  { label: 'Master Build',   labelZh: '大师', color: 'text-gold border-gold/40' },
}
</script>

<template>
  <div class="inline-flex items-center gap-2 border px-3 py-1.5" :class="seriesMap[series].color">
    <span class="type-label tracking-widest text-[9px]">{{ seriesMap[series].label }}</span>
    <span class="w-px h-3 bg-current opacity-30" />
    <span class="type-label-zh text-[9px]">{{ seriesMap[series].labelZh }}</span>
  </div>
</template>
