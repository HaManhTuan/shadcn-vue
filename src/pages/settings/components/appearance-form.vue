<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'

import { createAppearanceValidator } from '../validators/appearance.validator'

const { t } = useI18n()

const KEY = 'appearance_config'
const DEFAULT_APPEARANCE_CONFIG_VALUE = {
  theme: 'light',
  font: 'inter',
} as const

const appearanceSchema = createAppearanceValidator(t)

const { isGetting, isPending, onSubmit } = useSystemConfig({
  key: KEY,
  description: t('settings.appearance.systemDescription'),
  defaultValue: DEFAULT_APPEARANCE_CONFIG_VALUE,
  schema: appearanceSchema,
})
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">
      {{ t('settings.appearance.title') }}
    </h3>
    <p class="text-sm text-muted-foreground">
      {{ t('settings.appearance.subtitle') }}
    </p>
  </div>
  <Separator class="my-4" />

  <div v-if="isGetting">
    <Button variant="secondary" disabled size="sm">
      <Spinner />
      {{ t('settings.common.pleaseWait') }}
    </Button>
  </div>

  <form v-if="!isGetting" class="space-y-8" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="font">
      <FormItem>
        <FormLabel>{{ t('settings.appearance.font') }}</FormLabel>
        <UiSelect v-bind="componentField">
          <UiFormControl>
            <UiSelectTrigger>
              <UiSelectValue :placeholder="t('settings.appearance.selectFont')" />
            </UiSelectTrigger>
          </UiFormControl>
          <UiSelectContent>
            <UiSelectGroup>
              <UiSelectItem value="inter">
                {{ t('settings.appearance.fontInter') }}
              </UiSelectItem>
              <UiSelectItem value="manrope">
                {{ t('settings.appearance.fontManrope') }}
              </UiSelectItem>
              <UiSelectItem value="system">
                {{ t('settings.appearance.fontSystem') }}
              </UiSelectItem>
            </UiSelectGroup>
          </UiSelectContent>
        </UiSelect>
        <FormDescription>
          {{ t('settings.appearance.fontDescription') }}
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" type="radio" name="theme">
      <FormItem class="space-y-1">
        <FormLabel>{{ t('settings.appearance.theme') }}</FormLabel>
        <FormDescription>
          {{ t('settings.appearance.themeDescription') }}
        </FormDescription>
        <FormMessage />

        <RadioGroup
          class="grid max-w-md grid-cols-2 gap-8 pt-2"
          v-bind="componentField"
        >
          <FormItem>
            <FormLabel class="[&:has([data-state=checked])>div]:border-primary flex flex-col">
              <FormControl>
                <RadioGroupItem value="light" class="sr-only" />
              </FormControl>
              <div class="items-center p-1 border-2 rounded-md border-muted hover:border-accent">
                <div class="space-y-2 rounded-sm bg-[#ecedef] p-2">
                  <div class="p-2 space-y-2 bg-white rounded-md shadow-xs">
                    <div class="h-2 w-20 rounded-lg bg-[#ecedef]" />
                    <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div class="flex items-center p-2 space-x-2 bg-white rounded-md shadow-xs">
                    <div class="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div class="flex items-center p-2 space-x-2 bg-white rounded-md shadow-xs">
                    <div class="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                </div>
              </div>
              <span class="block w-full p-2 font-normal text-center">
                {{ t('settings.appearance.themeLight') }}
              </span>
            </FormLabel>
          </FormItem>
          <FormItem>
            <FormLabel class="[&:has([data-state=checked])>div]:border-primary flex flex-col">
              <FormControl>
                <RadioGroupItem value="dark" class="sr-only" />
              </FormControl>
              <div class="items-center p-1 border-2 rounded-md border-muted bg-popover hover:bg-accent hover:text-accent-foreground">
                <div class="p-2 space-y-2 rounded-sm bg-slate-950">
                  <div class="p-2 space-y-2 rounded-md shadow-xs bg-slate-800">
                    <div class="w-20 h-2 rounded-lg bg-slate-400" />
                    <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div class="flex items-center p-2 space-x-2 rounded-md shadow-xs bg-slate-800">
                    <div class="size-4 rounded-full bg-slate-400" />
                    <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div class="flex items-center p-2 space-x-2 rounded-md shadow-xs bg-slate-800">
                    <div class="size-4 rounded-full bg-slate-400" />
                    <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                </div>
              </div>
              <span class="block w-full p-2 font-normal text-center">
                {{ t('settings.appearance.themeDark') }}
              </span>
            </FormLabel>
          </FormItem>
        </RadioGroup>
      </FormItem>
    </FormField>

    <div class="flex justify-start">
      <Button type="submit" :disabled="isPending">
        <Spinner v-if="isPending" size="sm" />
        {{ t('settings.appearance.submit') }}
      </Button>
    </div>
  </form>
</template>
