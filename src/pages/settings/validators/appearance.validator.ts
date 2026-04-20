import type { ComposerTranslation } from 'vue-i18n'
import { z } from 'zod'

export function createAppearanceValidator(t: ComposerTranslation) {
  return z.object({
    theme: z
      .enum(['light', 'dark'], {
        error: t('settings.validation.appearance.theme'),
      }),
    font: z
      .enum(['inter', 'manrope', 'system'], {
        error: t('settings.validation.appearance.font'),
      }),
  })
}

export type AppearanceValidator = z.infer<ReturnType<typeof createAppearanceValidator>>
