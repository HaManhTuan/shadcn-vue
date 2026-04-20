import type { ComposerTranslation } from 'vue-i18n'
import { z } from 'zod'

export function createProfileValidator(t: ComposerTranslation) {
  return z.object({
    username: z
      .string()
      .min(2, {
        error: t('settings.validation.profile.usernameMin'),
      })
      .max(30, {
        error: t('settings.validation.profile.usernameMax'),
      }),
    email: z
      .email({
        error: t('settings.validation.profile.emailInvalid'),
      }),
    bio: z
      .string()
      .max(160, { error: t('settings.validation.profile.bioMax') })
      .min(4, { error: t('settings.validation.profile.bioMin') }),
    urls: z
      .array(
        z.object({
          value: z.url({ error: t('settings.validation.profile.urlInvalid') }),
        }),
      )
      .optional(),
  })
}

export type ProfileValidator = z.infer<ReturnType<typeof createProfileValidator>>
