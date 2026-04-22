<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AuthSplitLayout from './components/auth-split-layout.vue'
import GitHubButton from './components/github-button.vue'
import GoogleButton from './components/google-button.vue'
import PrivacyPolicyButton from './components/privacy-policy-button.vue'
import TermsOfServiceButton from './components/terms-of-service-button.vue'

const { t } = useI18n()
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

function validateEmail(value: string) {
  const normalized = value.trim()
  const atIndex = normalized.indexOf('@')
  const dotIndex = normalized.lastIndexOf('.')
  return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < normalized.length - 1
}

function validateForm() {
  errors.firstName = firstName.value.trim() ? '' : t('signUpPage.errors.requiredFirstName')
  errors.lastName = lastName.value.trim() ? '' : t('signUpPage.errors.requiredLastName')
  errors.email = ''
  errors.password = ''
  errors.confirmPassword = ''

  if (!email.value.trim()) {
    errors.email = t('signUpPage.errors.requiredEmail')
  }
  else if (!validateEmail(email.value)) {
    errors.email = t('signUpPage.errors.invalidEmail')
  }

  if (!password.value.trim()) {
    errors.password = t('signUpPage.errors.requiredPassword')
  }
  else if (password.value.length < 8) {
    errors.password = t('signUpPage.errors.passwordMin')
  }

  if (!confirmPassword.value.trim()) {
    errors.confirmPassword = t('signUpPage.errors.requiredConfirmPassword')
  }
  else if (confirmPassword.value !== password.value) {
    errors.confirmPassword = t('signUpPage.errors.passwordMismatch')
  }

  return Object.values(errors).every(error => !error)
}

function onSubmit() {
  if (!validateForm())
    return
}
</script>

<template>
  <AuthSplitLayout>
    <UiCard
      class="w-full rounded-2xl border border-border/60 bg-card text-card-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_48px_-28px_rgba(0,0,0,0.1)] ring-1 ring-foreground/[0.03] transition-shadow duration-300 dark:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_20px_56px_-32px_rgba(0,0,0,0.55)] dark:ring-foreground/[0.06]"
    >
      <UiCardHeader class="space-y-1.5 px-6 pt-7 pb-2">
        <UiCardTitle class="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {{ $t('signUpPage.title') }}
        </UiCardTitle>
        <UiCardDescription class="text-sm leading-relaxed text-muted-foreground">
          {{ $t('signUpPage.description') }}
          {{ $t('signUpPage.hasAccount') }}
          <UiButton
            variant="link"
            class="h-auto px-0.5 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-primary"
            @click="$router.push('/auth/sign-in')"
          >
            {{ $t('signUpPage.signIn') }}
          </UiButton>
        </UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="px-6 pb-7">
        <form class="grid gap-5" @submit.prevent="onSubmit">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="grid gap-2">
              <UiLabel for="first-name" class="text-sm font-medium text-foreground">
                {{ $t('signUpPage.firstName') }}
              </UiLabel>
              <UiInput
                id="first-name"
                v-model="firstName"
                :placeholder="$t('signUpPage.firstNamePlaceholder')"
                required
                :aria-invalid="Boolean(errors.firstName)"
                class="h-11 rounded-lg border-input bg-background transition-colors duration-200 placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring/35"
              />
              <p v-if="errors.firstName" class="text-sm text-destructive" role="alert">
                {{ errors.firstName }}
              </p>
            </div>
            <div class="grid gap-2">
              <UiLabel for="last-name" class="text-sm font-medium text-foreground">
                {{ $t('signUpPage.lastName') }}
              </UiLabel>
              <UiInput
                id="last-name"
                v-model="lastName"
                :placeholder="$t('signUpPage.lastNamePlaceholder')"
                required
                :aria-invalid="Boolean(errors.lastName)"
                class="h-11 rounded-lg border-input bg-background transition-colors duration-200 placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring/35"
              />
              <p v-if="errors.lastName" class="text-sm text-destructive" role="alert">
                {{ errors.lastName }}
              </p>
            </div>
          </div>

          <div class="grid gap-2">
            <UiLabel for="email" class="text-sm font-medium text-foreground">
              {{ $t('email') }}
            </UiLabel>
            <UiInput
              id="email"
              v-model="email"
              type="email"
              :placeholder="$t('signUpPage.emailPlaceholder')"
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
            <UiLabel for="password" class="text-sm font-medium text-foreground">
              {{ $t('password') }}
            </UiLabel>
            <div class="relative">
              <UiInput
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="$t('signUpPage.passwordPlaceholder')"
                autocomplete="new-password"
                required
                :aria-invalid="Boolean(errors.password)"
                class="h-11 rounded-lg border-input bg-background pr-18 transition-colors duration-200 placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring/35"
              />
              <button
                type="button"
                class="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md px-1.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                :aria-label="showPassword ? t('signUpPage.hidePassword') : t('signUpPage.showPassword')"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? $t('signUpPage.hidePassword') : $t('signUpPage.showPassword') }}
              </button>
            </div>
            <p v-if="errors.password" class="text-sm text-destructive" role="alert">
              {{ errors.password }}
            </p>
          </div>

          <div class="grid gap-2">
            <UiLabel for="confirm-password" class="text-sm font-medium text-foreground">
              {{ $t('signUpPage.confirmPassword') }}
            </UiLabel>
            <div class="relative">
              <UiInput
                id="confirm-password"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                :placeholder="$t('signUpPage.confirmPasswordPlaceholder')"
                autocomplete="new-password"
                required
                :aria-invalid="Boolean(errors.confirmPassword)"
                class="h-11 rounded-lg border-input bg-background pr-18 transition-colors duration-200 placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring/35"
              />
              <button
                type="button"
                class="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md px-1.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                :aria-label="showConfirmPassword ? t('signUpPage.hidePassword') : t('signUpPage.showPassword')"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                {{ showConfirmPassword ? $t('signUpPage.hidePassword') : $t('signUpPage.showPassword') }}
              </button>
            </div>
            <p v-if="errors.confirmPassword" class="text-sm text-destructive" role="alert">
              {{ errors.confirmPassword }}
            </p>
          </div>

          <UiButton type="submit" class="h-11 w-full rounded-lg text-sm font-semibold shadow-sm">
            {{ $t('signUpPage.submit') }}
          </UiButton>

          <div class="relative py-1">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <span class="h-px w-full bg-border/70" />
            </div>
            <div class="relative flex justify-center text-[0.6875rem] font-medium tracking-wider text-muted-foreground uppercase">
              <span class="bg-card px-3">{{ $t('signUpPage.continueWith') }}</span>
            </div>
          </div>

          <div class="flex flex-col gap-2.5">
            <GitHubButton />
            <GoogleButton />
          </div>

          <UiCardDescription class="text-center text-xs leading-relaxed text-muted-foreground">
            {{ $t('signUpPage.termsPrefix') }}
            <TermsOfServiceButton />
            {{ $t('signUpPage.and') }}
            <PrivacyPolicyButton />
          </UiCardDescription>
        </form>
      </UiCardContent>
    </UiCard>
  </AuthSplitLayout>
</template>
