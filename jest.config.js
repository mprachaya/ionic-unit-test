/**
 * Jest config for Ionic Vue unit tests (JavaScript).
 * setupFilesAfterEnv runs jest.setup.js (global Ionic controller mocks).
 * Used by vue-cli-service test:unit.
 */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.m?js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '**/tests/unit/**/*.spec.[jt]s?(x)',
    '**/__tests__/**/*.[jt]s?(x)',
  ],
  collectCoverageFrom: [
    'src/**/*.{vue,js}',
    '!src/main.js',

    // Exclude router config — it's just route definitions, no business logic to test.
    '!src/router/**',

    '!**/node_modules/**',
  ],

  /**
   * coverageThreshold — Per-directory minimum coverage gates.
   *
   * Why per-directory instead of a single global number?
   *   - A single global threshold lets high-coverage util files mask
   *     low-coverage store/service files. Per-directory thresholds ensure
   *     every layer is individually accountable.
   *
   * Why different numbers for each directory?
   *
   *   src/utils/   → 100%  (Pure functions with zero side-effects.
   *                          These are the easiest to cover and the most
   *                          critical — validators decide if data is
   *                          correct or not. No excuse for < 100%.)
   *
   *   src/store/   → 90%   (Vuex mutations are pure, so they should be
   *                          100%. Actions call external APIs (mocked),
   *                          but some edge-case branches like network
   *                          timeouts may be hard to simulate at first.
   *                          90% gives room to grow without blocking CI.)
   *
   *   src/services/ → 90%  (Services wrap Capacitor plugins. All plugin
   *                          calls are mocked, but permission-denied or
   *                          device-unavailable branches may need extra
   *                          effort. 90% keeps the bar high while staying
   *                          realistic.)
   *
   *   src/views/   → 50% lines / 70% functions / 50% branches
   *                         (Vue SFC files include a <template> that
   *                          compiles into a render function. Those
   *                          auto-generated lines inflate the total and
   *                          are NOT meaningful business logic — testing
   *                          every v-if/v-for branch in the render
   *                          function gives "High Maintenance, Low Value"
   *                          results. <style> blocks are already stripped
   *                          by @vue/vue3-jest so they don't affect the
   *                          numbers. The lower thresholds here reflect
   *                          the reality that we test the <script> logic,
   *                          not the template rendering. Functions are set
   *                          higher (70%) because every method defined in
   *                          <script> should still have a test.)
   */
  coverageThreshold: {
    'src/utils/': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
    'src/store/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    'src/services/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    'src/views/': {
      branches: 50,
      functions: 70,
      lines: 50,
      statements: 50,
    },
  },
};
