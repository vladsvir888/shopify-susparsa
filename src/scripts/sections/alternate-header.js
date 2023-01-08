import {register} from '@shopify/theme-sections';

import Burger from '../components/burger';

register('alternate-header', {
  onLoad() {
    this.burger = new Burger().init();

    document.addEventListener('cart:added', this.onCartAdded.bind(this));
  },

  onUnload() {
    document.removeEventListener('cart:added', this.onCartAdded);
  },

  onCartAdded(event) {
    const headerStr = event.detail.header;

    const parser = new DOMParser();

    const doc = parser.parseFromString(headerStr, 'text/html');

    const counter = this.container.querySelector('.main-nav__counter');

    if (!counter) return;

    counter.textContent = doc.querySelector('.main-nav__counter').textContent;
  },
});
