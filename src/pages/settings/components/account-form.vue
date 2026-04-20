<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { CalendarDaysIcon, CheckIcon, ChevronsUpDownIcon } from '@lucide/vue'
import { toTypedSchema } from '@vee-validate/zod'
import { toDate } from 'reka-ui/date'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'

import type { Language } from '@/plugins/i18n'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { appLocale, SUPPORTED_LOCALES } from '@/plugins/i18n'

import { createAccountValidator } from '../validators/account.validator'

const open = ref(false)
const dateValue = ref()
const placeholder = ref()

const { locale: i18nLocale, t } = useI18n()

const accountFormSchema = computed(() => toTypedSchema(createAccountValidator(t)))

const df = computed(() => new DateFormatter(i18nLocale.value === 'vi' ? 'vi-VN' : 'en-US', {
  dateStyle: 'long',
}))

const languages = computed(() => [
  { label: t('settings.account.languages.en'), value: 'en' },
  { label: t('settings.account.languages.fr'), value: 'fr' },
  { label: t('settings.account.languages.de'), value: 'de' },
  { label: t('settings.account.languages.es'), value: 'es' },
  { label: t('settings.account.languages.pt'), value: 'pt' },
  { label: t('settings.account.languages.ru'), value: 'ru' },
  { label: t('settings.account.languages.ja'), value: 'ja' },
  { label: t('settings.account.languages.ko'), value: 'ko' },
  { label: t('settings.account.languages.vi'), value: 'vi' },
])

function applyDashboardLanguage(code: string) {
  if (!SUPPORTED_LOCALES.has(code as Language))
    return
  const loc = code as Language
  i18nLocale.value = loc
  appLocale.value = loc
}

// https://github.com/logaretm/vee-validate/issues/3521
// https://github.com/logaretm/vee-validate/discussions/3571
async function onSubmit(values: any) {
  toast(t('settings.common.submitToastTitle'), {
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
}
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">
      {{ t('settings.account.title') }}
    </h3>
    <p class="text-sm text-muted-foreground">
      {{ t('settings.account.subtitle') }}
    </p>
  </div>
  <Separator class="my-4" />
  <Form v-slot="{ setFieldValue }" :validation-schema="accountFormSchema" class="space-y-8" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>{{ t('settings.account.name') }}</FormLabel>
        <FormControl>
          <Input type="text" :placeholder="t('settings.account.namePlaceholder')" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          {{ t('settings.account.nameDescription') }}
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ field, value }" name="dob">
      <FormItem class="flex flex-col">
        <FormLabel>{{ t('settings.account.dob') }}</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline" :class="cn(
                  'w-[240px] justify-start text-left font-normal',
                  !value && 'text-muted-foreground',
                )"
              >
                <CalendarDaysIcon class="size-4 opacity-50" />
                <span>{{ value ? df.format(toDate(dateValue, getLocalTimeZone())) : t('settings.account.pickDate') }}</span>
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              v-model:placeholder="placeholder"
              v-model="dateValue"
              :calendar-label="t('settings.account.calendarLabel')"
              initial-focus
              :min-value="new CalendarDate(1900, 1, 1)"
              :max-value="today(getLocalTimeZone())"
              @update:model-value="(v) => {
                if (v) {
                  dateValue = v
                  setFieldValue('dob', toDate(v).toISOString())
                }
                else {
                  dateValue = undefined
                  setFieldValue('dob', undefined)
                }
              }"
            />
          </PopoverContent>
        </Popover>
        <FormDescription>
          {{ t('settings.account.dobDescription') }}
        </FormDescription>
        <FormMessage />
      </FormItem>
      <input type="hidden" v-bind="field">
    </FormField>

    <FormField v-slot="{ value }" name="language">
      <FormItem class="flex flex-col">
        <FormLabel>{{ t('settings.account.language') }}</FormLabel>

        <Popover v-model:open="open">
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline" role="combobox" :aria-expanded="open" :class="cn(
                  'w-[200px] justify-between',
                  !value && 'text-muted-foreground',
                )"
              >
                {{ value ? languages.find(
                  (language) => language.value === value,
                )?.label : t('settings.account.selectLanguage') }}

                <ChevronsUpDownIcon class="size-4 ml-2 opacity-50 shrink-0" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-[200px] p-0">
            <Command>
              <CommandInput :placeholder="t('settings.account.searchLanguage')" />
              <CommandEmpty>{{ t('settings.account.noLanguageFound') }}</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="language in languages" :key="language.value" :value="language.label"
                    @select="() => {
                      setFieldValue('language', language.value)
                      applyDashboardLanguage(language.value)
                      open = false
                    }"
                  >
                    <CheckIcon
                      :class="cn(
                        'mr-2 h-4 w-4',
                        value === language.value ? 'opacity-100' : 'opacity-0',
                      )"
                    />
                    {{ language.label }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <FormDescription>
          {{ t('settings.account.languageDescription') }}
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex justify-start">
      <Button type="submit">
        {{ t('settings.account.submit') }}
      </Button>
    </div>
  </Form>
</template>
