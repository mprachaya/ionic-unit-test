When creating new tests from scratch for a component or view:

1. **Factory:** Add a factory function in the test file that returns a wrapper with configurable props/store.
2. **Mount strategy:** Use **`mount`** (not `shallowMount`) for view/page components — the stubs in `__mocks__/@ionic/vue.js` render real HTML tags so `find('ion-input')`, `find('ion-text[color="danger"]')` etc. work.
3. **Imports:** Import controllers **normally** from `@ionic/vue` in both the component and the test file. The `__mocks__/@ionic/vue.js` + `vue3-jest-fix.js` handle mocking automatically.
4. **Mock reset:** Add `beforeEach` with `jest.clearAllMocks()` and reset controller mocks:
   ```js
   loadingController.create.mockResolvedValue({ present: jest.fn(), dismiss: jest.fn() });
   toastController.create.mockResolvedValue({ present: jest.fn(), dismiss: jest.fn() });
   ```
5. **Required cases:** Include at least one **Happy Path** (success) and one **Edge Case** (error or empty state).
6. **Comment descriptions:** Add a short comment inside each `it()`:
   - **Happy Path:** e.g. `// Happy Path: user submits valid form and sees success message`
   - **Edge Case:** e.g. `// Edge Case: empty email shows validation error`
7. **Element selection:** Do NOT use `data-testid`. Use tag selectors (`find('ion-input')`), attribute selectors (`find('ion-text[color="danger"]')`), and text content (`wrapper.text()`).
8. **Views:** If the source file is a view, include necessary imports for Ionic components and controllers.

**Do not:**
- **Modify the component under test.** Write tests against the component as it is.
- **Chase coverage.** Test public behavior (props, events, store dispatch, outcomes).

Apply this pattern to the component or view we are testing.
