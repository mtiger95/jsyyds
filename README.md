# js tools

## js yyds

> 用原生 JS 封装一些常用的方法，不去依赖其它任何工具库，打磨 JS 基本功，同时避免过于依赖工具库，性能更好，欢迎补充，提 PR

> 目前分以下几个功能模块：

1. normal-常用方法，如：深拷贝
2. event-事件优化，如：debounce, throttl
3. dateTime-时间格式化，如：倒计时间格式化，已过去时间格式化
4. dom-Dom 元素的操作，如：获取元素宽高，可视区域宽高
5. device-访问设备检测相关
6. regExp-常用正则表则式
7. 更多常用功能模块，正在完善中。。。

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
