import { useStorage } from '@vueuse/core'

export type Language = 'en' | 'vi'

export const SUPPORTED_LOCALES = new Set<Language>([
  'en',
  'vi',
])

export const DEFAULT_LOCALE: Language = 'vi'

export const appLocale = useStorage<Language>('app-locale', DEFAULT_LOCALE)

watch(appLocale, (newLocale) => {
  if (!SUPPORTED_LOCALES.has(newLocale)) {
    appLocale.value = DEFAULT_LOCALE
  }
}, { immediate: true })
