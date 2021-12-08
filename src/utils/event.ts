/**
 * @description 高频事件防抖，控制是否立即执行
 * @param {*} fn
 * @param {*} delay
 * @returns {Function}
 */
export const debounce = (fn, delay, immediate = true) => {
  let timer = 0;
  return function (...args) {
    if (immediate && !timer) {
      // @ts-ignore
      fn.apply(this, args);
      timer = setTimeout(() => {
        immediate = false;
      }, delay);
    } else {
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        // @ts-ignore
        fn.apply(this, args);
      }, delay);
    }
  };
};

/**
 * @description 高频事件节流，控制是否立即执行
 * @param {*} fn
 * @param {*} delay
 * @returns {Function}
 */
export const throttle = (fn, delay, immediate = true) => {
  let last = 0;
  return function (...args) {
    const nowTime = Date.now();
    const canExec = nowTime - last > delay;
    if (immediate) {
      // @ts-ignore
      fn.apply(this, args);
      immediate = false;
    } else if (canExec) {
      last = nowTime;
      // @ts-ignore
      fn.apply(this, args);
    }
  };
};
