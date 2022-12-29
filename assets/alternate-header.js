document.addEventListener('cart:added', (e) => {
  const headerStr = e.detail.header;

  const parser = new DOMParser();

  const doc = parser.parseFromString(headerStr, 'text/html');

  const counter = document.querySelector('.main-nav__counter');

  if (!counter) return;

  counter.textContent = doc.querySelector('.main-nav__counter').textContent;
});