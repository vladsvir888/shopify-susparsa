class Burger {
  static selectors = {
    btn: '.burger',
    menu: '.burger-menu',
  };

  constructor() {
    this.btn = document.querySelector(Burger.selectors.btn);
    this.menu = document.querySelector(Burger.selectors.menu);

    if (!this.btn) return;

    this.btn.addEventListener('click', this.onClick.bind(this));
  }

  onClick() {
    if (this.btn.classList.contains('burger--active')) {
      this.btn.classList.remove('burger--active');
      this.btn.setAttribute('aria-expanded', false);
      this.menu.classList.remove('burger-menu--active');
    } else {
      this.btn.classList.add('burger--active');
      this.btn.setAttribute('aria-expanded', true);
      this.menu.classList.add('burger-menu--active');
    }
  }
}

export default Burger;
