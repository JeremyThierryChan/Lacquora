<script setup lang="ts">
const { t } = useI18n()
const year = new Date().getFullYear()

const footerLinks = {
  collections: [
    { label: 'Lacquer Series', path: '/collections/lacquer-series' },
    { label: 'Future Series', path: '/collections/future-series' },
    { label: 'Master Build', path: '/collections/master-build' },
    { label: 'Custom Shop', path: '/custom-shop' },
  ],
  company: [
    { label: 'About', path: '/about' },
    { label: 'Craftsmanship', path: '/craftsmanship' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Journal', path: '/journal' },
    { label: 'Contact', path: '/contact' },
  ],
}
</script>

<template>
  <footer class="bg-graphite border-t border-slate/30 pt-20 pb-10">
    <div class="container-site">

      <!-- Top Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

        <!-- Brand -->
        <div class="lg:col-span-2">
          <RouterLink to="/" class="inline-block mb-6 group">
            <div class="font-display text-2xl tracking-[0.3em] text-ivory group-hover:text-gold transition-colors duration-300">
              LACQUORA
            </div>
            <div class="type-label-zh text-silver/40 tracking-[0.4em] text-[10px] mt-1">漆 境</div>
          </RouterLink>

          <p class="text-silver/50 text-sm leading-relaxed max-w-xs font-light">
            {{ t('footer.tagline') }}
          </p>

          <div class="mt-8 flex gap-5">
            <a
              v-for="social in [
                { icon: 'IG', href: '#', label: 'Instagram' },
                { icon: 'YT', href: '#', label: 'YouTube' },
                { icon: 'WB', href: '#', label: 'Weibo' },
              ]"
              :key="social.label"
              :href="social.href"
              :aria-label="social.label"
              class="type-label text-silver/30 hover:text-gold transition-colors duration-300"
            >
              {{ social.icon }}
            </a>
          </div>
        </div>

        <!-- Collections -->
        <div>
          <div class="type-label tracking-widest text-silver/30 mb-6">
            {{ t('footer.collections') }}
          </div>
          <ul class="flex flex-col gap-3">
            <li v-for="link in footerLinks.collections" :key="link.path">
              <RouterLink
                :to="link.path"
                class="text-sm text-silver/50 hover:text-ivory transition-colors duration-300 font-light"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <div class="type-label tracking-widest text-silver/30 mb-6">
            {{ t('footer.company') }}
          </div>
          <ul class="flex flex-col gap-3">
            <li v-for="link in footerLinks.company" :key="link.path">
              <RouterLink
                :to="link.path"
                class="text-sm text-silver/50 hover:text-ivory transition-colors duration-300 font-light"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-slate/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="type-label text-silver/25">
          {{ t('footer.copyright', { year }) }}
        </p>
        <div class="flex gap-6">
          <RouterLink to="/privacy" class="type-label text-silver/25 hover:text-silver/50 transition-colors duration-300">
            {{ t('footer.privacy') }}
          </RouterLink>
          <RouterLink to="/terms" class="type-label text-silver/25 hover:text-silver/50 transition-colors duration-300">
            {{ t('footer.terms') }}
          </RouterLink>
        </div>
      </div>

    </div>
  </footer>
</template>
