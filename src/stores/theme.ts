import type { Pinia } from 'pinia'
import { defineStore } from 'pinia'

import type { ContentLayout, Radius, Theme } from '@/constants/themes'

/** Demo admin: ép theme green sau persist, trừ khi `VITE_FORCE_THEME_GREEN=false`. */
export function shouldForceThemeGreenForDemo() {
  return import.meta.env.VITE_FORCE_THEME_GREEN !== 'false'
}

/** Gọi sau `setupPinia` để ghi đè theme đã restore từ sessionStorage. */
export function applyDemoForcedTheme(pinia: Pinia) {
  if (!shouldForceThemeGreenForDemo())
    return
  useThemeStore(pinia).setTheme('green')
}

export const useThemeStore = defineStore('system-config', () => {
  const radius = ref(0.5)
  function setRadius(newRadius: Radius) {
    radius.value = newRadius
  }
  const theme = ref<Theme>('green')
  function setTheme(newTheme: Theme) {
    theme.value = newTheme
  }

  const contentLayout = ref<ContentLayout>('centered')
  function setContentLayout(newContentLayout: ContentLayout) {
    contentLayout.value = newContentLayout
  }
  return {
    radius,
    setRadius,

    theme,
    setTheme,

    contentLayout,
    setContentLayout,
  }
}, {
  persist: true,
})
