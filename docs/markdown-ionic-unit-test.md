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

### ไฟล์ที่ 2: `jest.setup.js`

ไฟล์นี้ใช้สำหรับตั้งค่าสภาพแวดล้อมการทดสอบของ Jest ก่อนที่เทสจะเริ่มรัน เราจะใช้ไฟล์นี้เพื่อ Mock Controllers มาตรฐานของ Ionic (เช่น Modal, Loading, Toast) ทั่วทั้งโปรเจกต์ เพื่อป้องกันข้อผิดพลาดและทำให้การทดสอบ Component ที่เรียกใช้ Controller เหล่านี้ง่ายขึ้น

```javascript
import { config } from '@vue/test-utils';
import { IonicVue } from '@ionic/vue';

// ลงทะเบียน IonicVue เป็น Global Plugin
// เพื่อให้ Component ของ Ionic ถูกเรนเดอร์อย่างถูกต้องในการทดสอบ
config.global.plugins = [IonicVue];

// Mock Ionic Controllers มาตรฐาน
jest.mock('@ionic/vue', () => ({
  ...jest.requireActual('@ionic/vue'), // นำเข้าทุกอย่างจาก @ionic/vue ตามปกติ
  // แล้วเขียนทับเฉพาะส่วนที่เราต้องการ Mock
  modalController: {
    create: jest.fn().mockResolvedValue({
      present: jest.fn(),
      onDidDismiss: jest.fn().mockResolvedValue({ data: null })
    })
  },
  loadingController: {
    create: jest.fn().mockResolvedValue({
      present: jest.fn(),
      dismiss: jest.fn()
    })
  },
  toastController: {
    create: jest.fn().mockResolvedValue({
      present: jest.fn()
    })
  }
}));
```

> **คำแนะนำ:** ตรวจสอบว่าโปรเจกต์ของคุณมีไฟล์ `jest.config.js` หากยังไม่มี ให้สร้างขึ้นโดยใช้ค่าตั้งต้นจาก Official Jest Configuration และที่สำคัญคือต้องตรวจสอบว่ามีการเรียกใช้ไฟล์ `jest.setup.js` ผ่าน Property ที่ชื่อ `setupFilesAfterEnv` ดังนี้:
> 
> ```javascript
> // jest.config.js
> module.exports = {
>   // ... other configs
>   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
> };
> ```

---

## 3. กลยุทธ์การนับ Coverage และการวัดคุณภาพ

เลิกวัดผลที่จำนวนบรรทัดของ HTML แต่ให้วัดที่ **"ความถูกต้องของ Logic"**

### เป้าหมาย Coverage ตามประเภท

-   **Logic/Calculations (The Core):** ต้อง **100%** เพราะเป็นส่วนที่ตัดสินว่าแอปจะทำงานผิดหรือถูก
-   **UI Coverage Strategy:** ไม่ต้องตั้งเป้าว่าต้องได้กี่ % สำหรับ UI แต่ให้ใช้วิธี **"Exclude/Skip"** ในการตั้งค่า Coverage Report (เช่นใน `jest.config.js`) เพื่อข้ามการนับคะแนนในส่วนของ `<template>` หรือ Style และไปโฟกัสเฉพาะส่วนที่เป็น `<script>` เท่านั้น วิธีนี้จะทำให้ค่า Coverage ที่เห็นสะท้อนคุณภาพของ Logic จริงๆ ไม่ใช่ตัวเลขหลอกจากการ Render หน้าจอ

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

#### Rules for AI

ไปที่ Settings > General > Rules for AI และใส่คำสั่งนี้:

> *"When writing unit tests for Ionic Vue, always use Vue Test Utils and Jest. Mock all Ionic controllers (loading, modal, toast) and Capacitor plugins by default. Use findComponent for Ionic elements. Prioritize testing the composition API logic and ensure async/await is used for lifecycle hooks."*

#### Indexing

ปล่อยให้ Cursor Index โปรเจกต์ให้เสร็จ เพื่อให้มันเห็น `tsconfig.json` และไฟล์ `@/` ต่างๆ

### การตั้งค่า `.cursorrules`

ไปที่หน้าต่าง Settings ของ Cursor หรือสร้างไฟล์ `.cursorrules` ใน Root Project แล้ววางข้อความนี้ลงไป:

```
You are an expert in Ionic Vue and Jest Unit Testing.
When writing tests:
1. Always use @vue/test-utils and Jest.
2. For Ionic components, use findComponent(Ion[Name]) instead of find('ion-[name]').
3. Automatically mock @ionic/vue controllers (Modal, Loading, Toast, Alert).
4. Automatically mock Capacitor plugins and API services.
5. For <script setup>, use defineExpose where necessary to access internal methods for coverage.
6. Use 'flushPromises' from @vue/test-utils for any async operations.
7. Wrap components in global.plugins: [IonicVue] during mount.
```

### ขั้นตอนการสั่ง Cursor (Workflow)

1.  **Step 1:** เปิดไฟล์คอมโพเนนต์ขึ้นมา
2.  **Step 2:** กด `Cmd+K` (หรือ `Ctrl+K`) แล้วพิมพ์:
    > *"Create a unit test for this component. Mock the API service and test the ionViewDidEnter logic. Ensure 100% coverage for the handleLogin function."*
3.  **Step 3:** ใช้ **Cursor Tab** เพื่อเติมโค้ดในส่วนของ `expect` ที่ซ้ำซ้อน

### ชุดคำสั่ง (Commands) สำหรับสั่ง Cursor

#### A. คำสั่งสร้าง Boilerplate (สำหรับไฟล์ใหม่)

> *"Create a Jest unit test file for this component. Mock all external services and provide a basic mount setup with IonicVue. Include a describe block for basic rendering."*

#### B. คำสั่งเน้นเก็บ Coverage (สำหรับ Logic ที่ซับซ้อน)

> *"Analyze this component and write test cases to achieve 100% code coverage for the [ชื่อฟังก์ชัน] function. Include tests for both success and error paths (try/catch)."*

#### C. คำสั่งเทส Ionic Lifecycle & Modal

> *"Write a test case for ionViewDidEnter. Mock modalController.create to return a mock element and verify that present() is called. Also, test the data returned from onDidDismiss."*

#### D. คำสั่งแก้ปัญหา Test พัง (Debug)

> *"This test is failing with [วาง Error]. Analyze if it's a Shadow DOM issue, an unhandled promise, or a missing Ionic provider, and provide a fix."*

### Cheat Sheet: เทคนิคเด็ดลดเวลาเขียน Test

| สิ่งที่ต้องทำ | คำสั่งลัดใน Cursor | ประโยชน์ |
| --- | --- | --- |
| Mock API | `Mock the @/services/api module` | ไม่ต้องเสียเวลาเขียน `jest.mock` เองทีละอัน |
| Generate Props | `Create test data factory for this component's props` | ได้ข้อมูล Mock สำหรับเทสที่หลากหลาย (Edge Cases) |
| Refactor Test | `Refactor these tests to use beforeEach for common setup` | ทำให้โค้ดเทสสะอาดและอ่านง่ายขึ้น |
| Test State | `Test how [variable] changes after clicking [button]` | เช็ค Flow การทำงานจริงของแอป |

### ตัวอย่างคำสั่งที่ใช้บ่อยที่สุด (Copy & Paste)

> *"Write a unit test for this Pinia store. Mock the API call. Test the [ActionName] action and verify that it calls the API once and updates the state correctly. Also, mock ionic toastController to ensure it shows a message on error."*

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
npm run test:unit -- --coverage
```

เมื่อคำสั่งรันเสร็จสิ้น Jest จะแสดงผลการทดสอบใน Terminal และสร้างโฟลเดอร์ `coverage/` ขึ้นมาในโปรเจกต์ของคุณ

จากนั้น ให้เปิดไฟล์ `coverage/lcov-report/index.html` ในเบราว์เซอร์เพื่อดูรายงาน Code Coverage ในรูปแบบกราฟิกที่สวยงามและเข้าใจง่าย คุณสามารถคลิกเข้าไปดูรายละเอียดในแต่ละไฟล์เพื่อตรวจสอบว่า Logic ส่วนไหน หรือเงื่อนไขใดที่ยังไม่ถูกทดสอบ เพื่อนำไปปรับปรุงชุดการทดสอบของคุณให้ครอบคลุมมากยิ่งขึ้น
