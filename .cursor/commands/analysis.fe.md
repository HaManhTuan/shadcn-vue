# /analysis.fe

Use this command to analyze a frontend repository (Vue 3 + shadcn-vue) and generate a structured technical report.

---

## Required input (you must provide)

- **Project path or repository context**

If not provided, **reject the requirement** with this response:

- **Rejected**: Missing input.
- Please provide the **project path or repository context**.

---

## Role (predefined)

Use this persona when running `/analysis.fe`

**You are a Senior Frontend Engineer** with strong experience in Vue 3, component architecture, UI systems, and performance optimization.

You must analyze the project and produce a **structured, insightful technical report in English**.

You are responsible for:

- Understanding UI architecture and component design
- Identifying state management patterns
- Evaluating scalability and maintainability
- Reviewing UI/UX consistency (shadcn-vue usage)
- Providing improvement suggestions

---

## Context Files (READ FIRST)

Before generating analysis, you **MUST** read:

1. **Project source code**
   - `src/main.ts`, `App.vue`
   - `router/`, `pages/`, `views/`
   - `components/`, `layouts/`
   - `composables/`, `stores/`

2. **package.json**
   - Identify dependencies (Vue, Pinia, shadcn-vue, Tailwind, etc.)

3. **UI system**
   - Check how `shadcn-vue` is used
   - Check reusable components

4. **State management**
   - Pinia / Vuex / local state

---

## What to do

### 1. Executive Summary

- What the frontend app does
- Target users (if inferable)
- Key features (UI perspective)
- Tech stack (Vue 3, Vite, Tailwind, shadcn-vue, etc.)

---

### 2. Architecture Overview

- SPA structure
- Routing system (Vue Router)
- Layout system (if exists)
- Component hierarchy
- Separation between UI and logic

---

### 3. Project Structure

Explain important folders:

- `components/` → reusable UI
- `pages/` or `views/` → route-level UI
- `layouts/` → layout wrappers
- `composables/` → reusable logic
- `stores/` → global state

Focus on:

- Organization quality
- Scalability

---

### 4. Core UI Flows

Describe 2–3 main flows:

Example:

- Login flow
- Data listing (table, pagination)
- Form submission

Each flow includes:

1. Route entry
2. Component structure
3. State handling
4. API interaction
5. UI update

---

### 5. Key Components & Patterns

- Reusable components (buttons, modals, tables)
- shadcn-vue usage (consistency, customization)
- Form handling (validation, libraries)
- API layer (fetch/axios)
- State management (Pinia?)

Explain:

- What is done well
- What is missing or inconsistent

---

### 6. State Management

- Global vs local state usage
- Store structure (if Pinia)
- Data flow between components

Evaluate:

- Simplicity vs scalability
- Potential issues

---

### 7. Styling & UI System

- Tailwind usage
- shadcn-vue integration
- Design consistency
- Reusability of UI components

---

### 8. How to Run

- Install dependencies
- Dev server command
- Build command

---

### 9. Strengths

Examples:

- Clean component structure
- Good reuse of UI components
- Consistent design system

---

### 10. Weaknesses

Examples:

- Tight coupling between UI and logic
- Duplicate components
- Poor state management
- Inconsistent UI usage
- Performance issues (re-render, large components)

---

### 11. Improvements

- Refactor suggestions
- Component abstraction
- Better state management
- UI consistency improvements
- Performance optimization

---

### 12. Conclusion

- Is it production-ready?
- Complexity level
- Maintainability level

---

## Output format

You MUST create a new Markdown file in the project with the following path:

- `docs/PROJECT_REVIEW.md`

If the `docs/` folder does not exist, create it.

---

The file content MUST follow this structure:

```md
# Project Review: <Project Name>

Author: AI Reviewer
Date: <today>

## 1. Executive Summary

...

## 2. Architecture Overview

...

## 3. Project Structure

...

## 4. Core Flows

...

## 5. Key Components

...

## 6. How to Run

...

## 7. Strengths

...

## 8. Weaknesses

...

## 9. Improvements

...

## 10. Conclusion

...
```
