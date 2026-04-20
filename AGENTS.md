# AGENTS.md

## Commands

- `pnpm dev` # Start dev server
- `pnpm build` # Typecheck + build (CI-like sanity check)
- `pnpm lint:fix` # Auto-fix linting issues

Run `pnpm lint:fix` after code changes.

If the project has tests configured (e.g. a `test` script), run them as well.

## Strong Constraints (Required)

- Always run `pnpm build` for any non-trivial change (not just UI text).
- If you modify core logic (e.g. `src/lib/**`, `src/utils/**`, `src/composables/**`, `src/services/**`, `src/router/**`, `src/stores/**`):
  - If the repo has a test runner/script (e.g. `pnpm test` / `pnpm test:unit`): add/adjust automated tests in the same change and run the tests.
  - If the repo still has no test runner:
    - Tests are optional but strongly recommended.
    - Add “Testing Notes” in the PR/commit description explaining the risk and the manual/alternative checks performed.
    - Consider adding a minimal unit test setup (recommended) once the team decides to introduce testing.

## Stack

- vue, shadcn-vue, tailwindcss, vee-validate, typescript, zod

## Structure

- `src/` - Vue application
- `vite.config.ts` - vite config

## Further Reading

- `.agents/skills/shadcn-vue-admin/references/SYSTEM_KNOWLEDGE_MAP.md`
- `.agents/skills/shadcn-vue-admin/references/testing-strategy.md`
- `.agents/skills/SKILL_SELECTION_POLICY.md`

## Skill Selection Policy (Strict/Soft)

When multiple skills could apply, resolve conflicts with this order:

1. **STRICT skills first** (repo-specific architecture/rules).
2. **SOFT skills second** (general best practices, optional enhancements).
3. If a SOFT skill conflicts with STRICT, follow STRICT and ignore the conflicting part.

### Strict Skills (must dominate on conflicts)

- `shadcn-vue-admin` (name: `shadcn-vue-admin`)
- `project-conventions` (name: `project-conventions`)
- `component-handling` (name: `component-handling`)
- `tanstack-vue-form-handling` (name: `form-handling`)
- `tanstack-vue-query-handling` (name: `tanstack-vue-query-handling`)
- `zod-validation-handling` (name: `validation-with-zod`)

### Soft Skills (apply when no conflict)

- `vue` (name: `vue`)
- `vue-best-practices` (name: `vue-best-practices`)
- `vue-debug-guides` (name: `vue-debug-guides`)
- `vue-pinia-best-practices` (name: `vue-pinia-best-practices`)
- `vue-router-best-practices` (name: `vue-router-best-practices`)
- `vueuse-functions` (name: `vueuse-functions`)
- `shadcn-vue` (name: `shadcn-vue`)
- `tailwind-css-patterns` (name: `tailwind-css-patterns`)
- `tailwind-design-system` (name: `tailwind-design-system`)
- `animate` (name: `animate`)
- `supabase-postgres-best-practices` (name: `supabase-postgres-best-practices`, DB/SQL scope only)

### Missing Skill Note

- `frontend-design` is currently not present under `.agents/skills/`, so it cannot be selected.

### Debug Logging Rule (Hardening)

- Khi log/chẩn đoán việc chọn skill, luôn in đủ cả:
  - `skill_folder`: thư mục dưới `.agents/skills/`
  - `skill_name`: giá trị `name:` trong frontmatter của `SKILL.md`
- Format khuyến nghị: `skill_folder=<folder> | skill_name=<name> | label=<strict|soft>`
