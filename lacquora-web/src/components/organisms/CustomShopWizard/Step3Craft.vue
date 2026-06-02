<script setup lang="ts">
import { useCustomOrderStore } from '@/stores/useCustomOrderStore'
import type { CraftOption } from '@/types'

const store = useCustomOrderStore()
const activeDetail = ref<CraftOption | null>(null)

const crafts: {
  key: CraftOption
  label: string
  zh: string
  tag: string
  price: string
  leadExtra: string
  desc: string
  detail: string
  accent: string
  accentBorder: string
}[] = [
  {
    key: 'standard',
    label: 'Standard',       zh: '标准涂装',
    tag: 'Nitro / Poly',
    price: 'Included',
    leadExtra: '+0 days',
    desc: 'High-quality nitrocellulose or polyester finish. Clean, durable, professional.',
    detail: 'Nitrocellulose lacquer applied in 8–12 coats, lightly burnished. Breathable finish that ages naturally.',
    accent: 'text-silver/60',
    accentBorder: 'border-silver/20 hover:border-silver/50',
  },
  {
    key: 'lacquer',
    label: 'Urushi',          zh: '大漆',
    tag: '50–100 Layers',
    price: '+¥18,000 – 35,000',
    leadExtra: '+60–90 days',
    desc: 'Pure urushi (Japanese / Chinese tree lacquer). Applied in 50–100 hand-rubbed coats, cured in humidity chambers.',
    detail: 'Raw urushi applied and cured in a 75–85% humidity room. Each coat is dried 24h before the next. Final polish brings the surface to optical clarity.',
    accent: 'text-lacquer-light',
    accentBorder: 'border-lacquer/30 hover:border-lacquer',
  },
  {
    key: 'gold_carving',
    label: 'Qian Jin',        zh: '戗金',
    tag: 'Gold Thread Inlay',
    price: '+¥28,000 – 58,000',
    leadExtra: '+60–120 days',
    desc: 'Gold powder or foil pressed into carved grooves in a lacquer ground. A Tang-dynasty technique, each line traced by a blade narrower than a hair.',
    detail: 'Design is drawn, then carved with a 0.3mm blade. Gold powder is pressed into grooves using a soft tool. Sealed with urushi, then polished level.',
    accent: 'text-gold',
    accentBorder: 'border-gold/30 hover:border-gold',
  },
  {
    key: 'mother_of_pearl',
    label: '螺钿',            zh: '螺钿嵌入',
    tag: 'Shell Inlay',
    price: '+¥35,000 – 70,000',
    leadExtra: '+60–120 days',
    desc: 'Iridescent abalone or freshwater shell fragments cut and set flush into the lacquer surface. Color shifts from aqua to violet at different viewing angles.',
    detail: 'Shell is cut with a precision scribe and hammer, then embedded into wet urushi. Levelled, sanded, and polished over 4–6 weeks.',
    accent: 'text-blue-300/60',
    accentBorder: 'border-blue-400/20 hover:border-blue-300/40',
  },
  {
    key: 'urushi',
    label: 'Maki-e',          zh: '莳绘',
    tag: 'Gold & Silver Powder',
    price: '+¥45,000 – 120,000',
    leadExtra: '+90–180 days',
    desc: 'Gold and silver powder scattered over wet lacquer to form pictorial compositions. A Heian-period art form applied to the guitar body as canvas.',
    detail: 'Design is painted in wet urushi. Metallic powder is immediately scattered and allowed to settle. Fixed with thin urushi, dried, then built up with protective layers.',
    accent: 'text-gold-light',
    accentBorder: 'border-gold-light/20 hover:border-gold-light/50',
  },
  {
    key: 'custom_artwork',
    label: 'Custom Artwork',  zh: '定制图案',
    tag: 'Bespoke Design',
    price: 'POA',
    leadExtra: 'POA',
    desc: 'Bring your own composition, motif, or concept. Our team will advise on which technique best serves the design.',
    detail: 'Schedule a consultation and share references. We will propose the appropriate technique and provide a detailed cost estimate.',
    accent: 'text-ivory/60',
    accentBorder: 'border-slate/40 hover:border-ivory/30',
  },
]
</script>

<template>
  <div>
    <h2 class="font-display text-3xl text-ivory mb-2">Choose your craft & finish.</h2>
    <p class="text-silver/40 font-light text-sm mb-10">The finish is the soul of a LACQUORA instrument. Take your time here.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
      <div
        v-for="craft in crafts"
        :key="craft.key"
        class="group relative border transition-all duration-300 bg-carbon cursor-pointer"
        :class="[
          craft.accentBorder,
          store.order.craftType === craft.key ? 'ring-1 ring-inset ring-gold/30' : '',
        ]"
        @click="store.setCraftType(craft.key)"
      >
        <div class="p-7">
          <!-- Selected dot -->
          <div v-if="store.order.craftType === craft.key"
            class="absolute top-4 right-4 w-2 h-2 bg-gold rounded-full" />

          <!-- Tag -->
          <div class="type-label text-[9px] tracking-widest mb-4" :class="craft.accent">
            {{ craft.tag }}
          </div>

          <div
            class="font-display text-xl mb-1 transition-colors duration-300"
            :class="store.order.craftType === craft.key ? 'text-gold' : 'text-ivory group-hover:text-gold'"
          >
            {{ craft.label }}
          </div>
          <div class="type-label-zh text-silver/30 text-[10px] mb-4">{{ craft.zh }}</div>

          <p class="text-silver/40 text-xs font-light leading-relaxed mb-6">{{ craft.desc }}</p>

          <div class="border-t border-slate/20 pt-5 grid grid-cols-2 gap-3">
            <div>
              <div class="type-label text-[9px] text-silver/20 tracking-widest mb-1">Add-on Cost</div>
              <div class="font-mono text-xs" :class="craft.accent">{{ craft.price }}</div>
            </div>
            <div>
              <div class="type-label text-[9px] text-silver/20 tracking-widest mb-1">Lead Time</div>
              <div class="font-mono text-xs text-silver/40">{{ craft.leadExtra }}</div>
            </div>
          </div>

          <!-- Expand detail button -->
          <button
            class="mt-4 type-label text-[9px] tracking-widest text-silver/25 hover:text-silver/50 transition-colors duration-200"
            @click.stop="activeDetail = activeDetail === craft.key ? null : craft.key"
          >
            {{ activeDetail === craft.key ? '− Hide detail' : '+ Technique detail' }}
          </button>

          <!-- Detail expansion -->
          <Transition name="expand">
            <div v-if="activeDetail === craft.key" class="mt-4 pt-4 border-t border-slate/20">
              <p class="text-silver/50 text-xs font-light leading-relaxed italic">{{ craft.detail }}</p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.expand-enter-active, .expand-leave-active {
  transition: opacity 0.25s ease, max-height 0.3s ease;
  max-height: 200px;
  overflow: hidden;
}
.expand-enter-from, .expand-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
