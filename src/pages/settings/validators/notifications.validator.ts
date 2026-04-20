import type { ComposerTranslation } from 'vue-i18n'

import { z } from 'zod'

export function createNotificationsValidator(t: ComposerTranslation) {
  return z.object({
    type: z
      .enum(['all', 'mentions', 'none'], {
        error: t('settings.validation.notifications.type'),
      }),
    mobile: z
      .boolean()
      .default(false)
      .optional(),
    communication_emails: z
      .boolean()
      .default(false)
      .optional(),
    social_emails: z
      .boolean()
      .default(false)
      .optional(),
    marketing_emails: z
      .boolean()
      .default(false)
      .optional(),
    security_emails: z
      .boolean(),
  })
}

export type NotificationsValidator = z.infer<ReturnType<typeof createNotificationsValidator>>
