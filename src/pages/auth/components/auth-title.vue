<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
const logo = computed(() => {
  return mode.value === 'dark' ? '/logo.svg' : '/logo-black.svg'
})
</script>

<template>
  <h1 class="flex items-center gap-3 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
    <img :src="logo" :alt="$t('authLayout.logoAlt')" class="size-8 shrink-0 rounded-md">
    <span>{{ $t('authLayout.brandName') }}</span>
  </h1>
</template>
