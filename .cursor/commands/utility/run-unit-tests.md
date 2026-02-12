Run unit tests with Jest (recommended) or via Vue CLI.

---

## Why two ways to run tests?

- **`test` / `test:unit`** – Uses **Vue CLI** (`vue-cli-service test:unit`). Vue CLI runs Jest under the hood via `@vue/cli-plugin-unit-jest`, but it can trigger system errors on some machines (e.g. `node-ipc` / `uv_interface_addresses`). Use this only if it works on your setup.
- **`test:jest`** – Runs **Jest directly** (`npx jest`). Same tests, same config (`jest.config.js`), no Vue CLI layer. **Use this if the Vue CLI test command fails or you want a simpler pipeline.**

---

## Recommended: run with Jest

**Run all unit tests:**
```bash
npm run test:jest
```

**Run with coverage:**
```bash
npm run test:coverage
```

**Run with coverage and open the report in the browser (Mac):**
```bash
npm run test:coverage:open
```

On Windows, open the report manually after `npm run test:coverage`:
```bash
start coverage/lcov-report/index.html
```

---

## Coverage report and line highlighting

**Where to see line-by-line coverage**

1. **HTML report (recommended)**  
   Run `npm run test:coverage:open` (or `npm run test:coverage` then open `coverage/lcov-report/index.html`).  
   In the report, open **src → views → LoginPage.vue** to see which lines are covered (green) or not (red).

2. **Why line numbers don’t match `LoginPage.vue`**  
   Coverage is collected on the **compiled** output of the SFC (template + script compiled to one JS file). The report shows that compiled file, so the line numbers (e.g. 196–354) are not the same as in your editor (e.g. 1–97). The green/red highlighting is correct; it just refers to the compiled lines.

3. **IDE inline coverage (e.g. Cursor / VS Code)**  
   Install an extension that reads `lcov` (e.g. **Coverage Gutters**). Run `npm run test:coverage` so that `coverage/lcov.info` (and optionally `coverage/lcov-report/`) exists, then use the extension’s “Watch” or “Load” action. Coverage will appear in the editor gutter; for `.vue` files the extension may still use the compiled mapping, so highlights can appear on a different view or line range.

**Why LoginPage is ~50%**

- The **script** (validation, dispatch, `setCredentials`, `onSubmit`) is largely covered by the three tests.
- The **template** compiles to a lot of code (render helpers, vnodes); only part of that runs when the component mounts.
- **Branches** (e.g. `loadingController?.create`, `if (loading)`) and some template branches are not taken in tests because the Ionic mock doesn’t provide `loadingController` to the component in this setup.

Raising coverage further would mean either testing with a full Ionic environment or adding more unit tests that trigger the loading path and template branches (e.g. by stubbing or injecting the controller).

---

## Scripts in `package.json`

| Script | Command | Description |
|--------|--------|-------------|
| `test` | `vue-cli-service test:unit` | Run tests via Vue CLI |
| `test:unit` | same as `test` | Alias for Vue CLI test |
| `test:jest` | `jest` | Run tests with Jest directly (recommended) |
| `test:coverage` | `jest --coverage` | Jest with coverage report |
| `test:coverage:open` | `jest --coverage && open ...` | Coverage + open report (Mac) |

---

**If the run reports errors or failures:** Review the failing test(s) and the error output, then ask to fix them (e.g. “Fix the failing unit tests” or “Apply the test-fixer rules to the failing spec”). Re-run the tests after fixes to confirm they pass.
