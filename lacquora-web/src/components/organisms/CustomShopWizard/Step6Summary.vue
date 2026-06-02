<script setup lang="ts">
import { useCustomOrderStore } from '@/stores/useCustomOrderStore'

const store = useCustomOrderStore()
const { t } = useI18n()

const form = reactive({
  customerName: store.order.customerName ?? '',
  customerEmail: store.order.customerEmail ?? '',
  customerPhone: store.order.customerPhone ?? '',
  customerCountry: store.order.customerCountry ?? '',
  notes: store.order.notes ?? '',
})

watch(form, (val) => store.setCustomerInfo(val))

const specRows = computed(() => [
  { label: 'Body Shape',    value: store.order.bodyShape?.replace('_', ' ').toUpperCase() },
  { label: 'Tonewood',      value: store.order.woodMaterial?.toUpperCase() },
  { label: 'Craft / Finish',value: store.order.craftType?.replace('_', ' ').toUpperCase() },
  { label: 'Bridge',        value: store.order.hardwareConfig?.bridge },
  { label: 'Pickups',       value: store.order.hardwareConfig?.pickups },
  { label: 'Neck',          value: store.order.hardwareConfig?.neck },
  { label: 'Fretboard',     value: store.order.hardwareConfig?.fretboard },
  { label: 'References',    value: `${store.order.referenceImages?.length ?? 0} image(s)` },
])

const errors = reactive({ name: '', email: '', country: '' })

function validate(): boolean {
  errors.name = form.customerName.trim() ? '' : 'Name is required'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customerEmail) ? '' : 'Valid email required'
  errors.country = form.customerCountry.trim() ? '' : 'Country is required'
  return !errors.name && !errors.email && !errors.country
}

async function handleSubmit() {
  if (!validate()) return
  store.isSubmitting = true
  try {
    await new Promise((r) => setTimeout(r, 1400)) // replace with actual API call
    store.isSubmitting = false
    store.isSubmitted = true
    store.submittedReferenceNo = `LQ-${Date.now().toString().slice(-6)}`
  } catch {
    store.isSubmitting = false
  }
}
</script>

<template>
  <div>
    <!-- Success state -->
    <Transition name="fade-up">
      <div
        v-if="store.isSubmitted"
        class="text-center py-20"
      >
        <div class="w-16 h-16 border border-gold/40 flex items-center justify-center mx-auto mb-8">
          <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L20 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="type-label tracking-[0.2em] text-gold/60 block mb-4">Received</span>
        <h2 class="font-display text-3xl text-ivory mb-4">{{ t('customShop.successTitle') }}</h2>
        <p class="text-silver/50 font-light text-sm mb-2">{{ t('customShop.successDesc') }}</p>
        <p class="font-mono text-xs text-gold/50 mt-6">Ref: {{ store.submittedReferenceNo }}</p>
        <RouterLink to="/" class="btn-ghost mt-10 inline-flex">Return Home</RouterLink>
      </div>
    </Transition>

    <!-- Form state -->
    <div v-if="!store.isSubmitted">
      <h2 class="font-display text-3xl text-ivory mb-2">Review & submit your enquiry.</h2>
      <p class="text-silver/40 font-light text-sm mb-10">We'll review your specification and respond within 3 business days.</p>

      <!-- Spec summary -->
      <div class="bg-carbon border border-slate/20 mb-10">
        <div class="type-label text-[10px] tracking-widest text-silver/30 px-6 py-4 border-b border-slate/20">
          Your Specification
        </div>
        <div class="divide-y divide-slate/20">
          <div
            v-for="row in specRows"
            :key="row.label"
            class="flex items-center justify-between px-6 py-3"
          >
            <span class="type-label text-[10px] tracking-widest text-silver/30">{{ row.label }}</span>
            <span class="font-mono text-xs text-ivory/70">{{ row.value ?? '—' }}</span>
          </div>
        </div>
      </div>

      <!-- Contact form -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div>
          <label class="field-label">{{ t('contact.name') }} *</label>
          <input v-model="form.customerName" type="text" class="field-base" :placeholder="t('contact.name')" />
          <p v-if="errors.name" class="text-lacquer-light text-xs mt-1">{{ errors.name }}</p>
        </div>
        <div>
          <label class="field-label">{{ t('contact.email') }} *</label>
          <input v-model="form.customerEmail" type="email" class="field-base" :placeholder="t('contact.email')" />
          <p v-if="errors.email" class="text-lacquer-light text-xs mt-1">{{ errors.email }}</p>
        </div>
        <div>
          <label class="field-label">{{ t('contact.phone') }}</label>
          <input v-model="form.customerPhone" type="tel" class="field-base" placeholder="+86 138 0000 0000" />
        </div>
        <div>
          <label class="field-label">{{ t('contact.country') }} *</label>
          <input v-model="form.customerCountry" type="text" class="field-base" placeholder="China / USA / Japan…" />
          <p v-if="errors.country" class="text-lacquer-light text-xs mt-1">{{ errors.country }}</p>
        </div>
      </div>

      <!-- Privacy notice -->
      <p class="text-silver/25 text-xs font-light mb-8 leading-relaxed">
        By submitting, you agree that LACQUORA may contact you regarding your enquiry. Your information is never shared with third parties.
      </p>

      <!-- Submit -->
      <button
        class="btn-primary w-full md:w-auto"
        :disabled="store.isSubmitting"
        @click="handleSubmit"
      >
        <span v-if="store.isSubmitting" class="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin" />
        {{ store.isSubmitting ? t('customShop.submitting') : t('customShop.submit') }}
      </button>
    </div>
  </div>
</template>
