<script setup lang="ts">
import AuthTitle from './auth-title.vue'
</script>

<template>
  <div class="relative min-h-screen bg-background">
    <div
      class="pointer-events-none fixed inset-0 -z-10 bg-linear-to-b from-primary/[0.04] via-background to-muted/25 dark:from-primary/[0.07] dark:to-background"
      aria-hidden="true"
    />
    <main
      class="relative mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14 lg:px-10 lg:py-12"
    >
      <section
        class="relative hidden min-h-112 flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card p-10 text-card-foreground shadow-sm ring-1 ring-foreground/[0.04] dark:ring-foreground/[0.06] lg:flex"
      >
        <div
          class="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/[0.06] via-transparent to-muted/50 dark:from-primary/[0.09] dark:to-muted/20"
          aria-hidden="true"
        />
        <div class="relative flex flex-col gap-8">
          <AuthTitle />
          <div class="space-y-4">
            <p class="max-w-md text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-[2rem]">
              {{ $t('authLayout.headline') }}
            </p>
            <p class="max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground">
              {{ $t('authLayout.subheadline') }}
            </p>
          </div>
        </div>
        <p class="relative text-xs leading-relaxed text-muted-foreground">
          {{ $t('authLayout.footer') }}
        </p>
      </section>

      <section class="flex min-h-0 flex-1 items-center justify-center py-4 sm:py-8 lg:py-0">
        <div class="w-full max-w-90 space-y-8">
          <div class="lg:hidden">
            <AuthTitle />
          </div>
          <slot />
        </div>
      </section>
    </main>
  </div>
</template>
