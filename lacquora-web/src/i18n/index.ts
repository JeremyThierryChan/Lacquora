import { createI18n } from 'vue-i18n'
import type { Locale } from '@/types'
import en from './locales/en.json'
import zh from './locales/zh.json'

export const SUPPORTED_LOCALES: Locale[] = ['en', 'zh', 'fr', 'de', 'ja']
export const DEFAULT_LOCALE: Locale = 'en'

function detectLocale(): Locale {
  const saved = localStorage.getItem('lacquora_locale') as Locale | null
  if (saved && SUPPORTED_LOCALES.includes(saved)) return saved

  const browser = navigator.language.split('-')[0] as Locale
  if (SUPPORTED_LOCALES.includes(browser)) return browser

  return DEFAULT_LOCALE
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages: { en, zh },
  missingWarn: false,
  fallbackWarn: false,
})

export function setLocale(locale: Locale) {
  ;(i18n.global.locale as { value: string }).value = locale
  localStorage.setItem('lacquora_locale', locale)
  document.documentElement.lang = locale
}
