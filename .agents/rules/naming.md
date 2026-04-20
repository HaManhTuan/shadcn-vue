## Naming Conventions (Current Repo)

Use consistent naming so the tree is predictable.

---

### 1. File Names

- Default: **kebab-case** for files.
  - Examples:
    - `task-resource-dialog.vue`
    - `use-fetch.ts`
    - `example-tasks.api.ts`
    - `sidebar-config.ts`

- Exception for upstream-style UI primitives:
  - `src/components/ui/**` may keep existing `PascalCase.vue` names (e.g. `Button.vue`, `Input.vue`).
  - Do not bulk-rename existing ui primitives.

---

### 2. Vue SFCs

- For new feature/page/shared SFCs outside `src/components/ui/**`:
  - use **kebab-case** filenames.
- Keep component names descriptive by responsibility:
  - `data-table-toolbar.vue`
  - `settings-layout.vue`
  - `overview-content.vue`

---

### 3. Variables, Functions, and Composables

- Variables/functions: **camelCase**.
- Boolean names start with `is/has/can/should` when meaningful.
- Composable files use `use-*.ts`, exported function uses `useXxx`.
  - `use-auth.ts` -> `useAuth`
  - `use-sidebar-navigation.ts` -> `useSidebarNavigation`

---

### 4. Stores

- Store files in `src/stores` use kebab-case.
- Store export naming:
  - `useXxxStore`
  - examples: `useAuthStore`, `useThemeStore`, `useSidebarConfigStore`

---

### 5. API/Query Naming

- API hook files in `src/services/api` use kebab-case.
- Query/mutation composable names should remain explicit:
  - `useGetTasksQuery`
  - `useCreateTaskMutation`
  - `useUpdateTaskMutation`

- Query keys must be arrays.
  - Examples:
    - `['tasks']`
    - `['task', id]`
    - `['system-config', key]`

---

### 6. Types

- Exported interfaces/types use PascalCase.
- Keep shared service response contracts under `src/services/types`.
- Feature-specific types can stay near feature files when not reused broadly.
