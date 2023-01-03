class Counter {
  static selectors = {
    counter: '.counter',
    input: '.counter__input',
    btn: '.counter__btn',
  };

  constructor() {
    this.counter = document.querySelector(Counter.selectors.counter);
    this.input = this.counter.querySelector(Counter.selectors.input);
    this.btns = this.counter.querySelectorAll(Counter.selectors.btn);
  }

  init() {
    this.btns.forEach((btn) =>
      btn.addEventListener('click', this.onClick.bind(this)),
    );
  }

  onClick(event) {
    if (event.target.ariaLabel.toLowerCase().trim() === 'increase') {
      this.input.stepUp();
    } else if (this.input.value > 1) {
      this.input.stepDown();
    }
  }
}

export default Counter;
