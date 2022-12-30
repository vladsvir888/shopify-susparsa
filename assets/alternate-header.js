Shopify.theme.sections.register('alternate-header', {
  onLoad: function () {
    document.addEventListener('cart:added', this.onCartAdded.bind(this));
  },

  onCartAdded: function(e) {  
    const headerStr = e.detail.header;

    const parser = new DOMParser();

    const doc = parser.parseFromString(headerStr, 'text/html');

    const counter = this.container.querySelector('.main-nav__counter');

    if (!counter) return;

    counter.textContent = doc.querySelector('.main-nav__counter').textContent;
  },

  onUnload: function() {
    document.removeEventListener('cart:added', this.onCartAdded);
  }
});
