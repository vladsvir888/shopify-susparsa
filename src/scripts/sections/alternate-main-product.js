import {register} from '@shopify/theme-sections';
import {getUrlWithVariant, ProductForm} from '@shopify/theme-product-form';
import * as currency from '@shopify/theme-currency';

import Accordion from '../components/accordion';
import Counter from '../components/counter';
import showNotification from '../components/notification';

register('alternate-main-product', {
  onLoad() {
    this.accordion = new Accordion(
      this.container.querySelector(Accordion.selectors.accordion),
      0,
    );
    this.counter = Counter.init(this.container);
    this.form = this.container.querySelector('.form');
    this.checkoutLink = this.container.querySelector(
      '.product-card__checkout-btn',
    );
    this.addToCartBtn = this.container.querySelector(
      '.product-card__add-cart-btn',
    );
    this.quantityInput = this.container.querySelector('.counter__input');
    this.colorEl = this.container.querySelector('.form__caption-color');
    this.priceEl = this.container.querySelector('.product-card__price-num');
    this.productHandle = this.container.dataset.handle;

    this.fetchProduct(this.productHandle, this.form);

    document.addEventListener('input', this.setHrefForLink.bind(this));
  },

  onUnload() {
    this.form.removeEventListener('submit', this.fetchData);
    this.productForm.destroy();
  },

  onBlockSelect(event) {
    if (!this.accordion) return;

    this.accordion.toggle(event);
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

      showNotification(`${result.title} added to your cart`, 'success');
    } else {
      showNotification(result.description, 'error');
    }
  },

  onOptionChange() {
    const variant = this.productForm.variant();
    const color = variant.options[1].split('|')[0];
    const price = currency.formatMoney(variant.price, window.money_format);

    if (!variant) return;

    const url = getUrlWithVariant(window.location.href, variant.id);
    window.history.replaceState({path: url}, '', url);

    this.colorEl.textContent = color;
    this.priceEl.textContent = price;

    if (variant.available) {
      this.addToCartBtn.removeAttribute('disabled');
      this.addToCartBtn.textContent = this.addToCartBtn.dataset.atc;
      this.setHrefForLink();
    } else {
      this.addToCartBtn.setAttribute('disabled', true);
      this.addToCartBtn.textContent = this.addToCartBtn.dataset.unavailable;
      this.checkoutLink.removeAttribute('href');
    }
  },

  async fetchProduct(productHandle, form) {
    const response = await fetch(`/products/${productHandle}.js`);

    if (response.ok) {
      const data = await response.json();

      this.productForm = new ProductForm(form, data, {
        onOptionChange: this.onOptionChange.bind(this),
        onFormSubmit: this.onFormSubmit.bind(this),
      });

      this.onOptionChange();
    }
  },

  setHrefForLink() {
    const idVariant = this.productForm.variant().id;

    this.checkoutLink.setAttribute(
      'href',
      `${window.location.origin}/cart/${idVariant}:${this.quantityInput.value}`,
    );
  },
});
