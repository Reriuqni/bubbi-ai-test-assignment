import { getPopUpStyles } from './random-messages/getPopUpStyles';
import { initRandomMessages } from './random-messages/initRandomMessages';

document.onreadystatechange = () => {
  init();
  initRandomMessages();
};

// Rozetka.com.ua, product page
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
    return;
  }

  _selectors.forEach((i) => {
    i.insertAdjacentHTML('afterend', getHTML());
  });
}

function getHTML() {
  return `
    ${getPopUpStyles()}
    <div style="${STYLES}">
      <span id="infoTrigger">Show product message again</span>
    </div>
  `;
}
