declare global {
  interface Window {
    OneSignal: any;
  }
}

let OneSignal = window.OneSignal || {};
