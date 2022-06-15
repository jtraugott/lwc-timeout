import { LightningElement } from 'lwc';

export default class Timeout extends LightningElement {
  activityEvents = [
    'load',
    'mousedown',
    'mousemove',
    'keydown',
    'scroll',
    'touchstart',
  ];
  timeoutId;

  connectedCallback() {
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    for (const eventName of this.activityEvents) {
      window.addEventListener(eventName, this.resetInactivityTimeout);
    }
  }

  resetInactivityTimeout() {
    clearTimeout(this.timeoutId);
    // get pathname for url and remove /s/ if present, convert to logout url
    const logoutUrl = `${window.location.pathname.replace(
      /\/s\/$/,
      ''
    )}/secur/logout.jsp`;
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    this.timeoutId = setTimeout(() => {
      window.location.replace(logoutUrl);
      // 1000 x 60 x 60 x 4 = 14400000ms (4hrs)
    }, 14400000);
  }
}
