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
  <UiCard
    class="w-full rounded-2xl border border-border/60 bg-card text-card-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_48px_-28px_rgba(0,0,0,0.1)] ring-1 ring-foreground/[0.03] transition-shadow duration-300 dark:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_20px_56px_-32px_rgba(0,0,0,0.55)] dark:ring-foreground/[0.06]"
  >
    <UiCardHeader class="space-y-1.5 px-6 pt-7 pb-2">
      <UiCardTitle class="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {{ $t('loginPage.title') }}
      </UiCardTitle>
      <UiCardDescription class="text-sm leading-relaxed text-muted-foreground">
        {{ $t('loginPage.description') }}
        {{ $t('loginPage.noAccount') }}
        <UiButton
          variant="link"
          class="h-auto px-0.5 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-primary"
          @click="$router.push('/auth/sign-up')"
        >
          {{ $t('loginPage.signUp') }}
        </UiButton>
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
            :placeholder="$t('loginPage.emailPlaceholder')"
            autocomplete="email"
            required
            :aria-invalid="Boolean(errors.email)"
            class="h-11 rounded-lg border-input bg-background transition-colors duration-200 placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring/35"
          />
          <p v-if="errors.email" class="text-sm text-destructive" role="alert">
            {{ errors.email }}
          </p>
        </div>

        <div class="grid gap-2">
          <div class="flex items-center justify-between gap-2">
            <UiLabel for="password" class="text-sm font-medium text-foreground">
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
              class="h-11 rounded-lg border-input bg-background pr-18 transition-colors duration-200 placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring/35"
            />
            <button
              type="button"
              class="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md px-1.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              :aria-label="showPassword ? $t('loginPage.hidePassword') : $t('loginPage.showPassword')"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? $t('loginPage.hidePassword') : $t('loginPage.showPassword') }}
            </button>
          </div>
          <p v-if="errors.password" class="text-sm text-destructive" role="alert">
            {{ errors.password }}
          </p>
        </div>

        <UiButton
          type="submit"
          :disabled="loading"
          class="h-11 w-full rounded-lg text-sm font-semibold shadow-sm transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <UiSpinner v-if="loading" class="mr-2" />
          {{ $t('login') }}
        </UiButton>

        <div class="relative py-1">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <span class="h-px w-full bg-border/70" />
          </div>
          <div class="relative flex justify-center text-[0.6875rem] font-medium tracking-wider text-muted-foreground uppercase">
            <span class="bg-card px-3">{{ $t('loginPage.continueWith') }}</span>
          </div>
        </div>

        <div class="flex flex-col gap-2.5">
          <GitHubButton />
          <GoogleButton />
        </div>

        <UiCardDescription class="text-center text-xs leading-relaxed text-muted-foreground">
          {{ $t('loginPage.termsPrefix') }}
          <TermsOfServiceButton />
          {{ $t('loginPage.and') }}
          <PrivacyPolicyButton />
        </UiCardDescription>
      </form>
    </UiCardContent>
  </UiCard>
</template>
