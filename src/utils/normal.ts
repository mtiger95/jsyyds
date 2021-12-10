/**
 * @description 深拷贝
 * @param {*} obj
 * @param {*} cache
 * @returns {any}
 */
export const deepClone = (obj: any, cache: WeakMap<any, any> = new WeakMap()): any => {
  if (typeof obj !== 'object') return obj;
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
  return value != null && (type === 'object' || type === 'function');
};
