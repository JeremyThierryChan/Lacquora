<script setup lang="ts">
interface Step {
  num: number
  title: string
  subtitle: string
}

interface Props {
  steps: Step[]
  current: number
  completed: Record<number, boolean>
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center w-full">
    <template v-for="(step, i) in steps" :key="step.num">
      <!-- Step node -->
      <div class="flex flex-col items-center relative">
        <!-- Circle -->
        <div
          class="w-8 h-8 flex items-center justify-center border transition-all duration-400 relative z-10"
          :class="{
            'border-gold bg-gold text-obsidian': step.num === current,
            'border-gold/60 bg-transparent': completed[step.num] && step.num !== current,
            'border-slate/40 bg-transparent': !completed[step.num] && step.num !== current,
          }"
        >
          <!-- Checkmark for completed -->
          <svg
            v-if="completed[step.num] && step.num !== current"
            class="w-3 h-3 text-gold"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <!-- Number -->
          <span
            v-else
            class="font-mono text-xs"
            :class="step.num === current ? 'text-obsidian font-bold' : 'text-silver/40'"
          >
            {{ String(step.num).padStart(2, '0') }}
          </span>
        </div>

        <!-- Label (desktop only) -->
        <div class="absolute top-10 hidden md:block text-center w-20 -translate-x-1/2 left-1/2">
          <div
            class="type-label text-[9px] tracking-widest leading-tight"
            :class="step.num === current ? 'text-ivory' : 'text-silver/30'"
          >
            {{ step.title }}
          </div>
        </div>
      </div>

      <!-- Connector line -->
      <div
        v-if="i < steps.length - 1"
        class="flex-1 h-px transition-all duration-600 mx-1"
        :class="completed[step.num] ? 'bg-gold/40' : 'bg-slate/40'"
      />
    </template>
  </div>
</template>
