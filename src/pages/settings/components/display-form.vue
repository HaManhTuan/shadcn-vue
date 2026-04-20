<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'

import { createDisplayValidator } from '../validators/display.validator'

const { t } = useI18n()

const items = computed(() => [
  { id: 'recents' as const, label: t('settings.display.itemRecents') },
  { id: 'home' as const, label: t('settings.display.itemHome') },
  { id: 'applications' as const, label: t('settings.display.itemApplications') },
  { id: 'desktop' as const, label: t('settings.display.itemDesktop') },
  { id: 'downloads' as const, label: t('settings.display.itemDownloads') },
  { id: 'documents' as const, label: t('settings.display.itemDocuments') },
])

const displayFormSchema = computed(() => toTypedSchema(createDisplayValidator(t)))

const { handleSubmit } = useForm({
  validationSchema: displayFormSchema,
  initialValues: {
    items: ['recents', 'home'],
  },
})

const onSubmit = handleSubmit((values) => {
  toast(t('settings.common.submitToastTitle'), {
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
})
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">
      {{ t('settings.display.title') }}
    </h3>
    <p class="text-sm text-muted-foreground">
      {{ t('settings.display.subtitle') }}
    </p>
  </div>
  <Separator class="my-4" />
  <form @submit="onSubmit">
    <FormField name="items">
      <FormItem>
        <div class="mb-4">
          <FormLabel class="text-base">
            {{ t('settings.display.sidebar') }}
          </FormLabel>
          <FormDescription>
            {{ t('settings.display.sidebarDescription') }}
          </FormDescription>
        </div>

        <FormField v-for="item in items" v-slot="{ value, handleChange }" :key="item.id" name="items">
          <FormItem :key="item.id" class="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                :model-value="value.includes(item.id)"
                @update:model-value="(checked: boolean | 'indeterminate') => {
                  if (Array.isArray(value)) {
                    handleChange(checked ? [...value, item.id] : value.filter(id => id !== item.id))
                  }
                }"
              />
            </FormControl>
            <FormLabel class="font-normal">
              {{ item.label }}
            </FormLabel>
          </FormItem>
        </FormField>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex justify-start mt-4">
      <Button type="submit">
        {{ t('settings.display.submit') }}
      </Button>
    </div>
  </form>
</template>
