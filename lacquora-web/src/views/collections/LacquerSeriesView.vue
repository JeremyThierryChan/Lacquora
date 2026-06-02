<script setup lang="ts">
const { t } = useI18n()

const activeCraft = ref<string>('all')

const crafts = [
  {
    key: 'qian_jin',
    en: 'Qian Jin',
    zh: '戗金',
    desc: 'Gold thread inlaid into lacquered grooves. A technique dating to the Tang dynasty, each line traced by hand with a blade thinner than a hair.',
    process: 'Carve → Fill gold powder → Seal → Polish × 30 layers',
    leadTime: '120–180 days',
    color: 'text-gold border-gold/30',
  },
  {
    key: 'mother_of_pearl',
    en: 'Mother of Pearl',
    zh: '螺钿',
    desc: 'Iridescent shell fragments cut and set flush into lacquer. Light shifts the color from aqua to violet depending on the angle of view.',
    process: 'Cut shell → Embed → Lacquer over → Sand level × 40 layers',
    leadTime: '150–210 days',
    color: 'text-silver border-silver/20',
  },
  {
    key: 'urushi',
    en: 'Urushi',
    zh: '大漆',
    desc: 'Pure Japanese and Chinese urushi lacquer, applied and cured in a humidity-controlled chamber. 50–100 coats over 8–12 weeks.',
    process: 'Prime → Apply → Cure in humidity chamber → Sand → Repeat',
    leadTime: '90–150 days',
    color: 'text-lacquer-light border-lacquer/30',
  },
  {
    key: 'maki_e',
    en: 'Maki-e',
    zh: '莳绘',
    desc: 'Gold and silver powder scattered over wet lacquer to form pictorial designs. A technique of the Heian period, applied to the guitar body as canvas.',
    process: 'Draw design → Apply wet lacquer → Scatter powder → Fix → Polish',
    leadTime: '180–240 days',
    color: 'text-gold-light border-gold/20',
  },
]

const products = [
  {
    id: 1, sku: 'LQ-QJ-001', series: 'lacquer' as const,
    titleZh: '戗金弦月', titleEn: 'Qian Jin — Crescent Moon',
    subtitle: 'Gold thread on Deep Burgundy Urushi',
    descriptionZh: '', descriptionEn: '',
    priceMin: 88000, priceMax: 120000, leadTimeDays: 150,
    status: 'published' as const, featured: true,
    images: [{ id: 1, url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&q=80', alt: '', sortOrder: 0, isCover: true }],
    craftType: 'qian_jin' as const, createdAt: '', updatedAt: '',
  },
  {
    id: 2, sku: 'LQ-MP-002', series: 'lacquer' as const,
    titleZh: '螺钿海浪', titleEn: 'Mother of Pearl — Ocean Wave',
    subtitle: 'Abalone inlay on Midnight Black Urushi',
    descriptionZh: '', descriptionEn: '',
    priceMin: 95000, priceMax: 135000, leadTimeDays: 180,
    status: 'published' as const, featured: true,
    images: [{ id: 2, url: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=600&q=80', alt: '', sortOrder: 0, isCover: true }],
    craftType: 'mother_of_pearl' as const, createdAt: '', updatedAt: '',
  },
  {
    id: 3, sku: 'LQ-UR-003', series: 'lacquer' as const,
    titleZh: '大漆素黑', titleEn: 'Urushi — Void Black',
    subtitle: '80-layer pure urushi, mirror polish',
    descriptionZh: '', descriptionEn: '',
    priceMin: 68000, priceMax: 98000, leadTimeDays: 120,
    status: 'published' as const, featured: false,
    images: [{ id: 3, url: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=600&q=80', alt: '', sortOrder: 0, isCover: true }],
    craftType: 'urushi' as const, createdAt: '', updatedAt: '',
  },
  {
    id: 4, sku: 'LQ-ME-004', series: 'lacquer' as const,
    titleZh: '莳绘松鹤', titleEn: 'Maki-e — Pine & Crane',
    subtitle: 'Gold & silver powder on Crimson Red',
    descriptionZh: '', descriptionEn: '',
    priceMin: 128000, priceMax: 180000, leadTimeDays: 210,
    status: 'sold' as const, featured: true,
    images: [{ id: 4, url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', alt: '', sortOrder: 0, isCover: true }],
    craftType: 'maki_e' as const, createdAt: '', updatedAt: '',
  },
]

const filteredProducts = computed(() =>
  activeCraft.value === 'all'
    ? products
    : products.filter((p) => p.craftType === activeCraft.value)
)
</script>

<template>
  <div class="bg-obsidian pt-[72px]">

    <!-- Hero Banner -->
    <section class="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=1400&q=80"
        alt="Lacquer Series"
        class="absolute inset-0 w-full h-full object-cover"
        style="filter: brightness(0.25) saturate(0.6)"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/60 to-transparent" />
      <div class="container-site relative z-10">
        <span class="type-label tracking-[0.25em] text-lacquer-light/60 block mb-4">
          大漆 · 戗金 · 螺钿 · 莳绘
        </span>
        <h1 class="type-section-title text-ivory mb-4">
          {{ t('collections.lacquerSeries.title') }}
        </h1>
        <p class="text-silver/50 font-light max-w-md leading-relaxed text-sm">
          {{ t('collections.lacquerSeries.desc') }}
        </p>
      </div>
    </section>

    <!-- Craft Techniques -->
    <section class="border-y border-slate/20 bg-graphite">
      <div class="container-site py-16">
        <div class="type-label tracking-[0.25em] text-silver/30 mb-8">Techniques</div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0.5">
          <div
            v-for="craft in crafts"
            :key="craft.key"
            class="group p-8 border bg-carbon cursor-pointer transition-all duration-400 hover:bg-slate/20"
            :class="[craft.color, activeCraft === craft.key ? 'bg-slate/30' : '']"
            @click="activeCraft = activeCraft === craft.key ? 'all' : craft.key"
          >
            <div class="font-display text-2xl text-ivory mb-1 group-hover:text-gold transition-colors duration-300">
              {{ craft.en }}
            </div>
            <div class="type-label-zh text-silver/40 mb-5">{{ craft.zh }}</div>
            <p class="text-silver/40 text-xs font-light leading-relaxed mb-5">
              {{ craft.desc }}
            </p>
            <div class="border-t border-slate/20 pt-4">
              <div class="type-label text-[9px] text-silver/20 tracking-widest mb-1">Lead Time</div>
              <div class="font-mono text-xs text-silver/40">{{ craft.leadTime }}</div>
            </div>
          </div>
        </div>
        <div v-if="activeCraft !== 'all'" class="mt-4">
          <button class="btn-text text-silver/40 hover:text-silver text-[10px]" @click="activeCraft = 'all'">
            ← Clear filter
          </button>
        </div>
      </div>
    </section>

    <!-- Product Grid -->
    <section class="container-site py-20">
      <div class="flex items-center justify-between mb-10">
        <div>
          <h2 class="font-display text-2xl text-ivory">Available Works</h2>
          <p class="text-silver/30 text-sm mt-1">{{ filteredProducts.length }} instruments</p>
        </div>
        <RouterLink to="/custom-shop" class="btn-ghost text-xs px-5 py-2.5">
          Commission Custom
        </RouterLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="card-product group"
        >
          <!-- Image -->
          <div class="relative overflow-hidden aspect-card">
            <img
              :src="product.images[0].url"
              :alt="product.titleEn"
              class="card-image-inner w-full h-full object-cover"
              style="filter: brightness(0.7) saturate(0.8)"
              loading="lazy"
            />
            <div v-if="product.status === 'sold'" class="absolute inset-0 bg-obsidian/50 flex items-center justify-center">
              <span class="type-label text-silver/50 tracking-widest border border-silver/20 px-4 py-2">SOLD</span>
            </div>
            <div class="absolute top-4 left-4">
              <span
                class="type-label text-[9px] tracking-widest px-3 py-1.5 border"
                :class="crafts.find(c => c.key === product.craftType)?.color ?? 'text-silver border-silver/20'"
              >
                {{ crafts.find(c => c.key === product.craftType)?.zh }}
              </span>
            </div>
          </div>

          <!-- Info -->
          <div class="p-5 border-t border-slate/20">
            <div class="type-label text-silver/20 text-[9px] tracking-widest mb-2">{{ product.sku }}</div>
            <h3 class="font-display text-lg text-ivory group-hover:text-gold transition-colors duration-300 leading-tight mb-1">
              {{ product.titleEn }}
            </h3>
            <p class="text-silver/40 text-xs font-light mb-4">{{ product.subtitle }}</p>
            <div class="flex items-end justify-between">
              <div>
                <div class="type-label text-silver/20 text-[9px] mb-1">From</div>
                <div class="font-mono text-sm text-gold/70">
                  ¥{{ product.priceMin.toLocaleString() }}
                </div>
              </div>
              <div class="text-right">
                <div class="type-label text-silver/20 text-[9px] mb-1">Lead Time</div>
                <div class="font-mono text-xs text-silver/40">{{ product.leadTimeDays }}d</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="border-t border-slate/20 py-20 text-center bg-graphite">
      <div class="container-site">
        <span class="type-label tracking-[0.25em] text-gold/40 block mb-5">Custom Lacquer</span>
        <h2 class="font-display text-3xl text-ivory mb-4">Bring your own vision.</h2>
        <p class="text-silver/40 font-light text-sm mb-8 max-w-sm mx-auto">
          Every lacquer guitar can be customised — choose your body, wood, and finish combination.
        </p>
        <RouterLink to="/custom-shop" class="btn-primary">Start in Custom Shop</RouterLink>
      </div>
    </section>

  </div>
</template>
