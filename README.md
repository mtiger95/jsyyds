# Primordial Javascript Script Tools

[![Testing](https://github.com/mtiger95/jsyyds/actions/workflows/test.yml/badge.svg)](https://github.com/mtiger95/jsyyds/actions/workflows/test.yml)

[![Release](https://github.com/mtiger95/jsyyds/actions/workflows/release.yml/badge.svg)](https://github.com/mtiger95/jsyyds/actions/workflows/release.yml)

![npm bundle size](https://img.shields.io/bundlephobia/minzip/jsyyds)

> 使用 Typescript 封装一些实用的中高级方法并编译为原生 JS ，没有依赖其它任何工具库，性能更好。同时会逐步增加基于React的Hooks和函数式组件。（Some common methods are encapsulated by Typescript and compiled into native JS, which has better performance without relying on any other tool libraries.At the same time, Hooks and functional components based on React will be gradually added.）

> 目前功能函数模块分以下几个功能模块(It is divided into the following functional modules.)：

1. **normal - 常用方法，如：深拷贝，树形数组递归删除属性/条件过滤，深比较多层数组或对象否键值相等，深层次堆栈法根据 id 查找等等。（Commonly used methods, such as: deep copy, tree array recursive deletion attribute/condition filtering, deep comparison of multi-layer arrays or objects whether the key values are equal, deep stack method searching according to id, etc.）**

- deepClone - 深拷贝

```js
/**
 * @description 深拷贝
 * @param {any} obj
 * @param {any} [cache]
 * @returns {any}
 */
```

- getQueryObj - 获取 url 上的 query 参数并转化为对象
```js
/**
 * @description 直接获取当前url 上的query参数并转化为对象
 * @returns {Object}
 */
```
- getIntRandom - 获取两个整数之间的随机整数
```js
/**
 * @description 获取两个整数之间的随机整数
 * @param min 最小整数
 * @param max 最大整数
 * @returns {Number} 两个整数之间的随机整数
 */
```
- sleep - 异步休眠函数
```js
/**
 * @description 休眠函数
 * @param delay 休眠时间
 * @returns {Promise}
 */
```
- deepGet - 模拟lodash的 get 方法
```js
/**
 * @description: 模拟lodash的 get 方法
 * @param {Object} object
 * @param {Array|String} path - 路径例：'a.b[0].c' 或者 ['a', 'b', '0', 'c']
 * @param {any} defaultValue
 * @return {*} - 返回路径对应的值
 */
```
- recusiveTreeFilter - 树形数据根据条件过滤
```js
/**
 * @description: 树形数据根据条件过滤
 * @param {Array} list
 * @param {Function} filterFn
 * @return {Array}
 */
```
- dataTransKeys - 将树形数据根据指定字段名转换为组件展示格式数据
```js
/**
 * @description: 将树形数据根据指定字段名转换为组件展示格式数据
 * @param {Array} list 对象数组
 * @param {Array} mapKeys 字段映射对象
 * @return {Array}
 */
```
- deepSearch - 树形数据根据id深层查找
```js
/**
 * @description: 树形数据根据id深层查找
 * @param {Array} tree
 * @param {number} id
 * @param {string} parentIdKey
 * @return {*}
 */
```
- isObject - 检查value是否为Object类型
```js
/**
 * @description 检查value是否为Object类型
 * @param {*} value
 * @returns {Boolean}
 */
```
-  isEqualArray - 深层浅比较两个对象数组是否相等
```js
/**
 * @description: 深层浅比较两个对象数组是否相等
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {boolean}
 */
```
- isEqualObject - 深层浅比较两个对象是否相等，同属性同值
```js
/**
 * @description: 深层浅比较两个对象是否相等，同属性同值
 * @param {object} a
 * @param {object} b
 * @return {boolean}
 */
```
- omitPropInObjArray - 从一维对象数组中过滤掉某些属性
```js
/**
 * @description: 从一维对象数组中过滤掉某些属性
 * @param {T} arr
 * @param {Array<string>} omitProps
 * @return {T}
 */
```
- flattern - 深层合并打平树形数组
```js
/**
 * @description: 深层合并打平树形数组
 * @param {Array} arr
 * @param {Array<string>} omitProps
 * @return {T}
 */
```
- throttle - 节流函数
```js
/**
 * @description: 节流函数
 * @param {function} fn
 * @param {number} delay
 * @return {function}
 */
```
- debounce - 防抖函数
```js
/**
 * @description: 防抖函数
 * @param {function} fn
 * @param {number} wait
 * @return {function}
 */
```

2. **special - 浏览器某些行为监测，如：浏览器是刷新还是关闭，禁止打开控制台。(Some behaviors of the browser are monitored, such as whether the browser is refreshed or closed, and it is forbidden to open the console)**
```js
/**
 * @description: 禁止打开控制台，若通过浏览器自带功能进入，可传入回调自己处理或传入项目根节点，脚本将自动处理为空白页面。
 * @return {void}
 */
const noDebuger: (
  whenConsoleOpenedCallback: (e?: Event) => void,
  rootNode: string,
  limitStr: string
) => void
```

```js
/**
 * @description: 检测浏览器是关闭还是刷新
 * @param {Function} whenCloseCb
 * @param {Function} whenFreshCb
 * @return {void}
 */

export const browserCloseOrFreshAction = (whenCloseCb: () => void, whenFreshCb: () => void) => {}
```
3. **regExp - 常用正则表则式**
4. **更多好用功能方法，正在逐步增加。**

---

> 安装此工具

```js
yarn add jsyyds
```

> 全量引用： `import {[自定义名称]} from 'jsyyds'`

```js
import jsyyds from "jsyyds";

jsyyds.deepClone();
```

> 按需引用功能函数（具体的函数|变量名）: `import {[函数名|变量名]} from 'jsyyds'`

```js
import { deepClone } from "jsyyds";
// 也可以这样用：import { deepClone } from "jsyyds/utils";

deepClone();
```

> 按需引用Hook（具体的Hook名）: `import {[Hook名称]} from 'jsyyds/hooks'`

```js
import { useSafeState } from "jsyyds/hooks";

const [state, setState] = useSafeState();
```

> 按需引用组件名（具体的组件名）: `import [组件名称] from 'jsyyds/hooks'`

```js
import Demo from 'jsyyds/components/Demo';

<Demo />
```

---
