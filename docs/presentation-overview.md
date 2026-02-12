# Ionic Vue Unit Test Repository -- Overview

---

## What is this repo?

A **learning template** for dev teams to practice writing unit tests in Ionic Vue projects using Jest, Vue Test Utils, and Cursor AI.

---

## Tech Stack

```mermaid
graph LR
    IonicVue["Ionic Vue (Vue 3)"] --> Vuex4["Vuex 4"]
    IonicVue --> Axios
    IonicVue --> Capacitor["Capacitor Plugins"]
    Capacitor --> Camera
    Capacitor --> Filesystem
    Capacitor --> Geolocation

    Jest["Jest 27"] --> VTU["Vue Test Utils 2"]
    Jest --> Coverage["Coverage Report"]
```

---

## Learning Phases

```mermaid
flowchart LR
    P1["Phase 1\nUtils"] --> P2["Phase 2\nVuex Store"]
    P2 --> P3["Phase 3\nServices"]
    P3 --> P4["Phase 4\nPages"]

    P1a["validators.js\n100% coverage"] -.-> P1
    P2a["auth.js\nmock axios"] -.-> P2
    P3a["Camera, Filesystem\nGeolocation\nmock Capacitor"] -.-> P3
    P4a["LoginPage.vue\nmock store + controllers"] -.-> P4
```

| Phase | What you learn | Coverage target |
| --- | --- | --- |
| 1. Utils | Pure function testing, edge cases | 100% |
| 2. Store | Vuex mutations/actions, mocking Axios | 90% |
| 3. Services | Mocking Capacitor plugins, async | 90% |
| 4. Pages | Component mount, mock store, Ionic controllers | 50-70% |

---

## Testing Strategy

```mermaid
flowchart TB
    subgraph doThis [DO -- Test These]
        BL["Business Logic\ncalculations, state, conditions"]
        Mock["Mock Externals\nCapacitor, APIs, Ionic controllers"]
        Behavior["Test Behavior\ninput -> expected output"]
    end

    subgraph dontDoThis [DO NOT -- Skip These]
        UI["UI / CSS\ncolors, positions, layout"]
        Dup["Duplicate Automate Tests\nalready covered by Robot/Playwright"]
        Lib["Third-party Internals\nion-button click, library behavior"]
    end
```

---

## Coverage Strategy

```mermaid
flowchart TB
    subgraph config ["jest.config.js -- coverageThreshold"]
        Utils["src/utils/\n100%"]
        Store["src/store/\n90%"]
        Services["src/services/\n90%"]
        Views["src/views/\n50% lines / 70% functions"]
    end

    Note["Why views are lower?\ntemplate compiles to render function\nthose auto-generated lines\nare NOT business logic"]
    Views -.-> Note
```

**Key principle:** Measure logic quality, not line count.

- `<script>` = business logic (test this)
- `<template>` = compiled render function (inflates coverage, low value)
- `<style>` = stripped by vue3-jest (not counted)

---

## How Cursor AI Helps

```mermaid
flowchart LR
    subgraph cursorSetup [Setup]
        Blueprint[".cursor-blueprint.md\nTech stack + standards"]
        Rules["7 Rules\nauto-apply per file type"]
        Skills["Skill\nionic-vue-unit-test"]
    end

    subgraph commands [Slash Commands]
        PhaseCmd["Phase Commands\n/phases/phase-1 ~ 4\n/phases/clean-phases"]
        UtilCmd["Utility Commands\n/utility/test-generation\n/utility/test-fixer\n/utility/coverage-report\n/utility/run-unit-tests"]
    end

    cursorSetup --> commands
    commands --> Output["Generated source\n+ test files\nwith mocks"]
```

---

## Developer Workflow

```mermaid
flowchart TD
    Start["Clone repo\nnpm install"] --> Phase["Run phase command\n/phases/phase-1-utils"]
    Phase --> AI["Cursor AI generates\nsource + test files"]
    AI --> Run["npm run test:coverage"]
    Run --> Check{"Coverage\npasses?"}
    Check -->|Yes| Next["Move to next phase"]
    Check -->|No| Fix["Use /utility/test-fixer\nor /utility/coverage-report"]
    Fix --> Run
    Next --> Phase
    Next -->|All 4 phases done| Clean["/phases/clean-phases\nstart over"]
    Clean --> Phase
```

---

## Repository Structure

```mermaid
flowchart TB
    subgraph src [src/ -- Source Code]
        utils["utils/\nvalidators.js"]
        store["store/\nauth module"]
        services["services/\nCamera, Filesystem, Geolocation"]
        views["views/\nHomePage, LoginPage"]
    end

    subgraph tests [tests/unit/ -- Test Files]
        tUtils["utils/\nvalidators.spec.js"]
        tStore["store/\nauth.spec.js"]
        tServices["services/\n3 spec files"]
        tViews["views/\nLoginPage.spec.js"]
    end

    subgraph cursor [.cursor/ -- AI Config]
        rules["rules/ (7 files)"]
        skills["skills/"]
        cmdPhases["commands/phases/"]
        cmdUtility["commands/utility/"]
    end

    subgraph docs [docs/ -- Documentation]
        guide["markdown-ionic-unit-test.md"]
        cmdRef["commands-reference.md"]
        ruleRef["rules-reference.md"]
    end

    utils --> tUtils
    store --> tStore
    services --> tServices
    views --> tViews
```

---

## Quick Start Commands

| Action | Command |
| --- | --- |
| Install | `npm install` |
| Dev server | `npm run serve` |
| Run tests | `npm run test:jest` |
| Run with coverage | `npm run test:coverage` |
| Open coverage report | `npm run test:coverage:open` |
| Lint | `npm run lint` |

---

## Summary

1. **Focus on Logic** -- test calculations, state, conditions; skip UI/CSS
2. **Mock Everything External** -- Capacitor, APIs, Ionic controllers
3. **Per-directory Thresholds** -- 100% utils, 90% store/services, 50-70% views
4. **Cursor AI Accelerates** -- rules + commands + skills auto-generate boilerplate
5. **Repeatable Practice** -- clean and regenerate phases anytime
