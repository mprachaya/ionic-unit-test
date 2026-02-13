# คู่มือสร้างโปรเจกต์ Ionic Vue สำหรับฝึกเขียน Unit Test ด้วย Jest และ Cursor AI

เอกสารนี้เป็นคู่มือฉบับสมบูรณ์สำหรับสร้าง Repository ตัวอย่างเพื่อฝึกฝนการเขียน Unit Test ในโปรเจกต์ **Ionic Vue** โดยใช้ **Jest** เป็น Test Runner และได้รับความช่วยเหลือจาก **Cursor AI** เพื่อเร่งกระบวนการพัฒนาและเรียนรู้ เนื้อหาถูกจัดเรียงเป็นลำดับขั้นตอนที่ชัดเจน ตั้งแต่การวางหลักการพื้นฐาน การตั้งค่าโปรเจกต์ ไปจนถึงการสร้างส่วนประกอบต่างๆ และการตรวจสอบผลลัพธ์

---

## 1. พื้นฐานที่ต้องรู้ (The Prerequisites)

ก่อนจะเริ่มเขียน คุณต้องเข้าใจเครื่องมือที่เน้นการจัดการ **Logic** ไม่ใช่แค่การวาดหน้าจอ:

### เครื่องมือหลักที่ใช้

-   **Vue Test Utils:** ใช้เพื่อ mount component เข้ามาในสภาพแวดล้อมจำลอง เพื่อเข้าถึง Methods และ Lifecycle มาทดสอบ Logic ภายใน
-   **Jest API (The Core):** หัวใจสำคัญคือ `describe`, `it`, `expect` และทักษะที่สำคัญที่สุดคือ **Mocking** (`jest.mock`, `jest.spyOn`) เพื่อตัด Dependency ภายนอกออกให้หมด

### ข้อควรระวังสำหรับ Ionic

-   **Shadow DOM:** Component ของ Ionic ส่วนใหญ่ (เช่น `ion-input`, `ion-button`) เป็น Web Components ที่ใช้ Shadow DOM ทำให้การเข้าถึง Element ภายในด้วยคำสั่ง `find()` แบบปกติของ Vue Test Utils อาจไม่ทำงาน ในหลายกรณีจำเป็นต้องใช้ `findComponent()` เพื่อค้นหา Component ของ Ionic โดยตรง
-   **Ionic Lifecycles:** หาก Component ของคุณมี Logic ที่ทำงานใน Lifecycle เฉพาะของ Ionic (เช่น `ionViewWillEnter` หรือ `ionViewDidEnter`) คุณจะต้องจำลองการทำงานของ Lifecycle เหล่านั้นในการทดสอบด้วย โดยสามารถเรียกใช้เมธอดเหล่านี้ได้โดยตรงผ่าน `wrapper.vm.ionViewWillEnter()`

### ✅ ควรทำ (Do)

-   **Test Business Logic:** เน้นเทสฟังก์ชันคำนวณ, การจัดการ Data, และการเปลี่ยนสถานะ (State) ของ Component
-   **Mock Capacitor & External APIs:** ต้อง Mock เสมอ! เพราะเราเทสบน Node.js ไม่ใช่เครื่องจริง การเรียกใช้ Plugin จริงจะทำให้เทสพังโดยใช่เหตุ
-   **Test Behavior (The Result):** เทสว่าเมื่อ Input เข้ามาแบบนี้ ผลลัพธ์ที่ได้ (เช่น คอนเทนต์ที่เปลี่ยนไป) ถูกต้องไหม

### ❌ ไม่ควรทำ (Don't - ลดภาระการรักษาโค้ด)

-   **Avoid UI/CSS Testing:** อย่าเทส UI สีปุ่ม หรือตำแหน่ง Element เพราะ UI เปลี่ยนบ่อยมาก (Brittle) และไม่มีประโยชน์ในการเช็ก Logic สู้ปล่อยให้เป็นหน้าที่ของ Automate Test หรือ Manual QA จะคุ้มกว่า
-   **Don't Duplicate Automate Test:** อะไรที่ Automate (Robot/Playwright) เช็กได้ดีกว่า (เช่น การไหลของหน้าจอ) ไม่ต้องเขียนใน Unit Test ให้ทับซ้อนกัน
-   **Don't Test Third-party Internals:** อย่าเทสว่า `ion-button` คลิกติดไหม หรือ Component ของ Lib ทำงานถูกต้องไหม (ให้เชื่อใจ Library ที่เราเลือกมา)

---

## 2. การตั้งค่าโปรเจกต์ (Project Setup)

ก่อนเริ่มสร้างไฟล์ต่างๆ ด้วย Cursor AI ให้เตรียมโปรเจกต์ของคุณให้พร้อมโดยการสร้าง 2 ไฟล์สำคัญนี้ไว้ที่ Root ของโปรเจกต์

### ไฟล์ที่ 1: `.cursor-blueprint.md`

ไฟล์นี้ทำหน้าที่เป็น "พิมพ์เขียว" หรือแผนที่สำหรับให้ Cursor AI เข้าใจภาพรวมของโปรเจกต์, Tech Stack, และมาตรฐานการเขียนโค้ดที่เราต้องการ การมีไฟล์นี้จะช่วยให้ Prompt ที่เราส่งไปมีความแม่นยำและได้ผลลัพธ์ที่สอดคล้องกัน

```
# Ionic Vue Unit Testing (Vuex Version) - Blueprint

## Tech Stack
- **Framework:** Ionic Vue (Vue 3)
- **Testing:** Jest + Vue Test Utils
- **State Management:** Vuex 4 (Modules)
- **Networking:** Axios

## Testing Standards
1.  **Mocking**:
    - Mock `@ionic/vue` controllers (Modal, Toast, Loading) ทันที
    - Mock Capacitor Plugins และ API Services
2.  **Vuex**:
    - เทส Mutations เป็น Pure Functions
    - เทส Actions โดยการ Mock `commit` และ API
    - ใน Component ให้ใช้ `createStore` เพื่อสร้าง Mock Store
3.  **Ionic Lifecycle**: เทสโค้ดใน `ionViewDidEnter` และ `ionViewWillLeave` โดยเรียกผ่าน `wrapper.vm`
4.  **Target**: Coverage 80%+ เน้นที่ Logic ภายใน Store และ Services

## Learning Phases
- **Phase 1: Utils** - ฟังก์ชันคำนวณและจัดรูปแบบข้อมูล
- **Phase 2: Vuex Store** - แยกเทส Mutations, Actions, และ Getters
- **Phase 3: Services** - การจัดการ API และ Capacitor Plugins
- **Phase 4: Components & Pages** - การแสดงผลและการ Dispatch Action
```

## 3. กลยุทธ์การนับ Coverage และการวัดคุณภาพ

เลิกวัดผลที่จำนวนบรรทัดของ HTML แต่ให้วัดที่ **"ความถูกต้องของ Logic"**

### เป้าหมาย Coverage ตามประเภท

-   **Logic/Calculations (The Core):** ต้อง **100%** เพราะเป็นส่วนที่ตัดสินว่าแอปจะทำงานผิดหรือถูก
-   **UI Coverage Strategy:** Jest ไม่สามารถแยก Coverage ของ `<template>` ออกจาก `<script>` ได้ เพราะ `@vue/vue3-jest` คอมไพล์ SFC ทั้งไฟล์รวมเป็น JS เดียว (เฉพาะ `<style>` เท่านั้นที่ถูกตัดออกโดย compiler) วิธีแก้คือใช้ **`coverageThreshold` แบบ Per-directory** ใน `jest.config.js` — ตั้งค่า `src/views/` ให้มี threshold ต่ำกว่า (เช่น 50% lines, 70% functions) เพื่อรองรับบรรทัดจาก render function ที่ถูกสร้างจาก template ส่วน `src/utils/` และ `src/store/` ที่เป็น Pure Logic ให้ตั้ง 90–100% ได้เต็มที่

### Quality Expect (เขียนให้แม่น)

-   **Single Responsibility:** หนึ่ง Test Case ควรมีจุดประสงค์เดียว
-   **Specific Matchers:** ใช้ Matcher ที่เฉพาะเจาะจง เช่น `toHaveBeenCalledWith(...)` เพื่อเช็กว่าข้อมูลที่ส่งไปหา API หรือ Plugin นั้นถูกต้อง ไม่ใช่แค่เช็กว่า "ถูกเรียก" แต่ส่งอะไรไปก็ได้

### ⚠️ ผลเสียถ้าฝืนเทส UI หรือตั้งค่าไม่ดี

-   **High Maintenance, Low Value:** ทีมต้องเสียเวลามาแก้เทสทุกครั้งที่ Designer สั่งขยับปุ่ม ทั้งที่ Logic เหมือนเดิม
-   **Skewed Data:** ตัวเลข Coverage จะดูสูงเพราะ Render หน้าจอผ่าน แต่ Logic สำคัญกลับไม่มีเทสคลุม (False Security)

---

## 4. การใช้ Cursor AI ช่วยเขียน Test

Cursor (AI Code Editor) สามารถช่วยลดขั้นตอนการเขียน Boilerplate ได้มหาศาล

### วิธีตั้งค่า Cursor ให้เก่ง Unit Test

#### Indexing

ปล่อยให้ Cursor Index โปรเจกต์ให้เสร็จ เพื่อให้มันเห็น `jest.config.js`, `tsconfig.json` และไฟล์ `@/` ต่างๆ

#### Cursor Rules (`.cursor/rules/`)

โปรเจกต์นี้ใช้ระบบ **Rule Files** แบบแยกตามหัวข้อ ไม่ได้ใช้ไฟล์ `.cursorrules` ตัวเดียวแบบเก่า แต่ละไฟล์เป็น `.mdc` ที่มี frontmatter กำหนด `description`, `globs` (ไฟล์ที่จะใช้ Rule นี้), และ `alwaysApply` (ใช้ทุกครั้งหรือไม่):

| ไฟล์ Rule | ใช้งานเมื่อไหร่ | หน้าที่ |
| --- | --- | --- |
| `ionic-vue-project.mdc` | **Always** (ทุก Prompt) | กำหนด Tech Stack, Testing Standards, และ Learning Phases ของโปรเจกต์ |
| `ionic-vue-testing.mdc` | ไฟล์ `*.spec.{ts,js}`, `*.test.{ts,js}` | มาตรฐานการเทส: Mount Strategy, Mock Architecture, Element Selection, Best Practices |
| `ionic-vue-jest.mdc` | ไฟล์ `tests/unit/**/*.spec.*` | How-to Guide: วิธี Setup, Async Handling, Mock Reset Pattern |
| `test-generation.mdc` | ไฟล์ `src/components/**/*.vue`, `src/views/**/*.vue` | Creator Rule: Factory Function, Happy Path + Edge Case, ห้ามแก้ Component |
| `vuex-testing.mdc` | ไฟล์ `**/store/**/*`, `**/*store*.spec.*` | Pattern สำหรับเทส Mutations, Actions, Components ที่ใช้ Vuex |
| `test-fixer.mdc` | ไฟล์ `*.spec.{ts,js}` | Debug Rule: แก้เทสพัง, เช็ก Coverage ต่ำ, Clean up mocks |
| `coverage-report.mdc` | ไฟล์ `tests/unit/**/*.spec.*` | วิเคราะห์และรายงานสาเหตุที่ Coverage ต่ำ โดยไม่แก้ Component |

> **หมายเหตุ:** ไม่ต้องตั้งค่าอะไรเพิ่มใน Settings > General > Rules for AI — Cursor จะอ่าน Rule Files จากโฟลเดอร์ `.cursor/rules/` โดยอัตโนมัติตาม `globs` ที่กำหนด

#### Cursor Skill (`.cursor/skills/`)

โปรเจกต์มี **Skill File** ที่ `.cursor/skills/ionic-vue-unit-test/SKILL.md` ซึ่ง Cursor Agent จะเรียกใช้อัตโนมัติเมื่อผู้ใช้ถามเกี่ยวกับ Ionic Vue Testing เช่น การ Mock Controller, การเขียนเทส Vuex Store หรือ Services — Skill นี้จะให้ Quick Reference และ Project Context ที่ถูกต้องแก่ Agent

#### Cursor Commands (`.cursor/commands/`)

โปรเจกต์มี **Command Files** สำเร็จรูปที่เรียกใช้ได้ทันทีจาก Chat โดยพิมพ์ `/` ตามด้วยชื่อ Command แบ่งเป็น 2 กลุ่ม:

**Phase Commands** (สร้างไฟล์ตาม Learning Phase):

| Command | หน้าที่ |
| --- | --- |
| `/phase-1-utils` | สร้าง `validators.js` + test file (Pure Logic) |
| `/phase-2-store` | สร้าง Vuex 4 auth module + test file (Mock Axios) |
| `/phase-3-services` | สร้าง CameraService, GeolocationService, FilesystemService + test files (Mock Capacitor) |
| `/phase-4-login-page` | สร้าง LoginPage.vue + test file พร้อม spec ครบทุก describe block |
| `/clean-phases` | ลบไฟล์ทั้งหมดที่สร้างจาก Phase 1–4 เพื่อเริ่มฝึกใหม่ |

**Utility Commands** (ใช้งานระหว่างเขียนเทส):

| Command | หน้าที่ |
| --- | --- |
| `/test-generation` | สร้างเทสใหม่: Factory, Mount, Mock Reset, Happy Path + Edge Case |
| `/ionic-vue-jest` | คู่มือ Mock Architecture, Element Selection, Async Handling |
| `/test-fixer` | แก้เทสพัง + เช็ก Coverage ต่ำกว่า 80% |
| `/coverage-report` | วิเคราะห์สาเหตุ Coverage ต่ำ (ลากไฟล์ test เข้า Chat แล้วสั่ง) |
| `/run-unit-tests` | รันเทสด้วย Jest พร้อมคำสั่ง Coverage |

### ขั้นตอนการสั่ง Cursor (Workflow)

1.  **Step 1:** เปิดไฟล์คอมโพเนนต์ขึ้นมา (เช่น `LoginPage.vue`)
2.  **Step 2:** เปิด Chat แล้วใช้ Command สำเร็จรูป เช่น:
    -   พิมพ์ `/phase-4-login-page` เพื่อสร้าง Component + Test ทั้งชุด
    -   พิมพ์ `/test-generation` เพื่อให้ Cursor สร้างเทสใหม่ตามมาตรฐานโปรเจกต์
    -   พิมพ์ `/test-fixer` เพื่อแก้เทสที่พัง
3.  **Step 3:** ใช้ `/coverage-report` เพื่อวิเคราะห์ Coverage หลังเขียนเทสเสร็จ
4.  **Step 4:** รันเทสด้วย `/run-unit-tests` หรือ `npm run test:jest` ใน Terminal

> **Tip:** ถ้าต้องการ Prompt แบบ Free-form ก็สามารถใช้ Chat ปกติได้ — Cursor จะอ่าน Rule Files อัตโนมัติตาม glob ของไฟล์ที่เปิดอยู่

### Cheat Sheet: คำสั่งลัดสำหรับ Workflow หลัก

| สิ่งที่ต้องทำ | วิธีใช้ใน Cursor | ประโยชน์ |
| --- | --- | --- |
| สร้างเทสใหม่ | `/test-generation` ใน Chat | ได้ Factory, Mock Reset, Happy Path + Edge Case ตามมาตรฐาน |
| สร้างทั้ง Phase | `/phase-1-utils` ถึง `/phase-4-login-page` | สร้าง Source + Test ครบทุก Phase ตาม Blueprint |
| แก้เทสพัง | `/test-fixer` ใน Chat | เช็ก Missing Plugin, Coverage ต่ำ, Mock Leak |
| ดู Coverage | `/coverage-report` + ลากไฟล์ test เข้า Chat | ได้รายงานสาเหตุ Coverage ต่ำแบบมีโครงสร้าง |
| รันเทส | `npm run test:jest` หรือ `npm run test:coverage` | รัน Jest ตรงไม่ผ่าน Vue CLI |
| ล้างไฟล์ฝึก | `/clean-phases` | ลบไฟล์ Phase 1–4 เพื่อเริ่มฝึกใหม่ |
| ดู Coverage ในเบราว์เซอร์ | `npm run test:coverage:open` | เปิด HTML Report แบบ Line-by-Line |

---

## 5. Roadmap สรุปขั้นตอนการทำ

| Phase | รายละเอียด |
| --- | --- |
| **Setup Phase** | ติดตั้ง `@vue/test-utils`, `jest`, `ts-jest` และตั้งค่า `jest.setup.js` เพื่อ Global Mock Ionic |
| **Logic Phase** | เขียนเทสให้ Composables และ Vuex/Pinia (ส่วนนี้เก็บ Coverage ง่ายสุด) |
| **Component Phase** | เริ่มเทส Page โดยเน้นที่การ Render ข้อมูลเบื้องต้น |
| **Interaction Phase** | เทสการคลิก, การส่งฟอร์ม และการเปิด Modal (ใช้ `modalController` mock) |
| **CI/CD Integration** | ตั้งค่าให้รัน `npm run test:unit` ทุกครั้งที่สร้าง Pull Request |

---

## 6. ขั้นตอนการสร้างไฟล์ด้วย Cursor AI (Step-by-Step Generation)

ใช้คำสั่งต่อไปนี้ใน Cursor (ผ่าน `Cmd+K` หรือหน้าต่าง Chat) เพื่อสร้างไฟล์ตามลำดับเฟสการเรียนรู้ที่กำหนดไว้ใน Blueprint การอ้างอิงไฟล์ `@.cursor-blueprint.md` ใน Prompt จะช่วยให้ AI สร้างโค้ดตามมาตรฐานที่เราวางไว้

### ขั้นตอนที่ 1: สร้าง Pure Logic (Phase 1 - Utils)

**เป้าหมาย:** สร้างฟังก์ชันสำหรับตรวจสอบความถูกต้องของข้อมูลฟอร์ม (Validators) ซึ่งเป็น Logic ที่ไม่มีส่วนเกี่ยวข้องกับ UI (Pure Logic) ทำให้เป็นจุดเริ่มต้นที่ง่ายที่สุดในการเขียน Unit Test

> **สั่ง Cursor ที่โฟลเดอร์ `src/utils`:**
> 
> ```
> @.cursor-blueprint.md
> Create a file 'validators.ts' with functions to validate email and password (min 6 chars). Then create a test file in 'tests/unit/utils/validators.spec.ts' with 100% coverage including edge cases.
> ```

### ขั้นตอนที่ 2: สร้าง Vuex Store (Phase 2 - Store)

**เป้าหมาย:** สร้าง Store สำหรับจัดการสถานะการล็อกอิน (Authentication State) และทดสอบ Action ที่มีการเรียก API โดยจำลอง (Mock) การทำงานของ `axios` เพื่อทดสอบทั้งกรณีที่สำเร็จและล้มเหลว

> **สั่ง Cursor ที่โฟลเดอร์ `src/store` (หรือ `src/store/modules` หากใช้ Modules):**
> 
> ```
> @.cursor-blueprint.md
> Create a Vuex 4 module 'auth.ts'. It should have: State: user, isAuthenticated. Mutation: SET_USER. Action: loginUser (use axios to POST to /login). Then create 'tests/unit/store/auth.spec.ts' that mocks axios and tests both success and fail scenarios for the action.
> ```

### ขั้นตอนที่ 3: สร้าง Service (Phase 3 - Services)

**เป้าหมาย:** สร้าง Service สำหรับจัดการข้อมูลใน Storage ของอุปกรณ์ (เช่น Local Storage หรือ Preferences) และทดสอบโดยการ Mock Capacitor Plugin เพื่อยืนยันว่าฟังก์ชัน `get` และ `set` ทำงานได้ตามที่คาดหวัง

> **สั่ง Cursor ที่โฟลเดอร์ `src/services`:**
> 
> ```
> @.cursor-blueprint.md
> Create a 'StorageService.ts' using @capacitor/preferences. Write a unit test that mocks the Capacitor plugin to verify get/set operations.
> ```

### ขั้นตอนที่ 4: สร้าง Page และเชื่อมต่อทุกอย่าง (Phase 4 - Components)

**เป้าหมาย:** สร้างหน้า Login ที่นำ Utils (Validators) และ Vuex Store (Auth Module) มาใช้งานร่วมกัน และเขียนเทสเพื่อจำลองการโต้ตอบของผู้ใช้ เช่น การกรอกข้อมูลและคลิกปุ่ม โดยมีการ Mock Vuex Store และ `ion-loading` controller

> **สั่ง Cursor ที่โฟลเดอร์ `src/views`:**
> 
> ```
> @.cursor-blueprint.md
> Create 'LoginPage.vue' using Ionic components (ion-input, ion-button). Use the validators from utils. Dispatch 'auth/loginUser' on click. Show an ion-loading during request. Then create its test file. Mock the Vuex store and ion-loading controller. Test that the login action is only called if validation passes.
> ```

---

## 7. การตรวจสอบผลลัพธ์ (Verification)

หลังจากที่ Cursor สร้างไฟล์ในแต่ละขั้นตอนเสร็จสิ้น ให้รันคำสั่งต่อไปนี้ใน Terminal ของโปรเจกต์เพื่อดูผลการทดสอบและรายงาน Code Coverage:

```bash
npm run test
```

เมื่อคำสั่งรันเสร็จสิ้น Jest จะแสดงผลการทดสอบใน Terminal และสร้างโฟลเดอร์ `coverage/` ขึ้นมาในโปรเจกต์ของคุณ

จากนั้น ให้เปิดไฟล์ `coverage/lcov-report/index.html` ในเบราว์เซอร์เพื่อดูรายงาน Code Coverage ในรูปแบบกราฟิกที่สวยงามและเข้าใจง่าย คุณสามารถคลิกเข้าไปดูรายละเอียดในแต่ละไฟล์เพื่อตรวจสอบว่า Logic ส่วนไหน หรือเงื่อนไขใดที่ยังไม่ถูกทดสอบ เพื่อนำไปปรับปรุงชุดการทดสอบของคุณให้ครอบคลุมมากยิ่งขึ้น
