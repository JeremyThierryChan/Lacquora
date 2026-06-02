<script setup lang="ts">
import { useCustomOrderStore } from '@/stores/useCustomOrderStore'
import type { WoodMaterial } from '@/types'

const store = useCustomOrderStore()

const woods: {
  key: WoodMaterial
  label: string
  zh: string
  tone: string
  weight: string
  grain: string
  desc: string
  color: string
}[] = [
  {
    key: 'alder',
    label: 'Alder',    zh: '桤木',
    tone: 'Balanced · Warm mid',
    weight: 'Light (3.2–3.6 kg)',
    grain: 'Fine, subtle',
    desc: 'The industry standard for a reason. Full-frequency response with excellent sustain and a warm, rounded mid.',
    color: 'from-amber-950/40 to-stone-900/60',
  },
  {
    key: 'ash',
    label: 'Ash',      zh: '白蜡木',
    tone: 'Bright · Defined',
    weight: 'Medium (3.4–4.0 kg)',
    grain: 'Open, pronounced',
    desc: 'Open pores and hard density create a brighter, glassier tone with excellent attack definition.',
    color: 'from-stone-800/40 to-stone-950/60',
  },
  {
    key: 'mahogany',
    label: 'Mahogany', zh: '桃花心木',
    tone: 'Warm · Thick · Vocal',
    weight: 'Heavy (3.8–4.4 kg)',
    grain: 'Interlocked, ribbon-like',
    desc: 'Preferred for heavier music. Pronounced low-mid warmth and longer sustain. Classic for set-neck constructions.',
    color: 'from-red-950/50 to-stone-950/60',
  },
  {
    key: 'walnut',
    label: 'Walnut',   zh: '黑胡桃',
    tone: 'Full · Complex · Dark',
    weight: 'Medium-heavy (3.6–4.2 kg)',
    grain: 'Figured, wavy',
    desc: 'A premium tonewood with a complex character: full low-end, slightly scooped mids, and an organic warmth. Striking grain.',
    color: 'from-stone-900/60 to-neutral-950/60',
  },
  {
    key: 'maple',
    label: 'Maple',    zh: '枫木',
    tone: 'Bright · Articulate · Clear',
    weight: 'Heavy (4.0–4.6 kg)',
    grain: 'Tight, can be figured',
    desc: 'Dense and reflective. Adds clarity and bite. Often used as a top cap over mahogany to balance warmth with definition.',
    color: 'from-amber-900/30 to-stone-900/50',
  },
]
</script>

<template>
  <div>
    <h2 class="font-display text-3xl text-ivory mb-2">Choose your tonewood.</h2>
    <p class="text-silver/40 font-light text-sm mb-10">Wood selection shapes both the tone and the feel. Each choice is final — we source to order.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
      <button
        v-for="wood in woods"
        :key="wood.key"
        class="group text-left border transition-all duration-300 relative overflow-hidden"
        :class="store.order.woodMaterial === wood.key
          ? 'border-gold'
          : 'border-slate/30 hover:border-gold/40'"
        @click="store.setWoodMaterial(wood.key)"
      >
        <!-- Texture gradient bg -->
        <div class="absolute inset-0 bg-gradient-to-br opacity-80" :class="wood.color" />

        <div class="relative p-7">
          <!-- Selected -->
          <div v-if="store.order.woodMaterial === wood.key"
            class="absolute top-4 right-4 w-2 h-2 bg-gold rounded-full" />

          <div class="flex items-start justify-between mb-5">
            <div>
              <div
                class="font-display text-2xl leading-none mb-1 transition-colors duration-300"
                :class="store.order.woodMaterial === wood.key ? 'text-gold' : 'text-ivory group-hover:text-gold'"
              >
                {{ wood.label }}
              </div>
              <div class="type-label-zh text-silver/40 text-[10px]">{{ wood.zh }}</div>
            </div>
          </div>

          <p class="text-silver/40 text-xs font-light leading-relaxed mb-6">{{ wood.desc }}</p>

          <div class="grid grid-cols-2 gap-3 border-t border-slate/20 pt-5">
            <div>
              <div class="type-label text-[9px] text-silver/20 tracking-widest mb-1">Tone</div>
              <div class="text-xs text-silver/50 font-light">{{ wood.tone }}</div>
            </div>
            <div>
              <div class="type-label text-[9px] text-silver/20 tracking-widest mb-1">Weight</div>
              <div class="text-xs text-silver/50 font-light">{{ wood.weight }}</div>
            </div>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>
