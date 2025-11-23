import { initPopUpTriggerInDOM } from './initPopUpTriggerInDOM.js';

export const INIT_AFTER_DOMContentLoaded = 'DOMContentLoaded';
export const INIT_AFTER_load = 'load';
export const INIT_AFTER_onreadystatechange = 'onreadystatechange';
export const INIT_AFTER_TIMEOUT = 'timeout';
export const INIT_BY_INTERVAL = 'interval';

const TIMEOUT_REINSERT_MS = 10_000;
const INTERVAL_REINSERT_MS = 500;

let intervalCalledTimes = 0;

document.addEventListener('DOMContentLoaded', () => {
  initPopUpTriggerInDOM({ srcCall: INIT_AFTER_DOMContentLoaded });
});

document.addEventListener('load', () => {
  initPopUpTriggerInDOM({ srcCall: INIT_AFTER_load });
});

document.onreadystatechange = () => {
  initPopUpTriggerInDOM({ srcCall: INIT_AFTER_onreadystatechange });
};

const intervalId = setInterval(() => {
  initPopUpTriggerInDOM({
    srcCall: INIT_BY_INTERVAL + ' ' + intervalGetMs() / 1000 + 's',
  });

  intervalCalledTimes++;
}, intervalGetMs());

// Interval increases by 0.5 seconds each time
function intervalGetMs() {
  const ms = INTERVAL_REINSERT_MS * (intervalCalledTimes + 1);
  return ms;
}

// Final attempt after timeout
setTimeout(() => {
  clearInterval(intervalId);
  initPopUpTriggerInDOM({ srcCall: INIT_AFTER_TIMEOUT });
}, TIMEOUT_REINSERT_MS);
