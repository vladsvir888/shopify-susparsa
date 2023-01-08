import * as focusTrap from 'focus-trap';

class Burger {
  static selectors = {
    btn: '.burger',
    menu: '.burger-menu',
    header: '.header',
    header_logo: '.header__logo',
  };

  static classes = {
    menu: 'burger-menu--active',
  };

  init() {
    this.btn = document.querySelector(Burger.selectors.btn);
    this.menu = document.querySelector(Burger.selectors.menu);
    this.trap = focusTrap.createFocusTrap(Burger.selectors.header);
    this.logo = document.querySelector(Burger.selectors.header_logo);

    this.btn.addEventListener('click', this.onClick.bind(this));
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  onClick() {
    if (this.btn.classList.contains('burger--active')) {
      this.btn.classList.remove('burger--active');
      this.btn.setAttribute('aria-expanded', false);
      this.menu.classList.remove('burger-menu--active');
      this.logo.removeAttribute('tabindex');
      this.trap.deactivate();
    } else {
      this.btn.classList.add('burger--active');
      this.btn.setAttribute('aria-expanded', true);
      this.menu.classList.add('burger-menu--active');
      this.logo.tabIndex = -1;
      this.trap.activate();
    }
  }

  onKeyDown(event) {
    if (
      !(
        event.code === 'Escape' &&
        this.menu.classList.contains(Burger.classes.menu)
      )
    )
      return;

    this.btn.classList.remove('burger--active');
    this.btn.setAttribute('aria-expanded', false);
    this.menu.classList.remove('burger-menu--active');
    this.logo.removeAttribute('tabindex');
    this.trap.deactivate();
  }
}

export default Burger;
