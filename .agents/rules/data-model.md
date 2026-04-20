## Data Modeling Rules (Current Repo)

This repository is frontend-first and currently does not require a mandatory class-based domain model layer.

---

### 1. Core Principles

1. Keep data shapes explicit and typed where possible.
2. Keep mapping/normalization close to the service layer, not inside templates.
3. Avoid unnecessary architecture (no forced `class-transformer` model system).

---

### 2. Type Placement

- Shared API response/types:
  - `src/services/types/**`
- Feature-local types:
  - colocate near feature pages/components when not reused broadly

Examples:

- `src/services/types/response.type.ts`
- `src/pages/<feature>/types/index.ts` (when needed)

---

### 3. DTO and UI Model Handling

- If backend shape is directly usable by UI:
  - use it with strong TypeScript interfaces.
- If backend shape is not UI-friendly:
  - transform data in `src/services/api/*` (or a dedicated utility/composable), then expose normalized data to pages/components.

Do not perform heavy mapping logic directly in Vue templates.

---

### 4. Service Layer Responsibilities

- Service hooks should:
  - fetch and return typed data
  - normalize lightweight shape differences when necessary
  - keep query cache behavior consistent

- Service hooks should not:
  - include UI rendering concerns
  - rely on component-level mutable side effects

---

### 5. Store and Component Responsibilities

- Stores keep shared/global state, not raw transport concerns.
- Components focus on UI state and presentation.
- Components should consume typed data from service hooks.

---

### 6. Mutation Payloads

- Build payloads from form/view state in component/composable.
- Keep request shape contracts typed in service layer.
- Handle response normalization in service layer if needed.

---

### 7. Practical Rule

Prefer simple typed interfaces + focused mapping at the service boundary over introducing a heavy model class architecture by default.
