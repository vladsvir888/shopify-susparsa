class Accordion {
  static selectors = {
    accordion: '.accordion',
    accordion_item: '.accordion__item',
    accordion_btn: '.accordion__btn',
    accordion_content: '.accordion__content',
    accordion_item_active: '.accordion__item--active',
  };

  static classes = {
    accordion_btn: 'accordion__btn',
    accordion_item: 'accordion__item',
    accordion_item_active: 'accordion__item--active',
  };

  constructor(element, index) {
    this.accordion = element;

    this.accordion.addEventListener('click', this.toggle.bind(this));

    this.items = this.accordion.querySelectorAll(
      Accordion.selectors.accordion_item,
    );

    if (this.items.length > index && index >= 0) {
      this.updateState(this.items[index]);
    }
  }

  toggle(event) {
    const {target} = event;

    if (target.closest(Accordion.selectors.accordion_item)) {
      const accordion = target.closest(Accordion.selectors.accordion);

      const accordionItem = target.closest(Accordion.selectors.accordion_item);

      const accordionItemActive = accordion.querySelector(
        Accordion.selectors.accordion_item_active,
      );

      if (accordionItemActive && accordionItemActive !== accordionItem) {
        this.updateState(accordionItemActive);
      }

      this.updateState(accordionItem);
    }
  }

  updateState(element) {
    const accordionContent = element.lastElementChild;
    const accordionBtn = element.firstElementChild.firstElementChild;

    if (accordionContent.style.maxHeight) {
      element.classList.remove(Accordion.classes.accordion_item_active);
      accordionBtn.setAttribute('aria-expanded', false);
      accordionContent.removeAttribute('style');
    } else {
      element.classList.add(Accordion.classes.accordion_item_active);
      accordionBtn.setAttribute('aria-expanded', true);
      accordionContent.style.maxHeight = `${
        accordionContent.scrollHeight /
        parseInt(window.getComputedStyle(document.body).fontSize, 10)
      }rem`;
    }
  }
}

export default Accordion;
