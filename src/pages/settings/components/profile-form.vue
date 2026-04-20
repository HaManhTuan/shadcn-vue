<script setup lang="ts">
import { XIcon } from '@lucide/vue'
import { toTypedSchema } from '@vee-validate/zod'
import { FieldArray, useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'

import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

import { createProfileValidator } from '../validators/profile.validator'

const { t } = useI18n()

const verifiedEmails = ref(['m@example.com', 'm@google.com', 'm@support.com'])

const profileFormSchema = computed(() => toTypedSchema(createProfileValidator(t)))

const { handleSubmit, resetForm } = useForm({
  validationSchema: profileFormSchema,
  initialValues: {
    bio: t('settings.profile.defaultBio'),
    urls: [
      { value: 'https://shadcn.com' },
      { value: 'http://twitter.com/shadcn' },
    ],
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
      {{ t('settings.profile.title') }}
    </h3>
    <p class="text-sm text-muted-foreground">
      {{ t('settings.profile.subtitle') }}
    </p>
  </div>
  <Separator orientation="horizontal" class="my-4" />
  <form class="space-y-8" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>{{ t('settings.profile.username') }}</FormLabel>
        <FormControl>
          <Input type="text" :placeholder="t('settings.profile.usernamePlaceholder')" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          {{ t('settings.profile.usernameDescription') }}
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>{{ t('settings.profile.email') }}</FormLabel>

        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue :placeholder="t('settings.profile.selectEmail')" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="email in verifiedEmails" :key="email" :value="email">
                {{ email }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormDescription>
          {{ t('settings.profile.emailDescription') }}
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="bio">
      <FormItem>
        <FormLabel>{{ t('settings.profile.bio') }}</FormLabel>
        <FormControl>
          <Textarea :placeholder="t('settings.profile.bioPlaceholder')" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          {{ t('settings.profile.bioDescriptionBefore') }}<span class="font-mono">{{ t('settings.profile.bioDescriptionMention') }}</span>{{ t('settings.profile.bioDescriptionAfter') }}
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <div>
      <FieldArray v-slot="{ fields, push, remove }" name="urls">
        <div v-for="(field, index) in fields" :key="`urls-${field.key}`" class="mb-2">
          <FormField v-slot="{ componentField }" :name="`urls[${index}].value`">
            <FormItem>
              <FormLabel :class="cn(index !== 0 && 'sr-only')">
                {{ t('settings.profile.urls') }}
              </FormLabel>
              <FormDescription :class="cn(index !== 0 && 'sr-only')">
                {{ t('settings.profile.urlsDescription') }}
              </FormDescription>
              <div class="relative flex items-center">
                <FormControl>
                  <Input type="url" v-bind="componentField" />
                </FormControl>
                <button type="button" class="absolute py-2 pe-3 end-0 text-muted-foreground" @click="remove(index)">
                  <XIcon class="w-3" />
                </button>
              </div>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          class="w-20 mt-2 text-xs"
          @click="push({ value: '' })"
        >
          {{ t('settings.profile.addUrl') }}
        </Button>
      </FieldArray>
    </div>

    <div class="flex justify-start gap-2">
      <Button type="submit">
        {{ t('settings.profile.submit') }}
      </Button>

      <Button
        type="button"
        variant="outline"
        @click="resetForm"
      >
        {{ t('settings.profile.resetForm') }}
      </Button>
    </div>
  </form>
</template>
