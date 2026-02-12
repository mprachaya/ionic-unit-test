# Coverage report: why is coverage low?

**How to use:** Drag the **test file** (e.g. `tests/unit/views/LoginPage.spec.js`) into the chat and run this command (or ask “why is coverage low for this test file?”). The AI will run coverage for the component that the test targets and report why the numbers are low.

---

## What the AI will do

1. **Identify the source file** under test from the test file (e.g. `LoginPage.spec.js` → `src/views/LoginPage.vue`).
2. **Run Jest coverage** scoped to that source file (and its test).
3. **Report:**
   - Current coverage (statements, branches, functions, lines).
   - **Why it’s low** (compiled SFC, template vs script, untested paths, mocks, project rule to not modify the component).
4. **Not do:** Change the component or add test-only code to raise coverage.

---

## Example prompt

After dragging `tests/unit/views/LoginPage.spec.js`:

- *“Recheck and report why coverage is low for this test file.”*
- Or: *“@coverage-report why is coverage low?”*

You will get a short report (current numbers + bullet reasons) and, if useful, a reminder to open the HTML report for line-by-line highlighting.
