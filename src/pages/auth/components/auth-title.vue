<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
const logo = computed(() => {
  return mode.value === 'dark' ? '/logo.svg' : '/logo-black.svg'
})
</script>

<template>
  <h1 class="flex items-center gap-3 text-xl font-semibold tracking-tight text-slate-900">
    <img :src="logo" alt="Shadcn Vue Admin logo" class="size-8">
    <span>Shadcn Vue Admin</span>
  </h1>
</template>
