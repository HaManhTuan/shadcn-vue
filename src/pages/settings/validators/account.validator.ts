import type { ComposerTranslation } from 'vue-i18n'

import { z } from 'zod'

export function createAccountValidator(t: ComposerTranslation) {
  return z.object({
    name: z
      .string({
        error: t('settings.validation.account.nameRequired'),
      })
      .min(2, {
        error: t('settings.validation.account.nameMin'),
      })
      .max(30, {
        error: t('settings.validation.account.nameMax'),
      }),
    dob: z
      .iso
      .datetime()
      .optional()
      .refine(date => date !== undefined, t('settings.validation.account.dobInvalid')),
    language: z
      .string()
      .min(1, t('settings.validation.account.languageRequired')),
  })
}

export type AccountValidator = z.infer<ReturnType<typeof createAccountValidator>>
