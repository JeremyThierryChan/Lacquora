<script setup lang="ts">
import { useCustomOrderStore } from '@/stores/useCustomOrderStore'
import type { BodyShape } from '@/types'

const store = useCustomOrderStore()

const shapes: { key: BodyShape; label: string; zh: string; desc: string; icon: string }[] = [
  { key: 'strat',       label: 'Stratocaster',  zh: 'ST型',     desc: 'Classic double-cutaway. Versatile, balanced.', icon: '◎' },
  { key: 'tele',        label: 'Telecaster',    zh: 'TE型',     desc: 'Single-cutaway slab. Bright, defined attack.', icon: '◰' },
  { key: 'super_strat', label: 'Super Strat',   zh: '超ST型',   desc: 'Extended cutaways. Shred-optimised access.', icon: '◑' },
  { key: 'flying_v',   label: 'Flying V',      zh: '飞V型',    desc: 'Angular, iconic. Stage presence maximised.', icon: '◁' },
  { key: 'explorer',   label: 'Explorer',      zh: '探索者型', desc: 'Asymmetric geometry. Uncommon, commanding.', icon: '◲' },
  { key: 'headless',   label: 'Headless',      zh: '无头型',   desc: 'Compact, balanced. Modern ergonomics.', icon: '▷' },
  { key: 'custom',     label: 'Custom Shape',  zh: '定制形状', desc: 'Design your own silhouette with us.', icon: '✦' },
]
</script>

<template>
  <div>
    <h2 class="font-display text-3xl text-ivory mb-2">Select your body shape.</h2>
    <p class="text-silver/40 font-light text-sm mb-10">The silhouette defines how the instrument feels in hand and on stage.</p>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5">
      <button
        v-for="shape in shapes"
        :key="shape.key"
        class="group text-left p-6 border transition-all duration-300 relative"
        :class="store.order.bodyShape === shape.key
          ? 'border-gold bg-carbon'
          : 'border-slate/30 bg-carbon hover:border-gold/40'"
        @click="store.setBodyShape(shape.key)"
      >
        <!-- Selected indicator -->
        <div
          v-if="store.order.bodyShape === shape.key"
          class="absolute top-3 right-3 w-2 h-2 bg-gold rounded-full"
        />

        <div class="text-2xl text-silver/20 mb-4 group-hover:text-silver/40 transition-colors duration-300"
          :class="store.order.bodyShape === shape.key ? 'text-gold/60' : ''">
          {{ shape.icon }}
        </div>
        <div
          class="font-display text-lg leading-tight mb-1 transition-colors duration-300"
          :class="store.order.bodyShape === shape.key ? 'text-gold' : 'text-ivory group-hover:text-gold'"
        >
          {{ shape.label }}
        </div>
        <div class="type-label-zh text-silver/30 text-[10px] mb-3">{{ shape.zh }}</div>
        <p class="text-silver/30 text-xs font-light leading-relaxed">{{ shape.desc }}</p>
      </button>
    </div>
  </div>
</template>
