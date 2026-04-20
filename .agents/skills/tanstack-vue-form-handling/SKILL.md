---
name: form-handling
description: Form handling for this repo using vee-validate + zod + shadcn-vue form primitives. Use when creating/updating forms in `src/pages/**/components`.
metadata:
  keywords: form, vee-validate, zod, useForm, FormField, validation, submit, ui-form
---

## Selection Checklist

- Label: `strict` (forms follow vee-validate + zod in this repo).

# Form Handling (shadcn-vue-admin)

## Overview

Current project standard is:

- **Form state:** `vee-validate` (`useForm`, `FormField`, `FieldArray`)
- **Validation:** `zod` via `@vee-validate/zod` (`toTypedSchema`)
- **UI controls:** existing `UiForm*` / `Form*` / `UiInput` / `UiSelect` patterns

Do **not** migrate forms to TanStack Form unless the user explicitly asks for that architecture change.

## Where to Place Form Code

- Feature form components: `src/pages/<feature>/components/`
- Feature validators: `src/pages/<feature>/validators/`
- Shared cross-feature validators (only if truly reused): shared validation module agreed by team

## Rules

1. Use `useForm` from `vee-validate` as baseline.
2. Prefer `toTypedSchema(zodSchema)` for typed schema integration.
3. Keep schema close to the feature unless it is reused across domains.
4. Keep submit behavior predictable:
   - disable button only during pending submit if needed
   - show clear success/error feedback (toast or inline)
5. Reuse existing UI field wrappers for consistent labels, descriptions, and messages.
6. Avoid mixing many form paradigms in the same feature.

## Recommended Pattern

```ts
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

import { myFormValidator } from '../validators/my-form.validator'

const schema = toTypedSchema(myFormValidator)

const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
  },
})

const onSubmit = handleSubmit(async (values) => {
  // call mutation / service
})
```

## UI Integration Notes

- Use existing form components (`FormField`, `UiFormItem`, `UiFormLabel`, `UiFormMessage`, etc.).
- Keep placeholder/text styles consistent with project UI.
- For dynamic lists, use `FieldArray`.
- For select/radio groups, follow current binding style already used in settings/tasks pages.

## Anti-Patterns

- Introducing TanStack Form into a feature that already uses vee-validate.
- Writing duplicated inline validation rules in every component.
- Storing temporary form state in Pinia without clear cross-page requirement.
- Skipping user feedback on submit results.
