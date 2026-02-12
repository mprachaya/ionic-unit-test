When writing or editing unit tests for this Ionic Vue project, follow these standards:

- **Setup:** Use `shallowMount` by default to keep tests fast.
- **Ionic Spies:** Always mock `@ionic/vue` controllers (Loading, Toast, Modal) using `jest.fn()`.
- **Async:** Use `await wrapper.vm.$nextTick()` or `flushPromises()` after triggering Ionic events.
- **Component selection:** Favor `findComponent(IonButton)` (or other Ion* components) over CSS selectors for type safety.

Apply these to the current test file or to the tests we are about to write.
