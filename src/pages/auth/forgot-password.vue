<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AuthTitle from './components/auth-title.vue'

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
  <div class="min-h-screen bg-slate-50">
    <main class="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 px-4 py-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-8">
      <section class="relative hidden overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-12 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.45)] lg:flex lg:flex-col lg:justify-between">
        <div class="pointer-events-none absolute inset-0 bg-linear-to-br from-cyan-50/90 via-white to-slate-100/80" />
        <div class="relative space-y-6">
          <AuthTitle />
          <div class="space-y-3">
            <p class="max-w-md text-4xl font-semibold leading-tight tracking-tight text-slate-900">
              {{ $t('authLayout.headline') }}
            </p>
            <p class="max-w-md text-base leading-relaxed text-slate-600">
              {{ $t('authLayout.subheadline') }}
            </p>
          </div>
        </div>
        <p class="relative text-sm text-slate-500">
          {{ $t('authLayout.footer') }}
        </p>
      </section>

      <section class="flex items-center justify-center px-2 py-6 sm:px-4 lg:px-10">
        <div class="w-full max-w-md space-y-6">
          <div class="lg:hidden">
            <AuthTitle />
          </div>
          <UiCard class="w-full rounded-2xl border border-slate-200/80 bg-white shadow-[0_24px_60px_-36px_rgba(15,23,42,0.45)] transition-shadow duration-300">
            <UiCardHeader class="space-y-2 px-8 pt-8 pb-2">
              <UiCardTitle class="text-2xl font-semibold tracking-tight text-slate-900">
                {{ $t('forgotPasswordPage.title') }}
              </UiCardTitle>
              <UiCardDescription class="text-sm leading-relaxed text-slate-600">
                {{ $t('forgotPasswordPage.description') }}
              </UiCardDescription>
            </UiCardHeader>
            <UiCardContent class="px-8 pb-8">
              <form class="grid gap-6" @submit.prevent="onSubmit">
                <div class="grid gap-2">
                  <UiLabel for="email" class="text-sm font-medium text-slate-700">
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
                    class="h-12 rounded-xl border-slate-200 bg-white transition-all duration-200 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-100"
                  />
                  <p v-if="error" class="text-sm text-rose-600">
                    {{ error }}
                  </p>
                </div>
                <UiButton type="submit" class="h-12 w-full rounded-xl bg-slate-900 text-base font-semibold text-white transition-all duration-200 hover:bg-slate-800 active:scale-[0.99]">
                  {{ $t('forgotPasswordPage.continue') }}
                </UiButton>

                <div class="text-sm text-slate-600">
                  {{ $t('forgotPasswordPage.noAccount') }}
                  <UiButton
                    variant="link" class="h-auto px-1 text-sm text-slate-700 transition-colors hover:text-slate-900"
                    @click="$router.push('/auth/sign-up')"
                  >
                    {{ $t('forgotPasswordPage.signUp') }}
                  </UiButton>
                </div>
              </form>
            </UiCardContent>
          </UiCard>
        </div>
      </section>
    </main>
  </div>
</template>
