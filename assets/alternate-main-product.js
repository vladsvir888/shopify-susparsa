Shopify.theme.sections.register('alternate-main-product', {
  accordion: null,

  onLoad: function() {
    this.accordion = new Accordion(this.container.querySelector(Accordion.selectors.accordion), 0);
  },

  onBlockSelect: function(e) {
    if (!this.accordion) return;

    this.accordion.toggle(e);
  }
});