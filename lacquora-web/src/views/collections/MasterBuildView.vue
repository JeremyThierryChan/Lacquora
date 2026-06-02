<script setup lang="ts">
const { t } = useI18n()

const works = [
  {
    id: 20, sku: 'MB-001',
    titleEn: 'Vermilion Dragon', titleZh: '朱龙',
    subtitle: 'Maki-e + Qian Jin · Alder body · Ebony board',
    desc: 'Three techniques combined: gold thread outlining, maki-e powder fill, and a 100-layer vermilion urushi ground. Took 14 months to complete.',
    year: '2023',
    commission: 'Private collector, Tokyo',
    priceRange: 'Commission enquiry',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    id: 21, sku: 'MB-002',
    titleEn: 'Ink Wash', titleZh: '水墨',
    subtitle: 'Sumi ink on urushi · Walnut body · Maple neck',
    desc: 'Abstract ink wash composition sealed under urushi. Collaboration with painter Chen Liwei.',
    year: '2024',
    commission: 'Artist collaboration',
    priceRange: 'Commission enquiry',
    image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&q=80',
    span: '',
  },
  {
    id: 22, sku: 'MB-003',
    titleEn: 'Void White', titleZh: '虚白',
    subtitle: 'Pure white urushi · Ash body · Bone nut',
    desc: '60 coats of white urushi on a lightweight ash body. Minimalism taken to its logical extreme.',
    year: '2024',
    commission: 'Available',
    priceRange: '¥280,000 – ¥340,000',
    image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800&q=80',
    span: '',
  },
]

const process = [
  { step: '01', title: 'Consultation', desc: 'In-depth discussion of vision, references, timeline, and budget. We do not proceed without complete clarity.' },
  { step: '02', title: 'Concept Design', desc: 'Sketches, material proposals, and 3D mock-ups. Presented for approval before any material is touched.' },
  { step: '03', title: 'Material Selection', desc: 'Woods and lacquer stocks are hand-selected for each commission. No compromises on foundation materials.' },
  { step: '04', title: 'Build', desc: 'Lutherie and lacquer work proceed simultaneously across 6–14 months, depending on technique complexity.' },
  { step: '05', title: 'QA & Setup', desc: 'Full playability setup, intonation, and acoustic assessment before cosmetic completion.' },
  { step: '06', title: 'Certificate & Handover', desc: 'A certificate of provenance, build diary, and archival photographs accompany every instrument.' },
]
</script>

<template>
  <div class="bg-obsidian pt-[72px]">

    <!-- Hero -->
    <section class="relative h-[60vh] min-h-[480px] flex items-end overflow-hidden pb-16">
      <img
        src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=1400&q=80"
        alt="Master Build"
        class="absolute inset-0 w-full h-full object-cover"
        style="filter: brightness(0.2) saturate(0.5)"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
      <div class="container-site relative z-10">
        <span class="type-label tracking-[0.25em] text-gold/60 block mb-4">
          One-Off · Commission · Collector
        </span>
        <h1 class="font-display text-5xl lg:text-6xl text-ivory leading-tight mb-4">
          Master Build
        </h1>
        <div class="flex items-center gap-4">
          <span class="gold-line" />
          <p class="type-label text-silver/40 tracking-wider">
            The highest expression of LACQUORA craft
          </p>
        </div>
      </div>
    </section>

    <!-- Positioning statement -->
    <section class="border-b border-slate/20 bg-graphite py-16">
      <div class="container-site grid grid-cols-1 md:grid-cols-3 gap-12">
        <div class="md:col-span-2">
          <h2 class="font-display text-3xl text-ivory leading-relaxed mb-6">
            Each Master Build is a single instrument.<br />
            There are no variants. No editions. No reissues.
          </h2>
          <p class="text-silver/50 font-light leading-relaxed">
            Master Build commissions represent months of uninterrupted focus from our most experienced luthiers and lacquer artists. They exist at the intersection of instrument and art object — functional by design, collectible by nature.
          </p>
        </div>
        <div class="flex flex-col gap-6">
          <div v-for="item in [
            { label: 'Edition', value: 'One-Off Only' },
            { label: 'Avg. Lead Time', value: '8–14 months' },
            { label: 'Starting From', value: '¥180,000' },
            { label: 'Certificate', value: 'Included' },
          ]" :key="item.label" class="border-b border-slate/20 pb-6">
            <div class="type-label text-silver/25 text-[9px] tracking-widest mb-1">{{ item.label }}</div>
            <div class="font-mono text-base text-gold/80">{{ item.value }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Works Gallery -->
    <section class="container-site py-20">
      <div class="type-label tracking-[0.25em] text-gold/40 mb-10">Selected Works</div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 auto-rows-[400px]">
        <div
          v-for="work in works"
          :key="work.id"
          class="group relative overflow-hidden bg-carbon border border-slate/20 hover:border-gold/20 transition-all duration-600 cursor-pointer"
          :class="work.span"
        >
          <img
            :src="work.image"
            :alt="work.titleEn"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-800 group-hover:scale-105"
            style="filter: brightness(0.45) saturate(0.7)"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-transparent" />

          <!-- Badges -->
          <div class="absolute top-5 left-5 flex gap-2">
            <span class="type-label text-[9px] tracking-widest border border-gold/30 text-gold/60 px-3 py-1.5 bg-obsidian/60">
              {{ work.sku }}
            </span>
            <span class="type-label text-[9px] tracking-widest border border-silver/20 text-silver/40 px-3 py-1.5 bg-obsidian/60">
              {{ work.year }}
            </span>
          </div>

          <!-- Content -->
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <div class="type-label-zh text-silver/30 mb-1 text-[11px]">{{ work.titleZh }}</div>
            <h3 class="font-display text-2xl text-ivory mb-1 group-hover:text-gold transition-colors duration-400">
              {{ work.titleEn }}
            </h3>
            <p class="text-silver/40 text-xs mb-3">{{ work.subtitle }}</p>
            <p class="text-silver/30 text-xs font-light leading-relaxed mb-4 max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-400">
              {{ work.desc }}
            </p>
            <div class="flex items-center justify-between border-t border-slate/20 pt-4">
              <div class="type-label text-silver/25 text-[9px]">{{ work.commission }}</div>
              <div class="font-mono text-xs text-gold/60">{{ work.priceRange }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="border-t border-slate/20 bg-graphite py-20">
      <div class="container-site">
        <div class="text-center mb-14">
          <span class="type-label tracking-[0.25em] text-gold/40 block mb-4">Process</span>
          <h2 class="font-display text-3xl text-ivory">How a Master Build begins.</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
          <div
            v-for="step in process"
            :key="step.step"
            class="p-8 bg-carbon border border-slate/20 hover:border-gold/20 transition-all duration-400 group"
          >
            <div class="font-mono text-xs text-gold/20 mb-4 group-hover:text-gold/40 transition-colors duration-300">
              {{ step.step }}
            </div>
            <h3 class="font-display text-xl text-ivory mb-3 group-hover:text-gold transition-colors duration-400">
              {{ step.title }}
            </h3>
            <p class="text-silver/40 text-xs font-light leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Enquiry CTA -->
    <section class="py-28 text-center relative overflow-hidden">
      <div class="absolute inset-0" style="background: radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 70%)" />
      <div class="container-site relative z-10">
        <span class="type-label tracking-[0.3em] text-gold/50 block mb-6">Commission</span>
        <h2 class="font-display text-4xl text-ivory mb-4">Begin the conversation.</h2>
        <div class="flex items-center gap-4 justify-center mb-10">
          <span class="gold-line" />
          <p class="text-silver/40 font-light text-sm">We accept a limited number of commissions each year.</p>
          <span class="gold-line" style="transform:scaleX(-1)" />
        </div>
        <RouterLink to="/contact" class="btn-primary">
          Enquire About Master Build
        </RouterLink>
      </div>
    </section>

  </div>
</template>
