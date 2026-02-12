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
│   │   └── validators.js          # Email & password validation
│   ├── store/
│   │   ├── index.js               # Vuex root store
│   │   └── modules/
│   │       └── auth.js            # Auth state, SET_USER mutation, loginUser action
│   ├── services/
│   │   ├── CameraService.js       # Wraps @capacitor/camera
│   │   ├── FilesystemService.js   # Wraps @capacitor/filesystem
│   │   └── GeolocationService.js  # Wraps @capacitor/geolocation
│   ├── views/
│   │   ├── HomePage.vue           # Home page with link to login
│   │   └── LoginPage.vue          # Login form (validators + Vuex + ion-loading)
│   ├── router/
│   │   └── index.js               # Routes: /home, /login
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
├── .cursor/
│   ├── rules/                     # Auto-applied Cursor rules
│   ├── skills/                    # Skill: ionic-vue-unit-test
│   └── commands/
│       ├── phases/                # Phase 1-4 generation + clean
│       └── utility/               # Test runners, generators, fixers
├── docs/
│   ├── markdown-ionic-unit-test.md    # Full Thai guide (principles → verification)
│   ├── commands-reference.md          # Reference for all Cursor commands
│   └── rules-reference.md            # Reference for all Cursor rules
├── .cursor-blueprint.md           # Project blueprint for Cursor AI
├── jest.setup.js                  # Global Ionic controller mocks
├── jest.config.js                 # Jest configuration
├── babel.config.js
├── vue.config.js
└── package.json
```

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

3. Run unit tests:

   ```bash
   npm run test:unit
   ```

4. Run tests with coverage:

   ```bash
   npm run test:coverage
   ```

   Then open `coverage/lcov-report/index.html` for the HTML report, or use:

   ```bash
   npm run test:coverage:open
   ```

5. Run Jest directly (bypassing vue-cli-service):

   ```bash
   npm run test:jest
   ```

6. Lint the project:

   ```bash
   npm run lint
   ```

## Learning Phases

The project is organized into 4 phases, each building on the previous:

| Phase | Source | Test | What you learn |
| --- | --- | --- | --- |
| **1. Utils** | `src/utils/validators.js` | `tests/unit/utils/validators.spec.js` | Pure function testing, edge cases, 100% coverage |
| **2. Store** | `src/store/modules/auth.js` | `tests/unit/store/auth.spec.js` | Vuex mutations/actions, mocking Axios, success/fail paths |
| **3. Services** | `src/services/Camera*.js`, `Filesystem*.js`, `Geolocation*.js` | `tests/unit/services/*.spec.js` | Mocking Capacitor plugins, async testing |
| **4. Pages** | `src/views/LoginPage.vue` | `tests/unit/views/LoginPage.spec.js` | Component mounting, mock store, Ionic controller mocks |

## Cursor AI Integration

### Rules (`.cursor/rules/`)

Rules apply automatically when relevant files are open:

| Rule | Applies to |
| --- | --- |
| `ionic-vue-project.mdc` | Project-wide standards |
| `ionic-vue-testing.mdc` | Test files |
| `ionic-vue-jest.mdc` | Jest configuration |
| `vuex-testing.mdc` | Store tests |
| `test-generation.mdc` | Generating new tests |
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
| `/phases/phase-4-login-page` | Create LoginPage + tests |
| `/phases/clean-phases` | Delete all phase-generated files to start fresh |

**`utility/`** -- Test runners, generators, and fixers:

| Command | Purpose |
| --- | --- |
| `/utility/run-unit-tests` | Run tests with coverage |
| `/utility/test-generation` | Generate tests for any component |
| `/utility/test-fixer` | Fix failing tests |
| `/utility/coverage-report` | Analyze coverage report |
| `/utility/ionic-vue-jest` | Apply Ionic Vue Jest standards |

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
