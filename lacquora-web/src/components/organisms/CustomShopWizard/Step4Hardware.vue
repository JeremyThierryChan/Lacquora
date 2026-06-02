<script setup lang="ts">
import { useCustomOrderStore } from '@/stores/useCustomOrderStore'

const store = useCustomOrderStore()

const hardware = {
  bridge: [
    { value: 'Gotoh 510T',     label: 'Gotoh 510T',     sub: 'Tremolo · Japanese precision · Most popular' },
    { value: 'Hipshot Hardtail', label: 'Hipshot Hardtail', sub: 'Fixed · Maximum sustain · USA made' },
    { value: 'Floyd Rose OFR', label: 'Floyd Rose OFR',  sub: 'Double-locking tremolo · German original' },
    { value: 'Schaller 3D-6',  label: 'Schaller 3D-6',  sub: 'Hardtail · 3D adjustment · German precision' },
  ],
  pickups: [
    { value: 'Seymour Duncan SH-1/SH-4', label: 'Seymour Duncan', sub: '\'59 Neck / JB Bridge · Classic balance' },
    { value: 'Bare Knuckle Aftermath',   label: 'Bare Knuckle',   sub: 'Aftermath set · High output · UK wound' },
    { value: 'Lollar Imperial',          label: 'Lollar Imperial', sub: 'Low-wind PAF · Clear, warm · USA' },
    { value: 'Custom Wound',             label: 'Custom Wound',   sub: 'Spec to your exact output target' },
  ],
  neck: [
    { value: 'Maple C-Shape',    label: 'Maple C-Shape',    sub: 'Standard · Comfortable · Versatile' },
    { value: 'Maple D-Shape',    label: 'Maple D-Shape',    sub: 'Flat back · Chording grip · Vintage feel' },
    { value: 'Roasted Maple U',  label: 'Roasted Maple U',  sub: 'Chunky · Stable · Vintage baseball bat' },
    { value: 'Carbon Fibre',     label: 'Carbon Fibre',     sub: 'Ultra-stable · Modern · Lightweight' },
  ],
  fretboard: [
    { value: 'Ebony',       label: 'Ebony',      sub: 'Darkest · Dense · Fast feel' },
    { value: 'Rosewood',    label: 'Rosewood',   sub: 'Warm · Oily · Classic' },
    { value: 'Maple',       label: 'Maple',      sub: 'Bright · Snappy · Easy to clean' },
    { value: 'Pau Ferro',   label: 'Pau Ferro',  sub: 'Rosewood-adjacent · CITES-free' },
  ],
}

const sections = [
  { key: 'bridge',    label: 'Bridge',    zh: '琴桥' },
  { key: 'pickups',   label: 'Pickups',   zh: '拾音器' },
  { key: 'neck',      label: 'Neck',      zh: '琴颈' },
  { key: 'fretboard', label: 'Fretboard', zh: '指板' },
] as const
</script>

<template>
  <div>
    <h2 class="font-display text-3xl text-ivory mb-2">Configure your hardware.</h2>
    <p class="text-silver/40 font-light text-sm mb-10">Every component is sourced new and fitted by hand. Choose what drives your tone and playability.</p>

    <div class="flex flex-col gap-12">
      <div v-for="section in sections" :key="section.key">
        <!-- Section header -->
        <div class="flex items-center gap-4 mb-5">
          <div class="font-display text-xl text-ivory">{{ section.label }}</div>
          <div class="type-label-zh text-silver/30 text-[11px]">{{ section.zh }}</div>
          <div class="flex-1 h-px bg-slate/30" />
        </div>

        <!-- Options -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5">
          <button
            v-for="opt in hardware[section.key]"
            :key="opt.value"
            class="group text-left p-5 border transition-all duration-300 bg-carbon relative"
            :class="store.order.hardwareConfig?.[section.key] === opt.value
              ? 'border-gold'
              : 'border-slate/30 hover:border-gold/40'"
            @click="store.setHardwareConfig({ [section.key]: opt.value })"
          >
            <div v-if="store.order.hardwareConfig?.[section.key] === opt.value"
              class="absolute top-3 right-3 w-1.5 h-1.5 bg-gold rounded-full" />
            <div
              class="font-display text-base mb-1 transition-colors duration-300 leading-tight"
              :class="store.order.hardwareConfig?.[section.key] === opt.value
                ? 'text-gold'
                : 'text-ivory group-hover:text-gold'"
            >
              {{ opt.label }}
            </div>
            <p class="text-silver/30 text-xs font-light leading-relaxed">{{ opt.sub }}</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
