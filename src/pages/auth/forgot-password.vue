<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AuthSplitLayout from './components/auth-split-layout.vue'

const { t } = useI18n()
const email = ref('')
const error = ref('')

function validateEmail(value: string) {
  const normalized = value.trim()
  const atIndex = normalized.indexOf('@')
  const dotIndex = normalized.lastIndexOf('.')
  return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < normalized.length - 1
}

function onSubmit() {
  error.value = ''

  if (!email.value.trim()) {
    error.value = t('forgotPasswordPage.errors.requiredEmail')
    return
  }

  if (!validateEmail(email.value)) {
    error.value = t('forgotPasswordPage.errors.invalidEmail')
  }
}
</script>

<template>
  <AuthSplitLayout>
    <UiCard
      class="w-full rounded-2xl border border-border/60 bg-card text-card-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_48px_-28px_rgba(0,0,0,0.1)] ring-1 ring-foreground/[0.03] transition-shadow duration-300 dark:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_20px_56px_-32px_rgba(0,0,0,0.55)] dark:ring-foreground/[0.06]"
    >
      <UiCardHeader class="space-y-1.5 px-6 pt-7 pb-2">
        <UiCardTitle class="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {{ $t('forgotPasswordPage.title') }}
        </UiCardTitle>
        <UiCardDescription class="text-sm leading-relaxed text-muted-foreground">
          {{ $t('forgotPasswordPage.description') }}
        </UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="px-6 pb-7">
        <form class="grid gap-5" @submit.prevent="onSubmit">
          <div class="grid gap-2">
            <UiLabel for="email" class="text-sm font-medium text-foreground">
              {{ $t('email') }}
            </UiLabel>
            <UiInput
              id="email"
              v-model="email"
              type="email"
              :placeholder="$t('forgotPasswordPage.emailPlaceholder')"
              autocomplete="email"
              required
              :aria-invalid="Boolean(error)"
              class="h-11 rounded-lg border-input bg-background transition-colors duration-200 placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring/35"
            />
            <p v-if="error" class="text-sm text-destructive" role="alert">
              {{ error }}
            </p>
          </div>
          <UiButton type="submit" class="h-11 w-full rounded-lg text-sm font-semibold shadow-sm">
            {{ $t('forgotPasswordPage.continue') }}
          </UiButton>

          <p class="text-center text-sm text-muted-foreground">
            {{ $t('forgotPasswordPage.noAccount') }}
            <UiButton
              variant="link"
              class="h-auto px-0.5 font-medium text-muted-foreground underline-offset-4 hover:text-primary"
              @click="$router.push('/auth/sign-up')"
            >
              {{ $t('forgotPasswordPage.signUp') }}
            </UiButton>
          </p>
        </form>
      </UiCardContent>
    </UiCard>
  </AuthSplitLayout>
</template>
