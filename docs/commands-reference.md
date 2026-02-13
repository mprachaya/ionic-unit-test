# Cursor Commands Reference

รายละเอียดของทุก Command ที่อยู่ใน `.cursor/commands/` สำหรับใช้งานใน Cursor Chat โดยพิมพ์ `/` ตามด้วยชื่อ Command

---

## Phase Commands (สร้างไฟล์ตามเฟสการเรียนรู้)

### `/phases/phase-1-utils`

| | |
| --- | --- |
| **File** | `.cursor/commands/phases/phase-1-utils.md` |
| **What it does** | สร้าง `src/utils/validators.js` (validate email + password) และสร้าง test file `tests/unit/utils/validators.spec.js` พร้อม 100% coverage รวม edge cases |
| **When to use** | เริ่มต้นฝึกเขียน Unit Test ครั้งแรก หรือหลัง clean แล้วต้องการสร้างใหม่ |
| **Example** | พิมพ์ `/phases/phase-1-utils` ใน Cursor Chat |

---

### `/phases/phase-2-store`

| | |
| --- | --- |
| **File** | `.cursor/commands/phases/phase-2-store.md` |
| **What it does** | สร้าง Vuex 4 module `src/store/modules/auth.js` (State: user, isAuthenticated; Mutation: SET_USER; Action: loginUser ที่ POST ผ่าน axios) และสร้าง `tests/unit/store/auth.spec.js` ที่ mock axios แล้วเทสทั้ง success และ fail scenarios |
| **When to use** | หลังจากทำ Phase 1 เสร็จแล้ว ต้องการฝึกเทส Vuex Store |
| **Example** | พิมพ์ `/phases/phase-2-store` ใน Cursor Chat |

---

### `/phases/phase-3-services`

| | |
| --- | --- |
| **File** | `.cursor/commands/phases/phase-3-services.md` |
| **What it does** | สร้าง 3 Services ใน `src/services/` ที่ใช้ Capacitor plugins: **CameraService.js** (Camera.getPhoto), **GeolocationService.js** (Geolocation.getCurrentPosition), **FilesystemService.js** (Filesystem.readFile/writeFile) พร้อม test file แต่ละตัวใน `tests/unit/services/` ที่ mock Capacitor plugin |
| **When to use** | หลังจากทำ Phase 2 เสร็จแล้ว ต้องการฝึกเทส Service ที่ใช้ Native Plugin |
| **Example** | พิมพ์ `/phases/phase-3-services` ใน Cursor Chat |

---

### `/phases/phase-4-login-page`

| | |
| --- | --- |
| **File** | `.cursor/commands/phases/phase-4-login-page.md` |
| **What it does** | สร้าง `src/views/LoginPage.vue` (Options API) ที่ใช้ Ionic components, validators, Vuex store dispatch, loading/toast controllers พร้อม conditional rendering (v-if/v-else) และ lifecycle hooks สร้าง test file `tests/unit/views/LoginPage.spec.js` ที่ครอบคลุม 20 test cases โดยไม่ใช้ `data-testid` Import controllers ปกติจาก `@ionic/vue` — `vue3-jest-fix.js` จัดการ collision ให้อัตโนมัติ |
| **Prerequisites** | ตรวจสอบว่ามีไฟล์ `src/utils/validators.js`, `src/store/modules/auth.js`, `__mocks__/@ionic/vue.js` ก่อนรัน |
| **When to use** | หลังจากทำ Phase 1-3 เสร็จแล้ว ต้องการฝึกเทส Component ที่รวมทุกส่วน |
| **Example** | พิมพ์ `/phases/phase-4-login-page` ใน Cursor Chat |

---

### `/phases/phase-5-lifecycle-vue`

| | |
| --- | --- |
| **File** | `.cursor/commands/phases/phase-5-lifecycle-vue.md` |
| **What it does** | สร้าง `src/views/LifecycleDemoPage.vue` (Options API) ที่สาธิต Vue และ Ionic lifecycle hooks (`ionViewWillEnter`, `ionViewDidEnter`, `ionViewWillLeave`, `ionViewDidLeave`, `mounted`) พร้อมปุ่ม Show Loading / Show Toast และสร้าง test file `tests/unit/views/LifecycleDemoPage.spec.js` สำหรับเทส lifecycle โดยเรียกผ่าน `wrapper.vm` และเพิ่ม route `/lifecycle-demo` |
| **Prerequisites** | ตรวจสอบว่ามี `__mocks__/@ionic/vue.js` ก่อนรัน |
| **When to use** | หลังจาก Phase 4 เมื่อต้องการฝึกเทส lifecycle hooks แบบมี component และ spec จริง |
| **Example** | พิมพ์ `/phases/phase-5-lifecycle-vue` ใน Cursor Chat |

---

### `/phases/clean-phases`

| | |
| --- | --- |
| **File** | `.cursor/commands/phases/clean-phases.md` |
| **What it does** | ลบไฟล์ทั้งหมดที่ถูกสร้างจาก Phase 1-5 (source files + test files + coverage folder) เพื่อให้ repo กลับไปสถานะเริ่มต้นพร้อมฝึกใหม่ คง `.gitkeep`, scaffolding, `__mocks__/`, และ `vue3-jest-fix.js` ไว้ |
| **When to use** | เมื่อต้องการเริ่มฝึก Phase 1-5 ใหม่ตั้งแต่ต้น |
| **Example** | พิมพ์ `/phases/clean-phases` ใน Cursor Chat |

---

## Utility Commands (จัดการโปรเจกต์)

### `/utility/run-unit-tests`

| | |
| --- | --- |
| **File** | `.cursor/commands/utility/run-unit-tests.md` |
| **What it does** | รัน Unit Test ด้วย Jest (แนะนำ) หรือ Vue CLI อธิบายความแตกต่างระหว่าง `test:jest` กับ `test:unit`, วิธีดู coverage report ทั้ง terminal และ HTML |
| **When to use** | เมื่อต้องการรันเทสและดูผล coverage |
| **Example** | พิมพ์ `/utility/run-unit-tests` ใน Cursor Chat |

---

## AI-Assisted Testing Commands (ให้ AI ช่วยเขียน/แก้เทส)

### `/utility/test-generation`

| | |
| --- | --- |
| **File** | `.cursor/commands/utility/test-generation.md` |
| **What it does** | สร้างเทสใหม่จากศูนย์สำหรับ component/view โดยใช้ pattern: factory function, `mount` สำหรับ views, Happy Path + Edge Case, import controllers ปกติจาก `@ionic/vue`, element selection โดยไม่ใช้ `data-testid` |
| **When to use** | เมื่อต้องการสร้าง test file ใหม่สำหรับ component ที่ยังไม่มีเทส |
| **Example** | เปิดไฟล์ component แล้วพิมพ์ `/utility/test-generation` ใน Cursor Chat |

---

### `/utility/test-fixer`

| | |
| --- | --- |
| **File** | `.cursor/commands/utility/test-fixer.md` |
| **What it does** | วิเคราะห์และแก้ไขเทสที่พัง โดยเช็ก: jest.config.js ใช้ `vue3-jest-fix.js` transform, `__mocks__/@ionic/vue.js` มี controllers ครบ, missing branches ที่ทำให้ coverage ต่ำ, `jest.clearAllMocks()` ใน `beforeEach` |
| **When to use** | เมื่อเทสรันไม่ผ่าน หรือ coverage ต่ำกว่าเป้า |
| **Example** | เปิดไฟล์ test ที่พัง แล้วพิมพ์ `/utility/test-fixer` ใน Cursor Chat |

---

### `/utility/coverage-report`

| | |
| --- | --- |
| **File** | `.cursor/commands/utility/coverage-report.md` |
| **What it does** | วิเคราะห์ว่าทำไม coverage ของ test file ถึงต่ำ โดย: ระบุ source file ที่เทส, รัน Jest coverage เฉพาะไฟล์นั้น, รายงานตัวเลข + เหตุผลที่ต่ำ (compiled SFC, template branches, untested paths) โดยไม่แก้ไข component |
| **When to use** | เมื่อต้องการเข้าใจว่าทำไม coverage ถึงต่ำ โดยไม่ต้องแก้โค้ด |
| **Example** | ลาก test file เข้า Chat แล้วพิมพ์ `/utility/coverage-report` |

---

### `/utility/ionic-vue-jest`

| | |
| --- | --- |
| **File** | `.cursor/commands/utility/ionic-vue-jest.md` |
| **What it does** | ใช้มาตรฐาน Ionic Vue Jest กับไฟล์เทสปัจจุบัน: mock architecture (`__mocks__/@ionic/vue.js` + `vue3-jest-fix.js` + `moduleNameMapper`), ใช้ `mount` สำหรับ views, element selection โดยไม่ใช้ `data-testid`, mock reset pattern ใน `beforeEach` |
| **When to use** | เมื่อเขียนหรือแก้ไขเทส Ionic Vue และต้องการให้ AI ใช้มาตรฐานที่ถูกต้อง |
| **Example** | เปิดไฟล์ test แล้วพิมพ์ `/utility/ionic-vue-jest` ใน Cursor Chat |
