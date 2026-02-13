@.cursor-blueprint.md

## Prerequisites (check before generating)

Before creating the component, verify these files exist. If missing, create them first:

1. **`__mocks__/@ionic/vue.js`** — Manual mock loaded via `moduleNameMapper` in `jest.config.js`. Must include component stubs + controller mocks (`loadingController`, `toastController`, etc. with `jest.fn()`).

---

## Component Requirements

Create `LifecycleDemoPage.vue` in `src/views` using Ionic components. **Use Options API format** (`data()`, `computed`, `methods` — NOT Composition API / `setup()`). Do NOT add `data-testid` or any test-only `id` attributes. This page exists to practice testing Vue and Ionic lifecycle hooks.

### Imports — use normal `@ionic/vue` imports
```js
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonText,
  loadingController, toastController,
} from '@ionic/vue';
```

### 1. Data and display
- `data()`: `message` (string, display text), `enterCount` (number), `leaveCount` (number), `cleanedUp` (boolean), `activeLoading` (null or ref), `activeToast` (null or ref).
- Template: Show `message`, `enterCount`, `leaveCount`, and `cleanedUp` in the content (e.g. `ion-text` or paragraphs) so tests can assert state changes.

### 2. Ionic Lifecycle (Lifecycle Testing)
- **`ionViewWillEnter()`:** Increment `this.enterCount` (so tests can assert the hook ran).
- **`ionViewDidEnter()`:** Reset `this.message` to `''` (so tests can assert "clear on enter").
- **`ionViewWillLeave()`:** Increment `this.leaveCount` (so tests can assert the hook ran). If `this.activeLoading` exists, call `this.activeLoading.dismiss()` and set to `null`. If `this.activeToast` exists, call `this.activeToast.dismiss()` and set to `null`.
- **`ionViewDidLeave()`:** Set `this.cleanedUp = true` (so tests can assert cleanup ran).

### 3. Methods (to trigger loading/toast for lifecycle tests)
- **`showLoading()`:** Call `loadingController.create()`, then `present()`, assign the returned object (with `dismiss` mock) to `this.activeLoading`.
- **`showToast()`:** Call `toastController.create()`, then `present()`, assign the returned object to `this.activeToast`.
- Buttons in template: one that calls `showLoading`, one that calls `showToast`.

### 4. Vue lifecycle (optional, for learning)
- **`mounted()`:** Set `this.message` to a default e.g. `'Ready'` so tests can assert initial state after mount (effect of `mounted`).

---

## Test File Requirements

Create `tests/unit/views/LifecycleDemoPage.spec.js`.

### Imports — same pattern as the component
```js
import { mount, flushPromises } from '@vue/test-utils';
import LifecycleDemoPage from '@/views/LifecycleDemoPage.vue';
import { loadingController, toastController } from '@ionic/vue';
```

**Key rules:**
- Use **`mount`** (not `shallowMount`) for the view. Import controllers from **`@ionic/vue`** — the `__mocks__/@ionic/vue.js` mock provides them.

### Element Selection Strategy (no data-testid)
- **By tag:** `find('ion-button')`, `find('ion-text')`, `wrapper.text()` for content.
- **Multiple buttons:** `findAll('ion-button')` and index by order (e.g. [0] = Show Loading, [1] = Show Toast) or by text if stable.

### Test Setup
- **Factory function** `createWrapper()` that mounts `LifecycleDemoPage` with no store (or minimal global provide if needed).
- **`beforeEach`:** `jest.clearAllMocks()`, reset `loadingController.create.mockResolvedValue(...)` and `toastController.create.mockResolvedValue(...)` with fresh `{ present, dismiss }` mocks.
- Use `flushPromises` after async operations.

### describe('LifecycleDemoPage - Rendering')
- `it('renders title and buttons')` — header title text, `findAll('ion-button')` length at least 2.
- `it('shows initial message after mounted')` — assert `wrapper.vm.message` is the default (e.g. `'Ready'`). Do not rely on `wrapper.text()` containing it — the `ion-text` stub may not expose interpolated content in the wrapper’s text output.

### describe('LifecycleDemoPage - Lifecycle')
- `it('increments enterCount on ionViewWillEnter')` — call `wrapper.vm.ionViewWillEnter()`, expect `wrapper.vm.enterCount` to be 1; call again, expect 2.
- `it('clears message on ionViewDidEnter')` — set `wrapper.vm.message = 'test'`, call `wrapper.vm.ionViewDidEnter()`, expect `wrapper.vm.message` to be `''`.
- `it('dismisses active loading on ionViewWillLeave')` — trigger `showLoading()` (e.g. click button or `wrapper.vm.showLoading()`), `await flushPromises`, then call `wrapper.vm.ionViewWillLeave()`, expect the loading `dismiss` mock to have been called.
- `it('dismisses active toast on ionViewWillLeave')` — trigger `showToast()`, `await flushPromises`, call `wrapper.vm.ionViewWillLeave()`, expect toast `dismiss` to have been called.
- `it('ionViewWillLeave does not call dismiss when no loading or toast is active')` — call `wrapper.vm.ionViewWillLeave()` without having shown loading or toast; expect `loadingDismiss` and `toastDismiss` not to have been called (covers the “null” branches and improves branch coverage).
- `it('increments leaveCount on ionViewWillLeave')` — call `wrapper.vm.ionViewWillLeave()`, expect `wrapper.vm.leaveCount` to be 1; call again, expect 2 (covers the template line that displays `leaveCount`).
- `it('sets cleanedUp to true on ionViewDidLeave')` — call `wrapper.vm.ionViewDidLeave()`, expect `wrapper.vm.cleanedUp` to be true.

---

Also update `src/router/index.js` to add the `/lifecycle-demo` route pointing to `LifecycleDemoPage.vue`.
