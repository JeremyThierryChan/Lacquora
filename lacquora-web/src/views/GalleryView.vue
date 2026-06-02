<script setup lang="ts">
import type { GalleryCategory } from '@/types'

const { t } = useI18n()

// ── Category filter ──
const activeCategory = ref<GalleryCategory>('all')

const categories: { key: GalleryCategory; label: string }[] = [
  { key: 'all',       label: t('gallery.all') },
  { key: 'lacquer',   label: t('gallery.lacquer') },
  { key: 'future',    label: t('gallery.future') },
  { key: 'master',    label: t('gallery.master') },
  { key: 'lifestyle', label: t('gallery.lifestyle') },
]

// ── Gallery data ──
const allItems = [
  { id: 1,  title: 'Qian Jin No. 3',        category: 'lacquer'  as GalleryCategory, craft: '戗金',  image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=85', h: 'tall' },
  { id: 2,  title: 'Future Void I',          category: 'future'   as GalleryCategory, craft: '3D Print', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=85', h: 'short' },
  { id: 3,  title: 'Urushi Midnight',        category: 'lacquer'  as GalleryCategory, craft: '大漆',  image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800&q=85', h: 'short' },
  { id: 4,  title: 'Master One — Vermilion', category: 'master'   as GalleryCategory, craft: '莳绘',  image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&q=85', h: 'tall' },
  { id: 5,  title: 'Workshop — Detail',      category: 'lifestyle' as GalleryCategory, craft: '',      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80', h: 'short' },
  { id: 6,  title: 'Mother of Pearl Wave',   category: 'lacquer'  as GalleryCategory, craft: '螺钿',  image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800&q=80', h: 'tall' },
  { id: 7,  title: 'Gyroid I',               category: 'future'   as GalleryCategory, craft: '3D Print', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', h: 'tall' },
  { id: 8,  title: 'Ink Wash',               category: 'master'   as GalleryCategory, craft: '大漆',  image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&q=80', h: 'short' },
  { id: 9,  title: 'Lacquer Red I',          category: 'lacquer'  as GalleryCategory, craft: '大漆',  image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=75', h: 'short' },
  { id: 10, title: 'Artist Session — Live',  category: 'lifestyle' as GalleryCategory, craft: '',      image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800&q=75', h: 'short' },
  { id: 11, title: 'Void Form II',           category: 'future'   as GalleryCategory, craft: '3D Print', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=75', h: 'short' },
  { id: 12, title: 'Maki-e Pine & Crane',    category: 'lacquer'  as GalleryCategory, craft: '莳绘',  image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&q=75', h: 'tall' },
]

const filtered = computed(() =>
  activeCategory.value === 'all'
    ? allItems
    : allItems.filter((i) => i.category === activeCategory.value)
)

// ── Lightbox ──
const lightboxItem = ref<typeof allItems[0] | null>(null)
const lightboxIndex = ref(0)

function openLightbox(item: typeof allItems[0]) {
  lightboxItem.value = item
  lightboxIndex.value = filtered.value.findIndex((i) => i.id === item.id)
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxItem.value = null
  document.body.style.overflow = ''
}

function lightboxPrev() {
  const prev = (lightboxIndex.value - 1 + filtered.value.length) % filtered.value.length
  lightboxIndex.value = prev
  lightboxItem.value = filtered.value[prev]
}

function lightboxNext() {
  const next = (lightboxIndex.value + 1) % filtered.value.length
  lightboxIndex.value = next
  lightboxItem.value = filtered.value[next]
}

// Keyboard navigation
function handleKeydown(e: KeyboardEvent) {
  if (!lightboxItem.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') lightboxPrev()
  if (e.key === 'ArrowRight') lightboxNext()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

// Reveal animation
const galleryRef = ref<HTMLElement | null>(null)
const { isSupported, stop } = useIntersectionObserver(
  galleryRef,
  ([entry]) => { if (entry.isIntersecting) stop() },
  { threshold: 0.05 }
)
</script>

<template>
  <div class="bg-obsidian pt-[72px] min-h-screen">

    <!-- Page Header -->
    <section class="border-b border-slate/20 bg-graphite">
      <div class="container-site py-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span class="type-label tracking-[0.3em] text-gold/60 block mb-5">Gallery</span>
          <h1 class="font-display text-4xl lg:text-5xl text-ivory">{{ t('gallery.title') }}</h1>
        </div>
        <p class="text-silver/40 font-light text-sm max-w-xs leading-relaxed">
          {{ allItems.length }} works across lacquer, 3D-printed, and master-build instruments.
        </p>
      </div>
    </section>

    <!-- Filter Bar -->
    <div class="sticky top-[72px] z-40 bg-obsidian/95 backdrop-blur-md border-b border-slate/20">
      <div class="container-site">
        <div class="flex items-center gap-0 overflow-x-auto hide-scrollbar">
          <button
            v-for="cat in categories"
            :key="cat.key"
            class="relative py-4 px-5 type-label tracking-widest text-[10px] transition-colors duration-300 flex-shrink-0 whitespace-nowrap"
            :class="activeCategory === cat.key ? 'text-ivory' : 'text-silver/35 hover:text-silver/70'"
            @click="activeCategory = cat.key"
          >
            {{ cat.label }}
            <span
              v-if="activeCategory === cat.key"
              class="absolute bottom-0 left-0 right-0 h-px bg-gold"
            />
          </button>
          <div class="flex-1" />
          <span class="type-label text-[10px] text-silver/25 tracking-widest flex-shrink-0 pr-2">
            {{ filtered.length }} works
          </span>
        </div>
      </div>
    </div>

    <!-- Masonry Gallery -->
    <section class="container-site py-10">
      <Transition name="fade-in" mode="out-in">
        <div
          :key="activeCategory"
          ref="galleryRef"
          class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-1"
        >
          <div
            v-for="(item, i) in filtered"
            :key="item.id"
            class="break-inside-avoid mb-1 group relative overflow-hidden cursor-pointer bg-carbon"
            :class="item.h === 'tall' ? 'aspect-[3/4]' : 'aspect-square'"
            :style="{ animationDelay: `${i * 60}ms` }"
            @click="openLightbox(item)"
          >
            <!-- Image -->
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover transition-transform duration-800 group-hover:scale-105"
              style="filter: brightness(0.65) saturate(0.8)"
              loading="lazy"
            />

            <!-- Hover overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

            <!-- Info — slides up on hover -->
            <div class="absolute bottom-0 left-0 right-0 p-5
                        translate-y-3 opacity-0
                        group-hover:translate-y-0 group-hover:opacity-100
                        transition-all duration-400">
              <div v-if="item.craft" class="type-label text-[9px] tracking-widest text-gold/60 mb-1">
                {{ item.craft }}
              </div>
              <div class="font-display text-base text-ivory leading-tight">{{ item.title }}</div>
              <div class="type-label text-[9px] tracking-widest text-silver/40 mt-1 capitalize">
                {{ item.category }}
              </div>
            </div>

            <!-- Expand icon -->
            <div class="absolute top-4 right-4 w-7 h-7 border border-ivory/20 flex items-center justify-center
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg class="w-3 h-3 text-ivory/60" viewBox="0 0 12 12" fill="none">
                <path d="M7.5 1.5H10.5V4.5M4.5 10.5H1.5V7.5M10.5 1.5L6.5 5.5M1.5 10.5L5.5 6.5"
                      stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Empty state -->
      <div v-if="filtered.length === 0" class="text-center py-32">
        <p class="font-display text-2xl text-silver/30">No works in this category yet.</p>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="border-t border-slate/20 py-20 text-center">
      <div class="container-site">
        <p class="text-silver/30 font-light text-sm mb-6">Interested in commissioning a work?</p>
        <RouterLink to="/custom-shop" class="btn-primary">Open Custom Shop</RouterLink>
      </div>
    </section>

    <!-- ── Lightbox ── -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="lightboxItem"
          class="fixed inset-0 z-[100] bg-obsidian/97 backdrop-blur-xl flex items-center justify-center"
          @click.self="closeLightbox"
        >
          <!-- Close -->
          <button
            class="absolute top-6 right-6 w-10 h-10 border border-slate/40 flex items-center justify-center text-silver/60 hover:text-ivory hover:border-silver/40 transition-all duration-200 z-10"
            @click="closeLightbox"
          >
            <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>

          <!-- Prev -->
          <button
            v-if="filtered.length > 1"
            class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 border border-slate/40 flex items-center justify-center text-silver/60 hover:text-ivory hover:border-silver/40 transition-all duration-200"
            @click="lightboxPrev"
          >
            <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M10 2L4 8l6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- Next -->
          <button
            v-if="filtered.length > 1"
            class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 border border-slate/40 flex items-center justify-center text-silver/60 hover:text-ivory hover:border-silver/40 transition-all duration-200"
            @click="lightboxNext"
          >
            <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M6 2l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- Image + Info -->
          <Transition name="lightbox-img" mode="out-in">
            <div :key="lightboxItem.id" class="flex flex-col lg:flex-row items-center gap-8 max-w-5xl w-full px-16">

              <!-- Image -->
              <div class="relative flex-1 flex items-center justify-center max-h-[80vh]">
                <img
                  :src="lightboxItem.image.replace('w=800', 'w=1200')"
                  :alt="lightboxItem.title"
                  class="max-h-[75vh] max-w-full object-contain"
                  style="box-shadow: 0 40px 100px rgba(0,0,0,0.7)"
                />
              </div>

              <!-- Meta -->
              <div class="lg:w-64 flex-shrink-0 text-left">
                <div v-if="lightboxItem.craft"
                  class="type-label text-[9px] tracking-widest text-gold/60 mb-4">
                  {{ lightboxItem.craft }}
                </div>
                <h2 class="font-display text-2xl text-ivory mb-2 leading-tight">
                  {{ lightboxItem.title }}
                </h2>
                <div class="type-label text-[10px] tracking-widest text-silver/30 capitalize mb-8">
                  {{ lightboxItem.category }} Series
                </div>
                <span class="gold-line mb-8" />
                <div class="mt-8 flex items-center justify-between">
                  <span class="type-label text-[9px] text-silver/25">
                    {{ lightboxIndex + 1 }} / {{ filtered.length }}
                  </span>
                  <RouterLink
                    to="/custom-shop"
                    class="type-label text-[9px] tracking-widest text-gold/60 hover:text-gold transition-colors duration-200"
                    @click="closeLightbox"
                  >
                    Commission similar →
                  </RouterLink>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<style scoped>
.lightbox-enter-active, .lightbox-leave-active {
  transition: opacity 0.3s ease;
}
.lightbox-enter-from, .lightbox-leave-to { opacity: 0; }

.lightbox-img-enter-active, .lightbox-img-leave-active {
  transition: opacity 0.2s ease, transform 0.25s ease;
}
.lightbox-img-enter-from { opacity: 0; transform: scale(0.97); }
.lightbox-img-leave-to   { opacity: 0; transform: scale(1.02); }

.fade-in-enter-active {
  transition: opacity 0.4s ease;
}
.fade-in-enter-from { opacity: 0; }
</style>
