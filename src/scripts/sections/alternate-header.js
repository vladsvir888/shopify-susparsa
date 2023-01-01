import {register} from '@shopify/theme-sections';

register('alternate-header', {
  onLoad() {
    document.addEventListener('cart:added', this.onCartAdded.bind(this));
  },

  onCartAdded(event) {
    const headerStr = event.detail.header;

    const parser = new DOMParser();

    const doc = parser.parseFromString(headerStr, 'text/html');

    const counter = this.container.querySelector('.main-nav__counter');

    if (!counter) return;

    counter.textContent = doc.querySelector('.main-nav__counter').textContent;
  },

  onUnload() {
    document.removeEventListener('cart:added', this.onCartAdded);
  },
});
