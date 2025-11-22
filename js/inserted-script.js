document.addEventListener('DOMContentLoaded', (e) => init());

// Rozetka.com.ua, product page
const SELECTOR = 'rz-gallery-main-content-image img';

function init() {
  const _selectors = document.querySelectorAll(SELECTOR);

  if (_selectors.length === 0) {
    console.warn(
      'Bubbi task: can not find %O to insert HTML\nExit script',
      SELECTOR
    );
    return;
  }

  _selectors.forEach((i) => {
    i.insertAdjacentHTML(
      'afterend',
      '<div style="font-size: 20px; font-weight: bold; color: red;">My test message</div>'
    );
  });
}
