import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, setLocale } from '@/i18n'
import type { Locale } from '@/types'

const routes: RouteRecordRaw[] = [
  {
    path: '/:locale(' + SUPPORTED_LOCALES.join('|') + ')?',
    component: () => import('@/components/layout/PageWrapper.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { title: 'LACQUORA — Where Traditional Lacquer Meets Future Guitar Design' },
      },
      {
        path: 'collections',
        name: 'collections',
        component: () => import('@/views/collections/CollectionsView.vue'),
        meta: { title: 'Collections — LACQUORA' },
      },
      {
        path: 'collections/lacquer-series',
        name: 'lacquer-series',
        component: () => import('@/views/collections/LacquerSeriesView.vue'),
        meta: { title: 'Lacquer Series — LACQUORA' },
      },
      {
        path: 'collections/future-series',
        name: 'future-series',
        component: () => import('@/views/collections/FutureSeriesView.vue'),
        meta: { title: 'Future Series — LACQUORA' },
      },
      {
        path: 'collections/master-build',
        name: 'master-build',
        component: () => import('@/views/collections/MasterBuildView.vue'),
        meta: { title: 'Master Build — LACQUORA' },
      },
      {
        path: 'custom-shop',
        name: 'custom-shop',
        component: () => import('@/views/CustomShopView.vue'),
        meta: { title: 'Custom Shop — LACQUORA' },
      },
      {
        path: 'gallery',
        name: 'gallery',
        component: () => import('@/views/GalleryView.vue'),
        meta: { title: 'Gallery — LACQUORA' },
      },
      {
        path: 'gallery/:slug',
        name: 'gallery-detail',
        component: () => import('@/views/GalleryDetailView.vue'),
      },
      {
        path: 'craftsmanship',
        name: 'craftsmanship',
        component: () => import('@/views/CraftsmanshipView.vue'),
        meta: { title: 'Craftsmanship — LACQUORA' },
      },
      {
        path: 'journal',
        name: 'journal',
        component: () => import('@/views/journal/JournalView.vue'),
        meta: { title: 'Journal — LACQUORA' },
      },
      {
        path: 'journal/:slug',
        name: 'journal-post',
        component: () => import('@/views/journal/JournalPostView.vue'),
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/AboutView.vue'),
        meta: { title: 'About — LACQUORA' },
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import('@/views/ContactView.vue'),
        meta: { title: 'Contact — LACQUORA' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to, _from, next) => {
  const localeParam = to.params.locale as Locale | undefined
  const locale = localeParam && SUPPORTED_LOCALES.includes(localeParam)
    ? localeParam
    : DEFAULT_LOCALE

  setLocale(locale)

  if (to.meta.title) {
    document.title = to.meta.title as string
  }

  next()
})
