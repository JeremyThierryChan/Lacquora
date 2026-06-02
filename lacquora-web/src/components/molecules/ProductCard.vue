<script setup lang="ts">
import LBadge from '@/components/atoms/LBadge.vue'
import type { Product } from '@/types'

interface Props {
  product: Product
  size?: 'default' | 'large'
}

const props = withDefaults(defineProps<Props>(), { size: 'default' })
const { locale } = useI18n()

const title = computed(() =>
  locale.value === 'zh' ? props.product.titleZh : props.product.titleEn
)
const coverImage = computed(() =>
  props.product.images.find((img) => img.isCover)?.url ?? props.product.images[0]?.url
)

const priceDisplay = computed(() => {
  const min = props.product.priceMin.toLocaleString()
  const max = props.product.priceMax.toLocaleString()
  return `¥${min} — ¥${max}`
})
</script>

<template>
  <RouterLink
    :to="`/gallery/${product.id}`"
    class="card-product group block"
    :class="size === 'large' ? 'col-span-2 row-span-2' : ''"
  >
    <!-- Image -->
    <div class="relative overflow-hidden" :class="size === 'large' ? 'aspect-[4/5]' : 'aspect-card'">
      <img
        v-if="coverImage"
        :src="coverImage"
        :alt="title"
        class="card-image-inner w-full h-full object-cover"
        style="filter: brightness(0.75) saturate(0.85)"
        loading="lazy"
      />
      <div v-else class="skeleton w-full h-full" />

      <!-- Status badge -->
      <div v-if="product.status === 'sold'" class="absolute top-4 right-4">
        <span class="type-label text-[9px] tracking-widest bg-obsidian/80 text-silver/60 px-3 py-1.5 border border-slate/30">
          SOLD
        </span>
      </div>

      <!-- Series badge -->
      <div class="absolute top-4 left-4">
        <LBadge :series="product.series" />
      </div>
    </div>

    <!-- Info -->
    <div class="p-5 border-t border-slate/30">
      <div class="type-label text-silver/30 text-[9px] tracking-widest mb-2">
        {{ product.sku }}
      </div>
      <h3
        class="font-display text-lg text-ivory leading-tight group-hover:text-gold transition-colors duration-400 mb-1"
      >
        {{ title }}
      </h3>
      <p class="text-silver/40 text-xs font-light leading-relaxed mb-4">
        {{ product.subtitle }}
      </p>

      <div class="flex items-end justify-between">
        <div>
          <div class="type-label text-silver/30 text-[9px] tracking-widest mb-1">Price Range</div>
          <div class="font-mono text-sm text-gold/80">{{ priceDisplay }}</div>
        </div>
        <div class="text-right">
          <div class="type-label text-silver/30 text-[9px] tracking-widest mb-1">Lead Time</div>
          <div class="font-mono text-xs text-silver/50">{{ product.leadTimeDays }}d</div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
