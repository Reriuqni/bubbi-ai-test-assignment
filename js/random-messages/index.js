import { POPUP_TRIGGER_TEXT_ID, SELECTOR_TO_INSERT } from './constants.js';
import {
  BUBBI_STYLED_MESSAGE_ERROR,
  BUBBI_STYLED_MESSAGE_SUCCESS,
  wrapConsoleLog,
} from './tools.js';
import { initRandomMessages } from './v2/index.js';

export const INIT_AFTER_DOMContentLoaded = 'DOMContentLoaded';
export const INIT_AFTER_load = 'load';
export const INIT_AFTER_onreadystatechange = 'onreadystatechange';
export const INIT_AFTER_TIMEOUT = 'timeout';
export const INIT_BY_INTERVAL = 'interval';

const REINSERT_TIMEOUT_MS = 10_000;

let intervalCalledTimes = 0;

document.addEventListener('DOMContentLoaded', () => {
  tryInit({ srcCall: INIT_AFTER_DOMContentLoaded });
});
document.addEventListener('load', () => {
  tryInit({ srcCall: INIT_AFTER_load });
});
document.onreadystatechange = () => {
  tryInit({ srcCall: INIT_AFTER_onreadystatechange });
};

const intervalId = setInterval(() => {
  tryInit({
    srcCall: INIT_BY_INTERVAL + ' ' + intervalGetMs() / 1000 + 's',
  });

  intervalCalledTimes++;
}, intervalGetMs());

function intervalGetMs() {
  const ms = 1000 * (intervalCalledTimes + 1);
  return ms;
}

setTimeout(() => {
  clearInterval(intervalId);
  tryInit({ srcCall: INIT_AFTER_TIMEOUT });
}, REINSERT_TIMEOUT_MS);

function tryInit({ srcCall = 'unknown src' } = {}) {
  wrapConsoleLog({ msg: 'check and try insert Popups by ' + srcCall });

  const txtSelector = SELECTOR_TO_INSERT + ' #' + POPUP_TRIGGER_TEXT_ID;

  const _selectors = document.querySelectorAll(txtSelector);

  if (_selectors.length === 0) {
    innerMessage({ srcCall });

    init();
    initRandomMessages();

    wrapConsoleLog({
      msg: `popups inserted by ${srcCall} call.`,
      style: BUBBI_STYLED_MESSAGE_SUCCESS,
    });
  } else {
    wrapConsoleLog({
      msg: `already inserted by ${srcCall} call. Skip insert.`,
    });
  }

  function innerMessage({ srcCall }) {
    let msg = `Cannot find ${txtSelector} to insert Popups. Inserting now.`;

    if (INIT_AFTER_TIMEOUT === srcCall) {
      msg = `Reinitializing after ${
        REINSERT_TIMEOUT_MS / 1000
      } seconds. Because something removed our element.`;
    }

    wrapConsoleLog({ msg, style: BUBBI_STYLED_MESSAGE_ERROR });
  }
}

const STYLES = `
    position: absolute;
    bottom: 20px;
`;

function init() {
  const _selectors = document.querySelectorAll(SELECTOR_TO_INSERT);

  if (_selectors.length === 0) {
    wrapConsoleLog({
      msg: `can not find ${SELECTOR_TO_INSERT} to insert HTML\nExit script`,
    });

    // Wait, maybe next time selector will be available
    IS_INIT_TRY = false;

    return;
  }

  _selectors.forEach((i) => {
    // i.insertAdjacentHTML('afterend', getHTML());
    i.insertAdjacentHTML('beforeend', getHTML());
  });
}

function getHTML() {
  return `
    <div style="${STYLES}">
      <span id="${POPUP_TRIGGER_TEXT_ID}">Show product message again</span>
    </div>
  `;
}
