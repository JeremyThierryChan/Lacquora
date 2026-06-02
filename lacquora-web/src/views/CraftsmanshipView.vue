<script setup lang="ts">
const { t } = useI18n()

const lacquerTechniques = [
  {
    key: 'urushi',
    en: 'Urushi — 大漆',
    zh: '大漆工艺',
    desc: 'Pure urushi (Toxicodendron vernicifluum) sap, harvested by hand incisions into the bark of lacquer trees. Applied in 50–100 coats inside humidity chambers at 75–85% RH, each coat dried 24 hours before the next. The result is a surface of optical depth unachievable by synthetic means.',
    steps: ['Tree sap harvesting', 'Raw lacquer filtration', 'Ground coat application', 'Intermediate coats (×30–60)', 'Final color coats', 'Mirror polishing'],
    time: '8–16 weeks for finish alone',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=900&q=85',
    accent: 'border-lacquer/40 text-lacquer-light',
  },
  {
    key: 'qian_jin',
    en: 'Qian Jin — 戗金',
    zh: '戗金工艺',
    desc: 'A Tang dynasty technique in which designs are incised into a cured lacquer surface with blades as fine as 0.2mm, then gold powder or foil is pressed into the grooves. The gold is then sealed with thin urushi and polished level, leaving the design embedded beneath the surface rather than sitting on top of it.',
    steps: ['Design transfer to lacquer', 'Groove incision with fine blade', 'Gold powder / foil pressing', 'Urushi seal coat', 'Level sanding (×8)', 'Final polish'],
    time: '3–6 weeks (on top of ground coat)',
    image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=900&q=85',
    accent: 'border-gold/40 text-gold',
  },
  {
    key: 'mother_of_pearl',
    en: '螺钿 — Mother of Pearl',
    zh: '螺钿工艺',
    desc: 'Freshwater mussel or abalone shell is cut into fragments or geometric forms using a tungsten scribe, then embedded into wet urushi at precise depths. As urushi is built up around the shell and polished flush, the iridescent surface shifts from green to violet to gold depending on the viewing angle.',
    steps: ['Shell selection & cutting', 'Embedding in wet urushi', 'Build-up coats around shell', 'Level sanding (×12)', 'Buffing to reveal shimmer', 'Final clear seal'],
    time: '4–8 weeks',
    image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=900&q=85',
    accent: 'border-blue-400/30 text-blue-300/70',
  },
  {
    key: 'maki_e',
    en: 'Maki-e — 莳绘',
    zh: '莳绘工艺',
    desc: 'A Heian-period art form in which gold and silver powders are scattered (maki) onto wet lacquer (e = picture). A fine brush traces the design in urushi, then metallic powder is immediately applied with a blowing tool. Fixed and built up under protective layers, then revealed through polishing.',
    steps: ['Design rendering in wet urushi', 'Powder scattering (kin/gin)', 'Powder fixation coat', 'Build-up and protection layers', 'Reveal polishing', 'Detail refinement'],
    time: '6–14 weeks depending on complexity',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=85',
    accent: 'border-gold-light/30 text-gold-light',
  },
]

const lutherieSteps = [
  {
    num: '01',
    phase: 'Design',
    zh: '设计',
    icon: '◎',
    desc: 'Every build begins with a detailed conversation. Body dimensions, neck profile, scale length, and tonal targets are agreed before a single tool is lifted. For custom commissions, we produce technical drawings and 3D models for client approval.',
    detail: 'Software: Fusion 360 + Rhino 3D. Output: full-scale technical drawings, 3D renders, wood grain simulation.',
  },
  {
    num: '02',
    phase: 'Wood Selection',
    zh: '选材',
    icon: '◰',
    desc: 'Tonewoods are sourced from specialist suppliers and selected by hand from each batch. We look for consistent grain direction, appropriate density for the target tone, and absence of internal stress. All wood is kiln-dried and acclimatised in our workshop for a minimum of three months.',
    detail: 'Moisture content target: 6–8%. Each blank is tap-tested for resonance before CNC.',
  },
  {
    num: '03',
    phase: 'CNC Milling',
    zh: 'CNC加工',
    icon: '◑',
    desc: 'Body and neck blanks are machined on a 3-axis CNC router to within 0.1mm tolerances. The CNC handles the geometry — pockets, contours, routing paths. Everything that defines the fit and function of the instrument is established here.',
    detail: 'Machine: Stepcraft 1100. Resolution: 0.05mm. All toolpaths verified against 3D model before run.',
  },
  {
    num: '04',
    phase: 'Hand Shaping',
    zh: '手工成形',
    icon: '◁',
    desc: 'After CNC, every edge, contour, and taper is finished by hand with spokeshaves, files, and progressively finer sandpaper. The neck carve is done entirely by hand — the machine establishes the profile, but the feel of the neck is shaped by the luthier.',
    detail: 'Sanding progression: 80 → 120 → 180 → 240 → 320 grit. Final surface prep for finish.',
  },
  {
    num: '05',
    phase: 'Lacquer / Finish',
    zh: '涂装',
    icon: '◲',
    desc: 'For standard builds, high-quality nitrocellulose is applied in 8–10 coats, cut back, and polished. For lacquer instruments, the entire urushi process begins here — occupying the majority of the total build timeline.',
    detail: 'Standard nitro: 3–4 weeks. Urushi finishes: 8–16 weeks. All finishing done in a dedicated, humidity-controlled room.',
  },
  {
    num: '06',
    phase: 'Assembly',
    zh: '装配',
    icon: '▷',
    desc: 'Hardware is fitted, the neck is bolted or glued, and electronics are wired. Frets are levelled, crowned, and polished. Nut slots are cut to precise string action.',
    detail: 'Fret level check: 0.002" feeler gauge. Nut slots: measured by string gauge + 0.002" clearance.',
  },
  {
    num: '07',
    phase: 'Setup & QA',
    zh: '调试',
    icon: '◐',
    desc: 'Each instrument is set up to a standard spec, then played in for a minimum of two hours before final QA. Action, intonation, pickup height, and truss rod relief are set and documented. Any issues found are resolved before sign-off.',
    detail: 'Action at 12th fret: 1.6mm bass / 1.2mm treble (standard). Intonation: within ±1 cent.',
  },
  {
    num: '08',
    phase: 'Delivery',
    zh: '交付',
    icon: '✦',
    desc: 'The instrument is delivered with a certificate of provenance, build diary with photographs at each stage, and a setup card documenting the final measurements. Each case is custom-fitted.',
    detail: 'Shipping: temperature-controlled freight for international orders. Certificate signed by the lead luthier.',
  },
]
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
            Two disciplines, one instrument.
          </h2>
          <p class="text-silver/50 font-light leading-relaxed mb-4">
            Every LACQUORA guitar is the product of two parallel bodies of knowledge: the centuries-old craft of Chinese lacquer art, and the precision discipline of electric guitar lutherie. Neither is subordinate to the other. Both must be mastered.
          </p>
          <p class="text-silver/40 font-light leading-relaxed">
            The lacquer work and the woodwork proceed alongside each other — each informing the tolerances, the weight targets, and the surface geometry of the final instrument. A guitar finished in 80 layers of urushi cannot be an afterthought; it must be designed for that finish from the first sketch.
          </p>
        </div>
        <div class="flex flex-col gap-6">
          <div v-for="stat in [
            { label: 'Avg. Lacquer Layers', value: '60–100' },
            { label: 'Max Build Time', value: '14 months' },
            { label: 'Luthiers on Staff', value: '4' },
            { label: 'Works per Year', value: '<24' },
          ]" :key="stat.label" class="border-b border-slate/20 pb-5">
            <div class="type-label text-silver/25 text-[9px] tracking-widest mb-1">{{ stat.label }}</div>
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
                <div class="type-label text-[9px] tracking-widest text-silver/25 mb-4">Process</div>
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
                  <span class="type-label text-[9px] text-silver/20 tracking-widest">Time — </span>
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
        <h2 class="font-display text-4xl text-ivory mb-4">Commission a built-to-standard instrument.</h2>
        <div class="flex items-center gap-4 justify-center mb-10">
          <span class="gold-line" />
          <p class="text-silver/40 font-light text-sm">Every process on this page is available in our Custom Shop.</p>
          <span class="gold-line" style="transform:scaleX(-1)" />
        </div>
        <RouterLink to="/custom-shop" class="btn-primary">Open Custom Shop</RouterLink>
      </div>
    </section>

  </div>
</template>
