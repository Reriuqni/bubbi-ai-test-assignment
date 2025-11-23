import { POPUP_TRIGGER_TEXT_ID, SELECTOR_TO_INSERT } from './constants.js';
import { initRandomMessages } from './randomMessages/index.js';
import {
  BUBBI_STYLED_MESSAGE_ERROR,
  BUBBI_STYLED_MESSAGE_SUCCESS,
  wrapConsoleLog,
} from './tools.js';

export function initPopUpTriggerInDOM({ srcCall = 'unknown src' } = {}) {
  wrapConsoleLog({ msg: 'check and try insert Popups by ' + srcCall });

  const txtSelector = SELECTOR_TO_INSERT + ' #' + POPUP_TRIGGER_TEXT_ID;

  const _selectors = document.querySelectorAll(txtSelector);

  if (_selectors.length === 0) {
    wrapConsoleLog({
      msg: `Cannot find "${txtSelector}" to insert Popups. Inserting now.`,
      style: BUBBI_STYLED_MESSAGE_ERROR,
    });

    initTriggerText();
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
}

function initTriggerText() {
  const _selectors = document.querySelectorAll(SELECTOR_TO_INSERT);

  if (_selectors.length === 0) {
    wrapConsoleLog({
      msg: `can not find ${SELECTOR_TO_INSERT} to insert HTML\nExit script`,
    });

    return;
  }

  _selectors.forEach((i) => i.insertAdjacentHTML('beforeend', getHTML()));
}

function getHTML() {
  return `
    <div style="position: absolute; bottom: 10px;">
      <span id="${POPUP_TRIGGER_TEXT_ID}">Show product message again</span>
    </div>
  `;
}
