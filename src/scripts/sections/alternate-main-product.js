import {register} from '@shopify/theme-sections';

import Accordion from '../components/accordion';

register('alternate-main-product', {
  accordion: null,
  form: null,

  showNotification(notification) {
    const strNotification = `
        <div class="notification" role="alert">${notification}</div>
      `;

    this.btnWrap.insertAdjacentHTML('afterbegin', strNotification);

    const notificationMessage = this.btnWrap.querySelector('.notification');

    if (!notificationMessage) return;

    setTimeout(() => {
      notificationMessage.classList.add('notification--active');

      setTimeout(() => {
        notificationMessage.remove();
      }, 1000);
    }, 500);
  },

  isStatusText(text) {
    return Boolean(text);
  },

  async fetchData(event) {
    event.preventDefault();

    const {target} = event;

    const response = await fetch(`${target.action}.js`, {
      method: target.method,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: new FormData(target),
    });

    if (response.ok) {
      const result = await response.json();

      const cartAddedEvent = new CustomEvent('cart:added', {
        detail: {
          header: result.sections['alternate-header'],
        },
        bubbles: true,
      });

      this.form.dispatchEvent(cartAddedEvent);

      const isStatusText = this.isStatusText(response.statusText);

      if (isStatusText) {
        this.showNotification(response.statusText);
      } else {
        this.showNotification('Product added to cart.');
      }
    } else {
      const isStatusText = this.isStatusText(response.statusText);

      if (isStatusText) {
        this.showNotification(response.statusText);
      } else {
        this.showNotification('Something went wrong.');
      }
    }
  },

  onLoad() {
    this.accordion = new Accordion(
      this.container.querySelector(Accordion.selectors.accordion),
      0,
    );

    this.form = this.container.querySelector('.form');
    this.btnWrap = this.container.querySelector('.form__btn-wrap');

    this.form.addEventListener('submit', this.fetchData.bind(this));
  },

  onUnload() {
    this.form.removeEventListener('submit', this.fetchData);
  },

  onBlockSelect(event) {
    if (!this.accordion) return;

    this.accordion.toggle(event);
  },
});
