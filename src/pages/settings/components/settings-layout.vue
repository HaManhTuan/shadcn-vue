<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { BasicPage, TwoColAside, TwoColLayout } from '@/components/global-layout'

const { t } = useI18n()
const { settingsNavItems } = useSidebar()
</script>

<template>
  <BasicPage
    :title="t('settings.layout.title')"
    :description="t('settings.layout.description')"
  >
    <TwoColLayout>
      <template #aside>
        <TwoColAside :nav="settingsNavItems" />
      </template>

      <slot />
    </TwoColLayout>
  </BasicPage>
</template>
