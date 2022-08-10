"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataTransKeys = exports.composeFns = void 0;
exports.debounce = debounce;
exports.deepClone = void 0;
exports.deepGet = deepGet;
exports.sleep = exports.recusiveTreeFilter = exports.omitPropInObjArray = exports.isPalindrome = exports.isObject = exports.isEqualObject = exports.isEqualArray = exports.getQueryObj = exports.getIntRandom = exports.flattern = exports["default"] = exports.deepSearch = void 0;
exports.throttle = throttle;

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 * @description 深拷贝
 * @param {any} obj
 * @param {any} [cache]
 * @return {any}
 */
var deepClone = function deepClone(obj) {
  var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakMap();
  if (_typeof(obj) !== "object") return obj;
  if (obj === null) return obj;
  if (cache.get(obj)) return cache.get(obj);
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  var cloneObj = new obj.constructor();
  cache.set(obj, cloneObj);

  for (var _key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, _key)) {
      cloneObj[_key] = deepClone(obj[_key], cache);
    }
  }

  return cloneObj;
};
/**
 * @description 聚合函数
 * @param {function} fn 要聚合的函数
 * @returns {*}
 */


exports.deepClone = deepClone;

var composeFns = function composeFns() {
  for (var _len = arguments.length, fn = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
    fn[_key2] = arguments[_key2];
  }

  if (fn.length === 0) return function () {
    for (var _len2 = arguments.length, arg = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
      arg[_key3] = arguments[_key3];
    }

    return arg;
  };
  if (fn.length === 1) return fn[0];
  return fn.reduce(function (pre, next) {
    return function (arg) {
      return next(pre(arg));
    };
  });
};
/**
 * @description 直接获取当前url 上的query参数并转化为对象
 * @returns {Object}
 */


exports.composeFns = composeFns;

var getQueryObj = function getQueryObj() {
  var queryObj = {};
  window.location.search.replace(/([^?&=]+)=([^&]+)/g, function (_, k, v) {
    return queryObj[k] = v;
  });
  return queryObj;
};
/**
 * @description 获取两个整数之间的随机整数
 * @param min 最小整数
 * @param max 最大整数
 * @returns {Number} 两个整数之间的随机整数
 */


exports.getQueryObj = getQueryObj;

var getIntRandom = function getIntRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
/**
 * @description 检验字符串是否是回文
 * @param str 要检验的字符串
 * @returns {Boolean}
 */


exports.getIntRandom = getIntRandom;

var isPalindrome = function isPalindrome(str) {
  str = str.replace(/\W/g, "").toLowerCase();
  return str == str.split("").reverse().join("");
};
/**
 * @description 休眠函数
 * @param delay 休眠时间
 * @returns {Promise}
 */


exports.isPalindrome = isPalindrome;

var sleep = function sleep(delay) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, delay);
  });
};
/**
 * @description: 模拟lodash的 get 方法
 * @param {Object} object
 * @param {Array|String} path - 路径例：'a.b[0].c' 或者 ['a', 'b', '0', 'c']
 * @param {any} defaultValue
 * @returns {*} - 返回路径对应的值
 */


exports.sleep = sleep;

function deepGet() {
  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var path = arguments.length > 1 ? arguments[1] : undefined;
  var defaultValue = arguments.length > 2 ? arguments[2] : undefined;
  return (Array.isArray(path) ? path : path.replace(/\[/g, ".").replace(/\]/g, "").split(".")).reduce(function (o, k) {
    return (o || {})[k];
  }, object) || defaultValue;
}
/**
 * @description: 树形数据根据条件过滤
 * @param {Array} list
 * @param {Function} filterFn
 * @returns {Array}
 */


var recusiveTreeFilter = function recusiveTreeFilter() {
  var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var filterFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (v) {
    return v;
  };
  return list.reduce(function (pre, item) {
    var _item$children = item.children,
        children = _item$children === void 0 ? [] : _item$children;
    var curItemOk = filterFn(item);

    if (curItemOk) {
      if (children.length > 0) {
        var _children = recusiveTreeFilter(children, filterFn);

        var curItem = _objectSpread(_objectSpread({}, item), {}, {
          children: _children
        });

        pre = [].concat(_toConsumableArray(pre), [curItem]);
      } else {
        pre = [].concat(_toConsumableArray(pre), [item]);
      }
    }

    return pre;
  }, []);
};
/**
 * @description: 将树形数据根据指定字段名转换为组件展示格式数据
 * @param {Array} list 对象数组
 * @param {Array} mapKeys 字段映射对象
 * @returns {Array}
 */


exports.recusiveTreeFilter = recusiveTreeFilter;

var dataTransKeys = function dataTransKeys() {
  var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var mapKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    label: "label",
    value: "value"
  };
  var keys = Object.keys(mapKeys);
  return list.reduce(function (pre, item) {
    var _item$children2 = item.children,
        children = _item$children2 === void 0 ? [] : _item$children2;
    keys.forEach(function (key) {
      var dataKey = mapKeys[key];
      item[key] = item[dataKey];
    });

    if (children.length > 0) {
      children = dataTransKeys(children, mapKeys);
    }

    return [].concat(_toConsumableArray(pre), [_objectSpread(_objectSpread({}, item), {}, {
      children: children
    })]);
  }, []);
};
/**
 * @description: 树形数据深层根据id查找
 * @param {Array} tree
 * @param {number} id
 * @param {string} parentIdKey
 * @returns {*}
 */


exports.dataTransKeys = dataTransKeys;

var deepSearch = function deepSearch(tree, id, parentIdKey) {
  var parent_id = 0;
  var currItem = null;
  var temp = deepClone(tree);

  while (temp.length > 0) {
    var curr = temp.shift();

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
    var _curr = temp.shift();

    if (_curr.id === parent_id) {
      currItem = _curr;
      break;
    }

    if (_curr.children && _curr.children.length > 0) {
      temp = [].concat(temp, _curr.children);
    }
  }

  return currItem;
};
/**
 * @description 检查value是否为Object类型
 * @param {*} value
 * @returns {Boolean}
 */


exports.deepSearch = deepSearch;

var isObject = function isObject(value) {
  var type = _typeof(value);

  return value != null && (type === "object" || type === "function");
};
/**
 * @description: 深度浅比较两个对象数组是否相等
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {boolean}
 */


exports.isObject = isObject;

var isEqualArray = function isEqualArray(arr1, arr2) {
  var Equal = true;

  if (isObject(arr1) && isObject(arr2)) {
    var aProps = Object.getOwnPropertyNames(arr1);
    var bProps = Object.getOwnPropertyNames(arr2);

    if (aProps.length !== bProps.length) {
      Equal = false;
      return Equal;
    }

    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];
      var propA = arr1[propName];
      var propB = arr2[propName];

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
 * @returns {boolean}
 */


exports.isEqualArray = isEqualArray;

var isEqualObject = function isEqualObject(a, b) {
  if (a === b) return true;
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);
  if (aProps.length !== bProps.length) return false;

  if (isObject(a) && isObject(b)) {
    for (var prop in a) {
      if (Object.prototype.hasOwnProperty.call(b, prop)) {
        if (_typeof(a[prop]) === "object" && a[prop] !== null) {
          if (!isEqualObject(a === null || a === void 0 ? void 0 : a[prop], b === null || b === void 0 ? void 0 : b[prop])) return false;
        } else if ((a === null || a === void 0 ? void 0 : a[prop]) !== (b === null || b === void 0 ? void 0 : b[prop])) {
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
 * @returns {T}
 */


exports.isEqualObject = isEqualObject;

var omitPropInObjArray = function omitPropInObjArray() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var omitProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return arr.map(function (item) {
    var itemKeys = Object.keys(item);
    return itemKeys.reduce(function (pre, curKey) {
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
 * @returns {T}
 */


exports.omitPropInObjArray = omitPropInObjArray;

var flattern = function flattern(arr) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "children";
  return arr.reduce(function (prev, _ref) {
    var children = _ref[key],
        cur = _objectWithoutProperties(_ref, [key].map(_toPropertyKey));

    if ((children === null || children === void 0 ? void 0 : children.length) > 0) {
      return prev.concat(cur).concat(flattern(children, key));
    }

    return prev.concat(cur);
  }, []);
};
/**
 * @description: 节流函数
 * @param {function} fn
 * @param {number} delay
 * @returns {function}
 */


exports.flattern = flattern;

function throttle(fn, delay) {
  var oldtime = Date.now();
  return function () {
    var newtime = Date.now();

    if (newtime - oldtime >= delay) {
      for (var _len3 = arguments.length, args = new Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
        args[_key4] = arguments[_key4];
      }

      // eslint-disable-next-line prefer-spread
      fn.apply(null, args);
      oldtime = Date.now();
    }
  };
}
/**
 * @description: 防抖函数
 * @param {function} fn
 * @param {number} wait
 * @returns {function}
 */


function debounce(fn, delay) {
  var timer = 0; // 维护一个 timer

  return function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
      args[_key5] = arguments[_key5];
    }

    if (timer) {
      window.clearTimeout(timer);
    }

    timer = window.setTimeout(function () {
      // eslint-disable-next-line prefer-spread
      fn.apply(null, args);
    }, delay);
  };
}

var _default = {
  deepClone: deepClone,
  composeFns: composeFns,
  getQueryObj: getQueryObj,
  getIntRandom: getIntRandom,
  isPalindrome: isPalindrome,
  sleep: sleep,
  deepGet: deepGet,
  dataTransKeys: dataTransKeys,
  recusiveTreeFilter: recusiveTreeFilter,
  deepSearch: deepSearch,
  isObject: isObject,
  isEqualArray: isEqualArray,
  isEqualObject: isEqualObject,
  omitPropInObjArray: omitPropInObjArray,
  flattern: flattern,
  throttle: throttle,
  debounce: debounce
};
exports["default"] = _default;