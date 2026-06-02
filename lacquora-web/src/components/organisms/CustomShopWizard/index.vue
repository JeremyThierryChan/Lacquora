<script setup lang="ts">
import StepIndicator from '@/components/molecules/StepIndicator.vue'
import Step1Body     from './Step1Body.vue'
import Step2Wood     from './Step2Wood.vue'
import Step3Craft    from './Step3Craft.vue'
import Step4Hardware from './Step4Hardware.vue'
import Step5Upload   from './Step5Upload.vue'
import Step6Summary  from './Step6Summary.vue'
import { useCustomOrderStore } from '@/stores/useCustomOrderStore'

const { t } = useI18n()
const store = useCustomOrderStore()

const stepComponents = [Step1Body, Step2Wood, Step3Craft, Step4Hardware, Step5Upload, Step6Summary]

const stepMeta = computed(() => [
  { num: 1, title: t('customShop.step1.title'), subtitle: t('customShop.step1.subtitle') },
  { num: 2, title: t('customShop.step2.title'), subtitle: t('customShop.step2.subtitle') },
  { num: 3, title: t('customShop.step3.title'), subtitle: t('customShop.step3.subtitle') },
  { num: 4, title: t('customShop.step4.title'), subtitle: t('customShop.step4.subtitle') },
  { num: 5, title: t('customShop.step5.title'), subtitle: t('customShop.step5.subtitle') },
  { num: 6, title: t('customShop.step6.title'), subtitle: t('customShop.step6.subtitle') },
])

const currentComponent = computed(() => stepComponents[store.currentStep - 1])
const currentMeta = computed(() => stepMeta.value[store.currentStep - 1])
const isLastStep = computed(() => store.currentStep === store.totalSteps)
const isFirstStep = computed(() => store.currentStep === 1)

const direction = ref<'forward' | 'back'>('forward')

function goNext() {
  if (!store.canProceedFromStep && store.currentStep < 5) return
  direction.value = 'forward'
  store.nextStep()
}

function goBack() {
  direction.value = 'back'
  store.prevStep()
}
</script>

<template>
  <div class="min-h-[70vh] flex flex-col">

    <!-- Step indicator -->
    <div class="mb-14">
      <StepIndicator
        :steps="stepMeta"
        :current="store.currentStep"
        :completed="store.stepCompletionMap"
      />
    </div>

    <!-- Current step label -->
    <div class="mb-10">
      <div class="flex items-center gap-3 mb-1">
        <span class="font-mono text-xs text-gold/40">
          {{ String(store.currentStep).padStart(2, '0') }} / {{ String(store.totalSteps).padStart(2, '0') }}
        </span>
        <div class="h-px flex-1 bg-slate/20" />
      </div>
      <div class="type-label text-[10px] tracking-widest text-silver/30">
        {{ currentMeta?.subtitle }}
      </div>
    </div>

    <!-- Step content with transition -->
    <div class="flex-1">
      <Transition :name="direction === 'forward' ? 'step-forward' : 'step-back'" mode="out-in">
        <component :is="currentComponent" :key="store.currentStep" />
      </Transition>
    </div>

    <!-- Navigation -->
    <div
      v-if="!store.isSubmitted"
      class="flex items-center justify-between mt-16 pt-8 border-t border-slate/20"
    >
      <button
        v-if="!isFirstStep"
        class="btn-ghost text-xs px-6 py-3"
        @click="goBack"
      >
        ← {{ t('customShop.back') }}
      </button>
      <div v-else />

      <div class="flex items-center gap-4">
        <!-- Progress dots (mobile) -->
        <div class="flex gap-1.5 md:hidden">
          <div
            v-for="i in store.totalSteps"
            :key="i"
            class="w-1.5 h-1.5 rounded-full transition-all duration-300"
            :class="i === store.currentStep ? 'bg-gold' : 'bg-slate'"
          />
        </div>

        <button
          v-if="!isLastStep"
          class="btn-primary text-xs px-8 py-3"
          :class="{ 'opacity-50 cursor-not-allowed': !store.canProceedFromStep && store.currentStep < 5 }"
          @click="goNext"
        >
          {{ t('customShop.continue') }} →
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.step-forward-enter-active,
.step-forward-leave-active,
.step-back-enter-active,
.step-back-leave-active {
  transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.25,0.1,0.25,1);
}

.step-forward-enter-from { opacity: 0; transform: translateX(24px); }
.step-forward-leave-to   { opacity: 0; transform: translateX(-24px); }
.step-back-enter-from    { opacity: 0; transform: translateX(-24px); }
.step-back-leave-to      { opacity: 0; transform: translateX(24px); }
</style>
