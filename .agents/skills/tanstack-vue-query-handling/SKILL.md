---
name: tanstack-vue-query-handling
description: TanStack Vue Query patterns for this repo. Use when creating/updating API hooks in `src/services/api` and wiring cache invalidation.
metadata:
  keywords: tanstack-query, vue-query, useQuery, useMutation, queryClient, invalidateQueries, services-api
---

## Selection Checklist

- Label: `strict` (API/query placement rules for this repo).

# TanStack Vue Query Handling (shadcn-vue-admin)

## Overview

This codebase uses TanStack Vue Query with API hooks currently located in:

- `src/services/api/*.ts`

Hooks usually consume `useApiFetch()` from `src/composables/use-fetch.ts`.

## Rules

1. **Read operations** use `useQuery`.
2. **Write operations** use `useMutation`.
3. Mutations must invalidate related query keys in `onSuccess`.
4. Keep query keys stable and explicit (array keys, domain-oriented).
5. Keep hook and key naming consistent with existing files.
6. Keep request details (`method`, `body`, endpoint) in service hooks, not in page components.
7. Keep hooks typed using existing response wrapper types when available.

## Placement

- New API query/mutation hooks go to `src/services/api/`.
- Shared response interfaces stay under `src/services/types/`.
- Do not introduce an alternative API folder architecture unless explicitly requested.

## Query Key Guidance

- Use explicit keys like:
  - `['tasks']`
  - `['task', id]`
  - `['system-config', key]`
- Avoid unstable keys or string concatenation keys.

## Recommended Hook Pattern

```ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

import { useApiFetch } from '@/composables/use-fetch'

export function useGetItemsQuery() {
  const { apiFetch } = useApiFetch()
  return useQuery({
    queryKey: ['items'],
    queryFn: async () => await apiFetch('/items', { method: 'get' }),
  })
}

export function useCreateItemMutation() {
  const { apiFetch } = useApiFetch()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async payload => await apiFetch('/items', { method: 'post', body: payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
    },
  })
}
```

## Integration Rules for Pages/Components

- Pages/components should call service hooks and bind to `data`, `isLoading`, `error`, `mutateAsync`.
- Avoid direct data-fetch logic inside templates.
- Handle loading/error states explicitly in UI for non-trivial screens.

## Anti-Patterns

- Defining query keys differently for the same resource in different files.
- Forgetting to invalidate after mutations.
- Putting fetch logic directly in route pages when a reusable service hook is expected.
- Introducing a second data-fetch stack in parallel without user request.
