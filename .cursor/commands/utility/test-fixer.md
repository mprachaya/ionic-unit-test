When fixing broken tests or improving coverage:

1. **Fix strategy:** First check if the failure is due to a missing Ionic dependency in the test’s `global.plugins` array (e.g. add IonicVue).
2. **Coverage:** If coverage is below 80%, find missing branches (e.g. `if/else` in `ionChange` handlers) and add tests for them.
3. **Clean-up:** Ensure `jest.clearAllMocks()` is called in `afterEach` to avoid test leakage.

Apply this to the current failing or low-coverage test file.
