import { IAnyObj } from "../types";

/**
 * @description 深拷贝
 * @param {*} obj
 * @param {*} cache
 * @returns {any}
 */
export const deepClone = (
  obj: any,
  cache: WeakMap<any, any> = new WeakMap()
): any => {
  if (typeof obj !== "object") return obj;
  if (obj === null) return obj;
  if (cache.get(obj)) return cache.get(obj);
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  const cloneObj = new obj.constructor();
  cache.set(obj, cloneObj);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloneObj[key] = deepClone(obj[key], cache);
    }
  }

  return cloneObj;
};

/**
 * @description 检查value是否为Object类型
 * @param {*} value
 * @returns {Boolean}
 */
export const isObject = (value: any): boolean => {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
};

/**
 * @description 聚合函数
 * @param fn 要聚合的函数
 * @returns {*}
 */
export const composeFns = (...fn: Array<(...args: any) => any>) => {
  if (fn.length === 0) return (...arg: any) => arg;
  if (fn.length === 1) return fn[0];

  return fn.reduce((pre, next) => {
    return (arg) => next(pre(arg));
  });
};

/**
 * @description 获取url 上的query参数并转化为对象
 * @returns {Object}
 */
export const getQueryObj = () => {
  const queryObj = {} as IAnyObj;
  window.location.search.replace(
    /([^?&=]+)=([^&]+)/g,
    (_, k, v) => (queryObj[k] = v)
  );
  return queryObj;
};

/**
 * @description 获取两个整数之间的随机整数
 * @param min 最小整数
 * @param max 最大整数
 * @returns {Number} 两个整数之间的随机整数
 */
export const getIntRandom = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

/**
 * @description 检验字符串是否是回文
 * @param str 要检验的字符串
 * @returns {Boolean}
 */
export const isPalindrome = (str: string) => {
  str = str.replace(/\W/g, "").toLowerCase();
  return str == str.split("").reverse().join("");
};

// const getImgUrl = (name: string) => {
//   const path = `../../src/assets/images/${name}`;
//   const modules = import.meta.globEager('../../src/assets/images/*');
//   return modules[path].default;
// };
 

