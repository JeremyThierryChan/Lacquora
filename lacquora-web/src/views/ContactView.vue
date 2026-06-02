<script setup lang="ts">
import type { InquiryType } from '@/types'
const { t } = useI18n()

// ── Form state ──
const form = reactive({
  type: 'general' as InquiryType,
  name: '',
  email: '',
  phone: '',
  country: '',
  message: '',
})

const errors = reactive({
  name: '',
  email: '',
  country: '',
  message: '',
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const inquiryTypes: { key: InquiryType; label: string; desc: string }[] = [
  { key: 'general',    label: t('contact.types.general'),    desc: 'Questions about our work, processes or brand' },
  { key: 'custom',     label: t('contact.types.custom'),     desc: 'Commission a bespoke instrument' },
  { key: 'enterprise', label: t('contact.types.enterprise'), desc: 'Corporate gifts, events or bulk orders' },
  { key: 'press',      label: t('contact.types.press'),      desc: 'Press, media or partnership enquiries' },
]

function validate(): boolean {
  errors.name    = form.name.trim()    ? '' : 'Required'
  errors.email   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Valid email required'
  errors.country = form.country.trim() ? '' : 'Required'
  errors.message = form.message.trim().length >= 20 ? '' : 'Please provide at least 20 characters'
  return !errors.name && !errors.email && !errors.country && !errors.message
}

async function submit() {
  if (!validate()) return
  isSubmitting.value = true
  await new Promise((r) => setTimeout(r, 1200)) // replace with real API
  isSubmitting.value = false
  isSubmitted.value = true
}

// Contact info cards
const info = [
  {
    icon: '◉',
    label: 'Studio',
    value: 'Shanghai, China',
    sub: 'Visits by appointment only',
  },
  {
    icon: '◎',
    label: 'Response Time',
    value: '1–2 business days',
    sub: 'All enquiries answered personally',
  },
  {
    icon: '◈',
    label: 'Languages',
    value: 'ZH · EN · JA',
    sub: 'Other languages via translation',
  },
  {
    icon: '◐',
    label: 'Commissions Open',
    value: '< 24 / year',
    sub: 'Limited capacity — enquire early',
  },
]
</script>

<template>
  <div class="bg-obsidian pt-[72px] min-h-screen">

    <!-- Header -->
    <section class="border-b border-slate/20 bg-graphite">
      <div class="container-site py-14">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
          <div>
            <span class="type-label tracking-[0.3em] text-gold/60 block mb-5">Contact</span>
            <h1 class="font-display text-4xl lg:text-5xl text-ivory leading-tight">
              {{ t('contact.title') }}
            </h1>
          </div>
          <div>
            <div class="flex items-center gap-4 mb-4">
              <span class="gold-line" />
              <p class="type-label text-silver/40 tracking-wider text-[10px]">漆境工坊</p>
            </div>
            <p class="text-silver/40 font-light leading-relaxed text-sm max-w-sm">
              {{ t('contact.subtitle') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Info cards -->
    <section class="border-b border-slate/20">
      <div class="container-site">
        <div class="grid grid-cols-2 md:grid-cols-4">
          <div
            v-for="item in info"
            :key="item.label"
            class="py-8 px-6 border-r border-slate/20 last:border-r-0 group"
          >
            <div class="text-xl text-silver/15 mb-4 group-hover:text-silver/30 transition-colors duration-300">
              {{ item.icon }}
            </div>
            <div class="type-label text-[9px] tracking-widest text-silver/30 mb-2">{{ item.label }}</div>
            <div class="font-mono text-sm text-ivory/70 mb-1">{{ item.value }}</div>
            <div class="text-silver/30 text-xs font-light">{{ item.sub }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main content -->
    <section class="container-site py-16 lg:py-24">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 items-start">

        <!-- ── Form ── -->
        <div>

          <!-- Success state -->
          <Transition name="fade-up">
            <div v-if="isSubmitted" class="text-center py-20">
              <div class="w-16 h-16 border border-gold/40 flex items-center justify-center mx-auto mb-8">
                <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l5 5L20 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="type-label tracking-[0.2em] text-gold/60 block mb-4">Received</span>
              <h2 class="font-display text-3xl text-ivory mb-3">{{ t('contact.successTitle') }}</h2>
              <p class="text-silver/40 font-light text-sm">{{ t('contact.successDesc') }}</p>
              <button class="btn-ghost mt-10" @click="isSubmitted = false">Send another</button>
            </div>
          </Transition>

          <div v-if="!isSubmitted">
            <!-- Inquiry type selector -->
            <div class="mb-10">
              <label class="field-label mb-5 block">{{ t('contact.type') }}</label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-0.5">
                <button
                  v-for="type in inquiryTypes"
                  :key="type.key"
                  class="group text-left p-5 border transition-all duration-300 bg-carbon"
                  :class="form.type === type.key
                    ? 'border-gold'
                    : 'border-slate/30 hover:border-gold/30'"
                  @click="form.type = type.key"
                >
                  <div v-if="form.type === type.key"
                    class="w-1.5 h-1.5 bg-gold rounded-full mb-3" />
                  <div v-else class="w-1.5 h-1.5 bg-slate/40 rounded-full mb-3" />
                  <div
                    class="font-display text-base leading-tight mb-2 transition-colors duration-300"
                    :class="form.type === type.key ? 'text-gold' : 'text-ivory group-hover:text-gold'"
                  >
                    {{ type.label }}
                  </div>
                  <p class="text-silver/30 text-xs font-light leading-relaxed">{{ type.desc }}</p>
                </button>
              </div>
            </div>

            <!-- Form fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label class="field-label">{{ t('contact.name') }} *</label>
                <input
                  v-model="form.name"
                  type="text"
                  class="field-base"
                  :class="errors.name ? 'border-lacquer/60' : ''"
                  :placeholder="t('contact.name')"
                />
                <p v-if="errors.name" class="text-lacquer-light text-xs mt-1">{{ errors.name }}</p>
              </div>
              <div>
                <label class="field-label">{{ t('contact.email') }} *</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="field-base"
                  :class="errors.email ? 'border-lacquer/60' : ''"
                  :placeholder="t('contact.email')"
                />
                <p v-if="errors.email" class="text-lacquer-light text-xs mt-1">{{ errors.email }}</p>
              </div>
              <div>
                <label class="field-label">{{ t('contact.phone') }}</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="field-base"
                  placeholder="+86 / +1 / +81…"
                />
              </div>
              <div>
                <label class="field-label">{{ t('contact.country') }} *</label>
                <input
                  v-model="form.country"
                  type="text"
                  class="field-base"
                  :class="errors.country ? 'border-lacquer/60' : ''"
                  placeholder="China / USA / Japan…"
                />
                <p v-if="errors.country" class="text-lacquer-light text-xs mt-1">{{ errors.country }}</p>
              </div>
            </div>

            <div class="mb-8">
              <label class="field-label">{{ t('contact.message') }} *</label>
              <textarea
                v-model="form.message"
                rows="6"
                class="field-base resize-none"
                :class="errors.message ? 'border-lacquer/60' : ''"
                :placeholder="t('contact.message') + '…'"
              />
              <div class="flex items-center justify-between mt-1">
                <p v-if="errors.message" class="text-lacquer-light text-xs">{{ errors.message }}</p>
                <p v-else class="text-transparent text-xs">_</p>
                <span class="type-label text-[9px] text-silver/20">{{ form.message.length }} chars</span>
              </div>
            </div>

            <!-- Privacy + Submit -->
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <button
                class="btn-primary flex-shrink-0"
                :disabled="isSubmitting"
                @click="submit"
              >
                <span v-if="isSubmitting" class="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin" />
                {{ isSubmitting ? 'Sending…' : t('contact.submit') }}
              </button>
              <p class="text-silver/25 text-xs font-light leading-relaxed max-w-xs">
                We respond personally to every message. Your information is never shared.
              </p>
            </div>
          </div>
        </div>

        <!-- ── Sidebar ── -->
        <aside class="lg:sticky lg:top-24 flex flex-col gap-4">

          <!-- What to expect -->
          <div class="bg-carbon border border-slate/20 p-7">
            <div class="type-label text-[10px] tracking-widest text-silver/30 mb-6">What to Expect</div>
            <div class="flex flex-col gap-4">
              <div v-for="item in [
                { step: '01', text: 'We read your message within one business day' },
                { step: '02', text: 'A team member responds — not a template' },
                { step: '03', text: 'If relevant, a call is scheduled at your convenience' },
                { step: '04', text: 'Custom enquiries receive a detailed quote within 5 days' },
              ]" :key="item.step" class="flex gap-4">
                <span class="font-mono text-[9px] text-gold/30 flex-shrink-0 mt-0.5">{{ item.step }}</span>
                <p class="text-silver/35 text-xs font-light leading-relaxed">{{ item.text }}</p>
              </div>
            </div>
          </div>

          <!-- Social / alternate contact -->
          <div class="bg-carbon border border-slate/20 p-7">
            <div class="type-label text-[10px] tracking-widest text-silver/30 mb-6">Also Reach Us Via</div>
            <div class="flex flex-col gap-4">
              <a href="#" class="flex items-center justify-between group">
                <span class="type-label text-[10px] text-silver/40 group-hover:text-ivory transition-colors duration-200">Instagram</span>
                <span class="text-silver/20 group-hover:text-gold transition-colors duration-200 text-sm">→</span>
              </a>
              <a href="#" class="flex items-center justify-between group">
                <span class="type-label text-[10px] text-silver/40 group-hover:text-ivory transition-colors duration-200">WeChat Official</span>
                <span class="text-silver/20 group-hover:text-gold transition-colors duration-200 text-sm">→</span>
              </a>
              <a href="#" class="flex items-center justify-between group">
                <span class="type-label text-[10px] text-silver/40 group-hover:text-ivory transition-colors duration-200">Weibo</span>
                <span class="text-silver/20 group-hover:text-gold transition-colors duration-200 text-sm">→</span>
              </a>
            </div>
          </div>

          <!-- Custom Shop shortcut -->
          <RouterLink
            to="/custom-shop"
            class="block bg-carbon border border-gold/20 hover:border-gold/50 p-7 transition-all duration-400 group"
          >
            <div class="type-label text-[9px] tracking-widest text-gold/50 mb-3">Shortcut</div>
            <div class="font-display text-lg text-ivory group-hover:text-gold transition-colors duration-300 mb-2">
              Already know what you want?
            </div>
            <p class="text-silver/30 text-xs font-light mb-4">
              Skip straight to the Custom Shop and configure your build spec directly.
            </p>
            <span class="btn-text text-[10px]">Open Custom Shop →</span>
          </RouterLink>
        </aside>

      </div>
    </section>

  </div>
</template>

<style scoped>
.fade-up-enter-active { transition: opacity 0.5s ease, transform 0.5s ease; }
.fade-up-enter-from   { opacity: 0; transform: translateY(16px); }
</style>
