import { IAnyObj } from '../types';

interface IKeyInfo {
  keyCode: number;
  key: string;
  code: string;
}

interface IKeyMap {
  [key: string]: IKeyInfo;
}

type TKeyStr = "i" | "j" | "c" | "u" | "f12";

const checkKey = (event: IAnyObj, keyStr: TKeyStr) => {
  const keyMap: IKeyMap = {
    i: {
      keyCode: 73,
      key: "i",
      code: "KeyI",
    },
    j: {
      keyCode: 74,
      key: "j",
      code: "KeyJ",
    },
    c: {
      keyCode: 67,
      key: "c",
      code: "KeyC",
    },
    u: {
      keyCode: 85,
      key: "u",
      code: "KeyU",
    },
    f12: {
      keyCode: 123,
      key: "F12",
      code: "F12",
    },
  };

  const keyCur: IAnyObj = keyMap[keyStr];
  const rightKey = Object.keys(keyCur).some( 
    (k: string) => keyCur[k] === event[k]
  );

  return rightKey;
};

const noDebuger: (
  whenConsoleOpenedCallback: (e?: Event) => void,
  rootNode: string,
  limitStr: string
) => void = (
  whenConsoleOpenedCallback,
  rootNode = "root",
  limitStr = "禁止访问控制台！(Access to the console is prohibited!)"
) => {
  const rootElement = document.getElementById(rootNode);

  document.oncontextmenu = () =>
    whenConsoleOpenedCallback ? whenConsoleOpenedCallback() : false;

  window.addEventListener("keydown", (e) => {
    if (
      // CMD + Alt + I (Chrome, Firefox, Safari)
      (e.metaKey === true && e.altKey === true && checkKey(e, "i")) ||
      // CMD + Alt + J (Chrome)
      (e.metaKey === true && e.altKey === true && checkKey(e, "j")) ||
      // CMD + Alt + C (Chrome)
      (e.metaKey === true && e.altKey === true && checkKey(e, "c")) ||
      // CMD + Shift + C (Chrome)
      (e.metaKey === true && e.shiftKey === true && checkKey(e, "c")) ||
      // Ctrl + Shift + I (Chrome, Firefox, Safari, Edge)
      (e.ctrlKey === true && e.shiftKey === true && checkKey(e, "i")) ||
      // Ctrl + Shift + J (Chrome, Edge)
      (e.ctrlKey === true && e.shiftKey === true && checkKey(e, "j")) ||
      // Ctrl + Shift + C (Chrome, Edge)
      (e.ctrlKey === true && e.shiftKey === true && checkKey(e, "c")) ||
      // F12 (Chome, Firefox, Edge)
      checkKey(e, "f12") ||
      // CMD + Alt + U, Ctrl + U (View source: Chrome, Firefox, Safari, Edge)
      (e.metaKey === true && e.altKey === true && checkKey(e, "u")) ||
      (e.ctrlKey === true && checkKey(e, "u"))
    ) {
      if (whenConsoleOpenedCallback instanceof Function) {
        whenConsoleOpenedCallback(e);
      } else {
        e.preventDefault();
        return false;
      }
    }

    return true;
  });

  setTimeout(() => {
    const s: number = +new Date();
    // eslint-disable-next-line no-debugger
    debugger;
    const e: number = +new Date();
    if (e - s > 100) {
      if (whenConsoleOpenedCallback instanceof Function) {
        whenConsoleOpenedCallback();
      } else if (rootElement) {
        rootElement.innerHTML = limitStr;
      }
    }
  }, 10);

  console.log(
    Object.defineProperties(new Error(), {
      toString: {
        value() {
          // @ts-ignore
          new Error().stack.includes("toString@");
        },
      },
      message: {
        get() {
          if (whenConsoleOpenedCallback instanceof Function) {
            whenConsoleOpenedCallback();
          } else if (rootElement) {
            rootElement.innerHTML = limitStr;
          }
          setTimeout(() => {
            console.clear();
          }, 20);
          return null;
        },
      },
    })
  );
  };

  /**
 * @description: 检测浏览器是关闭还是刷新
 * @param {Function} whenCloseCb
 * @param {Function} whenFreshCb
 * @return {void}
 */
const browserCloseOrFreshAction = (whenCloseCb: () => void, whenFreshCb: () => void) => {
  let beginTime = 0; // 执行onbeforeunload的开始时间
  let differTime = 0; // 时间差
  window.onunload = () => {
    differTime = new Date().getTime() - beginTime;
    if (differTime <= 5) {
      // ('浏览器关闭');
      whenCloseCb();
    } else {
      // ('浏览器刷新');
      whenFreshCb();
    }
  };
  window.onbeforeunload = () => {
    beginTime = new Date().getTime();
  };
};

export default {
  noDebuger,
  browserCloseOrFreshAction
};
