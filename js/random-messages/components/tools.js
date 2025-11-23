const INSERTED_SCRIPT_LOG_PREFIX = '%c Bubbi-AI Script:';

const BUBBI_STYLED_MESSAGE_COMMON =
  'color: white; padding: 1px 4px; border-radius: 4px;';
const BUBBI_STYLED_MESSAGE_INFO =
  'background: grey; ' + BUBBI_STYLED_MESSAGE_COMMON;

export const BUBBI_STYLED_MESSAGE_SUCCESS =
  'background: green; ' + BUBBI_STYLED_MESSAGE_COMMON;
export const BUBBI_STYLED_MESSAGE_ERROR =
  'background: red; ' + BUBBI_STYLED_MESSAGE_COMMON;

export function wrapConsoleLog({
  msg = 'unknown message',
  style = BUBBI_STYLED_MESSAGE_INFO,
} = {}) {
  console.log(`${INSERTED_SCRIPT_LOG_PREFIX} ${msg}`, style);
}
