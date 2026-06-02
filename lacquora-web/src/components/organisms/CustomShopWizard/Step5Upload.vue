<script setup lang="ts">
import { useCustomOrderStore } from '@/stores/useCustomOrderStore'

const store = useCustomOrderStore()
const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const notes = ref(store.order.notes ?? '')

watch(notes, (val) => store.setCustomerInfo({
  notes: val,
  customerName: store.order.customerName ?? '',
  customerEmail: store.order.customerEmail ?? '',
  customerPhone: store.order.customerPhone ?? '',
  customerCountry: store.order.customerCountry ?? '',
}))

function triggerFileInput() {
  fileInput.value?.click()
}

function handleFiles(files: FileList | null) {
  if (!files) return
  for (const file of Array.from(files)) {
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) continue
    if ((store.order.referenceImages?.length ?? 0) >= 8) break
    const url = URL.createObjectURL(file)
    store.addReferenceImage(url)
  }
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  handleFiles(e.dataTransfer?.files ?? null)
}

function onFileChange(e: Event) {
  handleFiles((e.target as HTMLInputElement).files)
}
</script>

<template>
  <div>
    <h2 class="font-display text-3xl text-ivory mb-2">Share your references.</h2>
    <p class="text-silver/40 font-light text-sm mb-10">
      Upload inspiration images — other guitars, patterns, artworks, colour swatches. Any format helps.
    </p>

    <!-- Drop zone -->
    <div
      class="relative border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center py-16 px-8 text-center cursor-pointer mb-8"
      :class="isDragging ? 'border-gold bg-gold/5' : 'border-slate/40 hover:border-gold/40'"
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop.prevent="onDrop"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        class="hidden"
        @change="onFileChange"
      />

      <div class="text-3xl text-silver/20 mb-4">↑</div>
      <div class="font-display text-xl text-silver/50 mb-2">
        Drop images here, or click to browse
      </div>
      <div class="type-label text-[10px] tracking-widest text-silver/25">
        PNG · JPG · WEBP · Max 8 files
      </div>
    </div>

    <!-- Uploaded previews -->
    <div v-if="store.order.referenceImages?.length" class="mb-10">
      <div class="type-label text-[10px] tracking-widest text-silver/30 mb-4">
        Uploaded ({{ store.order.referenceImages.length }} / 8)
      </div>
      <div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
        <div
          v-for="(img, i) in store.order.referenceImages"
          :key="i"
          class="relative group aspect-square bg-carbon border border-slate/20 overflow-hidden"
        >
          <img :src="img" :alt="`Reference ${i + 1}`" class="w-full h-full object-cover" />
          <button
            class="absolute inset-0 bg-obsidian/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-silver/60 hover:text-lacquer-light"
            @click.stop="store.removeReferenceImage(i)"
          >
            <span class="text-lg">×</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Notes -->
    <div>
      <label class="field-label">Additional notes</label>
      <textarea
        v-model="notes"
        rows="5"
        class="field-base resize-none"
        placeholder="Describe your concept, inspiration, specific requests, or anything else we should know before we get in touch…"
      />
      <p class="type-label text-[10px] text-silver/25 mt-2 tracking-wider">
        The more context you share, the more accurately we can scope your build.
      </p>
    </div>
  </div>
</template>
