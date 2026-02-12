/**
 * Jest setup for Ionic Vue unit tests.
 * Loaded via setupFilesAfterEnv in jest.config.js.
 * Mocks @ionic/vue so we never load ESM from node_modules; registers a stub IonicVue for component tests.
 */
import { config } from '@vue/test-utils';

// Stub plugin for components that use Ionic (no-op install)
const IonicVueStub = { install: () => {} };

config.global.plugins = [IonicVueStub];

// Suppress "Invalid vnode type: undefined" from Ionic-mocked views (compiled SFC can resolve components as undefined)
const originalWarn = console.warn;
console.warn = function (msg, ...args) {
  if (typeof msg === 'string' && msg.includes('Invalid vnode type')) return;
  originalWarn.apply(console, [msg, ...args]);
};

// Full mock of @ionic/vue so Jest does not load the real ESM package.
// Use component objects (not strings) so Vue never gets "Invalid vnode type: undefined".
// Proxy fallback ensures any Ion* export returns a valid stub (avoids undefined vnode).
jest.mock('@ionic/vue', () => {
  const vue = require('vue');
  const tag = (t) => ({
    name: t,
    render() {
      return vue.h(t, this.$attrs, this.$slots.default?.());
    },
  });
  const stubs = {
    IonicVue: { install: () => {} },
    IonApp: tag('ion-app'),
    IonRouterOutlet: tag('ion-router-outlet'),
    IonPage: tag('ion-page'),
    IonHeader: tag('ion-header'),
    IonToolbar: tag('ion-toolbar'),
    IonTitle: tag('ion-title'),
    IonContent: tag('ion-content'),
    IonButton: tag('ion-button'),
    IonButtons: tag('ion-buttons'),
    IonBackButton: tag('ion-back-button'),
    IonInput: tag('ion-input'),
    modalController: {
      create: jest.fn().mockResolvedValue({
        present: jest.fn(),
        onDidDismiss: jest.fn().mockResolvedValue({ data: null }),
      }),
    },
    loadingController: {
      create: jest.fn().mockResolvedValue({
        present: jest.fn(),
        dismiss: jest.fn(),
      }),
    },
    toastController: {
      create: jest.fn().mockResolvedValue({
        present: jest.fn(),
      }),
    },
  };
  // Fallback: any IonXxxYyy not listed gets tag('ion-xxx-yyy') so no undefined vnode
  return new Proxy(stubs, {
    get(target, prop) {
      if (Object.prototype.hasOwnProperty.call(target, prop)) return target[prop];
      if (typeof prop === 'string' && prop.startsWith('Ion')) {
        const kebab = 'ion-' + prop.slice(3).replace(/([A-Z])/g, (m) => '-' + m.toLowerCase()).replace(/^-/, '');
        return tag(kebab);
      }
      return undefined;
    },
  });
});
