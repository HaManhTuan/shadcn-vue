---
name: project-conventions
description: Apply conventions for this shadcn-vue-admin codebase (Vue 3 + Vite + TypeScript + shadcn-vue + Pinia + vee-validate/zod + TanStack Query). Use for file placement, naming, page/component boundaries, and data-layer usage.
---

## Selection Checklist

- Label: `strict` (repo conventions; overrides conflicting soft skills).

# Project Conventions (shadcn-vue-admin)

## Overview

Use this skill to keep changes aligned with the **actual repository structure** and existing implementation patterns in this project.

Primary goals:

- Put files in the correct place under `src/**`.
- Keep naming and component boundaries consistent.
- Reuse existing UI primitives and shared patterns.
- Keep feature pages maintainable and avoid unnecessary new abstractions.

## Canonical Structure

- `src/pages/` — route-level features and page-local components.
- `src/components/ui/` — reusable UI primitives (shadcn-vue style).
- `src/components/` — shared app-level components (layout, sidebar, table wrappers, etc.).
- `src/layouts/` — `default`, `marketing`, `blank` layouts.
- `src/composables/` — reusable logic and cross-page behavior.
- `src/stores/` — global state (Pinia), mainly UI/system/auth state.
- `src/services/api/` — API/query hooks and data access wrappers.
- `src/plugins/` — app plugin setup (router, pinia, i18n, query, etc.).

## Naming Rules (follow existing repo style)

- Vue SFC files: **kebab-case** (e.g. `task-resource-dialog.vue`, `overview-content.vue`).
- TS utility/service files: **kebab-case** (e.g. `example-tasks.api.ts`, `use-fetch.ts`).
- Composables: file starts with `use-`, function starts with `use` (e.g. `use-auth.ts`, `useAuth`).
- Stores: concise domain names (`auth.ts`, `theme.ts`, `sidebar-config.ts`), exported as `useXxxStore`.
- Constants/types: use descriptive names and colocate with feature when only used by one feature.

## Placement Rules

1. **Page-specific UI stays near the page**
   - Put feature components under `src/pages/<feature>/components/`.
   - Put feature validators/data/types under `src/pages/<feature>/validators|data|types`.

2. **Shared UI goes to `src/components/`**
   - If reused across 2+ features, move from page-local folder to shared components.
   - Reuse `src/components/ui/*` before creating new low-level controls.

3. **Reusable logic goes to composables/stores**
   - Reusable side-effect/state logic: `src/composables/`.
   - Global cross-page state only: `src/stores/` (do not over-store page-local state).

4. **API access stays in service layer**
   - Keep network/query logic in `src/services/api/*`.
   - Components/pages should consume hooks/functions from service/composable layers, not inline fetch logic unless trivial and one-off.

## Data and State Rules

- Prefer local component state for page-local concerns (dialog open state, active tab, local filters).
- Use Pinia for global concerns (auth/session flags, theme/system config, sidebar mode).
- Keep query keys stable and descriptive in TanStack Query hooks.
- Mutations should invalidate related queries in `onSuccess`.

## Form and Validation Rules

- Current project baseline is **vee-validate + zod**.
- For forms, prefer existing `UiForm*` / `FormField` patterns already used in the repo.
- Keep validation schema near feature form unless it is truly cross-feature.

## Review Checklist

- [ ] New files are in the correct folder based on scope (page-local vs shared).
- [ ] Naming matches current repo conventions (mostly kebab-case files).
- [ ] Existing shared components/utilities are reused before introducing new abstractions.
- [ ] State is placed correctly (local vs Pinia vs composable).
- [ ] API/query logic is in `src/services/api` (or reusable composable), not scattered in templates.
- [ ] Form and validation follow existing vee-validate + zod patterns.
- [ ] No architecture migration is introduced unless explicitly requested by user.
