@.cursor-blueprint.md

## Prerequisites (check before generating)

Before creating the component, verify these files exist. If missing, create them first:

1. **`src/utils/validators.js`** — `validateEmail(email)` and `validatePassword(password)` pure functions.
2. **`src/store/index.js`** + **`src/store/modules/auth.js`** — Vuex 4 store with namespaced `auth` module and `loginUser` action.
3. **`__mocks__/@ionic/vue.js`** — Manual mock loaded via `moduleNameMapper` in `jest.config.js`. Must include component stubs + controller mocks (`loadingController`, `toastController`, etc. with `jest.fn()`).

---

## Component Requirements

Create `LoginPage.vue` in `src/views` using Ionic components. **Use Options API format** (`data()`, `computed`, `methods` — NOT Composition API / `setup()`). Do NOT add `data-testid` or any test-only `id` attributes.

### Imports — use normal `@ionic/vue` imports
```js
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonButton, IonText,
  loadingController, toastController,
} from '@ionic/vue';
import { validateEmail, validatePassword } from '@/utils/validators';
```

Components and controllers are imported from `@ionic/vue` as normal. The `vue3-jest-fix.js` transform wrapper in `jest.config.js` handles the `@vue/vue3-jest` variable collision automatically — no special import paths needed.

### 1. Form & Validation (Methods Testing)
- Two `ion-input` fields: email (`type="email"`) and password (`type="password"`), bound with `v-model`.
- `data()`: `email`, `password`, `errorMessage`, `loginSuccess`, `activeLoading`, `activeToast`.
- `computed`: `isFormValid` — true when both fields are non-empty.
- `handleLogin()` method:
  - Validates inputs → sets `this.errorMessage` if invalid.
  - If valid → shows `loadingController`, dispatches `auth/loginUser` via `this.$store.dispatch`.
  - On success → `this.loginSuccess = true`.
  - On failure → `this.errorMessage` = error message, shows toast via `toastController`.
  - Finally → always dismisses loading.

### 2. Ionic Lifecycle (Lifecycle Testing)
- `ionViewDidEnter()`: Clear form fields, reset `errorMessage` and `loginSuccess`.
- `ionViewWillLeave()`: Dismiss any active loading or toast if still present.

### 3. Conditional Rendering (v-if / v-else)
- `ion-text[color="danger"]` with `errorMessage` shown via `v-if`.
- Welcome message shown when `loginSuccess` is true (`v-if`), form hidden (`v-else`).
- Login button `:disabled="!isFormValid"`.

---

## Test File Requirements

Create `tests/unit/views/LoginPage.spec.js`.

### Imports — same pattern as the component
```js
import { mount, flushPromises } from '@vue/test-utils';
import { createStore } from 'vuex';
import LoginPage from '@/views/LoginPage.vue';
import { loadingController, toastController } from '@ionic/vue';
import * as validators from '@/utils/validators';
```

**Key rules:**
- Use **`mount`** (not `shallowMount`) for view components — the mock stubs in `__mocks__/@ionic/vue.js` render actual tags, so `find('ion-input')` and `find('ion-text[color="danger"]')` work.
- Import controllers from **`@ionic/vue`** — same as the component. The `__mocks__/@ionic/vue.js` mock provides them via `moduleNameMapper`.

### Element Selection Strategy (no data-testid)

- **By tag:** `find('ion-input')`, `find('ion-button')`, `find('ion-text[color="danger"]')`
- **Multiple same-type:** `findAll('ion-input')` then `[0]` = email, `[1]` = password
- **By disabled:** `find('ion-button').attributes('disabled')`
- **By text content:** `wrapper.text()` with `toContain('Login successful!')`

### Test Setup
- **Factory function** with configurable mock Vuex store (mock `auth/loginUser` action).
- **`beforeEach`**: `jest.clearAllMocks()`, reset `loadingController.create.mockResolvedValue(...)` and `toastController.create.mockResolvedValue(...)` with fresh `{ present, dismiss }` mocks.
- Use `flushPromises` for async operations.
- Add `// Happy Path:` and `// Edge Case:` comments in each `it()`.

### describe('LoginPage - Rendering')
- `it('renders email and password inputs')` — `findAll('ion-input')` returns 2
- `it('renders login button')` — `find('ion-button')` exists
- `it('does not show error message initially')` — `find('ion-text[color="danger"]')` does not exist
- `it('does not show success message initially')` — `wrapper.text()` does not contain "Login successful!"

### describe('LoginPage - Conditional Rendering (v-if/v-else)')
- `it('shows error message when errorMessage is set')` — set via `wrapper.setData`, check `find('ion-text[color="danger"]')` appears
- `it('hides error message when errorMessage is cleared')` — set then clear, verify gone
- `it('shows success message and hides form when loginSuccess is true')` — `wrapper.text()` contains welcome, `findAll('ion-input')` is empty
- `it('disables login button when fields are empty')` — `find('ion-button').attributes('disabled')` is defined

### describe('LoginPage - Methods')
- `it('calls validateEmail and validatePassword on handleLogin')` — `jest.spyOn` on validators
- `it('sets errorMessage when email validation fails')` — call with bad email
- `it('sets errorMessage when password validation fails')` — call with short password
- `it('dispatches auth/loginUser when validation passes')` — verify mock action called with `{ email, password }`
- `it('shows loading during login request')` — verify `loadingController.create` + present called
- `it('dismisses loading after login completes')` — verify dismiss called
- `it('sets loginSuccess to true on successful login')` — mock action resolves
- `it('sets errorMessage and shows toast on failed login')` — mock action rejects, verify `toastController.create`
- `it('dismisses loading even when login fails')` — verify dismiss in finally

### describe('LoginPage - Lifecycle')
- `it('clears form and errors on ionViewDidEnter')` — set values, call `wrapper.vm.ionViewDidEnter()`, verify all reset
- `it('dismisses active loading on ionViewWillLeave')` — start login, call `wrapper.vm.ionViewWillLeave()`, verify dismiss

---

Also update `src/router/index.js` to add the `/login` route pointing to `LoginPage.vue`.
