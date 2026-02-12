When writing or editing unit tests for this Ionic Vue project, follow these standards:

## Mock Architecture
- **`__mocks__/@ionic/vue.js`** — centralized manual mock with component stubs (render real HTML tags) + controller mocks (`jest.fn()`). Loaded via `moduleNameMapper` in `jest.config.js`.
- **`vue3-jest-fix.js`** — custom transform wrapper around `@vue/vue3-jest`. Fixes a variable collision where the compiled `<template>` overwrites the `<script>` module reference. Renames `_vue → _vue2` in the render section.
- **No `jest.mock('@ionic/vue')` needed** in test files or setup files.
- Import controllers **normally** from `@ionic/vue` — no special import paths.

## Mount Strategy
- Use **`mount`** for view/page components (`src/views/*.vue`) — stubs render actual tags.
- Use **`shallowMount`** for non-view components when isolation is needed.

## Element Selection (no data-testid)
- `find('ion-input')`, `find('ion-text[color="danger"]')` etc.
- `findAll('ion-input')` for multiple same-type elements.
- `wrapper.text()` with `toContain(...)` for text content.
- `find('ion-button').attributes('disabled')` for attribute checks.

## Async Handling
- Use `await flushPromises()` after async operations (store dispatch, controller create).
- Use `await wrapper.vm.$nextTick()` after `setData()`.

## Mock Reset Pattern
```js
beforeEach(() => {
  jest.clearAllMocks();
  loadingController.create.mockResolvedValue({ present: jest.fn(), dismiss: jest.fn() });
  toastController.create.mockResolvedValue({ present: jest.fn(), dismiss: jest.fn() });
});
```

Apply these to the current test file or to the tests we are about to write.
