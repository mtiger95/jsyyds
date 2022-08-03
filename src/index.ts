import * as normal from './utils/normal';
import * as download from './utils/download';
import * as regExp from './utils/regExp';
import * as special from './utils/special';

export { normal,  download, regExp, special };

const jsyyds = {
  normal, 
  download, 
  regExp,
  special,
  ...normal, 
  ...download, 
  ...regExp,
  ...special,
};

export default jsyyds;
