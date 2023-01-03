import {register} from '@shopify/theme-sections';
import {getUrlWithVariant, ProductForm} from '@shopify/theme-product-form';
import * as currency from '@shopify/theme-currency';

import Accordion from '../components/accordion';

register('alternate-main-product', {
  accordion: null,
  form: null,
  productForm: null,

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
      }, 1500);
    }, 500);
  },

  async onFormSubmit(event) {
    event.preventDefault();

    const {target} = event;

    const response = await fetch(`${target.action}.js`, {
      method: target.method,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: new FormData(target),
    });

    const result = await response.json();

    if (response.ok) {
      const cartAddedEvent = new CustomEvent('cart:added', {
        detail: {
          header: result.sections['alternate-header'],
        },
        bubbles: true,
      });

      this.form.dispatchEvent(cartAddedEvent);

      this.showNotification(`${result.title} added to your cart`);
    } else {
      this.showNotification(result.description);
    }
  },

  onOptionChange(event) {
    const variant = event.dataset.variant;
    const productCard = event.target.closest('.product-card');
    const addToCartBtn = productCard.querySelector(
      '.product-card__btn[value="add"]',
    );
    const priceEl = productCard.querySelector('.product-card__price-num');
    const price = currency.formatMoney(variant.price, window.vs888MoneyFormat);

    if (!variant) return;

    const url = getUrlWithVariant(window.location.href, variant.id);
    window.history.replaceState({path: url}, '', url);

    priceEl.textContent = price;

    if (variant.available) {
      addToCartBtn.removeAttribute('disabled');
    } else {
      addToCartBtn.setAttribute('disabled', true);
    }
  },

  async fetchProduct(productHandle, form) {
    const response = await fetch(`/products/${productHandle}.js`);

    if (response.ok) {
      const data = await response.json();

      // eslint-disable-next-line no-unused-vars
      const productForm = new ProductForm(form, data, {
        onOptionChange: this.onOptionChange,
        onFormSubmit: this.onFormSubmit.bind(this),
      });
    }
  },

  onLoad() {
    this.accordion = new Accordion(
      this.container.querySelector(Accordion.selectors.accordion),
      0,
    );

    this.form = this.container.querySelector('.form');
    this.btnWrap = this.container.querySelector('.form__btn-wrap');
    this.productHandle = this.container.dataset.handle;
    this.fetchProduct(this.productHandle, this.form);
  },

  onUnload() {
    this.form.removeEventListener('submit', this.fetchData);
    this.productForm.destroy();
  },

  onBlockSelect(event) {
    if (!this.accordion) return;

    this.accordion.toggle(event);
  },
});
