/**
 * Jest setup for Ionic Vue unit tests.
 * Loaded via setupFilesAfterEnv in jest.config.js.
 *
 * The @ionic/vue mock itself lives in __mocks__/@ionic/vue.js and is loaded
 * automatically via moduleNameMapper in jest.config.js — no jest.mock() needed here.
 */
import { config } from '@vue/test-utils';

// Stub plugin for components that use Ionic (no-op install)
const IonicVueStub = { install: () => {} };

config.global.plugins = [IonicVueStub];

// Suppress "Invalid vnode type: undefined" from Ionic-mocked views
const originalWarn = console.warn;
console.warn = function (msg, ...args) {
  if (typeof msg === 'string' && msg.includes('Invalid vnode type')) return;
  originalWarn.apply(console, [msg, ...args]);
};
