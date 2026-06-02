<script setup lang="ts">
const { t } = useI18n()

const series = [
  {
    key: 'lacquer',
    path: '/collections/lacquer-series',
    label: 'Lacquer Series',
    labelZh: '漆艺系列',
    tag: '大漆 · 戗金 · 螺钿 · 莳绘',
    desc: 'Centuries of Chinese lacquer mastery fused with precision electric guitar lutherie. Each finish requires weeks of hand-applied layers, creating depth no paint can replicate.',
    accent: 'border-lacquer/40 hover:border-lacquer',
    accentText: 'text-lacquer-light',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=900&q=80',
    stat1: { label: 'Layers', value: '50–100' },
    stat2: { label: 'Lead Time', value: '90–180d' },
  },
  {
    key: 'future',
    path: '/collections/future-series',
    label: 'Future Series',
    labelZh: '未来系列',
    tag: 'Parametric · Lightweight · Futurist',
    desc: 'Parametric design meets multi-material 3D printing. Lattice-structured bodies, impossible geometries, and ultralight frames that redefine what a guitar can look like.',
    accent: 'border-silver/20 hover:border-silver/50',
    accentText: 'text-silver',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80',
    stat1: { label: 'Weight', value: '<2.5 kg' },
    stat2: { label: 'Lead Time', value: '30–60d' },
  },
  {
    key: 'master',
    path: '/collections/master-build',
    label: 'Master Build',
    labelZh: '大师定制',
    tag: 'One-Off · Commission · Collector',
    desc: 'The pinnacle of LACQUORA craft. Master Build instruments combine every technique at the brand\'s disposal, produced individually with no concessions.',
    accent: 'border-gold/30 hover:border-gold',
    accentText: 'text-gold',
    image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=900&q=80',
    stat1: { label: 'Edition', value: 'One-Off' },
    stat2: { label: 'Lead Time', value: '180–365d' },
  },
]
</script>

<template>
  <div class="bg-obsidian pt-[72px]">

    <!-- Page Header -->
    <section class="section-padding-sm border-b border-slate/20">
      <div class="container-site text-center">
        <span class="type-label tracking-[0.3em] text-gold/60 block mb-5">Collections</span>
        <h1 class="type-section-title text-ivory">{{ t('collections.title') }}</h1>
        <span class="gold-line-center mt-6" />
      </div>
    </section>

    <!-- Series Cards -->
    <section class="container-site py-20">
      <div class="flex flex-col gap-0.5">
        <RouterLink
          v-for="(s, i) in series"
          :key="s.key"
          :to="s.path"
          class="group relative grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-carbon border transition-all duration-600"
          :class="s.accent"
          style="transition-timing-function: cubic-bezier(0.25,0.1,0.25,1)"
        >
          <!-- Image (alternates side) -->
          <div
            class="relative overflow-hidden aspect-[16/9] lg:aspect-auto lg:min-h-[420px]"
            :class="i % 2 === 1 ? 'lg:order-2' : ''"
          >
            <img
              :src="s.image"
              :alt="s.label"
              class="w-full h-full object-cover transition-transform duration-800 group-hover:scale-103"
              style="filter: brightness(0.5) saturate(0.75)"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-carbon via-transparent to-transparent"
              :class="i % 2 === 1 ? 'scale-x-[-1]' : ''" />
          </div>

          <!-- Content -->
          <div
            class="flex flex-col justify-center p-10 lg:p-16"
            :class="i % 2 === 1 ? 'lg:order-1' : ''"
          >
            <div class="type-label tracking-[0.2em] mb-4" :class="s.accentText">
              {{ s.tag }}
            </div>
            <h2 class="font-display text-4xl lg:text-5xl text-ivory leading-tight mb-1 group-hover:text-gold transition-colors duration-400">
              {{ s.label }}
            </h2>
            <div class="type-label-zh text-silver/40 mb-6">{{ s.labelZh }}</div>

            <p class="text-silver/50 font-light leading-relaxed mb-8 max-w-md text-sm">
              {{ s.desc }}
            </p>

            <!-- Stats -->
            <div class="flex gap-8 mb-10 pb-8 border-b border-slate/20">
              <div>
                <div class="type-label text-silver/25 text-[9px] mb-1">{{ s.stat1.label }}</div>
                <div class="font-mono text-base" :class="s.accentText">{{ s.stat1.value }}</div>
              </div>
              <div>
                <div class="type-label text-silver/25 text-[9px] mb-1">{{ s.stat2.label }}</div>
                <div class="font-mono text-base text-silver/60">{{ s.stat2.value }}</div>
              </div>
            </div>

            <div class="btn-text" :class="s.accentText">
              Explore Series
              <span class="transition-transform duration-300 group-hover:translate-x-2">→</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="border-t border-slate/20 py-24 text-center">
      <div class="container-site">
        <p class="text-silver/40 font-light mb-8 text-sm tracking-wider">
          Don't see what you're looking for?
        </p>
        <RouterLink to="/custom-shop" class="btn-primary">
          Commission a Custom Build
        </RouterLink>
      </div>
    </section>

  </div>
</template>
