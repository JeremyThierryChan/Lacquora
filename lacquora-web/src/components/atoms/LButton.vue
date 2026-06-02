<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'ghost' | 'text'
  size?: 'sm' | 'md' | 'lg'
  as?: 'button' | 'a' | 'RouterLink'
  loading?: boolean
  disabled?: boolean
  href?: string
  to?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  as: 'button',
  loading: false,
  disabled: false,
})

const sizeMap = {
  sm: 'px-5 py-2.5 text-[10px]',
  md: 'px-8 py-4 text-[11px]',
  lg: 'px-10 py-5 text-[12px]',
}

const variantMap = {
  primary: 'btn-primary',
  ghost: 'btn-ghost',
  text: 'btn-text',
}
</script>

<template>
  <component
    :is="as === 'RouterLink' ? 'RouterLink' : as"
    :to="to"
    :href="href"
    :disabled="disabled || loading"
    class="font-mono tracking-widest uppercase transition-all duration-400 inline-flex items-center justify-center gap-2"
    :class="[variantMap[variant], sizeMap[size], { 'opacity-50 cursor-not-allowed': disabled }]"
    v-bind="$attrs"
  >
    <span v-if="loading" class="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin" />
    <slot />
    <slot name="icon" />
  </component>
</template>
