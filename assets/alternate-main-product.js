Shopify.theme.sections.register('alternate-main-product', {
  accordion: null,

  onLoad: function () {
    this.accordion = new Accordion(this.container.querySelector(Accordion.selectors.accordion), 0);
  },

  onBlockSelect: function (e) {
    if (!this.accordion) return;

    this.accordion.toggle(e);
  }
});

function handlerForm() {
  const form = document.getElementById('product-form');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const {
      target
    } = e;

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

      form.dispatchEvent(event);
    } else {
      console.log(response.statusText);
    }
  });
}

handlerForm();