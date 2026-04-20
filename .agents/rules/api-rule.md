## API Guidelines (Current Repo: ofetch + TanStack Query)

This document defines API/data access conventions for this repository.

Stack baseline:

- `ofetch` via `src/composables/use-fetch.ts`
- TanStack Vue Query (`@tanstack/vue-query`)
- Service hooks in `src/services/api`

---

### 1. Folder Structure

- `src/services/api/*.ts`
  - Contains query/mutation hooks and API request logic.
- `src/services/types/*.ts`
  - Shared response/type contracts (e.g. `IResponse`).
- `src/composables/use-fetch.ts`
  - Shared fetch client factory and request intercept points.

Do not introduce `src/apis/cores` / `src/apis/services` unless explicitly requested.

---

### 2. Responsibilities by Layer

- **Service hooks (`src/services/api`)**
  - define query keys
  - call `apiFetch`
  - define `useQuery` / `useMutation`
  - invalidate related keys on mutation success

- **Pages/components**
  - consume service hooks
  - render loading/error/empty/data states
  - do not call raw HTTP directly when service hook exists

---

### 3. Query Key Rules

- Query keys must be array-based and stable.
- Use domain-first, explicit patterns.

Examples:

- `['tasks']`
- `['task', id]`
- `['system-config', key]`

Avoid:

- dynamic string-concatenated keys
- using different key patterns for the same resource

---

### 4. Query Hook Pattern

```ts
export function useGetTasksQuery() {
  const { apiFetch } = useApiFetch()
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => await apiFetch('/tasks', { method: 'get' }),
  })
}
```

---

### 5. Mutation Hook Pattern

```ts
export function useCreateTaskMutation() {
  const { apiFetch } = useApiFetch()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async payload => await apiFetch('/tasks', { method: 'post', body: payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
```

Rules:

- Invalidate relevant queries in `onSuccess` (or `onSettled` when appropriate).
- Keep payload and response typing explicit where possible.

---

### 6. Auth/Session Boundaries

- Service hooks should not own navigation redirects.
- Auth/session state belongs to stores/composables responsible for auth flow.
- Keep token/session side effects out of page templates.

---

### 7. Adding a New Endpoint

1. Add/extend hook in `src/services/api/*.ts`.
2. Define/adjust response types in `src/services/types` if needed.
3. Use hook in page/component and wire loading/error states.
4. Add invalidation strategy for related mutations.
