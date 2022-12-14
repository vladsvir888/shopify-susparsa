// show/hide burger-menu
const burger = () => {
    const burgerBtn = document.querySelector('.burger');
    const burgerMenu = document.querySelector('.burger-menu');

    if (!burgerBtn) return;

    burgerBtn.addEventListener('click', () => {
        if (!burgerBtn.classList.contains('burger--active')) {
            burgerBtn.classList.add('burger--active');
            burgerBtn.setAttribute('aria-expanded', true);
            burgerMenu.classList.add('burger-menu--active');
        } else {
            burgerBtn.classList.remove('burger--active');
            burgerBtn.setAttribute('aria-expanded', false);
            burgerMenu.classList.remove('burger-menu--active');
        }
    });
};

burger();

// accordion
const SELECTORS = {
    ACCORDION: '.accordion',
    ACCORDION_ITEM: '.accordion__item',
    ACCORDION_BTN: '.accordion__btn',
    ACCORDION_CONTENT: '.accordion__content',
    ACCORDION_ITEM_ACTIVE: '.accordion__item--active'
};

const CLASSES = {
    ACCORDION_BTN: 'accordion__btn',
    ACCORDION_ITEM_ACTIVE: 'accordion__item--active'
};

class Accordion {
    constructor(selector) {
        this.elements = document.querySelectorAll(selector);

        this.elements.forEach(element => element.addEventListener('click', this.onClick.bind(this)));
    }

    onClick(e) {
        const { target } = e;

        if (!target.classList.contains(CLASSES.ACCORDION_BTN)) return;

        const accordionItem = target.closest(SELECTORS.ACCORDION_ITEM);

        const accordion = target.closest(SELECTORS.ACCORDION);

        const accordionItemActive = accordion.querySelector(SELECTORS.ACCORDION_ITEM_ACTIVE);

        if (accordionItemActive && accordionItemActive !== accordionItem) { // if there is active and it is not equal target of parent
            this.toggle(accordionItemActive);
        }

        this.toggle(accordionItem);
    }

    toggle(element) {
        const accordionContent = element.querySelector(SELECTORS.ACCORDION_CONTENT);
        const accordionBtn = element.querySelector(SELECTORS.ACCORDION_BTN);

        if (!accordionContent.style.maxHeight) {
            element.classList.add(CLASSES.ACCORDION_ITEM_ACTIVE);
            accordionBtn.setAttribute('aria-expanded', true);
            accordionContent.style.maxHeight = `${accordionContent.scrollHeight / parseInt(window.getComputedStyle(document.body).fontSize)}rem`;
        } else {
            element.classList.remove(CLASSES.ACCORDION_ITEM_ACTIVE);
            accordionBtn.setAttribute('aria-expanded', false);
            accordionContent.removeAttribute('style');
        }
    }

    open(element) {
        this.toggle(element);
    }
}

const accordion = new Accordion(SELECTORS.ACCORDION);

document.querySelectorAll(SELECTORS.ACCORDION).forEach(item => {
    const firstElementChild = item.querySelector(SELECTORS.ACCORDION_ITEM);

    accordion.open(firstElementChild);
});
