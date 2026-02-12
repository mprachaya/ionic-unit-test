# Ionic Vue Unit Test Repository

A learning/template project for practicing **unit testing** in **Ionic Vue** with **Jest** and **Vue Test Utils**, powered by **Cursor AI** rules, skills, and commands.

## Tech Stack

| Category | Tools |
| --- | --- |
| **Framework** | Ionic Vue (Vue 3) |
| **State Management** | Vuex 4 (Modules) |
| **HTTP** | Axios |
| **Capacitor Plugins** | Camera, Filesystem, Geolocation, Preferences |
| **Testing** | Jest 27 + Vue Test Utils 2 |
| **Language** | JavaScript (Babel) |

## Project Structure

```
ionic-unit-test/
├── src/
│   ├── utils/
│   │   └── validators.js              # Email & password validation
│   ├── store/
│   │   ├── index.js                   # Vuex root store
│   │   └── modules/
│   │       └── auth.js                # Auth state, SET_USER mutation, loginUser action
│   ├── services/
│   │   ├── CameraService.js           # Wraps @capacitor/camera
│   │   ├── FilesystemService.js       # Wraps @capacitor/filesystem
│   │   └── GeolocationService.js      # Wraps @capacitor/geolocation
│   ├── views/
│   │   ├── HomePage.vue               # Home page with link to login
│   │   └── LoginPage.vue              # Login form (validators + Vuex + controllers)
│   ├── router/
│   │   └── index.js                   # Routes: /home, /login
│   ├── App.vue
│   └── main.js
├── tests/
│   └── unit/
│       ├── utils/
│       │   └── validators.spec.js
│       ├── store/
│       │   └── auth.spec.js
│       ├── services/
│       │   ├── CameraService.spec.js
│       │   ├── FilesystemService.spec.js
│       │   └── GeolocationService.spec.js
│       ├── views/
│       │   └── LoginPage.spec.js
│       └── example.spec.js
├── __mocks__/
│   └── @ionic/
│       └── vue.js                     # Manual mock for @ionic/vue (stubs + controllers)
├── .cursor/
│   ├── rules/                         # Auto-applied Cursor rules
│   ├── skills/                        # Skill: ionic-vue-unit-test
│   └── commands/
│       ├── phases/                    # Phase 1-4 generation + clean
│       └── utility/                   # Test runners, generators, fixers
├── docs/
│   ├── markdown-ionic-unit-test.md    # Full Thai guide (principles → verification)
│   ├── commands-reference.md          # Reference for all Cursor commands
│   ├── rules-reference.md            # Reference for all Cursor rules
│   ├── presentation-overview.md      # Mermaid diagrams for team presentation
│   └── setup-guide-for-other-repos.md # Setup guide for adding tests to existing projects
├── .cursor-blueprint.md               # Project blueprint for Cursor AI
├── vue3-jest-fix.js                   # Transform wrapper (fixes @vue/vue3-jest collision)
├── jest.setup.js                      # VTU global config + warning suppression
├── jest.config.js                     # Jest config (moduleNameMapper + transform wrapper)
├── babel.config.js
├── vue.config.js
└── package.json
```

## Mock Architecture

This project uses a clean mock system for `@ionic/vue` that requires **zero changes to component code**. Import controllers normally — `import { loadingController } from '@ionic/vue'` — everything works.

### The Problem — ทำไมต้องมีไฟล์พิเศษ 2 ตัวนี้?

`@vue/vue3-jest` (ตัวคอมไพล์ `.vue` → JavaScript สำหรับ Jest) มีบั๊กที่ทำให้ controller ของ Ionic เช่น `loadingController`, `toastController` กลายเป็น `undefined` ตอนเรียกใช้ใน methods

**สาเหตุ:** เมื่อคอมไพล์ SFC (Single File Component) ทั้ง `<script>` และ `<template>` จะถูกรวมใน scope เดียวกัน:

```js
// จาก <script> → ถูกต้อง
var _vue = require("@ionic/vue");   // มี loadingController

// จาก <template> → เขียนทับตัวแปรชื่อเดียวกัน!
var _vue = require("vue");          // ไม่มี loadingController → undefined!
```

ตัวแปร `_vue` ตัวหลังเขียนทับตัวแรก UI components ยังทำงานได้ (register ตอน load) แต่ controllers ที่ถูกเรียกตอน runtime ใน methods จะกลายเป็น `undefined` ทันที

### The Solution — ไฟล์สำคัญ 2 ตัว

| File | ทำหน้าที่อะไร | ถ้าไม่มีจะเป็นยังไง |
| --- | --- | --- |
| **`vue3-jest-fix.js`** | Custom transform wrapper ครอบ `@vue/vue3-jest` — หลังคอมไพล์เสร็จจะเปลี่ยนชื่อตัวแปร `_vue` → `_vue2` เฉพาะในส่วน render function เพื่อไม่ให้ชนกัน **นี่คือ key fix — ไม่ต้องแก้โค้ด component ใดๆ** | Controller ทุกตัว (`loadingController`, `toastController`, etc.) จะเป็น `undefined` ในทุก `.vue` file — **เทสที่เรียก controller จะพังทั้งหมด** |
| **`__mocks__/@ionic/vue.js`** | Manual mock ที่มี component stubs (render เป็น HTML tag จริง เช่น `<ion-input>`) + controller mocks (`jest.fn()`) + Proxy fallback สำหรับ `Ion*` ที่ไม่ได้ list ไว้ — โหลดอัตโนมัติผ่าน `moduleNameMapper` ใน `jest.config.js` | Jest จะพยายาม parse `@ionic/vue` แบบ ESM แล้วพัง (`SyntaxError: Cannot use import statement outside a module`) หรือถ้าผ่านก็จะได้ controller จริงที่ไม่มี DOM — เทส assert ไม่ได้ |

**ไฟล์สนับสนุน:**

| File | Purpose |
| --- | --- |
| `jest.config.js` | `moduleNameMapper` ชี้ `@ionic/vue` → mock file, `transform` ใช้ `vue3-jest-fix.js` แทน `@vue/vue3-jest` ตรงๆ |
| `jest.setup.js` | VTU global plugin config + warning suppression เท่านั้น (ไม่มี `jest.mock` ใดๆ) |

### How it works for developers

```js
// In components — import ตามปกติ ไม่ต้องทำอะไรพิเศษ
import { loadingController, toastController } from '@ionic/vue';

// In tests — import เหมือนกันเลย
import { loadingController, toastController } from '@ionic/vue';
```

No helper files, no workarounds, no refactoring. The transform wrapper + manual mock handle everything behind the scenes.

> **Warning:** ห้ามลบ `vue3-jest-fix.js` และ `__mocks__/@ionic/vue.js` — ทั้งสองไฟล์ทำงานคู่กัน ถ้าขาดตัวใดตัวหนึ่ง unit test ที่ใช้ Ionic controller จะพังทันที

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the dev server:

   ```bash
   npm run serve
   ```

   Open http://localhost:8100.

3. **Run tests with coverage + open report** (recommended):

   ```bash
   npm run test
   ```

   This runs `npx jest --verbose --coverage` and auto-opens the HTML coverage report in your browser. Uses `npx jest` directly so the `vue3-jest-fix.js` transform is always applied.

4. Run tests without opening report:

   ```bash
   npm run test:coverage
   ```

5. Run Jest without coverage (fast):

   ```bash
   npm run test:jest
   ```

6. Lint the project:

   ```bash
   npm run lint
   ```

### All npm scripts

| Script | Command | Description |
| --- | --- | --- |
| `npm run test` | `npx jest --verbose --coverage; open report` | Run all tests + coverage + open HTML report |
| `npm run test:unit` | `vue-cli-service test:unit` | Run via vue-cli (no coverage, may have IDE transform issues) |
| `npm run test:jest` | `npx jest` | Quick run, no coverage |
| `npm run test:coverage` | `npx jest --coverage` | Coverage table only (no auto-open) |
| `npm run test:coverage:open` | `npx jest --coverage; open report` | Coverage + open HTML report |
| `npm run lint` | `eslint src tests` | Lint source + test files |

## Learning Phases

The project is organized into 4 phases, each building on the previous:

| Phase | Source | Test | What you learn |
| --- | --- | --- | --- |
| **1. Utils** | `src/utils/validators.js` | `tests/unit/utils/validators.spec.js` | Pure function testing, edge cases, 100% coverage |
| **2. Store** | `src/store/modules/auth.js` | `tests/unit/store/auth.spec.js` | Vuex mutations/actions, mocking Axios, success/fail paths |
| **3. Services** | `src/services/Camera*.js`, `Filesystem*.js`, `Geolocation*.js` | `tests/unit/services/*.spec.js` | Mocking Capacitor plugins, async testing |
| **4. Pages** | `src/views/LoginPage.vue` | `tests/unit/views/LoginPage.spec.js` | Component mounting, mock store, Ionic controller mocks, conditional rendering, lifecycle |

## Cursor AI Integration

### Rules (`.cursor/rules/`)

Rules apply automatically when relevant files are open:

| Rule | Applies to |
| --- | --- |
| `ionic-vue-project.mdc` | Project-wide standards |
| `ionic-vue-testing.mdc` | Test files — mount strategy, mock architecture, element selection |
| `ionic-vue-jest.mdc` | Jest how-to — transform wrapper, async, reset pattern |
| `vuex-testing.mdc` | Store tests |
| `test-generation.mdc` | Generating new tests — factory, happy/edge, no data-testid |
| `test-fixer.mdc` | Fixing broken tests |
| `coverage-report.mdc` | Coverage analysis |

### Commands (`.cursor/commands/`)

In Cursor chat, type `/` and choose:

**`phases/`** -- Generate and clean learning phase files:

| Command | Purpose |
| --- | --- |
| `/phases/phase-1-utils` | Create validators + tests |
| `/phases/phase-2-store` | Create Vuex auth module + tests |
| `/phases/phase-3-services` | Create Capacitor services + tests |
| `/phases/phase-4-login-page` | Create LoginPage + tests (incl. prerequisites check, mock setup) |
| `/phases/clean-phases` | Delete all phase-generated files to start fresh |

**`utility/`** -- Test runners, generators, and fixers:

| Command | Purpose |
| --- | --- |
| `/utility/run-unit-tests` | Run tests with coverage |
| `/utility/test-generation` | Generate tests for any component (mount, no data-testid) |
| `/utility/test-fixer` | Fix failing tests |
| `/utility/coverage-report` | Analyze coverage report |
| `/utility/ionic-vue-jest` | Apply Ionic Vue Jest standards (mock architecture, selectors) |

### Skills (`.cursor/skills/`)

The `ionic-vue-unit-test` skill activates when writing or generating tests for Ionic Vue components, Vuex store, services, or utils.

### Blueprint (`.cursor-blueprint.md`)

Add `@.cursor-blueprint.md` in any Cursor prompt so the AI follows the project's tech stack and testing standards.

## Documentation (`docs/`)

| Document | Description |
| --- | --- |
| **`docs/markdown-ionic-unit-test.md`** | Full Thai guide: principles, Do's & Don'ts, coverage strategy, Cursor AI workflows, step-by-step generation |
| **`docs/commands-reference.md`** | Reference for all Cursor `/commands` -- what each one does, when to use it |
| **`docs/rules-reference.md`** | Reference for all Cursor rules -- what each rule enforces, which files trigger it |
| **`docs/presentation-overview.md`** | Mermaid diagrams for team presentation -- architecture, testing flow, Do's & Don'ts |
| **`docs/setup-guide-for-other-repos.md`** | Step-by-step guide for adding Jest + Cursor AI testing to an existing Ionic Vue project |

---

### Optional: `.cursorignore`

Create `.cursorignore` in the project root so Cursor skips large/generated folders:

```
node_modules/
dist/
dist-ssr/
coverage/
package-lock.json
*.log
.cache/
.eslintcache
```
