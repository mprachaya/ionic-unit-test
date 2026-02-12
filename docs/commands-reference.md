# Cursor Commands Reference

รายละเอียดของทุก Command ที่อยู่ใน `.cursor/commands/` สำหรับใช้งานใน Cursor Chat โดยพิมพ์ `/` ตามด้วยชื่อ Command

---

## Phase Commands (สร้างไฟล์ตามเฟสการเรียนรู้)

### `/phase-1-utils`

| | |
| --- | --- |
| **File** | `.cursor/commands/phase-1-utils.md` |
| **What it does** | สร้าง `src/utils/validators.js` (validate email + password) และสร้าง test file `tests/unit/utils/validators.spec.js` พร้อม 100% coverage รวม edge cases |
| **When to use** | เริ่มต้นฝึกเขียน Unit Test ครั้งแรก หรือหลัง clean แล้วต้องการสร้างใหม่ |
| **Example** | พิมพ์ `/phase-1-utils` ใน Cursor Chat |

---

### `/phase-2-store`

| | |
| --- | --- |
| **File** | `.cursor/commands/phase-2-store.md` |
| **What it does** | สร้าง Vuex 4 module `src/store/modules/auth.js` (State: user, isAuthenticated; Mutation: SET_USER; Action: loginUser ที่ POST ผ่าน axios) และสร้าง `tests/unit/store/auth.spec.js` ที่ mock axios แล้วเทสทั้ง success และ fail scenarios |
| **When to use** | หลังจากทำ Phase 1 เสร็จแล้ว ต้องการฝึกเทส Vuex Store |
| **Example** | พิมพ์ `/phase-2-store` ใน Cursor Chat |

---

### `/phase-3-services`

| | |
| --- | --- |
| **File** | `.cursor/commands/phase-3-services.md` |
| **What it does** | สร้าง 3 Services ใน `src/services/` ที่ใช้ Capacitor plugins: **CameraService.js** (Camera.getPhoto), **GeolocationService.js** (Geolocation.getCurrentPosition), **FilesystemService.js** (Filesystem.readFile/writeFile) พร้อม test file แต่ละตัวใน `tests/unit/services/` ที่ mock Capacitor plugin |
| **When to use** | หลังจากทำ Phase 2 เสร็จแล้ว ต้องการฝึกเทส Service ที่ใช้ Native Plugin |
| **Example** | พิมพ์ `/phase-3-services` ใน Cursor Chat |

---

### `/phase-4-login-page`

| | |
| --- | --- |
| **File** | `.cursor/commands/phase-4-login-page.md` |
| **What it does** | สร้าง `src/views/LoginPage.vue` ที่ใช้ Ionic components (ion-input, ion-button), ใช้ validators จาก utils, dispatch `auth/loginUser`, แสดง ion-loading ระหว่าง request และสร้าง test file ที่ mock Vuex store + loading controller แล้วเทสว่า login action ถูกเรียกเฉพาะเมื่อ validation ผ่าน |
| **When to use** | หลังจากทำ Phase 1-3 เสร็จแล้ว ต้องการฝึกเทส Component ที่รวมทุกส่วนเข้าด้วยกัน |
| **Example** | พิมพ์ `/phase-4-login-page` ใน Cursor Chat |

---

## Utility Commands (จัดการโปรเจกต์)

### `/clean-phases`

| | |
| --- | --- |
| **File** | `.cursor/commands/clean-phases.md` |
| **What it does** | ลบไฟล์ทั้งหมดที่ถูกสร้างจาก Phase 1-4 (source files + test files + coverage folder) เพื่อให้ repo กลับไปสถานะเริ่มต้นพร้อมฝึกใหม่ คง `.gitkeep` files และ scaffolding ไว้ (App.vue, main.js, router/, HomePage.vue, example.spec.js) |
| **When to use** | เมื่อต้องการเริ่มฝึก Phase 1-4 ใหม่ตั้งแต่ต้น |
| **Example** | พิมพ์ `/clean-phases` ใน Cursor Chat |

---

### `/run-unit-tests`

| | |
| --- | --- |
| **File** | `.cursor/commands/run-unit-tests.md` |
| **What it does** | รัน Unit Test ด้วย Jest (แนะนำ) หรือ Vue CLI อธิบายความแตกต่างระหว่าง `test:jest` กับ `test:unit`, วิธีดู coverage report ทั้ง terminal และ HTML, อธิบายเหตุผลที่ coverage ของ Vue SFC อาจต่ำกว่าที่คาดหวัง |
| **When to use** | เมื่อต้องการรันเทสและดูผล coverage |
| **Example** | พิมพ์ `/run-unit-tests` ใน Cursor Chat |

---

## AI-Assisted Testing Commands (ให้ AI ช่วยเขียน/แก้เทส)

### `/test-generation`

| | |
| --- | --- |
| **File** | `.cursor/commands/test-generation.md` |
| **What it does** | สร้างเทสใหม่จากศูนย์สำหรับ component/view ที่เปิดอยู่ โดยใช้ pattern: factory function, Happy Path (success case), Edge Case (error/empty state) พร้อม comment descriptions ในแต่ละ `it()` ห้ามแก้ไข component ต้นทาง และห้ามเขียนเทสเพื่อไล่ coverage อย่างเดียว |
| **When to use** | เมื่อต้องการสร้าง test file ใหม่สำหรับ component ที่ยังไม่มีเทส |
| **Example** | เปิดไฟล์ component แล้วพิมพ์ `/test-generation` ใน Cursor Chat |

---

### `/test-fixer`

| | |
| --- | --- |
| **File** | `.cursor/commands/test-fixer.md` |
| **What it does** | วิเคราะห์และแก้ไขเทสที่พัง โดยเช็ก: missing Ionic dependency ใน `global.plugins`, missing branches ที่ทำให้ coverage ต่ำกว่า 80%, และเพิ่ม `jest.clearAllMocks()` ใน `afterEach` เพื่อป้องกัน test leakage |
| **When to use** | เมื่อเทสรันไม่ผ่าน หรือ coverage ต่ำกว่าเป้า |
| **Example** | เปิดไฟล์ test ที่พัง แล้วพิมพ์ `/test-fixer` ใน Cursor Chat |

---

### `/coverage-report`

| | |
| --- | --- |
| **File** | `.cursor/commands/coverage-report.md` |
| **What it does** | วิเคราะห์ว่าทำไม coverage ของ test file ถึงต่ำ โดย: ระบุ source file ที่เทส, รัน Jest coverage เฉพาะไฟล์นั้น, รายงานตัวเลข (statements, branches, functions, lines), อธิบายเหตุผลที่ต่ำ (compiled SFC, template vs script, untested paths) โดยไม่แก้ไข component |
| **When to use** | เมื่อต้องการเข้าใจว่าทำไม coverage ถึงต่ำ โดยไม่ต้องแก้โค้ด |
| **Example** | ลาก test file เข้า Chat แล้วพิมพ์ `/coverage-report` |

---

### `/ionic-vue-jest`

| | |
| --- | --- |
| **File** | `.cursor/commands/ionic-vue-jest.md` |
| **What it does** | ใช้มาตรฐาน Ionic Vue Jest กับไฟล์เทสปัจจุบัน: ใช้ `shallowMount` เป็น default, mock Ionic controllers ด้วย `jest.fn()`, ใช้ `$nextTick()` หรือ `flushPromises()` สำหรับ async, ใช้ `findComponent(IonButton)` แทน CSS selectors |
| **When to use** | เมื่อเขียนหรือแก้ไขเทส Ionic Vue และต้องการให้ AI ใช้มาตรฐานที่ถูกต้อง |
| **Example** | เปิดไฟล์ test แล้วพิมพ์ `/ionic-vue-jest` ใน Cursor Chat |
