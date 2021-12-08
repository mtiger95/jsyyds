// 数字格式化
function preZero (num) {
  return num >= 10 ? num : "0" + num;
}

/**
 * @description 将毫秒格式化成时间
 * @param {Number} timeStamp 毫秒
 * @returns 
 */
export const dateFormat = (timeStamp) => {
  let date = new Date(timeStamp);
  return date.getFullYear() + "年"
    + preZero(date.getMonth() + 1) + "月"
    + preZero(date.getDate()) + "日 "
    + preZero(date.getHours()) + ":"
    + preZero(date.getMinutes()) + ":"
    + preZero(date.getSeconds());
};

/**
 * @description 倒计时时间格式化，最大到N 天
 * @param {Number} timeStamp 毫秒数
 * @returns 
 */
export const countdownTime = (timeStamp) => {
  let day = Math.floor(timeStamp / (24 * 3600 * 1000));
  let leave1 = timeStamp % (24 * 3600 * 1000);
  let hours = Math.floor(leave1 / (3600 * 1000));
  let leave2 = leave1 % (3600 * 1000);
  let minutes = Math.floor(leave2 / (60 * 1000));
  let leave3 = leave2 % (60 * 1000);
  let seconds = Math.floor(leave3 / 1000);
  if (day) return day + "天" + hours + "小时" + minutes + "分";
  if (hours) return hours + "小时" + minutes + "分" + seconds + "秒";
  if (minutes) return minutes + "分" + seconds + "秒";
  if (seconds) return seconds + "秒";
  return true;
};


/**
 * @description 过去了多久，时间格式化
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export const formatPassedTime = (timeStamp) => {
  if (String(timeStamp).length === 10) {
    timeStamp = parseInt(timeStamp) * 1000;
  } else {
    timeStamp = +timeStamp;
  }
  const d = new Date(timeStamp);
  const now = Date.now();

  const diff = (now - d) / 1000;
  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    return `${Math.ceil(diff / 60)}分钟前`;
  } else if (diff < 3600 * 24) {
    return `${Math.ceil(diff / 3600)}小时前`;
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }

  return `${d.getMonth() + 1}月${d.getDate()}日${d.getHours()}时${d.getMinutes()}分`;
};
