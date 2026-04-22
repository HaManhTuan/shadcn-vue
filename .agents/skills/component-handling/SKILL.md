---
name: component-handling
description: Organize Vue components for this shadcn-vue-admin repo. Use when deciding where components live, when to keep feature-local vs shared, and how to refactor component boundaries safely.
license: MIT
---

## Selection Checklist

- Label: `strict` (component placement baseline for this repo).

# Component Handling (shadcn-vue-admin)

## Purpose

This repository is **not** a strict Atomic Design project.
Use a pragmatic structure that matches current code:

- shared primitives in `src/components/ui/`
- shared app components in `src/components/`
- feature-local components in `src/pages/<feature>/components/`

## When to Apply

- Adding new UI components
- Refactoring oversized page files
- Deciding if a component belongs to feature folder or shared folder
- Reviewing component imports and coupling

## Placement Rules

1. **UI primitive or wrapper used broadly**
   -> `src/components/ui/` (or adjacent shared folder under `src/components/`)

2. **App-level reusable composition (layout/sidebar/table shell, etc.)**
   -> `src/components/`

3. **Feature-specific component (used by one domain/page)**
   -> `src/pages/<feature>/components/`

4. **Feature-specific dialog/form/table actions**
   -> keep in the same feature folder as the page

5. **Promotion rule**
   - If used in 2+ unrelated features, consider moving to shared components.
   - If only used in one feature, keep it local (avoid premature abstraction).

## Component Boundary Rules

- Route pages should be composition/orchestration surfaces.
- Move repeated sections into child components.
- Put reusable stateful logic in composables (`src/composables/`) when reused.
- Keep props/emits explicit and typed.
- Keep templates declarative; move heavy branching/derivation into script.

## Import Rules

- Shared components must not depend on feature-local components.
- Feature components can import shared components freely.
- Reuse existing `Ui*` primitives before creating new low-level controls.
- Prefer explicit imports/paths; avoid creating unnecessary new index barrels.

## Anti-Patterns to Avoid

- Moving page-only components into shared folder too early.
- Building mega-components with many unrelated responsibilities.
- Duplicating existing shared patterns (e.g. table wrapper, modal wrapper, form controls).
- Creating custom primitive controls when equivalent exists in `src/components/ui/`.

## Refactor Triggers

Refactor a component when any condition is true:

- File is hard to read due to multiple independent UI sections.
- Same UI block appears in 2+ places.
- Logic and presentation are tightly mixed and no longer maintainable.
- Shared component starts importing feature code (coupling violation).

## Quick Decision Matrix

- **Only one feature uses it?** -> Keep in `src/pages/<feature>/components/`
- **Many features use it?** -> Move to `src/components/`
- **Is it a base UI primitive?** -> `src/components/ui/`
- **Is it reusable logic (not UI)?** -> `src/composables/`

## Related skills

- **UI/UX design** (visual hierarchy, palettes, spacing systems, accessibility, UX review): [ui-ux-pro-max/SKILL.md](../ui-ux-pro-max/SKILL.md) — label **soft**; see [SKILL_SELECTION_POLICY.md](../SKILL_SELECTION_POLICY.md). Not a substitute for placement rules above.

## Naming Notes

- Use existing repo style: **kebab-case** for `.vue` files.
- Keep names descriptive by responsibility (`task-form.vue`, `data-table-toolbar.vue`, `settings-layout.vue`).
