
/**
 * @description 获取页面高度
 * @returns {Number}
 */
export const getPageHeight = () => {
  const g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat"
    ? a
    : g.documentElement;
  return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);
};

/**
 * @description 获取页面宽度
 * @returns {Number}
 */
export const getPageWidth = () => {
  const g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat"
    ? a
    : g.documentElement;
  return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
};
