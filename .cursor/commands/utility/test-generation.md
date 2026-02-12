When creating new tests from scratch for a component or view:

1. **Factory:** Add a factory function in the test file that returns a wrapper with configurable props.
2. **Required cases:** Include at least one **Happy Path** (success) and one **Edge Case** (error or empty state).
3. **Comment descriptions:** Add a short comment above or inside each `it()` so it’s clear what is being tested:
   - **Happy Path:** e.g. `// Happy Path: user submits valid form and sees success message`
   - **Edge Case:** e.g. `// Edge Case: empty email shows validation error` or `// Edge Case: network error shows toast`
   Use the phrase **"Edge Case:"** in the comment when the test is for an error, empty state, or boundary condition—so it’s obvious this is an edge case.
4. **Views:** If the source file is a view, include necessary imports for IonicVue and IonPage in the test.

**Do not:**
- **Modify the component under test.** Write tests against the component as it is. Do not add `defineExpose`, test-only helpers (e.g. `setCredentials`), or change the component (e.g. to Options API) just to make tests easier.
- **Chase coverage.** Test public behavior (props, events, store dispatch, outcomes). Do not add code to the source file or over-engineer tests solely to increase coverage.

Apply this pattern to the component or view we are testing.
