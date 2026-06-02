<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

const { t } = useI18n()

// ── Reveal-on-scroll refs ──
const heroTagline = ref<HTMLElement | null>(null)
const heroSub     = ref<HTMLElement | null>(null)
const heroCtas    = ref<HTMLElement | null>(null)
const collectionsRef  = ref<HTMLElement | null>(null)
const craftRef        = ref<HTMLElement | null>(null)
const galleryRef      = ref<HTMLElement | null>(null)
const ctaRef          = ref<HTMLElement | null>(null)

function useReveal(el: Ref<HTMLElement | null>, delay = 0) {
  const visible = ref(false)
  useIntersectionObserver(el, ([entry]) => {
    if (entry.isIntersecting) visible.value = true
  }, { threshold: 0.15 })
  return { visible, delay }
}

const { visible: collectionsVisible } = useReveal(collectionsRef, 0)
const { visible: craftVisible }       = useReveal(craftRef, 0)
const { visible: galleryVisible }     = useReveal(galleryRef, 0)
const { visible: ctaVisible }         = useReveal(ctaRef, 0)

// ── Hero sequential animation ──
const heroPhase = ref(0)
onMounted(() => {
  setTimeout(() => heroPhase.value = 1, 300)
  setTimeout(() => heroPhase.value = 2, 900)
  setTimeout(() => heroPhase.value = 3, 1400)
})

// ── Collections data ──
const collections = computed(() => [
  {
    key: 'lacquer',
    series: 'lacquer' as const,
    title: 'Lacquer Series',
    titleZh: '漆艺系列',
    tag: '大漆 · 戗金 · 螺钿 · 莳绘',
    desc: t('home.lacquerDesc'),
    path: '/collections/lacquer-series',
    bg: 'from-lacquer-deep/60 to-obsidian',
    accent: 'text-lacquer-light',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80',
  },
  {
    key: 'future',
    series: 'future' as const,
    title: 'Future Series',
    titleZh: '未来系列',
    tag: '3D Printed · Parametric · Lightweight',
    desc: t('home.futureDesc'),
    path: '/collections/future-series',
    bg: 'from-slate/40 to-obsidian',
    accent: 'text-silver',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  },
  {
    key: 'master',
    series: 'master' as const,
    title: 'Master Build',
    titleZh: '大师定制',
    tag: 'One-Off · Commission · Collector',
    desc: t('home.masterDesc'),
    path: '/collections/master-build',
    bg: 'from-gold-muted/50 to-obsidian',
    accent: 'text-gold',
    image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800&q=80',
  },
])

// ── Craft Process steps ──
const craftSteps = computed(() => [
  { num: '01', en: 'Design', zh: '设计', desc: t('home.craftStep01Desc') },
  { num: '02', en: 'Material', zh: '选材', desc: t('home.craftStep02Desc') },
  { num: '03', en: 'Craft', zh: '制作', desc: t('home.craftStep03Desc') },
  { num: '04', en: 'Lacquer', zh: '大漆', desc: t('home.craftStep04Desc') },
  { num: '05', en: 'Setup', zh: '调试', desc: t('home.craftStep05Desc') },
  { num: '06', en: 'Delivery', zh: '交付', desc: t('home.craftStep06Desc') },
])

// ── Gallery preview items ──
const galleryItems = [
  {
    id: 1,
    title: 'Qian Jin No.3',
    category: 'Lacquer Series',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&q=80',
    tall: true,
  },
  {
    id: 2,
    title: 'Future Void',
    category: 'Future Series',
    image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=600&q=80',
    tall: false,
  },
  {
    id: 3,
    title: 'Urushi Black',
    category: 'Lacquer Series',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    tall: false,
  },
  {
    id: 4,
    title: 'Master One',
    category: 'Master Build',
    image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=600&q=80',
    tall: true,
  },
]
</script>

<template>
  <div class="bg-obsidian">

    <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
    <!-- HERO                                              -->
    <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
    <section class="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden">

      <!-- Background Image (replace with <video> in production) -->
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=1800&q=85"
          alt=""
          class="w-full h-full object-cover object-center scale-105"
          style="filter: brightness(0.35) saturate(0.8)"
        />
      </div>

      <!-- Gradient overlays -->
      <div class="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-transparent to-obsidian/90" />
      <div class="absolute inset-0 bg-gradient-to-r from-obsidian/30 via-transparent to-obsidian/20" />

      <!-- Content -->
      <div class="container-site relative z-10 flex flex-col items-center text-center">

        <!-- Pre-label -->
        <div
          class="transition-all duration-700"
          :class="heroPhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          <span class="type-label tracking-[0.3em] text-gold/70">
            漆境 · LACQUORA
          </span>
        </div>

        <!-- Main tagline -->
        <h1
          ref="heroTagline"
          class="type-hero text-ivory mt-6 max-w-4xl transition-all duration-1000 delay-200"
          :class="heroPhase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          style="white-space: pre-line"
        >
          {{ t('home.heroTagline') }}
        </h1>

        <!-- Subtitle -->
        <div
          ref="heroSub"
          class="mt-6 transition-all duration-700 delay-500"
          :class="heroPhase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          <div class="flex items-center gap-4 justify-center">
            <span class="gold-line" />
            <p class="type-label tracking-[0.25em] text-silver/60">
              {{ t('home.heroSubtitle') }}
            </p>
            <span class="gold-line" style="transform: scaleX(-1)" />
          </div>
        </div>

        <!-- CTAs -->
        <div
          ref="heroCtas"
          class="mt-12 flex flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-700"
          :class="heroPhase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          <RouterLink to="/collections" class="btn-primary">
            {{ t('home.heroCta1') }}
          </RouterLink>
          <RouterLink to="/custom-shop" class="btn-ghost">
            {{ t('home.heroCta2') }}
          </RouterLink>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span class="type-label text-silver/50 tracking-[0.2em]">SCROLL</span>
        <div class="w-px h-12 bg-gradient-to-b from-silver/40 to-transparent" />
      </div>
    </section>


    <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
    <!-- FEATURED COLLECTIONS                              -->
    <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
    <section ref="collectionsRef" class="section-padding bg-obsidian">
      <div class="container-site">

        <!-- Section header -->
        <div
          class="flex flex-col items-center text-center mb-16 transition-all duration-700"
          :class="collectionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <span class="type-label tracking-[0.25em] text-gold/60 mb-4">
            Collections
          </span>
          <h2 class="type-section-title text-ivory">{{ t('home.collectionsTitle') }}</h2>
          <p class="mt-3 text-silver/50 font-light text-sm tracking-widest">
            {{ t('home.collectionsSubtitle') }}
          </p>
          <span class="gold-line-center mt-6" />
        </div>

        <!-- Collection Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-0.5">
          <RouterLink
            v-for="(col, i) in collections"
            :key="col.key"
            :to="col.path"
            class="group relative overflow-hidden aspect-card bg-carbon cursor-pointer"
            :class="[
              'transition-all duration-700',
              collectionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            ]"
            :style="{ transitionDelay: collectionsVisible ? `${i * 150}ms` : '0ms' }"
          >
            <!-- Image -->
            <img
              :src="col.image"
              :alt="col.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-800 group-hover:scale-105"
              style="filter: brightness(0.45) saturate(0.7)"
            />

            <!-- Gradient overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-t opacity-80 group-hover:opacity-90 transition-opacity duration-500"
              :class="col.bg"
            />

            <!-- Content -->
            <div class="absolute inset-0 flex flex-col justify-end p-8">
              <div class="type-label tracking-[0.2em] text-silver/40 mb-3">{{ col.tag }}</div>
              <h3 class="font-display text-2xl text-ivory leading-tight mb-1 group-hover:text-gold transition-colors duration-400">
                {{ col.title }}
              </h3>
              <div class="type-label-zh text-silver/40 mb-4">{{ col.titleZh }}</div>
              <p class="text-sm text-silver/60 font-light leading-relaxed max-w-xs mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                {{ col.desc }}
              </p>
              <div class="btn-text text-[10px] tracking-widest" :class="col.accent">
                {{ t('home.explore') }}
                <span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>


    <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
    <!-- CUSTOM SHOP STRIP                                 -->
    <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
    <section class="relative py-24 overflow-hidden bg-graphite border-y border-slate/20">
      <div class="absolute inset-0 bg-noise opacity-30" />
      <div class="container-site relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
        <div>
          <span class="type-label tracking-[0.25em] text-gold/60 block mb-4">{{ t('nav.customShop') }}</span>
          <h2 class="font-display text-4xl md:text-5xl text-ivory leading-tight" style="white-space: pre-line">
            {{ t('home.customShopStripTitle') }}
          </h2>
          <p class="mt-4 text-silver/50 font-light max-w-md">
            {{ t('home.customShopStripDesc') }}
          </p>
        </div>
        <RouterLink to="/custom-shop" class="btn-primary flex-shrink-0">
          {{ t('home.customShopStripCta') }}
          <span class="ml-2">→</span>
        </RouterLink>
      </div>
    </section>


    <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
    <!-- CRAFTSMANSHIP PROCESS                             -->
    <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
    <section ref="craftRef" class="section-padding bg-obsidian">
      <div class="container-site">

        <div
          class="flex flex-col items-center text-center mb-16 transition-all duration-700"
          :class="craftVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <span class="type-label tracking-[0.25em] text-gold/60 mb-4">Process</span>
          <h2 class="type-section-title text-ivory">{{ t('home.craftTitle') }}</h2>
          <p class="mt-3 text-silver/50 font-light text-sm tracking-wider">
            {{ t('home.craftSubtitle') }}
          </p>
          <span class="gold-line-center mt-6" />
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0.5">
          <div
            v-for="(step, i) in craftSteps"
            :key="step.num"
            class="group bg-carbon p-6 border border-slate/20 hover:border-gold/20 transition-all duration-500 flex flex-col"
            :class="craftVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            :style="{ transitionDelay: craftVisible ? `${i * 80}ms` : '0ms', transitionDuration: '600ms' }"
          >
            <div class="font-mono text-xs text-silver/20 mb-4 group-hover:text-gold/40 transition-colors duration-300">
              {{ step.num }}
            </div>
            <div class="font-display text-lg text-ivory leading-none mb-1 group-hover:text-gold transition-colors duration-400">
              {{ step.en }}
            </div>
            <div class="type-label-zh text-silver/40 text-[11px] mb-4">{{ step.zh }}</div>
            <p class="text-silver/30 text-xs font-light leading-relaxed mt-auto">
              {{ step.desc }}
            </p>
          </div>
        </div>

        <div class="mt-12 text-center">
          <RouterLink to="/craftsmanship" class="btn-text">
            {{ t('home.fullProcess') }}
            <span>→</span>
          </RouterLink>
        </div>
      </div>
    </section>


    <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
    <!-- GALLERY PREVIEW                                   -->
    <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
    <section ref="galleryRef" class="section-padding bg-graphite border-t border-slate/20">
      <div class="container-site">

        <div
          class="flex items-end justify-between mb-12 transition-all duration-700"
          :class="galleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <div>
            <span class="type-label tracking-[0.25em] text-gold/60 block mb-4">Gallery</span>
            <h2 class="type-section-title text-ivory">{{ t('home.galleryTitle') }}</h2>
          </div>
          <RouterLink to="/gallery" class="btn-text hidden md:flex">
            {{ t('home.viewAllWorks') }} <span>→</span>
          </RouterLink>
        </div>

        <!-- Asymmetric masonry preview -->
        <div
          class="grid grid-cols-2 md:grid-cols-4 gap-1 transition-all duration-700 delay-200"
          :class="galleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <RouterLink
            v-for="item in galleryItems"
            :key="item.id"
            :to="`/gallery/${item.id}`"
            class="group relative overflow-hidden bg-carbon cursor-pointer"
            :class="item.tall ? 'row-span-2' : ''"
          >
            <div :class="item.tall ? 'aspect-[3/5]' : 'aspect-square'">
              <img
                :src="item.image"
                :alt="item.title"
                class="w-full h-full object-cover transition-transform duration-800 group-hover:scale-105"
                style="filter: brightness(0.6) saturate(0.8)"
              />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <div class="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
              <div class="type-label text-silver/50 text-[9px] mb-1">{{ item.category }}</div>
              <div class="font-display text-base text-ivory">{{ item.title }}</div>
            </div>
          </RouterLink>
        </div>

        <div class="mt-8 text-center md:hidden">
          <RouterLink to="/gallery" class="btn-text">{{ t('home.viewAllWorks') }} <span>→</span></RouterLink>
        </div>
      </div>
    </section>


    <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
    <!-- CTA SECTION                                       -->
    <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
    <section
      ref="ctaRef"
      class="relative py-40 overflow-hidden bg-obsidian border-t border-slate/20"
    >
      <!-- Decorative gold glow -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none transition-opacity duration-1000"
        :class="ctaVisible ? 'opacity-100' : 'opacity-0'"
        style="background: radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)"
      />

      <div class="container-site relative z-10 flex flex-col items-center text-center">
        <div
          class="transition-all duration-700"
          :class="ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <span class="type-label tracking-[0.3em] text-gold/60 block mb-6">Commission</span>
          <h2 class="type-section-title text-ivory max-w-2xl leading-tight">
            {{ t('home.ctaTitle') }}
          </h2>
          <div class="flex items-center gap-4 justify-center my-8">
            <span class="gold-line" />
            <p class="text-silver/50 font-light tracking-wider text-sm">
              {{ t('home.ctaSubtitle') }}
            </p>
            <span class="gold-line" style="transform: scaleX(-1)" />
          </div>
          <RouterLink to="/contact" class="btn-primary">
            {{ t('home.ctaButton') }}
          </RouterLink>
        </div>
      </div>
    </section>

  </div>
</template>
