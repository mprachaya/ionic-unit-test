# Cursor Rules Reference

รายละเอียดของทุก Rule ที่อยู่ใน `.cursor/rules/` ซึ่ง Cursor จะนำไปใช้อัตโนมัติเมื่อเปิดไฟล์ที่ตรงกับ glob pattern ของแต่ละ rule

---

## ภาพรวม

| Rule | File | Glob (ไฟล์ที่ trigger) | Always On? |
| --- | --- | --- | --- |
| Project Standards | `ionic-vue-project.mdc` | ทุกไฟล์ | **Yes** |
| Testing Standards | `ionic-vue-testing.mdc` | `*.spec.{ts,js}`, `*.test.{ts,js}`, `tests/**` | No |
| Jest How-to | `ionic-vue-jest.mdc` | `tests/unit/**/*.spec.{ts,js}`, `*.test.{ts,js}` | No |
| Vuex Testing | `vuex-testing.mdc` | `store/**/*.{ts,js}`, `*store*.spec.{ts,js}` | No |
| Test Generation | `test-generation.mdc` | `src/components/**/*.vue`, `src/views/**/*.vue` | No |
| Test Fixer | `test-fixer.mdc` | `*.spec.{ts,js}` | No |
| Coverage Report | `coverage-report.mdc` | `tests/unit/**/*.spec.{ts,js}` | No |

---

## รายละเอียดแต่ละ Rule

### Project Standards (`ionic-vue-project.mdc`)

| | |
| --- | --- |
| **Always Apply** | Yes -- ใช้กับทุกไฟล์เสมอ |
| **Purpose** | กำหนด Tech Stack และมาตรฐานของโปรเจกต์ให้ AI รู้จักตลอดเวลา |

**สิ่งที่ Rule กำหนด:**
- Tech Stack: Ionic Vue (Vue 3), Jest + Vue Test Utils, Vuex 4 (modules), Axios
- Mocking: ต้อง mock `@ionic/vue` controllers (Modal, Toast, Loading) และ Capacitor/API ในเทส
- Vuex: mutations เป็น pure functions, actions mock `commit` + API, components ใช้ mock store
- Ionic Lifecycle: เทส `ionViewDidEnter` / `ionViewWillLeave` ผ่าน `wrapper.vm`
- Coverage Target: ~80%+ เน้นที่ store และ service logic
- Learning Phases: Utils -> Vuex -> Services -> Components/Pages

---

### Testing Standards (`ionic-vue-testing.mdc`)

| | |
| --- | --- |
| **Trigger** | เปิดไฟล์ `*.spec.{ts,js}`, `*.test.{ts,js}`, หรือไฟล์ใน `tests/` |
| **Purpose** | มาตรฐานการเขียน Unit Test สำหรับ Ionic Vue |

**สิ่งที่ Rule กำหนด:**
- **Mount strategy:** ใช้ `mount` สำหรับ view/page components, `shallowMount` สำหรับ non-view components
- **Mock architecture:** ใช้ `__mocks__/@ionic/vue.js` ผ่าน `moduleNameMapper` + `vue3-jest-fix.js` transform wrapper — ไม่ต้อง `jest.mock()` หรือ workaround ใดๆ
- **Imports:** import controllers ปกติจาก `@ionic/vue` ได้เลย ทั้งใน `.vue` และ `.spec.js`
- **Element selection:** ใช้ tag selectors (`find('ion-input')`) ไม่ใช้ `data-testid`
- **Shadow DOM:** ใช้ `find('ion-input')` หรือ `findComponent(IonInput)` แทน internal element queries
- **Lifecycle:** เรียก `await wrapper.vm.ionViewDidEnter()` เพื่อเทส lifecycle
- **Best Practices:** เทส business logic, เขียนจากมุมมองผู้ใช้, อย่าเทส framework, เน้น branch coverage

---

### Jest How-to (`ionic-vue-jest.mdc`)

| | |
| --- | --- |
| **Trigger** | เปิดไฟล์ `tests/unit/**/*.spec.{ts,js}` หรือ `*.test.{ts,js}` |
| **Purpose** | Quick reference สำหรับเทคนิค Jest ใน Ionic Vue |

**สิ่งที่ Rule กำหนด:**
- **Mock Architecture:** `__mocks__/@ionic/vue.js` (component stubs + controller mocks) + `vue3-jest-fix.js` (fixes variable collision) + `moduleNameMapper`
- **Imports:** import controllers ปกติจาก `@ionic/vue` — ไม่ต้องใช้ helper files
- **Mount:** ใช้ `mount` สำหรับ views, `shallowMount` สำหรับ non-views
- **Async:** ใช้ `flushPromises()` หลัง async operations, `$nextTick()` หลัง `setData()`
- **Element selection:** `find('ion-input')`, `find('ion-text[color="danger"]')`, `wrapper.text()`
- **Mock reset pattern:** `jest.clearAllMocks()` + `loadingController.create.mockResolvedValue(...)` ใน `beforeEach`

---

### Vuex Testing (`vuex-testing.mdc`)

| | |
| --- | --- |
| **Trigger** | เปิดไฟล์ใน `store/**/*.{ts,js}` หรือ `*store*.spec.{ts,js}` |
| **Purpose** | Pattern สำหรับเทส Vuex 4 (mutations, actions, components ที่ใช้ store) |

**สิ่งที่ Rule กำหนด:**
- **Mutations:** เทสเป็น pure functions -- ส่ง state + payload เข้าไป แล้ว assert state ใหม่
- **Actions:** mock API (axios) แล้ว assert `commit` calls + arguments ทั้ง success/failure
- **Components:** ใช้ `createStore()` หรือ test helper สร้าง mock store, dispatch actions แล้ว assert side effects
- ตัวอย่าง: `expect(commit).toHaveBeenCalledWith('SET_USER', expect.any(Object))`

---

### Test Generation (`test-generation.mdc`)

| | |
| --- | --- |
| **Trigger** | เปิดไฟล์ `src/components/**/*.vue` หรือ `src/views/**/*.vue` |
| **Purpose** | กฎสำหรับสร้างเทสใหม่จากศูนย์ |

**สิ่งที่ Rule กำหนด:**
- สร้าง **factory function** ในทุก test file เพื่อสร้าง wrapper พร้อม configurable props/store
- ใช้ **`mount`** สำหรับ views (ไม่ใช่ `shallowMount`)
- ทุกเทสต้องมีอย่างน้อย 1 **Happy Path** + 1 **Edge Case** พร้อม comments
- **Imports:** import controllers ปกติจาก `@ionic/vue`
- **Element selection:** ห้ามใช้ `data-testid` — ใช้ tag/attribute selectors
- **Mock reset:** ใส่ `beforeEach` กับ `jest.clearAllMocks()` + controller mock reset

**ข้อห้ามสำคัญ:**
- **ห้ามแก้ไข component ต้นทาง** -- ไม่เพิ่ม `defineExpose` หรือ test-only helpers
- **ห้ามไล่ coverage** -- เทส public behavior เท่านั้น ไม่ over-engineer เพื่อเพิ่มตัวเลข

---

### Test Fixer (`test-fixer.mdc`)

| | |
| --- | --- |
| **Trigger** | เปิดไฟล์ `*.spec.{ts,js}` |
| **Purpose** | กฎสำหรับ debug และแก้ไขเทสที่พัง |

**สิ่งที่ Rule กำหนด:**
- **Fix Strategy:** เช็ก `jest.config.js` ใช้ `vue3-jest-fix.js` transform, เช็ก `__mocks__/@ionic/vue.js` มี controllers ครบ, เช็ก missing Ionic dependency ใน `global.plugins`
- **Coverage:** ถ้า coverage < 80% ให้หา missing branches (เช่น `if/else` ใน handlers)
- **Clean-up:** ต้องมี `jest.clearAllMocks()` ใน `beforeEach` พร้อม controller mock reset

---

### Coverage Report (`coverage-report.mdc`)

| | |
| --- | --- |
| **Trigger** | เปิดไฟล์ `tests/unit/**/*.spec.{ts,js}` |
| **Purpose** | วิเคราะห์และรายงานว่าทำไม coverage ถึงต่ำ โดยไม่แก้ไข component |

**สิ่งที่ Rule กำหนด:**
1. ระบุ source file จาก test file (เช่น `LoginPage.spec.js` -> `src/views/LoginPage.vue`)
2. รัน Jest coverage เฉพาะไฟล์นั้น
3. รายงาน: ตัวเลข coverage ปัจจุบัน + เหตุผลที่ต่ำ (compiled SFC, template branches, untested paths)

**ข้อห้าม:**
- ห้ามแก้ไข component เพื่อเพิ่ม coverage
- ห้ามแนะนำ `defineExpose` หรือ test-only helpers (ยกเว้นผู้ใช้ขอเอง)
- ห้าม over-engineer เทสเพื่อเพิ่มตัวเลข
