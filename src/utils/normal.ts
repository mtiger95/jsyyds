import { IAnyObj } from "../types";

/**
 * @description 深拷贝
 * @param {any} obj
 * @param {any} [cache]
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
 * @description 聚合函数
 * @param {function} fn 要聚合的函数
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
 * @description 直接获取当前url 上的query参数并转化为对象
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

/**
 * @description 休眠函数
 * @param delay 休眠时间
 * @returns {Promise}
 */
export const sleep = (delay: number) => {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};

/**
 * @description: 模拟lodash的 get 方法
 * @param {Object} object
 * @param {Array|String} path - 路径例：'a.b[0].c' 或者 ['a', 'b', '0', 'c']
 * @param {any} defaultValue
 * @return {*} - 返回路径对应的值
 */
export function deepGet(
  object: IAnyObj = {},
  path: string | string[],
  defaultValue: any
) {
  return (
    (Array.isArray(path)
      ? path
      : path.replace(/\[/g, ".").replace(/\]/g, "").split(".")
    ).reduce((o, k) => (o || {})[k], object) || defaultValue
  );
}

/**
 * @description: 树形数据根据条件过滤
 * @param {Array} list
 * @param {Function} filterFn
 * @return {Array}
 */
export const recusiveTreeFilter = (
  list: IAnyObj[] = [],
  filterFn = (v: any) => v
) => {
  return list.reduce((pre: IAnyObj[], item) => {
    const { children = [] } = item;
    const curItemOk = filterFn(item);
    if (curItemOk) {
      if (children.length > 0) {
        const _children = recusiveTreeFilter(children, filterFn);
        const curItem = { ...item, children: _children };
        pre = [...pre, curItem];
      } else {
        pre = [...pre, item];
      }
    }

    return pre;
  }, []);
};

/**
 * @description: 将树形数据根据指定字段名转换为组件展示格式数据
 * @param {Array} list 对象数组
 * @param {Array} mapKeys 字段映射对象
 * @return {Array}
 */
export const dataTransKeys = (
  list: IAnyObj[] = [],
  mapKeys: IAnyObj = { label: "label", value: "value" }
) => {
  const keys = Object.keys(mapKeys);
  return list.reduce((pre: IAnyObj[], item) => {
    let { children = [] } = item;

    keys.forEach((key) => {
      const dataKey = mapKeys[key];
      item[key] = item[dataKey];
    });

    if (children.length > 0) {
      children = dataTransKeys(children, mapKeys);
    }

    return [...pre, { ...item, children }];
  }, []);
};

/**
 * @description: 树形数据深层根据id查找
 * @param {Array} tree
 * @param {number} id
 * @param {string} parentIdKey
 * @return {*}
 */
export const deepSearch = (
  tree: IAnyObj[],
  id: number,
  parentIdKey: "parent_id"
) => {
  let parent_id = 0;
  let currItem = null;
  let temp = deepClone(tree);
  while (temp.length > 0) {
    const curr = temp.shift();
    if (curr.id === id) {
      parent_id = curr[parentIdKey];
      temp = deepClone(tree);
      break;
    }
    if (curr.children && curr.children.length > 0) {
      temp = [].concat(temp, curr.children);
    }
  }
  while (temp.length > 0) {
    const curr = temp.shift();
    if (curr.id === parent_id) {
      currItem = curr;
      break;
    }
    if (curr.children && curr.children.length > 0) {
      temp = [].concat(temp, curr.children);
    }
  }
  return currItem;
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
 * @description: 深度浅比较两个对象数组是否相等
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {boolean}
 */
export const isEqualArray = (arr1: any, arr2: any) => {
  let Equal = true;
  if (isObject(arr1) && isObject(arr2)) {
    const aProps = Object.getOwnPropertyNames(arr1);
    const bProps = Object.getOwnPropertyNames(arr2);
    if (aProps.length !== bProps.length) {
      Equal = false;
      return Equal;
    }
    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i];
      const propA = arr1[propName];
      const propB = arr2[propName];
      if (isObject(propA) && isObject(propB)) {
        if (!isEqualArray(propA, propB)) {
          Equal = false;
          return Equal;
        }
      } else if (propA !== propB) {
        Equal = false;
        return Equal;
      }
    }
  } else if (arr1 !== arr2) {
    Equal = false;
    return Equal;
  }
  return Equal;
};

/**
 * @description: 判断两个对象是否相等，同属性同值
 * @param {object} a
 * @param {object} b
 * @return {boolean}
 */
export const isEqualObject = (a: IAnyObj, b: IAnyObj) => {
  if (a === b) return true;
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  if (aProps.length !== bProps.length) return false;

  if (isObject(a) && isObject(b)) {
    for (const prop in a) {
      if (Object.prototype.hasOwnProperty.call(b, prop)) {
        if (typeof a[prop] === "object" && a[prop] !== null) {
          if (!isEqualObject(a?.[prop], b?.[prop])) return false;
        } else if (a?.[prop] !== b?.[prop]) {
          return false;
        }
      } else {
        return false;
      }
    }
  }
  return true;
};

/**
 * @description: 从一维对象数组中过滤掉某些属性
 * @param {T} arr
 * @param {Array<string>} omitProps
 * @return {T}
 */
export const omitPropInObjArray = (arr = [], omitProps: string[] = []) => {
  return arr.map((item) => {
    const itemKeys = Object.keys(item);
    return itemKeys.reduce((pre: IAnyObj, curKey) => {
      if (!omitProps.includes(curKey)) {
        pre[curKey] = item[curKey];
      }
      return pre;
    }, {});
  });
};

/**
 * @description: 深层合并打平对象数组
 * @param {T} arr
 * @param {Array<string>} omitProps
 * @return {T}
 */
export const flattern: (arr: IAnyObj[], key: string) => IAnyObj[] = (
  arr,
  key = "children"
) => {
  return arr.reduce((prev: IAnyObj[], { [key]: children, ...cur }) => {
    if (children?.length > 0) {
      return prev.concat(cur).concat(flattern(children, key));
    }
    return prev.concat(cur);
  }, []);
};

export default {
  deepClone,
  composeFns,
  getQueryObj,
  getIntRandom,
  isPalindrome,
  sleep,
  recusiveTreeFilter,
  deepSearch,
  isObject,
  isEqualArray,
  isEqualObject,
  omitPropInObjArray,
  flattern,
};
