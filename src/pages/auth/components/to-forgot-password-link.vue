<script lang="ts" setup>
</script>

<template>
  <UiButton
    variant="link"
    class="h-auto shrink-0 p-0 text-xs font-medium text-muted-foreground underline-offset-4 hover:text-primary"
    @click="$router.push('/auth/forgot-password')"
  >
    {{ $t('forgotPassword') }}
  </UiButton>
</template>
