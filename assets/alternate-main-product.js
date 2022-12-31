Shopify.theme.sections.register('alternate-main-product', {
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

  async fetchData(e) {
    e.preventDefault();

    const { target } = e;

    const response = await fetch(`${target.action}.js`, {
      method: target.method,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: new FormData(target)
    });

    console.log(response);

    if (response.ok) {
      const result = await response.json();

      const event = new CustomEvent('cart:added', {
        detail: {
          header: result.sections['alternate-header']
        },
        bubbles: true
      });

      this.form.dispatchEvent(event);

      this.showNotification(response.statusText);
    } else {
      this.showNotification(response.statusText);
    }
  },

  onLoad() {
    this.accordion = new Accordion(this.container.querySelector(Accordion.selectors.accordion), 0);

    this.form = this.container.querySelector('.form');
    this.btnWrap = this.container.querySelector('.form__btn-wrap');

    this.form.addEventListener('submit', this.fetchData.bind(this));
  },

  onUnload() {
    this.form.removeEventListener('submit', this.fetchData);
  },

  onBlockSelect(e) {
    if (!this.accordion) return;

    this.accordion.toggle(e);
  }
});
