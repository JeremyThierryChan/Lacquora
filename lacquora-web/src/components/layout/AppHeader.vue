<script setup lang="ts">
import { useUIStore } from '@/stores/useUIStore'
import { setLocale, SUPPORTED_LOCALES } from '@/i18n'
import type { Locale } from '@/types'

const { t, locale } = useI18n()
const router = useRouter()
const uiStore = useUIStore()

const localeLabels: Record<Locale, string> = {
  en: 'EN', zh: '中文', fr: 'FR', de: 'DE', ja: '日本語',
}

const collectionsMenu = computed(() => [
  { labelKey: 'collections.lacquerSeries.title', labelZh: '漆艺系列', path: '/collections/lacquer-series', tag: '大漆 · 戗金 · 螺钿 · 莳绘' },
  { labelKey: 'collections.futureSeries.title', labelZh: '未来系列', path: '/collections/future-series', tag: '3D Printed · Parametric' },
  { labelKey: 'collections.masterBuild.title', labelZh: '大师定制', path: '/collections/master-build', tag: 'One-Off · Commission' },
])

function navigateTo(path: string) {
  router.push(path)
  uiStore.closeMobileMenu()
  uiStore.setActiveMegaMenu(null)
}

function switchLocale(loc: Locale) {
  setLocale(loc)
  uiStore.setActiveMegaMenu(null)
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-80 transition-all duration-600"
    :class="uiStore.isNavScrolled
      ? 'bg-obsidian/95 backdrop-blur-md border-b border-slate/30'
      : 'bg-transparent'"
  >
    <div class="container-site">
      <nav class="flex items-center justify-between h-[72px]">

        <!-- Logo -->
        <RouterLink
          to="/"
          class="flex flex-col leading-none group"
          @click="uiStore.closeMobileMenu()"
        >
          <span class="font-display text-xl tracking-[0.25em] text-ivory group-hover:text-gold transition-colors duration-300">
            LACQUORA
          </span>
          <span class="type-label-zh text-silver/50 tracking-[0.3em] text-[10px] mt-0.5">
            漆 境
          </span>
        </RouterLink>

        <!-- Desktop Nav -->
        <div class="hidden lg:flex items-center gap-8">

          <!-- Collections w/ Mega Menu -->
          <div
            class="relative"
            @mouseenter="uiStore.setActiveMegaMenu('collections')"
            @mouseleave="uiStore.setActiveMegaMenu(null)"
          >
            <button class="nav-link py-2">
              {{ t('nav.collections') }}
            </button>

            <!-- Mega Menu -->
            <Transition name="fade-up-sm">
              <div
                v-if="uiStore.activeMegaMenu === 'collections'"
                class="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[520px] bg-graphite border border-slate/40 p-8"
                style="box-shadow: 0 24px 60px rgba(0,0,0,0.6)"
              >
                <div class="grid grid-cols-3 gap-6">
                  <button
                    v-for="item in collectionsMenu"
                    :key="item.path"
                    class="text-left group"
                    @click="navigateTo(item.path)"
                  >
                    <div class="font-display text-base text-ivory group-hover:text-gold transition-colors duration-300 leading-tight">
                      {{ t(item.labelKey) }}
                    </div>
                    <div class="type-label-zh text-silver/50 mt-1 text-[10px]">
                      {{ item.labelZh }}
                    </div>
                    <div class="type-label text-silver/30 mt-2 text-[10px] leading-relaxed">
                      {{ item.tag }}
                    </div>
                    <span class="gold-line mt-3 transition-all duration-300 group-hover:w-16" style="width: 24px" />
                  </button>
                </div>
              </div>
            </Transition>
          </div>

          <RouterLink to="/custom-shop" class="nav-link">{{ t('nav.customShop') }}</RouterLink>
          <RouterLink to="/gallery" class="nav-link">{{ t('nav.gallery') }}</RouterLink>
          <RouterLink to="/craftsmanship" class="nav-link">{{ t('nav.craftsmanship') }}</RouterLink>
          <RouterLink to="/journal" class="nav-link">{{ t('nav.journal') }}</RouterLink>
          <RouterLink to="/about" class="nav-link">{{ t('nav.about') }}</RouterLink>
        </div>

        <!-- Right Actions -->
        <div class="hidden lg:flex items-center gap-5">
          <!-- Language Switcher -->
          <div
            class="relative"
            @mouseenter="uiStore.setActiveMegaMenu('lang')"
            @mouseleave="uiStore.setActiveMegaMenu(null)"
          >
            <button class="type-label text-silver/50 hover:text-ivory transition-colors duration-300 tracking-widest">
              {{ localeLabels[locale as Locale] }}
            </button>
            <Transition name="fade-up-sm">
              <div
                v-if="uiStore.activeMegaMenu === 'lang'"
                class="absolute top-full right-0 mt-4 bg-graphite border border-slate/40 py-2 min-w-[100px]"
                style="box-shadow: 0 16px 40px rgba(0,0,0,0.5)"
              >
                <button
                  v-for="loc in SUPPORTED_LOCALES"
                  :key="loc"
                  class="w-full text-left px-4 py-2.5 type-label tracking-widest text-silver/60 hover:text-ivory hover:bg-slate/30 transition-all duration-200"
                  :class="{ 'text-gold': locale === loc }"
                  @click="switchLocale(loc as Locale)"
                >
                  {{ localeLabels[loc] }}
                </button>
              </div>
            </Transition>
          </div>

          <!-- CTA Button -->
          <RouterLink to="/contact" class="btn-primary text-xs px-6 py-3">
            {{ t('nav.bookConsultation') }}
          </RouterLink>
        </div>

        <!-- Mobile Hamburger -->
        <button
          class="lg:hidden flex flex-col justify-center gap-[5px] w-8 h-8 p-1"
          :aria-label="uiStore.isMobileMenuOpen ? 'Close menu' : 'Open menu'"
          @click="uiStore.toggleMobileMenu()"
        >
          <span
            class="block h-px bg-ivory transition-all duration-300 origin-center"
            :class="uiStore.isMobileMenuOpen ? 'rotate-45 translate-y-[6px] w-full' : 'w-full'"
          />
          <span
            class="block h-px bg-ivory transition-all duration-300"
            :class="uiStore.isMobileMenuOpen ? 'opacity-0 w-full' : 'w-3/4'"
          />
          <span
            class="block h-px bg-ivory transition-all duration-300 origin-center"
            :class="uiStore.isMobileMenuOpen ? '-rotate-45 -translate-y-[6px] w-full' : 'w-1/2'"
          />
        </button>
      </nav>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div
        v-if="uiStore.isMobileMenuOpen"
        class="lg:hidden fixed inset-0 top-[72px] bg-obsidian/98 backdrop-blur-xl z-70 overflow-y-auto"
      >
        <div class="container-site py-12 flex flex-col gap-2">
          <div class="mb-8">
            <div class="type-label text-silver/30 tracking-widest mb-6">Navigation</div>
            <div class="flex flex-col gap-1">
              <button
                v-for="item in collectionsMenu"
                :key="item.path"
                class="text-left py-3 border-b border-slate/20 group"
                @click="navigateTo(item.path)"
              >
                <div class="font-display text-xl text-ivory group-hover:text-gold transition-colors duration-300">
                  {{ t(item.labelKey) }}
                </div>
                <div class="type-label text-silver/30 mt-1">{{ item.tag }}</div>
              </button>
            </div>
          </div>

          <RouterLink
            v-for="link in [
              { to: '/custom-shop', label: t('nav.customShop') },
              { to: '/gallery', label: t('nav.gallery') },
              { to: '/craftsmanship', label: t('nav.craftsmanship') },
              { to: '/journal', label: t('nav.journal') },
              { to: '/about', label: t('nav.about') },
              { to: '/contact', label: t('nav.contact') },
            ]"
            :key="link.to"
            :to="link.to"
            class="py-4 border-b border-slate/20 font-display text-xl text-silver/70 hover:text-ivory transition-colors duration-300"
            @click="uiStore.closeMobileMenu()"
          >
            {{ link.label }}
          </RouterLink>

          <!-- Mobile Lang -->
          <div class="mt-10 flex gap-4 flex-wrap">
            <button
              v-for="loc in SUPPORTED_LOCALES"
              :key="loc"
              class="type-label tracking-widest text-silver/40 hover:text-gold transition-colors duration-300"
              :class="{ 'text-gold': locale === loc }"
              @click="switchLocale(loc as Locale)"
            >
              {{ localeLabels[loc] }}
            </button>
          </div>

          <RouterLink
            to="/contact"
            class="btn-primary mt-8 w-full justify-center"
            @click="uiStore.closeMobileMenu()"
          >
            {{ t('nav.bookConsultation') }}
          </RouterLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.fade-up-sm-enter-active,
.fade-up-sm-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-up-sm-enter-from,
.fade-up-sm-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
