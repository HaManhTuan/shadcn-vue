# Skill Selection Policy

This file defines strict/soft labels for skills in this repository to avoid auto-selection conflicts.

## Label Meaning

- **strict**: Repository-specific source of truth. If conflict exists, strict wins.
- **soft**: General guidance. Apply only when it does not conflict with strict skills.

## Skills Matrix

Note:

- `Skill (folder)` = folder slug under `.agents/skills/`
- `name` = `name:` field in that skill's frontmatter

| Skill (folder)                     | name                               | Label  | Why                                                                         |
| ---------------------------------- | ---------------------------------- | ------ | --------------------------------------------------------------------------- |
| `shadcn-vue-admin`                 | `shadcn-vue-admin`                 | strict | Core repo map, workflow, commands, and stack assumptions.                   |
| `project-conventions`              | `project-conventions`              | strict | Canonical file placement, naming, and architecture for this codebase.       |
| `component-handling`               | `component-handling`               | strict | Component placement rules aligned to `src/pages` and `src/components`.      |
| `tanstack-vue-form-handling`       | `form-handling`                    | strict | Enforces repo baseline: vee-validate + zod form pattern.                    |
| `tanstack-vue-query-handling`      | `tanstack-vue-query-handling`      | strict | Enforces repo API/query placement in `src/services/api`.                    |
| `zod-validation-handling`          | `validation-with-zod`              | strict | Enforces repo validator organization and zod integration style.             |
| `vue`                              | `vue`                              | soft   | General Vue 3 guidance; useful unless it contradicts repo conventions.      |
| `vue-best-practices`               | `vue-best-practices`               | soft   | Broad best practices; keep only parts compatible with current architecture. |
| `vue-debug-guides`                 | `vue-debug-guides`                 | soft   | Debug reference; use as-needed during troubleshooting.                      |
| `vue-pinia-best-practices`         | `vue-pinia-best-practices`         | soft   | Pinia tips that complement existing stores.                                 |
| `vue-router-best-practices`        | `vue-router-best-practices`        | soft   | Router guard/lifecycle advice when relevant.                                |
| `vueuse-functions`                 | `vueuse-functions`                 | soft   | Optional composable shortcuts; avoid forced adoption.                       |
| `shadcn-vue`                       | `shadcn-vue`                       | soft   | Library guidance; use for component usage/troubleshooting.                  |
| `tailwind-css-patterns`            | `tailwind-css-patterns`            | soft   | Utility styling patterns and responsive practices.                          |
| `tailwind-design-system`           | `tailwind-design-system`           | soft   | Design-system ideas; use selectively to avoid over-migration.               |
| `ui-ux-pro-max`                    | `ui-ux-pro-max`                    | soft   | UI/UX design intelligence (layout, a11y, palettes, patterns); use for visual/UX work. |
| `animate`                          | `animate`                          | soft   | Optional motion enhancement; apply intentionally and accessibly.            |
| `supabase-postgres-best-practices` | `supabase-postgres-best-practices` | soft   | DB/SQL-specific; only relevant when backend/database tasks exist.           |

## Conflict Resolution

1. Load strict skills relevant to the task first.
2. Add soft skills only after strict alignment is satisfied.
3. If two soft skills conflict, prefer the one closest to the user request.
4. Never refactor project architecture solely to satisfy a soft skill.

## UI/UX design tasks

- Use **`ui-ux-pro-max`** (`skill_folder`=`ui-ux-pro-max`, `skill_name`=`ui-ux-pro-max`) for UI structure, visual design, interaction, accessibility, and UX review.
- Do **not** reference **`frontend-design`**: it is not part of this repository’s `.agents/skills/` set; `ui-ux-pro-max` is the canonical substitute.
