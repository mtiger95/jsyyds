/**
 * @description 高频事件防抖，控制是否立即执行
 * @param {*} fn
 * @param {*} delay
 * @returns {Function}
 */
type TFN = (arg: any) => any;
export const debounce = (fn: TFN, delay: number, immediate = true) => {
  let timer: any = null;
  return function (...args: any) {
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
export const throttle = (fn: TFN, delay: number, immediate = true) => {
  let last = 0;
  return function (...args: any) {
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

/**
 * 事件发布订阅中心
 */
type TOnceEvent = {
  fn: () => any;
  once: boolean;
}
export class ReleaseSubscribe {
  static instance: ReleaseSubscribe;
  private _eventsMap: Map<string, Array<TOnceEvent>>;

  constructor() {
    this._eventsMap = new Map(); // 事件名与回调函数的映射Map
  }

  private addEvent(eventName: string, eventFnCallback: () => void, once = false) {
    const newArr = this._eventsMap.get(eventName) || [];
    newArr.push({
      fn: eventFnCallback,
      once,
    });
    this._eventsMap.set(eventName, newArr);
  }

  static getInstance() {
    if (!ReleaseSubscribe.instance) {
      ReleaseSubscribe.instance = new ReleaseSubscribe();
    }
    return ReleaseSubscribe.instance;
  }

  /**
   * 事件订阅
   *
   * @param eventName 事件名
   * @param eventFnCallback 事件发生时的回调函数
   */
  public on(eventName: string, eventFnCallback: () => void) {
    this.addEvent(eventName, eventFnCallback);
  }

  /**
   * 订阅只执行一次的事件
   *
   * @param eventName 事件名
   * @param eventFnCallback 事件发生时的回调函数
   */          
  public once(eventName: string, eventFnCallback: () => void) {
    this.addEvent(eventName, eventFnCallback, true);
  }

  /**
   * 取消订阅
   *
   * @param eventName 事件名
   * @param eventFnCallback 事件发生时的回调函数
   */
  public off(eventName: string, eventFnCallback?: () => void) {
    if (!eventFnCallback) {
      this._eventsMap.delete(eventName);
      return;
    }

    const newArr = this._eventsMap.get(eventName) || [];
    for (let i = newArr.length - 1; i >= 0; i--) {
      if (newArr[i].fn === eventFnCallback) {
        newArr.splice(i, 1);
      }
    }
    this._eventsMap.set(eventName, newArr);
  }

  /**
   * 主动通知并执行注册的回调函数
   *
   * @param eventName 事件名
   */
  public emit(eventName: string) {
    const fns = this._eventsMap.get(eventName) || [];
    fns.forEach((evt, index) => {
      evt.fn();
      if (evt.once) fns.splice(index, 1);
    });
    this._eventsMap.set(eventName, fns);
  }
}


