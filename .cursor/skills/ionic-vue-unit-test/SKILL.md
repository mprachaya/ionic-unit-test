---
name: ionic-vue-unit-test
description: Create and run unit tests for Ionic Vue apps with Jest and Vue Test Utils. Use when writing or generating tests for Ionic Vue components, Vuex store, services, or utils; when mocking Ionic controllers or Capacitor; or when the user asks about Ionic Vue testing or Jest setup.
---

# Ionic Vue Unit Testing

## When to use
- User asks to add or fix unit tests in an Ionic Vue project.
- User mentions Jest, Vue Test Utils, Vuex tests, or mocking Ionic/Capacitor.
- Generating test files for utils, store, services, or pages.

## Quick reference

### Tools
- **Vue Test Utils**: mount, wrapper.vm, findComponent (for Ionic/Shadow DOM), trigger.
- **Jest**: describe, it, expect, jest.fn(), jest.mock().

### Ionic specifics
- Use `findComponent(IonInput)` (or other Ion* components) instead of querying Shadow DOM with find().
- Call lifecycle methods on wrapper: `await wrapper.vm.ionViewDidEnter()`.
- Mock modalController, loadingController, toastController (e.g. in jest.setup.js).

### Vuex
- Mutations: pure function tests (state + payload → new state).
- Actions: mock axios (or API), call action with mock commit, assert commit calls and payloads.
- Components: provide mock store via createStore or global mocks.

### Phases (from blueprint)
1. **Utils** – Pure logic, 100% coverage including edge cases.
2. **Store** – Auth (or other) module: state, SET_USER, loginUser with mocked axios; success and fail.
3. **Services** – e.g. StorageService with @capacitor/preferences; mock Capacitor plugin, test get/set.
4. **Pages/Components** – Login page: validators, dispatch auth/loginUser, ion-loading; mock store and loading controller; test "login only when validation passes".

## Verification
Run: `npm run test:unit -- --coverage`. Open `coverage/lcov-report/index.html` for coverage report.

## Project context
Follow `.cursor-blueprint.md` and rules in `.cursor/rules/` for mocking and structure. Use `jest.setup.js` for global Ionic controller mocks.
