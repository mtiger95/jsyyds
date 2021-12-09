import * as normal from './utils/normal';
import * as dateTime from './utils/dateTime';
import * as device from './utils/device';
import * as dom from './utils/dom';
import * as download from './utils/download';
import * as event from './utils/event';
import * as regExp from './utils/regExp';

export { normal, dateTime, device, dom, download, event, regExp };

const jsyyds = {
  normal,
  dateTime,
  device,
  dom,
  download,
  event,
  regExp,
  ...normal,
  ...dateTime,
  ...device,
  ...dom,
  ...download,
  ...event,
  ...regExp,
};

export default jsyyds;
