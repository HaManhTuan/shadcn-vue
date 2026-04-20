<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

import { createNotificationsValidator } from '../validators/notifications.validator'

const { t } = useI18n()

const notificationsFormSchema = computed(() => toTypedSchema(createNotificationsValidator(t)))

const { handleSubmit } = useForm({
  validationSchema: notificationsFormSchema,
  initialValues: {
    communication_emails: false,
    marketing_emails: false,
    social_emails: true,
    security_emails: true,
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
      {{ t('settings.notifications.title') }}
    </h3>
    <p class="text-sm text-muted-foreground">
      {{ t('settings.notifications.subtitle') }}
    </p>
  </div>
  <Separator class="my-4" />
  <form class="space-y-8" @submit="onSubmit">
    <FormField v-slot="{ componentField }" type="radio" name="type">
      <FormItem class="space-y-3">
        <FormLabel>{{ t('settings.notifications.notifyAbout') }}</FormLabel>
        <FormControl>
          <RadioGroup
            class="flex flex-col space-y-1"
            v-bind="componentField"
          >
            <FormItem class="flex items-center  space-y-0">
              <FormControl>
                <RadioGroupItem value="all" />
              </FormControl>
              <FormLabel class="font-normal">
                {{ t('settings.notifications.notifyAll') }}
              </FormLabel>
            </FormItem>
            <FormItem class="flex items-center  space-y-0">
              <FormControl>
                <RadioGroupItem value="mentions" />
              </FormControl>
              <FormLabel class="font-normal">
                {{ t('settings.notifications.notifyMentions') }}
              </FormLabel>
            </FormItem>
            <FormItem class="flex items-center  space-y-0">
              <FormControl>
                <RadioGroupItem value="none" />
              </FormControl>
              <FormLabel class="font-normal">
                {{ t('settings.notifications.notifyNone') }}
              </FormLabel>
            </FormItem>
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div>
      <h3 class="mb-4 text-lg font-medium">
        {{ t('settings.notifications.emailSection') }}
      </h3>
      <div class="space-y-4">
        <FormField v-slot="{ handleChange, value }" type="checkbox" name="communication_emails">
          <FormItem class="flex flex-row items-center justify-between p-4 border rounded-lg">
            <div class="space-y-0.5">
              <FormLabel class="text-base">
                {{ t('settings.notifications.communication') }}
              </FormLabel>
              <FormDescription>
                {{ t('settings.notifications.communicationDesc') }}
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                :checked="value"
                @update:checked="handleChange"
              />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField v-slot="{ handleChange, value }" type="checkbox" name="marketing_emails">
          <FormItem class="flex flex-row items-center justify-between p-4 border rounded-lg">
            <div class="space-y-0.5">
              <FormLabel class="text-base">
                {{ t('settings.notifications.marketing') }}
              </FormLabel>
              <FormDescription>
                {{ t('settings.notifications.marketingDesc') }}
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                :checked="value"
                @update:checked="handleChange"
              />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField v-slot="{ handleChange, value }" type="checkbox" name="social_emails">
          <FormItem class="flex flex-row items-center justify-between p-4 border rounded-lg">
            <div class="space-y-0.5">
              <FormLabel class="text-base">
                {{ t('settings.notifications.social') }}
              </FormLabel>
              <FormDescription>
                {{ t('settings.notifications.socialDesc') }}
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                :checked="value"
                @update:checked="handleChange"
              />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField v-slot="{ handleChange, value }" type="checkbox" name="security_emails">
          <FormItem class="flex flex-row items-center justify-between p-4 border rounded-lg">
            <div class="space-y-0.5">
              <FormLabel class="text-base">
                {{ t('settings.notifications.security') }}
              </FormLabel>
              <FormDescription>
                {{ t('settings.notifications.securityDesc') }}
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                :checked="value"
                @update:checked="handleChange"
              />
            </FormControl>
          </FormItem>
        </FormField>
      </div>
    </div>

    <FormField v-slot="{ handleChange, value }" type="checkbox" name="mobile">
      <FormItem class="flex flex-row items-start space-x-3 space-y-0">
        <FormControl>
          <Checkbox
            :model-value="value"
            @update:model-value="handleChange"
          />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>
            {{ t('settings.notifications.mobileTitle') }}
          </FormLabel>
          <FormDescription>
            {{ t('settings.notifications.mobileDescBefore') }}<a class="underline underline-offset-4" href="/examples/forms">{{ t('settings.notifications.mobileLink') }}</a>{{ t('settings.notifications.mobileDescAfter') }}
          </FormDescription>
        </div>
      </FormItem>
    </FormField>

    <div class="flex justify-start">
      <Button type="submit">
        {{ t('settings.notifications.submit') }}
      </Button>
    </div>
  </form>
</template>
