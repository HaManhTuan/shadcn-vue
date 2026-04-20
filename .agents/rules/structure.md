## Project Structure Guidelines (Current Repo)

This document is the source of truth for where code should live in this repository.

---

### 1. Top-level Layout

- `src/main.ts`: app bootstrap and global CSS imports.
- `src/App.vue`: root render shell (`router-view`, global toaster, suspense fallback).
- `src/pages/`: route-level pages and feature modules (file-based routing).
- `src/layouts/`: layout wrappers (`default`, `marketing`, `blank`).
- `src/router/`: router instance and guards.
- `src/components/ui/`: shadcn-vue style UI primitives.
- `src/components/`: shared app components (sidebar, data-table wrappers, global layout, etc.).
- `src/composables/`: reusable logic and app-level helpers.
- `src/stores/`: Pinia global/shared state.
- `src/services/api/`: API hooks and TanStack Query wrappers.
- `src/services/types/`: shared response/data types for service layer.
- `src/plugins/`: plugin setup (pinia, i18n, query, router, etc.).

---

### 2. Page and Component Placement

- Feature/page-local components belong in:
  - `src/pages/<feature>/components/`
- Feature/page-local validators and sample data belong in:
  - `src/pages/<feature>/validators/`
  - `src/pages/<feature>/data/`
- Shared cross-feature components belong in:
  - `src/components/`
- Reusable low-level controls should prefer:
  - `src/components/ui/` (reuse before creating new primitives)

Rule of thumb:

- Used by one feature -> keep local in `src/pages/<feature>`.
- Used by 2+ unrelated features -> consider moving to `src/components/`.

---

### 3. Forms and Validation

- Baseline form stack:
  - `vee-validate` + `@vee-validate/zod` + `zod`
- Do not force TanStack Form architecture unless explicitly requested.
- Keep validation schemas close to feature forms unless truly shared.

---

### 4. State and Data Fetching

- Use local component state for local UI concerns.
- Use Pinia (`src/stores`) only for shared/global app state.
- Keep API/query logic in `src/services/api`.
- Route pages/components should consume service hooks/composables, not inline HTTP logic.

---

### 5. Dependency Direction

Prefer this dependency flow:

- `pages -> components/composables -> services -> shared types/utils`

Do not let low-level/shared modules import from feature page folders.

---

### 6. Scope Discipline

- Bugfix tasks should avoid broad refactors unless requested.
- New features should extend existing patterns, not introduce parallel architectures.
