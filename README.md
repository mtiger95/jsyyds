# primordial javascript script tools

[![Testing](https://github.com/mtiger95/jsyyds/actions/workflows/test.yml/badge.svg)](https://github.com/mtiger95/jsyyds/actions/workflows/test.yml)

[![Release](https://github.com/mtiger95/jsyyds/actions/workflows/release.yml/badge.svg)](https://github.com/mtiger95/jsyyds/actions/workflows/release.yml)

![npm bundle size](https://img.shields.io/bundlephobia/minzip/jsyyds)

> 使用 Typescript 封装一些常用的方法并编译为原生 JS ，没有依赖其它任何工具库，性能更好。

> 目前分以下几个功能模块：

> normal - 常用方法，如：深拷贝，树形数组递归删除属性/条件过滤，深比较多层数组或对象否键值相等，深层次堆栈法根据 id 查找等等
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
 * @description: 模拟lodash的 _.get 方法
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
- deepSearch - 树形数据深层根据id查找
```js
/**
 * @description: 树形数据深层根据id查找
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
-  isEqualArray - 深度浅比较两个对象数组是否相等
```js
/**
 * @description: 深度浅比较两个对象数组是否相等
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {boolean}
 */
```
- isEqualObject - 判断两个对象是否相等，同属性同值
```js
/**
 * @description: 判断两个对象是否相等，同属性同值
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
- flattern - 深层合并打平对象数组
```js
/**
 * @description: 深层合并打平对象数组
 * @param {Array} arr
 * @param {Array<string>} omitProps
 * @return {T}
 */
```

2. special - 浏览器某些行为监测，如：浏览器是刷新还是关闭，禁止打开控制台。
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
3. regExp - 常用正则表则式
4. 更多好用功能方法，正在逐步增加。

---

> 安装此工具

```js
yarn add jsyyds
```

> 全量引用： `import {[自定义名称]} from 'jsyyds'`

```js
import jsyyds from "jsyyds";

jsyyds.xxx();
```

> 按需引用（具体的函数|变量名）: `import {[函数名|变量名]} from 'jsyyds'`

```js
import { deepClone } from "jsyyds";

deepClone();
```

---
