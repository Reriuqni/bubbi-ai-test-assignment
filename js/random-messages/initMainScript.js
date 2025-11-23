import { tryInitPopUpTriggerInDOM } from './tryInitPopUpTriggerInDOM.js';

export const INIT_AFTER_DOMContentLoaded = 'DOMContentLoaded';
export const INIT_AFTER_load = 'load';
export const INIT_AFTER_onreadystatechange = 'onreadystatechange';
export const INIT_AFTER_TIMEOUT = 'timeout';
export const INIT_BY_INTERVAL = 'interval';

const REINSERT_TIMEOUT_MS = 10_000;

let intervalCalledTimes = 0;

document.addEventListener('DOMContentLoaded', () => {
  tryInitPopUpTriggerInDOM({ srcCall: INIT_AFTER_DOMContentLoaded });
});

document.addEventListener('load', () => {
  tryInitPopUpTriggerInDOM({ srcCall: INIT_AFTER_load });
});

document.onreadystatechange = () => {
  tryInitPopUpTriggerInDOM({ srcCall: INIT_AFTER_onreadystatechange });
};

const intervalId = setInterval(() => {
  tryInitPopUpTriggerInDOM({
    srcCall: INIT_BY_INTERVAL + ' ' + intervalGetMs() / 1000 + 's',
  });

  intervalCalledTimes++;
}, intervalGetMs());

function intervalGetMs() {
  const ms = 100 * (intervalCalledTimes + 1);
  return ms;
}

setTimeout(() => {
  clearInterval(intervalId);
  tryInitPopUpTriggerInDOM({ srcCall: INIT_AFTER_TIMEOUT });
}, REINSERT_TIMEOUT_MS);
