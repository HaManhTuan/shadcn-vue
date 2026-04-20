import type { ComposerTranslation } from 'vue-i18n'
import { z } from 'zod'

export function createDisplayValidator(t: ComposerTranslation) {
  return z.object({
    items: z
      .array(z.string())
      .refine(value => value.some(item => item), {
        error: t('settings.validation.display.minOne'),
      }),
  })
}

export type DisplayValidator = z.infer<ReturnType<typeof createDisplayValidator>>
