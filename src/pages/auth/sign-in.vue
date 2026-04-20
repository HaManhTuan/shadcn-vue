<script setup lang="ts">
import AuthTitle from './components/auth-title.vue'
import LoginForm from './components/login-form.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <main class="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 px-4 py-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-8">
      <section class="relative hidden overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-12 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.45)] lg:flex lg:flex-col lg:justify-between">
        <div class="pointer-events-none absolute inset-0 bg-linear-to-br from-blue-50/90 via-white to-slate-100/80" />
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
          <LoginForm />
        </div>
      </section>
    </main>
  </div>
</template>
