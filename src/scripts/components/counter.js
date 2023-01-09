class Counter {
  static selectors = {
    counter: '.counter',
    input: '.counter__input',
    btn: '.counter__btn',
  };

  static init(containerEl) {
    return new Counter(containerEl);
  }

  constructor(containerEl) {
    this.counter = containerEl.querySelector(Counter.selectors.counter);
    this.input = this.counter.querySelector(Counter.selectors.input);
    this.btns = this.counter.querySelectorAll(Counter.selectors.btn);

    this.btns.forEach((btn) =>
      btn.addEventListener('click', this.onClick.bind(this)),
    );
  }

  onClick(event) {
    if (event.target.classList.contains('counter__btn--plus')) {
      this.input.stepUp();
    } else if (this.input.value > 1) {
      this.input.stepDown();
    }
  }
}

export default Counter;
