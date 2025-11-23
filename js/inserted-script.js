import { initRandomMessages } from './random-messages/v1/initRandomMessages';

let IS_INIT_TRY = false;

document.addEventListener('DOMContentLoaded', tryInit);
document.addEventListener('load', tryInit);
document.onreadystatechange = () => tryInit();

function tryInit() {
  if (!IS_INIT_TRY) {
    init();
    initRandomMessages();
    IS_INIT_TRY = true;
  }
}

// rozetka.com.ua, on any of the product page
const SELECTOR = 'rz-gallery-main-content-image img';

const STYLES = `
    font-size: 18px;
    font-weight: bold;
    color: red;
    position: absolute;
    bottom: 20px;
`;

function init() {
  const _selectors = document.querySelectorAll(SELECTOR);

  if (_selectors.length === 0) {
    console.warn(
      'Bubbi task: can not find %O to insert HTML\nExit script',
      SELECTOR
    );

    // Wait, maybe next time selector will be available
    IS_INIT_TRY = false;

    return;
  }

  _selectors.forEach((i) => {
    i.insertAdjacentHTML('afterend', getHTML());
  });
}

function getHTML() {
  return `
    <div style="${STYLES}">
      <span id="infoTrigger">Show product message again</span>
    </div>
  `;
}
