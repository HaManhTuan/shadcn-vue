---
name: validation-with-zod
description: Zod validation conventions for this repo. Use when adding/refactoring validators for forms in `src/pages/**/validators` and integrating with vee-validate.
metadata:
  keywords: zod, validation, schema, validators, vee-validate, toTypedSchema
---

## Selection Checklist

- Label: `strict` (validator organization baseline for this repo).

# Validation With Zod (shadcn-vue-admin)

## Overview

This project uses **zod** with **vee-validate** integration (`@vee-validate/zod`).

Current pattern is mostly **feature-colocated validators**, for example:

- `src/pages/tasks/validators/task.validator.ts`
- `src/pages/settings/validators/*.validator.ts`
- `src/pages/users/validators/*.validator.ts`

Do not force migration to a single global validator folder unless user asks.

## Rules

1. Prefer colocated validators under `src/pages/<feature>/validators/` for feature-only forms.
2. Use shared validators only for truly cross-feature reusable rules.
3. Schema names should be clear and feature-oriented (`taskValidator`, `profileValidator`, etc.).
4. Keep validation messages user-friendly and consistent with existing UI language.
5. Integrate with forms using `toTypedSchema(...)` in vee-validate forms.
6. Avoid duplicating same schema in multiple files; extract when duplication appears.

## Recommended Pattern

```ts
import z from 'zod'

export const taskValidator = z.object({
  title: z.string().min(2).max(50),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

export type TaskValidator = z.infer<typeof taskValidator>
```

Then in form:

```ts
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

import { taskValidator } from '../validators/task.validator'

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(taskValidator),
})
```

## Placement Guidance

- Feature-specific: `src/pages/<feature>/validators/*.validator.ts`
- Shared/common (only when reused broadly): agreed shared validation module
- Keep schema + inferred type exported from same validator file when useful

## Anti-Patterns

- Creating heavyweight global validation architecture without reuse need.
- Mixing multiple validation libraries in one form flow.
- Defining schema inline in template-heavy components when it reduces readability.
- Breaking existing validator naming style for one-off custom conventions.
