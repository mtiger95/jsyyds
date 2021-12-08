export const CN_REG = /^[\u4e00-\u9fa5]{0,}$/;
export const EMAIL_REG = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
export const ID_REG15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;
export const ID_REG18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
export const MOBILE_NUMBER_REG = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
export const URL_REG = /^\b(((https?|http?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i;
export const FLOAT_NUMBER_REG2 = /^[0-9]+(.[0-9]{2})?$/;
export const SPECIAL_SYMBOL_REG = /[^%&',;=?$\x22]+/;

export default {
  URL_REG,
  CN_REG,
  EMAIL_REG,
  MOBILE_NUMBER_REG,
  ID_REG15,
  ID_REG18,
  FLOAT_NUMBER_REG2,
  SPECIAL_SYMBOL_REG,
};
