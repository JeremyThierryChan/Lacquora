<script setup lang="ts">
const { t } = useI18n()

const specs = [
  { label: 'Print Technology', value: 'FDM + SLA Multi-material' },
  { label: 'Body Weight', value: '1.8 – 2.4 kg' },
  { label: 'Structure', value: 'Gyroid lattice infill' },
  { label: 'Materials', value: 'Carbon-PLA · TPU · Resin' },
  { label: 'Neck Joint', value: 'CNC-milled hardwood bolt-on' },
  { label: 'Scale Length', value: '648mm / 25.5"' },
  { label: 'Lead Time', value: '30 – 60 days' },
  { label: 'Edition', value: 'Limited / Custom' },
]

const products = [
  {
    id: 10, sku: 'FT-GY-001',
    titleEn: 'Gyroid I', titleZh: '拓扑一号',
    subtitle: 'Gyroid lattice body · Carbon-PLA · Semi-hollow',
    priceMin: 28000, priceMax: 45000, leadTimeDays: 45,
    status: 'published' as const,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    tag: 'Lattice Structure',
  },
  {
    id: 11, sku: 'FT-VD-002',
    titleEn: 'Void Form', titleZh: '虚形',
    subtitle: 'Parametric hollow body · Multi-material · Headless',
    priceMin: 32000, priceMax: 55000, leadTimeDays: 60,
    status: 'published' as const,
    image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=600&q=80',
    tag: 'Parametric Design',
  },
  {
    id: 12, sku: 'FT-NX-003',
    titleEn: 'Nexus', titleZh: '节点',
    subtitle: 'Geodesic ribcage body · TPU damping · Extended range',
    priceMin: 38000, priceMax: 62000, leadTimeDays: 50,
    status: 'published' as const,
    image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=600&q=80',
    tag: 'Geodesic Form',
  },
]

const techFeatures = [
  {
    icon: '◈',
    title: 'Lattice Infill',
    desc: 'Gyroid and Schwartz Diamond structures reduce weight by 40% while maintaining rigidity.'
  },
  {
    icon: '◉',
    title: 'Multi-material',
    desc: 'Rigid carbon-fiber PLA for the core, flexible TPU for vibration damping zones.'
  },
  {
    icon: '◇',
    title: 'Parametric Design',
    desc: 'Every geometry is algorithmically generated — no two bodies need to be identical.'
  },
  {
    icon: '◐',
    title: 'CNC Hybrid',
    desc: 'Neck pocket and hardware mounting are CNC-machined for sub-millimetre precision.'
  },
]
</script>

<template>
  <div class="bg-obsidian pt-[72px]">

    <!-- Hero -->
    <section class="relative h-[55vh] min-h-[420px] flex items-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=80"
        alt="Future Series"
        class="absolute inset-0 w-full h-full object-cover"
        style="filter: brightness(0.2) saturate(0.4)"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-transparent" />
      <div class="container-site relative z-10">
        <span class="type-label tracking-[0.25em] text-silver/50 block mb-4">
          Parametric · Lightweight · Futurist
        </span>
        <h1 class="type-section-title text-ivory mb-4">
          {{ t('collections.futureSeries.title') }}
        </h1>
        <p class="text-silver/40 font-light max-w-md leading-relaxed text-sm">
          {{ t('collections.futureSeries.desc') }}
        </p>
      </div>
    </section>

    <!-- Tech Specs Bar -->
    <section class="bg-graphite border-y border-slate/20 overflow-x-auto">
      <div class="container-site py-8">
        <div class="flex gap-10 min-w-max md:min-w-0 md:grid md:grid-cols-4 lg:grid-cols-8">
          <div v-for="spec in specs" :key="spec.label" class="flex-shrink-0">
            <div class="type-label text-silver/25 text-[9px] tracking-widest mb-1">{{ spec.label }}</div>
            <div class="font-mono text-xs text-silver/70">{{ spec.value }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Features -->
    <section class="container-site py-20">
      <div class="type-label tracking-[0.25em] text-silver/30 mb-10">Technology</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5">
        <div
          v-for="feat in techFeatures"
          :key="feat.title"
          class="p-8 bg-carbon border border-slate/20 hover:border-silver/20 transition-all duration-400 group"
        >
          <div class="text-2xl text-silver/20 mb-5 group-hover:text-silver/40 transition-colors duration-300">
            {{ feat.icon }}
          </div>
          <div class="font-display text-lg text-ivory mb-3 group-hover:text-silver transition-colors duration-300">
            {{ feat.title }}
          </div>
          <p class="text-silver/40 text-xs font-light leading-relaxed">{{ feat.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Product Grid -->
    <section class="border-t border-slate/20 bg-graphite">
      <div class="container-site py-20">
        <div class="flex items-center justify-between mb-10">
          <div>
            <h2 class="font-display text-2xl text-ivory">Current Models</h2>
            <p class="text-silver/30 text-sm mt-1">{{ products.length }} instruments</p>
          </div>
          <RouterLink to="/custom-shop" class="btn-ghost text-xs px-5 py-2.5">
            Design Custom
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-0.5">
          <div v-for="p in products" :key="p.id" class="card-product group">
            <div class="relative overflow-hidden aspect-card">
              <img
                :src="p.image"
                :alt="p.titleEn"
                class="card-image-inner w-full h-full object-cover"
                style="filter: brightness(0.55) saturate(0.5)"
                loading="lazy"
              />
              <div class="absolute top-4 left-4">
                <span class="type-label text-[9px] tracking-widest text-silver/60 border border-silver/20 px-3 py-1.5 bg-obsidian/60">
                  {{ p.tag }}
                </span>
              </div>
            </div>
            <div class="p-5 border-t border-slate/20">
              <div class="type-label text-silver/20 text-[9px] mb-2">{{ p.sku }}</div>
              <h3 class="font-display text-lg text-ivory group-hover:text-silver transition-colors duration-300 mb-1">
                {{ p.titleEn }}
              </h3>
              <div class="type-label-zh text-silver/30 text-[11px] mb-3">{{ p.titleZh }}</div>
              <p class="text-silver/40 text-xs font-light mb-4">{{ p.subtitle }}</p>
              <div class="flex items-end justify-between">
                <div>
                  <div class="type-label text-silver/20 text-[9px] mb-1">From</div>
                  <div class="font-mono text-sm text-silver/70">¥{{ p.priceMin.toLocaleString() }}</div>
                </div>
                <div class="text-right">
                  <div class="type-label text-silver/20 text-[9px] mb-1">Lead Time</div>
                  <div class="font-mono text-xs text-silver/40">{{ p.leadTimeDays }}d</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="border-t border-slate/20 py-20 text-center">
      <div class="container-site">
        <span class="type-label tracking-[0.25em] text-silver/30 block mb-5">Custom Future Series</span>
        <h2 class="font-display text-3xl text-ivory mb-4">Design your geometry.</h2>
        <p class="text-silver/40 font-light text-sm mb-8 max-w-sm mx-auto">
          Parametric bodies can be tuned to any silhouette, weight target, or structural pattern.
        </p>
        <RouterLink to="/custom-shop" class="btn-primary">Start in Custom Shop</RouterLink>
      </div>
    </section>

  </div>
</template>
