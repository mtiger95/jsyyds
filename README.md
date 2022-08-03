# js tools

[![Testing](https://github.com/mtiger95/jsyyds/actions/workflows/test.yml/badge.svg)](https://github.com/mtiger95/jsyyds/actions/workflows/test.yml)

[![Release](https://github.com/mtiger95/jsyyds/actions/workflows/release.yml/badge.svg)](https://github.com/mtiger95/jsyyds/actions/workflows/release.yml)

![npm bundle size](https://img.shields.io/bundlephobia/minzip/jsyyds)
## js yyds

> 用原生 JS 封装一些常用的方法，不去依赖其它任何工具库，打磨 JS 基本功，同时避免过于依赖工具库，性能更好，欢迎补充，提 PR

> 目前分以下几个功能模块：

1. normal-常用方法，如：深拷贝,多维数组递归处理，比较相等
2. special-浏览器某些行为监测，如：浏览器是刷新还是关闭，是否打开了控制台
3. regExp-常用正则表则式
4. 更多常用功能模块，正在完善中。。。

---

> 安装此工具

```js
yarn add jsyyds
```

> 全量引用： `import {[自定义名称]} from 'jsyyds'`

```js
import jsyyds from 'jsyyds';
```

> 按需引用（功能模块）: `import {[功能模块名]} from 'jsyyds'`

```js
import { normal } from 'jsyyds';
```

> 按需引用（具体的函数|变量名）: `import {[函数名|变量名]} from 'jsyyds/lib/[功能模块名]'`

```js
import { debounce } from 'jsyyds/lib/event';
```

---

---
