<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AuthTitle from './components/auth-title.vue'
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
  <div class="min-h-screen bg-slate-50">
    <main class="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 px-4 py-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-8">
      <section class="relative hidden overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-12 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.45)] lg:flex lg:flex-col lg:justify-between">
        <div class="pointer-events-none absolute inset-0 bg-linear-to-br from-indigo-50/90 via-white to-slate-100/80" />
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
                {{ $t('signUpPage.title') }}
              </UiCardTitle>
              <UiCardDescription class="text-sm leading-relaxed text-slate-600">
                {{ $t('signUpPage.description') }}
                {{ $t('signUpPage.hasAccount') }}
                <UiButton
                  variant="link" class="h-auto px-1 text-sm text-slate-700 transition-colors hover:text-slate-900"
                  @click="$router.push('/auth/sign-in')"
                >
                  {{ $t('signUpPage.signIn') }}
                </UiButton>
              </UiCardDescription>
            </UiCardHeader>
            <UiCardContent class="px-8 pb-8">
              <form class="grid gap-6" @submit.prevent="onSubmit">
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div class="grid gap-2">
                    <UiLabel for="first-name" class="text-sm font-medium text-slate-700">
                      {{ $t('signUpPage.firstName') }}
                    </UiLabel>
                    <UiInput
                      id="first-name"
                      v-model="firstName"
                      :placeholder="$t('signUpPage.firstNamePlaceholder')"
                      required
                      :aria-invalid="Boolean(errors.firstName)"
                      class="h-12 rounded-xl border-slate-200 bg-white transition-all duration-200 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-100"
                    />
                    <p v-if="errors.firstName" class="text-sm text-rose-600">
                      {{ errors.firstName }}
                    </p>
                  </div>
                  <div class="grid gap-2">
                    <UiLabel for="last-name" class="text-sm font-medium text-slate-700">
                      {{ $t('signUpPage.lastName') }}
                    </UiLabel>
                    <UiInput
                      id="last-name"
                      v-model="lastName"
                      :placeholder="$t('signUpPage.lastNamePlaceholder')"
                      required
                      :aria-invalid="Boolean(errors.lastName)"
                      class="h-12 rounded-xl border-slate-200 bg-white transition-all duration-200 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-100"
                    />
                    <p v-if="errors.lastName" class="text-sm text-rose-600">
                      {{ errors.lastName }}
                    </p>
                  </div>
                </div>

                <div class="grid gap-2">
                  <UiLabel for="email" class="text-sm font-medium text-slate-700">
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
                    class="h-12 rounded-xl border-slate-200 bg-white transition-all duration-200 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-100"
                  />
                  <p v-if="errors.email" class="text-sm text-rose-600">
                    {{ errors.email }}
                  </p>
                </div>

                <div class="grid gap-2">
                  <UiLabel for="password" class="text-sm font-medium text-slate-700">
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
                      class="h-12 rounded-xl border-slate-200 bg-white pr-20 transition-all duration-200 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-100"
                    />
                    <button
                      type="button"
                      class="absolute top-1/2 right-3 -translate-y-1/2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800"
                      :aria-label="showPassword ? t('signUpPage.hidePassword') : t('signUpPage.showPassword')"
                      @click="showPassword = !showPassword"
                    >
                      {{ showPassword ? $t('signUpPage.hidePassword') : $t('signUpPage.showPassword') }}
                    </button>
                  </div>
                  <p v-if="errors.password" class="text-sm text-rose-600">
                    {{ errors.password }}
                  </p>
                </div>

                <div class="grid gap-2">
                  <UiLabel for="confirm-password" class="text-sm font-medium text-slate-700">
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
                      class="h-12 rounded-xl border-slate-200 bg-white pr-20 transition-all duration-200 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-100"
                    />
                    <button
                      type="button"
                      class="absolute top-1/2 right-3 -translate-y-1/2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800"
                      :aria-label="showConfirmPassword ? t('signUpPage.hidePassword') : t('signUpPage.showPassword')"
                      @click="showConfirmPassword = !showConfirmPassword"
                    >
                      {{ showConfirmPassword ? $t('signUpPage.hidePassword') : $t('signUpPage.showPassword') }}
                    </button>
                  </div>
                  <p v-if="errors.confirmPassword" class="text-sm text-rose-600">
                    {{ errors.confirmPassword }}
                  </p>
                </div>

                <UiButton type="submit" class="h-12 w-full rounded-xl bg-slate-900 text-base font-semibold text-white transition-all duration-200 hover:bg-slate-800 active:scale-[0.99]">
                  {{ $t('signUpPage.submit') }}
                </UiButton>

                <UiSeparator :label="$t('signUpPage.continueWith')" />

                <div class="flex flex-col items-center justify-between gap-3">
                  <GitHubButton />
                  <GoogleButton />
                </div>

                <UiCardDescription class="text-sm leading-relaxed text-slate-500">
                  {{ $t('signUpPage.termsPrefix') }}
                  <TermsOfServiceButton />
                  {{ $t('signUpPage.and') }}
                  <PrivacyPolicyButton />
                </UiCardDescription>
              </form>
            </UiCardContent>
          </UiCard>
        </div>
      </section>
    </main>
  </div>
</template>
