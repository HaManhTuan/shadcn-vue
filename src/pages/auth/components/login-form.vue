<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { useAuth } from '@/composables/use-auth'

import GitHubButton from './github-button.vue'
import GoogleButton from './google-button.vue'
import PrivacyPolicyButton from './privacy-policy-button.vue'
import TermsOfServiceButton from './terms-of-service-button.vue'
import ToForgotPasswordLink from './to-forgot-password-link.vue'

const { t } = useI18n()
const { login, loading } = useAuth()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errors = reactive({
  email: '',
  password: '',
})

function validateEmail(value: string) {
  const normalized = value.trim()
  const atIndex = normalized.indexOf('@')
  const dotIndex = normalized.lastIndexOf('.')
  return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < normalized.length - 1
}

function validateForm() {
  errors.email = ''
  errors.password = ''

  if (!email.value.trim()) {
    errors.email = t('loginPage.errors.requiredEmail')
  }
  else if (!validateEmail(email.value)) {
    errors.email = t('loginPage.errors.invalidEmail')
  }

  if (!password.value.trim()) {
    errors.password = t('loginPage.errors.requiredPassword')
  }

  return !errors.email && !errors.password
}

async function onSubmit() {
  if (!validateForm())
    return

  await login()
}
</script>

<template>
  <UiCard class="w-full rounded-2xl border border-slate-200/80 bg-white shadow-[0_24px_60px_-36px_rgba(15,23,42,0.45)] transition-shadow duration-300">
    <UiCardHeader class="space-y-2 px-8 pt-8 pb-2">
      <UiCardTitle class="text-2xl font-semibold tracking-tight text-slate-900">
        {{ $t('loginPage.title') }}
      </UiCardTitle>
      <UiCardDescription class="text-sm leading-relaxed text-slate-600">
        {{ $t('loginPage.description') }}
        {{ $t('loginPage.noAccount') }}
        <UiButton
          variant="link" class="h-auto px-1 text-sm text-slate-700 transition-colors hover:text-slate-900"
          @click="$router.push('/auth/sign-up')"
        >
          {{ $t('loginPage.signUp') }}
        </UiButton>
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
            :placeholder="$t('loginPage.emailPlaceholder')"
            autocomplete="email"
            required
            :aria-invalid="Boolean(errors.email)"
            class="h-12 rounded-xl border-slate-200 bg-white transition-all duration-200 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-100"
          />
          <p v-if="errors.email" class="text-sm text-rose-600">
            {{ errors.email }}
          </p>
        </div>

        <div class="grid gap-2">
          <div class="flex items-center justify-between">
            <UiLabel for="password" class="text-sm font-medium text-slate-700">
              {{ $t('password') }}
            </UiLabel>
            <ToForgotPasswordLink />
          </div>
          <div class="relative">
            <UiInput
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              :placeholder="$t('loginPage.passwordPlaceholder')"
              autocomplete="current-password"
              :aria-invalid="Boolean(errors.password)"
              class="h-12 rounded-xl border-slate-200 bg-white pr-20 transition-all duration-200 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-100"
            />
            <button
              type="button"
              class="absolute top-1/2 right-3 -translate-y-1/2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800"
              :aria-label="showPassword ? $t('loginPage.hidePassword') : $t('loginPage.showPassword')"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? $t('loginPage.hidePassword') : $t('loginPage.showPassword') }}
            </button>
          </div>
          <p v-if="errors.password" class="text-sm text-rose-600">
            {{ errors.password }}
          </p>
        </div>

        <UiButton
          type="submit"
          :disabled="loading"
          class="h-12 w-full rounded-xl bg-slate-900 text-base font-semibold text-white transition-all duration-200 hover:bg-slate-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <UiSpinner v-if="loading" class="mr-2" />
          {{ $t('login') }}
        </UiButton>

        <UiSeparator :label="$t('loginPage.continueWith')" />

        <div class="flex flex-col items-center justify-between gap-3">
          <GitHubButton />
          <GoogleButton />
        </div>

        <UiCardDescription class="text-sm leading-relaxed text-slate-500">
          {{ $t('loginPage.termsPrefix') }}
          <TermsOfServiceButton />
          {{ $t('loginPage.and') }}
          <PrivacyPolicyButton />
        </UiCardDescription>
      </form>
    </UiCardContent>
  </UiCard>
</template>
