/**
 * Manual mock for @ionic/vue.
 *
 * Loaded via moduleNameMapper in jest.config.js so that EVERY import of
 * '@ionic/vue' — including from compiled SFCs — resolves here instead of
 * the real ESM package.
 *
 * What this provides:
 *   - Lightweight component stubs (render the kebab tag + pass-through attrs/slots)
 *   - Controller mocks (loadingController, toastController, modalController, alertController)
 *   - A Proxy fallback for any Ion* component not explicitly listed
 */
const vue = require('vue');

// Helper: creates a minimal Vue component that renders as the given tag
const tag = (t) => ({
  name: t,
  render() {
    return vue.h(t, this.$attrs, this.$slots.default?.());
  },
});

// ---------------------------------------------------------------------------
// Component stubs
// ---------------------------------------------------------------------------
const IonicVue = { install: () => {} };

const IonApp = tag('ion-app');
const IonRouterOutlet = tag('ion-router-outlet');
const IonPage = tag('ion-page');
const IonHeader = tag('ion-header');
const IonToolbar = tag('ion-toolbar');
const IonTitle = tag('ion-title');
const IonContent = tag('ion-content');
const IonButton = tag('ion-button');
const IonButtons = tag('ion-buttons');
const IonBackButton = tag('ion-back-button');
const IonInput = tag('ion-input');
const IonText = tag('ion-text');
const IonLabel = tag('ion-label');
const IonItem = tag('ion-item');
const IonList = tag('ion-list');

// ---------------------------------------------------------------------------
// Controller mocks — jest.fn() so tests can assert calls and set return values
// ---------------------------------------------------------------------------
const loadingController = {
  create: jest.fn().mockResolvedValue({
    present: jest.fn(),
    dismiss: jest.fn(),
  }),
};

const toastController = {
  create: jest.fn().mockResolvedValue({
    present: jest.fn(),
    dismiss: jest.fn(),
  }),
};

const modalController = {
  create: jest.fn().mockResolvedValue({
    present: jest.fn(),
    onDidDismiss: jest.fn().mockResolvedValue({ data: null }),
  }),
};

const alertController = {
  create: jest.fn().mockResolvedValue({
    present: jest.fn(),
    onDidDismiss: jest.fn().mockResolvedValue({ data: null }),
  }),
};

// ---------------------------------------------------------------------------
// Build the exports object with a Proxy fallback for unlisted Ion* components
// ---------------------------------------------------------------------------
const stubs = {
  __esModule: true,
  IonicVue,
  IonApp,
  IonRouterOutlet,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonBackButton,
  IonInput,
  IonText,
  IonLabel,
  IonItem,
  IonList,
  loadingController,
  toastController,
  modalController,
  alertController,
};

// Proxy: any IonXxx not listed above gets an auto-generated stub
module.exports = new Proxy(stubs, {
  get(target, prop) {
    if (Object.prototype.hasOwnProperty.call(target, prop)) return target[prop];
    if (typeof prop === 'string' && prop.startsWith('Ion')) {
      const kebab =
        'ion-' +
        prop
          .slice(3)
          .replace(/([A-Z])/g, (m) => '-' + m.toLowerCase())
          .replace(/^-/, '');
      target[prop] = tag(kebab); // cache so the same ref is returned next time
      return target[prop];
    }
    return undefined;
  },
});
