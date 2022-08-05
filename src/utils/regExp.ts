/**
 * @description 数字相关正则
 */
export const FLOAT2_REG = /^\d*(?:.\d{0,2})?$/;
export const NUMBER_REG = /^[0-9]$/;

/**
 * @description 中文，英文，大小写相关正则
 */
export const CHINESE_REG = /^[\u4e00-\u9fa5]{0,}$/;
export const LOWER_REG = /^[a-z]+$/;
export const UPPER_REG = /^[A-Z]+$/;

/**
 * @description 各种号码相关正则
 */
export const QQ_REG = /^[1-9][0-9]{4,9}$/;
export const POSTCODE_REG = /[1-9]\d{5}(?!\d)/;
export const EMAIL_REG = /^[\w-]+(.[\w-]+)*@[\w-]+(.[\w-]+)+$/;
export const IP_REG =
  /((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))/;
export const IDCARD15_REG =
  /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;
export const IDCARD18_REG =
  /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
export const PHONE_REG = /^1[345789][0-9]\d{8}$/;
export const TEL_REG = /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/;

/**
 * @description 时间相关正则
 */
export const DATE_REG = /^(\d{4})-(\d{2})-(\d{2})$/;
export const DATETIME_REG =
  /^(\d{4})-(\d{2})-(\d{2}) (\d{2})(?::\d{2}|:(\d{2}):(\d{2}))$/;

/**
 * @description 其它正则，特殊字符检测
 */
export const SPECIAL_SYMBOL_REG = /[^%&',;=?$\x22]+/;
export const URL_REG =
  /(http|ftp|https):\/\/[\w-_]+(.[\w-_]+)+([\w-.,@?^=%&:/~+#]*[\w-@?^=%&/~+#])?/;
export const PWD_REG = /^[a-zA-Z]\w{5,17}$/;

/**
 * @description 常用正则验证，注意type大小写
 * @param str 要检测的字符串
 * @param type 要检测的类型
 * @returns {Boolean}
 */
export const regCheck = function (str: string, type: string) {
  switch (type) {
    case "PHONE": // 手机号码
      return PHONE_REG.test(str);
    case "TEL": // 座机
      return TEL_REG.test(str);
    case "IDCARD": // 身份证
      return IDCARD15_REG.test(str) || IDCARD18_REG.test(str);
    case "PWD": // 密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
      return PWD_REG.test(str);
    case "POSTCODE": // 邮政编码
      return POSTCODE_REG.test(str);
    case "QQ": // QQ号
      return QQ_REG.test(str);
    case "EMAIL": // 邮箱
      return EMAIL_REG.test(str);
    case "FLOAT2": // 金额或非整数(小数点2位)
      return FLOAT2_REG.test(str);
    case "URL": // 网址
      return URL_REG.test(str);
    case "IP": // IP
      return IP_REG.test(str);
    case "DATE": // 日期
      return DATE_REG.test(str);
    case "DATETIME": // 日期时间
      return DATETIME_REG.test(str);
    case "NUMBER": // 数字
      return NUMBER_REG.test(str);
    case "CHINESE": // 中文
      return CHINESE_REG.test(str);
    case "LOWER": // 小写
      return LOWER_REG.test(str);
    case "UPPER": // 大写
      return UPPER_REG.test(str);
    default:
      return true;
  }
};

export default {
  FLOAT2_REG,
  NUMBER_REG,
  CHINESE_REG,
  LOWER_REG,
  UPPER_REG,
  QQ_REG,
  POSTCODE_REG,
  EMAIL_REG,
  IP_REG,
  IDCARD15_REG,
  IDCARD18_REG,
  PHONE_REG,
  TEL_REG,
  DATE_REG,
  DATETIME_REG,
  SPECIAL_SYMBOL_REG,
  URL_REG,
  PWD_REG,
  regCheck,
};
