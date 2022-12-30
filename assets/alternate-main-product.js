Shopify.theme.sections.register('alternate-main-product', {
  accordion: null,
  form: null,

  showError() {
    this.notificationError.classList.add('notification--active');

    setTimeout(() => {
      this.notificationError.classList.remove('notification--active');
    }, 1000);
  },

  showSuccess() {
    this.notificationSuccess.classList.add('notification--active');

    setTimeout(() => {
      this.notificationSuccess.classList.remove('notification--active');
    }, 1000);
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

    if (response.ok) {
      const result = await response.json();

      const event = new CustomEvent('cart:added', {
        detail: {
          header: result.sections['alternate-header']
        },
        bubbles: true
      });

      this.form.dispatchEvent(event);

      this.showSuccess();
    } else {
      this.showError();
    }
  },

  onLoad() {
    this.accordion = new Accordion(this.container.querySelector(Accordion.selectors.accordion), 0);

    this.form = this.container.querySelector('.form');
    this.notificationSuccess = this.form.querySelector('.notification--success');
    this.notificationError = this.form.querySelector('.notification--error');

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
