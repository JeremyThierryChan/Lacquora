<script setup lang="ts">
const { t, tm } = useI18n()

const lacquerTechniques = computed(() => [
  {
    key: 'urushi',
    en: 'Urushi — 大漆',
    zh: '大漆工艺',
    desc: t('craftsmanship.techniques.urushi.desc'),
    steps: tm('craftsmanship.techniques.urushi.steps') as string[],
    time: t('craftsmanship.techniques.urushi.time'),
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=900&q=85',
    accent: 'border-lacquer/40 text-lacquer-light',
  },
  {
    key: 'qian_jin',
    en: 'Qian Jin — 戗金',
    zh: '戗金工艺',
    desc: t('craftsmanship.techniques.qian_jin.desc'),
    steps: tm('craftsmanship.techniques.qian_jin.steps') as string[],
    time: t('craftsmanship.techniques.qian_jin.time'),
    image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=900&q=85',
    accent: 'border-gold/40 text-gold',
  },
  {
    key: 'mother_of_pearl',
    en: '螺钿 — Mother of Pearl',
    zh: '螺钿工艺',
    desc: t('craftsmanship.techniques.mother_of_pearl.desc'),
    steps: tm('craftsmanship.techniques.mother_of_pearl.steps') as string[],
    time: t('craftsmanship.techniques.mother_of_pearl.time'),
    image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=900&q=85',
    accent: 'border-blue-400/30 text-blue-300/70',
  },
  {
    key: 'maki_e',
    en: 'Maki-e — 莳绘',
    zh: '莳绘工艺',
    desc: t('craftsmanship.techniques.maki_e.desc'),
    steps: tm('craftsmanship.techniques.maki_e.steps') as string[],
    time: t('craftsmanship.techniques.maki_e.time'),
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=85',
    accent: 'border-gold-light/30 text-gold-light',
  },
])

const lutherieSteps = computed(() => [
  { num: '01', phase: t('craftsmanship.lutherieSteps.01.phase'), zh: '设计', icon: '◎', desc: t('craftsmanship.lutherieSteps.01.desc'), detail: t('craftsmanship.lutherieSteps.01.detail') },
  { num: '02', phase: t('craftsmanship.lutherieSteps.02.phase'), zh: '选材', icon: '◰', desc: t('craftsmanship.lutherieSteps.02.desc'), detail: t('craftsmanship.lutherieSteps.02.detail') },
  { num: '03', phase: t('craftsmanship.lutherieSteps.03.phase'), zh: 'CNC加工', icon: '◑', desc: t('craftsmanship.lutherieSteps.03.desc'), detail: t('craftsmanship.lutherieSteps.03.detail') },
  { num: '04', phase: t('craftsmanship.lutherieSteps.04.phase'), zh: '手工成形', icon: '◁', desc: t('craftsmanship.lutherieSteps.04.desc'), detail: t('craftsmanship.lutherieSteps.04.detail') },
  { num: '05', phase: t('craftsmanship.lutherieSteps.05.phase'), zh: '涂装', icon: '◲', desc: t('craftsmanship.lutherieSteps.05.desc'), detail: t('craftsmanship.lutherieSteps.05.detail') },
  { num: '06', phase: t('craftsmanship.lutherieSteps.06.phase'), zh: '装配', icon: '▷', desc: t('craftsmanship.lutherieSteps.06.desc'), detail: t('craftsmanship.lutherieSteps.06.detail') },
  { num: '07', phase: t('craftsmanship.lutherieSteps.07.phase'), zh: '调试', icon: '◐', desc: t('craftsmanship.lutherieSteps.07.desc'), detail: t('craftsmanship.lutherieSteps.07.detail') },
  { num: '08', phase: t('craftsmanship.lutherieSteps.08.phase'), zh: '交付', icon: '✦', desc: t('craftsmanship.lutherieSteps.08.desc'), detail: t('craftsmanship.lutherieSteps.08.detail') },
])
</script>

<template>
  <div class="bg-obsidian pt-[72px]">

    <!-- Hero -->
    <section class="relative h-[55vh] min-h-[420px] flex items-end overflow-hidden pb-16">
      <img
        src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=1400&q=80"
        alt="Craftsmanship"
        class="absolute inset-0 w-full h-full object-cover"
        style="filter: brightness(0.2) saturate(0.5)"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
      <div class="container-site relative z-10">
        <span class="type-label tracking-[0.3em] text-gold/60 block mb-4">Craftsmanship</span>
        <h1 class="font-display text-5xl lg:text-6xl text-ivory leading-tight mb-4">
          {{ t('craftsmanship.title') }}
        </h1>
        <div class="flex items-center gap-4">
          <span class="gold-line" />
          <p class="type-label text-silver/40 tracking-wider">{{ t('craftsmanship.subtitle') }}</p>
        </div>
      </div>
    </section>

    <!-- Intro -->
    <section class="border-b border-slate/20 bg-graphite py-16">
      <div class="container-site grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div class="md:col-span-2">
          <h2 class="font-display text-3xl text-ivory leading-relaxed mb-6">
            {{ t('craftsmanship.intro.heading') }}
          </h2>
          <p class="text-silver/50 font-light leading-relaxed mb-4">
            {{ t('craftsmanship.intro.p1') }}
          </p>
          <p class="text-silver/40 font-light leading-relaxed">
            {{ t('craftsmanship.intro.p2') }}
          </p>
        </div>
        <div class="flex flex-col gap-6">
          <div v-for="stat in [
            { labelKey: 'craftsmanship.stats.layers', value: '60–100' },
            { labelKey: 'craftsmanship.stats.buildTime', value: '14 months' },
            { labelKey: 'craftsmanship.stats.luthiers', value: '4' },
            { labelKey: 'craftsmanship.stats.perYear', value: '<24' },
          ]" :key="stat.labelKey" class="border-b border-slate/20 pb-5">
            <div class="type-label text-silver/25 text-[9px] tracking-widest mb-1">{{ t(stat.labelKey) }}</div>
            <div class="font-mono text-xl text-gold/70">{{ stat.value }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ━━━ LACQUER ART ━━━ -->
    <section class="py-24">
      <div class="container-site">
        <div class="flex items-center gap-5 mb-16">
          <div>
            <span class="type-label tracking-[0.25em] text-gold/50 block mb-2">Part I</span>
            <h2 class="font-display text-4xl text-ivory">{{ t('craftsmanship.lacquerArt') }}</h2>
          </div>
          <div class="flex-1 h-px bg-slate/20 ml-4" />
        </div>

        <div class="flex flex-col gap-0.5">
          <div
            v-for="(tech, i) in lacquerTechniques"
            :key="tech.key"
            class="grid grid-cols-1 lg:grid-cols-2 overflow-hidden border border-slate/20 hover:border-gold/15 transition-all duration-500 group bg-carbon"
          >
            <!-- Image -->
            <div
              class="relative overflow-hidden aspect-[16/9] lg:aspect-auto lg:min-h-[380px]"
              :class="i % 2 === 1 ? 'lg:order-2' : ''"
            >
              <img
                :src="tech.image"
                :alt="tech.en"
                class="w-full h-full object-cover transition-transform duration-800 group-hover:scale-103"
                style="filter: brightness(0.45) saturate(0.7)"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-r from-carbon to-transparent"
                :class="i % 2 === 1 ? 'scale-x-[-1]' : ''" />
            </div>

            <!-- Content -->
            <div class="p-10 lg:p-14 flex flex-col justify-center"
              :class="i % 2 === 1 ? 'lg:order-1' : ''">
              <div class="type-label text-[9px] tracking-widest mb-4 border-b pb-4" :class="tech.accent">
                {{ tech.zh }}
              </div>
              <h3 class="font-display text-3xl text-ivory mb-6 group-hover:text-gold transition-colors duration-400">
                {{ tech.en }}
              </h3>
              <p class="text-silver/50 font-light text-sm leading-relaxed mb-8">{{ tech.desc }}</p>

              <!-- Process steps -->
              <div class="border-t border-slate/20 pt-6">
                <div class="type-label text-[9px] tracking-widest text-silver/25 mb-4">{{ t('craftsmanship.processLabel') }}</div>
                <div class="flex flex-col gap-2">
                  <div
                    v-for="(step, si) in tech.steps"
                    :key="si"
                    class="flex items-center gap-3"
                  >
                    <span class="font-mono text-[9px] text-gold/30 flex-shrink-0">{{ String(si + 1).padStart(2, '0') }}</span>
                    <span class="text-silver/40 text-xs font-light">{{ step }}</span>
                  </div>
                </div>
                <div class="mt-5 pt-5 border-t border-slate/10">
                  <span class="type-label text-[9px] text-silver/20 tracking-widest">{{ t('craftsmanship.timeLabel') }} — </span>
                  <span class="font-mono text-xs text-silver/40">{{ tech.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ━━━ LUTHERIE ━━━ -->
    <section class="border-t border-slate/20 bg-graphite py-24">
      <div class="container-site">
        <div class="flex items-center gap-5 mb-16">
          <div>
            <span class="type-label tracking-[0.25em] text-silver/30 block mb-2">Part II</span>
            <h2 class="font-display text-4xl text-ivory">{{ t('craftsmanship.lutherie') }}</h2>
          </div>
          <div class="flex-1 h-px bg-slate/20 ml-4" />
        </div>

        <!-- Timeline grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-0.5">
          <div
            v-for="step in lutherieSteps"
            :key="step.num"
            class="group p-8 bg-carbon border border-slate/20 hover:border-silver/15 transition-all duration-400"
          >
            <div class="flex items-start gap-6">
              <!-- Number + icon -->
              <div class="flex-shrink-0 flex flex-col items-center">
                <div class="font-mono text-xs text-silver/20 group-hover:text-gold/40 transition-colors duration-300 mb-2">
                  {{ step.num }}
                </div>
                <div class="text-xl text-silver/15 group-hover:text-silver/30 transition-colors duration-300">
                  {{ step.icon }}
                </div>
              </div>

              <!-- Content -->
              <div class="flex-1">
                <div class="flex items-baseline gap-3 mb-4">
                  <h3 class="font-display text-xl text-ivory group-hover:text-gold transition-colors duration-400">
                    {{ step.phase }}
                  </h3>
                  <span class="type-label-zh text-silver/25 text-[10px]">{{ step.zh }}</span>
                </div>
                <p class="text-silver/40 text-sm font-light leading-relaxed mb-4">{{ step.desc }}</p>
                <div class="border-t border-slate/15 pt-4">
                  <p class="text-silver/25 text-xs font-light italic leading-relaxed">{{ step.detail }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-28 text-center relative overflow-hidden border-t border-slate/20">
      <div class="absolute inset-0" style="background: radial-gradient(ellipse at center, rgba(201,168,76,0.04) 0%, transparent 65%)" />
      <div class="container-site relative z-10">
        <span class="type-label tracking-[0.3em] text-gold/50 block mb-6">Commission</span>
        <h2 class="font-display text-4xl text-ivory mb-4">{{ t('craftsmanship.cta.title') }}</h2>
        <div class="flex items-center gap-4 justify-center mb-10">
          <span class="gold-line" />
          <p class="text-silver/40 font-light text-sm">{{ t('craftsmanship.cta.subtitle') }}</p>
          <span class="gold-line" style="transform:scaleX(-1)" />
        </div>
        <RouterLink to="/custom-shop" class="btn-primary">{{ t('craftsmanship.cta.button') }}</RouterLink>
      </div>
    </section>

  </div>
</template>
