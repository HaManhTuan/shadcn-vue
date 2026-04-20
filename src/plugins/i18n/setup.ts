import type { App } from 'vue'
import { watch } from 'vue'

import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/vi'
import { createI18n } from 'vue-i18n'

import type { Language } from '.'

import { appLocale, DEFAULT_LOCALE } from '.'
import en from './en.json'
import vi from './vi.json'

function setDayjsLocale(locale: Language) {
  dayjs.locale(locale === 'vi' ? 'vi' : 'en')
}

export function setupI18n(app: App) {
  const i18n = createI18n({
    legacy: false,
    locale: appLocale.value,
    fallbackLocale: DEFAULT_LOCALE,
    messages: <Record<Language, Record<string, any>>>{
      vi,
      en,
    },
  })
  app.use(i18n)

  watch(
    appLocale,
    (newLocale) => {
      if (i18n.global.locale.value !== newLocale)
        i18n.global.locale.value = newLocale
      setDayjsLocale(newLocale)
    },
    { immediate: true },
  )
}
