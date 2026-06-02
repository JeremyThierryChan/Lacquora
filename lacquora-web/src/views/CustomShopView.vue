<script setup lang="ts">
import CustomShopWizard from '@/components/organisms/CustomShopWizard/index.vue'
import { useCustomOrderStore } from '@/stores/useCustomOrderStore'

const { t } = useI18n()
const store = useCustomOrderStore()

onMounted(() => store.reset())
</script>

<template>
  <div class="bg-obsidian pt-[72px] min-h-screen">

    <!-- Page Header -->
    <section class="border-b border-slate/20 bg-graphite">
      <div class="container-site py-14">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          <div>
            <span class="type-label tracking-[0.3em] text-gold/60 block mb-5">Custom Shop</span>
            <h1 class="font-display text-4xl lg:text-5xl text-ivory leading-tight">
              {{ t('customShop.title') }}
            </h1>
          </div>
          <div class="lg:text-right">
            <p class="text-silver/40 font-light text-sm leading-relaxed max-w-sm lg:ml-auto">
              {{ t('customShop.subtitle') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Two-column layout: Wizard + Sidebar -->
    <div class="container-site py-16">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 items-start">

        <!-- Wizard -->
        <div>
          <CustomShopWizard />
        </div>

        <!-- Sticky Sidebar -->
        <aside class="hidden lg:block sticky top-24">

          <!-- Live config summary -->
          <div class="bg-carbon border border-slate/20 mb-4">
            <div class="type-label text-[10px] tracking-widest text-silver/30 px-5 py-4 border-b border-slate/20">
              Your Build
            </div>
            <div class="divide-y divide-slate/10">
              <div
                v-for="row in [
                  { k: 'Body',     v: store.order.bodyShape?.replace('_',' ') },
                  { k: 'Wood',     v: store.order.woodMaterial },
                  { k: 'Craft',    v: store.order.craftType?.replace('_',' ') },
                  { k: 'Bridge',   v: store.order.hardwareConfig?.bridge },
                  { k: 'Pickups',  v: store.order.hardwareConfig?.pickups?.split(' ')[0] },
                ]"
                :key="row.k"
                class="flex items-start justify-between px-5 py-3 gap-4"
              >
                <span class="type-label text-[9px] tracking-widest text-silver/25 flex-shrink-0">{{ row.k }}</span>
                <span class="font-mono text-[10px] text-right" :class="row.v ? 'text-ivory/60' : 'text-slate/40'">
                  {{ row.v ? row.v.toUpperCase() : '—' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Process note -->
          <div class="bg-carbon border border-slate/20 p-5">
            <div class="type-label text-[10px] tracking-widest text-silver/30 mb-4">What Happens Next</div>
            <div class="flex flex-col gap-3">
              <div v-for="item in [
                'We review your specification within 3 days',
                'Our team sends a detailed quote',
                'You approve and pay a 30% deposit',
                'Build begins',
              ]" :key="item" class="flex gap-3">
                <span class="text-gold/40 text-xs mt-0.5 flex-shrink-0">·</span>
                <p class="text-silver/30 text-xs font-light leading-relaxed">{{ item }}</p>
              </div>
            </div>
          </div>

        </aside>
      </div>
    </div>

  </div>
</template>
